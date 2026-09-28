"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db, type User } from "@/db/schema";
import { translations } from "@/lib/i18n/translations";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { Loading } from "@/components/ui/Loading";
import { Logo } from "@/components/ui/Logo";

interface UserSelectionProps {
  onSelect: (user: User) => void;
}

/**
 * "Who is working today?" screen (Figma: 01 · user-selection).
 * Displays all active users as tappable cards.
 */
export function UserSelection({ onSelect }: UserSelectionProps) {
  const users = useLiveQuery(() => db.users.filter((u) => u.isActive).toArray());

  if (!users) return <Loading message="Loading..." />;

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-stone-200 bg-white px-5 py-3">
        <Logo />
      </header>

      <div className="flex flex-col items-center gap-2 bg-primary-soft px-5 py-6 text-center">
        <h1 dir="auto" className="text-[28px] font-black text-primary-600">
          کون کام کر رہا ہے؟
        </h1>
        <p className="text-base font-bold text-gray-600">Who is Working Today?</p>
        <span aria-hidden className="h-1 w-[60px] rounded-sm bg-primary-600" />
      </div>

      <div className="grid flex-1 auto-rows-min grid-cols-2 gap-5 p-5">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => onSelect(user)}
            className="group flex flex-col items-center gap-3 rounded-3xl border border-stone-200 bg-white p-4 drop-shadow-[0_4px_6px_rgba(0,0,0,0.04)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
          >
            <span className="rounded-full border-[3px] border-stone-200 group-hover:border-primary-600 group-focus-visible:border-primary-600">
              <Avatar name={user.name} src={user.avatar} size="xl" />
            </span>
            <span className="flex flex-col items-center gap-0.5">
              <span dir="auto" className="text-lg font-black text-gray-900">
                {user.nameUrdu || user.name}
              </span>
              <span className="text-xs font-semibold text-gray-600">
                {user.name} ({translations.en[user.role]})
              </span>
            </span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 bg-white p-5">
        <Icon name="mouse-pointer" className="size-8 text-accent-600" />
        <div className="flex flex-col">
          <p dir="auto" className="text-base font-extrabold text-gray-900">
            اپنے نام اور تصویر پر کلک کریں۔
          </p>
          <p className="text-xs font-semibold text-gray-600">Tap your photo to log in.</p>
        </div>
      </div>
    </div>
  );
}
