import { Shield, Users, Target, Zap, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/hooks/useContent";

const featureIcons = [Shield, Users, Target, Zap];

export const AiSection = () => {
  const { lang } = useLanguage();
  const c = useContent();
  const isAr = lang === "ar";
  const s = c.aiSection;

  return (
    <section className="py-8 lg:py-10 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/3 via-transparent to-gold/5" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-emerald-500/4 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gold/3 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-10 relative">
        {/* Section heading */}
        <div className="text-center mb-4 reveal-up">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold uppercase tracking-[0.15em] mb-4 ${isAr ? "font-arabic normal-case tracking-normal" : ""}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            {s.whatSetsApart.eyebrow}
          </div>
          <h2 className={`font-display font-bold text-xl md:text-2xl lg:text-4xl tracking-tight mb-3 ${isAr ? "font-arabic leading-tight" : ""}`}>
            {s.whatSetsApart.title}
          </h2>
          <div className="divider-gold w-16 mx-auto" />
        </div>

        {/* Main content: Left = Illustration with feature cards, Right = About */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          
          {/* Left — Animated SVG illustration with floating feature cards */}
          <div className="relative flex items-center justify-center min-h-[420px] reveal-up">
            {/* Central SVG illustration */}
            <svg viewBox="0 0 400 420" className="w-full max-w-[380px] h-auto" fill="none">
              <defs>
                <filter id="glowGreen">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glowGold">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="gradGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0B5D3B" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
              
              {/* Concentric circles */}
              <circle cx="200" cy="210" r="155" stroke="#10b981" strokeWidth="0.6" strokeDasharray="5 7" opacity="0.2" className="animate-spin-slow" />
              <circle cx="200" cy="210" r="120" stroke="#D4AF63" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.18" className="animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
              <circle cx="200" cy="210" r="85" stroke="#10b981" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.15" className="animate-spin-slow" style={{ animationDuration: '22s' }} />
              <circle cx="200" cy="210" r="50" fill="#0B5D3B" opacity="0.06" />
              
              {/* Central hub */}
              <circle cx="200" cy="210" r="18" fill="url(#gradGreen)" opacity="0.15" filter="url(#glowGreen)" />
              <circle cx="200" cy="210" r="8" fill="#10b981" opacity="0.8" filter="url(#glowGreen)" />
              <circle cx="200" cy="210" r="4" fill="#D4AF63" />
              
              {/* Orbit nodes */}
              <circle cx="310" cy="130" r="6" fill="#10b981" opacity="0.7" className="animate-pulse" />
              <circle cx="310" cy="130" r="14" stroke="#10b981" strokeWidth="1" opacity="0.25" fill="none" className="animate-ping" style={{ animationDuration: '3s' }} />
              
              <circle cx="320" cy="290" r="5" fill="#D4AF63" opacity="0.7" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
              <circle cx="320" cy="290" r="12" stroke="#D4AF63" strokeWidth="1" opacity="0.25" fill="none" className="animate-ping" style={{ animationDuration: '3.5s', animationDelay: '0.8s' }} />
              
              <circle cx="80" cy="300" r="6" fill="#10b981" opacity="0.6" className="animate-pulse" style={{ animationDelay: '1.6s' }} />
              <circle cx="80" cy="300" r="14" stroke="#10b981" strokeWidth="1" opacity="0.2" fill="none" />
              
              <circle cx="90" cy="120" r="5" fill="#D4AF63" opacity="0.6" className="animate-pulse" style={{ animationDelay: '2.4s' }} />
              
              {/* Connecting lines */}
              <line x1="200" y1="210" x2="310" y2="130" stroke="#10b981" strokeWidth="0.8" opacity="0.15" />
              <line x1="200" y1="210" x2="320" y2="290" stroke="#D4AF63" strokeWidth="0.8" opacity="0.15" />
              <line x1="200" y1="210" x2="80" y2="300" stroke="#10b981" strokeWidth="0.8" opacity="0.12" />
              <line x1="200" y1="210" x2="90" y2="120" stroke="#D4AF63" strokeWidth="0.8" opacity="0.12" />
              
              {/* Small decorative dots */}
              <circle cx="260" cy="170" r="2.5" fill="#10b981" opacity="0.4" />
              <circle cx="260" cy="260" r="2" fill="#D4AF63" opacity="0.35" />
              <circle cx="140" cy="260" r="2.5" fill="#10b981" opacity="0.3" />
              <circle cx="155" cy="160" r="2" fill="#D4AF63" opacity="0.3" />
            </svg>

            {/* Floating feature cards around the illustration */}
            <div className="absolute top-0 left-0 glass rounded-xl p-3 border border-emerald-500/10 shadow-soft animate-float-slow max-w-[180px]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className={`text-[11px] font-semibold text-foreground leading-tight ${isAr ? "font-arabic" : ""}`}>
                  {s.whatSetsApart.items[0].title}
                </span>
              </div>
            </div>

            <div className="absolute top-6 right-0 glass rounded-xl p-3 border border-emerald-500/10 shadow-soft animate-float-slow max-w-[170px]" style={{ animationDelay: '1.2s' }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className={`text-[11px] font-semibold text-foreground leading-tight ${isAr ? "font-arabic" : ""}`}>
                  {s.whatSetsApart.items[1].title}
                </span>
              </div>
            </div>

            <div className="absolute bottom-8 right-0 glass rounded-xl p-3 border border-emerald-500/10 shadow-soft animate-float-slow max-w-[170px]" style={{ animationDelay: '2.4s' }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Target className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className={`text-[11px] font-semibold text-foreground leading-tight ${isAr ? "font-arabic" : ""}`}>
                  {s.whatSetsApart.items[2].title}
                </span>
              </div>
            </div>

            <div className="absolute bottom-4 left-0 glass rounded-xl p-3 border border-emerald-500/10 shadow-soft animate-float-slow max-w-[180px]" style={{ animationDelay: '3.2s' }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className={`text-[11px] font-semibold text-foreground leading-tight ${isAr ? "font-arabic" : ""}`}>
                  {s.whatSetsApart.items[3].title}
                </span>
              </div>
            </div>
          </div>

          {/* Right — About Aldiratech */}
          <div className="reveal-up">
            <div className="glass rounded-3xl p-8 lg:p-8 border border-emerald-500/10 gold-edge relative overflow-hidden">
              {/* Inner glow */}
              <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-emerald-500/6 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-gold/4 blur-3xl pointer-events-none" />

              <div className="relative">
                <div className={`text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3 ${isAr ? "font-arabic normal-case tracking-normal" : ""}`}>
                  {isAr ? "عن" : "About"}
                </div>
                <h3 className={`font-display font-bold text-xl lg:text-2xl mb-3 ${isAr ? "font-arabic" : ""}`}>
                  {s.about.title}
                </h3>
                <p className={`text-base text-md font-medium text-emerald-600 dark:text-emerald-400 mb-4 ${isAr ? "font-arabic" : ""}`}>
                  {s.about.subtitle}
                </p>
                <p className={`text-xs text-muted-foreground leading-relaxed mb-4 ${isAr ? "font-arabic" : ""}`}>
                  {s.about.body}
                </p>
                <p className={`text-xs text-muted-foreground/70 mb-6 ${isAr ? "font-arabic" : ""}`}>
                  {s.about.founded}
                </p>

                {/* Platform badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Salesforce", "SAP", "ServiceNow", "MuleSoft", "AI/ML"].map((platform) => (
                    <span
                      key={platform}
                      className="text-[10px] px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-medium border border-emerald-500/20"
                    >
                      {platform}
                    </span>
                  ))}
                </div>

                <Link to="/services/ai-automation">
                  <Button variant="hero" size="sm" className="btn-shimmer">
                    {s.cta}
                    <ArrowRight className="w-4 h-4 rtl-flip" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};