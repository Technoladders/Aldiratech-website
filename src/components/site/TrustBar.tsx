import { useLanguage } from "@/context/LanguageContext";
import k2Logo from "@/assets/client/k2-partnering-solutions-logo.svg";
import visionLogo from "@/assets/client/saudi-vision-2030.png";
import serviceNowLogo from "@/assets/client/Servicenow-logo.avif";
import sabicLogo from "@/assets/client/SABIC_Logo.png";
import stcLogo from "@/assets/client/stc-Group.svg";
import mohLogo from "@/assets/client/Saudi Ministry Of Health Logo.svg.png";

const partners = [
  { name: "K2 Partnering", logo: k2Logo },
  { name: "Vision 2030", logo: visionLogo },
  { name: "ServiceNow", logo: serviceNowLogo },
  { name: "SABIC", logo: sabicLogo },
  { name: "STC", logo: stcLogo },
  { name: "Ministry of Health", logo: mohLogo },
];

export const TrustBar = () => {
  const { t, lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <section className="py-14 lg:py-20 border-y border-border-solid bg-surface/60 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-[700px] h-[700px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[700px] h-[700px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-10">
        <div className="text-center mb-8">
          <p className={`text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium ${isAr ? "font-arabic normal-case tracking-normal text-sm" : ""}`}>
            {t.trust.eyebrow}
          </p>
          <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        </div>

<div
  className="glass-strong rounded-3xl p-6 lg:p-8 relative"
  style={{
    maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
  }}
>

          <div className="flex animate-marquee gap-16 items-center">
            {[...partners, ...partners].map((partner, i) => (
              <div key={`${partner.name}-${i}`} className="shrink-0 flex items-center justify-center h-20">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-16 max-w-[140px] object-contain opacity-90 brightness-110 contrast-125 saturate-150"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* <div className="text-center mt-6">
          <p className={`text-[11px] text-muted-foreground/50 ${isAr ? "font-arabic" : "tracking-wider uppercase"}`}>
            {lang === "ar"
              ? "موثوقون من قبل قادة القطاع في المملكة العربية السعودية"
              : "Trusted by industry leaders across Saudi Arabia"}
          </p>
        </div> */}
      </div>
    </section>
  );
};