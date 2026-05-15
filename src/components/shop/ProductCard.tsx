import Link from "next/link";
import Image from "next/image";
import type { Product } from "../../../content/shop";
import {
  getAvailableColorCount,
  getAvailableSizeCount,
  getProductHeroImage,
  getProductPath,
} from "@/lib/shop";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = getProductHeroImage(product);
  const colorCount = getAvailableColorCount(product);
  const sizeCount = getAvailableSizeCount(product);

  return (
    <Link
      href={getProductPath(product)}
      className="group rounded-2xl shadow-md overflow-hidden bg-white flex flex-col h-full border border-sky/10 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-deep focus:ring-offset-4"
    >
      <div className="aspect-square relative overflow-hidden bg-white">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="flex items-center justify-center h-full text-ocean/40 font-heading text-lg font-medium">
            Foto kommt bald
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <p className="text-[10px] font-bold text-ocean/45 mb-2 uppercase tracking-wide">
          {product.category}
        </p>
        <h3 className="font-heading font-semibold text-ocean text-xl mb-3">
          {product.name}
        </h3>

        <div className="flex flex-wrap gap-2 mb-5">
          {product.colors.slice(0, 6).map((color) => (
            <span
              key={color.name}
              className="w-5 h-5 rounded-full border-2 border-white shadow-sm ring-1 ring-ocean/15"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          {colorCount > 6 && (
            <span className="text-xs text-ocean/50 self-center">
              +{colorCount - 6}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between gap-4">
          <div>
            <p className="text-fish-orange font-bold text-xl">
              {product.price}
            </p>
            <p className="text-xs text-ocean/45 mt-1">
              {sizeCount} Größen, {colorCount} Farben
            </p>
          </div>
          <span className="text-sm font-heading font-semibold text-sky-deep group-hover:text-ocean transition-colors">
            Produkt ansehen
          </span>
        </div>
      </div>
    </Link>
  );
}
