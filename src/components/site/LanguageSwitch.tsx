import { useLanguage, type Lang } from "@/context/LanguageContext";

export const LanguageSwitch = ({ compact = false }: { compact?: boolean }) => {
  const { lang, setLang } = useLanguage();
  const opts: { value: Lang; label: string }[] = [
    { value: "en", label: "EN" },
    { value: "ar", label: "العربية" },
  ];

  return (
    <div
      className={`relative inline-flex items-center rounded-full p-1 glass ${compact ? "" : "gap-1"}`}
      role="group"
      aria-label="Language"
    >
      {opts.map((o) => {
        const active = lang === o.value;
        return (
          <button
            key={o.value}
            onClick={() => setLang(o.value)}
            aria-pressed={active}
            className={`relative px-3 h-8 text-xs font-semibold rounded-full transition-all duration-500 ${
              active
                ? "bg-primary text-primary-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground"
            } ${o.value === "ar" ? "font-arabic text-sm" : "tracking-wider"}`}
          >
            {o.label}
            {active && (
              <span className="absolute -bottom-1 left-3 right-3 h-px bg-gold" aria-hidden />
            )}
          </button>
        );
      })}
    </div>
  );
};
