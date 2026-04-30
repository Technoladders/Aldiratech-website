import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { en, type Translation } from "@/locales/en";
import { ar } from "@/locales/ar";

export type Lang = "en" | "ar";

interface LanguageContextValue {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: Translation;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "aldiratech.lang";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "en" || saved === "ar") return saved;
    return navigator.language?.startsWith("ar") ? "ar" : "en";
  });

  const dir = lang === "ar" ? "rtl" : "ltr";
  const t = lang === "ar" ? ar : en;

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = dir;
    document.title = t.meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t.meta.description);
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang, dir, t]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      dir,
      t,
      setLang: setLangState,
      toggle: () => setLangState((l) => (l === "en" ? "ar" : "en")),
    }),
    [lang, dir, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
