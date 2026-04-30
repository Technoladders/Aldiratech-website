import { useTheme, type Theme } from "@/context/ThemeContext";
import { Sun, Moon, Monitor } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const options: { value: Theme; icon: typeof Sun }[] = [
  { value: "light", icon: Sun },
  { value: "system", icon: Monitor },
  { value: "dark", icon: Moon },
];

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const labels: Record<Theme, string> = {
    light: t.theme.light,
    dark: t.theme.dark,
    system: t.theme.system,
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-full p-1 glass" role="group" aria-label="Theme">
      {options.map((opt) => {
        const Icon = opt.icon;
        const active = theme === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            aria-label={labels[opt.value]}
            aria-pressed={active}
            className={`relative h-8 w-8 rounded-full flex items-center justify-center transition-all duration-500 ${
              active
                ? "bg-primary text-primary-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
          </button>
        );
      })}
    </div>
  );
};
