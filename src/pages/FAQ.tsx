import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBanner } from "@/components/site/CtaBanner";
import { PageHero } from "@/components/shared/PageHero";
import { useContent } from "@/hooks/useContent";
import { useLanguage } from "@/context/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function FAQ() {
  const c = useContent();
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const faq = c.faq;

  const [openCat, setOpenCat] = useState(0);
  const [openQ, setOpenQ] = useState<string | null>(null);
  const catRef = useScrollReveal();
  const listRef = useScrollReveal();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PageHero badge={faq.heroBadge} title={faq.heroTitle} subtitle={faq.heroSubtitle} visual="faq" />

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-10">

          {/* Category tabs — pill row, not sidebar */}
          <div ref={catRef} className="reveal-up flex flex-wrap gap-2 mb-12">
            {faq.categories.map((cat, i) => (
              <button
                key={cat.title}
                onClick={() => { setOpenCat(i); setOpenQ(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  openCat === i
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "glass border border-border-solid text-foreground/70 hover:text-primary hover:border-primary"
                } ${isAr ? "font-arabic" : ""}`}
              >
                {cat.title}
                <span className={`text-xs px-2 py-0.5 rounded-full ${openCat === i ? "bg-white/20" : "bg-surface"}`}>
                  {cat.items.length}
                </span>
              </button>
            ))}
          </div>

          {/* Two-column FAQ layout */}
          <div className="grid lg:grid-cols-12 gap-12">

            {/* Questions */}
            <div ref={listRef} className="reveal-up lg:col-span-8">
              <h2 className={`font-display font-bold text-2xl mb-8 ${isAr ? "font-arabic" : ""}`}>
                {faq.categories[openCat]?.title}
              </h2>
              <div className="space-y-3">
                {faq.categories[openCat]?.items.map((item, qIdx) => {
                  const key = `${openCat}-${qIdx}`;
                  const isOpen = openQ === key;
                  return (
                    <div
                      key={qIdx}
                      className={`glass rounded-2xl overflow-hidden transition-all duration-500 ${isOpen ? "gold-edge shadow-card" : "hover:border-primary/20 hover:shadow-soft border border-transparent"}`}
                    >
                      <button
                        onClick={() => setOpenQ(isOpen ? null : key)}
                        className={`w-full flex items-center justify-between gap-4 px-6 py-5 ${isAr ? "text-right" : "text-left"}`}
                      >
                        <span className={`font-display font-semibold text-base leading-snug ${isAr ? "font-arabic" : ""}`}>{item.q}</span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? "bg-primary rotate-180" : "bg-primary/10"}`}>
                          {isOpen
                            ? <Minus className="w-3.5 h-3.5 text-primary-foreground" />
                            : <Plus className="w-3.5 h-3.5 text-primary" />
                          }
                        </div>
                      </button>
                      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? "max-h-96" : "max-h-0"}`}>
                        <div className="px-6 pb-6">
                          <div className="h-px w-full bg-gradient-to-r from-gold/40 to-transparent mb-4" />
                          <p className={`text-muted-foreground leading-relaxed ${isAr ? "font-arabic" : ""}`}>{item.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sidebar: still have a question? */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-5">
                <div className="gradient-emerald rounded-3xl p-8 text-white">
                  <div className={`font-display font-bold text-xl mb-3 ${isAr ? "font-arabic" : ""}`}>
                    {isAr ? "لم تجد إجابتك؟" : "Still have questions?"}
                  </div>
                  <p className={`text-white/70 text-sm leading-relaxed mb-6 ${isAr ? "font-arabic" : ""}`}>
                    {isAr ? "فريقنا من الخبراء جاهز للإجابة على استفساراتك." : "Our team of ServiceNow experts is ready to answer your specific questions."}
                  </p>
                  <a href="/contact" className="inline-flex items-center gap-2 bg-gold text-foreground font-display font-semibold text-sm px-5 py-2.5 rounded-full hover:-translate-y-0.5 hover:shadow-luxe transition-all duration-300">
                    {isAr ? "تحدث إلى خبير" : "Talk to an Expert"} →
                  </a>
                </div>

                {/* Category mini-nav */}
                <div className="glass rounded-3xl p-6">
                  <div className={`text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-4 ${isAr ? "font-arabic normal-case" : ""}`}>
                    {isAr ? "الفئات" : "Categories"}
                  </div>
                  <div className="space-y-1">
                    {faq.categories.map((cat, i) => (
                      <button
                        key={cat.title}
                        onClick={() => { setOpenCat(i); setOpenQ(null); }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all ${isAr ? "text-right font-arabic" : "text-left"} ${openCat === i ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-primary"}`}
                      >
                        {cat.title}
                        <span className="text-xs opacity-60">{cat.items.length}</span>
                      </button>
                    ))}
                  </div>
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