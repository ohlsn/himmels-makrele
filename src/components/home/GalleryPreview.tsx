import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { galleryData } from "../../../content/gallery";

export default function GalleryPreview() {
  const featured = galleryData.slice(0, 4);

  return (
    <section className="py-16 px-4 bg-sky-light/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading>Galerie</SectionHeading>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {featured.map((artwork) => (
            <div
              key={artwork.id}
              className="aspect-square rounded-2xl shadow-md overflow-hidden group cursor-pointer relative"
              style={{ background: artwork.placeholder }}
            >
              <div className="absolute inset-0 bg-ocean/0 group-hover:bg-ocean/40 transition-all duration-300 flex items-end justify-center">
                <span className="text-white font-heading font-semibold text-sm pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {artwork.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button href="/galerie">Alle Kunstwerke ansehen</Button>
        </div>
      </div>
    </section>
  );
}
