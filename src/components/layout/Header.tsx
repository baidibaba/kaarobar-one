"use client";

import { useLanguage } from "@/stores/languageStore";
import { Avatar } from "@/components/ui/Avatar";

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
}

/**
 * Header component with app title and user info.
 */
export function Header({ userName, userAvatar }: HeaderProps) {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-lg font-bold text-primary-600">{t("appName")}</h1>
        {userName && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">{userName}</span>
            <Avatar src={userAvatar} name={userName} size="sm" />
          </div>
        )}
      </div>
    </header>
  );
}
