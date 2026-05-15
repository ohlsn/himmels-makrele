# Projekt: Himmels Makrele
Ein Next.js 16 App Router Projekt (TypeScript, Tailwind CSS v4, Framer Motion).

## Wichtige Befehle
- `npm run dev` — Entwicklungsserver
- `npm run build` — Produktionsbuild
- `node scripts/sync-catalog.mjs` — Synchronisiert `content/shop.ts` aus dem Printful-Store (Produkte, Varianten, Farben, Lagerstatus, Preview-Bilder, Mockup-Inbox; zieht Brutto-Preise aus `content/pricing.ts`, nicht aus Printfuls retail_price)
- `node scripts/apply-pricing.mjs` — Nach Edit von `content/pricing.ts`: zieht Stripe-Preise nach + aktualisiert `shop.ts`
- `node scripts/sync-size-guides.mjs` — Ergänzt `content/shop.ts` um Printful-Größentabellen, ohne Preise/Stripe/Bilder anzufassen
- `npm run sync:size-families` — Liest Printful Catalog Title (z.B. "Youth Classic Tee", "Baby Bodysuit") und persistiert `sizeFamily` (`adult`/`kids`/`baby`) pro Produkt in `content/shop.ts`. Auto-Detection statt manueller Override-Liste.
- `npm run check:size-guides` — Blockiert Produkte ohne Größenfamilie (auto oder Override) und warnt bei Override↔Auto-Konflikten
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

- **Frontend:** [src/components/shop/ProductCard.tsx](src/components/shop/ProductCard.tsx) ist nur noch Katalogkarte ohne Größenwahl/Checkout. Klick führt zur Produktdetailseite `/shop/[productId]`.
- **Produktdetail:** [src/components/shop/ProductDetail.tsx](src/components/shop/ProductDetail.tsx) enthält Bildstrecke, Farbauswahl, Größenwahl, Größentabelle, Accordions und Checkout-CTA. [content/sizeGuides.ts](content/sizeGuides.ts) pflegt lokale EU-/Altersgrößen als primäre UX-Hilfe.
- **Stripe Checkout** ([src/app/api/checkout/route.ts](src/app/api/checkout/route.ts)): erstellt Session in EUR mit `card`, `iDEAL`, `klarna`. Versand auf DE+NL beschränkt. Hängt `printfulSyncVariantId` und die vorher erfasste Lieferadresse an die Session-Metadaten.
- **Webhook** ([src/app/api/webhook/route.ts](src/app/api/webhook/route.ts)): hört auf `checkout.session.completed` → POST an `https://api.printful.com/orders` mit Kundenadresse und `sync_variant_id`. Stripe-Signatur wird verifiziert.
- **Shop-Daten:** [content/shop.ts](content/shop.ts) ist **auto-generiert** durch `scripts/sync-catalog.mjs`. Nicht von Hand editieren — Änderungen gehen beim nächsten Sync verloren.
- **Preise:** [content/pricing.ts](content/pricing.ts) ist die Single Source of Truth für Brutto-Endpreise (Cent-Beträge pro `productId`). Diese Preise sind inkl. BTW, aber **ohne Versand**. Versand wird beim Checkout live über Printful berechnet und zusätzlich in Stripe angezeigt. Bei Preis-Änderung dort editieren + `node scripts/apply-pricing.mjs` ausführen — Stripe-Preise und `shop.ts` werden konsistent nachgezogen. `sync-catalog.mjs` respektiert diese Werte und überschreibt sie nicht.
- **Bilder:** Echte Mockups (`pf_mock_*`) und Lifestyle-Fotos (`prod-*`) in [public/assets/shop/](public/assets/shop/).

### 2a. Produkt- und Mockup-Workflow
- Neue Produkte werden zuerst in Printful angelegt.
- Printful-Mockups oder ZIP-Exports kommen nach [public/assets/mockups-inbox/](public/assets/mockups-inbox/). Die Inbox ist aktuell der Arbeitsordner für neue T-Shirt-/Hoodie-Designs.
- Unterordner in der Inbox helfen bei der Zuordnung, z. B. `Wolf`, `Wolf T-Shirt` oder `Wolfhudi`, weil Printful-Dateinamen oft nur den Rohling nennen.
- `sync-catalog.mjs` entpackt ZIPs automatisch, scannt Unterordner rekursiv, matched Produkt und Farbe, fragt bei Mehrdeutigkeit im Terminal nach, kopiert Bilder nach `public/assets/shop/`, löscht die verarbeiteten Inbox-Dateien und generiert `content/shop.ts`.
- Der Recovery-Scanner im Skript verknüpft bereits vorhandene `prod-...` Bilder im Shop-Ordner erneut, falls sie beim vorherigen Lauf noch nicht in `shop.ts` standen.
- Größentabellen: Lokale Alltags-/EU-Größen stehen in [content/sizeGuides.ts](content/sizeGuides.ts). Exakte Printful-Produktmaße sind sekundär und werden per `sync-size-guides.mjs` nach `content/shop.ts` ergänzt.
- Größenfamilie (`adult`/`kids`/`baby`) wird automatisch aus Printfuls Catalog-Title erkannt — XS-XL ist mehrdeutig, aber "Youth Classic Tee" oder "Baby Bodysuit" ist eindeutig. Workflow für neue Produkte: `node scripts/sync-size-families.mjs` ausführen, dann `npm run check:size-guides` als Gate. `productSizeFamilyOverrides` in sizeGuides.ts bleibt nur für echte Edge-Cases, in denen Printfuls Title irreführend ist.

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
- `apply-pricing.mjs` — Quelle der Wahrheit für Stripe-Preis-Sync aus `content/pricing.ts`
- `sync-size-guides.mjs` — sicherer Nachzieh-Sync nur für Größentabellen
- `pricing-analysis.mjs` — Marge prüfen (VAT, Stripe Fee, Wholesale, Versandannahme)
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
