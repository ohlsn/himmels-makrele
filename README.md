# Himmels Makrele

Kunst vom Himmel, Geschichten aus dem Meer — Brand website for a young artist's print-on-demand business.

## Tech Stack

- **Framework**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Commerce** (Phase 2): Shopify Storefront API
- **Fulfillment**: Printify (connects to Shopify)
- **Hosting**: Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

### Required for Phase 2 (Shop)
- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` — your Shopify store domain
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` — Storefront API access token
- `SHOPIFY_REVALIDATION_SECRET` — webhook secret for on-demand ISR

### Optional
- Formspree: Update the form action URL in `src/app/kontakt/page.tsx`

## Project Structure

```
src/
├── app/                    # Pages (German routes)
│   ├── page.tsx            # Startseite (homepage)
│   ├── ueber-mich/         # Über mich
│   ├── galerie/            # Galerie
│   ├── kontakt/            # Kontakt
│   ├── datenschutz/        # Datenschutz (privacy)
│   └── impressum/          # Impressum (legal)
├── components/
│   ├── layout/             # Header, Footer, MobileNav, CookieBanner
│   ├── home/               # Hero, AboutPreview, GalleryPreview, ShopPreview
│   ├── gallery/            # ArtworkCard, ArtworkGrid
│   └── ui/                 # Button, WaveDivider, FishAnimation, CloudAnimation
├── lib/
│   ├── constants.ts        # Site config, nav links, business info
│   └── shopify/            # Shopify client & queries (Phase 2)
content/
├── about.ts                # About page content
└── gallery.ts              # Gallery artwork data
```

## Customization

- **Business info**: Edit `src/lib/constants.ts` (KvK number, BTW-id, email, etc.)
- **Artwork**: Replace placeholder data in `content/gallery.ts` and add images to `public/images/`
- **Colors**: Edit the `@theme` block in `src/app/globals.css`

## Deployment

Connect this repo to [Vercel](https://vercel.com) for automatic deployments on push.
