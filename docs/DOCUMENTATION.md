# Documentation Conventions & Rules

## Overview

This document defines how all changes, features, and decisions are documented throughout the project. Following these conventions ensures consistency and makes it easy for any team member to understand what changed, why, and how to use it.

---

## 1. Documentation File Structure

```
docs/
├── README.md              # Entry point — links to all docs
├── ARCHITECTURE.md        # System design and decisions
├── DEVELOPMENT.md         # Setup and workflow
├── DATABASE.md            # Schema and migrations
├── CONVENTIONS.md         # Coding standards
├── COMPONENT_RULES.md     # Component patterns and limits
├── CLEAN_CODE.md          # Code quality rules
├── STYLING.md             # Styling structure and rules
├── TYPES.md               # Type system and conventions
├── API.md                 # API endpoints
├── DEPLOYMENT.md          # Deployment guide
├── COMPONENTS.md          # Component library
├── RELEASE.md             # Release process and version rules
├── CHANGELOG.md           # Version history
├── releases/              # Release plans for upcoming versions
└── features/              # Feature-specific documentation
    ├── README.md          # Index of all features
    ├── user-auth.md       # Example: User authentication
    └── transactions.md    # Example: Transaction management
```

---

## 2. Feature Documentation

Every new feature gets a dedicated file in `docs/features/`.

### Template

```markdown
# [Feature Name]

## Status
- **Status:** Draft | In Progress | Complete | Deprecated
- **Version:** 0.2.0
- **Author:** [Name]
- **Date:** 2026-09-27

## Overview
Brief description of what this feature does and why it exists.

## Requirements
- [ ] Requirement 1
- [ ] Requirement 2

## Technical Design
### Database Changes
Describe schema changes, new tables, migrations.

### API Changes
Document new endpoints, request/response changes.

### UI Changes
Describe new components, pages, user flows.

## Usage
How to use this feature (code examples, screenshots).

## Testing
How this feature was tested, test coverage.

## Related
- [Related Feature](./other-feature.md)
- [Architecture](../ARCHITECTURE.md)
```

### When to Create

| Action | Documentation |
|--------|--------------|
| New feature | Create `docs/features/[feature-name].md` |
| Feature update | Update existing feature file |
| Feature deprecation | Mark as Deprecated, add migration guide |
| Feature removal | Move to `docs/archive/` with removal date |

---

## 3. Changelog Rules

### Format

Follow [Keep a Changelog](https://keepachangelog.com/en/1.1.0/):

```markdown
## [0.2.0] - 2026-09-27

### Added
- New feature X
- New API endpoint Y

### Changed
- Modified behavior of Z

### Deprecated
- Feature A (will be removed in 0.4.0)

### Removed
- Old feature B

### Fixed
- Bug in C

### Security
- Patched vulnerability D
```

### Rules

| Rule | Description |
|------|-------------|
| One entry per change | Don't bundle unrelated changes |
| Reference issues | `Fixed login bug (#123)` |
| User-focused | Describe impact, not implementation |
| Version tags | Every release gets a version entry |
| Dates | Use `YYYY-MM-DD` format |

### Entry Types

| Type | When to Use |
|------|-------------|
| `Added` | New feature, endpoint, component |
| `Changed` | Modified existing behavior |
| `Deprecated` | Will be removed soon |
| `Removed` | Deleted feature or endpoint |
| `Fixed` | Bug fix |
| `Security` | Security patch |

---

## 4. Code Documentation

### JSDoc for Functions

```ts
/**
 * Calculates the total balance for a user's transactions.
 *
 * @param userId - The ID of the user
 * @param startDate - Start date for filtering (inclusive)
 * @param endDate - End date for filtering (inclusive)
 * @returns The total balance (sales - purchases - expenses)
 * @throws {Error} If user does not exist
 *
 * @example
 * const balance = await calculateBalance("user-1", new Date("2026-01-01"), new Date("2026-12-31"));
 * console.log(balance); // 15000
 */
async function calculateBalance(userId: string, startDate: Date, endDate: Date): Promise<number> {
  // ...
}
```

### Component Documentation

```tsx
/**
 * Displays a user's profile card with avatar, name, and role.
 *
 * @param user - The user to display
 * @param onSelect - Callback when user is selected
 * @param variant - Display variant (compact shows avatar only)
 *
 * @example
 * <UserCard user={currentUser} onSelect={handleSelect} variant="full" />
 */
export function UserCard({ user, onSelect, variant = "full" }: UserCardProps) {
  // ...
}
```

### When to Document

| Element | Must Document | Optional |
|---------|--------------|----------|
| Exported functions | Yes | — |
| Exported types | Yes | — |
| Components | Yes | — |
| Internal functions | If complex | Simple ones |
| Database schema | Yes | — |
| API endpoints | Yes | — |
| Config files | Yes | — |

---

## 5. Architecture Decision Records (ADRs)

For significant architectural decisions, create an ADR in `docs/adrs/`.

### Template

```markdown
# ADR-001: Use Dexie.js for Local Storage

## Status
Accepted

## Date
2026-09-27

## Context
We need offline-first local storage for the PWA. Options considered:
- IndexedDB directly (verbose, error-prone)
- Dexie.js (clean API, migrations, TypeScript support)
- LocalForage (simpler but less powerful)

## Decision
Use Dexie.js as a wrapper around IndexedDB.

## Consequences
- **Pros:** Type-safe, migration support, active maintenance
- **Cons:** Additional dependency (~16KB), learning curve

## Alternatives Considered
- LocalForage: Simpler API but no migrations
- Raw IndexedDB: No dependencies but verbose
```

### When to Create an ADR

- Choosing a new technology or library
- Changing database schema significantly
- Modifying authentication/authorization
- Changing deployment strategy
- Any decision that affects multiple parts of the system

---

## 6. API Documentation

### Rules

| Rule | Description |
|------|-------------|
| Document every endpoint | No undocumented endpoints |
| Include examples | Request and response examples |
| Note breaking changes | Mark with `BREAKING CHANGE:` |
| Update on every change | API docs must match code |

### Format

See `docs/API.md` for the full API documentation format.

---

## 7. README Updates

The root `README.md` must be updated when:

| Change | Update Section |
|--------|---------------|
| New feature | Features list |
| New script | Available Scripts table |
| New dependency | Tech Stack |
| Setup changes | Getting Started |
| New documentation | Documentation links |

---

## 8. Documentation Review Checklist

Before merging a PR that includes documentation:

- [ ] Changelog updated with all changes
- [ ] Feature docs created/updated
- [ ] API docs updated (if applicable)
- [ ] Code comments follow JSDoc format
- [ ] No outdated information
- [ ] Links work correctly
- [ ] Examples are runnable
- [ ] Version numbers are correct

---

## 9. Documentation Lifecycle

```
Feature Request → Draft Doc → Implementation → Update Doc → Review → Merge
```

| Stage | Action |
|-------|--------|
| Planning | Create feature doc with requirements |
| Implementation | Update doc with technical details |
| Review | Verify docs match implementation |
| Release | Update changelog, tag version |
| Deprecation | Mark deprecated, add migration guide |
| Removal | Move to `docs/archive/` |

---

## 10. File Size Limits

| File | Max Lines |
|------|-----------|
| Feature docs | 300 |
| ADRs | 100 |
| API docs | 500 |
| Changelog entries | 50 per version |

If a doc exceeds its limit, split by concern:
```
docs/features/
├── user-auth/
│   ├── README.md          # Overview
│   ├── api.md             # API endpoints
│   ├── components.md      # UI components
│   └── testing.md         # Test coverage
```
