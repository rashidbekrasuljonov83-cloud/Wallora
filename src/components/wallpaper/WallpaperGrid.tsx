import { useState, useEffect, useMemo } from "react";
import type { Wallpaper } from "../../data/wallpapers";
import WallpaperCard from "./WallpaperCard";

interface WallpaperGridProps {
  wallpapers: Wallpaper[];
}

export default function WallpaperGrid({ wallpapers }: WallpaperGridProps) {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) setColumns(1);
      else if (window.innerWidth < 1024) setColumns(2);
      else if (window.innerWidth < 1536) setColumns(3);
      else setColumns(4);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // 1. Bir xil ID yoki bir xil image URL'ga ega rasmlarni olib tashlaymiz
  const uniqueWallpapers = useMemo(() => {
    const seen = new Set();
    return wallpapers.filter((item) => {
      const duplicate = seen.has(item.image);
      seen.add(item.image);
      return !duplicate;
    });
  }, [wallpapers]);

  const columnWrappers: Wallpaper[][] = Array.from(
    { length: columns },
    () => [],
  );

  // 2. Faqat unikal rasmlarni ustunlarga bo'lamiz
  uniqueWallpapers.forEach((wallpaper, i) => {
    columnWrappers[i % columns].push(wallpaper);
  });

  if (uniqueWallpapers.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl">🔍</span>
        </div>
        <h3 className="text-2xl font-bold mb-2">No wallpapers found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search query.
        </p>
      </div>
    );
  }

  return (
    <div className="masonry-grid">
      {columnWrappers.map((column, i) => (
        <div
          key={i}
          className="masonry-grid_column"
          style={{ width: `${100 / columns}%` }}
        >
          {column.map((wallpaper) => (
            <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />
          ))}
        </div>
      ))}
    </div>
  );
}
