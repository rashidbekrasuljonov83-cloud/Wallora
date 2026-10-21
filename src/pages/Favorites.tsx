import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useFavoritesStore } from '../store/useStore';
import { wallpapersData } from '../data/wallpapers';
import WallpaperGrid from '../components/wallpaper/WallpaperGrid';

type SortOption = 'recent' | 'likes' | 'newest';

export default function Favorites() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { favorites } = useFavoritesStore();
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  const favoriteItems = wallpapersData
    .filter(w => favorites.some(fav => fav.id === w.id))
    .map(w => ({
      ...w,
      favoritedAt: favorites.find(fav => fav.id === w.id)?.favoritedAt || 0
    }));

  // Sort
  const sortedFavorites = [...favoriteItems].sort((a, b) => {
    if (sortBy === 'recent') {
      return b.favoritedAt - a.favoritedAt;
    } else if (sortBy === 'likes') {
      return b.likes - a.likes;
    } else { // newest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-16 flex-1 flex flex-col">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('favorites')}</h1>
      
      {sortedFavorites.length > 0 ? (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <p className="text-lg text-muted-foreground">
              You have favorited {sortedFavorites.length} wallpapers
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="h-10 px-3 rounded-lg bg-secondary border border-border focus:outline-none focus:border-primary text-sm font-medium"
              >
                <option value="recent">Recently favorited</option>
                <option value="likes">Most liked</option>
                <option value="newest">Newest added</option>
              </select>
            </div>
          </div>
          <WallpaperGrid wallpapers={sortedFavorites} />
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 bg-red-50 dark:bg-red-950/30 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-10 h-10 text-red-500 fill-current" />
          </div>
          <h2 className="text-2xl font-bold mb-4">You haven't added any favorites yet.</h2>
          <button 
            onClick={() => navigate('/explore')}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            {t('explore_wallpapers')}
          </button>
        </div>
      )}
    </div>
  );
}
