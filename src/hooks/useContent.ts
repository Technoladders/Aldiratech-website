// src/hooks/useContent.ts
// Loads content from JSON files (en.json / ar.json).
// These files are the source of truth — edited via /admin/content
// and committed to GitHub, triggering a redeploy.

import enContent from "@/content/en.json";
import arContent from "@/content/ar.json";
import { useLanguage } from "@/context/LanguageContext";

export type SiteContent = typeof enContent;

export const useContent = (): SiteContent => {
  const { lang } = useLanguage();
  // Cast to SiteContent — both files share the same shape
  return (lang === "ar" ? arContent : enContent) as SiteContent;
};