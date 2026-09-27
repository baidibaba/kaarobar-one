# Component Rules

## File Size Limit

**No file may exceed 200 lines.** If a file approaches 200 lines, split it into smaller modules.

## File Structure

Every component file follows this exact structure:

```tsx
// 1. Imports (grouped: external, internal, types)
import { useState } from "react";
import { Button } from "./Button";
import type { User } from "@/types";

// 2. Types/Props (exported for reuse)
interface UserCardProps {
  user: User;
  onSelect?: (id: string) => void;
  variant?: "compact" | "full";
}

// 3. Component (single responsibility)
export function UserCard({ user, onSelect, variant = "full" }: UserCardProps) {
  // 4. Hooks (at top, before any logic)
  const [isExpanded, setIsExpanded] = useState(false);

  // 5. Derived values
  const displayName = variant === "compact" ? user.name.slice(0, 1) : user.name;

  // 6. Handlers
  const handleClick = () => onSelect?.(user.id);

  // 7. Render (return early for loading/empty states)
  if (!user) return null;

  return (
    <div className="rounded-lg border p-4" onClick={handleClick}>
      <h3>{displayName}</h3>
    </div>
  );
}

// 8. Default export (optional, for lazy loading)
export default UserCard;
```

## Component Types

### 1. UI Components (`src/components/ui/`)
- **No business logic** — purely presentational
- **Highly reusable** — work in any context
- **Small** — typically under 100 lines
- Examples: `Button`, `Input`, `Card`, `Modal`, `Badge`

### 2. Business Components (`src/components/business/`)
- **Domain-specific** — tied to Kaarobar's business logic
- **Composed** — built from UI components
- **Medium** — typically 50-150 lines
- Examples: `UserSelection`, `TransactionList`, `InventoryTable`

### 3. Layout Components (`src/components/layout/`)
- **Structural** — define page structure
- **No business logic** — just layout and navigation
- Examples: `Header`, `Sidebar`, `MainLayout`

### 4. Form Components (`src/components/forms/`)
- **Form-specific** — handle input, validation, submission
- **Reusable** — work with any form library
- Examples: `LoginForm`, `TransactionForm`, `UserForm`

## Splitting Rules

When a file exceeds 200 lines, split it:

| Original | Split Into |
|----------|-----------|
| `UserCard.tsx` (250 lines) | `UserCard.tsx` (component) + `UserCardActions.tsx` (actions) + `UserCard.types.ts` (types) |
| `TransactionList.tsx` (300 lines) | `TransactionList.tsx` (list) + `TransactionItem.tsx` (item) + `TransactionFilter.tsx` (filter) |
| `Dashboard.tsx` (400 lines) | `Dashboard.tsx` (layout) + `DashboardStats.tsx` (stats) + `DashboardChart.tsx` (chart) |

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Component file | PascalCase | `UserCard.tsx` |
| Component name | PascalCase | `UserCard` |
| Props interface | ComponentName + Props | `UserCardProps` |
| Types file | ComponentName + .types.ts | `UserCard.types.ts` |
| Hooks file | camelCase with `use` prefix | `useAuth.ts` |
| Test file | ComponentName + .test.tsx | `UserCard.test.tsx` |
| Index file | `index.ts` (re-exports) | `src/components/ui/index.ts` |

## Index Files

Every component folder has an `index.ts` for clean imports:

```ts
// src/components/ui/index.ts
export { Button } from "./Button";
export { Input } from "./Input";
export { Card } from "./Card";
export { Modal } from "./Modal";
```

Import like this:
```tsx
import { Button, Input, Card } from "@/components/ui";
```

## Rules Summary

1. **Max 200 lines per file** — split if larger
2. **Single responsibility** — each component does one thing
3. **Composition over inheritance** — build complex UI from simple pieces
4. **Props down, events up** — no direct parent manipulation
5. **No unnecessary code** — delete unused imports, variables, and functions
6. **Modular** — components are self-contained and reusable
7. **Type everything** — no `any`, explicit return types
8. **Early returns** — handle edge cases first
