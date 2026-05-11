import { useState } from "react";
import { MapPin, Phone, Mail, Globe, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { useContent } from "@/hooks/useContent";
import { useLanguage } from "@/context/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// Animated Riyadh skyline SVG — generated, no external asset needed
const RiyadhSkyline = () => (
  <svg viewBox="0 0 400 220" className="w-full h-full" fill="none">
    {/* Sky gradient */}
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.02" />
      </linearGradient>
      <linearGradient id="bldg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
      </linearGradient>
    </defs>
    <rect width="400" height="220" fill="url(#sky)" />
    {/* Kingdom Tower simplified */}
    <rect x="175" y="30" width="50" height="170" rx="2" fill="url(#bldg)" />
    <polygon points="200,10 210,30 190,30" fill="hsl(var(--gold))" opacity="0.8" />
    <rect x="185" y="70" width="30" height="8" rx="1" fill="hsl(var(--gold))" opacity="0.3" />
    {/* Other buildings */}
    {[[60,120,30,80],[100,90,28,110],[130,110,22,90],[280,80,32,120],[320,100,25,100],[350,130,28,70],[50,140,20,60],[370,150,15,50]].map(([x,y,w,h],i) => (
      <rect key={i} x={x} y={y} width={w} height={h} rx="1.5" fill="url(#bldg)" opacity={0.3 + (i % 3) * 0.15} />
    ))}
    {/* Ground line */}
    <rect x="0" y="195" width="400" height="2" fill="hsl(var(--border))" />
    {/* Stars */}
    {[[30,25],[60,15],[120,20],[320,18],[370,30],[280,12]].map(([cx,cy],i) => (
      <circle key={i} cx={cx} cy={cy} r="1.5" fill="hsl(var(--gold))" opacity="0.6" className="animate-pulse" style={{ animationDelay: `${i*0.3}s` }} />
    ))}
    {/* Location pin */}
    <g transform="translate(190, 160)">
      <circle cx="10" cy="10" r="14" fill="hsl(var(--gold))" opacity="0.2" className="animate-pulse" />
      <circle cx="10" cy="10" r="8" fill="hsl(var(--gold))" />
      <circle cx="10" cy="10" r="3" fill="white" />
    </g>
  </svg>
);

export default function Contact() {
  const c = useContent();
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const ct = c.contact;

  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const formRef = useScrollReveal();
  const sideRef = useScrollReveal();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PageHero badge={ct.heroBadge} title={ct.heroTitle} subtitle={ct.heroSubtitle} visual="network" />

      <section className="py-8 lg:py-14">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12">

            {/* ── Form ── */}
            <div ref={formRef} className="reveal-left lg:col-span-7">
              <div className="glass rounded-3xl p-8 lg:p-10 gold-edge">
                <div className={`font-display font-bold text-2xl mb-1 ${isAr ? "font-arabic" : ""}`}>{ct.formTitle}</div>
                <p className={`text-xs text-muted-foreground mb-8 ${isAr ? "font-arabic" : ""}`}>{ct.formSubtitle}</p>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 rounded-full gradient-emerald flex items-center justify-center mb-6 shadow-luxe animate-float-slow">
                      <CheckCircle2 className="w-8 h-8 text-gold" />
                    </div>
                    <h3 className={`font-display font-bold text-xl mb-2 ${isAr ? "font-arabic" : ""}`}>
                      {isAr ? "تم إرسال رسالتك!" : "Message Sent!"}
                    </h3>
                    <p className={`text-muted-foreground text-sm ${isAr ? "font-arabic" : ""}`}>
                      {isAr ? "سيتواصل معك أحد خبرائنا خلال يوم عمل واحد." : "One of our experts will be in touch within 1 business day."}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { key: "name", type: "text", label: ct.fields.name },
                        { key: "company", type: "text", label: ct.fields.company },
                      ].map((f) => (
                        <div key={f.key}>
                          <label className={`block text-xs font-semibold text-foreground/70 mb-2 uppercase tracking-wider ${isAr ? "font-arabic normal-case" : ""}`}>{f.label}</label>
                          <input
                            type={f.type}
                            value={form[f.key as keyof typeof form]}
                            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                            placeholder={f.label}
                            className={`w-full h-10 px-4 rounded-2xl bg-background border border-border-solid text-xs focus:outline-none focus:border-primary transition-colors ${isAr ? "font-arabic" : ""}`}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { key: "email", type: "email", label: ct.fields.email },
                        { key: "phone", type: "tel", label: ct.fields.phone },
                      ].map((f) => (
                        <div key={f.key}>
                          <label className={`block text-xs font-semibold text-foreground/70 mb-2 uppercase tracking-wider ${isAr ? "font-arabic normal-case" : ""}`}>{f.label}</label>
                          <input
                            type={f.type}
                            value={form[f.key as keyof typeof form]}
                            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                            placeholder={f.label}
                            className={`w-full h-10 px-4 rounded-2xl bg-background border border-border-solid text-xs focus:outline-none focus:border-primary transition-colors ${isAr ? "font-arabic" : ""}`}
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className={`block text-xs font-semibold text-foreground/70 mb-2 uppercase tracking-wider ${isAr ? "font-arabic normal-case" : ""}`}>{ct.fields.service}</label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className={`w-full h-10 px-4 rounded-2xl bg-background border border-border-solid text-xs focus:outline-none focus:border-primary transition-colors appearance-none ${isAr ? "font-arabic" : ""}`}
                      >
                        <option value="">{isAr ? "اختر خدمة" : "Select a service"}</option>
                        {ct.services.map((sv) => <option key={sv} value={sv}>{sv}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={`block text-xs font-semibold text-foreground/70 mb-2 uppercase tracking-wider ${isAr ? "font-arabic normal-case" : ""}`}>{ct.fields.message}</label>
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder={ct.fields.message}
                        className={`w-full px-4 py-3 rounded-2xl bg-background border border-border-solid text-xs focus:outline-none focus:border-primary transition-colors resize-none ${isAr ? "font-arabic" : ""}`}
                      />
                    </div>
                    <Button
                      variant="hero"
                      size="sm"
                      className="w-full btn-shimmer"
                      onClick={() => setSubmitted(true)}
                    >
                      {ct.fields.submit}
                      <ArrowRight className="w-4 h-4 rtl-flip" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div ref={sideRef} className="reveal-right lg:col-span-5 space-y-4">

              {/* Skyline map card */}
              <div className="glass rounded-3xl overflow-hidden gold-edge">
                <div className="h-44">
                  <RiyadhSkyline />
                </div>
                <div className="p-4">
                  <div className={`font-display font-semibold mb-3 ${isAr ? "font-arabic" : ""}`}>{ct.officeTitle}</div>
                  <ul className={`space-y-3 text-xs text-muted-foreground ${isAr ? "font-arabic" : ""}`}>
                    <li className="flex items-start gap-3"><MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />{ct.address}</li>
                    {/* <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary shrink-0" /><a href={`tel:${ct.phone}`} className="hover:text-primary transition-colors">{ct.phone}</a></li> */}
                    <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary shrink-0" /><a href={`mailto:${ct.email}`} className="hover:text-primary transition-colors">{ct.email}</a></li>
                    <li className="flex items-center gap-3"><Clock className="w-4 h-4 text-primary shrink-0" />{isAr ? "الأحد – الخميس، 9 ص – 6 م" : "Sun – Thu, 9AM – 6PM AST"}</li>
                  </ul>
                </div>
              </div>

              {/* Global presence */}
              <div className="glass rounded-3xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-gold" />
                  <div className={`font-display font-semibold text-sm ${isAr ? "font-arabic" : ""}`}>{ct.globalTitle}</div>
                </div>
                <p className={`text-xs text-muted-foreground mb-4 leading-relaxed ${isAr ? "font-arabic" : ""}`}>{ct.globalDesc}</p>
                <div className="grid grid-cols-3 gap-2">
                  {["Riyadh", "London", "Dubai"].map((city) => (
                    <div key={city} className="bg-surface rounded-xl px-3 py-2 text-center">
                      <div className="text-xs font-semibold">{city}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response promise */}
              <div className="gradient-emerald rounded-3xl p-7 text-white">
                <div className={`font-display font-bold text-base mb-2 ${isAr ? "font-arabic" : ""}`}>{ct.responseTitle}</div>
                <p className={`text-white/75 text-sm leading-relaxed ${isAr ? "font-arabic" : ""}`}>{ct.responseBody}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}