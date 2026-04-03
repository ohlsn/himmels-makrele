import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import { BUSINESS_INFO, SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Nimm Kontakt mit Himmels Makrele auf — Fragen, Zusammenarbeit oder einfach Hallo sagen!",
};

export default function KontaktPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <SectionHeading>Kontakt</SectionHeading>
        <p className="text-center text-ocean/60 mb-10">
          Hast du eine Frage oder möchtest du Hallo sagen? Schreib mir gerne!
        </p>

        <form
          action="https://formspree.io/f/YOUR_FORM_ID"
          method="POST"
          className="space-y-6 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-sky/10"
        >
          <div>
            <label htmlFor="name" className="block font-heading font-semibold text-ocean mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 rounded-xl border border-sky/30 focus:border-sky focus:ring-2 focus:ring-sky/20 outline-none transition-colors"
              placeholder="Dein Name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-heading font-semibold text-ocean mb-1">
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-sky/30 focus:border-sky focus:ring-2 focus:ring-sky/20 outline-none transition-colors"
              placeholder="deine@email.de"
            />
          </div>

          <div>
            <label htmlFor="message" className="block font-heading font-semibold text-ocean mb-1">
              Nachricht
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-sky/30 focus:border-sky focus:ring-2 focus:ring-sky/20 outline-none transition-colors resize-none"
              placeholder="Deine Nachricht..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-fish-gold text-ocean font-heading font-semibold text-lg hover:bg-fish-orange transition-all duration-300 shadow-lg hover:scale-[1.02]"
          >
            Nachricht senden
          </button>
        </form>

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
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-ocean/50 hover:text-sky-deep transition-colors">
              Instagram
            </a>
            <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="text-ocean/50 hover:text-sky-deep transition-colors">
              TikTok
            </a>
            <a href={SOCIAL_LINKS.pinterest} target="_blank" rel="noopener noreferrer" className="text-ocean/50 hover:text-sky-deep transition-colors">
              Pinterest
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
