/**
 * 🔤 Einmal-Skript: ASCII-safe Dateinamen für alle Shop-Bilder
 * (Weiß → Weiss, Königsblau → Koenigsblau, "Sport Grey" → Sport_Grey)
 * + aktualisiert die Pfade in content/shop.ts.
 */
import fs from 'fs/promises';
import path from 'path';

const SHOP_DIR = './public/assets/shop';
const SHOP_TS = './content/shop.ts';

function asciiSlug(name) {
  return name
    .replace(/ß/g, 'ss')
    .replace(/ä/g, 'ae').replace(/Ä/g, 'Ae')
    .replace(/ö/g, 'oe').replace(/Ö/g, 'Oe')
    .replace(/ü/g, 'ue').replace(/Ü/g, 'Ue')
    .replace(/[^A-Za-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

const files = await fs.readdir(SHOP_DIR);
const renames = [];

for (const file of files) {
  // Splitte am ersten "_" um Prefix (z.B. pf_mock, prod, pf_sync) und Rest zu trennen
  // Einfacher Ansatz: alle Sonderzeichen im gesamten Namen durch ASCII-Equivalente ersetzen,
  // dabei "_" und "." und "-" und Ziffern behalten.
  const ext = path.extname(file);
  const base = file.slice(0, -ext.length);
  const safeBase = base
    .replace(/ß/g, 'ss')
    .replace(/ä/g, 'ae').replace(/Ä/g, 'Ae')
    .replace(/ö/g, 'oe').replace(/Ö/g, 'Oe')
    .replace(/ü/g, 'ue').replace(/Ü/g, 'Ue')
    .replace(/ /g, '_');
  const safeName = safeBase + ext;
  if (safeName !== file) {
    renames.push({ from: file, to: safeName });
  }
}

console.log(`🔍 ${renames.length} Dateien benötigen Umbenennung\n`);

let shopContent = await fs.readFile(SHOP_TS, 'utf-8');
let pathReplacements = 0;

for (const { from, to } of renames) {
  await fs.rename(path.join(SHOP_DIR, from), path.join(SHOP_DIR, to));
  // Pfade in shop.ts (kommen als /assets/shop/<file>) ersetzen
  const before = shopContent;
  shopContent = shopContent.split(from).join(to);
  if (shopContent !== before) pathReplacements++;
}

await fs.writeFile(SHOP_TS, shopContent);
console.log(`✅ ${renames.length} Dateien umbenannt`);
console.log(`✅ ${pathReplacements} Pfade in shop.ts aktualisiert`);
