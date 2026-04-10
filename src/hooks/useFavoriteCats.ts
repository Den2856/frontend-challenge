import { useCallback, useEffect, useMemo, useState } from "react";
import type { CatImage } from "../types/cat";

const FAVORITES_STORAGE_KEY = "favorite-cats";

export type FavoriteCat = {
  id: string;
  url: string;
};

function isFavoriteCat(value: unknown): value is FavoriteCat {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.url === "string"
  );
}

function getStoredFavoriteCats(): FavoriteCat[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const value = window.localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!value) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(value);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isFavoriteCat);
  } catch {
    return [];
  }
}

function toFavoriteCat(cat: Pick<CatImage, "id" | "url">): FavoriteCat {
  return {
    id: cat.id,
    url: cat.url,
  };
}

export function useFavoriteCats() {
  const [favoriteCats, setFavoriteCats] = useState<FavoriteCat[]>(
    getStoredFavoriteCats
  );

  useEffect(() => {
    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favoriteCats)
    );
  }, [favoriteCats]);

  const favoriteIds = useMemo(() => {
    return new Set(favoriteCats.map((cat) => cat.id));
  }, [favoriteCats]);

  const toggleFavorite = useCallback((cat: Pick<CatImage, "id" | "url">) => {
    setFavoriteCats((previousFavoriteCats) => {
      const isAlreadyFavorite = previousFavoriteCats.some(
        (favoriteCat) => favoriteCat.id === cat.id
      );

      if (isAlreadyFavorite) {
        return previousFavoriteCats.filter(
          (favoriteCat) => favoriteCat.id !== cat.id
        );
      }

      return [toFavoriteCat(cat), ...previousFavoriteCats];
    });
  }, []);

  return {
    favoriteCats,
    favoriteIds,
    toggleFavorite,
  };
}