import { Award, Globe2, Users, Lock } from "lucide-react";
import heritage from "@/assets/palm-2.png";
import { useLanguage } from "@/context/LanguageContext";

const icons = [Award, Globe2, Users, Lock];

export const WhyChooseUs = () => {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <section id="about-us" className="py-24 lg:py-32 gradient-section">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-luxe border border-border-solid">
              <img
                src={heritage}
                alt="Saudi heritage with palm and geometric pattern"
                className="w-full h-[560px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 gradient-emerald opacity-5" />
              <div className="absolute inset-0 flex flex-col justify-end p-10">
                <div className="font-arabic text-gold text-4xl font-bold leading-tight mb-3" dir="rtl">
                  خبرة عالمية،
                  <br />
                  تنفيذ محلي
                </div>
                <p className="text-white/80 text-sm max-w-xs">{t.why.heritageCaption}</p>
              </div>
            </div>
            <div className="absolute -bottom-16 -right-6 glass-strong rounded-2xl p-5 hidden md:block">
              <div className={`text-xs uppercase tracking-wider text-muted-foreground mb-1 ${isAr ? "font-arabic normal-case tracking-normal" : ""}`}>
                {t.why.badgeEyebrow}
              </div>
              <div className={`font-display font-bold text-primary ${isAr ? "font-arabic" : ""}`}>{t.why.badgeLabel}</div>
            </div>
          </div>

          {/* Right reasons */}
          <div className="lg:col-span-7">
            <div className={`text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-4 ${isAr ? "font-arabic normal-case tracking-normal text-sm" : ""}`}>
              {t.why.eyebrow}
            </div>
            <h2 className={`font-display font-bold text-4xl md:text-5xl tracking-tight mb-6 ${isAr ? "font-arabic leading-tight" : ""}`}>
              {t.why.titleA}
              <br />
              {t.why.titleB} <span className="text-primary">{lang === "ar" ? "ألديراتك" : "Aldiratech"}</span>
            </h2>
            <p className={`text-lg text-muted-foreground mb-10 max-w-2xl ${isAr ? "font-arabic" : ""}`}>{t.why.subtitle}</p>

            <div className="grid sm:grid-cols-2 gap-5">
              {t.why.items.map((r, i) => {
                const Icon = icons[i];
                return (
                  <div
                    key={r.title}
                    className="glass rounded-2xl p-6 gold-edge hover:-translate-y-1 transition-all duration-700"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gold-soft flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className={`font-display font-semibold text-lg mb-2 ${isAr ? "font-arabic" : ""}`}>{r.title}</h3>
                    <p className={`text-sm text-muted-foreground leading-relaxed ${isAr ? "font-arabic" : ""}`}>{r.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
