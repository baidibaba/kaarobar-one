"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/ui/Icon";

const navItems: { href: string; label: string; labelUrdu: string; icon: IconName }[] = [
  { href: "/dashboard", label: "Home", labelUrdu: "ہوم", icon: "house" },
  { href: "/transactions", label: "Sale", labelUrdu: "بکری", icon: "shopping-bag" },
  { href: "/inventory", label: "Stock", labelUrdu: "سٹاک", icon: "package-2" },
  { href: "/people", label: "People", labelUrdu: "لوگ", icon: "users" },
  { href: "/ledger", label: "Ledger", labelUrdu: "لیجر", icon: "book-open" },
];

/**
 * Bottom navigation bar for mobile devices (Figma: Bottom Nav).
 */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white pb-[max(4px,env(safe-area-inset-bottom))] lg:hidden">
      <div className="flex items-center justify-between px-3 pt-2.5">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex w-[68px] flex-col items-center gap-1 rounded-2xl py-1.5",
                isActive ? "bg-primary-soft text-primary-600" : "text-gray-600"
              )}
            >
              <Icon name={item.icon} />
              <span dir="auto" className="text-sm font-extrabold">
                {item.labelUrdu}
              </span>
              <span className="text-[10px] font-semibold uppercase">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
