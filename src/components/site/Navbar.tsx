import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitch } from "./LanguageSwitch";
import { ThemeToggle } from "./ThemeToggle";
import { AldiraGlyph, GOLD, GOLD_SOFT, EMERALD, ON_DARK } from "@/assets/design/logo-marks";
import { useTheme } from "@/context/ThemeContext"

export const Navbar = () => {
  const { t, lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { resolved } = useTheme();
const isDark = resolved === "dark";
const primaryColor = isDark ? ON_DARK : EMERALD;
const accentColor = isDark ? GOLD_SOFT : GOLD;

  const navItems = [
    { key: "home", href: "#home", label: t.nav.home },
    { key: "services", href: "#services", label: t.nav.services },
    { key: "industries", href: "#industries", label: t.nav.industries },
    { key: "solutions", href: "#solutions", label: t.nav.solutions },
    // { key: "cases", href: "#case-studies", label: t.nav.cases },
    { key: "about", href: "#about-us", label: t.nav.about },
    // { key: "insights", href: "#insights", label: t.nav.insights },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong border-b border-border-solid/60"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-2 lg:px-4">
        <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "h-16" : "h-20"}`}>
          {/* Logo */}
<a href="#" className="flex items-center gap-0 shrink-0">
  <svg viewBox="0 0 200 200" className="w-14 h-14" aria-hidden="true">
    <AldiraGlyph primary={primaryColor} accent={accentColor} />
  </svg>
  <div className="leading-tight mt-2">
    <div className={`font-display font-bold text-primary text-2xl tracking-tight ${lang === "ar" ? "font-arabic" : ""}`}>
      {lang === "ar" ? (
        <>ألديرا<span className="text-gold">تك</span></>
      ) : (
        <>Aldira<span className="text-gold">tech</span></>
      )}
    </div>
     <div className="text-[10px] uppercase tracking-[0.15em] font-bold text-foreground/80">
    ServiceNow Experts
  </div>
  {/* <div className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
    A K2 Partnering Company
  </div> */}
  </div>
</a>

          {/* Center nav */}
         <nav className="hidden lg:flex items-center gap-0.5">
  {navItems.map((item) => (
    <a
      key={item.key}
      href={item.href}
      className="px-2.5 py-2 text-xs font-medium text-foreground/80 hover:text-primary transition-colors relative group whitespace-nowrap"
    >
      {item.label}
      <span className="absolute left-2.5 right-2.5 -bottom-0.5 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </a>
  ))}
</nav>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-2">
  <LanguageSwitch />
  <ThemeToggle />
  <Button variant="hero" size="sm" className="text-xs px-4 py-1.5 whitespace-nowrap">{t.nav.cta}</Button>
</div>

          <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden pb-6 space-y-2 animate-fade-up">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-3 pt-3">
              <LanguageSwitch />
              <ThemeToggle />
            </div>
            <Button variant="hero" className="w-full mt-3">{t.nav.cta}</Button>
          </div>
        )}
      </div>
    </header>
  );
};
