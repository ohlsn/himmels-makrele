# Projekt: Himmels Makrele
Ein Next.js App Router Projekt (TypeScript, Tailwind CSS v4, Framer Motion)

## Wichtige Befehle
- `npm run dev` (Startet den Entwicklungsserver)
- `npm run build` (Baut die produktionsfertige Seite)

## Brand Identity & Tone of Voice
Die Texte werden aus der Ich-Perspektive der "Himmels Makrele" geschrieben. 
**Die Makrele ist:** 
- Erwachsen, leicht sarkastisch, trocken, tiefgründig.
- Steht für den Ausbruch aus dem Mainstream ("Mit dem Schwarm schwimmen").
- Kern-Slogan: "Sei so frei wie die Himmels Makrele".
- Humor: Ironisch ("Fragt nicht wie ein Fisch den Stift hält"), distanziert von konventionellen Biologie-Logiken. Vermeidet kindliche Sprache.

## Architektur & Features
### 1. Galerie & Favoriten
- Alle Kunstwerke sind in `content/gallery.ts` definiert.
- **Favoriten-Feature:** Client-Side `localStorage` Hook (`src/hooks/useFavorites.ts`).
- **Mobile-Friendly UI:** Das Favoriten-Herz befindet sich dauerhaft (grau umrandet) im Info-Bereich unterhalb des Bildes, um auf Touch-Geräten optimal auffindbar zu sein (kein Hover-Zwang).

### 2. Shop (Printify Pop-Up Store Modell)
- **Kein Shopify:** Um monatliche Kosten (36€) zu vermeiden, wurde die Shopify-Backend-Architektur komplett ausgebaut.
- **Shop-Daten:** Werden zentral über `content/shop.ts` gesteuert.
- **Flow:** Die Seite präsentiert eigene Produktkarten unter `/shop`. Der "Kaufen"-Button ist ein externer Link (`printifyUrl`), der den Kunden zum kostenlosen Printify Pop-Up Store der Himmels Makrele leitet. Zahlung und Abwicklung laufen komplett über Printify.

## Anstehende Todos (Nächste Session)
1. **Shop abschließen:** Bilder (Mockups) für die angelegten Printify-Produkte in `content/shop.ts` hinterlegen und weitere Produkte hinzufügen (z.B. Giraffenfand-Motiv).
2. **Galerie-Bilder echte einfügen:** Die Farb-Placeholder in `content/gallery.ts` durch die finalen Kunstwerke ersetzen.
3. **Rechtliches & Kontakt:** Impressum, Datenschutz und Kontaktformular (`Formspree-ID`) mit realen Geschäftsdaten bestücken.

## Historie / Aktueller Stand
- **Printify Store:** Ist verknüpft! Das erste Produkt ("Die Makrelen-Uniform") ist in `content/shop.ts` hinterlegt (Preis in Euro) und verlinkt direkt zum Pop-Up Store. CTA-Button wurde auf "Zum Shop" angepasst.
- **Deployment:** Die Seite ist auf Vercel live und der Code ist gesichert. Große `.psd`-Dateien in `assets/` werden über `.vercelignore` und `.gitignore` vom Upload ausgeschlossen, um Limit-Fehler zu vermeiden.
