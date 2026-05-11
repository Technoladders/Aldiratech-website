import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/hooks/useContent";

export const CtaBanner = () => {
  const { lang } = useLanguage();
  const { cta: t } = useContent();
  const isAr = lang === "ar";

  return (
    <section className="py-10 lg:py-12">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="relative gradient-emerald rounded-[2.5rem] overflow-hidden shadow-luxe">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--gold)) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gold/15 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-primary/40 blur-3xl" />
          <div className="relative px-8 py-12 lg:px-20 lg:py-14 text-center">
            <div className={`inline-block text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-6 ${isAr ? "font-arabic normal-case tracking-normal text-sm" : ""}`}>
              {t.eyebrow}
            </div>
            <h2 className={`font-display font-bold text-2xl md:text-4xl lg:text-5xl text-white tracking-tight max-w-4xl mx-auto leading-[1.15] mb-8 ${isAr ? "font-arabic" : ""}`}>
              {t.titleA} <span className="text-gold">{t.titleHighlight}</span>
            </h2>
            <p className={`text-white/75 text-md max-w-2xl mx-auto mb-10 ${isAr ? "font-arabic" : ""}`}>{t.subtitle}</p>
            <Link to="/contact">
              <Button variant="gold" size="lg" className="btn-shimmer">
                {t.button}
                <ArrowRight className="w-5 h-5 rtl-flip" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};