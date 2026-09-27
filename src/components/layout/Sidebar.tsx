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
  { href: "/settings", label: "Settings", labelUrdu: "سیٹنگز", icon: "⚙️" },
];

/**
 * Desktop sidebar navigation component.
 */
export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-30 h-full w-64 border-r border-gray-200 bg-white">
      <div className="flex h-full flex-col">
        <div className="border-b border-gray-200 p-4">
          <h1 className="text-xl font-bold text-primary-600">Kaarobar One</h1>
          <p className="text-xs text-gray-500">Business Management</p>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
