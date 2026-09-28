# Changelog

All notable changes to the Kaarobar One project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-09-27

### Added
- Next.js + TypeScript + Tailwind CSS + Dexie.js setup
- Database schema (Users, Transactions, Inventory, Settings)
- Repository pattern for data access
- Language system with 3 options (Both, English only, Urdu only)
- UI components (Button, Input, Card, Modal, Badge, Avatar, Loading)
- Layout components (Header, Sidebar, BottomNav, MainLayout, AuthLayout)
- Business components (UserSelection, PinInput)
- Route groups and pages (auth + dashboard)
- Database migration system
- Bilingual support (English + Urdu)
- PWA manifest
- Vercel deployment configuration
- Complete documentation

## [Unreleased]

### Added
- App shell from Figma: bilingual bottom nav (phones) and desktop sidebar with 5 daily links, 3 collapsible groups (Reports, Staff & Wages, Accounts), Cameras and Settings (#1)
- Ledger page placeholder (`/ledger`), separate from Reports per Figma
- `Icon` component using the Figma icon SVGs, recoloured by text colour
- Shared `Logo` component
- Figma-matched user selection and PIN screens, with keyboard support for PIN entry on desktop
- Collaboration guide for two developers (`docs/COLLABORATION.md`)
- Initial project setup and repository structure
- Figma design integration with MCP connection
- Logo design with bilingual (English + Urdu) support
- Noto Nastaliq Urdu font integration for RTL typography
- Language system with 3 options (Both, English only, Urdu only)
- Language context provider with persistence
- Language selector component
- Settings repository for key-value storage
- Database seed data for default users
- Utility functions (formatCurrency, formatDate, cn, generateId, debounce)
- UI components (Button, Input, Card, Modal, Badge, Avatar, Loading)
- Layout components (Header, Sidebar, BottomNav, MainLayout, AuthLayout)
- Business components (UserSelection, PinInput)
- Route groups and pages (auth, dashboard)
- Loading and error states
- Database migration system with initial schema

### Changed
- Sidebar and bottom nav switch at the `lg` breakpoint; the top header is hidden on desktop
- Login screens no longer show the language buttons (not in Figma); language is still set in Settings

### Fixed
- Sidebar and bottom nav were both visible on mobile
- User selection showed no users (boolean `isActive` can't be queried through an IndexedDB index)
- Pressing Enter on a focused numpad key entered a digit and confirmed at the same time

### Security
- PIN is now verified before login; previously any 4 digits logged in as any user

## [0.1.0] - 2026-09-27

### Added
- Project initialization
- README with project documentation
- Git ignore configuration
- Changelog for tracking changes
- Figma design file connection established
- Kaarobar One logo component (English + Urdu)
