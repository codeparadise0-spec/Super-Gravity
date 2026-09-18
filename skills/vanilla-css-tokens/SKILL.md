---
name: vanilla-css-tokens
description: Use when building zero-dependency design systems with Vanilla CSS Custom Properties, OKLCH colors, fluid typography math, and light/dark theme switching.
---

# Vanilla CSS Design Tokens & Architecture

Vanilla CSS with modern Custom Properties (`var(--...)`), Cascade Layers (`@layer`), and `color(oklch ...)` provides ultimate performance, zero build-step overhead, and total stylistic control.

---

## 1. Design Token Foundation with Cascade Layers

```css
@layer reset, tokens, base, components, utilities;

@layer tokens {
  :root {
    /* Perceptually uniform OKLCH Colors */
    --color-bg: oklch(98% 0.01 240);
    --color-surface-1: oklch(100% 0 0);
    --color-surface-2: oklch(95% 0.02 240);
    --color-text-main: oklch(20% 0.02 240);
    --color-text-muted: oklch(45% 0.02 240);
    --color-primary: oklch(60% 0.22 265);
    --color-primary-hover: oklch(52% 0.24 265);

    /* Spacing scale */
    --space-1: 0.25rem;  /* 4px */
    --space-2: 0.5rem;   /* 8px */
    --space-4: 1rem;     /* 16px */
    --space-6: 1.5rem;   /* 24px */
    --space-8: 2rem;     /* 32px */

    /* Fluid Typography */
    --font-heading: 'Outfit', sans-serif;
    --font-body: 'Inter', system-ui, sans-serif;
    --text-sm: clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem);
    --text-base: clamp(1rem, 0.34vw + 0.91rem, 1.19rem);
    --text-xl: clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem);
    --text-3xl: clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem);
  }

  /* Dark Theme Override */
  [data-theme='dark'],
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme='light']) {
      --color-bg: oklch(14% 0.02 240);
      --color-surface-1: oklch(18% 0.03 240);
      --color-surface-2: oklch(24% 0.03 240);
      --color-text-main: oklch(96% 0.01 240);
      --color-text-muted: oklch(70% 0.02 240);
      --color-primary: oklch(68% 0.20 265);
    }
  }
}
```

---

## 2. Component Scoped Tokens

Allow individual components to be customized via CSS properties without modifying their underlying styles:

```css
@layer components {
  .btn {
    --_btn-bg: var(--btn-bg, var(--color-primary));
    --_btn-color: var(--btn-color, white);
    --_btn-padding: var(--btn-padding, var(--space-2) var(--space-4));

    background-color: var(--_btn-bg);
    color: var(--_btn-color);
    padding: var(--_btn-padding);
    border-radius: 8px;
    border: none;
    font-family: var(--font-body);
    font-weight: 600;
    cursor: pointer;
    transition: filter 0.15s ease;
  }

  .btn:hover {
    filter: brightness(1.1);
  }
}
```
