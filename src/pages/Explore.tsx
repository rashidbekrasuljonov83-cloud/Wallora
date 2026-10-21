import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Sparkles, TrendingUp, Clock, Star } from "lucide-react";
import { wallpapersData } from "../data/wallpapers";
import WallpaperGrid from "../components/wallpaper/WallpaperGrid";
import { cn } from "../lib/utils";

export default function Explore() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<
    "trending" | "new" | "popular" | "editors"
  >("trending");

  useEffect(() => {
    document.title = `${t("explore")} - Wallora`;
    window.scrollTo(0, 0);
  }, [t]);

  const tabs = [
    { id: "trending", label: t("trending"), icon: TrendingUp },
    { id: "new", label: t("new"), icon: Clock },
    { id: "popular", label: t("popular"), icon: Sparkles },
    { id: "editors", label: t("editors_picks"), icon: Star },
  ] as const;

  // Filtrlash natijasini useMemo yordamida keshlaymiz
  const filteredWallpapers = useMemo(() => {
    switch (activeTab) {
      case "trending":
        return wallpapersData.filter((w) => w.isTrending);
      case "new":
        return [...wallpapersData]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .slice(0, 40);
      case "popular":
        return [...wallpapersData]
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 40);
      case "editors":
        return wallpapersData.filter((w) => w.isFeatured);
      default:
        return wallpapersData.slice(0, 40);
    }
  }, [activeTab]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-16">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("explore")}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Discover the best and most popular wallpapers handpicked for your
          screens.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 select-none",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md scale-105"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <WallpaperGrid wallpapers={filteredWallpapers} />
    </div>
  );
}
