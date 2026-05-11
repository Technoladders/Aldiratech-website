import { Building2, Flame, HeartPulse, Landmark, Radio, ShoppingBag, Cpu, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBanner } from "@/components/site/CtaBanner";
import { PageHero } from "@/components/shared/PageHero";
import { useContent } from "@/hooks/useContent";
import { useLanguage } from "@/context/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const iconMap: Record<string, React.ElementType> = {
  Building2, Flame, HeartPulse, Landmark, Radio, ShoppingBag, Cpu,
};

// Unique accent color per industry
const accentColors = [
  "from-emerald-900 to-emerald-950",
  "from-amber-900 to-amber-950",
  "from-rose-900 to-rose-950",
  "from-blue-900 to-blue-950",
  "from-violet-900 to-violet-950",
  "from-orange-900 to-orange-950",
  "from-cyan-900 to-cyan-950",
];

function IndustryCard({ item, idx }: { item: any; idx: number }) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const Icon = iconMap[item.icon] || Building2;
  const isEven = idx % 2 === 0;
  const ref = useScrollReveal(0.1);
  const accent = accentColors[idx % accentColors.length];

  return (
    <div
      id={item.slug}
      ref={ref}
      className={`reveal-${isEven ? "left" : "right"} grid lg:grid-cols-12 overflow-hidden rounded-3xl border border-border-solid shadow-card hover:shadow-luxe transition-all duration-700`}
    >
      {/* Dark panel */}
      <div className={`lg:col-span-4 bg-gradient-to-br ${accent} p-8 flex flex-col justify-between ${!isEven ? "lg:order-2" : ""}`}>
        <div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-2">
            <Icon className="w-6 h-6 text-yellow-300" />
          </div>
          <h3 className={`font-display font-bold text-xl text-white mb-2 ${isAr ? "font-arabic" : ""}`}>{item.title}</h3>
          <p className={`text-white/65 text-xs leading-relaxed ${isAr ? "font-arabic" : ""}`}>{item.desc}</p>
        </div>
        {/* Benefits pills */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {item.benefits.map((b: string) => (
            <div key={b} className="bg-white/10 backdrop-blur rounded-xl px-3 py-2">
              <span className={`text-[10px] text-white/90 font-medium ${isAr ? "font-arabic" : ""}`}>{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content panel */}
      <div className={`lg:col-span-8 p-8 bg-surface/30 ${!isEven ? "lg:order-1" : ""}`}>
        <div className="grid sm:grid-cols-2 gap-4 h-full">
          {/* Pain points */}
          <div>
            <div className={`text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-5 ${isAr ? "font-arabic normal-case" : ""}`}>
              {isAr ? "تحديات القطاع" : "Key Challenges"}
            </div>
            <div className="space-y-2">
              {item.painPoints.map((p: string, i: number) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-destructive text-[10px] font-bold">{i + 1}</span>
                  </div>
                  <p className={`text-xs text-muted-foreground leading-relaxed ${isAr ? "font-arabic" : ""}`}>{p}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Solution + CTA */}
          <div className="flex flex-col justify-between">
            <div>
              <div className={`text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-5 ${isAr ? "font-arabic normal-case" : ""}`}>
                {isAr ? "حل ألديراتك" : "Our Solution"}
              </div>
              <p className={`text-xs text-muted-foreground leading-relaxed ${isAr ? "font-arabic" : ""}`}>{item.solutions}</p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all mt-6 group"
            >
              {isAr ? "تحدث إلى خبير القطاع" : "Talk to a Sector Expert"}
              <ArrowRight className="w-4 h-4 rtl-flip group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Industries() {
  const c = useContent();
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const ind = c.industries;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PageHero badge={ind.heroBadge} title={ind.heroTitle} subtitle={ind.heroSubtitle} visual="chart" />

      {/* Sticky industry anchor nav */}
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur border-b border-border-solid py-3">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {ind.items.map((item) => {
              const Icon = iconMap[item.icon] || Building2;
              return (
                <a
                  key={item.slug}
                  href={`#${item.slug}`}
                  className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border border-border-solid hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                >
                  <Icon className="w-3 h-3" />
                  <span className={isAr ? "font-arabic" : ""}>{item.title}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Industry panels */}
      <section className="py-8 lg:py-8">
        <div className="container mx-auto px-6 lg:px-10 space-y-10">
          {ind.items.map((item, idx) => (
            <IndustryCard key={item.slug} item={item} idx={idx} />
          ))}
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </main>
  );
}