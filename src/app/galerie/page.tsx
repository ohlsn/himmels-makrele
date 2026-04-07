import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ArtworkGrid from "@/components/gallery/ArtworkGrid";
import PageTransition from "@/components/ui/PageTransition";
import { galleryData } from "../../../content/gallery";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Entdecke die Kunstwerke von Himmels Makrele — Zeichnungen und Bilder inspiriert vom Himmel und Meer.",
};

export default function GaleriePage() {
  return (
    <PageTransition>
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading>Galerie</SectionHeading>
          <p className="text-center text-ocean/60 mb-10 max-w-xl mx-auto">
            Hier findest du meine Kunstwerke. Klicke auf ein Bild, um es größer
            zu sehen — oder drücke das Herz ♥ um deine Favoriten zu sammeln!
          </p>
          <ArtworkGrid artworks={galleryData} />
        </div>
      </div>
    </PageTransition>
  );
}
