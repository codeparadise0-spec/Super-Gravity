---
name: react-i18n-next
description: Use when building multilingual React and Next.js applications, managing translation keys, pluralization rules, and localized route segments.
---

# Multilingual React & Next.js Architecture (`next-intl`)

Localize full-stack React and Next.js applications with type-safe translation dictionaries, pluralization rules, and localized routing (`/[locale]/dashboard`).

---

## 1. Type-Safe Translation Messages (`messages/en.json`)

```json
{
  "Navigation": {
    "home": "Home",
    "pricing": "Pricing",
    "features": "Features"
  },
  "Dashboard": {
    "greeting": "Welcome back, {name}!",
    "unreadMessages": "{count, plural, =0 {No unread messages} one {1 unread message} other {# unread messages}}"
  }
}
```

---

## 2. Server & Client Component Usage

```tsx
// Server Component
import { useTranslations } from 'next-intl';

export function DashboardHeader({ userName, count }: { userName: string; count: number }) {
  const t = useTranslations('Dashboard');

  return (
    <header className="p-4 border-b">
      <h1 className="text-xl font-bold">{t('greeting', { name: userName })}</h1>
      <p className="text-sm text-slate-500">{t('unreadMessages', { count })}</p>
    </header>
  );
}
```

---

## 3. Best Practices
- **Never Hardcode Strings in JSX**: Always extract text to translation catalogs.
- **Support Complex Pluralization**: Use ICU message syntax for zero/one/other plural forms.
- **Format Numbers & Currencies Locally**: Always pass locale to `Intl.NumberFormat`.
