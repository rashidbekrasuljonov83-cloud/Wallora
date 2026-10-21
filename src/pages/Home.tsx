import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { wallpapersData, getCategories } from "../data/wallpapers";
import WallpaperGrid from "../components/wallpaper/WallpaperGrid";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const trendingWallpapers = wallpapersData
    .filter((w) => w.isTrending)
    .slice(0, 10);
  const categories = getCategories().slice(0, 8);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 flex flex-wrap opacity-20 dark:opacity-30">
            <img
              src="gemini.svg"
              className="w-full h-full object-cover"
              alt="Hero background"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />

          <div className="container relative z-20 mx-auto px-4 flex flex-col items-center text-center max-w-4xl pt-20">
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20 backdrop-blur-sm">
              {t("tagline")}
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              {t("hero_title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
              {t("hero_subtitle")}
            </p>

            <form
              onSubmit={handleSearch}
              className="w-full max-w-2xl relative mb-12"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("search_placeholder")}
                className="w-full h-16 pl-14 pr-32 rounded-2xl bg-card border-2 border-border shadow-xl text-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-primary text-primary-foreground px-6 rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                Search
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-sm text-muted-foreground mr-2">
                Popular:
              </span>
              {categories.slice(0, 5).map((cat) => (
                <button
                  key={cat}
                  onClick={() => navigate(`/category/${cat}`)}
                  className="px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80 transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">{t("trending")}</h2>
            <button
              onClick={() => navigate("/explore")}
              className="text-primary font-medium hover:underline"
            >
              View All
            </button>
          </div>
          <WallpaperGrid wallpapers={trendingWallpapers} />
        </section>

        {/* Why Wallora Section */}
        <section className="bg-secondary/30 py-24 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("why_wallora")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover what makes Wallora the best place to find your next
                wallpaper.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: t("huge_collection"),
                  desc: t("huge_collection_desc"),
                  icon: "🌌",
                },
                {
                  title: t("easy_discovery"),
                  desc: t("easy_discovery_desc"),
                  icon: "🔍",
                },
                {
                  title: t("save_favorites"),
                  desc: t("save_favorites_desc"),
                  icon: "❤️",
                },
                {
                  title: t("high_quality"),
                  desc: t("high_quality_desc"),
                  icon: "✨",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-card p-6 rounded-2xl border border-border hover:border-primary/50 transition-colors shadow-sm hover:shadow-md"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
