import { createContext, useContext, type PropsWithChildren, } from "react";
import { useFavoriteCats } from "../hooks/useFavoriteCats";

type FavoritesContextValue = ReturnType<typeof useFavoriteCats>;

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: PropsWithChildren) {
  const favorites = useFavoriteCats();

  return (
    <FavoritesContext.Provider value={favorites}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavoritesContext must be used within FavoritesProvider");
  }

  return context;
}