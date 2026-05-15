import type { Product } from "./shop";

export type EverydaySizeRow = {
  size: string;
  euSize?: string;
  age?: string;
  height?: string;
  chest?: string;
  waist?: string;
  weight?: string;
  fit: string;
};

export type ProductSizeFamily = "adult" | "kids" | "baby";

/**
 * Manuelle Overrides für Edge-Cases — höchste Priorität.
 *
 * Standardweg ist `product.sizeFamily` aus shop.ts, das beim Sync per
 * scripts/sync-size-families.mjs aus Printfuls Catalog-Title ermittelt wird.
 *
 * Einen Override nur dann eintragen, wenn die Auto-Erkennung nachweislich
 * falsch ist (Printful-Titel mehrdeutig, untypischer Rohling, etc.).
 */
export const productSizeFamilyOverrides: Record<string, ProductSizeFamily> = {};

/**
 * Resolution-Reihenfolge:
 *   1. Manueller Override
 *   2. shop.ts `sizeFamily` (auto-detected aus Printful Catalog)
 *   3. Heuristik aus Namen/Größen (Last-Resort, damit die UI nie kaputt geht)
 *
 * Der harte Pfad (Build-Gate) prüft, dass jedes Produkt 1 oder 2 erfüllt —
 * Heuristik ist nur Runtime-Sicherheit, nicht Datenqualität.
 */
export function getProductSizeFamily(product: Product): ProductSizeFamily {
  const override = productSizeFamilyOverrides[product.id];
  if (override) return override;

  if (product.sizeFamily) return product.sizeFamily;

  const name = product.name.toLowerCase();
  const sizeSet = new Set(product.sizes);

  if (name.includes("baby") || ["6M", "12M", "18M", "24M"].some((size) => sizeSet.has(size))) {
    return "baby";
  }

  if (
    name.includes("kids") ||
    name.includes("youth") ||
    ["3-4", "5-6", "7-8", "9-11", "12-13"].some((size) => sizeSet.has(size))
  ) {
    return "kids";
  }

  return "adult";
}

const adultRows: Record<string, EverydaySizeRow> = {
  XS: {
    size: "XS",
    euSize: "34-36",
    chest: "82-90 cm",
    fit: "Schmaler Sitz. Gut, wenn T-Shirts sonst oft zu weit wirken.",
  },
  S: {
    size: "S",
    euSize: "36-38",
    chest: "90-98 cm",
    fit: "Klassische kleine Erwachsenengröße.",
  },
  M: {
    size: "M",
    euSize: "38-40",
    chest: "98-106 cm",
    fit: "Regulärer Sitz für mittlere Erwachsenengröße.",
  },
  L: {
    size: "L",
    euSize: "42-44",
    chest: "106-114 cm",
    fit: "Mehr Raum an Brust und Schultern.",
  },
  XL: {
    size: "XL",
    euSize: "46-48",
    chest: "114-122 cm",
    fit: "Lockerer Sitz; sinnvoll, wenn es bequem fallen soll.",
  },
};

const kidsRows: Record<string, EverydaySizeRow> = {
  "3-4": {
    size: "3-4",
    age: "3-4 Jahre",
    height: "98-104 cm",
    chest: "54-56 cm",
    waist: "52-54 cm",
    fit: "Für Kindergartenalter. Bei Wachstumsschub eher 5-6 wählen.",
  },
  "5-6": {
    size: "5-6",
    age: "5-6 Jahre",
    height: "110-116 cm",
    chest: "58-61 cm",
    waist: "55-57 cm",
    fit: "Klassische Vorschul-/Schulstartgröße.",
  },
  "7-8": {
    size: "7-8",
    age: "7-8 Jahre",
    height: "122-128 cm",
    chest: "63-66 cm",
    waist: "58-60 cm",
    fit: "Für Grundschulkinder, regulär geschnitten.",
  },
  "9-11": {
    size: "9-11",
    age: "9-11 Jahre",
    height: "134-146 cm",
    chest: "69-75 cm",
    waist: "61-66 cm",
    fit: "Für ältere Kinder. Bei breiteren Schultern eher größer wählen.",
  },
  "12-13": {
    size: "12-13",
    age: "12-13 Jahre",
    height: "152-158 cm",
    chest: "78-82 cm",
    waist: "67-70 cm",
    fit: "Übergangsgröße Richtung Teenager.",
  },
  XS: {
    size: "XS",
    age: "ca. 7-8 Jahre",
    height: "122-128 cm",
    chest: "61-66 cm",
    fit: "Kleinste Youth-Größe. Entscheidend ist vor allem die Körpergröße.",
  },
  S: {
    size: "S",
    age: "ca. 9-10 Jahre",
    height: "134-140 cm",
    chest: "67-72 cm",
    fit: "Für schlanke bis reguläre Kinder um Größe 134/140.",
  },
  M: {
    size: "M",
    age: "ca. 11-12 Jahre",
    height: "146-152 cm",
    chest: "70-76 cm",
    fit: "Meist passend um EU 146/152; bei sehr schmalem Kind Produktmaße prüfen.",
  },
  L: {
    size: "L",
    age: "ca. 13-14 Jahre",
    height: "158-164 cm",
    chest: "76-82 cm",
    fit: "Teen-Größe mit mehr Länge und Breite.",
  },
  XL: {
    size: "XL",
    age: "ca. 14+ Jahre",
    height: "164-170 cm",
    chest: "82-88 cm",
    fit: "Größte Youth-Größe; bei Unsicherheit Adult S vergleichen.",
  },
};

const babyRows: Record<string, EverydaySizeRow> = {
  "6M": {
    size: "6M",
    age: "3-6 Monate",
    height: "60-66 cm",
    weight: "5-7 kg",
    fit: "Für kleine Makrelen mit noch viel Strampelraum.",
  },
  "12M": {
    size: "12M",
    age: "6-12 Monate",
    height: "66-76 cm",
    weight: "7-10 kg",
    fit: "Gute Wahl, wenn 6M schon knapp wird.",
  },
  "18M": {
    size: "18M",
    age: "12-18 Monate",
    height: "76-83 cm",
    weight: "10-12 kg",
    fit: "Für Laufanfänger mit Bewegungsdrang.",
  },
  "24M": {
    size: "24M",
    age: "18-24 Monate",
    height: "83-89 cm",
    weight: "12-14 kg",
    fit: "Etwas großzügiger wählen, wenn der Body länger passen soll.",
  },
};

export function getEverydaySizeRows(product: Product): EverydaySizeRow[] {
  const family = getProductSizeFamily(product);
  const source =
    family === "baby" ? babyRows : family === "kids" ? kidsRows : adultRows;

  return product.sizes.map((size) => source[size]).filter(Boolean);
}

export function getSizeFamilyLabel(product: Product) {
  const family = getProductSizeFamily(product);
  if (family === "baby") return "Babygrößen";
  if (family === "kids") return "Kinder- und Jugendgrößen";
  return "Erwachsenengrößen";
}
