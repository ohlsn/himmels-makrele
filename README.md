# Himmels Makrele

Kunst vom Himmel, Geschichten aus dem Meer — Markenwebsite für das Print-on-Demand-Business eines jungen Künstlers.

## Technologie

- **Framework**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **Animationen**: Framer Motion
- **Shop** (Phase 2): Shopify Storefront API
- **Fulfillment**: Printify (verbunden mit Shopify)
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

### Erforderlich für Phase 2 (Shop)
- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` — deine Shopify-Store-Domain
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` — Storefront API Zugriffstoken
- `SHOPIFY_REVALIDATION_SECRET` — Webhook-Secret für automatische Aktualisierung

### Optional
- Formspree: Aktualisiere die Formular-URL in `src/app/kontakt/page.tsx`

## Projektstruktur

```
src/
├── app/                    # Seiten (deutsche Routen)
│   ├── page.tsx            # Startseite
│   ├── ueber-mich/         # Über mich
│   ├── galerie/            # Galerie
│   ├── kontakt/            # Kontakt
│   ├── datenschutz/        # Datenschutz
│   └── impressum/          # Impressum
├── components/
│   ├── layout/             # Header, Footer, MobileNav, CookieBanner
│   ├── home/               # Hero, ÜberMichVorschau, GalerieVorschau, ShopVorschau
│   ├── gallery/            # KunstwerkKarte, KunstwerkRaster
│   └── ui/                 # Button, WellenTeiler, FischAnimation, WolkenAnimation
├── lib/
│   ├── constants.ts        # Seitenkonfiguration, Navigation, Geschäftsdaten
│   └── shopify/            # Shopify-Client & Abfragen (Phase 2)
content/
├── about.ts                # Über-mich-Inhalt
└── gallery.ts              # Galerie-Kunstwerkdaten
```

## Anpassen

- **Geschäftsdaten**: Bearbeite `src/lib/constants.ts` (KvK-Nummer, BTW-id, E-Mail usw.)
- **Kunstwerke**: Ersetze die Platzhalter in `content/gallery.ts` und füge Bilder in `public/images/` hinzu
- **Farben**: Bearbeite den `@theme`-Block in `src/app/globals.css`

## Veröffentlichung

Verbinde dieses Repository mit [Vercel](https://vercel.com) — jeder Push wird automatisch veröffentlicht.
