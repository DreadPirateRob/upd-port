"use client";

import { useEffect, useState } from "react";

// The `dark` class on <html> is the single source of truth for theme. Reading
// it directly (rather than a React context) keeps canvas-based widgets —
// React Flow, MapLibre — in sync with whatever actually rendered.
export default function useIsDarkMode() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setIsDark(root.classList.contains("dark"));

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return isDark;
}
