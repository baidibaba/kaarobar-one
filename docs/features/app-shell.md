# App Shell (Navigation)

## Status
- **Status:** In Review ([PR #1](https://github.com/baidibaba/kaarobar-one/pull/1))
- **Version:** 0.3.0
- **Author:** Muhammad Osama
- **Date:** 2026-09-27
- **Branch:** `feature/app-shell`

## Overview

The shared frame every dashboard page renders inside: a bottom nav on phones and a sidebar on desktop. It is built from the Figma **Components** page (Bottom Nav, Sidebar Link, Desktop Sidebar) and the **19 · Navigation Model** section. It was built first so both developers can build feature pages without touching navigation.

## Requirements
- [x] Bottom nav with 5 tabs (Home, Sale, Stock, People, Ledger), Urdu + English labels
- [x] Desktop sidebar: 5 daily links, 3 collapsible groups, Cameras, Settings, logged-in user
- [x] Only one navigation visible at a time (bottom nav below `lg`, sidebar at `lg` and up)
- [x] Icons match Figma exactly and change colour with active state
- [ ] "باقی" (pending) badge on Staff & Wages, which needs attendance data (Phase: Attendance)

## Technical Design

### Database Changes
None.

### API Changes
None.

### UI Changes

| File | Change |
|------|--------|
| `src/components/layout/BottomNav.tsx` | Rebuilt to Figma Bottom Nav. Hidden at `lg`+ |
| `src/components/layout/Sidebar.tsx` | Rebuilt to Figma Desktop Sidebar. Takes `user` prop. Hidden below `lg` |
| `src/components/layout/MainLayout.tsx` | Passes `user` to Sidebar, `lg:pl-[280px]` content offset |
| `src/components/layout/Header.tsx` | Hidden at `lg`+ (sidebar already shows logo and user) |
| `src/components/ui/Icon.tsx` | **New.** Renders `public/icons/*.svg` via CSS mask so icons take `currentColor` |
| `src/components/ui/Logo.tsx` | **New.** Figma `Logo/KaarobarOne` (added in the onboarding branch, used by Sidebar) |
| `src/app/(dashboard)/ledger/page.tsx` | **New** placeholder. Figma treats Ledger (روزنامچہ) as separate from Reports |
| `tailwind.config.ts` | New tokens: `primary-soft` `#e8f5ec`, `surface-warm` `#faf7f2`, `accent-logo` `#f2a626` |
| `public/icons/`, `public/logo-mark.svg` | Figma SVGs, unmodified |

### Navigation map

These URLs are the agreed addresses for pages still to be built. Links to unbuilt pages return 404 until their phase lands.

| Nav item | Route | Page exists? |
|----------|-------|--------------|
| Home / ہوم | `/dashboard` | Yes (placeholder) |
| Sale / بکری | `/transactions` | Yes (placeholder) |
| Ledger / روزنامچہ | `/ledger` | Yes (placeholder) |
| Stock / اسٹاک | `/inventory` | Yes (placeholder) |
| People/Khata / لوگ / کھاتہ | `/people` | Yes (placeholder) |
| **Reports** group | `/reports`, `/reports/item-profit`, `/reports/product-profit`, `/reports/dead-stock`, `/labels` | `/reports` only |
| **Staff & Wages** group | `/staff/employees`, `/staff/attendance`, `/staff/payroll`, `/staff/advances`, `/staff/custody` | No |
| **Accounts** group | `/accounts`, `/accounts/statement`, `/accounts/pl`, `/ledger` (Daily ledger) | `/ledger` only |
| Cameras / کیمرے | `/cameras` | No |
| Settings / ترتیبات | `/settings` | Yes (placeholder) |

Group children come from the Figma menus `menu-desktop-reports`, `menu-desktop-staff` and `menu-desktop-accounts` (section 22).

### Differences from Figma (deliberate)

| Figma | Built | Why |
|-------|-------|-----|
| Active sidebar icon grey (`#4B5563`) on green | White on green | Grey on `#1a5f35` is unreadable |
| Group menus shown as popups | Native `<details>` expanding in place | Navigation Model says groups expand in place and the list scrolls |
| iOS status bar / home indicator | Not built | Device chrome, not app UI. Bottom nav uses `env(safe-area-inset-bottom)` |
| Operator photo | User's `avatar` (initials fallback) | Photo in Figma is sample data |

## Usage

Every dashboard page wraps its content in `MainLayout`; the shell comes with it.

```tsx
import { MainLayout } from "@/components/layout/MainLayout";

export default function StockPage() {
  return <MainLayout>{/* page content */}</MainLayout>;
}
```

Icons, using any name from `IconName` in `src/components/ui/Icon.tsx`:

```tsx
import { Icon } from "@/components/ui/Icon";

<Icon name="package" />                               {/* 24px, current text colour */}
<Icon name="wallet" className="size-5 text-primary-600" />
```

To add an icon: download the SVG from Figma unmodified into `public/icons/<name>.svg` and add `<name>` to `IconName`.

To add a nav item: edit the arrays at the top of `BottomNav.tsx` or `Sidebar.tsx`. The Navigation Model rule is that every screen has exactly one nav home.

## Testing
- `npx tsc --noEmit`, `npm run lint`, `npm run build` pass
- Manual: compared against Figma at 402px and 1366px. Clicked groups open in Chrome and confirmed the list scrolls and daily links stay visible
- Confirmed only one nav is visible at each width (the old code showed both on mobile)

## Related
- [Onboarding & Access](./onboarding.md)
- [Collaboration Guide](../COLLABORATION.md)
- [Styling](../STYLING.md)
- Figma: Components page, sections 19 and 22
