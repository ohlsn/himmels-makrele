import type { Artwork } from "../../../content/gallery";
import ArtworkCard from "./ArtworkCard";

interface ArtworkGridProps {
  artworks: Artwork[];
}

export default function ArtworkGrid({ artworks }: ArtworkGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} />
      ))}
    </div>
  );
}
