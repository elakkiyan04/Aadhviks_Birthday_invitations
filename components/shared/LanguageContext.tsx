"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language } from "@/types/birthday";
import { translations, getTranslation } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "elora_invitation_language";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = sessionStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved === "en" || saved === "ta") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, lang);
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "ta" : "en";
    setLanguage(nextLang);
  };

  const t = getTranslation(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      <div className={language === "ta" ? "font-tamil" : "font-sans"}>{children}</div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageSwitcherPill: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center p-1 rounded-full bg-deep-night/80 border border-antique-gold/40 shadow-lg backdrop-blur-md transition-all ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
          language === "en"
            ? "bg-gradient-to-r from-antique-gold to-gold-dark text-deep-night shadow-md"
            : "text-ivory-cream/70 hover:text-ivory-cream"
        }`}
      >
        English
      </button>
      <button
        type="button"
        onClick={() => setLanguage("ta")}
        className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider font-tamil transition-all duration-300 ${
          language === "ta"
            ? "bg-gradient-to-r from-antique-gold to-gold-dark text-deep-night shadow-md"
            : "text-ivory-cream/70 hover:text-ivory-cream"
        }`}
      >
        தமிழ்
      </button>
    </div>
  );
};

