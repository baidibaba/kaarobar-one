# Database Documentation

## Overview

Kaarobar One uses **Dexie.js** as a wrapper around **IndexedDB** for offline-first local storage. All data is stored in the browser — no server database required.

## Why Dexie/IndexedDB?

- **Offline-first**: App works without internet
- **Large storage**: Can store significant amounts of data
- **Fast queries**: Indexed lookups for performance
- **Type-safe**: Works well with TypeScript

## Schema

### Users Table

| Field | Type | Description |
|-------|------|-------------|
| `id` | string (PK) | Unique user ID |
| `name` | string | User display name |
| `nameUrdu` | string | User name in Urdu |
| `role` | string | User role (admin, worker, etc.) |
| `avatar` | string | Avatar image URL/path |
| `pin` | string | User PIN for quick access |
| `createdAt` | date | Account creation date |
| `isActive` | boolean | Whether user is active |

### Transactions Table

| Field | Type | Description |
|-------|------|-------------|
| `id` | string (PK) | Unique transaction ID |
| `userId` | string (FK) | Who created the transaction |
| `type` | string | Transaction type (sale, purchase, expense) |
| `amount` | number | Transaction amount |
| `description` | string | Transaction description |
| `category` | string | Transaction category |
| `date` | date | Transaction date |
| `createdAt` | date | Record creation date |

### Inventory Table

| Field | Type | Description |
|-------|------|-------------|
| `id` | string (PK) | Unique item ID |
| `name` | string | Item name |
| `nameUrdu` | string | Item name in Urdu |
| `quantity` | number | Current stock quantity |
| `unit` | string | Unit of measurement |
| `purchasePrice` | number | Purchase price per unit |
| `salePrice` | number | Sale price per unit |
| `category` | string | Item category |
| `createdAt` | date | Record creation date |

### Settings Table

| Field | Type | Description |
|-------|------|-------------|
| `key` | string (PK) | Setting key |
| `value` | any | Setting value |
| `updatedAt` | date | Last update date |

## Migrations

Migrations are stored in `src/db/migrations/`. Each migration is a numbered file:

```
src/db/migrations/
├── 001-initial.ts
├── 002-add-inventory.ts
└── 003-add-reports.ts
```

## Repository Pattern

All database access goes through repositories in `src/db/repositories/`:

```typescript
// Example: Get all active users
const users = await userRepository.getAllActive();

// Example: Create a transaction
const tx = await transactionRepository.create({
  userId: 'user-1',
  type: 'sale',
  amount: 5000,
  description: 'Sale to customer',
  date: new Date(),
});
```

## Data Seeding

Seed data is in `src/db/seed.ts` for initial setup and testing.
