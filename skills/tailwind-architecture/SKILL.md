---
name: tailwind-architecture
description: Use when building scalable design systems with Tailwind CSS, authoring plugins, configuring tokens, and avoiding arbitrary value anti-patterns.
---

# Scalable Tailwind CSS Architecture

Tailwind CSS accelerates UI development, but messy arbitrary classes (`w-[347px]`, `text-[#3b4252]`) create fragmented designs. Enforce strict token architecture.

---

## 1. Design Token Configuration (`tailwind.config.js`)

Extend Tailwind rather than overriding defaults:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'hsl(var(--brand-50) / <alpha-value>)',
          500: 'hsl(var(--brand-500) / <alpha-value>)',
          600: 'hsl(var(--brand-600) / <alpha-value>)',
          900: 'hsl(var(--brand-900) / <alpha-value>)',
        },
        surface: {
          0: 'hsl(var(--surface-0) / <alpha-value>)',
          1: 'hsl(var(--surface-1) / <alpha-value>)',
          2: 'hsl(var(--surface-2) / <alpha-value>)',
        },
      },
      borderRadius: {
        card: '16px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
```

---

## 2. Reusable Component Primitives with `cva` (Class Variance Authority)

Never concatenate messy template strings for button variants. Use `cva`:

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

export const buttonStyles = cva(
  'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg',
  {
    variants: {
      variant: {
        primary: 'bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-500',
        secondary: 'bg-surface-1 text-slate-900 dark:text-white hover:bg-surface-2 border border-slate-200 dark:border-white/10',
        ghost: 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300',
        destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
      },
      size: {
        sm: 'h-8 px-3 text-xs gap-1.5',
        md: 'h-10 px-4 text-sm gap-2',
        lg: 'h-12 px-6 text-base gap-2.5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);
```
