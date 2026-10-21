import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ---------------------------------------------------------
// Theme Store
// ---------------------------------------------------------
interface ThemeState {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'wallora_theme' }
  )
);

// ---------------------------------------------------------
// Favorites Store
// ---------------------------------------------------------
interface FavoriteItem {
  id: string;
  favoritedAt: number;
}

interface FavoritesState {
  favorites: FavoriteItem[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id) => {
        const state = get();
        const exists = state.favorites.find((fav) => fav.id === id);
        
        if (exists) {
          set({ favorites: state.favorites.filter((fav) => fav.id !== id) });
        } else {
          set({ favorites: [...state.favorites, { id, favoritedAt: Date.now() }] });
        }
      },
      isFavorite: (id) => {
        return get().favorites.some((fav) => fav.id === id);
      }
    }),
    { name: 'wallora_favorites' }
  )
);

// ---------------------------------------------------------
// Saved Store
// ---------------------------------------------------------
interface SavedItem {
  id: string;
  savedAt: number;
}

interface SavedState {
  saved: SavedItem[];
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
}

export const useSavedStore = create<SavedState>()(
  persist(
    (set, get) => ({
      saved: [],
      toggleSaved: (id) => {
        const state = get();
        const exists = state.saved.find((item) => item.id === id);
        
        if (exists) {
          set({ saved: state.saved.filter((item) => item.id !== id) });
        } else {
          set({ saved: [...state.saved, { id, savedAt: Date.now() }] });
        }
      },
      isSaved: (id) => {
        return get().saved.some((item) => item.id === id);
      }
    }),
    { name: 'wallora_saved' }
  )
);
