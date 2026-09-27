"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/Card";
import { useLanguage } from "@/stores/languageStore";

export default function ReportsPage() {
  const { t } = useLanguage();

  return (
    <MainLayout>
      <div className="space-y-4">
        <Card title={t("reports")}>
          <p className="text-gray-600">Reports and analytics coming soon</p>
        </Card>
      </div>
    </MainLayout>
  );
}
