import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/shop/ProductCard";
import { shopData } from "../../../content/shop";

export default function ShopPreview() {
  const featuredProducts = shopData.slice(0, 3);

  return (
    <section className="py-16 px-4 bg-cloud">
      <div className="max-w-6xl mx-auto">
        <SectionHeading>Shop</SectionHeading>
        <p className="text-center text-ocean/60 mb-8 font-heading text-lg">
          Bald verfügbar — Zeig Haltung mit T-Shirts, Lunchboxen und mehr. Schwimm nicht einfach nur mit dem Schwarm.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Button href="/shop" variant="secondary">
            Alle Produkte ansehen
          </Button>
        </div>
      </div>
    </section>
  );
}
