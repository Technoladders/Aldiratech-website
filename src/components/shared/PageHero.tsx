import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useRef } from "react";

interface PageHeroProps {
  badge: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  /** visual = decorative SVG illustration variant */
  visual?: "compass" | "chart" | "globe" | "network" | "shield" | "faq";
}

// SVG illustrations — all inline, no external deps
const Illustrations = {
  compass: () => (
    <svg viewBox="0 0 320 280" className="w-full h-full opacity-80" fill="none">
      <circle cx="160" cy="140" r="110" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="6 4" className="animate-spin-slow" />
      <circle cx="160" cy="140" r="80" stroke="hsl(var(--gold))" strokeWidth="1" opacity="0.4" />
      <circle cx="160" cy="140" r="50" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.3" />
      <circle cx="160" cy="140" r="8" fill="hsl(var(--primary))" />
      <path d="M160 60 L168 132 L160 140 L152 132 Z" fill="hsl(var(--primary))" />
      <path d="M160 220 L152 148 L160 140 L168 148 Z" fill="hsl(var(--muted-foreground))" opacity="0.5" />
      <path d="M80 140 L132 132 L140 140 L132 148 Z" fill="hsl(var(--gold))" />
      <path d="M240 140 L188 148 L180 140 L188 132 Z" fill="hsl(var(--muted-foreground))" opacity="0.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const r = 110;
        const rad = (angle * Math.PI) / 180;
        return <circle key={i} cx={160 + r * Math.sin(rad)} cy={140 - r * Math.cos(rad)} r="3" fill="hsl(var(--gold))" opacity={i % 2 === 0 ? 0.8 : 0.3} />;
      })}
    </svg>
  ),
  chart: () => (
    <svg viewBox="0 0 320 280" className="w-full h-full" fill="none">
      <rect x="30" y="200" width="40" height="60" rx="4" fill="hsl(var(--primary))" opacity="0.15" />
      <rect x="90" y="150" width="40" height="110" rx="4" fill="hsl(var(--primary))" opacity="0.25" />
      <rect x="150" y="100" width="40" height="160" rx="4" fill="hsl(var(--primary))" opacity="0.4" />
      <rect x="210" y="70" width="40" height="190" rx="4" fill="hsl(var(--primary))" />
      <rect x="270" y="40" width="40" height="220" rx="4" fill="hsl(var(--gold))" opacity="0.8" />
      <polyline points="50,200 110,150 170,100 230,70 290,40" stroke="hsl(var(--gold))" strokeWidth="2" strokeDasharray="6 3" />
      {[50, 110, 170, 230, 290].map((x, i) => {
        const ys = [200, 150, 100, 70, 40];
        return <circle key={i} cx={x} cy={ys[i]} r="5" fill="hsl(var(--gold))" />;
      })}
      <line x1="20" y1="260" x2="320" y2="260" stroke="hsl(var(--border))" strokeWidth="1" />
      <line x1="20" y1="20" x2="20" y2="260" stroke="hsl(var(--border))" strokeWidth="1" />
    </svg>
  ),
  globe: () => (
    <svg viewBox="0 0 320 280" className="w-full h-full" fill="none">
      <ellipse cx="160" cy="140" rx="110" ry="110" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
      <ellipse cx="160" cy="140" rx="60" ry="110" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.2" />
      <ellipse cx="160" cy="140" rx="110" ry="40" stroke="hsl(var(--gold))" strokeWidth="1" opacity="0.25" />
      <ellipse cx="160" cy="110" rx="110" ry="20" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.15" />
      <ellipse cx="160" cy="170" rx="110" ry="20" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.15" />
      <line x1="160" y1="30" x2="160" y2="250" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.2" />
      {[
        [105, 100], [200, 80], [130, 155], [210, 160], [85, 170],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="4" fill="hsl(var(--gold))" opacity="0.9" />
          <circle cx={cx} cy={cy} r="10" stroke="hsl(var(--gold))" strokeWidth="1" opacity="0.3" />
        </g>
      ))}
      {[[105,100],[200,80],[130,155],[210,160]].map(([x1,y1], i, arr) => {
        const [x2, y2] = arr[(i + 1) % arr.length];
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(var(--gold))" strokeWidth="0.5" strokeDasharray="4 2" opacity="0.4" />;
      })}
    </svg>
  ),
  network: () => (
    <svg viewBox="0 0 320 280" className="w-full h-full" fill="none">
      {/* Central hub */}
      <circle cx="160" cy="140" r="20" fill="hsl(var(--primary))" opacity="0.9" />
      <circle cx="160" cy="140" r="35" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
      {/* Nodes */}
      {[
        [80, 70], [240, 70], [60, 180], [260, 170], [160, 230], [130, 55], [210, 200],
      ].map(([nx, ny], i) => (
        <g key={i}>
          <line x1="160" y1="140" x2={nx} y2={ny} stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.2" strokeDasharray="3 3" />
          <circle cx={nx} cy={ny} r={i % 3 === 0 ? 12 : 8} fill="hsl(var(--primary))" opacity={0.15 + i * 0.08} />
          <circle cx={nx} cy={ny} r={i % 3 === 0 ? 12 : 8} stroke="hsl(var(--gold))" strokeWidth="1" opacity="0.6" />
        </g>
      ))}
      {/* Center glow */}
      <circle cx="160" cy="140" r="8" fill="hsl(var(--gold))" />
    </svg>
  ),
  shield: () => (
    <svg viewBox="0 0 320 280" className="w-full h-full" fill="none">
      <path d="M160 30 L260 70 L260 150 C260 200 220 240 160 260 C100 240 60 200 60 150 L60 70 Z" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.3" fill="hsl(var(--primary))" fillOpacity="0.04" />
      <path d="M160 55 L240 87 L240 150 C240 192 208 224 160 240 C112 224 80 192 80 150 L80 87 Z" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.2" fill="hsl(var(--primary))" fillOpacity="0.04" />
      <path d="M160 80 L220 104 L220 150 C220 184 196 208 160 220 C124 208 100 184 100 150 L100 104 Z" fill="hsl(var(--primary))" opacity="0.08" stroke="hsl(var(--gold))" strokeWidth="1" />
      <path d="M135 145 L155 165 L190 125" stroke="hsl(var(--gold))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const r = 115;
        const rad = (angle * Math.PI) / 180;
        return <circle key={i} cx={160 + r * Math.sin(rad)} cy={140 - r * Math.cos(rad)} r="2.5" fill="hsl(var(--gold))" opacity="0.5" />;
      })}
    </svg>
  ),
  faq: () => (
    <svg viewBox="0 0 320 280" className="w-full h-full" fill="none">
      {/* Chat bubbles */}
      <rect x="40" y="40" width="180" height="70" rx="16" fill="hsl(var(--primary))" opacity="0.1" stroke="hsl(var(--primary))" strokeWidth="1" />
      <path d="M60 110 L50 125 L80 110" fill="hsl(var(--primary))" opacity="0.1" stroke="hsl(var(--primary))" strokeWidth="1" />
      <rect x="100" y="140" width="180" height="70" rx="16" fill="hsl(var(--gold))" opacity="0.1" stroke="hsl(var(--gold))" strokeWidth="1" />
      <path d="M260 210 L270 225 L240 210" fill="hsl(var(--gold))" opacity="0.1" stroke="hsl(var(--gold))" strokeWidth="1" />
      {/* Question mark */}
      <text x="130" y="85" fontSize="32" fontWeight="bold" fill="hsl(var(--primary))" opacity="0.5" fontFamily="serif">?</text>
      {/* Dots */}
      <circle cx="200" cy="177" r="5" fill="hsl(var(--gold))" opacity="0.7" />
      <circle cx="218" cy="177" r="5" fill="hsl(var(--gold))" opacity="0.4" />
      <circle cx="236" cy="177" r="5" fill="hsl(var(--gold))" opacity="0.2" />
    </svg>
  ),
};

export const PageHero = ({ badge, title, subtitle, children, visual = "compass" }: PageHeroProps) => {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    requestAnimationFrame(() => el.setAttribute("data-revealed", "true"));
  }, []);

  const Illustration = Illustrations[visual];

  return (
    <section className="relative pt-24 pb-8 lg:pt-24 lg:pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-gold/5" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/8 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-gold/8 blur-3xl pointer-events-none" />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-6 lg:px-10 relative">
        <div className="grid lg:grid-cols-12 items-center gap-8">
          <div
            ref={ref}
            className="lg:col-span-7 reveal-up"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-6 ${isAr ? "font-arabic normal-case tracking-normal text-sm" : ""}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              {badge}
            </div>
            <h1 className={`font-display font-bold text-xl md:text-2xl lg:text-3xl tracking-tight leading-[1.1] mb-6 ${isAr ? "font-arabic leading-[1.25]" : ""}`}>
              {title}
            </h1>
            {subtitle && (
              <p className={`text-md md:text-md text-muted-foreground max-w-2xl leading-relaxed ${isAr ? "font-arabic" : ""}`}>
                {subtitle}
              </p>
            )}
            {children}
          </div>

          {/* SVG illustration */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
            <div className="w-72 h-64 animate-float-slow">
              <Illustration />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};