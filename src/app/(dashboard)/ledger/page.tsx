"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/Card";

export default function LedgerPage() {
  return (
    <MainLayout>
      <div className="space-y-4">
        <Card title="Ledger / روزنامچہ">
          <p className="text-gray-600">Daily ledger coming soon</p>
        </Card>
      </div>
    </MainLayout>
  );
}
