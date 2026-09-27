"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { translations, type TranslationKey } from "@/lib/i18n/translations";

/**
 * Language display options for the app.
 * - "both": Show English and Urdu together
 * - "en": Show only English
 * - "ur": Show only Urdu
 */
export type LanguageOption = "both" | "en" | "ur";

interface LanguageContextType {
  language: LanguageOption;
  setLanguage: (lang: LanguageOption) => void;
  t: (key: TranslationKey) => string;
  isUrduEnabled: boolean;
  isEnglishEnabled: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "kaarobar_language";

/**
 * Provides language context to the app.
 * Manages language selection, persistence, and translation.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageOption>("both");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as LanguageOption | null;
    if (saved && ["both", "en", "ur"].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: LanguageOption) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const t = (key: TranslationKey): string => {
    const en = translations.en[key];
    const ur = translations.ur[key];

    if (language === "both") return `${en} / ${ur}`;
    if (language === "ur") return ur;
    return en;
  };

  const isUrduEnabled = language === "both" || language === "ur";
  const isEnglishEnabled = language === "both" || language === "en";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isUrduEnabled, isEnglishEnabled }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook to access language context.
 * Returns current language, setter, translation function, and language flags.
 *
 * @throws {Error} If used outside LanguageProvider
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
