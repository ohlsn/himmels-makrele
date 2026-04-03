@AGENTS.md

# Himmels Makrele — Projektkontext

## Wichtig: Sprache
Kommuniziere IMMER auf Deutsch mit dem Nutzer. Alle Texte, Kommentare und Erklärungen auf Deutsch.
Der Nutzer ist ein Vater, der zusammen mit seinem 11-jährigen Sohn an diesem Projekt arbeitet.
Erkläre Dinge einfach und verständlich — der Sohn liest mit!

## Was ist das Projekt?
**Himmels Makrele** ist eine Markenwebsite + Print-on-Demand-Business eines 11-jährigen Künstlers
aus den Niederlanden. Er zeichnet Kunst, inspiriert von Momenten und Atemübungen, und verkauft
sie auf T-Shirts, Lunchboxen und anderen Artikeln über Printify.

## Aktueller Stand
- **Phase 1 (ERLEDIGT)**: Markenwebsite mit Next.js, Tailwind CSS v4, Framer Motion
- **Phase 2 (ALS NÄCHSTES)**: Shopify-Integration + Shop-Seiten + Warenkorb
- **Phase 3**: Analytics, Performance-Feinschliff

## Wichtige Design-Entscheidungen
- **Headline**: "Sei so frei wie die Himmels Makrele" (NICHT "Himmels Makrele" allein)
- **Sub-Headline**: "Kunst vom Himmel, Geschichten aus dem Meer"
- **Sprache der Website**: Deutsch
- **Farbpalette**: Himmel/Ozean-Thema (sky #38BDF8, ocean #164E63, fish-gold #FBBF24)
- **Schriften**: Fredoka (Überschriften), Inter (Fließtext) — via Google Fonts CDN
- **Animationen**: Schwimmende Makrelen, schwebende Wolken, Wellenteiler, Scroll-Reveals

## Geschäftliche Infos
- **Standort**: Niederlande
- **Rechtsform**: Eenmanszaak (Einzelunternehmen) / ZZP
- **Registrierung**: KvK (Kamer van Koophandel)
- **MwSt.**: Kleineondernemersregeling (KOR) — befreit unter €20k/Jahr
- **Geschäftsdaten**: Müssen noch in `src/lib/constants.ts` eingetragen werden (KvK-Nr., BTW-id, Name)

## Technische Architektur
- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 (CSS-basierte Konfiguration in globals.css, KEIN tailwind.config.ts)
- **Animationen**: Framer Motion
- **Shop (Phase 2)**: Shopify Storefront API — Client/Queries/Types sind in `src/lib/shopify/` vorbereitet
- **Fulfillment**: Printify (verbunden mit Shopify, kein Code nötig)
- **Kontaktformular**: Formspree (Form-ID muss noch eingetragen werden in `src/app/kontakt/page.tsx`)
- **Hosting**: Vercel (noch nicht deployed)

## Schlüsseldateien
- `src/lib/constants.ts` — Seitenname, Navigation, Social Links, Geschäftsdaten
- `src/app/globals.css` — Farbpalette und Theme (@theme Block)
- `content/about.ts` — Über-mich-Texte
- `content/gallery.ts` — Galerie-Kunstwerkdaten (aktuell Platzhalter)
- `src/components/home/HeroSection.tsx` — Hero-Bereich der Startseite
- `src/lib/shopify/` — Shopify-Integration (vorbereitet für Phase 2)
- `.env.example` — Vorlage für Umgebungsvariablen

## Offene Aufgaben
- [ ] Echte Kunstwerke des Sohnes einpflegen (Bilder in `public/images/`, Daten in `content/gallery.ts`)
- [ ] Geschäftsdaten eintragen in `src/lib/constants.ts`
- [ ] Formspree-Konto erstellen und Form-ID eintragen
- [ ] Shopify-Store einrichten + Printify verbinden
- [ ] Shopify Storefront API Token holen → in `.env.local` eintragen
- [ ] Phase 2: Shop-Seiten und Warenkorb aktivieren
- [ ] Domain registrieren (himmelsmakrele.nl oder .com)
- [ ] Auf Vercel deployen

## Marketing-Strategie (Zusammenfassung)
1. **Instagram + TikTok**: Zeitraffer-Zeichenvideos, "11-Jähriger baut Business" Story
2. **Pinterest**: Kunstwerke und Produkte pinnen
3. **Lokal**: Schulveranstaltungen, Kunstmärkte, lokale Presse
4. **Etsy**: Als Nebenkanal (Printify verbindet sich auch mit Etsy)
5. **SEO**: Website ist bereits optimiert (Sitemap, robots.txt, OG-Bilder)
6. **KEINE bezahlte Werbung** bis Bestseller bekannt sind (nach 20-30 Verkäufen)

## Kostenübersicht
| Posten | Kosten |
|---|---|
| Shopify Basic | ~€36/Monat |
| Printify | Kostenlos |
| Domain | ~€10/Jahr |
| Vercel Hosting | Kostenlos |
| KvK-Registrierung | ~€75 (einmalig) |
| **Laufend gesamt** | **~€40/Monat** |

## Ausführlicher Projektplan
Siehe `docs/PROJEKTPLAN.md` für den vollständigen Plan mit allen Details.
