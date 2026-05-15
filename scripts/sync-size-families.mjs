/**
 * 👕 Sync Size Families: erkennt für jedes Shop-Produkt automatisch, ob der
 * Printful-Rohling ein Adult-, Kids- oder Baby-Produkt ist.
 *
 * Quelle: Printful Catalog `title` und `type_name`. Die Strings sind dort
 * eindeutig: "Youth Classic Tee", "Baby Jersey Bodysuit", "Kids Organic
 * Cotton T-Shirt", "Unisex Staple T-Shirt", etc.
 *
 * Schreibt zwei Felder pro Produkt in content/shop.ts:
 *   - sizeFamily: "adult" | "kids" | "baby"
 *   - catalogTitle: roher Printful-Titel zur Nachvollziehbarkeit
 *
 * Idempotent: gleicher Lauf ohne Printful-Änderung tut nichts.
 * Greift keine Preise, Stripe-Produkte oder Bilder an.
 */
import fs from 'fs/promises';
import { detectFamily } from './_lib_size_family.mjs';

async function readEnv() {
  const envContent = await fs.readFile('.env.local', 'utf-8');
  const env = {};
  envContent.split('\n').forEach((line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) env[match[1]] = match[2].trim();
  });
  return env;
}

function parseShop(raw) {
  const match = raw.match(/(^[\s\S]*export const shopData: Product\[\] = )(\[[\s\S]+\])(;\s*$)/);
  if (!match) throw new Error('content/shop.ts konnte nicht geparst werden');
  return {
    prefix: match[1],
    shopData: JSON.parse(match[2]),
    suffix: match[3],
  };
}

async function getCatalogInfo(syncVariantId, apiKey) {
  const svRes = await fetch(`https://api.printful.com/store/variants/${syncVariantId}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!svRes.ok) throw new Error(`store variant ${syncVariantId}: ${svRes.status}`);
  const svData = await svRes.json();
  const productId = svData.result?.product?.product_id;
  if (!productId) throw new Error(`store variant ${syncVariantId}: kein catalog product_id`);

  const catRes = await fetch(`https://api.printful.com/products/${productId}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!catRes.ok) throw new Error(`catalog product ${productId}: ${catRes.status}`);
  const catData = await catRes.json();
  const product = catData.result?.product;
  if (!product) throw new Error(`catalog product ${productId}: keine product-Daten`);

  return {
    catalogProductId: productId,
    title: product.title || '',
    typeName: product.type_name || '',
  };
}

const env = await readEnv();
if (!env.PRINTFUL_API_KEY) {
  console.error('❌ PRINTFUL_API_KEY fehlt in .env.local');
  process.exit(1);
}

const shopRaw = await fs.readFile('./content/shop.ts', 'utf-8');
const { prefix, shopData, suffix } = parseShop(shopRaw);

const catalogCache = new Map();
let changed = 0;
let unchanged = 0;
let failed = 0;

for (const product of shopData) {
  const firstVariant = product.variants?.[0];
  if (!firstVariant?.printfulSyncVariantId) {
    console.log(`⚠️  ${product.name}: keine Printful Variant ID`);
    failed++;
    continue;
  }

  try {
    const svId = firstVariant.printfulSyncVariantId;
    if (!catalogCache.has(svId)) {
      catalogCache.set(svId, await getCatalogInfo(svId, env.PRINTFUL_API_KEY));
    }
    const info = catalogCache.get(svId);
    const family = detectFamily(info.title, info.typeName);

    const before = { family: product.sizeFamily, title: product.catalogTitle };
    const after = { family, title: info.title };
    const diff =
      before.family !== after.family || before.title !== after.title;

    product.sizeFamily = family;
    product.catalogTitle = info.title;

    const marker = before.family && before.family !== family ? '⚠️ ' : '';
    const arrow =
      before.family && before.family !== family
        ? ` (war: ${before.family})`
        : '';
    console.log(
      `${diff ? '→' : '✓'}  ${marker}${product.name.padEnd(36)} → ${family}${arrow}`,
    );
    console.log(`     ${info.title}`);
    if (diff) changed++;
    else unchanged++;
  } catch (error) {
    console.log(`⚠️  ${product.name}: ${error.message}`);
    failed++;
  }
}

await fs.writeFile('./content/shop.ts', prefix + JSON.stringify(shopData, null, 2) + suffix);

console.log(`\n${changed > 0 ? '✅' : '✓ '} ${changed} Änderung(en), ${unchanged} unverändert`);
if (failed > 0) {
  console.error(`❌ ${failed} Produkt(e) konnten nicht ermittelt werden`);
  process.exit(1);
}
