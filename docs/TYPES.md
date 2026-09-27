# Types Structure & Rules

## File Structure

```
src/types/
├── index.ts                 # Re-exports all types
├── database.ts              # Database entity types (User, Transaction, etc.)
├── api.ts                   # API request/response types
├── component.ts             # Shared component prop types
└── domain.ts                # Business domain types
```

## File Responsibilities

### `index.ts`
- Re-exports all types from other files
- Single import point for all types

```ts
export type { User, Transaction, InventoryItem, Setting } from "./database";
export type { ApiResponse, PaginatedResponse } from "./api";
export type { BaseComponentProps, LoadingState } from "./component";
export type { BusinessType, TransactionCategory } from "./domain";
```

### `database.ts`
- Types that map directly to Dexie/IndexedDB tables
- One type per table

```ts
export interface User {
  id: string;
  name: string;
  nameUrdu: string;
  role: "admin" | "worker" | "viewer";
  avatar?: string;
  pin?: string;
  createdAt: Date;
  isActive: boolean;
}
```

### `api.ts`
- API request and response types
- Shared API types (pagination, errors)

```ts
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
```

### `component.ts`
- Shared component prop types
- Common UI state types

```ts
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
}
```

### `domain.ts`
- Business-specific types not tied to database
- Enums, unions, computed types

```ts
export type BusinessType = "retail" | "wholesale" | "service";

export type TransactionCategory =
  | "food"
  | "rent"
  | "salary"
  | "utilities"
  | "other";
```

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Entity types | PascalCase noun | `User`, `Transaction` |
| Props types | ComponentName + Props | `ButtonProps`, `UserCardProps` |
| API types | Api + Action + Type | `ApiUserResponse`, `ApiTransactionRequest` |
| Domain types | PascalCase noun/phrase | `BusinessType`, `TransactionCategory` |
| Enum types | PascalCase noun | `UserRole`, `TransactionType` |
| Generic types | PascalCase with T prefix | `ApiResponse<T>`, `PaginatedResponse<T>` |

## Type Rules

### 1. No `any`
```ts
// BAD
function process(data: any) { /* ... */ }

// GOOD
function process(data: unknown) { /* ... */ }
// or
function process(data: Transaction) { /* ... */ }
```

### 2. Explicit Return Types
```ts
// BAD
function getUser(id: string) {
  return db.users.get(id);
}

// GOOD
async function getUser(id: string): Promise<User | undefined> {
  return db.users.get(id);
}
```

### 3. Use `const` Assertions
```ts
// GOOD: Literal types for fixed values
export const USER_ROLES = ["admin", "worker", "viewer"] as const;
export type UserRole = (typeof USER_ROLES)[number];

// BAD: String union that can drift
export type UserRole = "admin" | "worker" | "viewer";
```

### 4. Optional vs Nullable
```ts
// Use optional (?) for properties that may not exist
interface User {
  avatar?: string;      // May not have an avatar
}

// Use nullable (| null) for properties that can be explicitly null
interface Transaction {
  deletedAt: Date | null;  // Can be soft-deleted
}
```

### 5. Discriminated Unions
```ts
// GOOD: Use discriminated unions for type safety
type Transaction =
  | { type: "sale"; amount: number; customerId: string }
  | { type: "purchase"; amount: number; supplierId: string }
  | { type: "expense"; amount: number; category: string };

// BAD: Optional fields that only exist for some types
interface Transaction {
  type: string;
  amount: number;
  customerId?: string;
  supplierId?: string;
  category?: string;
}
```

## Import Rules

```tsx
// 1. Type-only imports (use 'import type')
import type { User } from "@/types";

// 2. Value imports
import { USER_ROLES } from "@/types";

// 3. Mixed (use inline 'type' keyword)
import { USER_ROLES, type UserRole } from "@/types";
```

## File Size Limits

| File | Max Lines |
|------|-----------|
| `index.ts` | 50 |
| `database.ts` | 100 |
| `api.ts` | 100 |
| `component.ts` | 100 |
| `domain.ts` | 150 |

If a file exceeds its limit, split by domain:
```
src/types/
├── database/
│   ├── user.types.ts
│   ├── transaction.types.ts
│   └── inventory.types.ts
├── api.types.ts
└── index.ts
```
