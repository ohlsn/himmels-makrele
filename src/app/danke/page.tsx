import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import SectionHeading from "@/components/ui/SectionHeading";
import PageTransition from "@/components/ui/PageTransition";
import { BUSINESS_INFO } from "@/lib/constants";
import { shopData } from "../../../content/shop";

export const metadata: Metadata = {
  title: "Danke",
  description:
    "Bestellung erhalten — die Makrele schaltet auf Reisemodus.",
  robots: { index: false, follow: false },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_123", {
  apiVersion: "2026-03-25.dahlia",
});

function formatEur(cents: number | null | undefined) {
  const value = (cents ?? 0) / 100;
  return value.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  });
}

function lookupVariant(printfulSyncVariantId: string | undefined | null) {
  if (!printfulSyncVariantId) return null;
  for (const product of shopData) {
    const variant = product.variants?.find(
      (v) => v.printfulSyncVariantId.toString() === printfulSyncVariantId,
    );
    if (variant) {
      const colorData = product.colors.find((c) => c.name === variant.color);
      return {
        productName: product.name,
        color: variant.color,
        size: variant.size,
        image: colorData?.images[0],
      };
    }
  }
  return null;
}

export default async function DankePage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    redirect("/shop");
  }

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
  } catch {
    return (
      <PageTransition>
        <div className="py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <SectionHeading>Bestellung nicht gefunden</SectionHeading>
            <p className="text-ocean/70 mt-6 mb-10">
              Der Bestelllink ist ungültig oder abgelaufen. Falls du wirklich
              gerade gekauft hast und das hier siehst, schreib mir kurz —
              dann checke ich das im System.
            </p>
            <Link
              href={`mailto:${BUSINESS_INFO.email}`}
              className="text-sky-deep font-semibold hover:underline"
            >
              {BUSINESS_INFO.email}
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (session.payment_status !== "paid") {
    return (
      <PageTransition>
        <div className="py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <SectionHeading>Zahlung in Bearbeitung</SectionHeading>
            <p className="text-ocean/70 mt-6">
              Die Zahlung ist bei deiner Bank noch unterwegs. Sobald sie durch
              ist, kommt automatisch eine Bestätigung an deine E-Mail-Adresse.
            </p>
          </div>
        </div>
      </PageTransition>
    );
  }

  const meta = session.metadata ?? {};
  const customerEmail = session.customer_details?.email ?? "";
  // Versandadresse aus Metadata (autoritativ), Fallback auf Stripe customer_details
  const customerName =
    meta.ship_name || session.customer_details?.name || "";
  const shipAddress = {
    line1: meta.ship_street || session.customer_details?.address?.line1 || "",
    city: meta.ship_city || session.customer_details?.address?.city || "",
    postal_code:
      meta.ship_postal_code ||
      session.customer_details?.address?.postal_code ||
      "",
    country: meta.ship_country || session.customer_details?.address?.country || "",
  };
  const address = shipAddress.line1 ? shipAddress : null;

  const variantInfo = lookupVariant(meta.printfulSyncVariantId ?? null);
  const lineItem = session.line_items?.data[0];
  const productLabel =
    variantInfo?.productName ?? lineItem?.description ?? "Dein Produkt";

  const orderRef = session.id.slice(-12).toUpperCase();

  return (
    <PageTransition>
      <div className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <SectionHeading>
            Schön, du bist mit dem Schwarm gebrochen.
          </SectionHeading>
          <p className="text-center text-ocean/70 mt-6 mb-10">
            Bestellung Nr. <strong>{orderRef}</strong> ist gespeichert. Die
            Makrele schaltet jetzt auf Reisemodus.
          </p>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-sky/10 space-y-8 text-ocean/80">
            <section>
              <h3 className="font-heading text-lg font-bold text-ocean mb-3">
                Was du gewählt hast
              </h3>
              <div className="flex gap-4 items-start">
                {variantInfo?.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={variantInfo.image}
                    alt={productLabel}
                    className="w-24 h-24 object-cover rounded-xl border border-sky/10"
                  />
                )}
                <div className="flex-1">
                  <p className="font-semibold text-ocean">{productLabel}</p>
                  {variantInfo && (
                    <p className="text-sm">
                      {variantInfo.color}, Größe {variantInfo.size}
                    </p>
                  )}
                  <p className="text-sm">Menge: {lineItem?.quantity ?? 1}</p>
                </div>
                <p className="font-bold text-ocean text-lg">
                  {formatEur(session.amount_total)}
                </p>
              </div>
            </section>

            {address && (
              <section>
                <h3 className="font-heading text-lg font-bold text-ocean mb-3">
                  Adresse, an die&apos;s geht
                </h3>
                <p className="leading-relaxed">
                  {customerName}
                  <br />
                  {address.line1}
                  <br />
                  {address.postal_code} {address.city}
                  <br />
                  {address.country}
                </p>
              </section>
            )}

            <section>
              <h3 className="font-heading text-lg font-bold text-ocean mb-3">
                Wann es kommt
              </h3>
              <p>
                Druck dauert 2–5 Werktage, Versand nochmal 3–5 Werktage.
                Insgesamt ungefähr 1–2 Wochen — je nachdem wie schnell die
                Druckmaschine Lust hat.
              </p>
            </section>

            <section>
              <h3 className="font-heading text-lg font-bold text-ocean mb-3">
                Was jetzt passiert
              </h3>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  Eine Zahlungsbestätigung kommt gleich an{" "}
                  <strong>{customerEmail || "deine E-Mail"}</strong>
                </li>
                <li>
                  Sobald die Druckerei losliegt, schickt Printful eine
                  Versand-Mail mit Tracking-Link
                </li>
                <li>
                  Bei Fragen:{" "}
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="text-sky-deep hover:underline"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </li>
              </ul>
            </section>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/galerie"
              className="text-sky-deep font-semibold hover:underline"
            >
              Während du wartest — schau in der Galerie vorbei
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
