import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface StatCounterProps {
  value: string;
  label: string;
  className?: string;
}

export const StatCounter = ({ value, label, className = "" }: StatCounterProps) => {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <div className={`font-display font-bold text-4xl md:text-5xl text-primary animate-count-glow transition-all duration-700 ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}`}>
        {value}
      </div>
      <div className={`text-sm text-muted-foreground mt-2 uppercase tracking-wider ${isAr ? "font-arabic normal-case tracking-normal" : ""}`}>
        {label}
      </div>
    </div>
  );
};