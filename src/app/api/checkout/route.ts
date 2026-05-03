import { NextResponse } from "next/server";
import Stripe from "stripe";
import { shopData } from "../../../../content/shop";

// Die Kasse initialisieren
// Wenn noch kein Key da ist, nutzen wir einen Platzhalter, damit der Server nicht abstürzt
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_123", {
  apiVersion: "2026-03-25.dahlia",
});

export async function POST(req: Request) {
  try {
    // Der Kunde klickt auf ein Produkt und sagt der Kasse, was er kaufen möchte
    const { productId, color, size, printfulSyncVariantId } = await req.json();

    if (!productId || !color || !size) {
      return NextResponse.json({ error: "Fehlende Produktdetails für den Checkout." }, { status: 400 });
    }

    const product = shopData.find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json({ error: "Produkt nicht gefunden." }, { status: 404 });
    }

    // Preis der exakten Variante auslesen, Fallback auf Standardpreis
    const variantRaw = product.variants?.find(v => v.size === size && v.color === color);
    const unitAmount = variantRaw?.numericPrice || parseInt(product.price.replace(/[^0-9]/g, ""));
    const variantName = `${product.name} - ${color} (Größe ${size})`;
    
    // Bild des Produktes für die Kasse sammeln
    const colorData = product.colors.find(c => c.name === color);
    const origin = req.headers.get("origin") || "https://himmels-makrele.de";
    const imageUrl = colorData && colorData.images.length > 0 ? `${origin}${colorData.images[0]}` : undefined;

    // 1. Kasse öffnet sich (Checkout Session erstellen)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "ideal", "klarna"], // Kartenzahlung, iDEAL & Klarna
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: variantName,
              images: imageUrl ? [imageUrl] : [],
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // Wenn bezahlt: Geht zurück in euren Shop (mit ?success in der URL)
      success_url: `${req.headers.get("origin")}/shop?success=true`,
      // Wenn abgebrochen: Geht zurück in euren Shop (ohne Kauf)
      cancel_url: `${req.headers.get("origin")}/shop?canceled=true`,
      
      // Das ist wichtig: Wir fragen die echte Adresse des Kunden ab!
      shipping_address_collection: {
        allowed_countries: ["DE", "NL"], // Nur Deutschland & Niederlande erlaubt
      },

      // METADATEN (Das sind unsere unsichtbaren Klebezettel)
      // Wir kleben einen Zettel an den Einkaufswagen, auf dem für das Lager
      // die genaue Produkt-Nummer der Fabrik steht.
      metadata: {
        printfulSyncVariantId: printfulSyncVariantId ? printfulSyncVariantId.toString() : "",
      },
    });

    // Wir schicken den Kunden zur URL der Stripe-Kasse
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
