export const SITE_NAME = "Himmels Makrele";
export const SITE_TAGLINE = "Kunst vom Himmel, Geschichten aus dem Meer";
export const SITE_DESCRIPTION =
  "Himmels Makrele — Kunst, Design und die Philosophie eines Fisches, der nach Höherem strebt. Schwimm nicht einfach nur mit.";

export const NAV_LINKS = [
  { href: "/", label: "Startseite" },
  { href: "/shop", label: "Shop" },
  { href: "/ueber-mich", label: "Meine Geschichte" },
  { href: "/galerie", label: "Galerie" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/himmelsmakrele",
  tiktok: "https://tiktok.com/@himmelsmakrele",
  pinterest: "https://pinterest.com/himmelsmakrele",
} as const;

export const BUSINESS_INFO = {
  name: "Himmels Makrele",
  owner: "[Dein Name]",
  kvkNumber: "[KvK-Nummer]",
  btwNumber: "[BTW-id]",
  email: "hallo@himmelsmakrele.nl",
  city: "Nederland",
} as const;
