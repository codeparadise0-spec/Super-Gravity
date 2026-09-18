---
name: internationalization-i18n-ui
description: Use when building multilingual interfaces, supporting Right-to-Left (RTL) scripts, CSS logical properties, and localized formatting.
---

# Internationalization (i18n) & RTL Layout Architecture

Supporting global users requires building UI that automatically adapts to varying text lengths and Right-to-Left (RTL) languages (Arabic, Hebrew, Persian).

---

## 1. CSS Logical Properties (Never Use Left/Right)

Replace directional physical properties (`left`, `right`) with logical flow-relative properties:

| Physical (Directional) | Logical (Flow-Relative) | Behavior in RTL (`dir="rtl"`) |
| :--- | :--- | :--- |
| `margin-left: 16px;` | `margin-inline-start: 16px;` | Becomes `margin-right: 16px;` automatically |
| `margin-right: 16px;`| `margin-inline-end: 16px;` | Becomes `margin-left: 16px;` automatically |
| `padding-left: 8px;` | `padding-inline-start: 8px;`| Automatically mirrored |
| `text-align: left;` | `text-align: start;` | Aligns right in RTL |
| `text-align: right;`| `text-align: end;` | Aligns left in RTL |
| `border-left: 2px solid;` | `border-inline-start: 2px solid;` | Border mirrors automatically |

---

## 2. Icon Flipping in RTL

Directional icons (e.g. back arrows, forward chevrons) must flip horizontally in RTL, while non-directional icons (e.g. search, settings, clocks) must stay unchanged:

```css
[dir="rtl"] .icon-directional {
  transform: scaleX(-1);
}
```

---

## 3. Native Internationalization API (`Intl`)

Never write manual date or currency formatting code. Use the built-in browser `Intl` API:

```javascript
// Localized Currency
const priceFormatter = new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY',
});
console.log(priceFormatter.format(4500)); // "￥4,500"

// Relative Time Formatting
const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });
console.log(rtf.format(-1, 'day')); // "ayer" (yesterday)
```
