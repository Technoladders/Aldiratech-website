import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/hooks/useContent";
import { LanguageSwitch } from "./LanguageSwitch";
import { ThemeToggle } from "./ThemeToggle";
import { AldiraGlyph, GOLD, GOLD_SOFT, EMERALD, ON_DARK } from "@/assets/design/logo-marks";
import { useTheme } from "@/context/ThemeContext";

export const Navbar = () => {
  const { lang } = useLanguage();
  const c = useContent();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { resolved } = useTheme();
  const isDark = resolved === "dark";
  const primaryColor = isDark ? ON_DARK : EMERALD;
  const accentColor = isDark ? GOLD_SOFT : GOLD;

  const serviceLinks = c.services.items.slice(0, 6).map((s) => ({
    label: s.title,
    href: `/services/${s.slug}`,
  }));

  const industryLinks = c.industries.items.slice(0, 6).map((i) => ({
    label: i.title,
    href: `/industries#${i.slug}`,
  }));

  const mainNav = [
    { key: "services", label: c.nav.services, href: "/services", dropdown: serviceLinks },
    { key: "industries", label: c.nav.industries, href: "/industries", dropdown: industryLinks },
    { key: "solutions", label: c.nav.solutions, href: "/solutions" },
    { key: "about", label: c.nav.about, href: "/about" },
    { key: "contact", label: c.nav.contact, href: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const isActive = (href: string) =>
    location.pathname === href || (href !== "/" && location.pathname.startsWith(href));

  // Logo: on home page scroll to top, on inner pages go home
  const LogoEl = (
    <div className="flex items-center gap-0 shrink-0">
      {/* Exact same SVG + sizing as original Navbar */}
      <svg viewBox="0 0 200 200" className="w-14 h-14" aria-hidden="true">
        <AldiraGlyph primary={primaryColor} accent={accentColor} />
      </svg>
      <div className="leading-tight mt-2">
        <div className={`font-display font-bold text-primary text-2xl tracking-tight ${lang === "ar" ? "font-arabic" : ""}`}>
          {lang === "ar" ? <>ألديرا<span className="text-gold">تك</span></> : <>Aldira<span className="text-gold">tech</span></>}
        </div>
        <div className="text-[10px] uppercase tracking-[0.15em] font-bold text-foreground/80">
          ServiceNow Experts
        </div>
      </div>
    </div>
  );

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong border-b border-border-solid/60" : "bg-transparent"
      }`}
    >
      {/* Exact same container padding as original */}
      <div className="container mx-auto px-2 lg:px-4">
        <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "h-16" : "h-20"}`}>

          {/* Logo — same layout, but Link-aware */}
          {location.pathname === "/" ? (
            <a href="#home">{LogoEl}</a>
          ) : (
            <Link to="/">{LogoEl}</Link>
          )}

          {/* Center nav — same text-xs, same gap-0.5 as original */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {mainNav.map((item) => (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-0.5 px-2.5 py-2 text-xs font-medium transition-colors relative group whitespace-nowrap ${
                    isActive(item.href) ? "text-primary" : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 opacity-60 ${activeDropdown === item.key ? "rotate-180" : ""}`} />
                  )}
                  {/* Same gold underline as original hover */}
                  <span className={`absolute left-2.5 right-2.5 -bottom-0.5 h-px bg-gold transition-transform duration-500 origin-left ${
                    isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`} />
                </Link>

                {/* Dropdown panel */}
                {item.dropdown && activeDropdown === item.key && (
                  <div className="absolute top-full left-0 pt-2 w-56 z-50">
                    <div className="glass-strong rounded-2xl border border-border-solid overflow-hidden shadow-luxe">
                      {item.dropdown.map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          className="block px-4 py-2.5 text-xs text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors border-b border-border-solid/30 last:border-0"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right — exact same as original */}
          <div className="hidden lg:flex items-center gap-2">
            <LanguageSwitch />
            <ThemeToggle />
            <Link to="/contact">
              <Button variant="hero" size="sm" className="text-xs px-4 py-1.5 whitespace-nowrap">
                {c.nav.cta}
              </Button>
            </Link>
          </div>

          {/* Mobile toggle — exact same as original */}
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu — same spacing as original */}
        {open && (
          <div className="lg:hidden pb-6 space-y-2 animate-fade-up">
            {location.pathname !== "/" && (
              <Link to="/" className="block py-2 text-sm font-medium">{c.nav.home}</Link>
            )}
            {mainNav.map((item) => (
              <div key={item.key}>
                <Link
                  to={item.href}
                  className={`block py-2 text-sm font-medium ${isActive(item.href) ? "text-primary" : ""}`}
                >
                  {item.label}
                </Link>
                {item.dropdown && (
                  <div className="pl-4 space-y-1">
                    {item.dropdown.slice(0, 4).map((link) => (
                      <Link key={link.href} to={link.href} className="block py-1 text-xs text-muted-foreground hover:text-primary">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-3 pt-3">
              <LanguageSwitch />
              <ThemeToggle />
            </div>
            <Button variant="hero" className="w-full mt-3">{c.nav.cta}</Button>
          </div>
        )}
      </div>
    </header>
  );
};