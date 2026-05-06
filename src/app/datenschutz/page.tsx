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
      <div className="max-w-3xl mx-auto">
        <SectionHeading>Datenschutzerklärung</SectionHeading>

        <div className="space-y-8 text-ocean/80 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-sky/10">
          <section>
            <h3 className="font-heading text-xl font-bold text-ocean">
              1. Verantwortliche Stelle
            </h3>
            <p>
              {BUSINESS_INFO.legalEntity} ({BUSINESS_INFO.legalForm}), handelnd
              unter dem Namen {BUSINESS_INFO.name}
              <br />
              {BUSINESS_INFO.owner}
              <br />
              {BUSINESS_INFO.street}, {BUSINESS_INFO.postalCode}{" "}
              {BUSINESS_INFO.city}, {BUSINESS_INFO.country}
              <br />
              KvK: {BUSINESS_INFO.kvkNumber} · BTW: {BUSINESS_INFO.btwNumber}
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
            <h3 className="font-heading text-xl font-bold text-ocean">
              2. Welche Daten wir verarbeiten
            </h3>
            <p>Wir verarbeiten personenbezogene Daten in folgenden Fällen:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Server-Logs (Hosting):</strong> Beim Aufruf der Seite
                werden technisch notwendige Daten (IP-Adresse, Datum, Uhrzeit,
                aufgerufene Seite, Browser, Betriebssystem) kurzfristig
                verarbeitet. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO
                (berechtigtes Interesse am sicheren Betrieb).
              </li>
              <li>
                <strong>Bestellungen:</strong> Bei einer Bestellung erheben wir
                Name, Liefer-/Rechnungsadresse, E-Mail-Adresse und die
                Produktauswahl. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO
                (Vertragserfüllung).
              </li>
              <li>
                <strong>Kontaktformular:</strong> Bei Nutzung des
                Kontaktformulars verarbeiten wir Name, E-Mail-Adresse und
                deine Nachricht zur Bearbeitung deiner Anfrage.
                Rechtsgrundlage: Art. 6 Abs. 1 lit. b/f DSGVO.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-heading text-xl font-bold text-ocean">
              3. Eingesetzte Dienstleister (Auftragsverarbeiter)
            </h3>
            <ul className="list-disc pl-6 mt-2 space-y-3">
              <li>
                <strong>Hosting — Vercel Inc., USA.</strong> Auslieferung der
                Website. Datentransfer in die USA auf Grundlage der EU-Standard­
                vertragsklauseln (SCC). Mehr Infos:{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-deep hover:underline"
                >
                  vercel.com/legal/privacy-policy
                </a>
                .
              </li>
              <li>
                <strong>Zahlungsabwicklung — Stripe Payments Europe Ltd.,
                Irland.</strong> Bei einer Bestellung werden deine Zahlungs- und
                Rechnungsdaten direkt durch Stripe verarbeitet. Wir selbst
                erhalten keine Kreditkartendaten. Datenschutzhinweise:{" "}
                <a
                  href="https://stripe.com/de/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-deep hover:underline"
                >
                  stripe.com/de/privacy
                </a>
                .
              </li>
              <li>
                <strong>Druck und Versand — Printful Inc., USA / Lettland.
                </strong>{" "}
                Wir leiten Lieferadresse, Name und E-Mail-Adresse an Printful
                weiter, damit dein Produkt produziert und an dich versendet
                werden kann. Datentransfer in Drittländer (USA) auf Grundlage
                der EU-Standardvertragsklauseln. Datenschutz:{" "}
                <a
                  href="https://www.printful.com/policies/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-deep hover:underline"
                >
                  printful.com/policies/privacy
                </a>
                .
              </li>
              <li>
                <strong>Kontaktformular — Formspree Inc., USA.</strong> Daten
                aus dem Kontaktformular werden über Formspree zugestellt.
                Datentransfer in die USA auf Grundlage der EU-Standardvertrags­
                klauseln. Datenschutz:{" "}
                <a
                  href="https://formspree.io/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-deep hover:underline"
                >
                  formspree.io/legal/privacy-policy
                </a>
                .
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-heading text-xl font-bold text-ocean">
              4. Cookies und lokale Speicherung
            </h3>
            <p>
              Diese Website setzt selbst keine Tracking- oder Analyse-Cookies
              ein. Zur reinen Funktion verwenden wir <em>localStorage</em> deines
              Browsers, um deine Favoriten in der Galerie lokal zu speichern —
              diese Daten verlassen dein Gerät nicht. Beim Zahlungsvorgang
              setzt Stripe eigene technisch notwendige Cookies (z. B. zur
              Betrugsprävention).
            </p>
          </section>

          <section>
            <h3 className="font-heading text-xl font-bold text-ocean">
              5. Speicherdauer
            </h3>
            <p>
              Bestelldaten speichern wir, solange dies zur Vertragserfüllung
              erforderlich ist und gesetzliche Aufbewahrungsfristen (z. B.
              steuerlich) bestehen. Anfragen aus dem Kontaktformular werden
              gelöscht, sobald deine Anfrage abschließend bearbeitet ist und
              keine gesetzlichen Aufbewahrungsfristen entgegenstehen.
            </p>
          </section>

          <section>
            <h3 className="font-heading text-xl font-bold text-ocean">
              6. Deine Rechte (DSGVO / AVG)
            </h3>
            <p>
              Du hast jederzeit das Recht auf Auskunft (Art. 15), Berichtigung
              (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung
              (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch
              (Art. 21). Außerdem hast du das Recht, dich bei einer Aufsichts­
              behörde zu beschweren — in den Niederlanden ist das die{" "}
              <a
                href="https://autoriteitpersoonsgegevens.nl/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-deep hover:underline"
              >
                Autoriteit Persoonsgegevens
              </a>
              . Schreib uns für Anfragen zu deinen Daten an{" "}
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="text-sky-deep hover:underline"
              >
                {BUSINESS_INFO.email}
              </a>
              .
            </p>
          </section>

          <p className="text-sm text-ocean/50">Stand: Mai 2026</p>
        </div>
      </div>
    </div>
  );
}
