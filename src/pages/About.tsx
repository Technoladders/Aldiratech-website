import { Target, Award, Shield, Zap, Lightbulb, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBanner } from "@/components/site/CtaBanner";
import { PageHero } from "@/components/shared/PageHero";
import { StatCounter } from "@/components/shared/StatCounter";
import { useContent } from "@/hooks/useContent";
import { useLanguage } from "@/context/LanguageContext";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const valueIcons: Record<string, React.ElementType> = { Target, Award, Shield, Zap, Lightbulb, Users };

export default function About() {
  const c = useContent();
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const a = c.about;

  const storyRef = useScrollReveal();
  const missionRef = useScrollReveal();
  const visionRef = useScrollReveal();
  const statsRef = useStaggerReveal();
  const valuesRef = useStaggerReveal(0.05);
  const philRef = useScrollReveal();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PageHero badge={a.heroBadge} title={a.heroTitle} subtitle={a.heroSubtitle} visual="globe" />

      {/* ── Story section: full-bleed alternating strips ── */}
      <section className="py-20 lg:py-28 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-10">

          {/* Story — text left, decorative right */}
          <div ref={storyRef} className="reveal-left grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <div className={`text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-4 ${isAr ? "font-arabic normal-case" : ""}`}>{a.storyTitle}</div>
              <p className={`text-lg text-muted-foreground leading-relaxed ${isAr ? "font-arabic" : ""}`}>{a.storyBody}</p>
            </div>
            {/* Decorative "timeline" */}
            <div className="relative flex items-center justify-center">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
              {[
                { year: "2018", label: isAr ? "التأسيس" : "Founded", color: "bg-gold" },
                { year: "2020", label: isAr ? "توسع K2" : "K2 Partnership", color: "bg-primary" },
                { year: "2022", label: isAr ? "+50 مشروع" : "50+ Projects", color: "bg-gold" },
                { year: "2024", label: isAr ? "+100 مشروع" : "100+ Projects", color: "bg-primary" },
              ].map((item, i) => (
                <div key={item.year} className={`absolute flex items-center gap-4 ${i % 2 === 0 ? "right-[55%]" : "left-[55%]"}`}
                  style={{ top: `${15 + i * 22}%` }}>
                  {i % 2 !== 0 && <div className="w-3 h-px bg-gold" />}
                  <div className={`glass rounded-xl px-4 py-2.5 gold-edge animate-float-slow`} style={{ animationDelay: `${i * 0.4}s` }}>
                    <div className="font-display font-bold text-primary text-sm">{item.year}</div>
                    <div className={`text-xs text-muted-foreground ${isAr ? "font-arabic" : ""}`}>{item.label}</div>
                  </div>
                  {i % 2 === 0 && <div className="w-3 h-px bg-gold" />}
                </div>
              ))}
            </div>
          </div>

          {/* Mission + Vision side by side */}
          <div className="grid lg:grid-cols-2 gap-8 mb-24">
            <div ref={missionRef} className="reveal-up glass rounded-3xl p-10 gold-edge border-l-4 border-gold">
              <div className={`text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-3 ${isAr ? "font-arabic normal-case" : ""}`}>{a.missionTitle}</div>
              <p className={`text-lg font-display font-medium leading-relaxed ${isAr ? "font-arabic" : ""}`}>{a.missionBody}</p>
            </div>
            <div ref={visionRef} className="reveal-up glass rounded-3xl p-10 gold-edge border-l-4 border-primary">
              <div className={`text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-3 ${isAr ? "font-arabic normal-case" : ""}`}>{a.visionTitle}</div>
              <p className={`text-lg font-display font-medium leading-relaxed ${isAr ? "font-arabic" : ""}`}>{a.visionBody}</p>
            </div>
          </div>
        </div>

        {/* ── Stats ribbon — full-width dark strip ── */}
        <div className="gradient-emerald py-14">
          <div className="container mx-auto px-6 lg:px-10">
            <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {a.stats.map((s) => (
                <div key={s.label} className="reveal-scale text-center">
                  <div className="font-display font-bold text-4xl lg:text-5xl text-white mb-2">{s.value}</div>
                  <div className={`text-sm text-white/60 uppercase tracking-wider ${isAr ? "font-arabic normal-case" : ""}`}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values: masonry-ish grid ── */}
      <section className="py-20 lg:py-28 gradient-section">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <div className={`text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-3 ${isAr ? "font-arabic normal-case" : ""}`}>{a.valuesTitle}</div>
            <h2 className={`font-display font-bold text-3xl md:text-4xl ${isAr ? "font-arabic" : ""}`}>{a.valuesSubtitle}</h2>
          </div>
          <div ref={valuesRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {a.values.map((v, i) => {
              const Icon = valueIcons[v.icon] || Award;
              // Alternating heights for masonry feel
              const tall = i === 1 || i === 4;
              return (
                <div key={v.title} className={`reveal-scale glass rounded-3xl p-8 gold-edge hover:-translate-y-1 transition-all duration-700 ${tall ? "lg:mt-8" : ""}`}>
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className={`font-display font-semibold text-lg mb-3 ${isAr ? "font-arabic" : ""}`}>{v.title}</h3>
                  <p className={`text-sm text-muted-foreground leading-relaxed ${isAr ? "font-arabic" : ""}`}>{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Philosophy + Vision 2030: split with emerald panel ── */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-10">
          <div ref={philRef} className="reveal-up grid lg:grid-cols-2 gap-0 overflow-hidden rounded-3xl shadow-luxe border border-border-solid">
            <div className="p-10 lg:p-14 bg-surface/50">
              <div className={`text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-4 ${isAr ? "font-arabic normal-case" : ""}`}>{a.philosophyTitle}</div>
              <p className={`text-muted-foreground leading-relaxed ${isAr ? "font-arabic" : ""}`}>{a.philosophyBody}</p>
            </div>
            <div className="gradient-emerald p-10 lg:p-14 flex flex-col justify-between">
              <div>
                <div className={`text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-4 ${isAr ? "font-arabic normal-case" : ""}`}>{a.visionAlignTitle}</div>
                <p className={`text-white/80 leading-relaxed mb-8 ${isAr ? "font-arabic" : ""}`}>{a.visionAlignBody}</p>
              </div>
              <div className="flex items-center gap-3 glass rounded-xl p-4 bg-white/10 border-none">
                <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center shrink-0">
                  <span className="text-gold font-bold text-sm">2030</span>
                </div>
                <div>
                  <div className="font-display font-semibold text-white text-sm">Vision 2030 Aligned</div>
                  <div className="text-xs text-white/60">Saudi National Transformation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </main>
  );
}