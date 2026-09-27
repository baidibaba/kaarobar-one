"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Home", labelUrdu: "ہوم", icon: "🏠" },
  { href: "/transactions", label: "Sale", labelUrdu: "فروخت", icon: "🛒" },
  { href: "/inventory", label: "Stock", labelUrdu: "اسٹاک", icon: "📦" },
  { href: "/people", label: "People", labelUrdu: "لوگ", icon: "👥" },
  { href: "/reports", label: "Ledger", labelUrdu: "لیجر", icon: "📊" },
];

/**
 * Bottom navigation bar for mobile devices.
 */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-3 text-xs transition-colors",
                isActive ? "text-primary-600" : "text-gray-500 hover:text-gray-700"
              )}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
