import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import { BUSINESS_INFO, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: `Datenschutzerklärung von ${SITE_NAME}`,
};

export default function DatenschutzPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-ocean">
        <SectionHeading>Datenschutzerklärung</SectionHeading>

        <div className="space-y-8 text-ocean/80">
          <section>
            <h3 className="font-heading text-xl font-bold text-ocean">
              1. Verantwortliche Stelle
            </h3>
            <p>
              {BUSINESS_INFO.name}
              <br />
              {BUSINESS_INFO.owner}
              <br />
              KvK-Nummer: {BUSINESS_INFO.kvkNumber}
              <br />
              E-Mail: {BUSINESS_INFO.email}
            </p>
          </section>

          <section>
            <h3 className="font-heading text-xl font-bold text-ocean">
              2. Welche Daten wir erheben
            </h3>
            <p>
              Wenn du unser Kontaktformular benutzt, speichern wir deinen Namen,
              deine E-Mail-Adresse und deine Nachricht, um dir antworten zu können.
              Diese Daten werden über den Dienst Formspree verarbeitet.
            </p>
          </section>

          <section>
            <h3 className="font-heading text-xl font-bold text-ocean">
              3. Cookies
            </h3>
            <p>
              Diese Website verwendet technisch notwendige Cookies, um die
              Funktionalität der Seite zu gewährleisten (z.B. Cookie-Zustimmung).
              Wenn du unseren Shop besuchst, werden möglicherweise zusätzliche
              Cookies von Shopify gesetzt, um deinen Warenkorb und deine Bestellung
              zu verarbeiten.
            </p>
          </section>

          <section>
            <h3 className="font-heading text-xl font-bold text-ocean">
              4. Deine Rechte (AVG/DSGVO)
            </h3>
            <p>
              Du hast das Recht auf Auskunft, Berichtigung, Löschung und
              Einschränkung der Verarbeitung deiner personenbezogenen Daten.
              Kontaktiere uns unter{" "}
              <a href={`mailto:${BUSINESS_INFO.email}`} className="text-sky-deep hover:underline">
                {BUSINESS_INFO.email}
              </a>{" "}
              um deine Rechte auszuüben.
            </p>
          </section>

          <section>
            <h3 className="font-heading text-xl font-bold text-ocean">
              5. Hosting
            </h3>
            <p>
              Diese Website wird von Vercel Inc. gehostet. Beim Besuch der
              Website werden automatisch technische Daten (z.B. IP-Adresse,
              Browser-Typ) in Server-Logs gespeichert. Dies ist für den Betrieb
              der Website notwendig.
            </p>
          </section>

          <p className="text-sm text-ocean/50 mt-8">
            Stand: April 2026
          </p>
        </div>
      </div>
    </div>
  );
}
