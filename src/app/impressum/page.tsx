import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import { BUSINESS_INFO, SITE_NAME } from "@/lib/constants";

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
              Angaben gemäß gesetzlicher Informationspflicht
            </h3>
            <p>
              {BUSINESS_INFO.name}
              <br />
              Eenmanszaak / ZZP
            </p>
          </section>

          <section>
            <h3 className="font-heading text-lg font-bold text-ocean mb-2">
              Inhaber
            </h3>
            <p>{BUSINESS_INFO.owner}</p>
          </section>

          <section>
            <h3 className="font-heading text-lg font-bold text-ocean mb-2">
              Handelsregister
            </h3>
            <p>
              Kamer van Koophandel (KvK): {BUSINESS_INFO.kvkNumber}
              <br />
              BTW-identificatienummer: {BUSINESS_INFO.btwNumber}
            </p>
          </section>

          <section>
            <h3 className="font-heading text-lg font-bold text-ocean mb-2">
              Kontakt
            </h3>
            <p>
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
              Haftungshinweis
            </h3>
            <p className="text-sm">
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine
              Haftung für die Inhalte externer Links. Für den Inhalt der
              verlinkten Seiten sind ausschließlich deren Betreiber
              verantwortlich.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
