"use client";

import { LanguageSelector } from "@/components/LanguageSelector";

/**
 * Layout for authentication pages (login, onboarding).
 */
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <LanguageSelector />
        </div>
        {children}
      </div>
    </div>
  );
}
