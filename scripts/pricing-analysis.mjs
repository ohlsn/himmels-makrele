/**
 * 📊 Preisanalyse: Holt Wholesale-Preise aus Printful + listet aktuelle Retail-Preise.
 */
import fs from 'fs/promises';

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

console.log("\nPrintful Wholesale vs. aktueller Retail-Preis\n");
console.log("Produkt".padEnd(35), "Retail".padStart(10), "Wholesale".padStart(12), "Marge brutto".padStart(15));
console.log("-".repeat(75));

for (const p of shopData) {
  // erste Variante reicht zur Orientierung
  const v = p.variants[0];
  const syncVariantId = v.printfulSyncVariantId;
  try {
    const res = await fetch(`https://api.printful.com/store/variants/@${syncVariantId}`, {
      headers: { Authorization: `Bearer ${PRINTFUL_KEY}` },
    });
    if (!res.ok) {
      console.log(p.name.padEnd(35), `(API ${res.status})`);
      continue;
    }
    const data = await res.json();
    // Wholesale steht in sync_variant.product.price? oder retail_price? Probieren wir was da ist
    const sv = data.result?.sync_variant;
    const wholesaleStr = sv?.product?.price || sv?.retail_price || "?";
    const retailStr = p.price.replace(/[^0-9,.]/g, '').replace(',', '.');
    const wholesale = parseFloat(wholesaleStr);
    const retail = parseFloat(retailStr);
    const marge = !isNaN(retail) && !isNaN(wholesale) ? (retail - wholesale).toFixed(2) : "?";
    console.log(
      p.name.substring(0, 33).padEnd(35),
      p.price.padStart(10),
      `€ ${wholesaleStr}`.padStart(12),
      `€ ${marge}`.padStart(15)
    );
  } catch (e) {
    console.log(p.name.padEnd(35), "(Fehler:", e.message + ")");
  }
}

console.log("\n💡 Achtung: 'Wholesale' aus der Printful Store-API ist der Preis,");
console.log("   den DU in Printful als 'retail price' eingetragen hast. Der echte");
console.log("   Produktionskosten-Preis (was Printful dir berechnet) ist niedriger");
console.log("   und steht im Catalog (/products/<id>), nicht im Store.\n");
