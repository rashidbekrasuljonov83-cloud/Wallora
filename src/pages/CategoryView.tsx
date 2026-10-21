import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { wallpapersData } from '../data/wallpapers';
import WallpaperGrid from '../components/wallpaper/WallpaperGrid';

export default function CategoryView() {
  const { category } = useParams();
  const navigate = useNavigate();

  const categoryWallpapers = wallpapersData.filter(
    w => w.category.toLowerCase() === category?.toLowerCase()
  );

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-16">
      <button 
        onClick={() => navigate('/categories')} 
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> All Categories
      </button>

      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 capitalize">{category}</h1>
        <p className="text-lg text-muted-foreground">
          {categoryWallpapers.length} wallpapers found in this category
        </p>
      </div>

      <WallpaperGrid wallpapers={categoryWallpapers} />
    </div>
  );
}
