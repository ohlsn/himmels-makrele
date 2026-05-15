# Himmels Makrele — Vollständiger Projektplan

## Was ist Himmels Makrele?

Himmels Makrele ist die Marke eines 11-jährigen Künstlers aus den Niederlanden.
Er zeichnet Bilder, inspiriert von Momenten, Atemübungen und der Natur — Himmel und Meer.
Seine Kunst kommt auf T-Shirts, Hoodies und andere Artikel, die über
Print-on-Demand (Printful) gedruckt und versendet werden.

**Der Name**: Die Makrele schwimmt im Meer und schaut nach oben zum Himmel.
So wie der Künstler — immer nach oben schauend, inspiriert von Wolken, Sternen und dem weiten Himmel.

**Slogan**: "Sei so frei wie die Himmels Makrele"
**Sub-Slogan**: "Kunst vom Himmel, Geschichten aus dem Meer"

---

## So funktioniert die Technik (einfach erklärt)

### Die Website (was wir gebaut haben)
Die Website ist wie ein digitales Schaufenster. Sie zeigt:
- Wer der Künstler ist
- Seine Kunstwerke
- Welche Produkte es gibt
- Wie man Kontakt aufnehmen kann

**Gebaut mit:**
- **Next.js** = Ein Werkzeug zum Bauen von Websites (wie ein Baukasten)
- **Tailwind CSS** = Macht die Website hübsch (Farben, Abstände, Formen)
- **Framer Motion** = Sorgt für coole Animationen (schwimmende Fische, schwebende Wolken)

### Der Shop (aktuelle Architektur)
- **Stripe Checkout** = Sichere Kasse für Zahlungen in EUR, inklusive iDEAL, Karte und Klarna.
- **Printful** = Druckt die Kunst auf Produkte und versendet direkt an Kunden.
- **Next.js API-Routes** = Verbinden Stripe und Printful im Hintergrund.
- **Vercel** = Hostet Website, Checkout-API und Webhook.

### So fließen die Daten
```
Künstler zeichnet Bild
    ↓
Bild wird auf Printful hochgeladen und auf Produkte gesetzt
    ↓
`node scripts/sync-catalog.mjs` synchronisiert Produkte, Farben, Größen, Lagerstatus und Bilder in `content/shop.ts`
    ↓
Unsere Website zeigt die Produkte aus `content/shop.ts` an
    ↓
Kunde kauft ein Produkt → Stripe kassiert → Webhook legt Printful-Order an → Printful druckt & versendet
```

---

## Was ist schon fertig

### Seiten der Website
| Seite | URL | Beschreibung |
|---|---|---|
| Startseite | `/` | Hero-Bereich, Über-mich-Vorschau, Galerie-Vorschau, Shop-Teaser |
| Über mich | `/ueber-mich` | Die Geschichte des Künstlers, seine Inspiration |
| Galerie | `/galerie` | Kunstwerke in einem Raster mit Klick-Vergrößerung |
| Kontakt | `/kontakt` | Kontaktformular für Nachrichten |
| Datenschutz | `/datenschutz` | Datenschutzerklärung (gesetzlich vorgeschrieben) |
| Impressum | `/impressum` | Geschäftsdaten (gesetzlich vorgeschrieben) |

### Features
- Schwimmende Makrelen-Animation zwischen den Abschnitten
- Schwebende Wolken im Hero-Bereich
- Wellenförmige Trenner zwischen Bereichen
- Seitenübergangs-Animationen (sanftes Einblenden)
- Scroll-Animationen (Elemente erscheinen beim Runterscrollen)
- Springende Makrele als Lade-Animation
- Lustige 404-Seite ("Diese Seite ist mit einer Makrele davongeschwommen")
- Cookie-Banner (gesetzlich vorgeschrieben in den Niederlanden)
- Responsive Design (sieht gut aus auf Handy, Tablet und Computer)
- SEO-Optimierung (Sitemap, robots.txt, Social-Media-Vorschaubild)
- Shop mit Stripe Checkout und Printful-Webhook
- Printful-Katalog-Sync mit Farben, Größen, Lagerstatus und Bildern
- Mockup-Inbox für neue Produktbilder
- Pricing-System mit `content/pricing.ts` und Stripe-Sync

### Aktuell noch Platzhalter (muss ersetzt werden)
- Kunstwerk-Bilder → Echte Zeichnungen des Künstlers einpflegen
- Profilbild → Echtes Foto oder Avatar
- Weitere finale Galerie-Kunstwerke

---

## Was als nächstes kommt

### Shop-Workflow bei neuen Produkten
1. **Produkt in Printful anlegen** und Varianten/Farben konfigurieren.
2. **Mockup-ZIP oder Bilder exportieren** und in `public/assets/mockups-inbox/` legen.
3. **Unterordner nutzen**, wenn der Dateiname mehrdeutig ist, z. B. `Wolf` oder `Wolf T-Shirt`.
4. **`node scripts/sync-catalog.mjs` ausführen**. Das Skript holt den Printful-Katalog, verarbeitet die Inbox, lädt Preview-Bilder, setzt Lagerstatus und generiert `content/shop.ts`.
5. **Preis in `content/pricing.ts` setzen**. Preise sind brutto inkl. BTW, aber ohne Versand.
6. **`node scripts/apply-pricing.mjs` ausführen**, damit Stripe und `shop.ts` denselben Produktpreis nutzen.

### Checkout- und Versandlogik
- Im Shop stehen Produktpreise ohne Versand.
- Beim Klick auf Kaufen wird zuerst die Lieferadresse abgefragt.
- Die echte Versandrate wird über Printful geholt.
- Stripe Checkout zeigt Produktpreis, Versand und Steuer-Split.
- Nach Zahlung legt der Webhook die Printful-Order an.

### Phase 3: Feinschliff
- Echter Live-Testkauf auf `https://himmels-makrele.com`
- Danach ggf. Refund in Stripe und Storno in Printful
- Analytics einrichten (sehen, wie viele Besucher kommen)
- Performance optimieren

---

## Geschäftliche Infos

### Was muss erledigt werden?
- [ ] **KvK-Registrierung**: Als eenmanszaak (Einzelunternehmen) registrieren (~€75)
- [ ] **BTW-id beantragen**: Für die MwSt.-Befreiung (KOR: unter €20k/Jahr keine MwSt.)
- [ ] **Bankkonto**: Geschäftskonto einrichten (oder separates Konto für die Einnahmen)
- [x] **Domain**: himmels-makrele.com verbunden

### Was kostet es?
| Posten | Kosten |
|---|---|
| KvK-Registrierung | ~€75 (einmalig) |
| Stripe | Transaktionsgebühren pro Zahlung |
| Printful | Produktions- und Versandkosten pro Bestellung |
| Domain | ~€10/Jahr |
| Vercel Hosting | Kostenlos |
| **Laufend fix** | **niedrig; Hauptkosten entstehen pro Bestellung** |

### Rechtliches
- Papa ist der offizielle Inhaber (ein 11-Jähriger darf in NL kein Unternehmen führen)
- KvK-Nummer muss auf der Website stehen
- Datenschutzerklärung ist schon auf der Website
- Cookie-Banner ist schon eingebaut

---

## Marketing: Wie kommen Kunden?

### Kostenlose Kanäle (damit anfangen!)

**1. Instagram + TikTok**
- Zeitraffer-Videos vom Zeichnen posten
- "Mit 11 mein eigenes Business" — diese Geschichte ist Gold wert
- 15-60 Sekunden Reels/Shorts, 3-5x pro Woche
- Hashtags: #youngartist #kinderkunst #printbusiness

**2. Pinterest**
- Jedes Kunstwerk und Produkt als Pin hochladen
- Pinnwände nach Themen: "Himmelkunst", "Meerkunst", "Produkte"
- Pinterest bringt monatelang Besucher nach einem einzigen Pin

**3. In der Nachbarschaft und Schule**
- Kunstmärkte und Schulveranstaltungen
- Lokale Facebook-Gruppen
- Mundpropaganda — Freunde, Familie, andere Eltern
- Lokale Zeitung kontaktieren ("11-Jähriger gründet Kunstbusiness")

**4. Etsy als zweiter Verkaufskanal**
- Printful kann auch mit Etsy verbunden werden
- Etsy hat eingebaute Suche — Leute finden dich dort von allein

### Wofür KEIN Geld ausgeben (noch nicht!)
- Keine bezahlte Werbung auf Facebook/Instagram
- Keine Influencer-Partnerschaften
- Keine Google Ads

**Faustregel**: Erst kostenlos beweisen, dass es funktioniert. Nach 20-30 Verkäufen wisst ihr,
welche Produkte am besten laufen — dann könnt ihr Geld in Werbung stecken.

---

## Projektstruktur (für Entwickler)

```
himmels-makrele/
├── CLAUDE.md               # Kontext für Claude Code (wird automatisch gelesen)
├── AGENTS.md               # Next.js-Hinweise
├── README.md               # Projektdokumentation (Deutsch)
├── docs/
│   └── PROJEKTPLAN.md      # Dieser Plan
├── .env.example            # Vorlage für Umgebungsvariablen
├── content/
│   ├── about.ts            # Über-mich-Texte
│   └── gallery.ts          # Galerie-Daten (Platzhalter)
├── public/
│   └── assets/
│       ├── gallery/        # Galerie-Bilder
│       ├── mockups-inbox/  # Inbox für neue Printful-Mockups/ZIPs
│       └── shop/           # Optimierte Shop-Bilder
├── src/
│   ├── app/                # Alle Seiten
│   ├── components/         # Wiederverwendbare Bausteine
│   ├── lib/
│   │   └── constants.ts    # Seiteneinstellungen
│   └── hooks/              # React Hooks (Phase 2)
├── package.json
├── next.config.ts
└── tsconfig.json
```

### Farben
| Name | Farbe | Hex | Wofür |
|---|---|---|---|
| sky-light | Hellblau | #E0F2FE | Hintergründe |
| sky | Himmelblau | #38BDF8 | Hauptfarbe |
| sky-deep | Tiefblau | #0369A1 | Überschriften |
| ocean | Ozeanblau | #164E63 | Footer, dunkle Bereiche |
| fish-gold | Gold | #FBBF24 | Buttons, Highlights |
| fish-orange | Orange | #FB923C | Zweitfarbe |
| coral | Pink | #F472B6 | Farbliche Akzente |
