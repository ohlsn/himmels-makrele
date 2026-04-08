"use client";

import { useState } from "react";
import type { Product } from "../../../content/shop";
import ProductCard from "./ProductCard";

interface ShopGridProps {
  products: Product[];
}

export default function ShopGrid({ products }: ShopGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Alle");

  // Get unique categories from products
  const categories = ["Alle", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = activeCategory === "Alle" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div>
      {/* Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`
              px-6 py-2.5 rounded-full font-heading font-semibold text-sm
              transition-all duration-300 cursor-pointer
              ${activeCategory === category
                ? "bg-ocean text-white shadow-md shadow-ocean/30"
                : "bg-white text-ocean/60 hover:text-ocean hover:bg-sky-light shadow-sm"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-16 text-center">
             <div className="text-5xl mb-4">🐟</div>
             <p className="font-heading text-xl text-ocean/60">
               Wir haben momentan keine Produkte in dieser Kategorie.
             </p>
          </div>
        )}
      </div>
    </div>
  );
}
