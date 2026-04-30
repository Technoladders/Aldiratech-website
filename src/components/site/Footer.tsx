import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Youtube, MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { AldiraGlyph, GOLD, GOLD_SOFT, EMERALD, ON_DARK } from "@/assets/design/logo-marks";
import { useTheme } from "@/context/ThemeContext"
import certification from "@/assets/certification-logo-all.png";

export const Footer = () => {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";
    const { resolved } = useTheme();
const isDark = resolved === "dark";
const primaryColor = isDark ? ON_DARK : EMERALD;
const accentColor = isDark ? GOLD_SOFT : GOLD;

  return (
    <footer className="bg-surface/70 border-t border-border-solid pt-20 pb-8">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-4">
              <div className="flex items-center gap-0 mb-6">
  <svg viewBox="0 0 200 200" className="w-16 h-16 shrink-0" aria-hidden="true">
    <AldiraGlyph primary={primaryColor} accent={accentColor} />
  </svg>

  <div className="leading-tight mt-4">
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
</div>
            <p className={`text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm ${isAr ? "font-arabic" : ""}`}>
              {t.footer.tagline}
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

          {/* Office */}
          <div className="lg:col-span-3">
            <div className={`text-xs uppercase tracking-[0.2em] text-foreground font-semibold mb-5 ${isAr ? "font-arabic normal-case tracking-normal text-sm" : ""}`}>
              {t.footer.office}
            </div>
            <ul className={`space-y-3 text-sm text-muted-foreground ${isAr ? "font-arabic" : ""}`}>
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" /> {t.footer.address}
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-primary shrink-0" /> +966 11 416 9366
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-primary shrink-0" /> hello@aldiratech.com
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div className="lg:col-span-2">
            <div className={`text-xs uppercase tracking-[0.2em] text-foreground font-semibold mb-5 ${isAr ? "font-arabic normal-case tracking-normal text-sm" : ""}`}>
              {t.footer.certs}
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {t.footer.certsList.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <div className={`text-xs uppercase tracking-[0.2em] text-foreground font-semibold mb-5 ${isAr ? "font-arabic normal-case tracking-normal text-sm" : ""}`}>
              {t.footer.stay}
            </div>
            <p className={`text-sm text-muted-foreground mb-4 ${isAr ? "font-arabic" : ""}`}>{t.footer.stayDesc}</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                aria-label={t.footer.emailPlaceholder}
                placeholder={t.footer.emailPlaceholder}
                className={`flex-1 h-11 px-4 rounded-full bg-background border border-border-solid text-sm focus:outline-none focus:border-primary transition-colors ${isAr ? "font-arabic" : ""}`}
              />
              <Button variant="hero" size="icon" className="h-11 w-11 rounded-full shrink-0" aria-label="Subscribe">
                <ArrowRight className="w-4 h-4 rtl-flip" />
              </Button>
            </form>
          </div>
        </div>

        <div className={`pt-8 border-t border-border-solid flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground ${isAr ? "font-arabic" : ""}`}>
          <div>© {new Date().getFullYear()} {isAr ? "ألديراتك" : "Aldiratech"}. {t.footer.rights}</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-primary transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
