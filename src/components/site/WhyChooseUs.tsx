import { Award, Globe2, Users, Lock } from "lucide-react";
import heritage from "@/assets/palm-2.png";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/hooks/useContent";

const icons = [Award, Globe2, Users, Lock];

export const WhyChooseUs = () => {
  const { lang } = useLanguage();
  const c = useContent();
  const isAr = lang === "ar";
  const t = c.why;

  return (
    <section id="about-us" className="py-6 lg:py-8 gradient-section">
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
              <div className="absolute inset-0 flex flex-col justify-end p-14">
                <div className="font-arabic text-gold text-4xl font-bold leading-tight mb-3" dir="rtl">
                  خبرة عالمية،
                  <br />
                  تنفيذ محلي
                </div>
                <p className="text-white/80 text-sm max-w-xs">{t.heritageCaption}</p>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 glass-strong rounded-2xl p-5 hidden md:block">
              <div className={`text-xs uppercase tracking-wider text-muted-foreground mb-1 ${isAr ? "font-arabic normal-case tracking-normal" : ""}`}>
                {t.badgeEyebrow}
              </div>
              <div className={`font-display font-bold text-primary ${isAr ? "font-arabic" : ""}`}>{t.badgeLabel}</div>
            </div>
          </div>

          {/* Right reasons */}
          <div className="lg:col-span-7">
            <div className={`text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-2 ${isAr ? "font-arabic normal-case tracking-normal text-sm" : ""}`}>
              {t.eyebrow}
            </div>
            <h2 className={`font-display font-bold text-2xl md:text-3xl tracking-tight mb-4 ${isAr ? "font-arabic leading-tight" : ""}`}>
              {t.titleA} {""}
              {/* <br /> */}
              {t.titleB} <span className="text-primary">{lang === "ar" ? "ألديراتك" : "Aldiratech"}</span>
            </h2>
            <p className={`text-sm text-muted-foreground mb-4 max-w-2xl ${isAr ? "font-arabic" : ""}`}>{t.subtitle}</p>

            <div className="grid sm:grid-cols-2 gap-5">
              {t.items.map((r, i) => {
                const Icon = icons[i];
                return (
                  <div
                    key={r.title}
                    className="glass rounded-2xl p-4 gold-edge hover:-translate-y-1 transition-all duration-700"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gold-soft flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className={`font-display font-semibold text-md mb-2 ${isAr ? "font-arabic" : ""}`}>{r.title}</h3>
                    <p className={`text-xs text-muted-foreground leading-relaxed ${isAr ? "font-arabic" : ""}`}>{r.desc}</p>
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
