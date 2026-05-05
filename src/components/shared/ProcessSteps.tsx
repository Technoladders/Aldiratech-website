import { useLanguage } from "@/context/LanguageContext";
import { useStaggerReveal } from "@/hooks/useScrollReveal";

interface Step { step: string; title: string; desc: string; }

export const ProcessSteps = ({ steps, title }: { steps: Step[]; title?: string }) => {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const ref = useStaggerReveal(0.1);

  return (
    <div>
      {title && (
        <h3 className={`font-display font-bold text-2xl mb-8 ${isAr ? "font-arabic" : ""}`}>{title}</h3>
      )}
      <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <div key={s.step} className="reveal-scale relative">
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-primary/40 to-transparent z-0 -translate-x-3" />
            )}
            <div className="glass rounded-2xl p-6 gold-edge hover:-translate-y-1 hover:shadow-luxe transition-all duration-500 relative z-10 h-full">
              <div className="w-12 h-12 rounded-xl gradient-emerald flex items-center justify-center mb-4 shadow-soft">
                <span className="font-display font-bold text-white text-lg">{s.step}</span>
              </div>
              <h4 className={`font-display font-semibold text-base mb-2 ${isAr ? "font-arabic" : ""}`}>{s.title}</h4>
              <p className={`text-sm text-muted-foreground leading-relaxed ${isAr ? "font-arabic" : ""}`}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};