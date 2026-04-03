"use client";

import { useState } from "react";
import type { Artwork } from "../../../content/gallery";

interface ArtworkCardProps {
  artwork: Artwork;
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <div
        className="rounded-2xl shadow-md overflow-hidden cursor-pointer group"
        onClick={() => setLightboxOpen(true)}
      >
        <div
          className="aspect-square relative"
          style={{ background: artwork.placeholder }}
        >
          <div className="absolute inset-0 bg-ocean/0 group-hover:bg-ocean/30 transition-all duration-300" />
        </div>
        <div className="p-4 bg-white">
          <h3 className="font-heading font-semibold text-ocean">
            {artwork.title}
          </h3>
          <p className="text-sm text-ocean/60">{artwork.medium} &middot; {artwork.year}</p>
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
            <div
              className="aspect-square"
              style={{ background: artwork.placeholder }}
            />
            <div className="p-6">
              <h3 className="font-heading text-2xl font-bold text-ocean mb-2">
                {artwork.title}
              </h3>
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
