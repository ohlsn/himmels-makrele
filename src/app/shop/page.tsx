import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import PageTransition from "@/components/ui/PageTransition";
import ShopGrid from "@/components/shop/ShopGrid";
import { shopData } from "../../../content/shop";

export const metadata: Metadata = {
  title: "Shop",
  description: "Trage die Kunst der Himmels Makrele. T-Shirts, Lunchboxen und Prints direkt aus unserem Pop-Up Store.",
};

export default function ShopPage() {
  return (
    <PageTransition>
      <div className="py-16 px-4 bg-cloud min-h-[80vh]">
        <div className="max-w-6xl mx-auto">
          <SectionHeading>Shop</SectionHeading>
          
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-xl text-ocean/80 leading-relaxed">
              Willkommen im offiziellen Himmels Makrele Shop. Klicke auf ein Produkt, um zu unserem externen Printify Pop-Up Store weitergeleitet zu werden. Dort kannst du sicher und einfach deine Bestellung abschließen.
            </p>
          </div>

          {/* Product Filter & Grid */}
          <ShopGrid products={shopData} />
          
          <div className="mt-16 text-center max-w-xl mx-auto">
            <p className="text-sm text-ocean/50">
              Der Himmels Makrele Shop wird als Pop-Up Store über Printify betrieben. 
              Produktion, Versand und rechtliche Abwicklung erfolgen durch Printify und deren Partnerdruckereien.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
