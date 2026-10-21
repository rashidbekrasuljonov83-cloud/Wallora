import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Bookmark, Download, Maximize2 } from "lucide-react";
import type { Wallpaper } from "../../data/wallpapers";
import { useFavoritesStore, useSavedStore } from "../../store/useStore";
import { cn } from "../../lib/utils";

interface WallpaperCardProps {
  wallpaper: Wallpaper;
}

export default function WallpaperCard({ wallpaper }: WallpaperCardProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { isSaved, toggleSaved } = useSavedStore();

  const [imageLoaded, setImageLoaded] = useState(false);

  const favorited = isFavorite(wallpaper.id);
  const saved = isSaved(wallpaper.id);

  return (
    <div
      className="relative group rounded-2xl overflow-hidden bg-secondary mb-4 break-inside-avoid"
      style={{ aspectRatio: wallpaper.width / wallpaper.height }}
    >
      {/* Placeholder skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 animate-pulse bg-secondary-foreground/10" />
      )}

      {/* Image */}
      <img
        src={wallpaper.thumbnail}
        alt={wallpaper.title}
        className={cn(
          "w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105",
          imageLoaded ? "opacity-100" : "opacity-0",
        )}
        onLoad={() => setImageLoaded(true)}
        loading="lazy"
      />

      {/* Overlay: Kompyuterda hover bo'lganda, kichik ekranlarda doimiy ko'rinadi */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 flex flex-col justify-between p-4",
          "opacity-0 group-hover:opacity-100 max-[100px]:opacity-100",
        )}
      >
        {/* Top actions */}
        <div className="flex justify-end gap-2 z-10">
          {/* Save Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSaved(wallpaper.id);
            }}
            className="p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white transition-colors"
            title={saved ? "Remove from saved" : "Save for later"}
          >
            <Bookmark className={cn("w-5 h-5", saved && "fill-white")} />
          </button>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(wallpaper.id);
            }}
            className="p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white transition-colors"
            title={favorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={cn(
                "w-5 h-5",
                favorited && "fill-red-500 text-red-500",
              )}
            />
          </button>
        </div>

        {/* Bottom actions & info */}
        <div className="flex items-end justify-between z-10">
          <Link to={`/wallpaper/${wallpaper.id}`} className="flex-1">
            <h3 className="text-white font-medium text-lg truncate pr-4">
              {wallpaper.title}
            </h3>
            <p className="text-white/70 text-sm truncate">{wallpaper.author}</p>
          </Link>

          <div className="flex gap-2">
            <Link
              to={`/wallpaper/${wallpaper.id}`}
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/40 backdrop-blur-md transition-colors"
              title="View details"
            >
              <Maximize2 className="w-5 h-5" />
            </Link>
            <a
              href={wallpaper.image}
              download={`${wallpaper.title}.jpg`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
              title="Download"
              onClick={(e) => e.stopPropagation()}
            >
              <Download className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
