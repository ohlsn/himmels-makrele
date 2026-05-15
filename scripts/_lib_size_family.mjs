/**
 * Erkennt die Größenfamilie eines Printful-Rohlings aus dem Catalog-Title
 * und type_name.
 *
 * Reihenfolge bewusst:
 *   - baby/infant/bodysuit/onesie vor allem anderen (eindeutig)
 *   - toddler → baby (näher an Babys als an Schulkindern)
 *   - kids/youth → kids (Youth-Sizing ist Kids-Sizing)
 *   - sonst → adult
 *
 * Returns: "adult" | "kids" | "baby"
 */
export function detectFamily(catalogTitle, typeName) {
  const haystack = `${catalogTitle ?? ''} ${typeName ?? ''}`.toLowerCase();

  if (/\b(baby|infant|onesie)\b/.test(haystack)) return 'baby';
  if (/\bbodysuit\b/.test(haystack)) return 'baby';
  if (/\btoddler\b/.test(haystack)) return 'baby';

  if (/\bkids?\b/.test(haystack)) return 'kids';
  if (/\byouth\b/.test(haystack)) return 'kids';

  return 'adult';
}
