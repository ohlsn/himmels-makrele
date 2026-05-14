# Projekt: Himmels Makrele
Ein Next.js 16 App Router Projekt (TypeScript, Tailwind CSS v4, Framer Motion).

## Wichtige Befehle
- `npm run dev` — Entwicklungsserver
- `npm run build` — Produktionsbuild
- `node scripts/sync-catalog.mjs` — Synchronisiert `content/shop.ts` aus dem Printful-Store (zieht Brutto-Preise aus `content/pricing.ts`, nicht aus Printfuls retail_price)
- `node scripts/apply-pricing.mjs` — Nach Edit von `content/pricing.ts`: zieht Stripe-Preise nach + aktualisiert `shop.ts`
- `node scripts/pricing-analysis.mjs` — Analyse aktueller Preise vs. Wholesale + Gewinn-Rechnung
- `node scripts/test-order.mjs` — Sendet eine DRAFT-Bestellung an Printful (kostet nichts, dient zum Testen der API-Anbindung)

## Brand Identity & Tone of Voice
Texte aus der Ich-Perspektive der "Himmels Makrele":
- Erwachsen, leicht sarkastisch, trocken, tiefgründig.
- Steht für den Ausbruch aus dem Mainstream ("Mit dem Schwarm schwimmen").
- Kern-Slogan: "Sei so frei wie die Himmels Makrele".
- Humor: Ironisch ("Fragt nicht wie ein Fisch den Stift hält"), distanziert von konventionellen Biologie-Logiken. Keine kindliche Sprache.

## Architektur

### 1. Galerie & Favoriten
- Kunstwerke in [content/gallery.ts](content/gallery.ts).
- Favoriten via Client-Side `localStorage` Hook ([src/hooks/useFavorites.ts](src/hooks/useFavorites.ts)).
- Favoriten-Herz dauerhaft im Info-Bereich (mobil-tauglich, kein Hover-Zwang).

### 2. Shop — Stripe Checkout + Printful (eigene Kasse)
**Wichtig:** Printify Pop-Up Store wurde verworfen (nur USD verfügbar). Aktuelle Architektur:

- **Frontend:** [src/components/shop/ProductCard.tsx](src/components/shop/ProductCard.tsx) mit Farb-/Größenauswahl, Out-of-Stock-Anzeige, Lightbox. Klick auf "Kaufen" → POST an `/api/checkout`.
- **Stripe Checkout** ([src/app/api/checkout/route.ts](src/app/api/checkout/route.ts)): erstellt Session in EUR mit `card`, `iDEAL`, `klarna`. Versand auf DE+NL beschränkt. Hängt `printfulSyncVariantId` an die Session-Metadaten.
- **Webhook** ([src/app/api/webhook/route.ts](src/app/api/webhook/route.ts)): hört auf `checkout.session.completed` → POST an `https://api.printful.com/orders` mit Kundenadresse und `sync_variant_id`. Stripe-Signatur wird verifiziert.
- **Shop-Daten:** [content/shop.ts](content/shop.ts) ist **auto-generiert** durch `scripts/sync-catalog.mjs`. Nicht von Hand editieren — Änderungen gehen beim nächsten Sync verloren.
- **Preise:** [content/pricing.ts](content/pricing.ts) ist die Single Source of Truth für Brutto-Endpreise (Cent-Beträge pro `productId`). Bei Preis-Änderung dort editieren + `node scripts/apply-pricing.mjs` ausführen — Stripe-Preise und `shop.ts` werden konsistent nachgezogen. `sync-catalog.mjs` respektiert diese Werte und überschreibt sie nicht.
- **Bilder:** Echte Mockups (`pf_mock_*`) und Lifestyle-Fotos (`prod-*`) in [public/assets/shop/](public/assets/shop/).

### 3. ENV (`.env.local`, nicht im Repo)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `PRINTFUL_API_KEY`

### 4. Stripe-Setup (für Oli, ZZP/NL)
- Stripe-Account NL, Währung EUR.
- Steuerregeln manuell konfiguriert: NL 21%, DE 19% (inklusiv).
- Stripe API-Version: `2026-03-25.dahlia`.

## Skript-Verzeichnis
Alle produktiven Skripte liegen in [scripts/](scripts/):
- `sync-catalog.mjs` — Quelle der Wahrheit für `content/shop.ts`
- `test-order.mjs` — DRAFT-Bestellung für Sanity-Check

## Anstehende Todos
1. **Test-Bestellung** mit Stripe-Testkarte `4242 4242 4242 4242` Ende-zu-Ende durchziehen (Frontend → Stripe → Webhook → Printful Draft).
2. **Galerie-Bilder:** Farb-Placeholder in `content/gallery.ts` durch finale Kunstwerke ersetzen (Wolf + Giraffant sind da, Rest fehlt).
3. **Rechtliches & Kontakt:** Impressum, Datenschutz, Kontaktformular (Formspree-ID) mit echten Geschäftsdaten füllen.

## Historie / Aktueller Stand
- Architektur-Wechsel von Printify Pop-Up auf **Stripe + Printful** abgeschlossen (uncommitted, riesiger Working-Tree-Stand seit Commit `239190e`).
- API-Routes, ProductCard, sync-/test-Skripte, alle Mockup-Bilder vorhanden.
- Alle 4 ENV-Keys gesetzt.
- `.psd`-Dateien werden über `.vercelignore` und `.gitignore` ausgeschlossen.
