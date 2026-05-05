import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu, X, ChevronDown, ArrowRight,
  Compass, Layers, Settings, Activity, Users, Shield, Zap, Cloud, GraduationCap,
  Building2, Flame, HeartPulse, Landmark, Radio, ShoppingBag, Cpu,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/hooks/useContent";
import { LanguageSwitch } from "./LanguageSwitch";
import { ThemeToggle } from "./ThemeToggle";
import { AldiraGlyph, GOLD, GOLD_SOFT, EMERALD, ON_DARK } from "@/assets/design/logo-marks";
import { useTheme } from "@/context/ThemeContext";

// ── Icon maps ─────────────────────────────────────────────────────────────────
const svcIcons: Record<string, React.ElementType> = {
  "servicenow-consulting": Compass,
  "implementation-integration": Layers,
  "itsm": Settings,
  "itom": Activity,
  "hrsd": Users,
  "managed-services": Shield,
  "ai-automation": Zap,
  "cloud-advisory": Cloud,
  "talent-solutions": GraduationCap,
};
const indIcons: Record<string, React.ElementType> = {
  "government": Building2,
  "oil-gas": Flame,
  "healthcare": HeartPulse,
  "banking-finance": Landmark,
  "telecom": Radio,
  "retail-logistics": ShoppingBag,
  "enterprise-technology": Cpu,
};

// ── Category grouping for Services ───────────────────────────────────────────
// Groups the 9 services into 4 columns matching the reference image pattern
// Col structure: { eyebrow, mainSlug (big title), subSlugs[] }
const SERVICE_COLUMNS = [
  {
    eyebrow: "PLATFORM STRATEGY",
    eyebrowAr: "استراتيجية المنصة",
    mainSlug: "servicenow-consulting",
    subSlugs: ["implementation-integration", "cloud-advisory"],
    color: "emerald",
  },
  {
    eyebrow: "IT OPERATIONS",
    eyebrowAr: "عمليات تقنية المعلومات",
    mainSlug: "itsm",
    subSlugs: ["itom", "managed-services"],
    color: "blue",
  },
  {
    eyebrow: "PEOPLE & AUTOMATION",
    eyebrowAr: "الموارد والأتمتة",
    mainSlug: "hrsd",
    subSlugs: ["ai-automation"],
    color: "gold",
  },
  {
    eyebrow: "TALENT & GROWTH",
    eyebrowAr: "المواهب والنمو",
    mainSlug: "talent-solutions",
    subSlugs: [],
    color: "purple",
  },
];

// ── Icon SVG backgrounds (auto-generated per column) ─────────────────────────
const ColBg = ({ color, Icon }: { color: string; Icon: React.ElementType }) => {
  const colors: Record<string, string> = {
    emerald: "bg-primary/8 text-primary",
    blue: "bg-blue-500/8 text-blue-500",
    gold: "bg-gold/8 text-gold",
    purple: "bg-purple-500/8 text-purple-500",
  };
  return (
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colors[color] || colors.emerald}`}>
      <Icon className="w-6 h-6" />
    </div>
  );
};

// ── Full-width Services mega menu ─────────────────────────────────────────────
function ServicesMegaMenu({ items, isAr, onClose }: { items: any[]; isAr: boolean; onClose: () => void }) {
  const bySlug = Object.fromEntries(items.map(i => [i.slug, i]));

  return (
    // Full viewport width, anchored to the left edge of the page
    <div className="fixed left-5 right-5 top-[64px] z-50 px-0">
      <div className="glass-strong border-y border-border-solid shadow-luxe">
        {/* Top label row */}
        <div className="border-b border-border-solid/40 px-8 py-3 bg-surface/60">
          <span className={`text-[10px] uppercase tracking-[0.3em] text-gold font-semibold ${isAr ? "font-arabic normal-case tracking-normal" : ""}`}>
            {isAr ? "خدماتنا — حلول ServiceNow من الاستراتيجية إلى التشغيل" : "Our Services — End-to-end ServiceNow from strategy to operations"}
          </span>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-4 divide-x divide-border-solid/40">
          {SERVICE_COLUMNS.map((col) => {
            const main = bySlug[col.mainSlug];
            const subs = col.subSlugs.map(s => bySlug[s]).filter(Boolean);
            const Icon = svcIcons[col.mainSlug] || Compass;
            if (!main) return null;
            return (
              <div key={col.mainSlug} className="p-6 hover:bg-primary/2 transition-colors duration-300 flex flex-col gap-4">
                {/* Eyebrow + icon */}
                <div className="flex items-start justify-between gap-2">
                  <div className={`text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold leading-tight ${isAr ? "font-arabic normal-case tracking-normal" : ""}`}>
                    {isAr ? col.eyebrowAr : col.eyebrow}
                  </div>
                  <ColBg color={col.color} Icon={Icon} />
                </div>

                {/* Main service title */}
                <Link
                  to={`/services/${main.slug}`}
                  onClick={onClose}
                  className="group"
                >
                  <h3 className={`font-display font-bold text-lg leading-tight group-hover:text-primary transition-colors flex items-start gap-1 ${isAr ? "font-arabic" : ""}`}>
                    {main.title}
                    <ArrowRight className="w-4 h-4 mt-1 shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all rtl-flip" />
                  </h3>
                </Link>

                {/* Short description */}
                <p className={`text-xs text-muted-foreground leading-relaxed ${isAr ? "font-arabic" : ""}`}>
                  {main.desc}
                </p>

                {/* Divider */}
                {subs.length > 0 && <div className="h-px bg-border-solid/60" />}

                {/* Sub-service links */}
                <div className="space-y-1 flex-1">
                  {subs.map((sub) => (
                    <Link
                      key={sub.slug}
                      to={`/services/${sub.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between gap-2 py-1.5 group"
                    >
                      <span className={`text-sm text-foreground/70 group-hover:text-primary transition-colors leading-snug ${isAr ? "font-arabic" : ""}`}>
                        {sub.title}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all rtl-flip" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="border-t border-border-solid/40 px-8 py-3 bg-surface/40 flex items-center justify-between gap-4">
          <p className={`text-xs text-muted-foreground ${isAr ? "font-arabic" : ""}`}>
            {isAr ? "غير متأكد من أين تبدأ؟ فريقنا جاهز لمساعدتك." : "Not sure where to start? Our certified experts will guide you to the right solution."}
          </p>
          <Link
            to="/contact"
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:gap-2.5 transition-all whitespace-nowrap shrink-0 group"
          >
            {isAr ? "تحدث إلى خبير" : "Talk to an Expert"}
            <ArrowRight className="w-3.5 h-3.5 rtl-flip group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Full-width Industries mega menu ───────────────────────────────────────────
// 4 columns: first col is heading + description, then 3 industry groups of 2-3 each
function IndustriesMegaMenu({ items, isAr, onClose }: { items: any[]; isAr: boolean; onClose: () => void }) {
  // Group industries across 3 content cols (7 items → roughly 3+2+2)
  const groups = [
    items.slice(0, 3),
    items.slice(3, 5),
    items.slice(5, 7),
  ];
  const groupLabels = [
    { en: "PUBLIC SECTOR", ar: "القطاع العام" },
    { en: "FINANCIAL & TELECOM", ar: "المالي والاتصالات" },
    { en: "ENTERPRISE & TECH", ar: "المؤسسات والتقنية" },
  ];

  return (
    <div className="fixed left-5 right-5 top-[64px] z-50 px-0">
      <div className="glass-strong border-y border-border-solid shadow-luxe">
        {/* Top label */}
        <div className="border-b border-border-solid/40 px-8 py-3 bg-surface/60">
          <span className={`text-[10px] uppercase tracking-[0.3em] text-gold font-semibold ${isAr ? "font-arabic normal-case tracking-normal" : ""}`}>
            {isAr ? "القطاعات — حلول مصممة لواقع صناعتك" : "Industries We Serve — Sector-specific solutions built around your reality"}
          </span>
        </div>

        {/* 4-col layout: intro col + 3 industry group cols */}
        <div className="grid grid-cols-4 divide-x divide-border-solid/40">

          {/* Intro col */}
          <div className="p-6 flex flex-col gap-4 bg-primary/2">
            {/* Generated geometric SVG illustration */}
            <svg viewBox="0 0 120 90" className="w-28 h-20 opacity-70" fill="none">
              <rect x="10" y="40" width="20" height="40" rx="3" fill="hsl(var(--primary))" opacity="0.2"/>
              <rect x="38" y="25" width="20" height="55" rx="3" fill="hsl(var(--primary))" opacity="0.35"/>
              <rect x="66" y="10" width="20" height="70" rx="3" fill="hsl(var(--primary))" opacity="0.5"/>
              <rect x="94" y="20" width="20" height="60" rx="3" fill="hsl(var(--gold))" opacity="0.6"/>
              <polyline points="20,40 48,25 76,10 104,20" stroke="hsl(var(--gold))" strokeWidth="1.5" strokeDasharray="3 2"/>
              {[20,48,76,104].map((x,i) => {
                const ys = [40,25,10,20];
                return <circle key={i} cx={x} cy={ys[i]} r="2.5" fill="hsl(var(--gold))"/>;
              })}
              <line x1="5" y1="80" x2="115" y2="80" stroke="hsl(var(--border))" strokeWidth="1"/>
            </svg>
            <div>
              <h3 className={`font-display font-bold text-lg mb-2 ${isAr ? "font-arabic" : ""}`}>
                {isAr ? "خبرة قطاعية عميقة" : "Deep Sector Expertise"}
              </h3>
              <p className={`text-xs text-muted-foreground leading-relaxed ${isAr ? "font-arabic" : ""}`}>
                {isAr
                  ? "نقدم حلول ServiceNow مصممة خصيصاً للتحديات التشغيلية الفريدة لكل قطاع في المملكة العربية السعودية."
                  : "We deliver ServiceNow solutions tailored to the unique operational and compliance challenges of each sector across Saudi Arabia."}
              </p>
            </div>
            <Link
              to="/industries"
              onClick={onClose}
              className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-primary group hover:gap-2.5 transition-all"
            >
              {isAr ? "جميع القطاعات" : "View All Industries"}
              <ArrowRight className="w-3.5 h-3.5 rtl-flip group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* 3 industry group columns */}
          {groups.map((group, gi) => (
            <div key={gi} className="p-6 flex flex-col gap-1">
              {/* Group eyebrow */}
              <div className={`text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-3 ${isAr ? "font-arabic normal-case tracking-normal" : ""}`}>
                {isAr ? groupLabels[gi].ar : groupLabels[gi].en}
              </div>

              {group.map((ind: any) => {
                const Icon = indIcons[ind.slug] || Building2;
                return (
                  <Link
                    key={ind.slug}
                    to={`/industries#${ind.slug}`}
                    onClick={onClose}
                    className="group flex items-start gap-3 p-3 rounded-xl hover:bg-primary/5 transition-all duration-200"
                  >
                    {/* Auto-generated icon box */}
                    <div className="w-9 h-9 rounded-xl bg-gold/8 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-gold group-hover:scale-105 transition-all duration-300">
                      <Icon className="w-4 h-4 text-gold group-hover:text-foreground transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug ${isAr ? "font-arabic" : ""}`}>
                        {ind.title}
                      </div>
                      <div className={`text-xs text-muted-foreground leading-relaxed mt-0.5 line-clamp-2 ${isAr ? "font-arabic" : ""}`}>
                        {ind.desc}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all rtl-flip" />
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border-solid/40 px-8 py-3 bg-surface/40 flex items-center justify-between gap-4">
          <p className={`text-xs text-muted-foreground ${isAr ? "font-arabic" : ""}`}>
            {isAr ? "متخصصون في التحول الرقمي عبر القطاعين العام والخاص في المملكة العربية السعودية." : "Specialists in digital transformation across Saudi Arabia's public and private sectors."}
          </p>
          <Link
            to="/contact"
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:gap-2.5 transition-all whitespace-nowrap shrink-0 group"
          >
            {isAr ? "تحدث إلى خبير القطاع" : "Talk to a Sector Expert"}
            <ArrowRight className="w-3.5 h-3.5 rtl-flip group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
export const Navbar = () => {
  const { lang } = useLanguage();
  const c = useContent();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { resolved } = useTheme();
  const isDark = resolved === "dark";
  const primaryColor = isDark ? ON_DARK : EMERALD;
  const accentColor = isDark ? GOLD_SOFT : GOLD;
  const isAr = lang === "ar";

  const mainNav = [
    { key: "services",   label: c.nav.services,   href: "/services"   },
    { key: "industries", label: c.nav.industries, href: "/industries" },
    { key: "solutions",  label: c.nav.solutions,  href: "/solutions"  },
    { key: "about",      label: c.nav.about,      href: "/about"      },
    { key: "contact",    label: c.nav.contact,    href: "/contact"    },
  ];
  const hasMega = ["services", "industries"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
    setMobileExpanded(null);
  }, [location.pathname]);

  const isActive = (href: string) =>
    location.pathname === href || (href !== "/" && location.pathname.startsWith(href));

  const openMenu  = (key: string) => { if (closeTimer.current) clearTimeout(closeTimer.current); setActiveDropdown(key); };
  const closeMenu = () => { closeTimer.current = setTimeout(() => setActiveDropdown(null), 150); };
  const keepOpen  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };

  // Close mega menu on scroll
  useEffect(() => {
    const onScroll = () => setActiveDropdown(null);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrolledHeight = scrolled ? "h-16" : "h-20";
  const megaTop = scrolled ? "top-[64px]" : "top-[80px]";

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "glass-strong border-b border-border-solid/60" : "bg-transparent"}`}>
        <div className="container mx-auto px-2 lg:px-4">
          <div className={`flex items-center justify-between transition-all duration-500 ${scrolledHeight}`}>

            {/* Logo — exact same markup as original */}
            {location.pathname === "/" ? (
              <a href="#home" className="flex items-center gap-0 shrink-0">
                <svg viewBox="0 0 200 200" className="w-14 h-14" aria-hidden="true">
                  <AldiraGlyph primary={primaryColor} accent={accentColor} />
                </svg>
                <div className="leading-tight mt-2">
                  <div className={`font-display font-bold text-primary text-2xl tracking-tight ${isAr ? "font-arabic" : ""}`}>
                    {isAr ? <>ألديرا<span className="text-gold">تك</span></> : <>Aldira<span className="text-gold">tech</span></>}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.15em] font-bold text-foreground/80">ServiceNow Experts</div>
                </div>
              </a>
            ) : (
              <Link to="/" className="flex items-center gap-0 shrink-0">
                <svg viewBox="0 0 200 200" className="w-14 h-14" aria-hidden="true">
                  <AldiraGlyph primary={primaryColor} accent={accentColor} />
                </svg>
                <div className="leading-tight mt-2">
                  <div className={`font-display font-bold text-primary text-2xl tracking-tight ${isAr ? "font-arabic" : ""}`}>
                    {isAr ? <>ألديرا<span className="text-gold">تك</span></> : <>Aldira<span className="text-gold">tech</span></>}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.15em] font-bold text-foreground/80">ServiceNow Experts</div>
                </div>
              </Link>
            )}

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {mainNav.map((item) => (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => hasMega.includes(item.key) ? openMenu(item.key) : closeMenu()}
                  onMouseLeave={closeMenu}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center gap-0.5 px-2.5 py-2 text-xs font-medium transition-colors relative group whitespace-nowrap ${
                      isActive(item.href) ? "text-primary" : "text-foreground/80 hover:text-primary"
                    }`}
                  >
                    {item.label}
                    {hasMega.includes(item.key) && (
                      <ChevronDown className={`w-3 h-3 opacity-60 transition-transform duration-300 ${activeDropdown === item.key ? "rotate-180" : ""}`} />
                    )}
                    <span className={`absolute left-2.5 right-2.5 -bottom-0.5 h-px bg-gold transition-transform duration-500 origin-left ${isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                  </Link>
                </div>
              ))}
            </nav>

            {/* Right */}
            <div className="hidden lg:flex items-center gap-2">
              <LanguageSwitch />
              <ThemeToggle />
              <Link to="/contact"><Button variant="hero" size="sm" className="text-xs px-4 py-1.5 whitespace-nowrap">{c.nav.cta}</Button></Link>
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Menu">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mega menus — rendered outside header so they can be full-width ── */}
      {activeDropdown === "services" && (
        <div
          onMouseEnter={keepOpen}
          onMouseLeave={closeMenu}
          style={{ top: scrolled ? "64px" : "80px" }}
          className="fixed left-0 right-0 z-40"
        >
          <ServicesMegaMenu items={c.services.items} isAr={isAr} onClose={() => setActiveDropdown(null)} />
        </div>
      )}
      {activeDropdown === "industries" && (
        <div
          onMouseEnter={keepOpen}
          onMouseLeave={closeMenu}
          style={{ top: scrolled ? "64px" : "80px" }}
          className="fixed left-0 right-0 z-40"
        >
          <IndustriesMegaMenu items={c.industries.items} isAr={isAr} onClose={() => setActiveDropdown(null)} />
        </div>
      )}

      {/* ── Mobile menu ── */}
      {open && (
        <div className="fixed top-16 inset-x-0 z-50 glass-strong border-b border-border-solid lg:hidden overflow-y-auto max-h-[85vh]">
          <div className="p-4 space-y-1">
            {mainNav.map((item) => (
              <div key={item.key}>
                <div className="flex items-center justify-between">
                  <Link
                    to={item.href}
                    onClick={() => !hasMega.includes(item.key) && setOpen(false)}
                    className={`flex-1 py-2.5 px-3 text-sm font-medium rounded-xl hover:bg-primary/5 ${isActive(item.href) ? "text-primary" : ""} ${isAr ? "font-arabic" : ""}`}
                  >
                    {item.label}
                  </Link>
                  {hasMega.includes(item.key) && (
                    <button onClick={() => setMobileExpanded(mobileExpanded === item.key ? null : item.key)} className="p-2 text-muted-foreground">
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === item.key ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>

                {item.key === "services" && mobileExpanded === "services" && (
                  <div className="pl-3 space-y-0.5 pb-2">
                    {c.services.items.map((s) => {
                      const Icon = svcIcons[s.slug] || Compass;
                      return (
                        <Link key={s.slug} to={`/services/${s.slug}`} onClick={() => setOpen(false)}
                          className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-primary/5 group">
                          <div className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                            <Icon className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <span className={`text-sm text-muted-foreground group-hover:text-primary transition-colors ${isAr ? "font-arabic" : ""}`}>{s.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}

                {item.key === "industries" && mobileExpanded === "industries" && (
                  <div className="pl-3 space-y-0.5 pb-2">
                    {c.industries.items.map((ind) => {
                      const Icon = indIcons[ind.slug] || Building2;
                      return (
                        <Link key={ind.slug} to={`/industries#${ind.slug}`} onClick={() => setOpen(false)}
                          className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-primary/5 group">
                          <div className="w-7 h-7 rounded-lg bg-gold/8 flex items-center justify-center shrink-0">
                            <Icon className="w-3.5 h-3.5 text-gold" />
                          </div>
                          <span className={`text-sm text-muted-foreground group-hover:text-primary transition-colors ${isAr ? "font-arabic" : ""}`}>{ind.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            <div className="flex items-center gap-3 pt-3 px-3 border-t border-border-solid/30 mt-2">
              <LanguageSwitch /><ThemeToggle />
            </div>
            <div className="px-3 pt-2">
              <Link to="/contact" onClick={() => setOpen(false)}>
                <Button variant="hero" className="w-full">{c.nav.cta}</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};