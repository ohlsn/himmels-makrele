/**
 * 📊 Preisanalyse: Wholesale (Printful Produktion) vs. aktueller Retail-Preis
 *    + Marge nach VAT 21% + Stripe-Gebühren.
 *
 * Hinweis: Versand kommt extra dazu — Printful berechnet ihn pro Bestellung.
 *          Typisch EU-Versand für Apparel: 3,99–5,99 € pro Item.
 */
import fs from 'fs/promises';

const STRIPE_FEE_PCT = 0.015;   // 1,5% für EU-Karten
const STRIPE_FEE_FIX = 0.25;     // 25 Cent pro Transaktion
const VAT_RATE = 0.21;            // NL 21%
const SHIPPING_ASSUMPTION = 4.99; // angenommen, je Item EU-Versand

const envContent = await fs.readFile('.env.local', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const m = line.match(/^([^=]+)=(.*)$/);
  if (m) env[m[1]] = m[2].trim();
});
const PRINTFUL_KEY = env.PRINTFUL_API_KEY;

const shopRaw = await fs.readFile('./content/shop.ts', 'utf-8');
const m = shopRaw.match(/export const shopData: Product\[\] = (\[[\s\S]+\]);/);
const shopData = JSON.parse(m[1]);

console.log("\nPrintful Wholesale vs. aktueller Retail (mit Marge-Rechnung)\n");
console.log("Produkt".padEnd(32), "Retail".padStart(8), "Wholesale".padStart(10), "Netto".padStart(8), "Gewinn".padStart(8));
console.log("-".repeat(72));

for (const p of shopData) {
  const v = p.variants[0];
  const syncVariantId = v.printfulSyncVariantId;
  try {
    const svRes = await fetch(`https://api.printful.com/store/variants/${syncVariantId}`, {
      headers: { Authorization: `Bearer ${PRINTFUL_KEY}` },
    });
    const svData = await svRes.json();
    const sv = svData.result;
    const productId = sv.product.product_id;
    const variantId = sv.product.variant_id;

    const catRes = await fetch(`https://api.printful.com/products/${productId}`, {
      headers: { Authorization: `Bearer ${PRINTFUL_KEY}` },
    });
    const catData = await catRes.json();
    const catVar = catData.result.variants.find(cv => cv.id === variantId);
    const wholesale = parseFloat(catVar?.price || "0");

    const retail = parseFloat(sv.retail_price);
    const vatAmount = retail * VAT_RATE / (1 + VAT_RATE);
    const stripeFee = retail * STRIPE_FEE_PCT + STRIPE_FEE_FIX;
    const netRevenue = retail - vatAmount - stripeFee;
    const profit = netRevenue - wholesale - SHIPPING_ASSUMPTION;

    console.log(
      p.name.substring(0, 30).padEnd(32),
      `€${retail.toFixed(2)}`.padStart(8),
      `€${wholesale.toFixed(2)}`.padStart(10),
      `€${netRevenue.toFixed(2)}`.padStart(8),
      `€${profit.toFixed(2)}`.padStart(8)
    );
  } catch (e) {
    console.log(p.name.padEnd(32), "(Fehler:", e.message + ")");
  }
}

console.log(`\nRechnung pro Stück (Endpreis brutto -> Gewinn):`);
console.log(`  - VAT 21% inkl. ausgerechnet`);
console.log(`  - Stripe-Gebühr: 1,5% + 0,25 € pro Transaktion`);
console.log(`  - Wholesale: Printful-Produktionspreis`);
console.log(`  - Versand: pauschal € ${SHIPPING_ASSUMPTION.toFixed(2)}/Item EU angenommen`);
console.log(`  - Gewinn = Brutto - VAT - Stripe - Wholesale - Versand\n`);
