# Onboarding & Access (User Selection + PIN)

## Status
- **Status:** In Progress
- **Version:** 0.3.0
- **Author:** Muhammad Osama
- **Date:** 2026-09-27
- **Branch:** `feature/onboarding` (stacked on `feature/app-shell`; merge after PR #1)

## Overview

The login flow for a shared shop device: pick who is working today, then unlock with a 4-digit PIN. Built from Figma section **01 · Onboarding & Access** (`user-selection`, `pin-entry`).

## Requirements
- [x] Grid of active users with Urdu name, English name and role
- [x] PIN screen with the selected user, progress dots and bilingual numpad
- [x] PIN is actually verified; wrong PIN shows an error and clears
- [x] Desktop: type digits, Backspace, Enter
- [ ] First-run tour (Figma `mobile-tour-first-sale/stock/credit`), which overlays Home, Stock and Credit screens, so it waits for sections 02, 04 and 07
- [ ] PIN hashing, which needs a users-table migration (separate PR, see [Collaboration](../COLLABORATION.md#database-migrations))
- [ ] Lockout after repeated wrong PINs

## Technical Design

### Database Changes
None. The PIN is still stored and compared as plain text (`users.pin`). This is marked with a `ponytail:` comment in `PinInput.tsx`.

### API Changes
None.

### UI Changes

| File | Change |
|------|--------|
| `src/components/business/UserSelection.tsx` | Rebuilt to Figma `user-selection`. `onSelect` now passes the full `User`, not an id |
| `src/components/business/PinInput.tsx` | Rebuilt to Figma `pin-entry`. Prop `userId` → `user: User`. Verifies PIN. Keyboard support |
| `src/components/layout/AuthLayout.tsx` | Phone-width column on `surface-warm`; screens render their own header. Language buttons removed (not in Figma; still in Settings) |
| `src/app/(auth)/onboarding/page.tsx` | Tracks the selected `User` instead of an id |
| `src/app/(auth)/login/page.tsx` | Card kept vertically centred in the new layout |
| `src/components/ui/Logo.tsx` | **New.** Shared logo, also used by the Sidebar |
| `src/components/ui/Avatar.tsx` | New `xl` size (90px, used inside a 3px ring = Figma's 96px) |
| `public/icons/` | Added `mouse-pointer`, `chevron-left`, `arrow-left`, `check-circle` (Figma SVGs, unmodified) |

### Bugs fixed

| Bug | Cause | Fix |
|-----|-------|-----|
| **Any 4 digits logged in as any user** | `PinInput` called `onSuccess` without checking (`// TODO: Verify PIN`) | Compare against `user.pin` on confirm |
| **User list always empty** | `db.users.where("isActive").equals(1)`: IndexedDB cannot index booleans, so the index is empty (verified: 0 of 3 seed users returned) | `db.users.filter((u) => u.isActive)` |
| Enter on a focused numpad key typed a digit *and* confirmed | Browser default "click" on focused button | `preventDefault()` on handled keys |

### Differences from Figma (deliberate)

| Figma | Built | Why |
|-------|-------|-----|
| Two cards with green photo ring, two grey | Grey by default, green on hover/focus | Figma doesn't say what green means |
| Sample photos (Tariq, Yasir…) | User's `avatar`, initials fallback | Photos are sample data |
| Headphones strip under the numpad | Not built | No behaviour defined for it |
| Floating "○ ○ ○ ○" text layer ("Prototype PIN progress") | Real dots that fill as you type, red on error | It's a prototype placeholder |
| No error state | "غلط پن، دوبارہ کوشش کریں / Wrong PIN, try again" | A wrong PIN needs feedback |
| Status bar / home indicator | Not built | Device chrome |

## Usage

```tsx
const [selectedUser, setSelectedUser] = useState<User | null>(null);

{!selectedUser ? (
  <UserSelection onSelect={setSelectedUser} />
) : (
  <PinInput user={selectedUser} onSuccess={login} onBack={() => setSelectedUser(null)} />
)}
```

Seed users (`src/db/seed.ts`) are created on first visit to `/onboarding`; their test PINs are in that file.

## Testing
- `npx tsc --noEmit`, `npm run lint`, `npm run build` pass
- Manual (Chrome, localhost):
  - User grid shows all 3 seed users (previously 0)
  - Wrong PIN via keyboard + Enter → dots turn red and clear, error shown, confirm disabled
  - Correct seed PIN via on-screen numpad + confirm → `/dashboard`, session saved

## Related
- [App Shell](./app-shell.md)
- [Collaboration Guide](../COLLABORATION.md)
- [Release plan v0.3.0](../releases/v0.3.0.md)
- Figma: section 01 · Onboarding & Access
