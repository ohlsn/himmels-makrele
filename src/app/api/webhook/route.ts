import { NextResponse } from "next/server";
import Stripe from "stripe";

// Die Kasse initialisieren
// Wenn noch kein Key da ist, nutzen wir einen Platzhalter, damit der Server nicht abstürzt
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_123", {
  apiVersion: "2026-03-25.dahlia",
});

export async function POST(req: Request) {
  // Das Stripe-'Walkie-Talkie' sendet uns einen versteckten Sicherheitscode
  const sig = req.headers.get("stripe-signature") || "";
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

  let event: Stripe.Event;

  try {
    // Zuerst lesen wir die genaue Nachricht, die vom Walkie-Talkie kommt
    const body = await req.text();
    // Stripe überprüft hier streng: Kommt die Nachricht WIRKLICH von unserer Kasse?
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error("Webhook Error:", err);
    return NextResponse.json({ error: `Webhook Fehler (Falsches Passwort?): ${err.message}` }, { status: 400 });
  }

  // Event: Jemand hat erfolgreich an der Kasse bezahlt!
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const email = session.customer_details?.email;
    const meta = session.metadata ?? {};
    const printfulSyncVariantId = meta.printfulSyncVariantId;

    // Versandadresse: Single Source of Truth ist die Metadata, die wir bei
    // Session-Erstellung selbst eingebettet haben. Fallback auf Stripe's
    // customer_details, falls jemand mit altem Code-Pfad ankommt.
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

    if (!printfulSyncVariantId || !street || !city || !postalCode || !country) {
      console.error(
        "Es fehlen wichtige Daten für Printful (Adresse oder Produkt-ID)!",
        { printfulSyncVariantId, street, city, postalCode, country },
      );
      return NextResponse.json({ error: "Fehlende Daten" }, { status: 400 });
    }

    // JETZT FUNKEN WIR ZU PRINTFUL: "Bitte dieses Shirt drucken und an den Kunden schicken!"
    try {
      const response = await fetch("https://api.printful.com/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
        },
        body: JSON.stringify({
          recipient: {
            name: customerName,
            address1: street,
            city,
            country_code: country,
            zip: postalCode,
            email,
          },
          items: [
            {
              sync_variant_id: parseInt(printfulSyncVariantId, 10),
              quantity: 1,
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Die Fabrik hat geantwortet, aber es gab einen Fehler:", errorData);
      } else {
        console.log("Success! Der Auftrag wurde erfolgreich an die Printful-Fabrik geschickt!");
      }
    } catch (printfulErr) {
      console.error("Das Netzwerkkabel zur Fabrik ist kaputt:", printfulErr);
    }
  }

  // Alles erledigt! Wir antworten der Stripe Kasse: "Haben es verstanden! Over and out."
  return NextResponse.json({ received: true }, { status: 200 });
}
