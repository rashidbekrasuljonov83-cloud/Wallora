import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getCategories, wallpapersData } from "../data/wallpapers";

export default function Categories() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const categories = getCategories();

  // Get a cover image for each category
  const categoryCovers = categories.map((cat) => {
    const wall = wallpapersData.find((w) => w.category === cat);
    return {
      name: cat,
      cover:
        wall?.thumbnail ||
        "https://images.unsplash.com/photo-yC-YzbpiNCy?q=60&w=400&auto=format&fit=crop",
      count: wallpapersData.filter((w) => w.category === cat).length,
    };
  });

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("categories")}</h1>
      <p className="text-lg text-muted-foreground mb-12">
        Browse wallpapers by topics and find exactly what you're looking for.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {categoryCovers.map((cat) => (
          <button
            key={cat.name}
            onClick={() => navigate(`/category/${cat.name}`)}
            className="group relative rounded-2xl overflow-hidden aspect-square flex flex-col items-center justify-center border border-border hover:border-primary/50 transition-all text-left bg-secondary"
          >
            <img
              src={cat.cover}
              alt={cat.name}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10 p-6 flex flex-col items-center justify-center w-full h-full">
              <h3 className="text-white text-xl md:text-2xl font-bold mb-1 group-hover:-translate-y-1 transition-transform">
                {cat.name}
              </h3>
              <span className="text-white/70 text-sm opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all">
                {cat.count} wallpapers
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
