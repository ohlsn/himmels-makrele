# Himmels Makrele

Kunst vom Himmel, Geschichten aus dem Meer — Markenwebsite für das Print-on-Demand-Business eines jungen Künstlers.

## Technologie

- **Framework**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **Animationen**: Framer Motion
- **Shop**: Eigener Stripe Checkout über Next.js API-Routes
- **Fulfillment**: Printful API (Produkte, Versandraten, Bestellungen)
- **Hosting**: Vercel

## Loslegen

```bash
npm install
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## Konfiguration

Kopiere `.env.example` nach `.env.local` und trage deine Werte ein:

```bash
cp .env.example .env.local
```

### Erforderlich für den Shop
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — öffentlicher Stripe Key
- `STRIPE_SECRET_KEY` — geheimer Stripe Key für Checkout und Danke-Seite
- `STRIPE_WEBHOOK_SECRET` — Stripe Webhook-Signatur für `/api/webhook`
- `PRINTFUL_API_KEY` — Printful API Key für Katalog, Versand und Orders

### Optional
- `NEXT_PUBLIC_FORMSPREE_FORM_ID` oder `FORMSPREE_FORM_ID` — falls das Kontaktformular später per ENV statt `src/lib/constants.ts` konfiguriert wird

## Projektstruktur

```
src/
├── app/                    # Seiten (deutsche Routen)
│   ├── page.tsx            # Startseite
│   ├── ueber-mich/         # Über mich
│   ├── galerie/            # Galerie
│   ├── kontakt/            # Kontakt
│   ├── datenschutz/        # Datenschutz
│   ├── impressum/          # Impressum
│   ├── shop/               # Shop mit Stripe Checkout
│   ├── danke/              # Bestellbestätigung
│   └── api/                # Checkout- und Webhook-Routen
├── components/
│   ├── layout/             # Header, Footer, MobileNav, CookieBanner
│   ├── home/               # Hero, ÜberMichVorschau, GalerieVorschau, ShopVorschau
│   ├── gallery/            # KunstwerkKarte, KunstwerkRaster
│   └── ui/                 # Button, WellenTeiler, FischAnimation, WolkenAnimation
├── lib/
│   └── constants.ts        # Seitenkonfiguration, Navigation, Geschäftsdaten
content/
├── about.ts                # Über-mich-Inhalt
├── gallery.ts              # Galerie-Kunstwerkdaten
├── pricing.ts              # Brutto-Endpreise ohne Versand
└── shop.ts                 # Auto-generierte Shop-Daten aus Printful
scripts/
├── sync-catalog.mjs        # Printful → Bilder/Varianten/Stock → shop.ts
├── apply-pricing.mjs       # pricing.ts → Stripe Preise + shop.ts
├── sync-size-guides.mjs    # Printful-Größentabellen → shop.ts
└── pricing-analysis.mjs    # Marge gegen Printful Wholesale prüfen
public/assets/
├── mockups-inbox/          # Inbox für neue Printful-Mockups/ZIPs
└── shop/                   # Optimierte Shop-Bilder
```

## Anpassen

- **Geschäftsdaten**: Bearbeite `src/lib/constants.ts` (KvK-Nummer, BTW-id, E-Mail usw.)
- **Kunstwerke**: Ersetze die Platzhalter in `content/gallery.ts` und füge Bilder in `public/assets/gallery/` hinzu
- **Shop-Produkte**: Neue Produkte zuerst in Printful anlegen, dann `node scripts/sync-catalog.mjs` ausführen
- **Shop-Mockups**: Printful-ZIPs oder Bilder in `public/assets/mockups-inbox/` legen; Unterordner wie `Wolf` helfen bei eindeutiger Zuordnung
- **Preise**: `content/pricing.ts` pflegen und danach `node scripts/apply-pricing.mjs` ausführen
- **Größenhilfe**: Lokale EU-/Altersgrößen in `content/sizeGuides.ts`; exakte Printful-Maße optional mit `node scripts/sync-size-guides.mjs`
- **Größenfamilie prüfen**: Nach neuen Produkten `npm run check:size-guides` ausführen und neue Produkt-IDs bewusst als `adult`, `kids` oder `baby` einordnen
- **Farben**: Bearbeite den `@theme`-Block in `src/app/globals.css`

## Shop-Workflow

1. Produkt und Varianten in Printful anlegen.
2. Mockup-ZIP oder Bilder in `public/assets/mockups-inbox/` legen.
3. `node scripts/sync-catalog.mjs` ausführen. Das Skript holt Printful-Produkte, Farben, Größen, Lagerstatus und Preview-Bilder, verarbeitet die Inbox und generiert `content/shop.ts`.
4. Produktpreis in `content/pricing.ts` setzen. Diese Preise sind Brutto-Preise inkl. BTW, aber ohne Versand.
5. `node scripts/apply-pricing.mjs` ausführen, damit Stripe-Preise und `content/shop.ts` konsistent bleiben.
6. Bei Bedarf `node scripts/sync-size-guides.mjs` ausführen, um nur die Printful-Größentabellen zu aktualisieren.
7. `npm run check:size-guides` ausführen. Neue Produkte dürfen erst live gehen, wenn ihre Größenfamilie in `content/sizeGuides.ts` explizit gepflegt ist.

Versand ist nicht im Shop-Preis enthalten. Die echten Printful-Versandkosten werden beim Checkout anhand der Adresse berechnet und in Stripe angezeigt.

Der Kauf läuft über Produktdetailseiten. Die Shop-Übersicht ist nur ein Katalog; Größenwahl, Größentabelle und Checkout liegen auf `/shop/[productId]`.

## Veröffentlichung

Verbinde dieses Repository mit [Vercel](https://vercel.com) — jeder Push wird automatisch veröffentlicht.
