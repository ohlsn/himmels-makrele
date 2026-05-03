/**
 * 🗜️ Bild-Optimierung: Konvertiert alle PNGs in public/assets/shop/ nach WebP
 * (max. 1600px lange Kante, Qualität 80) und löscht die Originale.
 * Aktualisiert die Pfade in content/shop.ts entsprechend.
 *
 * Ausführen: node scripts/optimize-images.mjs
 */
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const SHOP_DIR = './public/assets/shop';
const SHOP_TS = './content/shop.ts';
const MAX_DIM = 1600;
const QUALITY = 80;

const files = (await fs.readdir(SHOP_DIR)).filter(f => f.toLowerCase().endsWith('.png'));
console.log(`🔍 ${files.length} PNG-Dateien gefunden\n`);

let totalBefore = 0;
let totalAfter = 0;
let converted = 0;
let skipped = 0;

for (const file of files) {
  const srcPath = path.join(SHOP_DIR, file);
  const destFile = file.replace(/\.png$/i, '.webp');
  const destPath = path.join(SHOP_DIR, destFile);

  try {
    const statBefore = await fs.stat(srcPath);
    totalBefore += statBefore.size;

    await sharp(srcPath)
      .resize(MAX_DIM, MAX_DIM, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(destPath);

    const statAfter = await fs.stat(destPath);
    totalAfter += statAfter.size;
    await fs.unlink(srcPath);

    converted++;
    if (converted % 50 === 0) {
      console.log(`  …${converted}/${files.length} konvertiert`);
    }
  } catch (err) {
    console.error(`❌ Fehler bei ${file}:`, err.message);
    skipped++;
  }
}

console.log(`\n✅ ${converted} Bilder konvertiert, ${skipped} übersprungen`);
console.log(`📦 Größe: ${(totalBefore / 1024 / 1024).toFixed(1)} MB → ${(totalAfter / 1024 / 1024).toFixed(1)} MB (${((1 - totalAfter / totalBefore) * 100).toFixed(0)}% Ersparnis)`);

console.log(`\n🔧 Aktualisiere Pfade in ${SHOP_TS}…`);
const shopContent = await fs.readFile(SHOP_TS, 'utf-8');
const updated = shopContent.replace(/\.png(?=["'])/g, '.webp');
await fs.writeFile(SHOP_TS, updated);
const replacements = (shopContent.match(/\.png(?=["'])/g) || []).length;
console.log(`✅ ${replacements} Pfade in shop.ts aktualisiert (.png → .webp)`);
