"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/Card";
import { useLanguage } from "@/stores/languageStore";

export default function TransactionsPage() {
  const { t } = useLanguage();

  return (
    <MainLayout>
      <div className="space-y-4">
        <Card title={t("transactions")}>
          <p className="text-gray-600">Transaction management coming soon</p>
        </Card>
      </div>
    </MainLayout>
  );
}
