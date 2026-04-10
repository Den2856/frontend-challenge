import CatsGrid from "../components/CatsGrid";
import { useInfiniteCats } from "../hooks/useInfiniteCats";
import { useFavoritesContext } from "../context/FavoritesContext";


export default function Home() {
  
  const { cats, isFirstLoading, isLoadingMore, hasMore, errorMessage, observerRef, } = useInfiniteCats();

  const { favoriteIds, toggleFavorite } = useFavoritesContext();

  if (isFirstLoading) {
    return (
      <section className="mx-auto max-w-360 px-4 py-8">
        <p className="text-center text-gray-500">Загружаем котиков...</p>
      </section>
    );
  }


  return (
    <div className="min-h-screen bg-white">
      {errorMessage ? (
        <section className="mx-auto max-w-360 px-4 pt-8">
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-600">
            {errorMessage}
          </div>
        </section>
      ) : null}

      <CatsGrid
        cats={cats}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
      />

      {hasMore ? (
        <div ref={observerRef} className="py-8 text-center text-sm text-gray-500">
          {isLoadingMore ? "... загружаем еще котиков ..." : "Прокрути ниже"}
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-gray-400">
          Котики закончились
        </p>
      )}
    </div>
  )
}
