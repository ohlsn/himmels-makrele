"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-ocean text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-white/90 text-center sm:text-left">
          Diese Website verwendet Cookies, um dir das beste Erlebnis zu bieten.{" "}
          <a href="/datenschutz" className="underline hover:text-fish-gold">
            Mehr erfahren
          </a>
        </p>
        <div className="flex gap-3">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm rounded-full border border-white/40 hover:bg-white/10 transition-colors"
          >
            Ablehnen
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm rounded-full bg-fish-gold text-ocean font-semibold hover:bg-fish-orange transition-colors"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
