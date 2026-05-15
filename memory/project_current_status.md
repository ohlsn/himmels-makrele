---
name: Current project status
description: Stripe + Printful shop architecture, catalog sync workflow, pricing policy, and next checks
type: project
---

# Current Project Status — Himmels Makrele

Stand: 2026-05-15

## Aktuelle Shop-Architektur

- Der Shop nutzt **Stripe Checkout + Printful**, nicht Shopify/Printify.
- Printify Pop-Up Store wurde verworfen, weil er u. a. nicht gut zur gewünschten EUR-/Checkout-Logik passte.
- Produktkarten laufen über `src/components/shop/ProductCard.tsx`.
- Die Shop-Übersicht ist bewusst nur noch ein Produktkatalog. Kaufen passiert nicht mehr direkt auf der Card.
- Produktdetailseiten laufen über `/shop/[productId]` und `src/components/shop/ProductDetail.tsx`.
- Die Größenhilfe priorisiert lokale EU-/Alltagsgrößen aus `content/sizeGuides.ts`; exakte Printful-Maße sind sekundär im Drawer.
- Jede Produkt-ID muss in `productSizeFamilyOverrides` explizit als `adult`, `kids` oder `baby` gepflegt sein. `npm run check:size-guides` prüft das, damit neue XS/S/M/L/XL-Produkte nicht automatisch falsch als Erwachsenengrößen angezeigt werden.
- Produktdetails wie Beschreibung, Material, Pflege, Lieferung und Produktion stehen als Accordions unter dem CTA.
- Checkout läuft über `src/app/api/checkout/route.ts`.
- Erfolgreiche Zahlungen werden über `src/app/api/webhook/route.ts` an Printful gesendet.
- Die Danke-Seite liest die Stripe Session und zeigt Bestell-/Adressdaten aus Session Metadata.

## Preise und Versand

- `content/pricing.ts` ist die Single Source of Truth für Produktpreise.
- Preise sind Brutto-Preise inkl. 21% BTW, aber **ohne Versand**.
- Im Shop soll klar stehen: Alle Preise ohne Versand.
- Versand wird erst im Checkout anhand der Lieferadresse live über Printful berechnet und als Stripe Shipping Option angezeigt.
- Nach Preisänderungen in `content/pricing.ts`: `node scripts/apply-pricing.mjs` ausführen.

## Printful Sync und Mockup Inbox

- `content/shop.ts` ist auto-generiert und darf nicht manuell gepflegt werden.
- `node scripts/sync-catalog.mjs` holt Produkte, Varianten, Farben, Lagerstatus und Preview-Bilder aus Printful.
- `node scripts/sync-size-guides.mjs` holt nur die Printful-Größentabellen nach und ändert keine Preise, Stripe-Produkte oder Bilder.
- Neue Mockups/ZIPs kommen in `public/assets/mockups-inbox/`.
- Die Inbox darf Unterordner enthalten. Unterordner wie `Wolf` oder `Wolf T-Shirt` helfen bei der Zuordnung, weil Printful-Dateinamen oft nur den Rohling enthalten.
- Das Skript entpackt ZIPs automatisch, verarbeitet Bilder rekursiv, matched Produkt/Farbe, fragt bei Konflikten im Terminal nach, kopiert Bilder nach `public/assets/shop/`, löscht verarbeitete Inbox-Dateien und schreibt `content/shop.ts`.
- Bereits vorhandene `prod-...` Bilder in `public/assets/shop/` werden durch den Recovery-Scanner wieder mit Produkten/Farben verknüpft.

## Wichtige Skripte

- `node scripts/sync-catalog.mjs` — Printful + Mockup Inbox → `content/shop.ts`
- `node scripts/apply-pricing.mjs` — `content/pricing.ts` → Stripe Preise + `content/shop.ts`
- `node scripts/sync-size-guides.mjs` — Printful Size Guides → `content/shop.ts`
- `npm run check:size-guides` — kontrolliert explizite Größenfamilien pro Produkt
- `node scripts/pricing-analysis.mjs` — Marge gegen Printful Wholesale, VAT, Stripe Fee und Versandannahme prüfen
- `node scripts/test-order.mjs` — direkte Printful Draft Order als Sanity Check

## Bekannte naechste Punkte

- Echter Live-Testkauf auf `https://himmels-makrele.com` prüfen: Adresse, Printful-Versand, VAT-Split, Zahlung, `/danke`, Stripe Dashboard, Printful Pending/Draft Order.
- Danach ggf. Stripe Refund und Printful-Storno.
- Dokumentation war veraltet und wurde am 2026-05-15 auf Stripe + Printful und "Versand im Checkout" korrigiert.
