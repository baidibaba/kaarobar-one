"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { translations } from "@/lib/i18n/translations";
import { Avatar } from "@/components/ui/Avatar";
import { Icon, type IconName } from "@/components/ui/Icon";
import type { User } from "@/db/schema";

interface NavLink {
  href: string;
  label: string;
  labelUrdu: string;
  icon: IconName;
}

interface NavGroup {
  label: string;
  labelUrdu: string;
  icon: IconName;
  children: { href: string; label: string }[];
}

// Order and grouping follow Figma "19 · Navigation Model": 5 daily links, 3 groups, then the rest.
const dailyLinks: NavLink[] = [
  { href: "/dashboard", label: "Home", labelUrdu: "ہوم", icon: "house" },
  { href: "/transactions", label: "Sale", labelUrdu: "بکری درج کریں", icon: "shopping-bag" },
  { href: "/ledger", label: "Ledger", labelUrdu: "روزنامچہ", icon: "book-open" },
  { href: "/inventory", label: "Stock", labelUrdu: "اسٹاک", icon: "package" },
  { href: "/people", label: "People/Khata", labelUrdu: "لوگ / کھاتہ", icon: "users" },
];

const groups: NavGroup[] = [
  {
    label: "Reports",
    labelUrdu: "رپورٹ",
    icon: "chart-no-axes-column",
    children: [
      { href: "/reports", label: "Sales overview" },
      { href: "/reports/item-profit", label: "Item profitability" },
      { href: "/reports/product-profit", label: "Product profit" },
      { href: "/reports/dead-stock", label: "Dead stock" },
      { href: "/labels", label: "Labels & printing" },
    ],
  },
  {
    label: "Staff & Wages",
    labelUrdu: "اسٹاف اور تنخوا",
    icon: "staff",
    children: [
      { href: "/staff/employees", label: "Employees" },
      { href: "/staff/attendance", label: "Attendance" },
      { href: "/staff/payroll", label: "Payroll" },
      { href: "/staff/advances", label: "Advances" },
      { href: "/staff/custody", label: "Goods in custody" },
    ],
  },
  {
    label: "Accounts",
    labelUrdu: "حسابات",
    icon: "wallet",
    children: [
      { href: "/accounts", label: "Chart of accounts" },
      { href: "/accounts/statement", label: "Account statement" },
      { href: "/accounts/pl", label: "Profit & loss" },
      { href: "/ledger", label: "Daily ledger" },
    ],
  },
];

const otherLinks: NavLink[] = [
  { href: "/cameras", label: "Cameras", labelUrdu: "کیمرے", icon: "camera" },
  { href: "/settings", label: "Settings", labelUrdu: "ترتیبات", icon: "settings" },
];

function SidebarLink({ item, isActive }: { item: NavLink; isActive: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex h-14 shrink-0 items-center gap-4 rounded-2xl px-5",
        isActive ? "bg-primary-soft text-primary-600" : "hover:bg-gray-50"
      )}
    >
      <span
        className={cn(
          "flex size-10 items-center justify-center rounded-xl",
          isActive ? "bg-primary-600 text-white" : "text-gray-600"
        )}
      >
        <Icon name={item.icon} />
      </span>
      <span className="flex flex-col gap-px whitespace-nowrap">
        <span dir="auto" className={cn("text-lg font-black", !isActive && "text-gray-900")}>
          {item.labelUrdu}
        </span>
        <span className={cn("text-[11px] font-bold", isActive ? "uppercase" : "text-gray-500")}>
          {item.label}
        </span>
      </span>
    </Link>
  );
}

function SidebarGroup({ group, pathname }: { group: NavGroup; pathname: string }) {
  const hasActiveChild = group.children.some((c) => pathname.startsWith(c.href));
  return (
    <details open={hasActiveChild} className="group shrink-0">
      <summary className="flex h-12 cursor-pointer list-none items-center gap-2 rounded-[14px] bg-surface-warm pl-3.5 pr-2 [&::-webkit-details-marker]:hidden">
        <span className="flex size-8 items-center justify-center text-gray-600">
          <Icon name={group.icon} className="size-5" />
        </span>
        <span className="flex flex-1 flex-col items-start whitespace-nowrap">
          <span dir="auto" className="text-[15px] font-bold text-gray-900">
            {group.labelUrdu}
          </span>
          <span className="text-[10px] font-medium text-gray-500">{group.label}</span>
        </span>
        <span aria-hidden className="text-lg font-bold text-gray-400 transition-transform group-open:-rotate-90">
          ‹
        </span>
      </summary>
      <div className="flex flex-col py-1 pl-14">
        {group.children.map((child) => (
          <Link
            key={child.href + child.label}
            href={child.href}
            className={cn(
              "rounded-lg px-2 py-2 text-sm font-semibold",
              pathname.startsWith(child.href) ? "text-primary-600" : "text-gray-600 hover:bg-gray-50"
            )}
          >
            {child.label}
          </Link>
        ))}
      </div>
    </details>
  );
}

/**
 * Desktop sidebar navigation (Figma: Desktop Sidebar, 280px).
 */
export function Sidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-full w-[280px] flex-col gap-4 border-r border-stone-200 bg-white p-5 lg:flex">
      <div className="flex items-center gap-[5px] border-b border-stone-200 pb-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-mark.svg" alt="" width={56} height={56} />
        <span className="text-5xl font-black tracking-[-0.01em] text-accent-logo">1</span>
        <span className="flex w-[66px] flex-col gap-1 text-primary-600">
          <span dir="auto" className="text-right text-2xl font-bold">کاروبار</span>
          <span className="text-sm font-semibold tracking-[-0.01em]">Kaarobar</span>
        </span>
      </div>

      {/* Groups expand in place; the list scrolls so the daily links are never pushed off. */}
      <nav className="-mx-1 flex flex-1 flex-col gap-1 overflow-y-auto px-1">
        {dailyLinks.map((item) => (
          <SidebarLink key={item.href} item={item} isActive={isActive(item.href)} />
        ))}
        {groups.map((group) => (
          <SidebarGroup key={group.label} group={group} pathname={pathname} />
        ))}
        {otherLinks.map((item) => (
          <SidebarLink key={item.href} item={item} isActive={isActive(item.href)} />
        ))}
      </nav>

      <div className="flex items-center gap-3 border-t border-stone-200 pt-4">
        <span className="rounded-full border-2 border-primary-600">
          <Avatar src={user.avatar} name={user.name} />
        </span>
        <span className="flex min-w-0 flex-col items-start gap-px">
          <span dir="auto" className="truncate text-[15px] font-extrabold text-gray-900">
            {user.nameUrdu || user.name}
          </span>
          <span className="text-xs font-semibold text-gray-600">
            {translations.en[user.role]} / {translations.ur[user.role]}
          </span>
        </span>
      </div>
    </aside>
  );
}
