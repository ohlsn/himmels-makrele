import Link from "next/link";
import { SITE_NAME, NAV_LINKS, BUSINESS_INFO } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-ocean text-white/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-white mb-3">
              {SITE_NAME}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Kunst vom Himmel, Geschichten aus dem Meer.
              <br />
              Entworfen mit Liebe von einem jungen Künstler.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-white mb-3">
              Navigation
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-fish-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-white mb-3">
              Kontakt
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="hover:text-fish-gold transition-colors"
                >
                  {BUSINESS_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4">
            <Link href="/datenschutz" className="hover:text-white/80 transition-colors">
              Datenschutz
            </Link>
            <Link href="/impressum" className="hover:text-white/80 transition-colors">
              Impressum
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
