"use client";

import { useState } from "react";
import type { Artwork } from "../../../content/gallery";
import FavoriteButton from "./FavoriteButton";

interface ArtworkCardProps {
  artwork: Artwork;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function ArtworkCard({
  artwork,
  isFavorite,
  onToggleFavorite,
}: ArtworkCardProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <div
        className="rounded-2xl shadow-md overflow-hidden cursor-pointer group relative"
        onClick={() => setLightboxOpen(true)}
      >
        {/* Bild — sauber ohne Herz-Overlay */}
        <div
          className="aspect-square relative flex items-center justify-center bg-gray-50 p-6 sm:p-8"
          style={!artwork.imageUrl ? { background: artwork.placeholder } : undefined}
        >
          {artwork.imageUrl ? (
            <div className="relative w-full h-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-[10px] border-white bg-white">
              <img src={artwork.imageUrl} alt={artwork.title} className="absolute inset-0 w-full h-full object-cover" />
            </div>
          ) : null}
          <div className="absolute inset-0 bg-ocean/0 group-hover:bg-ocean/10 transition-all duration-300 z-10" />
        </div>

        {/* Info-Bereich mit Herz-Button — immer sichtbar */}
        <div className="p-4 bg-white flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-heading font-semibold text-ocean truncate">
              {artwork.title}
            </h3>
            <p className="text-sm text-ocean/60">
              {artwork.medium} &middot; {artwork.year}
            </p>
          </div>
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={onToggleFavorite}
          />
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-ocean/80 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox-Bild — auch sauber ohne Overlay */}
            <div
              className="aspect-square relative bg-white/10 flex items-center justify-center p-8 sm:p-12"
              style={!artwork.imageUrl ? { background: artwork.placeholder } : undefined}
            >
              {artwork.imageUrl ? (
                <div className="relative w-full h-full shadow-2xl border-[16px] border-white bg-white">
                  <img src={artwork.imageUrl} alt={artwork.title} className="absolute inset-0 w-full h-full object-contain" />
                </div>
              ) : null}
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-heading text-2xl font-bold text-ocean">
                  {artwork.title}
                </h3>
                <FavoriteButton
                  isFavorite={isFavorite}
                  onToggle={onToggleFavorite}
                  size="lg"
                />
              </div>
              <p className="text-ocean/70 mb-2">{artwork.description}</p>
              <p className="text-sm text-ocean/50">
                {artwork.medium} &middot; {artwork.year}
              </p>
              <button
                onClick={() => setLightboxOpen(false)}
                className="mt-4 px-4 py-2 rounded-full bg-sky-light text-ocean font-heading font-semibold hover:bg-sky/30 transition-colors"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
