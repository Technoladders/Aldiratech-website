// ─── SectionHeader ─────────────────────────────────────────────────────────
import { useLanguage } from "@/context/LanguageContext";
import { useStaggerReveal } from "@/hooks/useScrollReveal";

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}

export const SectionHeader = ({ eyebrow, title, subtitle, center = true }: SectionHeaderProps) => {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const ref = useStaggerReveal(0.1);

  return (
    <div ref={ref} className={`mb-14 ${center ? "text-center max-w-3xl mx-auto" : "max-w-2xl"}`}>
      <div className={`reveal-up text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-4 ${isAr ? "font-arabic normal-case tracking-normal text-sm" : ""}`}>
        {eyebrow}
      </div>
      <h2 className={`reveal-up font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight mb-5 ${isAr ? "font-arabic leading-tight" : ""}`}>
        {title}
      </h2>
      {subtitle && (
        <>
          <div className={`reveal-up h-px w-24 bg-gradient-to-r from-gold to-transparent mb-5 ${center ? "mx-auto" : ""}`} />
          <p className={`reveal-up text-lg text-muted-foreground leading-relaxed ${isAr ? "font-arabic" : ""}`}>
            {subtitle}
          </p>
        </>
      )}
    </div>
  );
};