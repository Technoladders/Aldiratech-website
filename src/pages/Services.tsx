import { Link } from "react-router-dom";
import { ArrowUpRight, Compass, Layers, Settings, Activity, Users, Shield, Zap, Cloud, GraduationCap, BarChart3, Workflow, BrainCircuit, RefreshCw, Headphones, LineChart, Package, Bot, Database, Sparkles } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBanner } from "@/components/site/CtaBanner";
import { PageHero } from "@/components/shared/PageHero";
import { useContent } from "@/hooks/useContent";
import { useLanguage } from "@/context/LanguageContext";
import { useStaggerReveal, useScrollReveal } from "@/hooks/useScrollReveal";

const iconMap: Record<string, React.ElementType> = {
  Compass, Layers, Settings, Activity, Users, Shield, Zap, Cloud, GraduationCap, BarChart3, Workflow, BrainCircuit, RefreshCw, Headphones, LineChart, Package, Bot, Database, Sparkles
};

export default function Services() {
  const c = useContent();
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const s = c.services;
  const gridRef = useStaggerReveal(0.05);
  const whyRef = useStaggerReveal(0.1);
  const bannerRef = useScrollReveal();

  const mainItems = s.items.filter((item: any) => !item.parent);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PageHero badge={s.heroBadge} title={s.heroTitle} subtitle={s.heroSubtitle} visual="network" />

      {/* ── Services: large numbered list, NOT a card grid ── */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-10">
          <div className={`text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-3 ${isAr ? "font-arabic normal-case" : ""}`}>{s.eyebrow}</div>
          <h2 className={`font-display font-bold text-3xl md:text-5xl mb-3 ${isAr ? "font-arabic" : ""}`}>
            {s.titleA}
          </h2>
          <p className={`text-muted-foreground max-w-2xl mb-16 ${isAr ? "font-arabic" : ""}`}>{s.subtitle}</p>

          <div ref={gridRef} className="divide-y divide-border-solid">
            {mainItems.map((item, idx) => {
              const Icon = iconMap[item.icon] || Compass;
              return (
                <Link
                  key={item.slug}
                  to={`/services/${item.slug}`}
                  className="reveal-up group flex items-start gap-8 py-8 hover:bg-primary/3 -mx-4 px-4 rounded-2xl transition-all duration-500"
                >
                  {/* Index number */}
                  <span className="font-display text-5xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors w-16 shrink-0 leading-none mt-1">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center shrink-0 mt-1 group-hover:bg-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className={`font-display font-semibold text-xl mb-2 group-hover:text-primary transition-colors ${isAr ? "font-arabic" : ""}`}>{item.title}</h3>
                        <p className={`text-muted-foreground text-sm leading-relaxed max-w-lg ${isAr ? "font-arabic" : ""}`}>{item.desc}</p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0 mt-1 rtl-flip" />
                    </div>
                    {/* Challenge chips */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.challenges.slice(0, 2).map((ch, i) => (
                        <span key={i} className={`text-xs px-3 py-1 rounded-full bg-surface border border-border-solid text-muted-foreground ${isAr ? "font-arabic" : ""}`}>
                          {ch.length > 40 ? ch.slice(0, 38) + "…" : ch}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why our approach: horizontal 3-panel ── */}
      <section className="py-20 gradient-section">
        <div className="container mx-auto px-6 lg:px-10">
          <div ref={whyRef} className="grid lg:grid-cols-3 gap-px bg-border-solid rounded-3xl overflow-hidden">
            {[
              { title: isAr ? "منهجية مُثبتة" : "Proven Methodology", desc: isAr ? "إطار تسليم من أربع مراحل مُحكم عبر 100+ مشروع مؤسسي." : "Four-phase delivery framework refined across 100+ enterprise ServiceNow projects globally.", icon: "✦" },
              { title: isAr ? "فرق ثنائية اللغة" : "Saudi-Bilingual Teams", desc: isAr ? "كل مشروع يقوده متخصصون معتمدون يتقنون العربية والإنجليزية." : "Every engagement delivered by certified experts fluent in both English and Arabic.", icon: "◆" },
              { title: isAr ? "نتائج قابلة للقياس" : "Outcome-Led Delivery", desc: isAr ? "نقيس النجاح بنتائج أعمالك، لا بإنجازات المشروع." : "We measure success by your business results — not project milestones or billing hours.", icon: "▲" },
            ].map((p) => (
              <div key={p.title} className="reveal-scale bg-surface/80 p-10 hover:bg-primary/5 transition-colors duration-500">
                <div className="text-gold text-3xl mb-5">{p.icon}</div>
                <h3 className={`font-display font-semibold text-xl mb-3 ${isAr ? "font-arabic" : ""}`}>{p.title}</h3>
                <p className={`text-muted-foreground text-sm leading-relaxed ${isAr ? "font-arabic" : ""}`}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inline CTA strip ── */}
      <div ref={bannerRef} className="reveal-up py-16 border-y border-border-solid">
        <div className="container mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <div className={`text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-2 ${isAr ? "font-arabic normal-case" : ""}`}>
              {isAr ? "جاهز للبدء؟" : "Ready to Get Started?"}
            </div>
            <p className={`text-2xl font-display font-bold ${isAr ? "font-arabic" : ""}`}>
              {isAr ? "تحدث إلى خبير ServiceNow اليوم" : "Talk to a ServiceNow expert today"}
            </p>
          </div>
          <Link to="/contact">
            <button className="shrink-0 px-8 py-4 rounded-2xl gradient-emerald text-white font-display font-semibold hover:-translate-y-0.5 hover:shadow-luxe transition-all duration-500 whitespace-nowrap">
              {isAr ? "ابدأ المحادثة" : "Start the Conversation"} →
            </button>
          </Link>
        </div>
      </div>

      <CtaBanner />
      <Footer />
    </main>
  );
}