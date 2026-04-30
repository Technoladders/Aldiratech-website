import { Building2, Radio, HeartPulse, Zap, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const icons = [Building2, Radio, HeartPulse, Zap];

export const CaseStudies = () => {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <section id="case-studies" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className={`text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-4 ${isAr ? "font-arabic normal-case tracking-normal text-sm" : ""}`}>
              {t.cases.eyebrow}
            </div>
            <h2 className={`font-display font-bold text-4xl md:text-5xl tracking-tight ${isAr ? "font-arabic leading-tight" : ""}`}>
              {t.cases.titleA}
              <br />
              <span className="text-primary">{t.cases.titleB}</span> {t.cases.titleC}
            </h2>
          </div>
          <a href="#" className={`inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all ${isAr ? "font-arabic" : ""}`}>
            {t.cases.seeAll} <ArrowUpRight className="w-4 h-4 rtl-flip" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {t.cases.items.map((c, i) => {
            const Icon = icons[i];
            return (
              <article
                key={c.industry}
                className="group relative glass rounded-3xl gold-edge overflow-hidden hover:-translate-y-1 hover:shadow-luxe transition-all duration-700"
              >
                <div className="p-8 lg:p-10">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl gradient-emerald flex items-center justify-center shadow-soft">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <div className={`text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium ${isAr ? "font-arabic normal-case tracking-normal" : ""}`}>
                      {c.industry}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <div className={`text-[11px] uppercase tracking-wider text-muted-foreground mb-1 ${isAr ? "font-arabic normal-case tracking-normal" : ""}`}>
                        {t.cases.challenge}
                      </div>
                      <p className={`font-display font-semibold text-lg leading-snug ${isAr ? "font-arabic" : ""}`}>{c.challenge}</p>
                    </div>
                    <div className="divider-gold" />
                    <div>
                      <div className={`text-[11px] uppercase tracking-wider text-muted-foreground mb-1 ${isAr ? "font-arabic normal-case tracking-normal" : ""}`}>
                        {t.cases.solution}
                      </div>
                      <p className={`text-sm text-muted-foreground leading-relaxed ${isAr ? "font-arabic" : ""}`}>{c.solution}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <div className={`text-[11px] uppercase tracking-wider text-muted-foreground mb-1 ${isAr ? "font-arabic normal-case tracking-normal" : ""}`}>
                          {t.cases.outcome}
                        </div>
                        <div className="font-display font-bold text-2xl text-primary">{c.outcome}</div>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-border-solid flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all">
                        <ArrowUpRight className="w-4 h-4 rtl-flip" />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
