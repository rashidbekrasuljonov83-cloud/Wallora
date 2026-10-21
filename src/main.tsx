import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import "./i18n/config";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <title>Wallora - Free HD Wallpapers</title>
      <link rel="icon" type="image/svg+xml" href="/gemini.svg" />
      <meta
        name="description"
        content="Discover and download stunning HD wallpapers for your devices. Explore a wide range of categories and find the perfect wallpaper to personalize your screen."
      />
      <meta
        name="keywords"
        content="HD wallpapers, free wallpapers, high-quality backgrounds, desktop wallpapers, mobile wallpapers, wallpaper categories, wallpaper search"
      />
      <meta name="author" content="Wallora" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </HelmetProvider>
    <App />
  </React.StrictMode>,
);
