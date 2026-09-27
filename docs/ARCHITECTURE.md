# Architecture

## Overview

Kaarobar One is a Next.js PWA with an offline-first architecture using Dexie.js (IndexedDB) as the local database.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                    Client (PWA)                     │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │  Next.js    │  │  React       │  │  Tailwind  │ │
│  │  App Router │  │  Components  │  │  CSS       │ │
│  └──────┬──────┘  └──────┬───────┘  └────────────┘ │
│         │                │                         │
│  ┌──────┴────────────────┴──────┐                  │
│  │      State Management        │                  │
│  │      (React Context/Zustand) │                  │
│  └──────────────┬───────────────┘                  │
│                 │                                   │
│  ┌──────────────┴───────────────┐                  │
│  │      Dexie.js (IndexedDB)   │                  │
│  │      Local Database          │                  │
│  └──────────────────────────────┘                  │
└─────────────────────────────────────────────────────┘
```

## Key Decisions

### 1. Next.js App Router
- File-based routing with route groups
- Server Components by default, Client Components where interactivity is needed
- API routes for server-side logic

### 2. Dexie.js / IndexedDB
- Offline-first: all data stored locally
- No server database required for core functionality
- Migrations for schema versioning
- Repository pattern for data access

### 3. PWA
- Service worker for offline caching
- Web App Manifest for installability
- App shell architecture

### 4. State Management
- React Context for global state (auth, theme, language)
- Local component state for UI-only state
- Dexie.js for persistent data

## Data Flow

```
User Action → Component → Hook/Store → Dexie Repository → IndexedDB
                                ↓
                         UI Re-render
```

## Folder Responsibilities

| Folder | Responsibility |
|--------|---------------|
| `src/app/` | Next.js routes, layouts, pages |
| `src/components/` | Reusable UI components |
| `src/db/` | Database schema, migrations, repositories |
| `src/hooks/` | Custom React hooks |
| `src/lib/` | Utilities, constants, i18n |
| `src/stores/` | State management |
| `src/types/` | TypeScript type definitions |
| `src/styles/` | Global styles |
| `public/` | Static assets |
| `tests/` | Test files |
| `docs/` | Documentation |
