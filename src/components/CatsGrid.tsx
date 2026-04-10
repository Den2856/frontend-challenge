import CatCard from "./CatCard";
import type { CatImage } from "../types/cat";

type CatsGridProps = {
  cats: CatImage[];
  favoriteIds: Set<string>;
  onToggleFavorite: (cat: CatImage) => void;
  isLoading?: boolean;
  skeletonCount?: number;
};

export default function CatsGrid({ cats, favoriteIds, onToggleFavorite, isLoading, skeletonCount }: CatsGridProps) {

  if (cats.length === 0 && !isLoading) {
    return (
      <section className="mx-auto max-w-360 px-4 py-8">
        <p className="text-center text-gray-500">Котиков пока нет</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-360 px-4 py-8">
      <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-sm:gap-7 sm:gap-8 md:gap-10 lg:gap-12">
        {isLoading
          ? Array.from({ length: skeletonCount ?? 10 }).map((_, index) => (
              <CatCard
                key={`skeleton-${index}`}
                isLoading
              />
            ))
          : cats.map((cat) => (
              <CatCard
                key={cat.id}
                cat={cat}
                isFavorite={favoriteIds.has(cat.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
      </div>
    </section>
  );
}