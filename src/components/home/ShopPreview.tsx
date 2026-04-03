import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const placeholderProducts = [
  { name: "Himmelsfisch T-Shirt", price: "€29,95", gradient: "linear-gradient(135deg, #38BDF8, #164E63)" },
  { name: "Makrele Lunchbox", price: "€19,95", gradient: "linear-gradient(135deg, #FBBF24, #FB923C)" },
  { name: "Wolkenreise Hoodie", price: "€39,95", gradient: "linear-gradient(135deg, #F472B6, #0369A1)" },
];

export default function ShopPreview() {
  return (
    <section className="py-16 px-4 bg-cloud">
      <div className="max-w-6xl mx-auto">
        <SectionHeading>Shop</SectionHeading>
        <p className="text-center text-ocean/60 mb-8 font-heading text-lg">
          Bald verfügbar — T-Shirts, Lunchboxen und mehr mit meiner Kunst!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {placeholderProducts.map((product) => (
            <div
              key={product.name}
              className="rounded-2xl shadow-md overflow-hidden bg-white group"
            >
              <div
                className="aspect-square flex items-center justify-center"
                style={{ background: product.gradient }}
              >
                <span className="text-white/60 font-heading text-lg">Bild kommt bald</span>
              </div>
              <div className="p-4">
                <h3 className="font-heading font-semibold text-ocean">{product.name}</h3>
                <p className="text-fish-orange font-bold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button href="/kontakt" variant="secondary">
            Benachrichtige mich
          </Button>
        </div>
      </div>
    </section>
  );
}
