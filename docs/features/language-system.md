# Language System

## Status
- **Status:** Complete
- **Version:** 0.1.0
- **Author:** Ubaid Ullah
- **Date:** 2026-09-27

## Overview

The language system provides bilingual support (English and Urdu) with three display options. Users can choose their preference on first launch, and it persists across sessions.

## Requirements
- [x] Support English and Urdu languages
- [x] Three options: Both, English only, Urdu only
- [x] Persist language preference
- [x] Global language switching
- [x] Urdu font (Noto Nastaliq Urdu) loaded

## Technical Design

### Database Changes
None — language preference stored in localStorage.

### API Changes
None.

### UI Changes
- `LanguageSelector` component with 3 toggle buttons
- `LanguageProvider` wraps the app in layout
- Urdu font loaded via `next/font`

## Usage

### Basic Usage

```tsx
import { useLanguage } from "@/stores/languageStore";

function MyComponent() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div>
      <p>{t("dashboard")}</p>
      <p>Current: {language}</p>
      <button onClick={() => setLanguage("ur")}>Urdu</button>
    </div>
  );
}
```

### Language Options

| Option | Value | Behavior |
|--------|-------|----------|
| Both | `"both"` | Shows "English / اردو" |
| English | `"en"` | Shows only English |
| Urdu | `"ur"` | Shows only Urdu |

### Translation Keys

All translation keys are in `src/lib/i18n/translations.ts`:

```ts
t("appName")      // "Kaarobar One" / "کاروبار ون"
t("dashboard")    // "Dashboard" / "ڈیش بورڈ"
t("transactions") // "Transactions" / "لین دین"
t("inventory")    // "Inventory" / "انوینٹری"
t("reports")      // "Reports" / "رپورٹس"
t("settings")     // "Settings" / "سیٹنگز"
```

## Testing
- [x] Language selector renders 3 options
- [x] Selection persists after reload
- [x] Translation function returns correct text
- [x] Urdu font loads correctly

## Related
- [Development Plan](../DEVELOPMENT_PLAN.md)
- [Architecture](../ARCHITECTURE.md)
