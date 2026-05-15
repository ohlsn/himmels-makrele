/**
 * 📏 Sync Size Guides: ergänzt content/shop.ts um Printful-Größentabellen.
 *
 * Nutzt bestehende printfulSyncVariantId-Werte, findet darüber das Printful-
 * Basisprodukt und zieht dessen Size Guide in Zentimetern. Dieses Skript
 * ändert keine Preise, Stripe-Produkte oder Bilder.
 */
import fs from 'fs/promises';

async function readEnv() {
  const envContent = await fs.readFile('.env.local', 'utf-8');
  const env = {};
  envContent.split('\n').forEach(line => {
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

function normalizeSizeGuide(result) {
  const tablesRaw = Array.isArray(result?.size_tables) ? result.size_tables : [];
  const tables = tablesRaw
    .map((table) => {
      const measurements = Array.isArray(table.measurements) ? table.measurements : [];
      const sizes = [
        ...new Set(
          measurements.flatMap((measurement) =>
            Array.isArray(measurement.values)
              ? measurement.values.map((value) => value.size).filter(Boolean)
              : []
          )
        )
      ];
      const rows = measurements.map((measurement) => ({
        label: measurement.type_label || measurement.type || "Maß",
        values: sizes.map((size) => {
          const match = measurement.values?.find((value) => value.size === size);
          return {
            size,
            value: match?.value?.toString() || "",
          };
        }),
      }));

      return {
        type: table.type,
        title: table.title || table.type_label,
        unit: table.unit || "cm",
        sizes,
        rows,
      };
    })
    .filter((table) => table.sizes.length > 0 && table.rows.length > 0);

  if (tables.length === 0) return undefined;

  return {
    source: "Printful",
    availableSizes: Array.isArray(result?.available_sizes) ? result.available_sizes : [],
    tables,
  };
}

async function getBaseProductId(syncVariantId, apiKey) {
  const response = await fetch(`https://api.printful.com/store/variants/${syncVariantId}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!response.ok) throw new Error(`store variant ${syncVariantId}: ${response.status}`);
  const data = await response.json();
  return data.result?.product?.product_id;
}

async function getSizeGuide(productId, apiKey) {
  const response = await fetch(`https://api.printful.com/products/${productId}/sizes?unit=cm`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!response.ok) throw new Error(`size guide ${productId}: ${response.status}`);
  const data = await response.json();
  return normalizeSizeGuide(data.result);
}

const env = await readEnv();
if (!env.PRINTFUL_API_KEY) {
  console.error('❌ PRINTFUL_API_KEY fehlt in .env.local');
  process.exit(1);
}

const shopRaw = await fs.readFile('./content/shop.ts', 'utf-8');
const { prefix, shopData, suffix } = parseShop(shopRaw);
const guideCache = new Map();
let updated = 0;
let skipped = 0;
let failed = 0;

for (const product of shopData) {
  if (!product.sizes?.length) {
    skipped++;
    continue;
  }

  const firstVariant = product.variants?.[0];
  if (!firstVariant?.printfulSyncVariantId) {
    console.log(`⚠️  ${product.name}: keine Printful Variant ID`);
    failed++;
    continue;
  }

  try {
    const baseProductId = await getBaseProductId(
      firstVariant.printfulSyncVariantId,
      env.PRINTFUL_API_KEY,
    );
    if (!baseProductId) {
      console.log(`⚠️  ${product.name}: kein Basisprodukt gefunden`);
      continue;
    }

    if (!guideCache.has(baseProductId)) {
      guideCache.set(baseProductId, await getSizeGuide(baseProductId, env.PRINTFUL_API_KEY));
    }

    const guide = guideCache.get(baseProductId);
    if (guide) {
      product.sizeGuide = guide;
      updated++;
      console.log(`✓ ${product.name}: Größentabelle aktualisiert`);
    } else {
      console.log(`⚠️  ${product.name}: keine Größentabelle verfügbar`);
      failed++;
    }
  } catch (error) {
    console.log(`⚠️  ${product.name}: ${error.message}`);
    failed++;
  }
}

await fs.writeFile('./content/shop.ts', prefix + JSON.stringify(shopData, null, 2) + suffix);
console.log(`\n✅ ${updated} Produkt-Größentabelle(n) aktualisiert`);
if (skipped > 0) console.log(`ℹ️  ${skipped} Produkt(e) ohne Größen übersprungen`);

if (failed > 0) {
  console.error(`❌ ${failed} Produkt(e) konnten nicht mit Printful-Maßen aktualisiert werden`);
  process.exit(1);
}
