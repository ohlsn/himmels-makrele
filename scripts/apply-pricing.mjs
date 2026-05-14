/**
 * 💶 Apply Pricing: Synchronisiert content/pricing.ts mit Stripe & shop.ts
 *
 * Workflow:
 *   1. Editiere content/pricing.ts (Cent-Beträge pro productId)
 *   2. node scripts/apply-pricing.mjs
 *
 * Was passiert:
 *   - Pro Produkt: aktueller Stripe-Preis wird geprüft
 *   - Wenn Betrag abweicht: alter Preis archiviert (active=false),
 *     neuer Preis mit tax_behavior=inclusive erstellt
 *   - content/shop.ts: price, numericPrice (top-level + alle variants),
 *     stripePriceId werden aktualisiert
 *   - Idempotent: wiederholtes Ausführen ohne Änderungen tut nichts
 */
import fs from 'fs/promises';
import Stripe from 'stripe';
import { loadPricing } from './_lib_pricing.mjs';

const envContent = await fs.readFile('.env.local', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const m = line.match(/^([^=]+)=(.*)$/);
  if (m) env[m[1]] = m[2].trim();
});
const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2026-03-25.dahlia' });

const pricing = await loadPricing();
console.log(`📋 ${Object.keys(pricing).length} Preise in content/pricing.ts\n`);

const shopRaw = await fs.readFile('./content/shop.ts', 'utf-8');
const m = shopRaw.match(/(^[\s\S]*export const shopData: Product\[\] = )(\[[\s\S]+\])(;\s*$)/);
if (!m) {
  console.error('❌ Konnte content/shop.ts nicht parsen');
  process.exit(1);
}
const [, prefix, jsonStr, suffix] = m;
const shopData = JSON.parse(jsonStr);

let changesMade = 0;
let warnings = 0;

for (const p of shopData) {
  const targetCents = pricing[p.id];
  if (!targetCents) {
    console.log(`⚠️  ${p.id} (${p.name}) — kein Eintrag in pricing.ts, übersprungen`);
    warnings++;
    continue;
  }

  const targetEurStr = `€ ${(targetCents / 100).toFixed(2).replace('.', ',')}`;

  // Aktuellen Stripe-Preis prüfen
  let currentCents = null;
  let stripeProductId = null;
  try {
    const currentPrice = await stripe.prices.retrieve(p.stripePriceId);
    currentCents = currentPrice.unit_amount;
    stripeProductId = currentPrice.product;
  } catch (e) {
    console.log(`⚠️  ${p.name}: alter Stripe-Preis ${p.stripePriceId} nicht abrufbar`);
  }

  if (currentCents === targetCents) {
    console.log(`✓  ${p.name.padEnd(35)} € ${(targetCents/100).toFixed(2)} (unverändert)`);
    // shop.ts trotzdem konsistenz-checken (top-level + variants)
    p.price = targetEurStr;
    for (const v of p.variants) {
      v.numericPrice = targetCents;
      v.price = targetEurStr;
    }
    continue;
  }

  // Stripe-Produkt sicherstellen
  if (!stripeProductId) {
    const newProd = await stripe.products.create({
      name: p.name,
      tax_code: 'txcd_99999999',
    });
    stripeProductId = newProd.id;
    console.log(`✨ neues Stripe-Produkt: ${stripeProductId}`);
  } else {
    // Alten Preis archivieren
    try {
      await stripe.prices.update(p.stripePriceId, { active: false });
    } catch (e) { /* schon archiviert */ }
  }

  // Neuen Preis anlegen
  const newPrice = await stripe.prices.create({
    product: stripeProductId,
    currency: 'eur',
    unit_amount: targetCents,
    tax_behavior: 'inclusive',
  });

  console.log(`→  ${p.name.padEnd(35)} € ${(currentCents ?? 0)/100} → € ${(targetCents/100).toFixed(2)}  (${newPrice.id})`);

  // shop.ts-Objekt updaten
  p.stripePriceId = newPrice.id;
  p.price = targetEurStr;
  for (const v of p.variants) {
    v.numericPrice = targetCents;
    v.price = targetEurStr;
  }
  changesMade++;
}

const out = prefix + JSON.stringify(shopData, null, 2) + suffix;
await fs.writeFile('./content/shop.ts', out);

console.log(`\n${changesMade > 0 ? '✅' : '✓ '} ${changesMade} Preisänderung(en) durchgeführt, ${warnings} Warnung(en)`);
console.log(`   content/shop.ts ist auf neuestem Stand.`);
