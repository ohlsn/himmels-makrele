"use client";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  /** Größere Variante für die Lightbox */
  size?: "sm" | "lg";
}

/**
 * Herz-Button zum Markieren von Favoriten.
 * Nicht favorisiert: grau umrandetes Herz (immer sichtbar, auch auf Touch-Geräten)
 * Favorisiert: goldenes, gefülltes Herz
 */
export default function FavoriteButton({
  isFavorite,
  onToggle,
  size = "sm",
}: FavoriteButtonProps) {
  const sizeClasses = size === "lg" ? "w-11 h-11" : "w-9 h-9";
  const iconSize = size === "lg" ? "w-6 h-6" : "w-5 h-5";

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-label={isFavorite ? "Von Favoriten entfernen" : "Zu Favoriten hinzufügen"}
      className={`
        ${sizeClasses}
        rounded-full flex items-center justify-center flex-shrink-0
        transition-all duration-300 ease-out
        active:scale-90
        cursor-pointer
        ${
          isFavorite
            ? "bg-fish-gold text-white shadow-md shadow-fish-gold/25"
            : "bg-transparent text-ocean/30 hover:text-fish-gold border-2 border-ocean/20 hover:border-fish-gold/50"
        }
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={isFavorite ? 0 : 1.8}
        className={`
          ${iconSize}
          transition-all duration-300 ease-out
          ${isFavorite ? "animate-heartbeat" : ""}
        `}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  );
}
