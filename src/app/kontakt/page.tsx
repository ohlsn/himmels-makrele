import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import PageTransition from "@/components/ui/PageTransition";
import ContactForm from "@/components/forms/ContactForm";
import { BUSINESS_INFO, SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Nimm Kontakt mit Himmels Makrele auf — Fragen, Zusammenarbeit oder einfach Hallo sagen!",
};

export default function KontaktPage() {
  return (
    <PageTransition>
      <div className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <SectionHeading>Kontakt</SectionHeading>
          <p className="text-center text-ocean/60 mb-10">
            Egal ob geschäftliche Anfragen, tiefsinnige Gedanken oder einfach
            nur so — melde dich.
          </p>

          <ContactForm />

          {/* Alternative contact */}
          <div className="mt-10 text-center">
            <p className="text-ocean/60 mb-4">Oder schreib mir direkt:</p>
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="text-sky-deep font-semibold hover:text-sky transition-colors"
            >
              {BUSINESS_INFO.email}
            </a>

            <div className="flex justify-center gap-6 mt-6">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ocean/50 hover:text-sky-deep transition-colors"
              >
                Instagram
              </a>
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ocean/50 hover:text-sky-deep transition-colors"
              >
                TikTok
              </a>
              <a
                href={SOCIAL_LINKS.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ocean/50 hover:text-sky-deep transition-colors"
              >
                Pinterest
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
