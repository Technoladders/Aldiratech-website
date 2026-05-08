import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Youtube, MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/hooks/useContent";
import { AldiraGlyph, GOLD, GOLD_SOFT, EMERALD, ON_DARK } from "@/assets/design/logo-marks";
import { useTheme } from "@/context/ThemeContext";
import AldiraLogo from "@/assets/Aldira_logo.png";


export const Footer = () => {
  const { lang } = useLanguage();
  const c = useContent();
  const isAr = lang === "ar";
  const { resolved } = useTheme();
  const isDark = resolved === "dark";
  const primaryColor = isDark ? ON_DARK : EMERALD;
  const accentColor = isDark ? GOLD_SOFT : GOLD;
  const t = c.footer;

  return (
    <footer className="bg-surface/70 border-t border-border-solid pt-20 pb-8">
      <div className="container mx-auto px-6 lg:px-10">
        {/* Exact same lg:grid-cols-12 grid as original — brand=4, office=3, certs=2, newsletter=3 */}
        <div className="grid lg:grid-cols-12 gap-12 mb-16">

          {/* Brand — exact same SVG size/gap/wordmark as original Footer */}
          <div className="lg:col-span-4">
                       {location.pathname === "/" ? (
              <a href="#home" className="shrink-0">
                <img src={AldiraLogo} alt="Aldiratech" className="h-14 w-auto object-contain" />
              </a>
            ) : (
              <Link to="/" className="shrink-0">
                <img src={AldiraLogo} alt="Aldiratech" className="h-24 w-auto object-contain" />
              </Link>
            )}
            <p className={`text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm ${isAr ? "font-arabic" : ""}`}>
              {t.tagline}
            </p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Office — same as original */}
          <div className="lg:col-span-3">
            <div className={`text-xs uppercase tracking-[0.2em] text-foreground font-semibold mb-5 ${isAr ? "font-arabic normal-case tracking-normal text-sm" : ""}`}>
              {t.office}
            </div>
            <ul className={`space-y-3 text-sm text-muted-foreground ${isAr ? "font-arabic" : ""}`}>
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" /> {t.address}
              </li>
              {/* <li className="flex gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-primary shrink-0" /> +966 11 416 9366
              </li> */}
              <li className="flex gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-primary shrink-0" /> info@aldiratech.com
              </li>
            </ul>
            {/* Added page links beneath office info — fits in the same col */}
            {/* <div className="mt-8">
              <div className={`text-xs uppercase tracking-[0.2em] text-foreground font-semibold mb-4 ${isAr ? "font-arabic normal-case tracking-normal text-sm" : ""}`}>
                {isAr ? "روابط سريعة" : "Quick Links"}
              </div>
              <ul className="space-y-2">
                {[
                  { label: isAr ? "من نحن" : "About Us", href: "/about" },
                  { label: isAr ? "الحلول" : "Solutions", href: "/solutions" },
                  { label: isAr ? "القطاعات" : "Industries", href: "/industries" },
                  { label: isAr ? "الأسئلة الشائعة" : "FAQ", href: "/faq" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className={`text-sm text-muted-foreground hover:text-primary transition-colors ${isAr ? "font-arabic" : ""}`}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div> */}
          </div>

          {/* Certifications — same as original */}
          <div className="lg:col-span-2">
            <div className={`text-xs uppercase tracking-[0.2em] text-foreground font-semibold mb-5 ${isAr ? "font-arabic normal-case tracking-normal text-sm" : ""}`}>
              {t.certs}
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {t.certsList.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </div>

          {/* Newsletter — exact same as original */}
          <div className="lg:col-span-3">
            <div className={`text-xs uppercase tracking-[0.2em] text-foreground font-semibold mb-5 ${isAr ? "font-arabic normal-case tracking-normal text-sm" : ""}`}>
              {t.stay}
            </div>
            <p className={`text-sm text-muted-foreground mb-4 ${isAr ? "font-arabic" : ""}`}>{t.stayDesc}</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                aria-label={t.emailPlaceholder}
                placeholder={t.emailPlaceholder}
                className={`flex-1 h-11 px-4 rounded-full bg-background border border-border-solid text-sm focus:outline-none focus:border-primary transition-colors ${isAr ? "font-arabic" : ""}`}
              />
              <Button variant="hero" size="icon" className="h-11 w-11 rounded-full shrink-0" aria-label="Subscribe">
                <ArrowRight className="w-4 h-4 rtl-flip" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom bar — same as original */}
        <div className={`pt-8 border-t border-border-solid flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground ${isAr ? "font-arabic" : ""}`}>
          <div>© {new Date().getFullYear()} {isAr ? "ألديراتك" : "Aldiratech"}. {t.rights}</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">{t.privacy}</a>
            <a href="#" className="hover:text-primary transition-colors">{t.terms}</a>
            <Link to="/contact" className="hover:text-primary transition-colors">
              {isAr ? "تواصل معنا" : "Contact"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};