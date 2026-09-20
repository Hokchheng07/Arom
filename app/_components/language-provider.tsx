"use client";

import { Languages } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "en" | "km";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const easeOut = [0.23, 1, 0.32, 1] as const;

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const changeLanguage = useCallback((nextLanguage: Language) => {
    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage === "km" ? "km" : "en";
    document.documentElement.dataset.language = nextLanguage;
    window.localStorage.setItem("arom-language", nextLanguage);
  }, []);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("arom-language");
    if (savedLanguage === "en" || savedLanguage === "km") {
      const timeout = window.setTimeout(() => changeLanguage(savedLanguage), 0);
      return () => window.clearTimeout(timeout);
    }
  }, [changeLanguage]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}

export function LanguageSwitcher({
  className = "",
  inline = true,
}: {
  className?: string;
  inline?: boolean;
}) {
  const { language, setLanguage } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const containerClass = inline
    ? `language-switcher inline-flex items-center gap-1 rounded-full border border-arom-border bg-white p-1 shadow-sm ${className}`
    : `language-switcher fixed bottom-[5.6rem] right-4 z-40 flex items-center gap-1 rounded-full border border-arom-border bg-white/95 p-1 shadow-[0_10px_30px_rgba(20,68,57,0.14)] backdrop-blur-xl lg:bottom-6 lg:right-6 ${className}`;

  return (
    <div className={containerClass}>
      <Languages aria-hidden="true" size={16} className="ml-2 mr-1 text-arom" />
      <div role="group" aria-label="Choose language" className="relative grid grid-cols-2">
        <motion.span
          aria-hidden="true"
          animate={{ transform: language === "en" ? "translateX(0%)" : "translateX(100%)" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: easeOut }}
          className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-arom"
        />
        {(["en", "km"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setLanguage(option)}
            aria-pressed={language === option}
            className={`relative z-10 min-w-12 rounded-full px-3 py-2 text-xs font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom ${
              language === option ? "text-white" : "text-ink-muted hover:text-arom"
            } ${option === "km" ? "font-khmer" : ""}`}
          >
            {option === "en" ? "EN" : "ខ្មែរ"}
          </button>
        ))}
      </div>
    </div>
  );
}
