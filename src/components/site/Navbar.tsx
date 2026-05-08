import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu, X, ChevronDown, ArrowRight,
  Building2, Flame, HeartPulse, Landmark, Radio, ShoppingBag, Cpu,
  BarChart3, RefreshCw, Headphones, Package, Factory, LineChart,
  Users, Workflow, Settings, Activity, Shield, Zap, Bot, BrainCircuit,
  Sparkles, Compass, Database, Layers,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/hooks/useContent";
import { LanguageSwitch } from "./LanguageSwitch";
import { ThemeToggle } from "./ThemeToggle";
import AldiraLogo from "@/assets/Aldira_logo.png";

const indIcons: Record<string, React.ElementType> = {
  "government": Building2, "oil-gas": Flame, "healthcare": HeartPulse,
  "banking-finance": Landmark, "telecom": Radio,
  "retail-logistics": ShoppingBag, "enterprise-technology": Cpu,
};

const SERVICE_COLUMNS = [
  {
    eyebrow: "ERP & BUSINESS", eyebrowLine2: "TRANSFORMATION",
    mainSlug: "sap", mainLabel: "SAP Consulting",
    mainDesc: "Turn your ERP into a driver of growth — S/4HANA migrations, advisory, and managed services.",
    Icon: BarChart3, color: "#0070f3",
    subs: [
      { slug: "sap-advisory",  label: "SAP Strategy & Advisory" },
      { slug: "sap-s4hana",    label: "S/4HANA Migration" },
      { slug: "sap-ams",       label: "Application Management" },
      { slug: "sap-finance",   label: "Finance & Controlling" },
    ],
    subIcons: [Compass, RefreshCw, Headphones, LineChart],
  },
  {
    eyebrow: "CRM & CUSTOMER", eyebrowLine2: "EXPERIENCE",
    mainSlug: "salesforce", mainLabel: "Salesforce Consulting",
    mainDesc: "Elevate every customer relationship — end-to-end CRM, Agentforce AI, and integration.",
    Icon: Users, color: "#00a1e0",
    subs: [
      { slug: "salesforce-sales",     label: "Sales Cloud & Pipeline" },
      { slug: "salesforce-service",   label: "Service & Experience Cloud" },
      { slug: "salesforce-marketing", label: "Marketing Cloud & CPQ" },
      { slug: "salesforce-ai",        label: "Salesforce AI & Automation" },
    ],
    subIcons: [BarChart3, Headphones, Package, Bot],
  },
  {
    eyebrow: "ITSM & WORKFLOW", eyebrowLine2: "AUTOMATION",
    mainSlug: "servicenow", mainLabel: "ServiceNow Consulting",
    mainDesc: "Streamline IT and business workflows — official ServiceNow partner with proven accelerators.",
    Icon: Workflow, color: "#62d84e",
    subs: [
      { slug: "servicenow-itsm", label: "IT Service Management" },
      { slug: "servicenow-itom", label: "IT Operations Management" },
      { slug: "servicenow-itam", label: "IT Asset Management" },
      { slug: "servicenow-grc",  label: "GRC & Customer Workflows" },
    ],
    subIcons: [Settings, Activity, Database, Shield],
  },
  {
    eyebrow: "AI & DIGITAL", eyebrowLine2: "TRANSFORMATION",
    mainSlug: "ai-automation", mainLabel: "Intelligent Automation",
    mainDesc: "Put AI into production — GenAI strategy, ML pipelines, RPA, and enterprise deployment.",
    Icon: BrainCircuit, color: "#a855f7",
    subs: [
      { slug: "ai-genai",     label: "Generative AI & LLMs" },
      { slug: "ai-strategy",  label: "AI Strategy & PoC" },
      { slug: "ai-rpa",       label: "Robotic Process Automation" },
      { slug: "ai-analytics", label: "Data & Analytics" },
    ],
    subIcons: [Sparkles, Compass, Bot, BarChart3],
  },
];

const IND_GROUPS = [
  { label: "PUBLIC SECTOR",       items: ["government", "oil-gas", "healthcare"] },
  { label: "FINANCIAL & TELECOM", items: ["banking-finance", "telecom"] },
  { label: "ENTERPRISE & TECH",   items: ["retail-logistics", "enterprise-technology"] },
];

const Dot = () => <span className="inline-block w-1.5 h-1.5 rounded-sm bg-gold shrink-0" />;

function ServicesMegaMenu({ isAr, onClose }: { isAr: boolean; onClose: () => void }) {
  return (
    <div className="glass-strong border-y border-border-solid shadow-luxe rounded-b-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-7 py-2.5 border-b border-border-solid/40 bg-surface/60">
        <Dot />
        <span className="text-[10px] uppercase tracking-[0.22em] text-gold font-semibold">
          {isAr ? "خدماتنا — حلول تقنية شاملة" : "Consulting services by practice area"}
        </span>
      </div>
      <div className="grid grid-cols-4 divide-x divide-border-solid/30">
        {SERVICE_COLUMNS.map((col) => (
          <div key={col.mainSlug} className="group/col flex flex-col p-5 hover:bg-primary/[0.025] transition-colors duration-300">
            <div className="mb-3">
              <div className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground/70 font-semibold leading-tight">{col.eyebrow}</div>
              <div className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground/70 font-semibold leading-tight">{col.eyebrowLine2}</div>
            </div>
            <Link to={`/services/${col.mainSlug}`} onClick={onClose} className="group flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-[14px] leading-snug text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                {col.mainLabel}
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all rtl-flip shrink-0" />
              </h3>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ background: `${col.color}15` }}>
                <col.Icon className="w-5 h-5" style={{ color: col.color }} />
              </div>
            </Link>
            <p className="text-[11px] text-muted-foreground leading-relaxed mb-3 pr-1">{col.mainDesc}</p>
            <div className="h-px bg-border-solid/50 mb-3" />
            <div className="space-y-0.5 flex-1">
              {col.subs.map((sub, si) => {
                const SubIcon = col.subIcons[si] || ArrowRight;
                return (
                  <Link key={sub.slug} to={`/services/${col.mainSlug}/${sub.slug}`} onClick={onClose}
                    className="flex items-center gap-2 px-1.5 py-1 rounded-lg hover:bg-primary/5 group/sub transition-all">
                    <SubIcon className="w-3 h-3 text-muted-foreground/50 group-hover/sub:text-gold shrink-0 transition-colors" />
                    <span className="text-[12px] text-muted-foreground group-hover/sub:text-foreground transition-colors leading-tight truncate">{sub.label}</span>
                    <ArrowRight className="w-2.5 h-2.5 text-muted-foreground/30 ml-auto opacity-0 group-hover/sub:opacity-100 transition-all rtl-flip shrink-0" />
                  </Link>
                );
              })}
            </div>
            <div className="mt-3 h-0.5 w-0 group-hover/col:w-full transition-all duration-500 rounded-full" style={{ background: `${col.color}60` }} />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4 px-7 py-2.5 border-t border-border-solid/40 bg-surface/40">
        <p className="text-[11px] text-muted-foreground">
          {isAr ? "لست متأكداً؟ خبراؤنا جاهزون للمساعدة." : "Not sure where to start? Our certified experts will guide you."}
        </p>
        <Link to="/contact" onClick={onClose} className="flex items-center gap-1 text-[11px] font-semibold text-gold hover:gap-2 transition-all group whitespace-nowrap">
          {isAr ? "تحدث إلى خبير" : "Talk to an Expert"}
          <ArrowRight className="w-3 h-3 rtl-flip group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

function IndustriesMegaMenu({ items, isAr, onClose }: { items: any[]; isAr: boolean; onClose: () => void }) {
  const bySlug = Object.fromEntries(items.map((i: any) => [i.slug, i]));
  return (
    <div className="glass-strong border-y border-border-solid shadow-luxe rounded-b-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-7 py-2.5 border-b border-border-solid/40 bg-surface/60">
        <Dot />
        <span className="text-[10px] uppercase tracking-[0.22em] text-gold font-semibold">
          {isAr ? "القطاعات — حلول مصممة لواقع صناعتك" : "Industries We Serve — Sector-specific solutions"}
        </span>
      </div>
      <div className="grid grid-cols-4 divide-x divide-border-solid/30">
        <div className="p-5 flex flex-col gap-3 bg-primary/[0.02] group/intro">
          <svg viewBox="0 0 100 75" className="w-24 h-16 opacity-60 group-hover/intro:opacity-90 transition-opacity" fill="none">
            <rect x="8" y="33" width="16" height="34" rx="2" fill="hsl(var(--primary))" opacity="0.2"/>
            <rect x="30" y="20" width="16" height="47" rx="2" fill="hsl(var(--primary))" opacity="0.35"/>
            <rect x="52" y="8" width="16" height="59" rx="2" fill="hsl(var(--primary))" opacity="0.5"/>
            <rect x="74" y="16" width="16" height="51" rx="2" fill="hsl(var(--gold))" opacity="0.65"/>
            <polyline points="16,33 38,20 60,8 82,16" stroke="hsl(var(--gold))" strokeWidth="1.5" strokeDasharray="3 2"/>
            {[[16,33],[38,20],[60,8],[82,16]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="2" fill="hsl(var(--gold))"/>)}
            <line x1="4" y1="67" x2="96" y2="67" stroke="hsl(var(--border))" strokeWidth="0.8"/>
          </svg>
          <div>
            <h3 className="font-semibold text-[13px] mb-1 group-hover/intro:text-primary transition-colors">
              {isAr ? "خبرة قطاعية عميقة" : "Deep Sector Expertise"}
            </h3>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              {isAr ? "حلول ServiceNow مصممة لكل قطاع في المملكة." : "Solutions tailored to each sector's unique compliance and operational demands."}
            </p>
          </div>
          <Link to="/industries" onClick={onClose} className="flex items-center gap-1 text-[11px] font-semibold text-primary group/lnk hover:gap-2 transition-all mt-auto">
            {isAr ? "جميع القطاعات" : "View All"}
            <ArrowRight className="w-3 h-3 rtl-flip group-hover/lnk:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        {IND_GROUPS.map((grp) => (
          <div key={grp.label} className="p-5 flex flex-col gap-1 hover:bg-primary/[0.02] transition-colors duration-300">
            <div className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground/60 font-semibold mb-2">{grp.label}</div>
            {grp.items.map((slug) => {
              const ind = bySlug[slug];
              if (!ind) return null;
              const Icon = indIcons[slug] || Building2;
              return (
                <Link key={slug} to={`/industries#${slug}`} onClick={onClose}
                  className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-primary/5 transition-all">
                  <div className="w-7 h-7 rounded-lg bg-gold/8 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:scale-105 transition-all">
                    <Icon className="w-3.5 h-3.5 text-gold group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">{ind.title}</div>
                    <div className="text-[10px] text-muted-foreground leading-snug mt-0.5 line-clamp-1">{ind.desc}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4 px-7 py-2.5 border-t border-border-solid/40 bg-surface/40">
        <p className="text-[11px] text-muted-foreground">
          {isAr ? "متخصصون عبر القطاعين العام والخاص." : "Specialists in digital transformation across Saudi Arabia's key sectors."}
        </p>
        <Link to="/contact" onClick={onClose} className="flex items-center gap-1 text-[11px] font-semibold text-gold hover:gap-2 transition-all group whitespace-nowrap">
          {isAr ? "خبير قطاعي" : "Sector Expert"}
          <ArrowRight className="w-3 h-3 rtl-flip group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export const Navbar = () => {
  const { lang } = useLanguage();
  const c = useContent();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAr = lang === "ar";

  const mainNav = [
    { key: "services",   label: c.nav.services,   href: "/services"   },
    { key: "industries", label: c.nav.industries, href: "/industries" },
    { key: "solutions",  label: c.nav.solutions,  href: "/solutions"  },
    { key: "about",      label: c.nav.about,      href: "/about"      },
    { key: "contact",    label: c.nav.contact,    href: "/contact"    },
  ];
  const hasMega = ["services", "industries"];

  useEffect(() => { const fn = () => setScrolled(window.scrollY > 24); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  useEffect(() => { setOpen(false); setActiveDropdown(null); setMobileExpanded(null); }, [location.pathname]);
  useEffect(() => { const fn = () => setActiveDropdown(null); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);

  const isActive = (href: string) => location.pathname === href || (href !== "/" && location.pathname.startsWith(href));
  const openMenu  = (k: string) => { if (closeTimer.current) clearTimeout(closeTimer.current); setActiveDropdown(k); };
  const closeMenu = () => { closeTimer.current = setTimeout(() => setActiveDropdown(null), 150); };
  const keepOpen  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };
  const megaTop = scrolled ? "56px" : "72px";

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "glass-strong border-b border-border-solid/60" : "bg-transparent"}`}>
        <div className="container mx-auto px-2 lg:px-4">
          <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "h-14" : "h-[72px]"}`}>

            {/* Logo — image replaces wordmark */}
            {location.pathname === "/" ? (
              <a href="#home" className="shrink-0">
                <img src={AldiraLogo} alt="Aldiratech" className="h-14 w-auto object-contain" />
              </a>
            ) : (
              <Link to="/" className="shrink-0">
                <img src={AldiraLogo} alt="Aldiratech" className="h-24 w-auto object-contain" />
              </Link>
            )}

            <nav className="hidden lg:flex items-center gap-0.5">
              {mainNav.map((item) => (
                <div key={item.key} className="relative"
                  onMouseEnter={() => hasMega.includes(item.key) ? openMenu(item.key) : closeMenu()}
                  onMouseLeave={closeMenu}>
                  <Link to={item.href}
                    className={`flex items-center gap-0.5 px-2.5 py-1.5 text-xs font-medium transition-colors relative group whitespace-nowrap ${isActive(item.href) ? "text-primary" : "text-foreground/80 hover:text-primary"}`}>
                    {item.label}
                    {hasMega.includes(item.key) && (
                      <ChevronDown className={`w-3 h-3 opacity-50 transition-transform duration-300 ${activeDropdown === item.key ? "rotate-180" : ""}`} />
                    )}
                    <span className={`absolute left-2.5 right-2.5 -bottom-0.5 h-px bg-gold transition-transform duration-500 origin-left ${isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                  </Link>
                </div>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <LanguageSwitch /><ThemeToggle />
              <Link to="/contact"><Button variant="hero" size="sm" className="text-xs px-4 py-1.5 whitespace-nowrap">{c.nav.cta}</Button></Link>
            </div>

            <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Menu">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {activeDropdown === "services" && (
        <div style={{ top: megaTop }} className="fixed left-0 right-0 z-40 px-4" onMouseEnter={keepOpen} onMouseLeave={closeMenu}>
          <ServicesMegaMenu isAr={isAr} onClose={() => setActiveDropdown(null)} />
        </div>
      )}
      {activeDropdown === "industries" && (
        <div style={{ top: megaTop }} className="fixed left-0 right-0 z-40 px-4" onMouseEnter={keepOpen} onMouseLeave={closeMenu}>
          <IndustriesMegaMenu items={c.industries.items} isAr={isAr} onClose={() => setActiveDropdown(null)} />
        </div>
      )}

      {open && (
        <div className="fixed top-14 inset-x-0 z-50 glass-strong border-b border-border-solid lg:hidden overflow-y-auto max-h-[85vh]">
          <div className="p-4 space-y-1">
            {mainNav.map((item) => (
              <div key={item.key}>
                <div className="flex items-center justify-between">
                  <Link to={item.href} onClick={() => !hasMega.includes(item.key) && setOpen(false)}
                    className={`flex-1 py-2.5 px-3 text-sm font-medium rounded-xl hover:bg-primary/5 ${isActive(item.href) ? "text-primary" : ""}`}>
                    {item.label}
                  </Link>
                  {hasMega.includes(item.key) && (
                    <button onClick={() => setMobileExpanded(mobileExpanded === item.key ? null : item.key)} className="p-2 text-muted-foreground">
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === item.key ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
                {item.key === "services" && mobileExpanded === "services" && (
                  <div className="pl-3 space-y-2 pb-2">
                    {SERVICE_COLUMNS.map((col) => (
                      <div key={col.mainSlug}>
                        <div className="text-[9px] uppercase tracking-widest text-muted-foreground/60 px-3 pt-2 pb-0.5">{col.eyebrow} {col.eyebrowLine2}</div>
                        <Link to={`/services/${col.mainSlug}`} onClick={() => setOpen(false)}
                          className="flex items-center gap-2 py-1.5 px-3 rounded-xl hover:bg-primary/5">
                          <col.Icon className="w-3.5 h-3.5 shrink-0" style={{ color: col.color }} />
                          <span className="text-sm font-medium">{col.mainLabel}</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
                {item.key === "industries" && mobileExpanded === "industries" && (
                  <div className="pl-3 space-y-0.5 pb-2">
                    {c.industries.items.map((ind: any) => {
                      const Icon = indIcons[ind.slug] || Building2;
                      return (
                        <Link key={ind.slug} to={`/industries#${ind.slug}`} onClick={() => setOpen(false)}
                          className="flex items-center gap-2.5 py-1.5 px-3 rounded-xl hover:bg-primary/5 group">
                          <div className="w-6 h-6 rounded-lg bg-gold/8 flex items-center justify-center shrink-0">
                            <Icon className="w-3 h-3 text-gold" />
                          </div>
                          <span className="text-sm text-muted-foreground group-hover:text-primary">{ind.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-3 pt-3 px-3 border-t border-border-solid/30 mt-2"><LanguageSwitch /><ThemeToggle /></div>
            <div className="px-3 pt-2">
              <Link to="/contact" onClick={() => setOpen(false)}><Button variant="hero" className="w-full">{c.nav.cta}</Button></Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};