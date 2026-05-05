import { Award, Rocket, Globe, Settings, Brain, Shield, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBanner } from "@/components/site/CtaBanner";
import { PageHero } from "@/components/shared/PageHero";
import { StatCounter } from "@/components/shared/StatCounter";
import { useContent } from "@/hooks/useContent";
import { useLanguage } from "@/context/LanguageContext";
import { useStaggerReveal, useScrollReveal } from "@/hooks/useScrollReveal";

const iconMap: Record<string, React.ElementType> = { Award, Rocket, Globe, Settings, Brain, Shield };

// Bento cell sizes: large / medium / small
const bentoSizes = [
  "sm:col-span-2 lg:col-span-2 row-span-2",  // 0: featured big
  "sm:col-span-1 lg:col-span-1",              // 1
  "sm:col-span-1 lg:col-span-1",              // 2
  "sm:col-span-1 lg:col-span-1",              // 3
  "sm:col-span-1 lg:col-span-1 row-span-2",  // 4: tall
  "sm:col-span-1 lg:col-span-2",              // 5: wide
];

export default function Solutions() {
  const c = useContent();
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const s = c.solutions;
  const bentoRef = useStaggerReveal(0.05);
  const statsRef = useStaggerReveal(0.1);
  const ctaRef = useScrollReveal();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PageHero badge={s.heroBadge} title={s.heroTitle} subtitle={s.heroSubtitle} visual="shield" />

      {/* ── Bento grid ── */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-10">
          <div className={`text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-3 ${isAr ? "font-arabic normal-case" : ""}`}>{s.eyebrow}</div>
          <h2 className={`font-display font-bold text-3xl md:text-4xl mb-3 ${isAr ? "font-arabic" : ""}`}>{s.titleA}</h2>
          <p className={`text-muted-foreground max-w-2xl mb-16 ${isAr ? "font-arabic" : ""}`}>{s.subtitle}</p>

          <div ref={bentoRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[240px]">
            {s.items.map((sol, idx) => {
              const Icon = iconMap[sol.icon] || Award;
              const isFeatured = idx === 0;
              const isDark = idx === 4;

              return (
                <div
                  key={sol.title}
                  className={`reveal-scale ${bentoSizes[idx] || ""} rounded-3xl overflow-hidden relative group cursor-pointer
                    ${isFeatured ? "gradient-emerald text-white" : isDark ? "bg-surface/80 border-2 border-gold/30" : "glass gold-edge"}
                    hover:-translate-y-1 hover:shadow-luxe transition-all duration-700`}
                >
                  <div className="p-7 h-full flex flex-col justify-between">
                    <div>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${isFeatured ? "bg-white/15" : "bg-primary/10 group-hover:bg-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"}`}>
                        <Icon className={`w-6 h-6 ${isFeatured ? "text-gold" : "text-primary group-hover:text-primary-foreground transition-colors"}`} />
                      </div>
                      <h3 className={`font-display font-bold text-lg mb-3 ${isFeatured ? "text-white" : ""} ${isAr ? "font-arabic" : ""}`}>{sol.title}</h3>
                      {isFeatured && (
                        <p className={`text-white/75 text-sm leading-relaxed ${isAr ? "font-arabic" : ""}`}>{sol.desc}</p>
                      )}
                    </div>

                    {/* Features list — shown on featured or on hover for others */}
                    <div className={isFeatured ? "block mt-5" : "hidden group-hover:block"}>
                      <div className="space-y-1.5">
                        {sol.features.slice(0, isFeatured ? 5 : 3).map((f) => (
                          <div key={f} className="flex items-center gap-2">
                            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isFeatured ? "text-gold" : "text-primary"}`} />
                            <span className={`text-xs ${isFeatured ? "text-white/80" : "text-muted-foreground"} ${isAr ? "font-arabic" : ""}`}>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Non-featured: show desc normally */}
                    {!isFeatured && (
                      <p className={`text-muted-foreground text-sm leading-relaxed group-hover:hidden ${isAr ? "font-arabic" : ""}`}>{sol.desc}</p>
                    )}
                  </div>

                  {/* Hover overlay arrow */}
                  {!isFeatured && (
                    <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <ArrowRight className="w-3.5 h-3.5 text-primary rtl-flip" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stats row ── */}
      <section className="py-20 gradient-section">
        <div className="container mx-auto px-6 lg:px-10">
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "100+", label: isAr ? "مشروع مُنجز" : "Projects Delivered" },
              { value: "8", label: isAr ? "قطاعات" : "Industries Served" },
              { value: "24/7", label: isAr ? "دعم" : "Support" },
              { value: "2030", label: isAr ? "متوافق" : "Vision Aligned" },
            ].map((stat) => (
              <div key={stat.label} className="reveal-scale glass rounded-2xl p-6 text-center gold-edge">
                <StatCounter value={stat.value} label={stat.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision 2030 strip ── */}
      <section ref={ctaRef} className="reveal-up py-20">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className={`text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-4 ${isAr ? "font-arabic normal-case" : ""}`}>
                {isAr ? "رؤية 2030" : "Vision 2030 Aligned"}
              </div>
              <h2 className={`font-display font-bold text-3xl md:text-4xl mb-6 ${isAr ? "font-arabic" : ""}`}>
                {isAr ? "حلول مصممة للتحول الوطني" : "Solutions Built for National Transformation"}
              </h2>
              <p className={`text-muted-foreground leading-relaxed mb-8 ${isAr ? "font-arabic" : ""}`}>
                {isAr
                  ? "كل حل نقدمه مبني مع الأهداف الوطنية لرؤية 2030 في الاعتبار."
                  : "Every solution we offer is built with Saudi Arabia's Vision 2030 national objectives in mind — supporting government digitization, private sector modernization, and knowledge economy development."}
              </p>
              <Link to="/contact">
                <Button variant="hero" size="lg">
                  {isAr ? "ناقش متطلباتك" : "Discuss Your Requirements"}
                  <ArrowRight className="w-4 h-4 rtl-flip" />
                </Button>
              </Link>
            </div>
            {/* Decorative: stacked cards */}
            <div className="relative h-72">
              {["Government", "Enterprise", "Vision 2030"].map((label, i) => (
                <div
                  key={label}
                  className="absolute glass-strong rounded-2xl gold-edge px-6 py-4 shadow-luxe"
                  style={{
                    top: `${i * 28}px`,
                    left: `${i * 20}px`,
                    right: `${(2 - i) * 20}px`,
                    zIndex: i,
                    transform: `rotate(${(i - 1) * 1.5}deg)`,
                    opacity: 0.5 + i * 0.25,
                  }}
                >
                  <div className="font-display font-semibold text-sm">{label}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {["Citizen service modernization", "Platform transformation", "Digital economy enablement"][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </main>
  );
}