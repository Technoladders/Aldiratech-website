import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ArrowRight, Compass, Layers, Settings, Activity, Users, Shield, Zap, Cloud, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBanner } from "@/components/site/CtaBanner";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { useContent } from "@/hooks/useContent";
import { useLanguage } from "@/context/LanguageContext";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const iconMap: Record<string, React.ElementType> = {
  Compass, Layers, Settings, Activity, Users, Shield, Zap, Cloud, GraduationCap,
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const c = useContent();
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const service = c.services.items.find((s) => s.slug === slug);
  if (!service) return <Navigate to="/services" replace />;

  const Icon = iconMap[service.icon] || Compass;
  const currentIndex = c.services.items.findIndex((s) => s.slug === slug);
  const nextService = c.services.items[(currentIndex + 1) % c.services.items.length];

  const heroRef = useScrollReveal();
  const outcomesRef = useScrollReveal();
  const sidenav = useStaggerReveal();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── Full-bleed hero strip ── */}
      <section className="relative pt-36 pb-0 lg:pt-44 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/8 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-10 relative">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
            <ArrowLeft className="w-4 h-4 rtl-flip" />
            {isAr ? "جميع الخدمات" : "All Services"}
          </Link>

          {/* ── Service header — full width ── */}
          <div ref={heroRef} className="reveal-up pb-16 border-b border-border-solid">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-3xl gradient-emerald flex items-center justify-center shadow-luxe shrink-0">
                <Icon className="w-10 h-10 text-gold" />
              </div>
              <div>
                <div className={`text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-1 ${isAr ? "font-arabic normal-case" : ""}`}>
                  {isAr ? "الخدمة" : "Service"}
                </div>
                <h1 className={`font-display font-bold text-4xl md:text-5xl tracking-tight ${isAr ? "font-arabic leading-[1.25]" : ""}`}>
                  {service.title}
                </h1>
              </div>
            </div>
            <p className={`text-xl text-muted-foreground leading-relaxed max-w-3xl ${isAr ? "font-arabic" : ""}`}>
              {service.overview}
            </p>
          </div>
        </div>
      </section>

      {/* ── Magazine 2-col layout: content left, sticky sidebar right ── */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12">

            {/* Left: challenge + outcomes */}
            <div className="lg:col-span-8 space-y-16">

              {/* Challenge block — dark panel */}
              <div className="gradient-emerald rounded-3xl p-10 text-white">
                <div className="text-gold text-xs uppercase tracking-[0.25em] font-semibold mb-4">
                  {isAr ? "التحدي الأساسي" : "Core Challenge"}
                </div>
                <p className={`text-white/85 text-lg leading-relaxed mb-8 ${isAr ? "font-arabic" : ""}`}>{service.challenge}</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {service.challenges.map((ch, i) => (
                    <div key={i} className="bg-white/10 rounded-2xl p-4">
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                        <span className="text-gold font-bold text-sm">{i + 1}</span>
                      </div>
                      <p className={`text-white/80 text-sm leading-relaxed ${isAr ? "font-arabic" : ""}`}>{ch}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcomes */}
              <div ref={outcomesRef} className="reveal-right">
                <div className={`text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-3 ${isAr ? "font-arabic normal-case" : ""}`}>
                  {isAr ? "النتائج التي نحققها" : "Outcomes We Deliver"}
                </div>
                <h2 className={`font-display font-bold text-3xl mb-8 ${isAr ? "font-arabic" : ""}`}>
                  {isAr ? "نتائج قابلة للقياس" : "Measurable Business Results"}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.outcomes.map((o, i) => (
                    <div key={i} className="glass rounded-2xl p-5 flex gap-3 gold-edge hover:-translate-y-0.5 transition-all duration-300">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <p className={`text-sm text-muted-foreground leading-relaxed ${isAr ? "font-arabic" : ""}`}>{o}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div>
                <div className={`text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-4 ${isAr ? "font-arabic normal-case" : ""}`}>
                  {isAr ? "منهجيتنا" : "Our Approach"}
                </div>
                <ProcessSteps steps={service.process} title={isAr ? "كيف نعمل" : "How We Deliver"} />
              </div>

              {/* Next service */}
              <div className="pt-8 border-t border-border-solid">
                <div className={`text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-4 ${isAr ? "font-arabic normal-case" : ""}`}>
                  {isAr ? "الخدمة التالية" : "Next Service"}
                </div>
                <Link
                  to={`/services/${nextService.slug}`}
                  className="flex items-center justify-between glass rounded-2xl px-6 py-5 hover:shadow-luxe hover:-translate-y-0.5 transition-all duration-500 group"
                >
                  <div>
                    <div className={`font-display font-semibold text-lg group-hover:text-primary transition-colors ${isAr ? "font-arabic" : ""}`}>{nextService.title}</div>
                    <div className={`text-xs text-muted-foreground mt-1 ${isAr ? "font-arabic" : ""}`}>{nextService.desc}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform rtl-flip" />
                </Link>
              </div>
            </div>

            {/* Right: sticky sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-5">
                {/* CTA box */}
                <div className="glass-strong rounded-3xl p-8 gold-edge">
                  <div className={`text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3 ${isAr ? "font-arabic normal-case" : ""}`}>
                    {isAr ? "ابدأ اليوم" : "Get Started"}
                  </div>
                  <p className={`text-sm text-muted-foreground mb-5 leading-relaxed ${isAr ? "font-arabic" : ""}`}>
                    {isAr ? "تحدث مع خبير معتمد في ServiceNow حول احتياجاتك." : "Talk to a certified ServiceNow expert about your specific needs."}
                  </p>
                  <Link to="/contact">
                    <Button variant="hero" className="w-full btn-shimmer">
                      {isAr ? "تحدث إلى خبير" : "Talk to an Expert"}
                      <ArrowRight className="w-4 h-4 rtl-flip" />
                    </Button>
                  </Link>
                </div>

                {/* All services list */}
                <div ref={sidenav} className="glass rounded-3xl p-6">
                  <div className={`text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-4 ${isAr ? "font-arabic normal-case" : ""}`}>
                    {isAr ? "خدماتنا" : "Our Services"}
                  </div>
                  <div className="space-y-1">
                    {c.services.items.map((srv) => {
                      const SIcon = iconMap[srv.icon] || Compass;
                      const active = srv.slug === slug;
                      return (
                        <Link
                          key={srv.slug}
                          to={`/services/${srv.slug}`}
                          className={`reveal-up flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                            active ? "bg-primary text-primary-foreground" : "hover:bg-primary/5 text-foreground/80 hover:text-primary"
                          }`}
                        >
                          <SIcon className="w-4 h-4 shrink-0" />
                          <span className={`text-xs font-medium ${isAr ? "font-arabic" : ""}`}>{srv.title}</span>
                        </Link>
                      );
                    })}
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