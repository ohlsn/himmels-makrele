export interface Product {
  id: string;
  name: string;
  price: string;
  // This will be replaced by a real Image imported from assets later
  placeholderImage: string; 
  // The direct URL to the product on the Printify Pop-up Store
  printifyUrl: string;
  category: "T-Shirt" | "Lunchbox" | "Hoodie" | "Print";
}

export const shopData: Product[] = [
  {
    id: "prod-01",
    name: "Die Makrelen-Uniform (Unisex T-Shirt)",
    price: "€ 18,80",
    placeholderImage: "linear-gradient(135deg, #38BDF8, #164E63)",
    printifyUrl: "https://himmels-makrele.printify.me/product/27840666",
    category: "T-Shirt",
  },
  {
    id: "prod-02",
    name: "Makrele Lunchbox (Metall)",
    price: "€ 19,95",
    placeholderImage: "linear-gradient(135deg, #FBBF24, #FB923C)",
    printifyUrl: "#",
    category: "Lunchbox",
  },
  {
    id: "prod-03",
    name: "Wolkenreise Premium Hoodie",
    price: "€ 49,95",
    placeholderImage: "linear-gradient(135deg, #F472B6, #0369A1)",
    printifyUrl: "#",
    category: "Hoodie",
  },
  {
    id: "prod-04",
    name: "Der Ausbruch (A3 Print + Rahmen)",
    price: "€ 34,95",
    placeholderImage: "linear-gradient(135deg, #F43F5E, #4C1D95)",
    printifyUrl: "#",
    category: "Print",
  },
];
