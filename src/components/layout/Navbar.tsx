import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  Heart,
  Bookmark,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  useThemeStore,
  useFavoritesStore,
  useSavedStore,
} from "../../store/useStore";
import { cn } from "../../lib/utils";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { theme, setTheme } = useThemeStore();
  const { favorites } = useFavoritesStore();
  const { saved } = useSavedStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLangMenu, setShowLangMenu] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "uz", name: "Oʻzbek" },
    { code: "ru", name: "Русский" },
    { code: "tr", name: "Türkçe" },
    { code: "es", name: "Español" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: t("home"), path: "/" },
    { name: t("explore"), path: "/explore" },
    { name: t("categories"), path: "/categories" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm py-3"
          : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
            <img src="/gemini.svg" alt="Logo" />
          </div>
          <span className="text-xl font-bold tracking-tight pr-3.5 text-foreground group-hover:text-primary transition-colors">
            {t("app_name")}
          </span>
        </Link>

        <div className=" hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Search Bar (Desktop) */}
        <form
          onSubmit={handleSearch}
          className="hidden lg:flex relative max-w-md w-full mx-4"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("search_placeholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-secondary/50 border border-border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </form>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Favorites */}
          <Link
            to="/favorites"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary"
            title="Favorites"
          >
            <Heart className="w-4 h-4" />
            <span>Favorites</span>
            {favorites.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400 text-xs">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Saved */}
          <Link
            to="/saved"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary"
            title="Saved Wallpapers"
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved</span>
            {saved.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                {saved.length}
              </span>
            )}
          </Link>

          {/* Language Selector */}
          <div className="relative ml-2">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary flex items-center gap-1"
            >
              <Globe className="w-5 h-5" />
            </button>
            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-xl shadow-xl py-2 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                      setShowLangMenu(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors",
                      i18n.language === lang.code
                        ? "font-bold text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-4 shadow-lg flex flex-col gap-4">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("search_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none"
            />
          </form>

          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="py-2 text-foreground font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/favorites"
              className="py-2 text-foreground font-medium flex items-center justify-between"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" /> Favorites
              </div>
              {favorites.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400 text-xs font-bold">
                  {favorites.length}
                </span>
              )}
            </Link>

            <Link
              to="/saved"
              className="py-2 text-foreground font-medium flex items-center justify-between"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5" /> Saved Wallpapers
              </div>
              {saved.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {saved.length}
                </span>
              )}
            </Link>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <select
                className="bg-transparent border-none text-sm outline-none text-foreground"
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
              >
                {languages.map((lang) => (
                  <option
                    key={lang.code}
                    value={lang.code}
                    className="bg-background"
                  >
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-2 text-sm font-medium"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-5 h-5" /> Light Mode
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5" /> Dark Mode
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
