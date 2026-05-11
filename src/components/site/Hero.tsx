import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock, Languages, Sparkles, } from "lucide-react";
import heroImg from "@/assets/hero-riyadh.jpg";
import heroLogo from "@/assets/Hero_img.png";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/hooks/useContent";

const featureIcons = [MapPin, Clock, Languages];

export const Hero = () => {
  const { lang } = useLanguage();
  const c = useContent();
  const isAr = lang === "ar";
  const t = c.hero; // Use content from JSON instead of locales

  return (
<section
  id="home"
  className="relative pt-32 lg:pt-40 pb-24 overflow-hidden"
>
  {/* Background image — fades out on left */}
  <div className="absolute inset-0">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url(${heroLogo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'right center',
        backgroundAttachment: 'fixed',
        maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 35%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,1) 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 35%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,1) 100%)',
      }}
    />
    {/* Overlay gradient for text protection */}
    <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-background/15 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/40" />
  </div>
  
  {/* Glow blobs */}
  <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
  <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left content */}
          <div className="lg:col-span-7 space-y-8 animate-fade-up">

            <Badge
              variant="outline"
              className="px-4 py-2 rounded-full border-primary/20 bg-primary/5 text-primary font-bold gap-2 uppercase"
            >
              <MapPin className="w-3.5 h-3.5 text-gold" />
              {t.badge}
            </Badge>

            <h1 className={`font-display font-bold text-2xl md:text-3xl lg:text-5xl leading-[1.05] tracking-tight ${isAr ? "font-arabic leading-[1.2]" : ""}`}>
              {t.titleA}
              <br />
              <span className="relative inline-block">
                {t.titleB} <span className="text-primary">{t.titleHighlight}</span>.
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-gold to-transparent rounded-full" />
              </span>
            </h1>

            <p className={`text-md md:text-md text-muted-foreground max-w-2xl leading-relaxed ${isAr ? "font-arabic" : ""}`}>
              {t.subtitle}
            </p>

            {/* Feature cards */}
            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              {t.features.map((f, i) => {
                const Icon = featureIcons[i];
                return (
                  <div
                    key={f.title}
                    className="glass rounded-2xl p-5 gold-edge hover:-translate-y-1 transition-all duration-700"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className={`font-display font-semibold text-sm mb-1 ${isAr ? "font-arabic" : ""}`}>{f.title}</div>
                    <p className={`text-xs text-muted-foreground leading-relaxed ${isAr ? "font-arabic" : ""}`}>{f.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="hero" size="sm" className="btn-shimmer">
                {t.ctaPrimary}
                <ArrowRight className="w-4 h-4 rtl-flip" />
              </Button>
              <Button variant="heroGold" size="sm">
                {t.ctaSecondary}
              </Button>
            </div>
          </div>

          {/* Right — ServiceNow dashboard visual */}
{/* Right — ServiceNow dashboard visual */}
{/* Right — ServiceNow dashboard visual */}
<div className="lg:col-span-5 relative hidden lg:block">
  <div className="relative rounded-3xl overflow-hidden shadow-luxe border border-border-solid animate-float-slow">
    <div className="w-full h-[540px] bg-card dark:bg-card-glass flex flex-col">
      {/* Top nav bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border-solid/40">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-bold text-[10px]">SN</span>
          </div>
          <span className="text-xs font-semibold text-foreground">servicenow.</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-muted-foreground">Welcome back, Admin</span>
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-[10px] font-bold text-primary">A</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex p-4 gap-4 overflow-hidden">
        {/* Left column */}
        <div className="flex-1 flex flex-col gap-3">
{/* KPI row */}
<div className="grid grid-cols-3 gap-2">
  {[
    { label: "Incident Overview", value: "1,248", change: "12%", color: "text-red-400" },
    { label: "Change Success", value: "92%", change: "6%", color: "text-emerald-400" },
    { label: "SLA", value: "95%", change: "+6%", color: "text-gold" },
  ].map((stat, i) => (
    <div key={i} className="glass rounded-xl p-2.5">
      <div className="text-[8px] text-muted-foreground uppercase tracking-wider leading-tight">{stat.label}</div>
      <div className="text-lg font-bold text-foreground mt-0.5 leading-tight">{stat.value}</div>
      <div className={`text-[8px] font-medium mt-0.5 flex items-center gap-0.5 ${stat.color}`}>
        <span>{stat.change}</span>
        <span className="text-[7px] text-muted-foreground">vs last mo</span>
      </div>
    </div>
  ))}
</div>

          {/* My Work section */}
          <div className="glass rounded-xl p-3 flex-1 flex flex-col">
            <div className="text-[10px] font-semibold text-foreground uppercase tracking-wider mb-2">My Work</div>
            <div className="grid grid-cols-2 gap-2 flex-1">
              {[
                { label: "Incidents", count: 8, color: "bg-red-500" },
                { label: "Requested Items", count: 25, color: "bg-blue-500" },
                { label: "Tasks", count: 156, color: "bg-emerald-500" },
                { label: "Approvals", count: 342, color: "bg-gold" },
              ].map((item) => (
                <div key={item.label} className="bg-surface rounded-lg p-2.5 flex flex-col justify-between">
                  <div className="text-[9px] text-muted-foreground">{item.label}</div>
                  <div className="flex items-end justify-between">
                    <span className="text-lg font-bold text-foreground">{item.count}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                  </div>
                </div>
              ))}
            </div>
            <div className="text-[9px] text-primary text-right mt-1">View all →</div>
          </div>

          {/* Announcements */}
          <div className="glass rounded-xl p-3">
            <div className="text-[10px] font-semibold text-foreground uppercase tracking-wider mb-2">Announcements</div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-[10px] text-foreground/80">System Upgrade</span>
              <span className="text-[9px] text-muted-foreground ml-auto">Planned on May 25</span>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="w-[180px] flex flex-col gap-3">
          {/* Donut chart — Incidents by Category */}
          <div className="glass rounded-xl p-3 flex flex-col items-center">
            <div className="text-[9px] font-semibold text-foreground uppercase tracking-wider mb-2 w-full">Incidents by Category</div>
            {/* Donut */}
            <svg viewBox="0 0 100 100" className="w-20 h-20 -rotate-90">
              <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="14" className="text-border/30" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#0B5D3B" strokeWidth="14"
                strokeDasharray="66.7 233.3" strokeLinecap="round" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#D4AF63" strokeWidth="14"
                strokeDasharray="40 260" strokeDashoffset="-66.7" strokeLinecap="round" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#3B82F6" strokeWidth="14"
                strokeDasharray="33.3 266.7" strokeDashoffset="-106.7" strokeLinecap="round" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#EF4444" strokeWidth="14"
                strokeDasharray="26.7 273.3" strokeDashoffset="-140" strokeLinecap="round" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#8B5CF6" strokeWidth="14"
                strokeDasharray="20 280" strokeDashoffset="-166.7" strokeLinecap="round" />
            </svg>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-2 w-full">
              {[
                { label: "Software", color: "bg-emerald-600", pct: "28%" },
                { label: "Hardware", color: "bg-gold", pct: "24%" },
                { label: "Network", color: "bg-blue-500", pct: "20%" },
                { label: "Access", color: "bg-red-500", pct: "16%" },
                { label: "Other", color: "bg-purple-500", pct: "12%" },
              ].map((cat) => (
                <div key={cat.label} className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${cat.color} shrink-0`} />
                  <span className="text-[8px] text-muted-foreground">{cat.label} {cat.pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trend Overview */}
          <div className="glass rounded-xl p-3 flex-1 flex flex-col">
            <div className="text-[9px] font-semibold text-foreground uppercase tracking-wider mb-2">Trend Overview</div>
            <div className="flex items-center gap-1 mb-1">
              <span className="text-lg font-bold text-foreground">300</span>
              <span className="text-[9px] text-muted-foreground">↑ 100</span>
            </div>
            {/* Sparkline */}
            <svg viewBox="0 0 140 50" className="w-full flex-1" preserveAspectRatio="none">
              <path d="M0 40 L20 35 L40 42 L60 28 L80 20 L100 25 L120 10 L140 15" 
                fill="none" stroke="#0B5D3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M0 40 L20 35 L40 42 L60 28 L80 20 L100 25 L120 10 L140 15 L140 50 L0 50 Z"
                fill="url(#trendGrad)" opacity="0.15" />
              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0B5D3B" />
                  <stop offset="100%" stopColor="#0B5D3B" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="flex justify-between text-[8px] text-muted-foreground mt-1">
              <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
            <div className="text-[9px] text-primary text-right mt-1">View all →</div>
          </div>
        </div>
      </div>
    </div>

    {/* Stats card overlay at bottom */}
    <div className="absolute bottom-3 left-4 right-4 glass-strong rounded-2xl p-3">
      <div className="grid grid-cols-3 gap-4 text-center">
        {t.stats.map((s, i) => (
          <div key={s.label} className={i === 1 ? "border-x border-border-solid" : ""}>
            <div className="text-lg font-display font-bold text-primary animate-count-glow">{s.value}</div>
            <div className={`text-[10px] uppercase tracking-wider text-muted-foreground ${isAr ? "font-arabic normal-case" : ""}`}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

{/* Mobile: dashboard slides in from side as card */}
<div className="lg:hidden mt-10">
  <div className="rounded-2xl overflow-hidden shadow-luxe border border-border-solid">
    <div className="w-full bg-card dark:bg-card-glass p-5 flex flex-col gap-3">
      {/* Dashboard header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-bold text-[10px]">SN</span>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-foreground">ServiceNow</div>
            <div className="text-[9px] text-muted-foreground">ITSM Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] text-muted-foreground">Live</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Incidents", value: "1,247", change: "+12%", color: "text-red-400" },
          { label: "Resolved", value: "843", change: "+8%", color: "text-emerald-400" },
          { label: "SLA", value: "96.4%", change: "+2%", color: "text-gold" },
        ].map((stat, i) => (
          <div key={i} className="glass rounded-lg p-2.5">
            <div className="text-[9px] text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            <div className="text-base font-bold text-foreground mt-0.5">{stat.value}</div>
            <div className={`text-[9px] font-medium ${stat.color}`}>{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Chart area — FIXED HEIGHT */}
      <div className="glass rounded-lg p-3 flex flex-col gap-2" style={{ height: '140px' }}>
        <div className="flex items-center justify-between shrink-0">
          <span className="text-[10px] font-semibold text-foreground">Incident Volume — 7 Days</span>
          <span className="text-[9px] text-muted-foreground">2m ago</span>
        </div>
        <div className="flex-1 flex items-end gap-1.5 min-h-0">
          {[65, 78, 52, 91, 84, 72, 60].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-0.5 h-full justify-end">
              <div
                className="w-full rounded-t-sm bg-gradient-to-t from-primary/60 to-primary"
                style={{ height: `${h}%` }}
              />
              <span className="text-[8px] text-muted-foreground shrink-0">{["M","T","W","T","F","S","S"][i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats overlay */}
      <div className="glass-strong rounded-xl p-3">
        <div className="grid grid-cols-3 gap-3 text-center">
          {t.stats.map((s, i) => (
            <div key={s.label} className={i === 1 ? "border-x border-border-solid" : ""}>
              <div className="text-lg font-display font-bold text-primary animate-count-glow">{s.value}</div>
              <div className={`text-[9px] uppercase tracking-wider text-muted-foreground ${isAr ? "font-arabic normal-case" : ""}`}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>
        </div>
      </div>
    </section>
  );
};