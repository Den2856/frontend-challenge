import CatsGrid from "../components/CatsGrid";
import { useFavoritesContext } from "../context/FavoritesContext";
import { useInfiniteCats } from "../hooks/useInfiniteCats";

export default function FavoriteCatsPage() {

  const { favoriteCats, favoriteIds, toggleFavorite,  } = useFavoritesContext();
  const { isFirstLoading } = useInfiniteCats();

  if (favoriteCats.length === 0) {
    return (
      <section className="mx-auto max-w-360 px-4 py-8">
        <p className="text-center text-gray-500">
          У тебя пока нет любимых котиков
        </p>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <CatsGrid
        cats={favoriteCats}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
        isLoading={isFirstLoading}
        skeletonCount={favoriteCats.length}
      />
    </div>

  );
}