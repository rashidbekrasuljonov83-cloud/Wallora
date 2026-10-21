import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { wallpapersData, getCategories } from '../data/wallpapers';
import WallpaperGrid from '../components/wallpaper/WallpaperGrid';

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryFilter = searchParams.get('category') || 'all';
  const orientationFilter = searchParams.get('orientation') || 'all';

  const [searchInput, setSearchInput] = useState(query);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      searchParams.set('q', searchInput);
      setSearchParams(searchParams);
    }
  };

  const categories = ['all', ...getCategories()];
  const orientations = ['all', 'landscape', 'portrait', 'square'];

  // Apply filters
  let filteredWallpapers = wallpapersData;
  
  if (query) {
    const q = query.toLowerCase();
    filteredWallpapers = filteredWallpapers.filter(w => 
      w.title.toLowerCase().includes(q) || 
      w.category.toLowerCase().includes(q) ||
      w.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }

  if (categoryFilter !== 'all') {
    filteredWallpapers = filteredWallpapers.filter(w => w.category.toLowerCase() === categoryFilter.toLowerCase());
  }

  if (orientationFilter !== 'all') {
    filteredWallpapers = filteredWallpapers.filter(w => w.orientation === orientationFilter);
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-16">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          {query ? `Search results for "${query}"` : 'Search Wallpapers'}
        </h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <form onSubmit={handleSearch} className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input 
              type="text" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search wallpapers, categories, colors..."
              className="w-full h-14 pl-12 pr-4 rounded-xl bg-card border border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-lg"
            />
          </form>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 h-14 px-6 rounded-xl bg-secondary text-secondary-foreground font-medium border border-border hover:bg-secondary/80 transition-colors"
          >
            <Filter className="w-5 h-5" /> Filters
          </button>
        </div>

        {showFilters && (
          <div className="p-6 bg-card border border-border rounded-xl mb-8 animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Category</label>
              <select 
                value={categoryFilter}
                onChange={(e) => {
                  searchParams.set('category', e.target.value);
                  setSearchParams(searchParams);
                }}
                className="w-full h-10 px-3 rounded-lg bg-background border border-border focus:outline-none focus:border-primary text-foreground capitalize"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Orientation</label>
              <select 
                value={orientationFilter}
                onChange={(e) => {
                  searchParams.set('orientation', e.target.value);
                  setSearchParams(searchParams);
                }}
                className="w-full h-10 px-3 rounded-lg bg-background border border-border focus:outline-none focus:border-primary text-foreground capitalize"
              >
                {orientations.map(ori => (
                  <option key={ori} value={ori}>{ori}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        <p className="text-muted-foreground">
          Found {filteredWallpapers.length} wallpapers
        </p>
      </div>

      <WallpaperGrid wallpapers={filteredWallpapers} />
    </div>
  );
}
