import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Heart,
  Bookmark,
  Download,
  Share2,
  Info,
  ArrowLeft,
  Maximize,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { wallpapersData } from "../data/wallpapers";
import { useFavoritesStore, useSavedStore } from "../store/useStore";
import { cn } from "../lib/utils";
import WallpaperGrid from "../components/wallpaper/WallpaperGrid";

export default function WallpaperDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { isSaved, toggleSaved } = useSavedStore();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showResolutions, setShowResolutions] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const wallpaper = wallpapersData.find((w) => w.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // ESC tugmasi bosilganda Fullscreen'ni yopish
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!wallpaper) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[60vh]">
        <h2 className="text-3xl font-bold mb-4">Wallpaper not found</h2>
        <button
          onClick={() => navigate("/")}
          className="text-primary hover:underline"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const favorited = isFavorite(wallpaper.id);
  const saved = isSaved(wallpaper.id);

  const relatedWallpapers = wallpapersData
    .filter(
      (w) =>
        w.id !== wallpaper.id &&
        (w.category === wallpaper.category ||
          w.tags.some((tag) => wallpaper.tags.includes(tag))),
    )
    .slice(0, 8);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: wallpaper.title,
        text: `Check out this wallpaper on Wallora`,
        url: window.location.href,
      });
    } catch (err) {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleDownload = async (imgUrl: string, fileName: string) => {
    try {
      setIsDownloading(true);
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      window.open(imgUrl, "_blank");
    } finally {
      setIsDownloading(false);
      setShowResolutions(false);
    }
  };

  const downloadResolutions = [
    { label: "Original", value: `${wallpaper.width}x${wallpaper.height}` },
    { label: "4K", value: "3840x2160" },
    { label: "QHD", value: "2560x1440" },
    { label: "FHD", value: "1920x1080" },
    { label: "Mobile", value: "1080x1920" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-16">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Main Image */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative group rounded-3xl overflow-hidden bg-secondary w-full flex items-center justify-center">
            <img
              src={wallpaper.image}
              alt={wallpaper.title}
              className="w-full object-contain max-h-[75vh]"
              style={{ backgroundColor: wallpaper.color }}
            />

            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-4 right-4 p-3 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 backdrop-blur-md"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8 sticky top-24 h-fit">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {wallpaper.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              by{" "}
              <span className="font-medium text-foreground">
                {wallpaper.author}
              </span>
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={() => toggleFavorite(wallpaper.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all shadow-sm border",
                  favorited
                    ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100 dark:bg-red-950/30 dark:border-red-900"
                    : "bg-secondary text-secondary-foreground border-transparent hover:bg-secondary/80",
                )}
              >
                <Heart className={cn("w-5 h-5", favorited && "fill-current")} />
                {favorited ? "Favorited" : "Add to Favorites"}
              </button>

              <button
                onClick={() => toggleSaved(wallpaper.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all shadow-sm border",
                  saved
                    ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground border-transparent hover:bg-secondary/80",
                )}
              >
                <Bookmark className={cn("w-5 h-5", saved && "fill-current")} />
                {saved ? "Saved" : "Save for Later"}
              </button>

              <button
                onClick={handleShare}
                className="p-3 rounded-full bg-secondary text-secondary-foreground border border-transparent hover:bg-secondary/80 transition-all shadow-sm"
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowResolutions(!showResolutions)}
                disabled={isDownloading}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all shadow-xl hover:shadow-primary/20 disabled:opacity-50"
              >
                <Download className="w-6 h-6" />
                {isDownloading ? "Downloading..." : `${t("download")} Free`}
              </button>

              {showResolutions && (
                <>
                  {/* Backdrop overlay to close dropdown */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowResolutions(false)}
                  />
                  <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-card border border-border rounded-xl shadow-2xl z-20 flex flex-col gap-1">
                    {downloadResolutions.map((res) => (
                      <button
                        key={res.label}
                        onClick={() =>
                          handleDownload(
                            wallpaper.image,
                            `${wallpaper.title}-${res.value}`,
                          )
                        }
                        className="flex items-center justify-between p-3 hover:bg-secondary rounded-lg transition-colors text-left w-full"
                      >
                        <span className="font-medium">{res.label}</span>
                        <span className="text-muted-foreground text-sm">
                          {res.value}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-secondary/30 p-6 rounded-2xl border border-border">
            <h3 className="flex items-center gap-2 font-semibold mb-4 text-lg">
              <Info className="w-5 h-5" /> Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted-foreground">Category</span>
                <button
                  onClick={() => navigate(`/category/${wallpaper.category}`)}
                  className="font-medium hover:text-primary transition-colors"
                >
                  {wallpaper.category}
                </button>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted-foreground">Resolution</span>
                <span className="font-medium">{wallpaper.resolution}</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted-foreground">Downloads</span>
                <span className="font-medium">
                  {wallpaper.downloads.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {wallpaper.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => navigate(`/search?q=${tag}`)}
                    className="px-3 py-1 bg-background border border-border rounded-lg text-sm hover:border-primary transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Wallpapers */}
      <div>
        <h2 className="text-2xl font-bold mb-6">{t("similar_wallpapers")}</h2>
        <WallpaperGrid wallpapers={relatedWallpapers} />
      </div>

      {/* Fullscreen Lightbox */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col backdrop-blur-sm">
          <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
            <span className="text-white font-medium">{wallpaper.title}</span>
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            <img
              src={wallpaper.image}
              alt={wallpaper.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
