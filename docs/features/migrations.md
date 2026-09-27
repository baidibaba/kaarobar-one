# Database Migration System

## Status
- **Status:** Complete
- **Version:** 0.1.0
- **Author:** Ubaid Ullah
- **Date:** 2026-09-27

## Overview

The migration system manages database schema changes over time. It ensures smooth upgrades when the app updates, without losing existing data.

## Requirements
- [x] Track current database version
- [x] Run pending migrations in order
- [x] Support future schema changes
- [x] Type-safe migration definitions

## Technical Design

### Database Changes
- Initial schema: users, transactions, inventory, settings tables

### API Changes
None.

### UI Changes
None.

## Usage

### Adding a New Migration

1. Create a new file in `src/db/migrations/`:

```ts
// src/db/migrations/002-add-reports.ts
import type { Dexie } from "dexie";

export async function migration002(db: Dexie): Promise<void> {
  db.version(2).stores({
    // Updated schema
  });
}
```

2. Register in `src/db/migrations/runner.ts`:

```ts
import { migration002 } from "./002-add-reports";

const migrations: Migration[] = [
  { version: 1, name: "initial", run: migration001 },
  { version: 2, name: "add-reports", run: migration002 },
];
```

### Migration File Structure

```
src/db/migrations/
├── 001-initial.ts      # Version 1: Base schema
├── 002-add-reports.ts  # Version 2: Future migration
├── runner.ts           # Executes pending migrations
└── index.ts            # Barrel export
```

## Testing
- [x] Initial migration creates correct schema
- [x] Migration runner executes in order
- [x] Build passes with migration system

## Related
- [Database](../DATABASE.md)
- [Development Plan](../DEVELOPMENT_PLAN.md)
