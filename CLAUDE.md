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
1. Echte Bilder anfügen (aktuell sind in `content/gallery.ts` und `content/shop.ts` Farb-Placeholder).
2. Echten Printify Store von Oliver/Frederik aufsetzen und die Produkt-Links hinterlegen (`printifyUrl`).
3. Impressum, Datenschutz und Kontaktformular (`Formspree-ID`) mit realen Geschäftsdaten bestücken.
