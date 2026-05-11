import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/hooks/useContent";

// ── Brand SVGs (reduced to small inline logos) ───────────────────────────────
const SAPLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 254" className="w-10 h-auto">
    <defs>
      <linearGradient id="sapGrad" x1="50%" x2="50%" y1="0%" y2="100.002%">
        <stop offset="0%" stopColor="#00AEEF"/><stop offset="100%" stopColor="#0066B3"/>
      </linearGradient>
    </defs>
    <path fill="url(#sapGrad)" d="M0 253.281h258.764L512 0H0v253.281"/>
    <path fill="currentColor" className="text-white dark:text-white" d="M303.848 50.656H253.28l.17 118.93l-44.032-118.975h-43.66l-37.587 99.36c-3.996-25.283-30.135-34.007-50.702-40.542c-13.581-4.362-27.996-10.779-27.85-17.87c.113-5.82 7.712-11.218 22.813-10.413c10.131.546 19.08 1.362 36.883 9.962l17.505-30.506c-16.233-8.263-38.679-13.48-57.084-13.497h-.113c-21.461 0-39.331 6.95-50.408 18.405C11.493 73.502 7.328 83.667 7.16 94.907c-.282 15.467 5.386 26.432 17.296 35.195c10.064 7.374 22.936 12.158 34.277 15.67c13.987 4.334 25.413 8.105 25.272 16.131c-.112 2.927-1.216 5.662-3.32 7.869c-3.49 3.602-8.837 4.953-16.239 5.1c-14.28.303-24.86-1.943-41.724-11.91l-15.574 30.9c16.846 9.58 34.728 14.386 55.047 14.386l4.57-.034c17.685-.32 32.037-4.559 43.44-13.733c.654-.524 1.239-1.053 1.847-1.588l-1.914 9.862l42.664-.135l7.655-19.599c8.048 2.747 17.2 4.267 26.915 4.267c9.467 0 18.371-1.441 26.268-4.03l5.336 19.362l76.547.073l.186-44.68h16.289c39.371 0 62.645-20.037 62.645-53.639c-.013-37.423-22.638-53.723-70.795-53.723v.005ZM187.372 152.318c-5.882 0-11.398-1.025-16.142-2.826l15.962-50.403h.31l15.703 50.544c-4.728 1.689-10.115 2.685-15.839 2.685h.006Zm119.436-28.959h-11.11V82.74h11.116c14.803 0 26.623 4.93 26.623 20.048c-.013 15.647-11.82 20.572-26.623 20.572"/>
  </svg>
);

const SalesforceLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 18 128 92" className="w-10 h-auto">
    <path fill="#00A1E0" d="M53.01 31.44c3.98-4.14 9.51-6.71 15.64-6.71c8.14 0 15.24 4.54 19.02 11.28a26.26 26.26 0 0 1 10.75-2.29c14.68 0 26.58 12.01 26.58 26.81c0 14.81-11.9 26.82-26.58 26.82c-1.79 0-3.54-.18-5.24-.52c-3.33 5.94-9.68 9.95-16.96 9.95c-3.05 0-5.93-.7-8.5-1.96c-3.38 7.94-11.24 13.51-20.41 13.51c-9.55 0-17.68-6.04-20.8-14.51c-1.36.29-2.78.44-4.23.44c-11.37 0-20.58-9.31-20.58-20.79c0-7.7 4.14-14.42 10.29-18.01a23.727 23.727 0 0 1-1.97-9.51c0-13.21 10.72-23.92 23.95-23.92c7.76-.01 14.67 3.69 19.04 9.41"/>
    <path fill="#FFF" d="M19.56 66.78c-.08.2.03.24.05.28c.23.17.47.29.7.43c1.26.67 2.44.86 3.69.86c2.53 0 4.1-1.35 4.1-3.51v-.04c0-2-1.77-2.73-3.44-3.25l-.22-.07c-1.25-.41-2.34-.76-2.34-1.58v-.04c0-.71.63-1.23 1.61-1.23c1.09 0 2.38.36 3.21.82c0 0 .24.16.33-.08c.05-.13.47-1.26.51-1.38c.05-.13-.04-.23-.12-.28c-.95-.58-2.26-.97-3.62-.97h-.25c-2.31 0-3.93 1.4-3.93 3.4v.04c0 2.11 1.78 2.8 3.45 3.28l.27.08c1.22.37 2.27.7 2.27 1.55v.04c0 .78-.68 1.37-1.78 1.37c-.43 0-1.79-.01-3.26-.94c-.18-.1-.28-.18-.42-.26c-.07-.05-.25-.12-.33.11l-.48 1.37zm37.03 0c-.08.2.03.24.05.28c.23.17.47.29.7.43c1.26.67 2.44.86 3.69.86c2.53 0 4.1-1.35 4.1-3.51v-.04c0-2-1.77-2.73-3.44-3.25l-.22-.07c-1.25-.41-2.34-.76-2.34-1.58v-.04c0-.71.63-1.23 1.61-1.23c1.09 0 2.38.36 3.21.82c0 0 .24.16.33-.08c.05-.13.47-1.26.51-1.38c.05-.13-.04-.23-.12-.28c-.95-.58-2.26-.97-3.62-.97h-.25c-2.31 0-3.93 1.4-3.93 3.4v.04c0 2.11 1.78 2.8 3.45 3.28l.27.08c1.22.37 2.27.7 2.27 1.55v.04c0 .78-.68 1.37-1.78 1.37c-.43 0-1.79-.01-3.26-.94c-.18-.1-.28-.18-.42-.26c-.05-.03-.26-.11-.33.11l-.48 1.37zm25.27-4.24c0 1.22-.23 2.19-.68 2.87c-.44.67-1.12 1-2.05 1c-.94 0-1.61-.33-2.05-1c-.44-.68-.67-1.65-.67-2.87c0-1.22.22-2.18.67-2.86c.44-.67 1.11-.99 2.05-.99c.94 0 1.61.32 2.06.99c.44.67.67 1.63.67 2.86m2.11-2.27c-.21-.7-.53-1.32-.96-1.83a4.53 4.53 0 0 0-1.62-1.23c-.64-.3-1.41-.45-2.26-.45c-.86 0-1.62.15-2.26.45c-.65.3-1.19.72-1.62 1.23c-.43.52-.75 1.13-.96 1.83c-.21.7-.31 1.46-.31 2.27s.1 1.57.31 2.27s.53 1.32.96 1.83c.43.52.98.93 1.62 1.22c.65.29 1.41.44 2.26.44c.86 0 1.62-.15 2.26-.44c.64-.29 1.19-.71 1.62-1.22c.43-.51.75-1.13.96-1.83c.21-.7.31-1.46.31-2.27s-.1-1.58-.31-2.27m17.34 5.81c-.07-.21-.27-.13-.27-.13c-.31.12-.63.23-.98.28c-.35.05-.74.08-1.16.08c-1.02 0-1.83-.3-2.42-.9c-.58-.6-.91-1.57-.91-2.89c0-1.2.29-2.1.81-2.78c.51-.68 1.3-1.03 2.34-1.03c.87 0 1.54.1 2.23.32c0 0 .17.07.25-.15c.18-.51.32-.88.52-1.44c.06-.16-.08-.23-.13-.25c-.27-.11-.92-.28-1.41-.35c-.46-.07-.99-.11-1.58-.11c-.89 0-1.68.15-2.35.45c-.67.3-1.25.71-1.7 1.23a5.3 5.3 0 0 0-1.03 1.83c-.23.7-.34 1.46-.34 2.27c0 1.75.47 3.17 1.41 4.2c.93 1.04 2.34 1.57 4.17 1.57c1.08 0 2.19-.22 2.99-.53c0 0 .15-.07.09-.25l-.53-1.42zm3.7-4.72c.1-.68.29-1.25.58-1.69c.44-.67 1.1-1.04 2.04-1.04s1.56.37 2 1.04c.3.44.42 1.03.47 1.69h-5.09zm7.1-1.49c-.18-.68-.62-1.36-.92-1.67c-.46-.5-.91-.84-1.36-1.03a5.2 5.2 0 0 0-2.05-.41c-.89 0-1.7.15-2.36.46c-.66.31-1.21.73-1.65 1.26c-.43.52-.76 1.15-.97 1.85c-.21.7-.31 1.47-.31 2.28c0 .82.11 1.59.32 2.28c.22.7.57 1.31 1.04 1.82c.47.51 1.07.91 1.8 1.19c.72.28 1.59.42 2.59.42c2.06-.01 3.15-.47 3.6-.71c.08-.04.15-.12.06-.34l-.47-1.31c-.07-.19-.27-.12-.27-.12c-.51.19-1.24.53-2.93.53c-1.11 0-1.93-.33-2.44-.84c-.53-.52-.79-1.29-.83-2.38l7.15.01s.19 0 .21-.19c.01-.1.25-1.49-.21-3.1zm-64.34 1.49c.1-.68.29-1.25.58-1.69c.44-.67 1.1-1.04 2.04-1.04s1.56.37 2 1.04c.29.44.42 1.03.47 1.69h-5.09zm7.11-1.49c-.18-.68-.62-1.36-.91-1.67c-.46-.5-.91-.84-1.36-1.03a5.2 5.2 0 0 0-2.05-.41c-.89 0-1.7.15-2.36.46c-.66.31-1.21.73-1.65 1.26c-.43.52-.76 1.15-.97 1.85c-.21.7-.31 1.47-.31 2.28c0 .82.11 1.59.32 2.28c.22.7.57 1.31 1.04 1.82c.47.51 1.07.91 1.8 1.19c.72.28 1.59.42 2.59.42c2.06-.01 3.15-.47 3.6-.71c.08-.04.15-.12.06-.34l-.47-1.31c-.07-.19-.27-.12-.27-.12c-.51.19-1.24.53-2.93.53c-1.11 0-1.93-.33-2.44-.84c-.53-.52-.79-1.29-.83-2.38l7.15.01s.19 0 .21-.19c0-.1.24-1.49-.22-3.1zm-22.56 6.17c-.28-.22-.32-.28-.41-.42c-.14-.22-.21-.53-.21-.93c0-.63.21-1.08.64-1.38c-.01 0 .61-.54 2.07-.52c1.02.01 1.94.17 1.94.17v3.25s-.91.19-1.93.26c-1.46.08-2.1-.43-2.1-.43m2.85-5.02c-.29-.02-.67-.03-1.12-.03c-.61 0-1.2.08-1.76.23c-.56.15-1.06.38-1.49.69c-.43.31-.78.71-1.04 1.18c-.25.47-.38 1.03-.38 1.65c0 .63.11 1.18.33 1.63c.22.45.53.83.93 1.12c.4.29.89.5 1.46.63c.56.13 1.2.19 1.89.19c.73 0 1.46-.06 2.17-.18c.7-.12 1.56-.29 1.8-.35s.5-.13.5-.13c.18-.04.16-.23.16-.23v-6.54c0-1.43-.38-2.5-1.14-3.15c-.75-.66-1.85-.99-3.28-.99c-.54 0-1.4.07-1.91.18c0 0-1.56.3-2.2.8c0 0-.14.09-.06.28l.51 1.36c.06.18.23.12.23.12s.05-.02.12-.06c1.38-.75 3.11-.73 3.11-.73c.77 0 1.37.15 1.77.46c.39.3.59.75.59 1.7v.3c-.63-.08-1.19-.13-1.19-.13m57.64-3.68a.201.201 0 0 0-.11-.26c-.12-.05-.73-.18-1.2-.21c-.9-.05-1.4.1-1.84.3c-.44.2-.93.52-1.21.89v-.87c0-.12-.09-.22-.21-.22h-1.83c-.12 0-.21.1-.21.22v10.66c0 .12.1.22.22.22h1.88c.12 0 .22-.1.22-.22v-5.33c0-.71.08-1.43.24-1.88c.15-.44.37-.8.63-1.05s.56-.43.88-.53c.33-.1.7-.14.96-.14c.37 0 .79.1.79.1c.14.02.21-.07.26-.19c.11-.32.46-1.3.53-1.49"/>
    <path fill="#FFF" d="M75.18 52.4c-.23-.07-.44-.12-.71-.17c-.27-.05-.6-.07-.97-.07c-1.29 0-2.31.37-3.03 1.09c-.71.72-1.19 1.81-1.44 3.24l-.09.48h-1.62s-.2-.01-.24.21l-.27 1.49c-.02.14.04.23.23.23h1.58l-1.6 8.94c-.12.72-.27 1.31-.43 1.76c-.16.44-.31.77-.5 1.02c-.18.23-.35.4-.65.5c-.25.08-.53.12-.84.12c-.17 0-.4-.03-.57-.06c-.17-.03-.26-.07-.39-.12c0 0-.18-.07-.26.11c-.06.15-.48 1.31-.53 1.45c-.05.14.02.25.11.29c.21.07.37.12.65.19c.4.09.73.1 1.05.1c.66 0 1.26-.09 1.75-.27c.5-.18.93-.5 1.32-.92c.42-.46.68-.94.93-1.6c.25-.65.46-1.46.63-2.4l1.61-9.11h2.35s.2.01.24-.21l.27-1.49c.02-.14-.04-.23-.23-.23h-2.29c.01-.05.12-.86.38-1.61c.11-.32.32-.58.5-.76c.18-.18.38-.3.6-.37c.23-.07.48-.11.77-.11c.21 0 .43.02.59.06c.22.05.31.07.37.09c.23.07.27 0 .31-.11l.55-1.5c.06-.17-.08-.24-.13-.26M43.26 67.85c0 .12-.09.22-.21.22h-1.9c-.12 0-.2-.1-.2-.22V52.6c0-.12.08-.22.2-.22h1.9c.12 0 .21.1.21.22v15.25z"/>
  </svg>
);

const ServiceNowLogo = () => (
  <svg viewBox="0 28 700 125" xmlns="http://www.w3.org/2000/svg" className="w-20 h-auto">
    <rect width="820" height="180" rx="28" fill="#032F3E"/>
    <text x="38" y="118" fontFamily="Arial, Helvetica, sans-serif" fontSize="118" fontWeight="700" fill="#FFFFFF" letterSpacing="-5">servicen</text>
    <text x="480" y="118" fontFamily="Arial, Helvetica, sans-serif" fontSize="118" fontWeight="700" fill="#62D84E" letterSpacing="0">o</text>
    <text x="550" y="118" fontFamily="Arial, Helvetica, sans-serif" fontSize="118" fontWeight="700" fill="#FFFFFF" letterSpacing="-8">w</text>
  </svg>
);

const AILogo = () => (
  <svg viewBox="0 0 120 120" className="w-10 h-auto" fill="none">
    <defs>
      <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a855f7"/><stop offset="100%" stopColor="#6366f1"/>
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="52" stroke="url(#aiGrad)" strokeWidth="2" opacity="0.3"/>
    <circle cx="60" cy="60" r="38" stroke="url(#aiGrad)" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.5"/>
    <path d="M42 68 L54 44 L60 56 L66 44 L78 68" stroke="url(#aiGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="46" cy="52" r="3" fill="#a855f7" opacity="0.8"/>
    <circle cx="74" cy="52" r="3" fill="#6366f1" opacity="0.8"/>
    <circle cx="60" cy="72" r="2.5" fill="url(#aiGrad)"/>
    <line x1="60" y1="72" x2="60" y2="80" stroke="url(#aiGrad)" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="54" y1="84" x2="66" y2="84" stroke="url(#aiGrad)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ── Mapping slug → logo component ──────────────────────────────────────────
const brandLogoMap: Record<string, React.ElementType> = {
  sap: SAPLogo,
  salesforce: SalesforceLogo,
  servicenow: ServiceNowLogo,
  "ai-automation": AILogo,
};

// ── Illustration positions & colors ─────────────────────────────────────────
const nodeConfig: Record<string, { cx: number; cy: number; color: string }> = {
  sap:              { cx: 150, cy: 80,  color: "#0070f3" },
  salesforce:       { cx: 280, cy: 150, color: "#00a1e0" },
  servicenow:       { cx: 180, cy: 280, color: "#62d84e" },
  "ai-automation":  { cx: 310, cy: 250, color: "#a855f7" },
};

export const ServicesSection = () => {
  const { lang } = useLanguage();
  const c = useContent();
  const isAr = lang === "ar";

  const mainServices = c.services.items.filter((s: any) => !s.parent);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <section id="services" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background">
      {/* Background blobs — light theme friendly */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-emerald-500/6 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-[400px] h-[400px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 py-4 lg:py-6">
        {/* Heading — centered at top */}
        <div className="text-center mb-[-40px] reveal-up">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold uppercase tracking-[0.15em] mb-2 ${isAr ? "font-arabic normal-case tracking-normal" : ""}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            {c.services.eyebrow}
          </div>
          <h2 className={`font-display font-bold text-xl md:text-2xl lg:text-3xl tracking-tight mb-1 ${isAr ? "font-arabic leading-tight" : ""}`}>
            {c.services.titleA}
            <br />
            <span className="text-emerald-600 dark:text-emerald-400">{c.services.titleB}</span>
          </h2>
          <div className="divider-gold w-16 mx-auto mb-0" />
          <p className={`text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed ${isAr ? "font-arabic" : ""}`}>
            {c.services.subtitle}
          </p>
        </div>

        {/* Content area — cards left, illustration right */}
        <div className="grid lg:grid-cols-2 gap-4 items-center">
          {/* Left — 2x2 compact card grid */}
          <div className="grid grid-cols-2 gap-3 reveal-up">
            {mainServices.map((service: any) => {
              const Logo = brandLogoMap[service.slug];
              const title = isAr ? service.mainLabel || service.title : service.mainLabel || service.title;
              const desc = isAr ? service.mainDesc || service.desc : service.mainDesc || service.desc;

              return (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group glass rounded-xl p-4 border border-emerald-500/10 hover:border-emerald-500/30 hover:-translate-y-0.5 transition-all duration-500"
                  onMouseEnter={() => setHoveredSlug(service.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                >
                  <div className="absolute top-0 left-3 right-3 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="mb-2.5 flex items-center h-8">
                    {Logo ? <Logo /> : (
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <service.icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className={`font-semibold text-sm mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors ${isAr ? "font-arabic" : ""}`}>
                    {title}
                  </h3>
                  
                  <p className={`text-[11px] text-muted-foreground leading-relaxed line-clamp-2 ${isAr ? "font-arabic" : ""}`}>
                    {desc}
                  </p>
                  
                  <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-medium text-gold opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-500">
                    {isAr ? "استكشف" : "Explore"}
                    <ArrowUpRight className="w-3 h-3 rtl-flip" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Right — illustration (theme-aware background) */}
          <div className="hidden lg:flex items-center justify-center relative">
            {/* Light theme: subtle green tint | Dark theme: darker backdrop */}
            <div className="absolute inset-0 rounded-3xl bg-emerald-500/3 dark:bg-emerald-950/30" />
            
            <svg viewBox="0 0 520 560" className="w-full max-w-[480px] h-auto relative z-10" fill="none">
              <defs>
                <filter id="glowNode">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glowGold">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              
              {/* Central platform */}
              <circle cx="260" cy="280" r="145" stroke="#10b981" strokeWidth="0.6" strokeDasharray="5 7" opacity="0.25" className="animate-spin-slow" />
              <circle cx="260" cy="280" r="100" stroke="#D4AF63" strokeWidth="0.6" strokeDasharray="3 5" opacity="0.2" className="animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '28s' }} />
              <circle cx="260" cy="280" r="55" fill="#0B5D3B" opacity="0.1" />
              <circle cx="260" cy="280" r="14" fill="#10b981" opacity="0.7" filter="url(#glowNode)" />
              <circle cx="260" cy="280" r="6" fill="#D4AF63" />
              
              {/* SAP — top right */}
              <line x1="260" y1="280" x2="420" y2="110" stroke="#10b981" strokeWidth="1.5" opacity={hoveredSlug === "sap" ? 0.9 : 0.2} className="transition-all duration-700" />
              <circle cx="420" cy="110" r={hoveredSlug === "sap" ? 20 : 14} fill="#10b981" opacity={hoveredSlug === "sap" ? 1 : 0.75} filter={hoveredSlug === "sap" ? "url(#glowNode)" : undefined} className="transition-all duration-500" />
              <circle cx="420" cy="110" r={hoveredSlug === "sap" ? 30 : 22} stroke="#10b981" strokeWidth="1.2" opacity={hoveredSlug === "sap" ? 0.5 : 0.15} fill="none" className="transition-all duration-500" />
              <text x="434" y="88" fontSize="12" fill="#059669" className="dark:fill-[#6ee7b7]" opacity={hoveredSlug === "sap" ? 1 : 0.75} fontFamily="system-ui" fontWeight="700">SAP</text>
              
              {/* Salesforce — right */}
              <line x1="260" y1="280" x2="448" y2="260" stroke="#34d399" strokeWidth="1.5" opacity={hoveredSlug === "salesforce" ? 0.9 : 0.2} className="transition-all duration-700" />
              <circle cx="448" cy="260" r={hoveredSlug === "salesforce" ? 17 : 12} fill="#34d399" opacity={hoveredSlug === "salesforce" ? 1 : 0.75} filter={hoveredSlug === "salesforce" ? "url(#glowNode)" : undefined} className="transition-all duration-500" />
              <text x="440" y="235" fontSize="11" fill="#059669" className="dark:fill-[#6ee7b7]" opacity={hoveredSlug === "salesforce" ? 1 : 0.75} fontFamily="system-ui" fontWeight="700">Salesforce</text>
              
              {/* ServiceNow — bottom right */}
              <line x1="260" y1="280" x2="400" y2="430" stroke="#10b981" strokeWidth="1.5" opacity={hoveredSlug === "servicenow" ? 0.9 : 0.2} className="transition-all duration-700" />
              <circle cx="400" cy="430" r={hoveredSlug === "servicenow" ? 20 : 14} fill="#10b981" opacity={hoveredSlug === "servicenow" ? 1 : 0.75} filter={hoveredSlug === "servicenow" ? "url(#glowNode)" : undefined} className="transition-all duration-500" />
              <circle cx="400" cy="430" r={hoveredSlug === "servicenow" ? 30 : 22} stroke="#10b981" strokeWidth="1.2" opacity={hoveredSlug === "servicenow" ? 0.5 : 0.15} fill="none" className="transition-all duration-500" />
              <text x="414" y="412" fontSize="12" fill="#059669" className="dark:fill-[#6ee7b7]" opacity={hoveredSlug === "servicenow" ? 1 : 0.75} fontFamily="system-ui" fontWeight="700">ServiceNow</text>
              
              {/* AI — top left */}
              <line x1="260" y1="280" x2="100" y2="160" stroke="#D4AF63" strokeWidth="1.5" opacity={hoveredSlug === "ai-automation" ? 1 : 0.25} className="transition-all duration-700" />
              <circle cx="100" cy="160" r={hoveredSlug === "ai-automation" ? 18 : 13} fill="#D4AF63" opacity={hoveredSlug === "ai-automation" ? 1 : 0.8} filter={hoveredSlug === "ai-automation" ? "url(#glowGold)" : undefined} className="transition-all duration-500" />
              <text x="68" y="125" fontSize="11" fill="#b8942e" className="dark:fill-[#f0d78c]" opacity={hoveredSlug === "ai-automation" ? 1 : 0.8} fontFamily="system-ui" fontWeight="700">AI &</text>
              <text x="62" y="140" fontSize="11" fill="#b8942e" className="dark:fill-[#f0d78c]" opacity={hoveredSlug === "ai-automation" ? 1 : 0.8} fontFamily="system-ui" fontWeight="700">Automation</text>

              {/* Floating elements */}
              <circle cx="320" cy="160" r="3" fill="#D4AF63" opacity="0.4" className="animate-pulse" />
              <circle cx="200" cy="360" r="2.5" fill="#10b981" opacity="0.3" className="animate-pulse" style={{ animationDelay: "1s" }} />
              <rect x="340" y="370" width="10" height="10" rx="2.5" fill="#10b981" opacity="0.15" className="animate-float-slow" />
              <rect x="150" y="300" width="8" height="8" rx="2" fill="#D4AF63" opacity="0.12" className="animate-float-slow" style={{ animationDelay: "2s" }} />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};