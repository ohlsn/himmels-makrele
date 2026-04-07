"use client";

import type { Artwork } from "../../../content/gallery";
import ArtworkCard from "./ArtworkCard";
import { useFavorites } from "@/hooks/useFavorites";
import { useState } from "react";

interface ArtworkGridProps {
  artworks: Artwork[];
}

export default function ArtworkGrid({ artworks }: ArtworkGridProps) {
  const { isFavorite, toggleFavorite, favoritesCount, isLoaded } =
    useFavorites();
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const displayedArtworks = showOnlyFavorites
    ? artworks.filter((a) => isFavorite(a.id))
    : artworks;

  return (
    <div>
      {/* Filter-Leiste */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <button
          onClick={() => setShowOnlyFavorites(false)}
          className={`
            px-5 py-2.5 rounded-full font-heading font-semibold text-sm
            transition-all duration-300 cursor-pointer
            ${
              !showOnlyFavorites
                ? "bg-sky text-white shadow-md shadow-sky/30"
                : "bg-white text-ocean/60 hover:text-ocean hover:bg-sky-light shadow-sm"
            }
          `}
        >
          Alle Bilder
        </button>
        <button
          onClick={() => setShowOnlyFavorites(true)}
          disabled={!isLoaded}
          className={`
            px-5 py-2.5 rounded-full font-heading font-semibold text-sm
            transition-all duration-300 cursor-pointer
            flex items-center gap-2
            ${
              showOnlyFavorites
                ? "bg-fish-gold text-white shadow-md shadow-fish-gold/30"
                : "bg-white text-ocean/60 hover:text-ocean hover:bg-sky-light shadow-sm"
            }
            disabled:opacity-50
          `}
        >
          <span aria-hidden="true">♥</span>
          Meine Favoriten
          {favoritesCount > 0 && (
            <span
              className={`
                inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold
                ${
                  showOnlyFavorites
                    ? "bg-white/30 text-white"
                    : "bg-fish-gold/20 text-fish-gold"
                }
              `}
            >
              {favoritesCount}
            </span>
          )}
        </button>
      </div>

      {/* Bilder-Raster */}
      {displayedArtworks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedArtworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              isFavorite={isFavorite(artwork.id)}
              onToggleFavorite={() => toggleFavorite(artwork.id)}
            />
          ))}
        </div>
      ) : (
        /* Leerer Zustand wenn keine Favoriten */
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🐟</div>
          <p className="font-heading text-xl text-ocean/60 mb-2">
            Noch keine Favoriten!
          </p>
          <p className="text-ocean/40 text-sm max-w-sm mx-auto">
            Klicke auf das Herz ♥ bei einem Bild, um es als Favorit zu
            speichern.
          </p>
          <button
            onClick={() => setShowOnlyFavorites(false)}
            className="mt-6 px-5 py-2.5 rounded-full bg-sky-light text-ocean font-heading font-semibold text-sm hover:bg-sky/20 transition-colors cursor-pointer"
          >
            Alle Bilder anzeigen
          </button>
        </div>
      )}
    </div>
  );
}
