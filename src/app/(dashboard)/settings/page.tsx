"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/Card";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/stores/languageStore";

export default function SettingsPage() {
  const { t } = useLanguage();

  return (
    <MainLayout>
      <div className="space-y-4">
        <Card title={t("settings")}>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Language
              </label>
              <LanguageSelector />
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
