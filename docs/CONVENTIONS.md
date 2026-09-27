# Coding Conventions

## General

- **Language**: TypeScript (strict mode)
- **Formatting**: Prettier (auto-format on save)
- **Linting**: ESLint with Next.js config
- **Naming**: camelCase for variables/functions, PascalCase for components/types

## File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `UserCard.tsx` |
| Hooks | camelCase with `use` prefix | `useAuth.ts` |
| Utilities | camelCase | `formatCurrency.ts` |
| Types | PascalCase | `User.types.ts` |
| Tests | `.test.ts` or `.spec.ts` | `UserCard.test.tsx` |
| Styles | kebab-case | `global.css` |

## Component Structure

```tsx
// 1. Imports
import { useState } from 'react';

// 2. Types
interface UserCardProps {
  name: string;
  role: string;
}

// 3. Component
export function UserCard({ name, role }: UserCardProps) {
  // 4. Hooks
  const [isOpen, setIsOpen] = useState(false);

  // 5. Handlers
  const handleClick = () => setIsOpen(!isOpen);

  // 6. Render
  return (
    <div className="rounded-lg border p-4">
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
}
```

## Git Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add user authentication
fix: resolve transaction calculation bug
docs: update README with setup instructions
style: format code with Prettier
refactor: extract reusable hook
test: add tests for UserCard component
chore: update dependencies
```

### Commit Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting) |
| `refactor` | Code refactoring |
| `test` | Adding or updating tests |
| `chore` | Maintenance tasks |

## Branch Naming

```
feature/your-feature-name
bugfix/your-bugfix-name
hotfix/your-hotfix-name
docs/your-docs-update
```

## Code Review Checklist

- [ ] Code follows conventions
- [ ] No console.log statements left
- [ ] TypeScript types are correct
- [ ] Components are properly documented
- [ ] Tests pass
- [ ] No hardcoded values (use constants)
- [ ] Urdu translations added where needed
- [ ] RTL layout considered for Urdu text
