export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  placeholderImage: string; 
  images?: string[];
  shortDescription?: string;
  colors?: ProductColor[];
  printifyUrl: string;
  category: "T-Shirt" | "Lunchbox" | "Hoodie" | "Print";
}

export const shopData: Product[] = [
  {
    id: "prod-01",
    name: "Die Makrelen-Uniform (Unisex T-Shirt)",
    price: "€ 18,80",
    placeholderImage: "linear-gradient(135deg, #38BDF8, #164E63)",
    images: ["/assets/shop/tshirt-white.png", "/assets/shop/tshirt-blue.png"],
    shortDescription: "Unser Klassiker mit frischem Rückendruck. Sitzt perfekt bei jedem Wetter.",
    colors: [{ name: "Weiß", hex: "#FFFFFF" }, { name: "Blau", hex: "#3b82f6" }],
    printifyUrl: "https://himmels-makrele.printify.me/product/27840666",
    category: "T-Shirt",
  },
  {
    id: "prod-02",
    name: "Makrele Lunchbox (Metall)",
    price: "€ 19,95",
    placeholderImage: "linear-gradient(135deg, #FBBF24, #FB923C)",
    shortDescription: "Edle und robuste Blechdose – hält jede Brotzeit stilvoll frisch.",
    printifyUrl: "#",
    category: "Lunchbox",
  },
  {
    id: "prod-03",
    name: "Wolkenreise Premium Hoodie",
    price: "€ 49,95",
    placeholderImage: "linear-gradient(135deg, #F472B6, #0369A1)",
    images: ["/assets/shop/hoodie-black.png"],
    shortDescription: "Für gemütliche Tage auf der Couch oder stürmische Spaziergänge.",
    colors: [{ name: "Schwarz", hex: "#171717" }, { name: "Dunkelblau", hex: "#1e3a8a" }],
    printifyUrl: "#",
    category: "Hoodie",
  },
  {
    id: "prod-04",
    name: "Der Ausbruch (A3 Print + Rahmen)",
    price: "€ 34,95",
    placeholderImage: "linear-gradient(135deg, #F43F5E, #4C1D95)",
    shortDescription: "Ein Statement an der Wand. Hochaufgelöster Kunstdruck inkl. Rahmen.",
    printifyUrl: "#",
    category: "Print",
  },
];
