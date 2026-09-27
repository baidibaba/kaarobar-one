# Foundation Components

## Status
- **Status:** Complete
- **Version:** 0.1.0
- **Author:** Ubaid Ullah
- **Date:** 2026-09-27

## Overview

The foundation provides the core infrastructure for Kaarobar One: UI components, layout system, business components, routing, and bilingual support. This enables rapid feature development in subsequent phases.

## Requirements
- [x] Reusable UI components
- [x] Layout system (mobile + desktop)
- [x] Business components for onboarding
- [x] Route groups and pages
- [x] Bilingual support (English + Urdu)
- [x] Loading and error states

## Technical Design

### Database Changes
- Settings repository added
- Seed data for 3 default users

### API Changes
None.

### UI Changes
- 7 UI components (Button, Input, Card, Modal, Badge, Avatar, Loading)
- 5 layout components (Header, Sidebar, BottomNav, MainLayout, AuthLayout)
- 2 business components (UserSelection, PinInput)
- 10 routes (auth + dashboard)

## Usage

### UI Components

```tsx
import { Button, Input, Card, Modal, Badge, Avatar, Loading } from "@/components/ui";

// Button with variants
<Button variant="primary" size="md">Save</Button>

// Card with title
<Card title="Dashboard">Content</Card>

// Avatar with fallback initials
<Avatar name="Ahmed Khan" size="lg" />
```

### Layout Components

```tsx
import { MainLayout } from "@/components/layout";

// Wrap dashboard pages
<MainLayout>
  <DashboardContent />
</MainLayout>
```

### Language

```tsx
import { useLanguage } from "@/stores/languageStore";

const { t, language, setLanguage } = useLanguage();
t("dashboard"); // "Dashboard" / "ڈیش بورڈ" / "Dashboard / ڈیش بورڈ"
```

## Testing
- [x] Build passes with 12 static routes
- [x] All components have JSDoc comments
- [x] No file exceeds 200 lines
- [x] Urdu translations for all UI text

## Related
- [Development Plan](../DEVELOPMENT_PLAN.md)
- [Component Rules](../COMPONENT_RULES.md)
- [Styling](../STYLING.md)
