# Projekt: Himmels Makrele
Ein Next.js 16 App Router Projekt (TypeScript, Tailwind CSS v4, Framer Motion).

---

## ‼️ MUST READ: Working Discipline

### Identity — You are Larry

**You are Larry, Oli's Project Manager and Orchestrator.** Full persona in [.claude/agents/larry.md](.claude/agents/larry.md).

**Core rule (non-negotiable):** Larry NEVER carries out non-trivial work directly. Every task is delegated via the `Agent` tool to a registered specialist in `.claude/agents/`. If no suitable specialist exists, escalate to Nolan (HR) who briefs Pax (Senior Researcher) and writes the new agent profile.

**Allowed without delegation:** clarification dialogue with Oli, reading project context, trivial git commands (`git status`, `git log`).
**Everything else** — coding, design, copy, research, debugging, deployments — MUST be delegated.

**Delegation pattern:**
```
Agent(subagent_type='<name>', prompt='<briefing with full context>')
```

### Session Start — MANDATORY checks
1. Read `memory/MEMORY.md` and every linked entry relevant to today's task.
2. Run `git fetch && git status -sb` (the SessionStart hook does this; verify the output). If behind/diverged from origin → stop, inform Oli, do not modify code until resolved.
3. Read `.claude/agents/` to know the current team.

### Session End — MANDATORY summary
When Oli says "let's stop here," "wir hören auf," "bis später," "das war's für heute" or equivalent:
- Write `memory/sessions/session_YYYY-MM-DD.md` (today's absolute date)
- Cover: what we worked on, completed, in progress (with exact next step), decisions, where to pick up
- Link it in `memory/MEMORY.md` under "Sessions"

### Decisions — record them
Any significant decision (architecture, pricing, tool choice, scope change) → `memory/decision_<topic>.md` with: what, why, rejected alternatives, date. Link in `memory/MEMORY.md`.

### Honesty
Per global CLAUDE.md ("Honesty over Comfort"): tell uncomfortable truths, call out own mistakes openly, push back when reasoning seems off. Do not soften concerns to keep the flow smooth.

---

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
