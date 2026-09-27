"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/stores/languageStore";

interface PinInputProps {
  userId: string;
  onSuccess: (userId: string) => void;
  onBack: () => void;
}

/**
 * PIN input component with numpad for user authentication.
 */
export function PinInput({ userId, onSuccess, onBack }: PinInputProps) {
  const { t } = useLanguage();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleKeyPress = (key: string) => {
    if (key === "del") {
      setPin((prev) => prev.slice(0, -1));
    } else if (pin.length < 4) {
      const newPin = pin + key;
      setPin(newPin);
      if (newPin.length === 4) {
        // TODO: Verify PIN against stored hash
        onSuccess(userId);
      }
    }
    setError("");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-center text-xl font-bold text-gray-900">
        {t("enterPin")}
      </h2>
      <div className="flex justify-center gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-4 w-4 rounded-full border-2 ${
              i < pin.length ? "border-primary-600 bg-primary-600" : "border-gray-300"
            }`}
          />
        ))}
      </div>
      {error && <p className="text-center text-sm text-red-500">{error}</p>}
      <div className="mx-auto grid max-w-[280px] grid-cols-3 gap-3">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"].map((key) =>
          key === "" ? (
            <div key="empty" />
          ) : (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              className="flex h-16 items-center justify-center rounded-full bg-gray-100 text-2xl font-medium text-gray-900 transition-colors hover:bg-gray-200 active:bg-gray-300"
            >
              {key === "del" ? "⌫" : key}
            </button>
          )
        )}
      </div>
      <div className="flex justify-center">
        <Button variant="ghost" onClick={onBack}>
          {t("back")}
        </Button>
      </div>
    </div>
  );
}
