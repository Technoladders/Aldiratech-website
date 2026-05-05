// src/components/shared/ScrollToTop.tsx
// Place this inside <BrowserRouter> in App.tsx.
// Every time the route changes, scroll the window to 0,0 instantly.

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use instant scroll (no smooth) so the new page starts at top immediately
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};