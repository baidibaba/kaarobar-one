"use client";

import { useCallback, useEffect, useState } from "react";
import type { User } from "@/db/schema";
import { cn } from "@/lib/utils";
import { translations } from "@/lib/i18n/translations";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";

const PIN_LENGTH = 4;
const DIGITS = [
  ["1", "۱"], ["2", "۲"], ["3", "۳"],
  ["4", "۴"], ["5", "۵"], ["6", "۶"],
  ["7", "۷"], ["8", "۸"], ["9", "۹"],
];
const keyClass =
  "flex h-[60px] flex-col items-center justify-center gap-0.5 rounded-2xl border border-stone-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600";

interface PinInputProps {
  user: User;
  onSuccess: (userId: string) => void;
  onBack: () => void;
}

/**
 * PIN entry with numpad (Figma: 01 · pin-entry). Also accepts keyboard digits, Backspace and Enter.
 */
export function PinInput({ user, onSuccess, onBack }: PinInputProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const press = useCallback((key: string) => {
    setError(false);
    setPin((prev) => (prev.length < PIN_LENGTH ? prev + key : prev));
  }, []);

  const backspace = useCallback(() => {
    setError(false);
    setPin((prev) => prev.slice(0, -1));
  }, []);

  // ponytail: plaintext compare against the stored PIN; hash it when the users table gets a migration.
  const confirm = useCallback(() => {
    if (pin.length !== PIN_LENGTH) return;
    if (pin === user.pin) return onSuccess(user.id);
    setError(true);
    setPin("");
  }, [pin, user, onSuccess]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) press(e.key);
      else if (e.key === "Backspace") backspace();
      else if (e.key === "Enter") confirm();
      else return;
      e.preventDefault(); // stop Enter/Space also "clicking" the focused numpad button
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [press, backspace, confirm]);

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center gap-3 border-b border-stone-200 bg-white px-5 py-3">
        <button
          onClick={onBack}
          aria-label="Back / واپس"
          className="flex size-11 items-center justify-center rounded-full bg-surface-warm text-gray-900"
        >
          <Icon name="chevron-left" />
        </button>
        <div className="flex flex-col gap-0.5">
          <h1 dir="auto" className="text-xl font-extrabold text-primary-600">پن درج کریں</h1>
          <p className="text-xs font-semibold uppercase text-gray-600">Enter PIN</p>
        </div>
      </header>

      <div className="flex items-center gap-4 bg-primary-soft px-5 py-4">
        <span className="rounded-full border-2 border-primary-600">
          <Avatar name={user.name} src={user.avatar} size="lg" />
        </span>
        <div className="flex flex-col items-start gap-0.5">
          <p dir="auto" className="text-xl font-black text-primary-600">{user.nameUrdu || user.name}</p>
          <p className="text-sm font-semibold text-gray-600">
            {user.name} ({translations.en[user.role]})
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 bg-white py-6">
        <p dir="auto" className="text-lg font-extrabold text-gray-600">اپنا 4 ہندسوں کا پن درج کریں</p>
        <div className="flex gap-2" aria-label={`${pin.length} of ${PIN_LENGTH} digits entered`}>
          {Array.from({ length: PIN_LENGTH }, (_, i) => (
            <span
              key={i}
              className={cn(
                "size-5 rounded-full border-2",
                error ? "border-red-600" : "border-gray-900",
                i < pin.length && "bg-gray-900"
              )}
            />
          ))}
        </div>
        <p role="alert" dir="auto" className="min-h-5 text-sm font-bold text-red-600">
          {error && "غلط پن، دوبارہ کوشش کریں / Wrong PIN, try again"}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-x-2 gap-y-4 bg-white p-3">
        {DIGITS.map(([digit, urdu]) => (
          <button key={digit} onClick={() => press(digit)} className={cn(keyClass, "bg-white")}>
            <span className="text-2xl font-extrabold text-gray-900">{digit}</span>
            <span className="text-[10px] font-semibold text-gray-600">{urdu}</span>
          </button>
        ))}
        <button onClick={backspace} aria-label="Delete / مٹائیں" className={cn(keyClass, "bg-white text-red-600")}>
          <Icon name="arrow-left" className="size-7" />
        </button>
        <button onClick={() => press("0")} className={cn(keyClass, "bg-white")}>
          <span className="text-2xl font-extrabold text-gray-900">0</span>
          <span className="text-[10px] font-semibold text-gray-600">۰</span>
        </button>
        <button
          onClick={confirm}
          disabled={pin.length !== PIN_LENGTH}
          aria-label="Confirm / تصدیق کریں"
          className={cn(keyClass, "bg-primary-600 text-white disabled:opacity-50")}
        >
          <Icon name="check-circle" className="size-7" />
        </button>
      </div>
    </div>
  );
}
