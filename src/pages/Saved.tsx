import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { useSavedStore } from '../store/useStore';
import { wallpapersData } from '../data/wallpapers';
import WallpaperGrid from '../components/wallpaper/WallpaperGrid';

type SortOption = 'recent' | 'newest' | 'category';

export default function Saved() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { saved } = useSavedStore();
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  const savedItems = wallpapersData
    .filter(w => saved.some(item => item.id === w.id))
    .map(w => ({
      ...w,
      savedAt: saved.find(item => item.id === w.id)?.savedAt || 0
    }));

  // Sort
  const sortedSaved = [...savedItems].sort((a, b) => {
    if (sortBy === 'recent') {
      return b.savedAt - a.savedAt;
    } else if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else { // category
      return a.category.localeCompare(b.category);
    }
  });

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-16 flex-1 flex flex-col">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('saved')}</h1>
      
      {sortedSaved.length > 0 ? (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <p className="text-lg text-muted-foreground">
              You have saved {sortedSaved.length} wallpapers for later
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="h-10 px-3 rounded-lg bg-secondary border border-border focus:outline-none focus:border-primary text-sm font-medium"
              >
                <option value="recent">Recently saved</option>
                <option value="newest">Newest added</option>
                <option value="category">Category</option>
              </select>
            </div>
          </div>
          <WallpaperGrid wallpapers={sortedSaved} />
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Bookmark className="w-10 h-10 text-primary fill-current" />
          </div>
          <h2 className="text-2xl font-bold mb-4">You haven't saved any wallpapers yet.</h2>
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
