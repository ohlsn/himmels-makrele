import { NextResponse } from "next/server";
import Stripe from "stripe";

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

let stripeClient: Stripe | null = null;
function getStripe(): Stripe {
  if (!stripeClient) {
    stripeClient = new Stripe(getEnv("STRIPE_SECRET_KEY"), {
      apiVersion: "2026-03-25.dahlia",
    });
  }
  return stripeClient;
}

type PrintfulOrderPayload = {
  external_id: string;
  recipient: {
    name: string;
    address1: string;
    city: string;
    country_code: string;
    zip: string;
    email?: string;
  };
  items: Array<{ sync_variant_id: number; quantity: number }>;
  retail_costs?: {
    currency: string;
    subtotal: string;
    shipping: string;
    tax: string;
    discount: string;
  };
};

async function sendToPrintful(payload: PrintfulOrderPayload) {
  const apiKey = getEnv("PRINTFUL_API_KEY");
  return fetch("https://api.printful.com/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });
}

function isDuplicateExternalIdError(status: number, message: string): boolean {
  if (status !== 400) return false;
  return /external_id.*(exists|duplicat)/i.test(message);
}

export async function POST(req: Request) {
  const stripe = getStripe();
  const sig = req.headers.get("stripe-signature") || "";
  const webhookSecret = getEnv("STRIPE_WEBHOOK_SECRET");

  let event: Stripe.Event;
  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unbekannter Fehler";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json(
      { error: `Webhook-Signatur ungültig: ${message}` },
      { status: 400 },
    );
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const meta = session.metadata ?? {};

  // Adresse: wir nutzen die Metadaten, die wir bei Session-Create selbst
  // eingebettet haben. Stripe's customer_details als Fallback für ältere Pfade.
  const customerName = meta.ship_name || session.customer_details?.name || "";
  const street =
    meta.ship_street || session.customer_details?.address?.line1 || "";
  const city = meta.ship_city || session.customer_details?.address?.city || "";
  const postalCode =
    meta.ship_postal_code ||
    session.customer_details?.address?.postal_code ||
    "";
  const country =
    meta.ship_country || session.customer_details?.address?.country || "";
  const printfulSyncVariantId = meta.printfulSyncVariantId;

  if (!printfulSyncVariantId || !street || !city || !postalCode || !country) {
    console.error("Webhook: Pflichtdaten für Printful fehlen", {
      eventId: event.id,
      sessionId: session.id,
      printfulSyncVariantId,
      hasStreet: !!street,
      hasCity: !!city,
      hasPostalCode: !!postalCode,
      hasCountry: !!country,
    });
    // 200, weil ein Retry diese Daten nicht wiederherstellen wird.
    // Order ist verloren — manuell aus Stripe-Dashboard ablesen und neu anlegen.
    return NextResponse.json({ received: true, missingData: true });
  }

  // Beträge für Printfuls retail_costs (Buchhaltung).
  // Stripe Tax inclusive: amount_tax ist im subtotal enthalten und wird hier
  // separat ausgewiesen, damit Printful subtotal netto sieht.
  const taxCents = session.total_details?.amount_tax ?? 0;
  const shippingCents = session.total_details?.amount_shipping ?? 0;
  const discountCents = session.total_details?.amount_discount ?? 0;
  const subtotalCents = (session.amount_subtotal ?? 0) - taxCents;
  const currency = (session.currency || "eur").toUpperCase();
  const toAmount = (cents: number) => (cents / 100).toFixed(2);

  // event.id ist über Stripe-Retries des SELBEN Webhook-Delivers stabil.
  // Wir nutzen es als external_id, damit Printful Duplikate auf eigener Seite ablehnt.
  const externalId = event.id;

  const payload: PrintfulOrderPayload = {
    external_id: externalId,
    recipient: {
      name: customerName,
      address1: street,
      city,
      country_code: country,
      zip: postalCode,
      email: session.customer_details?.email ?? undefined,
    },
    items: [
      {
        sync_variant_id: parseInt(printfulSyncVariantId, 10),
        quantity: 1,
      },
    ],
    retail_costs: {
      currency,
      subtotal: toAmount(subtotalCents),
      shipping: toAmount(shippingCents),
      tax: toAmount(taxCents),
      discount: toAmount(discountCents),
    },
  };

  try {
    const response = await sendToPrintful(payload);

    if (response.ok) {
      console.log("Printful order created", {
        eventId: event.id,
        externalId,
        sessionId: session.id,
      });
      return NextResponse.json({ received: true });
    }

    const errorData = await response.json().catch(() => ({}));
    const errorMessage = JSON.stringify(errorData);

    if (isDuplicateExternalIdError(response.status, errorMessage)) {
      console.log("Printful: duplicate external_id — Retry, ignoriert", {
        eventId: event.id,
        externalId,
      });
      return NextResponse.json({ received: true, deduplicated: true });
    }

    if (response.status >= 500) {
      // Echter Upstream-Fehler — Stripe soll retryen. Dedup fängt's beim Retry.
      console.error("Printful 5xx, returning 500 so Stripe retries:", {
        status: response.status,
        errorData,
        eventId: event.id,
      });
      return NextResponse.json(
        { error: "Printful upstream error" },
        { status: 500 },
      );
    }

    // Andere 4xx (z.B. ungültige Adresse): Retry würde nichts ändern.
    // 200 zurück, damit Stripe nicht in Endlosschleife retried — Order manuell aufarbeiten.
    console.error("Printful 4xx, NICHT retrying — manuell aufarbeiten:", {
      status: response.status,
      errorData,
      eventId: event.id,
      sessionId: session.id,
    });
    return NextResponse.json({ received: true, printfulError: true });
  } catch (printfulErr) {
    // Netzwerkfehler / Timeout — Stripe soll retryen.
    const message =
      printfulErr instanceof Error ? printfulErr.message : "Unbekannt";
    console.error("Printful network error, returning 500:", {
      eventId: event.id,
      message,
    });
    return NextResponse.json(
      { error: "Printful network error" },
      { status: 500 },
    );
  }
}
