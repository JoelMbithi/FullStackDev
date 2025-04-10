import { create } from "zustand";

export const useThemeStore = create((set) => {
  // Get initial theme from localStorage or use default
  const initialTheme = localStorage.getItem("preferred-theme") || "forest";
  
  // Apply theme to document on store creation
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', initialTheme);
  }

  return {
    theme: initialTheme,
    setTheme: (theme) => {
      localStorage.setItem("preferred-theme", theme);
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
      }
      set({ theme });
    },
  };
});