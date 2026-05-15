/**
 * 💶 Verkaufspreise (Brutto, inkl. 21% BTW, ohne Versand)
 *
 * Single source of truth für die Endpreise im Shop.
 *
 * - Werte als Cent-Beträge (z.B. 2490 = € 24,90)
 * - Strategie: Wholesale + Stripe-Gebühr + Marge → Brutto
 * - Versand wird im Checkout separat über Printful berechnet und angezeigt
 * - Beim Ändern → `node scripts/apply-pricing.mjs` ausführen,
 *   damit Stripe-Preise nachgezogen werden + shop.ts den neuen
 *   stripePriceId bekommt.
 *
 * Wenn ein Produkt hier fehlt, läuft sync-catalog.mjs auf den
 * Printful-`retail_price` zurück und gibt eine Warnung aus.
 */
export const pricing: Record<string, number> = {
  "prod-427645374": 2490, // Wolf T-Shirt
  "prod-427646662": 2490, // Youth classic tee
  "prod-427645681": 2690, // Girrafant Baby jersey bodysuit
  "prod-428001712": 2990, // Girrafant cotton t-shirt
  "prod-427646425": 2990, // Organic cotton kids t-shirt
  "prod-427646958": 3490, // Girrafant Sweatshirt
  "prod-427644473": 3990, // Girrafant Hoodie
  "prod-427643733": 3990, // Wolfs Hoodie
};
