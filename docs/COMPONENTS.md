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
| `Avatar` | User avatar image | `src`, `name`, `size` |
| `Loading` | Loading spinner | `size`, `message` |

## Layout Components (`src/components/layout/`)

App shell and navigation.

| Component | Description |
|-----------|-------------|
| `Header` | Top navigation bar |
| `Sidebar` | Side navigation menu |
| `Footer` | Bottom bar |
| `MainLayout` | Main app layout wrapper |
| `AuthLayout` | Authentication pages layout |

## Business Components (`src/components/business/`)

Domain-specific components.

| Component | Description |
|-----------|-------------|
| `UserSelection` | User selection grid for onboarding |
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
