# Testing Strategy

## Overview

Testing ensures reliability and confidence when making changes. We follow a testing pyramid approach.

## Testing Pyramid

```
        /\
       /  \     E2E Tests (critical user flows)
      /────\
     /      \   Integration Tests (component + database)
    /────────\
   /          \  Unit Tests (functions, utilities, hooks)
  /────────────\
```

## Test Types

### 1. Unit Tests

**What:** Individual functions, utilities, hooks, and components

**Tools:** Vitest + React Testing Library

**Location:** `tests/unit/`

**Naming:** `*.test.ts` or `*.test.tsx`

**Example:**
```ts
// tests/unit/utils.test.ts
import { formatCurrency } from "@/lib/utils";

describe("formatCurrency", () => {
  it("formats number as PKR currency", () => {
    expect(formatCurrency(15000)).toBe("Rs. 15,000");
  });

  it("handles zero", () => {
    expect(formatCurrency(0)).toBe("Rs. 0");
  });
});
```

### 2. Integration Tests

**What:** Component + database interactions

**Tools:** Vitest + React Testing Library + fake-indexeddb

**Location:** `tests/integration/`

**Example:**
```ts
// tests/integration/userRepository.test.ts
import { userRepository } from "@/db/repositories/userRepository";

describe("userRepository", () => {
  it("creates and retrieves a user", async () => {
    const user = await userRepository.create({
      id: "user-1",
      name: "Test User",
      nameUrdu: "ٹیسٹ صارف",
      role: "admin",
      isActive: true,
    });

    const retrieved = await userRepository.getById("user-1");
    expect(retrieved?.name).toBe("Test User");
  });
});
```

### 3. E2E Tests

**What:** Critical user flows

**Tools:** Playwright

**Location:** `tests/e2e/`

**Example:**
```ts
// tests/e2e/auth.spec.ts
test("user can select account and login", async ({ page }) => {
  await page.goto("/");
  await page.click('[data-testid="user-card-1"]');
  await page.fill('[data-testid="pin-input"]', "1234");
  await page.click('[data-testid="login-button"]');
  await expect(page).url("/dashboard");
});
```

## Test Coverage

| Area | Target |
|------|--------|
| Utilities | 90% |
| Hooks | 80% |
| Components | 70% |
| Repositories | 80% |
| E2E Flows | 100% of critical paths |

## Critical User Flows (E2E)

- [ ] User selection → PIN → Dashboard
- [ ] Add transaction → Verify in list
- [ ] Add inventory item → Verify stock
- [ ] Language toggle → Verify text changes
- [ ] Offline mode → Add data → Verify persistence

## Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- tests/unit/utils.test.ts

# Run E2E tests
npm run test:e2e

# Run in watch mode
npm test -- --watch
```

## Test Checklist

Before merging a PR:

- [ ] All new code has unit tests
- [ ] Integration tests pass
- [ ] E2E tests pass for changed flows
- [ ] Coverage meets targets
- [ ] No flaky tests
