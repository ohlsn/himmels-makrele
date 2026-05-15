/**
 * Prüft, ob jedes Shop-Produkt explizit einer Größenfamilie zugeordnet ist
 * und exakte Printful-Größentabellen synchronisiert wurden.
 *
 * Hintergrund: Printful-Größen wie XS/S/M/L/XL sind mehrdeutig. Ein Produkt
 * kann adult, youth oder kids sein. Ohne explizite Zuordnung können falsche
 * Alltagstabellen angezeigt werden.
 */
import fs from 'fs/promises';

const shopRaw = await fs.readFile('./content/shop.ts', 'utf-8');
const shopMatch = shopRaw.match(/export const shopData: Product\[\] = (\[[\s\S]+\]);/);
if (!shopMatch) {
  console.error('❌ content/shop.ts konnte nicht geparst werden');
  process.exit(1);
}
const shopData = JSON.parse(shopMatch[1]);

const sizeGuideRaw = await fs.readFile('./content/sizeGuides.ts', 'utf-8');
const overrideMatch = sizeGuideRaw.match(/productSizeFamilyOverrides:\s*Record<string,\s*ProductSizeFamily>\s*=\s*(\{[\s\S]+?\});/);
if (!overrideMatch) {
  console.error('❌ productSizeFamilyOverrides konnte nicht gefunden werden');
  process.exit(1);
}

const overrideIds = new Set(
  Array.from(overrideMatch[1].matchAll(/"([^"]+)":\s*"(adult|kids|baby)"/g)).map((match) => match[1])
);

const missingFamilies = shopData.filter((product) => !overrideIds.has(product.id));

if (missingFamilies.length > 0) {
  console.error('❌ Für folgende Produkte fehlt eine explizite Größenfamilie in content/sizeGuides.ts:');
  for (const product of missingFamilies) {
    console.error(`   - ${product.id} — ${product.name} (${product.sizes.join(', ')})`);
  }
  console.error('\nBitte als adult, kids oder baby in productSizeFamilyOverrides eintragen.');
}

const productsRequiringExactGuides = shopData.filter((product) => product.sizes.length > 0);
const missingExactGuides = productsRequiringExactGuides.filter((product) => {
  const tables = product.sizeGuide?.tables ?? [];
  return !tables.some((table) =>
    table.sizes?.length > 0 &&
    table.rows?.some((row) => row.values?.some((cell) => cell.value && cell.value !== "-"))
  );
});

if (missingExactGuides.length > 0) {
  console.error('\n❌ Für folgende Produkte fehlen exakte Printful-Produktmaße in content/shop.ts:');
  for (const product of missingExactGuides) {
    console.error(`   - ${product.id} — ${product.name}`);
  }
  console.error('\nBitte zuerst `node scripts/sync-size-guides.mjs` ausführen und die Maße im Shop prüfen.');
}

if (missingFamilies.length > 0 || missingExactGuides.length > 0) {
  process.exit(1);
}

console.log(`✅ ${shopData.length} Produkte haben explizite Größenfamilien und Printful-Maßtabellen.`);
