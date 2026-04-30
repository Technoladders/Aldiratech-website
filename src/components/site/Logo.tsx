// src/components/site/Logo.tsx
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

interface LogoProps {
  variant?: "full" | "horizontal";
  className?: string;
}

export const Logo = ({ variant = "horizontal", className = "" }: LogoProps) => {
  const { resolved } = useTheme();
  const { lang } = useLanguage();
  const isDark = resolved === "dark";

  // Brand colors
  const emerald = isDark ? "#F2EEE4" : "#0B5D3B";
  const gold = isDark ? "#E6C786" : "#D4AF63";

  const LogoMark = () => (
    <svg viewBox="0 0 200 200" className="w-10 h-10 flex-shrink-0" aria-hidden="true">
      {/* Palm canopy */}
      <path d="M 100 76 C 90 72 86 68 84 66" stroke={emerald} strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M 100 76 C 110 72 114 68 116 66" stroke={emerald} strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M 100 76 L 100 66" stroke={emerald} strokeWidth="2.6" strokeLinecap="round" />
      {/* A trunk */}
      <path d="M 100 86 L 38 188 L 60 188 L 100 120 Z" fill={emerald} />
      <path d="M 100 86 L 162 188 L 140 188 L 100 120 Z" fill={emerald} />
      <path d="M 76 152 L 124 152 L 119 162 L 81 162 Z" fill={emerald} />
      <path d="M 100 132 L 93 146 L 107 146 Z" fill={emerald} />
      {/* Gold accent dot */}
      <circle cx="100" cy="76" r="2" fill={gold} />
    </svg>
  );

  // Horizontal variant: icon + wordmark side by side (for navbar)
  if (variant === "horizontal") {
    return (
      <a href="#" className={`flex items-center gap-3 shrink-0 group ${className}`}>
        <div className="w-10 h-10 rounded-xl gradient-emerald flex items-center justify-center shadow-soft transition-shadow duration-500 group-hover:shadow-glow-emerald">
          <LogoMark />
        </div>

        <div className="leading-tight">
          <div
            className={`font-display font-bold text-lg tracking-tight ${
              lang === "ar" ? "font-arabic" : ""
            }`}
          >
            {lang === "ar" ? (
              <>
                ألديرا<span className="text-primary">تك</span>
              </>
            ) : (
              <>
                Aldira<span className="text-primary">tech</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              ServiceNow
            </div>
            <span className="text-[10px] text-muted-foreground/50">·</span>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              K2 Partner
            </div>
          </div>
        </div>
      </a>
    );
  }

  // Full variant: icon + wordmark + tagline (for footer)
  return (
    <a href="#" className={`flex items-center gap-4 shrink-0 group ${className}`}>
      <div className="w-12 h-12 rounded-2xl gradient-emerald flex items-center justify-center shadow-soft transition-shadow duration-500 group-hover:shadow-glow-emerald">
        <LogoMark />
      </div>

      <div className="leading-tight">
        <div
          className={`font-display font-bold text-xl tracking-tight ${
            lang === "ar" ? "font-arabic" : ""
          }`}
        >
          {lang === "ar" ? (
            <>
              ألديرا<span className="text-primary">تك</span>
            </>
          ) : (
            <>
              Aldira<span className="text-primary">tech</span>
            </>
          )}
        </div>

        <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {lang === "ar" ? "استشارات ServiceNow" : "ServiceNow Consulting"}
        </div>

        <div className="flex items-center gap-1.5 mt-0.5">
          <div className="h-px w-8 bg-gold" />
          <div className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground/70">
            {lang === "ar" ? "الرياض · عالمياً" : "Riyadh · Global"}
          </div>
        </div>
      </div>
    </a>
  );
};