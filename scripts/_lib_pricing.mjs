/**
 * Helper: Liest content/pricing.ts (TypeScript) und gibt die Preis-Map zurück.
 * Wir parsen das per Regex, damit kein TS-Loader nötig ist.
 */
import fs from 'fs/promises';

export async function loadPricing() {
  const raw = await fs.readFile('./content/pricing.ts', 'utf-8');
  const m = raw.match(/export const pricing:\s*Record<string,\s*number>\s*=\s*(\{[\s\S]+?\});/);
  if (!m) throw new Error('content/pricing.ts: konnte das pricing-Objekt nicht parsen');
  // Entferne Inline-Kommentare und trailing commas vor JSON.parse
  const jsonish = m[1]
    .replace(/\/\/[^\n]*/g, '')
    .replace(/,(\s*[}\]])/g, '$1');
  return JSON.parse(jsonish);
}
