import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  BUSINESS_INFO,
  ODR_PLATFORM_URL,
  SITE_NAME,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum und Geschäftsinformationen von ${SITE_NAME}`,
};

export default function ImpressumPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <SectionHeading>Impressum</SectionHeading>

        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-sky/10 space-y-6 text-ocean/80">
          <section>
            <h3 className="font-heading text-xl font-bold text-ocean mb-2">
              Angaben gemäß § 5 DDG (vormals TMG) und Art. 14 ODR-VO
            </h3>
            <p>
              {BUSINESS_INFO.name}
              <br />
              {BUSINESS_INFO.legalForm}
              <br />
              {BUSINESS_INFO.street}
              <br />
              {BUSINESS_INFO.postalCode} {BUSINESS_INFO.city}
              <br />
              {BUSINESS_INFO.country}
            </p>
          </section>

          <section>
            <h3 className="font-heading text-lg font-bold text-ocean mb-2">
              Inhaber / Vertretungsberechtigt
            </h3>
            <p>{BUSINESS_INFO.owner}</p>
          </section>

          <section>
            <h3 className="font-heading text-lg font-bold text-ocean mb-2">
              Kontakt
            </h3>
            <p>
              Telefon: {BUSINESS_INFO.phone}
              <br />
              E-Mail:{" "}
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="text-sky-deep hover:underline"
              >
                {BUSINESS_INFO.email}
              </a>
            </p>
          </section>

          <section>
            <h3 className="font-heading text-lg font-bold text-ocean mb-2">
              Handelsregister & Steuer
            </h3>
            <p>
              Kamer van Koophandel (KvK): {BUSINESS_INFO.kvkNumber}
              <br />
              Umsatzsteuer-Identifikationsnummer (BTW-id):{" "}
              {BUSINESS_INFO.btwNumber}
            </p>
          </section>

          <section>
            <h3 className="font-heading text-lg font-bold text-ocean mb-2">
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h3>
            <p>
              {BUSINESS_INFO.owner}
              <br />
              Anschrift wie oben.
            </p>
          </section>

          <section>
            <h3 className="font-heading text-lg font-bold text-ocean mb-2">
              Online-Streitbeilegung (Art. 14 Abs. 1 ODR-VO)
            </h3>
            <p className="text-sm">
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit, die du hier findest:{" "}
              <a
                href={ODR_PLATFORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-deep hover:underline"
              >
                {ODR_PLATFORM_URL}
              </a>
              . Unsere E-Mail-Adresse findest du oben im Impressum.
            </p>
          </section>

          <section>
            <h3 className="font-heading text-lg font-bold text-ocean mb-2">
              Verbraucherstreitbeilegung (§ 36 VSBG)
            </h3>
            <p className="text-sm">
              Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h3 className="font-heading text-lg font-bold text-ocean mb-2">
              Haftung für Inhalte und Links
            </h3>
            <p className="text-sm">
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine
              Haftung für die Inhalte externer Links. Für den Inhalt der
              verlinkten Seiten sind ausschließlich deren Betreiber
              verantwortlich. Eigene Inhalte auf dieser Website unterliegen
              dem Urheberrecht des Betreibers.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
