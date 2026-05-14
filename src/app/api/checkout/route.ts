import { NextResponse } from "next/server";
import Stripe from "stripe";
import { shopData } from "../../../../content/shop";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_123");

const FALLBACK_SHIPPING_CENTS = 499; // €4.99 falls Printful API mal nicht antwortet

type ShippingAddress = {
  name: string;
  street: string;
  postalCode: string;
  city: string;
  country: "DE" | "NL";
};

async function getPrintfulShippingRate(
  syncVariantId: number,
  address: ShippingAddress,
): Promise<{ amountCents: number; label: string; minDays?: number; maxDays?: number } | null> {
  const apiKey = process.env.PRINTFUL_API_KEY;
  if (!apiKey) {
    console.warn("PRINTFUL_API_KEY fehlt — Fallback-Versand wird genutzt.");
    return null;
  }

  try {
    const response = await fetch("https://api.printful.com/shipping/rates", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipient: {
          address1: address.street,
          city: address.city,
          country_code: address.country,
          zip: address.postalCode,
        },
        items: [{ sync_variant_id: syncVariantId, quantity: 1 }],
        currency: "EUR",
        locale: "en_US",
      }),
    });

    if (!response.ok) {
      console.warn("Printful shipping rates API non-OK:", response.status);
      return null;
    }

    const data = await response.json();
    const first = Array.isArray(data?.result) && data.result.length > 0 ? data.result[0] : null;
    if (!first) return null;

    const rateNum = parseFloat(first.rate);
    if (!Number.isFinite(rateNum)) return null;

    return {
      amountCents: Math.round(rateNum * 100),
      label: first.name || "Standardversand",
      minDays: first.minDeliveryDays,
      maxDays: first.maxDeliveryDays,
    };
  } catch (err) {
    console.warn("Printful shipping rates request failed:", err);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const {
      productId,
      color,
      size,
      printfulSyncVariantId,
      shippingAddress,
    }: {
      productId?: string;
      color?: string;
      size?: string;
      printfulSyncVariantId?: number;
      shippingAddress?: ShippingAddress;
    } = await req.json();

    if (!productId || !color || !size) {
      return NextResponse.json(
        { error: "Fehlende Produktdetails für den Checkout." },
        { status: 400 },
      );
    }

    if (!shippingAddress) {
      return NextResponse.json(
        { error: "Versandadresse fehlt." },
        { status: 400 },
      );
    }

    const product = shopData.find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json({ error: "Produkt nicht gefunden." }, { status: 404 });
    }

    const variantRaw = product.variants?.find(
      (v) => v.size === size && v.color === color,
    );
    const unitAmount =
      variantRaw?.numericPrice || parseInt(product.price.replace(/[^0-9]/g, ""));
    const variantName = `${product.name} - ${color} (Größe ${size})`;

    const colorData = product.colors.find((c) => c.name === color);
    const origin = req.headers.get("origin") || "https://himmels-makrele.com";
    const imageUrl =
      colorData && colorData.images.length > 0
        ? `${origin}${colorData.images[0]}`
        : undefined;

    // Echte Versandrate von Printful holen, mit Fallback
    let shippingCents = FALLBACK_SHIPPING_CENTS;
    let shippingLabel = "Standardversand";
    let shippingMinDays: number | undefined = 5;
    let shippingMaxDays: number | undefined = 10;

    if (printfulSyncVariantId) {
      const rate = await getPrintfulShippingRate(
        printfulSyncVariantId,
        shippingAddress,
      );
      if (rate) {
        shippingCents = rate.amountCents;
        shippingLabel = rate.label;
        shippingMinDays = rate.minDays;
        shippingMaxDays = rate.maxDays;
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "ideal", "klarna"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: variantName,
              images: imageUrl ? [imageUrl] : [],
              tax_code: "txcd_99999999", // General — Tangible Goods (Stripe Tax)
            },
            unit_amount: unitAmount,
            tax_behavior: "inclusive", // Brutto-Preis: BTW ist im Preis enthalten
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      automatic_tax: { enabled: true },
      success_url: `${origin}/danke?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop?canceled=true`,

      // Versandkosten von Printful (oder Fallback) — Kunde sieht's vor dem Bezahlen
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: shippingCents, currency: "eur" },
            display_name: shippingLabel,
            ...(shippingMinDays && shippingMaxDays
              ? {
                  delivery_estimate: {
                    minimum: { unit: "business_day", value: shippingMinDays },
                    maximum: { unit: "business_day", value: shippingMaxDays },
                  },
                }
              : {}),
          },
        },
      ],

      // Adresse haben wir schon — Stripe nicht nochmal fragen lassen
      // Hinweis: Stripe sammelt für Kartenzahlungen weiterhin Rechnungsadresse
      // (das ist ein anderes Feld als Versandadresse)

      // Alle Bestelldaten in Metadata, damit der Webhook autoritativ daraus lesen kann
      metadata: {
        printfulSyncVariantId: printfulSyncVariantId
          ? printfulSyncVariantId.toString()
          : "",
        ship_name: shippingAddress.name,
        ship_street: shippingAddress.street,
        ship_postal_code: shippingAddress.postalCode,
        ship_city: shippingAddress.city,
        ship_country: shippingAddress.country,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unbekannter Fehler";
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
