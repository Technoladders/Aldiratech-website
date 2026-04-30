import { Compass, Layers, Code2, Zap, ShieldCheck, GraduationCap, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const icons = [Compass, Layers, Code2, Zap, ShieldCheck, GraduationCap];

export const Services = () => {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <section id="services" className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className={`text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-4 ${isAr ? "font-arabic normal-case tracking-normal text-sm" : ""}`}>
            {t.services.eyebrow}
          </div>
          <h2 className={`font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 ${isAr ? "font-arabic leading-tight" : ""}`}>
            {t.services.titleA}
            <br />
            <span className="text-primary">{t.services.titleB}</span>
          </h2>
          <div className="divider-gold w-32 mx-auto mb-6" />
          <p className={`text-lg text-muted-foreground ${isAr ? "font-arabic" : ""}`}>
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.items.map((s, i) => {
            const Icon = icons[i];
            return (
              <div
                key={s.title}
                className="group relative glass rounded-3xl p-8 gold-edge hover:-translate-y-1 hover:shadow-luxe transition-all duration-700"
              >
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                    <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className={`font-display font-semibold text-xl mb-3 ${isAr ? "font-arabic" : ""}`}>{s.title}</h3>
                  <p className={`text-muted-foreground text-sm leading-relaxed mb-6 ${isAr ? "font-arabic" : ""}`}>{s.desc}</p>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                    {t.services.learnMore} <ArrowUpRight className="w-4 h-4 rtl-flip" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
// 