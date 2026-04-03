"use client";

import Link from "next/link";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ocean/40 z-50"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-72 bg-white z-50 shadow-xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-sky/20">
              <span className="font-heading text-xl font-bold text-ocean">
                {SITE_NAME}
              </span>
              <button
                onClick={onClose}
                className="p-2 text-ocean"
                aria-label="Menü schließen"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col p-4 gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="font-heading text-lg text-ocean/80 hover:text-sky-deep hover:bg-sky-light px-4 py-3 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
