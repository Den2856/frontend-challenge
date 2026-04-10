import CatsGrid from "../components/CatsGrid";
import { useFavoritesContext } from "../context/FavoritesContext";

export default function FavoriteCatsPage() {

  const { favoriteCats, favoriteIds, toggleFavorite } = useFavoritesContext();

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
      />
    </div>

  );
}