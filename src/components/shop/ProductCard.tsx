import type { Product } from "../../../content/shop";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="rounded-2xl shadow-md overflow-hidden bg-white group flex flex-col h-full border border-sky/10 hover:shadow-xl transition-all duration-300">
      {/* Product Image Placeholder */}
      <div
        className="aspect-square flex items-center justify-center relative overflow-hidden"
        style={{ background: product.placeholderImage }}
      >
        <div className="absolute inset-0 bg-ocean/0 group-hover:bg-ocean/20 transition-all duration-300" />
        <span className="text-white/60 font-heading text-lg z-10 font-medium tracking-wide">
          Foto kommt bald
        </span>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-ocean text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            {product.category}
          </span>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-heading font-semibold text-ocean text-xl mb-1 flex-grow">
          {product.name}
        </h3>
        <p className="text-fish-orange font-bold text-lg mb-6">{product.price}</p>
        
        {/* Buy Button linking to Printify */}
        <a
          href={product.printifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center py-3 rounded-full bg-sky-light text-ocean font-heading font-semibold hover:bg-sky transition-colors duration-300 flex items-center justify-center gap-2 group-hover:bg-fish-gold group-hover:text-white"
        >
          Zum Shop
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
