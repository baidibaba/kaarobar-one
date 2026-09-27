"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/Card";
import { useLanguage } from "@/stores/languageStore";

export default function DashboardPage() {
  const { t } = useLanguage();

  return (
    <MainLayout>
      <div className="space-y-4">
        <Card>
          <h2 className="text-xl font-bold text-gray-900">{t("dashboard")}</h2>
          <p className="mt-2 text-gray-600">Welcome to Kaarobar One</p>
        </Card>
      </div>
    </MainLayout>
  );
}
