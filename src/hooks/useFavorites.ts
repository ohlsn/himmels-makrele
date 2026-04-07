"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "himmels-makrele-favorites";

/**
 * Hook zum Speichern und Verwalten von Favoriten im Browser (localStorage).
 * Kein Login nötig — die Favoriten bleiben gespeichert, solange man
 * denselben Browser benutzt.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  // Favoriten beim ersten Laden aus localStorage lesen
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as string[];
        setFavorites(new Set(parsed));
      }
    } catch {
      // Falls localStorage nicht verfügbar ist, einfach leer starten
    }
    setIsLoaded(true);
  }, []);

  // Favoriten in localStorage speichern, wenn sie sich ändern
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
    } catch {
      // Stille Fehlerbehandlung
    }
  }, [favorites, isLoaded]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.has(id),
    [favorites]
  );

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    favoritesCount: favorites.size,
    isLoaded,
  };
}
