"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import MobileNav from "./MobileNav";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-sky/20 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-heading text-2xl font-bold text-ocean hover:text-sky-deep transition-colors"
        >
          {SITE_NAME}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-heading transition-colors font-medium ${
                  isActive
                    ? "text-sky-deep font-bold border-b-2 border-sky-deep"
                    : "text-ocean/80 hover:text-sky-deep"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-ocean"
          onClick={() => setMobileOpen(true)}
          aria-label="Menü öffnen"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
