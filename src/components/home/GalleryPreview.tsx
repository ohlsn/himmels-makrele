"use client";

import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { galleryData } from "../../../content/gallery";
import ArtworkCard from "@/components/gallery/ArtworkCard";
import { useFavorites } from "@/hooks/useFavorites";

export default function GalleryPreview() {
  const featured = galleryData.slice(0, 4);
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <section className="py-16 px-4 bg-sky-light/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading>Galerie</SectionHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {featured.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              isFavorite={isFavorite(artwork.id)}
              onToggleFavorite={() => toggleFavorite(artwork.id)}
            />
          ))}
        </div>

        <div className="text-center">
          <Button href="/galerie">Alle Kunstwerke ansehen</Button>
        </div>
      </div>
    </section>
  );
}
