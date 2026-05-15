import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import readline from 'readline/promises';
import Stripe from 'stripe';
import sharp from 'sharp';
import { loadPricing } from './_lib_pricing.mjs';

const IMG_MAX_DIM = 1600;
const IMG_QUALITY = 80;

const hexMap = {
  "Weiß": "#FFFFFF",
  "Schwarz": "#000000",
  "Marineblau": "#0f172a",
  "Dunkelgrau": "#334155",
  "Sportgrau": "#94a3b8",
  "Rot": "#ef4444",
  "Hellblau": "#7dd3fc",
  "Carolina Blau": "#7badd8",
  "Königsblau": "#2563eb",
  "Hellrosa": "#fbcfe8",
  "Rosa": "#ffb6c1",
  "Grau meliert": "#d1d5db"
};

function getHex(name) {
  return hexMap[name] || "#cccccc";
}

async function fetchPrintfulSizeGuide(productId, apiKey) {
  if (!productId) return undefined;

  try {
    const response = await fetch(`https://api.printful.com/products/${productId}/sizes?unit=cm`, {
      headers: { "Authorization": `Bearer ${apiKey}` }
    });

    if (!response.ok) {
      console.log(` ⚠️  Keine Größentabelle für Printful-Produkt ${productId} (${response.status})`);
      return undefined;
    }

    const data = await response.json();
    const result = data.result;
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
  } catch (error) {
    console.log(` ⚠️  Größentabelle konnte nicht geladen werden (${productId}): ${error.message}`);
    return undefined;
  }
}

// ASCII-safe Slug für Dateinamen (Umlaute weg, Leerzeichen → _)
function asciiSlug(name) {
  return name
    .replace(/ß/g, 'ss')
    .replace(/ä/g, 'ae').replace(/Ä/g, 'Ae')
    .replace(/ö/g, 'oe').replace(/Ö/g, 'Oe')
    .replace(/ü/g, 'ue').replace(/Ü/g, 'Ue')
    .replace(/[^A-Za-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

async function run() {
  console.log("Lese Pricing-Override aus content/pricing.ts...");
  const pricingOverride = await loadPricing();
  console.log(`  → ${Object.keys(pricingOverride).length} Produkt-Preise definiert`);

  console.log("Lese API-Keys aus .env.local...");
  const envContent = await fs.readFile('.env.local', 'utf-8');
  const env = {};
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) env[match[1]] = match[2].trim();
  });

  const PRINTFUL_KEY = env.PRINTFUL_API_KEY;
  const STRIPE_KEY = env.STRIPE_SECRET_KEY;

  if (!PRINTFUL_KEY || !STRIPE_KEY) {
    console.error("Fehler: Stripe oder Printful API Key fehlt in .env.local!");
    process.exit(1);
  }

  const stripe = new Stripe(STRIPE_KEY, { apiVersion: "2024-04-10" });
  await fs.mkdir('./public/assets/shop', { recursive: true });

  const GERMAN_COLORS = {
    "White": "Weiß",
    "Black": "Schwarz",
    "Navy": "Marineblau",
    "Pink": "Rosa",
    "Light Pink": "Hellrosa",
    "Light Blue": "Hellblau",
    "Carolina Blue": "Carolina Blau",
    "Sport Grey": "Sportgrau",
    "Dark Heather": "Dunkelgrau",
    "Heather Grey": "Grau meliert",
    "Red": "Rot",
    "Royal": "Königsblau",
    "Maroon": "Kastanienbraun",
    "Forest Green": "Waldgrün",
    "Dark Chocolate": "Dunkelbraun",
    "Gold": "Gold",
    "Orange": "Orange",
    "Ash": "Asche",
    "Kelly Green": "Kelly-Grün",
    "Charcoal": "Anthrazit",
    "Sand": "Sand",
    "Purple": "Lila",
    "Denim": "Denim",
    "Steel Blue": "Stahlblau",
    "Natural": "Natur"
  };

  console.log("Hole Produkte von Printful...");
  const req = await fetch("https://api.printful.com/store/products", {
    headers: { "Authorization": `Bearer ${PRINTFUL_KEY}` }
  });
  const data = await req.json();

  if (data.code !== 200) {
    console.error("Printful Error", data);
    return;
  }

  const products = data.result;
  const shopItems = [];

  for (const p of products) {
    console.log(`\nVerarbeite Produkt: ${p.name}`);

    // Hole Varianten
    const varReq = await fetch(`https://api.printful.com/store/products/${p.id}`, {
      headers: { "Authorization": `Bearer ${PRINTFUL_KEY}` }
    });
    const varData = await varReq.json();

    if (varData.code !== 200) continue;

    // Hole Katalog-Produkt Beschreibung & Stock info
    let productDescription = "Original Himmels Makrele Printful Collection";
    let baseProductTitle = "";
    let sizeGuide;
    const catalogInOutStock = {};
    if (varData.result.sync_variants.length > 0) {
      const baseProductId = varData.result.sync_variants[0].product.product_id;
      if (baseProductId) {
        try {
          const catReq = await fetch(`https://api.printful.com/products/${baseProductId}`, {
            headers: { "Authorization": `Bearer ${PRINTFUL_KEY}` }
          });
          const catData = await catReq.json();
          if (catData.code === 200 && catData.result?.product) {
            baseProductTitle = catData.result.product.title || "";
            const pNameLower = p.name.toLowerCase();
            if (pNameLower.includes("hoodie")) {
              productDescription = "Kuscheliger, hochwertiger Hoodie für kalte Tage und freie Gedanken. Aus weicher, langlebiger Qualität gefertigt, verleiht er dir echte Makrelen-Vibes.\n\nMaterial & Details:\n• 50 % vorgeschrumpfte Baumwolle, 50 % Polyester\n• Stoffgewicht: 271,25 g/m²\n• Weiches Fleecematerial innen\n• Doppelt gefütterte Kapuze mit farblich passendem Kordelzug\n• Praktische Kängurutasche auf der Vorderseite";
            } else if (pNameLower.includes("sweatshirt")) {
              productDescription = "Bequemes Sweatshirt mit modernem Schnitt. Perfekt, um deine innere Himmels Makrele formschön nach außen zu tragen.\n\nMaterial & Details:\n• 50 % Baumwolle, 50 % Polyester\n• Stoffgewicht: 271,25 g/m²\n• Sportlicher Kragen, Bündchen und Taille aus Rippstrick\n• Weiches Fleece-Innenfutter für maximalen Tragekomfort";
            } else if (pNameLower.includes("baby") || pNameLower.includes("kids") || pNameLower.includes("youth")) {
              productDescription = "Auch für die kleinsten Makrelen: Superweich, gemütlich und perfekt zum Toben in der großen weiten Welt.\n\nMaterial & Details:\n• 100 % weiche, ringgesponnene (Bio-)Baumwolle (Meliert enthält Polyesteranteile)\n• Besonders hautfreundlich und komfortabel\n• Hervorragende Passform auch nach dem Waschen\n• Verstärkte Nähte für extra Langlebigkeit";
            } else {
              productDescription = "Dein neues Lieblings-Shirt! Hervorragende Passform, weicher Stoff und ein Design, das dich so frei wie die Himmels Makrele fühlen lässt.\n\nMaterial & Details:\n• 100 % gekämmte und ringgesponnene Premium-Baumwolle\n• Stoffgewicht: 142 g/m²\n• Vorgeschrumpftes Material für lange Formstabilität\n• Schulter-zu-Schulter-Taping und Seitennähte für idealen Sitz";
            }
          }
          if (catData.code === 200 && catData.result?.variants) {
            for (const cv of catData.result.variants) {
              catalogInOutStock[cv.id] = cv.in_stock === false;
            }
          }
          sizeGuide = await fetchPrintfulSizeGuide(baseProductId, PRINTFUL_KEY);
        } catch (e) {
          console.error("Fehler beim Holen der Beschreibung:", e);
        }
      }
    }

    const sizesSet = new Set();
    const colorsMap = {};
    const variants = [];
    const imagesToDownload = [];
    let basePriceStr = "29.90";

    // Pricing-Override: in content/pricing.ts definierte Preise schlagen Printful's retail_price
    const productSlugId = `prod-${p.id}`;
    const overrideCents = pricingOverride[productSlugId];
    if (overrideCents) {
      basePriceStr = (overrideCents / 100).toFixed(2);
      console.log(` - Pricing-Override aktiv: € ${basePriceStr.replace('.', ',')}`);
    } else {
      console.log(` ⚠️  Kein Pricing-Override für ${productSlugId} — verwende Printful retail_price`);
    }

    // Varianten auflösen
    for (const v of varData.result.sync_variants) {
      const sizeStr = v.size || "Einheitsgröße";
      sizesSet.add(sizeStr);

      const rawColor = v.color || "Standard";
      const cName = GERMAN_COLORS[rawColor] || rawColor;
      if (!colorsMap[cName]) {
        colorsMap[cName] = { name: cName, hex: getHex(cName), images: [] };
      }

      // Preview Files für diese Farbe
      for (const file of v.files) {
        if (file.type === "preview" && file.preview_url) {
          const filename = `pf_mock_${p.id}_${asciiSlug(cName)}_${file.id}.webp`;
          const localUri = `/assets/shop/${filename}`;

          if (!colorsMap[cName].images.includes(localUri)) {
            colorsMap[cName].images.push(localUri);
            imagesToDownload.push({ url: file.preview_url, filename });
          }
        }
      }

      // Variant-Preis: bei Override aus pricing.ts → alle Variants kriegen den Brutto-Preis
      // (keine Größen-Aufschläge im aktuellen Modell)
      const vPriceStr = overrideCents
        ? (overrideCents / 100).toFixed(2)
        : (v.retail_price || "29.90");
      if (variants.length === 0 && !overrideCents) basePriceStr = vPriceStr;
      const vPriceNum = Math.round(parseFloat(vPriceStr) * 100);
      const isOutOfStock = catalogInOutStock[v.product?.variant_id] === true;

      variants.push({
        size: sizeStr,
        color: cName,
        printfulSyncVariantId: v.id,
        price: `€ ${vPriceStr.replace('.', ',')}`,
        numericPrice: vPriceNum,
        isOutOfStock
      });
    }

    // Lade Bilder herunter und konvertiere direkt nach WebP (max. 1600px, Qualität 80)
    for (const img of imagesToDownload) {
      try {
        const dest = path.join('./public/assets/shop', img.filename);
        const res = await fetch(img.url);
        if (res.ok) {
          const arrayBuffer = await res.arrayBuffer();
          await sharp(Buffer.from(arrayBuffer))
            .resize(IMG_MAX_DIM, IMG_MAX_DIM, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: IMG_QUALITY })
            .toFile(dest);
        }
      } catch (err) {
        console.error("Bild-Download Fehler:", err);
      }
    }

    const basePriceNum = Math.round(parseFloat(basePriceStr) * 100);
    console.log(` - Erstelle Stripe-Preis (Basis: € ${basePriceStr.replace('.', ',')})...`);
    const stripeProd = await stripe.products.create({
      name: p.name,
      images: p.thumbnail_url ? [p.thumbnail_url] : [],
    });
    const stripePrice = await stripe.prices.create({
      product: stripeProd.id,
      unit_amount: basePriceNum,
      currency: 'eur',
    });

    const parsedColors = Object.values(colorsMap);

    shopItems.push({
      id: `prod-${p.id}`,
      name: p.name,
      baseTitle: baseProductTitle, // Interner Hilfsparameter für Ingest
      price: `€ ${basePriceStr.replace('.', ',')}`,
      stripePriceId: stripePrice.id,
      category: p.name.toLowerCase().includes("hoodie") ? "Hoodie" : "T-Shirt",
      shortDescription: "Original Himmels Makrele Printful Collection",
      description: productDescription,
      sizes: Array.from(sizesSet),
      colors: parsedColors,
      variants: variants,
      ...(sizeGuide ? { sizeGuide } : {}),
      printifyUrl: "#"
    });
  }

  // --- MOCKUP INGESTOR ---
  console.log("\\nStarte lokalen Mockup Ingestor (inklusive automatischem Unzip & Unterordnern)...");
  const inboxDir = './public/assets/mockups-inbox';
  try {
    // 1. ZIP AUTO-EXTRACTOR
    const topLevelFiles = await fs.readdir(inboxDir);
    for (const file of topLevelFiles) {
      if (file.toLowerCase().endsWith('.zip')) {
        const zipPath = path.join(inboxDir, file);
        const folderName = path.basename(file, path.extname(file));
        const extractPath = path.join(inboxDir, folderName);
        console.log(`[Ingest] Entpacke ${file} in Ordner /${folderName}...`);
        execSync(`unzip -q -o "${zipPath}" -d "${extractPath}"`);
        await fs.unlink(zipPath);
      }
    }

    // 2. REKURSIVES SCANNING
    const list = await fs.readdir(inboxDir, { recursive: true, withFileTypes: true });
    let count = 0;

    for (const dirent of list) {
      if (dirent.isDirectory() || dirent.name.startsWith('.')) continue; // Nur Bilder bearbeiten

      const file = dirent.name;
      const ext = path.extname(file).toLowerCase();
      if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;

      const sourcePath = path.join(dirent.parentPath || dirent.path, file);
      // Kombiniere relativen Ordnerpfad und Dateinamen, um keywords (wie 'wolf') mitzuscannen
      const relativePath = path.relative(inboxDir, sourcePath);
      const lowerFile = relativePath.toLowerCase().replace(/[^a-z0-9]/g, '');

      let matchedProducts = [];
      let maxScore = 0;

      for (const p of shopItems) {
        let score = 0;
        const pNameTokens = p.name.toLowerCase().replace(/[^a-z0-9]/g, ' ').split(' ');
        const bNameTokens = (p.baseTitle || '').toLowerCase().replace(/[^a-z0-9]/g, ' ').split(' ');
        const allTokens = [...new Set([...pNameTokens, ...bNameTokens])];

        for (const token of allTokens) {
          if (token.length > 3 && lowerFile.includes(token)) score++;
        }

        if (score > maxScore) {
          maxScore = score;
          matchedProducts = [p];
        } else if (score === maxScore && score > 0) {
          matchedProducts.push(p);
        }
      }

      let matchedProduct = null;
      if (matchedProducts.length === 1) {
        matchedProduct = matchedProducts[0];
      } else if (matchedProducts.length > 1) {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        console.log(`\n[WICHTIG] Kollision erkannt für Datei: ${relativePath}`);
        console.log(`Diese Datei könnte zu mehreren Produkten passen. Bitte wähle das richtige aus:`);
        matchedProducts.forEach((p, index) => {
          console.log(`  [${index + 1}] ${p.name}`);
        });
        console.log(`  [0] Keines der obigen (Überspringen)`);

        while (!matchedProduct) {
          const answer = await rl.question(`Deine Wahl (0-${matchedProducts.length}): `);
          const choice = parseInt(answer.trim());
          if (choice === 0) {
            console.log(`Überspringe ${relativePath}...`);
            break;
          } else if (choice > 0 && choice <= matchedProducts.length) {
            matchedProduct = matchedProducts[choice - 1];
          } else {
            console.log(`Ungültige Eingabe. Bitte eine Zahl zwischen 0 und ${matchedProducts.length} eingeben.`);
          }
        }
        rl.close();
      }

      if (matchedProduct) {
        let matchedColor = null;
        let clrScore = -1;
        // Finde sicherste Farbe
        for (const c of matchedProduct.colors) {
          const cName = c.name.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (lowerFile.includes(cName) && cName.length > clrScore) {
            matchedColor = c;
            clrScore = cName.length;
          }
        }

        if (matchedColor) {
          const newFilename = `${matchedProduct.id}-${matchedColor.name.replace(/[^a-zA-Z0-9]/g, '_')}-${Date.now()}-${count}${ext}`;
          const targetPath = path.join('./public/assets/shop', newFilename);

          await fs.copyFile(sourcePath, targetPath);
          await fs.unlink(sourcePath); // Datei aus Inbox löschen!

          const localUri = `/assets/shop/${newFilename}`;
          matchedColor.images.push(localUri);
          count++;
          console.log(`[Ingest] Zugeordnet: ${relativePath} -> ${matchedProduct.name} (${matchedColor.name})`);
        } else {
          console.log(`[Ingest] Warnung: Konnte keine passende Farbe finden für: ${relativePath} (Gefundenes Produkt: ${matchedProduct.name})`);
        }
      } else {
        console.log(`[Ingest] Warnung: Konnte kein passendes Produkt finden für: ${relativePath}`);
      }
    }
  } catch (e) {
    if (e.code !== 'ENOENT') {
      console.error("Mockup Ingest Fehler:", e);
    }
  }

  // RECOVERY & VERIFICATION SCAN: Lese alle Bilder im Shop-Ordner
  // und verknüpfe sie sicher, falls sie noch nicht in shopItems.colors sind
  try {
    const shopFiles = await fs.readdir('./public/assets/shop');
    for (const file of shopFiles) {
      // Suche nach Ingest-Bildern, z.B. prod-12345-Black-1234.png
      const match = file.match(/^(prod-\d+)-([^-]+)-/);
      if (match) {
        const prodId = match[1];
        const colorNameEscaped = match[2];

        const p = shopItems.find(item => item.id === prodId);
        if (p) {
          const c = p.colors.find(col => {
            const originalEng = Object.keys(GERMAN_COLORS).find(k => GERMAN_COLORS[k] === col.name) || col.name;
            return col.name.replace(/[^a-zA-Z0-9]/g, '_') === colorNameEscaped || originalEng.replace(/[^a-zA-Z0-9]/g, '_') === colorNameEscaped;
          });
          if (c) {
            const localUri = `/assets/shop/${file}`;
            if (!c.images.includes(localUri)) {
              c.images.push(localUri);
            }
          }
        }
      }
    }
  } catch (e) {
    console.error("Shop Verzeichnis Scanner Fehler:", e);
  }

  // Cleanup baseTitle for clean output
  shopItems.forEach(p => delete p.baseTitle);

  console.log("\\nGeneriere content/shop.ts...");
  const tsCode = `export interface ProductVariant {
  size: string;
  color: string;
  printfulSyncVariantId: number;
  numericPrice?: number;
  displayPrice?: string;
  price?: string;
  isOutOfStock?: boolean;
}

export interface ProductSizeGuideCell {
  size: string;
  value: string;
}

export interface ProductSizeGuideRow {
  label: string;
  values: ProductSizeGuideCell[];
}

export interface ProductSizeGuideTable {
  type?: string;
  title?: string;
  unit?: string;
  sizes: string[];
  rows: ProductSizeGuideRow[];
}

export interface ProductSizeGuide {
  source: "Printful";
  availableSizes: string[];
  tables: ProductSizeGuideTable[];
}

export interface ProductColor {
  name: string;
  hex: string;
  images: string[];
}

export interface Product {
  id: string;
  name: string;
  price: string;
  category: "T-Shirt" | "Lunchbox" | "Hoodie" | "Print" | string;
  shortDescription?: string;
  description?: string;
  stripePriceId: string;
  printifyUrl?: string;

  sizes: string[];
  colors: ProductColor[];
  variants: ProductVariant[];
  sizeGuide?: ProductSizeGuide;
}

// ⚠️ AUTO-SYNCED: Diese Datei wurde automatisch vom sync-catalog Skript generiert!
export const shopData: Product[] = ${JSON.stringify(shopItems, null, 2)};
`;

  await fs.writeFile('./content/shop.ts', tsCode);
  console.log("🎉 SUCCESS! Komplettes Sortiment inkl. Farben, Größen und Galerien synchronisiert.");
}

run().catch(console.error);
