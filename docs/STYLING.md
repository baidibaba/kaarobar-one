# Styling Structure & Rules

## File Structure

```
src/styles/
├── globals.css              # Tailwind directives + CSS variables + resets
├── theme.ts                 # Design tokens (colors, spacing, typography)
└── README.md                # This file
```

## File Responsibilities

### `globals.css`
- Tailwind directives (`@tailwind base/components/utilities`)
- CSS custom properties (`:root` variables)
- Global resets and base styles
- Custom scrollbar styles
- Font imports (if not using `next/font`)

**Max 100 lines.** If larger, move variables to `theme.ts`.

### `theme.ts`
- Design tokens as TypeScript constants
- Color palette, spacing scale, typography scale
- Exported for use in components and Tailwind config

**Max 150 lines.** Single source of truth for design tokens.

## Design Tokens

### Colors
```ts
// theme.ts
export const colors = {
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    500: "#3b82f6",
    600: "#21408C",  // Main brand
    700: "#1e3a8a",
    900: "#172554",
  },
  accent: {
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
  },
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
} as const;
```

### Spacing
```ts
export const spacing = {
  xs: "0.25rem",   // 4px
  sm: "0.5rem",    // 8px
  md: "1rem",      // 16px
  lg: "1.5rem",    // 24px
  xl: "2rem",      // 32px
  "2xl": "3rem",   // 48px
} as const;
```

### Typography
```ts
export const typography = {
  fontFamily: {
    sans: ["Inter", "sans-serif"],
    urdu: ["Noto Nastaliq Urdu", "serif"],
  },
  fontSize: {
    xs: "0.75rem",    // 12px
    sm: "0.875rem",   // 14px
    base: "1rem",     // 16px
    lg: "1.125rem",   // 18px
    xl: "1.25rem",    // 20px
    "2xl": "1.5rem",  // 24px
    "3xl": "2rem",    // 32px
  },
} as const;
```

## Component Styling Rules

### 1. Tailwind Only
```tsx
// GOOD
<button className="rounded-lg bg-primary-600 px-4 py-2 text-white">

// BAD
<button className="blue-button">
<button style={{ background: "#21408C" }}>
```

### 2. Class Order
Order classes consistently:
```tsx
// 1. Layout (flex, grid, position)
// 2. Spacing (p-, m-, gap-)
// 3. Size (w-, h-)
// 4. Typography (text-, font-)
// 5. Colors (bg-, text-, border-)
// 6. Effects (rounded-, shadow-, opacity-)
// 7. States (hover:, focus:, active:)
// 8. Transitions

<div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
```

### 3. Conditional Classes
```tsx
// GOOD: Template literals
<div className={`rounded-lg p-4 ${isActive ? "bg-primary-50" : "bg-white"}`}>

// GOOD: Extract to function for complex logic
const cardClasses = getCardClasses(variant, isActive);
<div className={cardClasses}>

// BAD: Ternary chains longer than 2 conditions
```

### 4. Responsive Design
```tsx
// Mobile-first: base = mobile, sm: = tablet, lg: = desktop
<div className="flex flex-col gap-4 sm:flex-row sm:gap-6 lg:gap-8">
```

## Rules

| Rule | Description |
|------|-------------|
| Max file size | 200 lines |
| No inline styles | Except dynamic values (e.g., `style={{ width: size }}`) |
| No `!important` | Use specificity or refactor |
| No global CSS | Except in `globals.css` |
| Use tokens | `text-primary-600` not `text-blue-700` |
| Semantic names | `text-error` not `text-red-500` |
