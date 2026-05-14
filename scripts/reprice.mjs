/**
 * 💶 Repricing-Skript (Strategie A: Versand inkludiert)
 *
 * - Liest aktuelle Stripe-Preise pro Produkt
 * - Erstellt neue Stripe-Preise mit tax_behavior=inclusive
 * - Archiviert alte Preise (active=false)
 * - Schreibt content/shop.ts mit neuen Preisen + neuen stripePriceIds
 *
 * Lauf: node scripts/reprice.mjs
 */
import fs from 'fs/promises';
import Stripe from 'stripe';

const envContent = await fs.readFile('.env.local', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const m = line.match(/^([^=]+)=(.*)$/);
  if (m) env[m[1]] = m[2].trim();
});
const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2026-03-25.dahlia' });

// Strategie A: Versand-inkludierte Brutto-Preise
const NEW_PRICES = {
  'prod-427645374': 2490, // Wolf T-Shirt
  'prod-427646662': 2490, // Youth classic tee
  'prod-427645681': 2690, // Baby Bodysuit
  'prod-428001712': 2990, // Girrafant cotton t-shirt
  'prod-427646425': 2990, // Organic cotton kids t-shirt
  'prod-427646958': 3490, // Girrafant Sweatshirt
  'prod-427644473': 3990, // Girrafant Hoodie
  'prod-427643733': 3990, // Wolfs Hoodie
};

const shopRaw = await fs.readFile('./content/shop.ts', 'utf-8');
const m = shopRaw.match(/export const shopData: Product\[\] = (\[[\s\S]+\]);/);
const shopData = JSON.parse(m[1]);

let updated = shopRaw;

for (const p of shopData) {
  const newAmount = NEW_PRICES[p.id];
  if (!newAmount) {
    console.log(`⚠️  ${p.id} (${p.name}) — kein neuer Preis definiert, übersprungen`);
    continue;
  }

  console.log(`\n→ ${p.name} (${p.id})`);
  const oldPriceId = p.stripePriceId;
  let stripeProductId;

  // Stripe-Produkt-ID via altem Price holen
  try {
    const oldPrice = await stripe.prices.retrieve(oldPriceId);
    stripeProductId = oldPrice.product;
    // alten Preis archivieren
    await stripe.prices.update(oldPriceId, { active: false });
    console.log(`   ✅ alter Preis archiviert: ${oldPriceId}`);
  } catch (e) {
    console.log(`   ⚠️  alter Preis ${oldPriceId} nicht abrufbar — überspringe Archivierung`);
  }

  if (!stripeProductId) {
    // Falls kein altes Produkt: neu anlegen
    const newProd = await stripe.products.create({
      name: p.name,
      tax_code: 'txcd_99999999',
    });
    stripeProductId = newProd.id;
    console.log(`   ✨ neues Stripe-Produkt: ${stripeProductId}`);
  }

  // Neuen Preis anlegen
  const newPrice = await stripe.prices.create({
    product: stripeProductId,
    currency: 'eur',
    unit_amount: newAmount,
    tax_behavior: 'inclusive',
  });
  console.log(`   💶 neuer Preis: € ${(newAmount/100).toFixed(2)} → ${newPrice.id}`);

  // shop.ts: alte stripePriceId ersetzen
  updated = updated.split(oldPriceId).join(newPrice.id);

  // Hauptpreis und alle Variant-Preise im JSON-Block aktualisieren
  const oldPriceStr = p.price; // z.B. "€ 16,00"
  const newPriceStr = `€ ${(newAmount/100).toFixed(2).replace('.', ',')}`;
  // ersetze NUR innerhalb dieses Produktblocks (vom id bis zum nächsten id-Eintrag)
  const blockRegex = new RegExp(`("id":\\s*"${p.id}"[\\s\\S]*?)(?="id":|\\][\\s;])`);
  updated = updated.replace(blockRegex, block => {
    return block
      .split(`"price": "${oldPriceStr}"`).join(`"price": "${newPriceStr}"`)
      .replace(/"numericPrice":\s*\d+/g, `"numericPrice": ${newAmount}`);
  });
}

await fs.writeFile('./content/shop.ts', updated);
console.log(`\n✅ content/shop.ts aktualisiert. Bitte einmal sichten + dev-server neu starten.\n`);
