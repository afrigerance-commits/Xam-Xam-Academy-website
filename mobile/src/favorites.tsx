import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type FavoritesContextValue = {
  favorites: string[];
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);
const KEY = 'xamxam:favorites';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => raw && setFavorites(JSON.parse(raw)))
      .catch(() => undefined);
  }, []);

  const toggleFavorite = (slug: string) => {
    setFavorites((current) => {
      const next = current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug];
      AsyncStorage.setItem(KEY, JSON.stringify(next)).catch(() => undefined);
      return next;
    });
  };

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite: (slug: string) => favorites.includes(slug),
    }),
    [favorites],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const value = useContext(FavoritesContext);
  if (!value) throw new Error('useFavorites doit être utilisé dans FavoritesProvider');
  return value;
}
