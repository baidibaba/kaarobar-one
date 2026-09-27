"use client";

import { LanguageProvider } from "@/stores/languageStore";
import { LanguageSelector } from "./LanguageSelector";

export function LanguageSelectorExample() {
  return (
    <LanguageProvider>
      <div className="p-4">
        <LanguageSelector />
      </div>
    </LanguageProvider>
  );
}
