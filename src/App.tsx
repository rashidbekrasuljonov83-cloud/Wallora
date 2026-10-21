import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useThemeStore } from './store/useStore';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Categories from './pages/Categories';
import Favorites from './pages/Favorites';
import Saved from './pages/Saved';
import WallpaperDetail from './pages/WallpaperDetail';
import SearchResults from './pages/SearchResults';
import CategoryView from './pages/CategoryView';

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:category" element={<CategoryView />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/wallpaper/:id" element={<WallpaperDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/about" element={<div className="p-8 text-center">About Page Coming Soon</div>} />
          <Route path="/contact" element={<div className="p-8 text-center">Contact Page Coming Soon</div>} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
