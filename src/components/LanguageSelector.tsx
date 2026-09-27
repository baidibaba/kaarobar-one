"use client";

import { useLanguage, type LanguageOption } from "@/stores/languageStore";

const options: { value: LanguageOption; label: string; labelUrdu: string }[] = [
  { value: "both", label: "Both", labelUrdu: "دونوں" },
  { value: "en", label: "English", labelUrdu: "انگریزی" },
  { value: "ur", label: "Urdu", labelUrdu: "اردو" },
];

/**
 * Language selector component with 3 options: Both, English only, Urdu only.
 * Uses the language context to get and set the current language.
 */
export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setLanguage(option.value)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            language === option.value
              ? "bg-primary-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
