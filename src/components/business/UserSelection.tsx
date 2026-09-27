"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/schema";
import { Avatar } from "@/components/ui/Avatar";
import { Loading } from "@/components/ui/Loading";
import { useLanguage } from "@/stores/languageStore";

interface UserSelectionProps {
  onSelect: (userId: string) => void;
}

/**
 * User selection grid component for onboarding.
 * Displays all active users as tappable cards.
 */
export function UserSelection({ onSelect }: UserSelectionProps) {
  const { t } = useLanguage();
  const users = useLiveQuery(() => db.users.where("isActive").equals(1).toArray()) ?? [];

  if (!users) return <Loading message={t("loading")} />;

  return (
    <div className="space-y-6">
      <h2 className="text-center text-xl font-bold text-gray-900">
        {t("whoIsWorking")}
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => onSelect(user.id)}
            className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-primary-300 hover:shadow-md"
          >
            <Avatar name={user.name} src={user.avatar} size="lg" />
            <span className="text-sm font-medium text-gray-900">{user.name}</span>
            <span className="text-xs text-gray-500">{t(user.role)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
