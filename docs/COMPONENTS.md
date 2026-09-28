# Component Library

## UI Components (`src/components/ui/`)

Base building blocks — reusable across the app.

| Component | Description | Props |
|-----------|-------------|-------|
| `Button` | Button with variants | `variant`, `size`, `disabled`, `onClick` |
| `Input` | Text input field | `label`, `error`, `type`, `placeholder` |
| `Card` | Content container | `title`, `children`, `className` |
| `Modal` | Dialog overlay | `isOpen`, `onClose`, `title`, `children` |
| `Select` | Dropdown select | `options`, `value`, `onChange`, `label` |
| `Badge` | Status indicator | `variant`, `children` |
| `Avatar` | User avatar image | `src`, `name`, `size` (`sm`, `md`, `lg`, `xl`) |
| `Icon` | Figma icon from `public/icons/`, takes text colour | `name`, `className` |
| `Logo` | Kaarobar One logo (Figma `Logo/KaarobarOne`) | — |
| `Loading` | Loading spinner | `size`, `message` |

## Layout Components (`src/components/layout/`)

App shell and navigation.

| Component | Description |
|-----------|-------------|
| `Header` | Top navigation bar |
| `Sidebar` | Desktop navigation (`lg`+), see [App Shell](features/app-shell.md) |
| `BottomNav` | Phone navigation (below `lg`), see [App Shell](features/app-shell.md) |
| `Footer` | Bottom bar |
| `MainLayout` | Main app layout wrapper |
| `AuthLayout` | Authentication pages layout |

## Business Components (`src/components/business/`)

Domain-specific components.

| Component | Description |
|-----------|-------------|
| `UserSelection` | "Who is working today?" grid, see [Onboarding](features/onboarding.md) |
| `PinInput` | PIN numpad with verification, see [Onboarding](features/onboarding.md) |
| `TransactionList` | List of transactions |
| `TransactionForm` | Add/edit transaction form |
| `InventoryTable` | Inventory management table |
| `DashboardStats` | Dashboard statistics cards |
| `ReportChart` | Charts for reports |

## Forms (`src/components/forms/`)

Form-specific components.

| Component | Description |
|-----------|-------------|
| `LoginForm` | Login form |
| `UserForm` | Add/edit user form |
| `TransactionForm` | Transaction entry form |
| `InventoryForm` | Inventory item form |

## Usage Example

```tsx
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export function MyPage() {
  return (
    <Card title="Dashboard">
      <Button variant="primary" onClick={handleSave}>
        Save
      </Button>
    </Card>
  );
}
```
