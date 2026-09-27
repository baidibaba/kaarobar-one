# Clean Code Rules

## Principles

1. **DRY** (Don't Repeat Yourself) — extract repeated logic
2. **KISS** (Keep It Simple, Stupid) — simplest solution that works
3. **YAGNI** (You Aren't Gonna Need It) — no speculative features
4. **Single Responsibility** — each function/component does one thing

## Code Smells to Avoid

### 1. Long Functions
```tsx
// BAD: 50+ line function
function processTransaction() {
  // 50 lines of logic...
}

// GOOD: Split into smaller functions
function validateTransaction(tx: Transaction) { /* ... */ }
function calculateTotal(tx: Transaction) { /* ... */ }
function saveTransaction(tx: Transaction) { /* ... */ }

function processTransaction() {
  if (!validateTransaction(tx)) return;
  const total = calculateTotal(tx);
  saveTransaction(tx);
}
```

### 2. Deep Nesting
```tsx
// BAD: 4+ levels of nesting
if (user) {
  if (user.isActive) {
    if (user.role === "admin") {
      // do something
    }
  }
}

// GOOD: Early returns
if (!user) return;
if (!user.isActive) return;
if (user.role !== "admin") return;
// do something
```

### 3. Magic Numbers/Strings
```tsx
// BAD
if (status === 2) { /* ... */ }

// GOOD
const STATUS_COMPLETED = 2;
if (status === STATUS_COMPLETED) { /* ... */ }
```

### 4. Unused Code
```tsx
// BAD: Unused imports, variables, functions
import { unused } from "./utils";  // ← never used
const temp = "hello";              // ← never used
function helper() { /* ... */ }    // ← never called

// GOOD: Delete anything unused
```

### 5. Comments That Explain "What"
```tsx
// BAD: Obvious comments
// Loop through users
users.forEach((user) => { /* ... */ });

// GOOD: Comments explain "Why"
// Filter out inactive users to prevent unauthorized access
users.filter((u) => u.isActive).forEach((user) => { /* ... */ });
```

## Function Rules

| Rule | Limit |
|------|-------|
| Lines per function | Max 30 lines |
| Parameters | Max 3 (use object for more) |
| Return points | Max 2 (early returns preferred) |
| Nesting depth | Max 2 levels |

## Component Rules

| Rule | Limit |
|------|-------|
| Lines per component | Max 200 lines |
| Props | Max 7 (group related props) |
| Hooks per component | Max 5 |
| Event handlers | Max 5 |

## Import Rules

```tsx
// 1. External packages
import { useState, useEffect } from "react";

// 2. Internal modules (using @/ alias)
import { Button } from "@/components/ui";
import { userRepository } from "@/db/repositories/userRepository";

// 3. Types
import type { User } from "@/types";

// 4. Relative imports (same folder)
import { Helper } from "./Helper";
```

## Git Commit Rules

- **One logical change per commit**
- **No "fix" or "update" messages** — be specific
- **No committing node_modules, .env, or build artifacts**
- **Test before committing**

## Review Checklist

Before marking a PR as ready:

- [ ] No file exceeds 200 lines
- [ ] No unused imports, variables, or functions
- [ ] No `console.log` statements
- [ ] No `any` types (use `unknown` if needed)
- [ ] Functions are under 30 lines
- [ ] Components have proper TypeScript types
- [ ] Urdu translations added where needed
- [ ] No hardcoded values (use constants)
- [ ] Code is self-documenting (clear names)
