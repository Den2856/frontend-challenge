import { useCallback, useEffect, useMemo, useState } from "react";
import type { CatImage } from "../types/cat";

const FAVORITES_STORAGE_KEY = "favorite-cats";

function getStoredFavoriteCats(): CatImage[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const value = window.localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!value) {
      return [];
    }

    const parsedValue = JSON.parse(value) as CatImage[];

    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

export function useFavoriteCats() {
  const [favoriteCats, setFavoriteCats] = useState<CatImage[]>(getStoredFavoriteCats);

  useEffect(() => {
    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favoriteCats)
    );
  }, [favoriteCats]);

  const favoriteIds = useMemo(() => {
    return new Set(favoriteCats.map((cat) => cat.id));
  }, [favoriteCats]);

  const toggleFavorite = useCallback((cat: CatImage) => {
    setFavoriteCats((previousFavoriteCats) => {
      const isAlreadyFavorite = previousFavoriteCats.some(
        (favoriteCat) => favoriteCat.id === cat.id
      );

      if (isAlreadyFavorite) {
        return previousFavoriteCats.filter(
          (favoriteCat) => favoriteCat.id !== cat.id
        );
      }

      return [cat, ...previousFavoriteCats];
    });
  }, []);

  return {
    favoriteCats,
    favoriteIds,
    toggleFavorite,
  };
}