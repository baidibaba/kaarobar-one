# AI Agent Guide — Kaarobar One

This document is the **single entry point** for AI coding agents working on Kaarobar One. It summarizes all conventions, rules, and patterns.

---

## Project Overview

| Item | Value |
|------|-------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript (strict) |
| **Styling** | Tailwind CSS |
| **Database** | Dexie.js / IndexedDB |
| **State** | React Context |
| **Fonts** | Inter (English), Noto Nastaliq Urdu (Urdu) |
| **Primary Color** | Green `#1a5f35` |
| **Deployment** | Vercel (manual only) |

---

## Quick Reference

### File Size Limits

| File Type | Max Lines |
|-----------|-----------|
| Components | 200 |
| Functions | 30 |
| Feature docs | 300 |
| API docs | 500 |

### Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Components | PascalCase | `UserCard.tsx` |
| Hooks | camelCase + `use` | `useAuth.ts` |
| Utilities | camelCase | `formatCurrency.ts` |
| Types | PascalCase | `User.types.ts` |
| Tests | `.test.tsx` | `UserCard.test.tsx` |

### Import Order

```tsx
// 1. External packages
import { useState } from "react";

// 2. Internal modules (@/ alias)
import { Button } from "@/components/ui";
import { userRepository } from "@/db/repositories/userRepository";

// 3. Types
import type { User } from "@/types";

// 4. Relative imports
import { Helper } from "./Helper";
```

---

## Component Rules

### Structure

```tsx
// 1. Imports
import { useState } from "react";

// 2. Types
interface UserCardProps {
  user: User;
  onSelect?: (id: string) => void;
}

// 3. Component
export function UserCard({ user, onSelect }: UserCardProps) {
  // 4. Hooks
  const [isOpen, setIsOpen] = useState(false);

  // 5. Handlers
  const handleClick = () => onSelect?.(user.id);

  // 6. Early returns
  if (!user) return null;

  // 7. Render
  return (
    <div className="rounded-lg border p-4" onClick={handleClick}>
      <h3>{user.name}</h3>
    </div>
  );
}
```

### Component Types

| Type | Folder | Description |
|------|--------|-------------|
| UI | `src/components/ui/` | Presentational, reusable |
| Business | `src/components/business/` | Domain-specific |
| Layout | `src/components/layout/` | Structural |
| Forms | `src/components/forms/` | Form handling |

### Index Files

Every component folder has `index.ts`:

```ts
// src/components/ui/index.ts
export { Button } from "./Button";
export { Input } from "./Input";
export { Card } from "./Card";
```

---

## Styling Rules

### Colors

```tsx
// GOOD — Use tokens
className="bg-primary-600 text-white"

// BAD — Don't use raw colors
className="bg-green-700"
```

### Class Order

```
1. Layout (flex, grid, position)
2. Spacing (p-, m-, gap-)
3. Size (w-, h-)
4. Typography (text-, font-)
5. Colors (bg-, text-, border-)
6. Effects (rounded-, shadow-, opacity-)
7. States (hover:, focus:, active:)
8. Transitions
```

### Responsive

```tsx
// Mobile-first
<div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
```

---

## Database Rules

### Repository Pattern

All database access goes through repositories:

```ts
// GOOD
const users = await userRepository.getAllActive();

// BAD — Don't use Dexie directly in components
const users = await db.users.toArray();
```

### Schema

| Table | Primary Key | Indexes |
|-------|-------------|---------|
| users | id | name, role, isActive |
| transactions | id | userId, type, category, date |
| inventory | id | name, category |
| settings | key | — |

### Migrations

```ts
// src/db/migrations/002-add-reports.ts
export async function migration002(db: Dexie): Promise<void> {
  db.version(2).stores({ /* updated schema */ });
}
```

---

## Language System

### Usage

```tsx
import { useLanguage } from "@/stores/languageStore";

const { t, language, setLanguage } = useLanguage();

// Translate
t("dashboard"); // "Dashboard" / "ڈیش بورڈ" / "Dashboard / ڈیش بورڈ"

// Change language
setLanguage("ur"); // "both" | "en" | "ur"
```

### Adding Translations

```ts
// src/lib/i18n/translations.ts
export const translations = {
  en: {
    myKey: "English text",
  },
  ur: {
    myKey: "اردو متن",
  },
} as const;
```

---

## Git Rules

### Commit Format

```
<type>: <description>

feat: add user selection grid
fix: resolve PIN validation bug
docs: update API documentation
```

### Branch Naming

```
feature/user-selection
bugfix/pin-validation
hotfix/security-patch
release/v0.3.0
```

### PR Checklist

- [ ] No file exceeds 200 lines
- [ ] No `console.log` statements
- [ ] No `any` types
- [ ] Urdu translations added
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] CHANGELOG.md updated

---

## Clean Code Rules

### Functions

| Rule | Limit |
|------|-------|
| Lines | Max 30 |
| Parameters | Max 3 |
| Return points | Max 2 |
| Nesting | Max 2 levels |

### Avoid

- Deep nesting → use early returns
- Magic numbers → use constants
- Unused code → delete it
- Comments explaining "what" → explain "why"

---

## File Structure

```
kaarobar-one/
├── src/
│   ├── app/                    # Next.js routes
│   │   ├── (auth)/             # Login, onboarding
│   │   ├── (dashboard)/        # Dashboard routes
│   │   └── api/                # API routes
│   ├── components/
│   │   ├── ui/                 # Button, Input, Card, etc.
│   │   ├── layout/             # Header, Sidebar, BottomNav
│   │   ├── forms/              # Form components
│   │   └── business/           # UserSelection, etc.
│   ├── db/
│   │   ├── migrations/         # Schema migrations
│   │   └── repositories/       # Data access
│   ├── hooks/                  # useAuth, etc.
│   ├── lib/                    # utils, constants, i18n
│   ├── stores/                 # languageStore
│   ├── types/                  # TypeScript types
│   └── styles/                 # globals.css
├── public/                     # Static assets
├── docs/                       # Documentation
└── tests/                      # Test files
```

---

## Common Patterns

### Fetching Data

```tsx
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/schema";

const users = useLiveQuery(() => db.users.toArray()) ?? [];
```

### Creating a Component

```tsx
// 1. Create file in correct folder
// src/components/ui/MyComponent.tsx

// 2. Follow structure
interface MyComponentProps {
  // props
}

export function MyComponent({ prop }: MyComponentProps) {
  // hooks
  // handlers
  // return
}

// 3. Export from index
// src/components/ui/index.ts
export { MyComponent } from "./MyComponent";
```

### Adding a Page

```tsx
// 1. Create file in route group
// src/app/(dashboard)/my-page/page.tsx

// 2. Use MainLayout
import { MainLayout } from "@/components/layout";

export default function MyPage() {
  return (
    <MainLayout>
      {/* content */}
    </MainLayout>
  );
}
```

---

## Documentation Requirements

Every change must update:

| Change | Document |
|--------|----------|
| New feature | `docs/features/[name].md` |
| New API | `docs/API.md` |
| Schema change | `docs/DATABASE.md` |
| New component | `docs/COMPONENTS.md` |
| Any change | `CHANGELOG.md` |

---

## Red Lines

These are **never** allowed:

1. No file over 200 lines
2. No `any` types
3. No `console.log` in production
4. No hardcoded colors (use tokens)
5. No direct database access in components
6. No uncommitted changes
7. No force push to `main`
8. No skipping documentation

---

## Required Reading for AI Agents

**Before doing ANY work, read these files in order:**

### Step 1: Core Context
1. `AI_GUIDE.md` — This file (conventions, rules, patterns)
2. `README.md` — Project overview and setup
3. `docs/DEVELOPMENT_PLAN.md` — Current phase, features, tasks

### Step 2: Release Context
4. `docs/RELEASE.md` — Release process, version history
5. `docs/releases/v0.3.0.md` — Next release plan (if exists)

### Step 3: Task-Specific Docs
Read the docs relevant to your task:

| Task | Read |
|------|------|
| UI/Components | `docs/COMPONENT_RULES.md`, `docs/STYLING.md`, `docs/COMPONENTS.md` |
| Database | `docs/DATABASE.md` |
| Types | `docs/TYPES.md` |
| API | `docs/API.md` |
| Testing | `docs/TESTING.md` |
| Security | `docs/SECURITY.md` |
| Deployment | `docs/DEPLOYMENT.md`, `docs/DEPLOYMENT_RULES.md` |
| Team workflow | `TEAM.md` |
| Clean code | `docs/CLEAN_CODE.md` |
| Conventions | `docs/CONVENTIONS.md` |

### Step 4: Feature Docs
Check `docs/features/` for any related feature documentation.

---

## Quick Start for AI Agents

1. Read this file first
2. Read the required docs listed above
3. Read the relevant doc for your task
4. Follow the conventions exactly
5. Update documentation for any change
6. Run `npm run build` before committing
7. Ask for confirmation before committing
