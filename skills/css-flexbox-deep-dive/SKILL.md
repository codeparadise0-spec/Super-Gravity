---
name: css-flexbox-deep-dive
description: Use when building 1-dimensional UI components, navigation bars, toolbars, content-driven wrapping layouts, and centering elements.
---

# Modern CSS Flexbox Architecture

Flexbox is designed for 1-dimensional distribution (along a row OR a column). Master flex sizing algorithms, wrapping alignment, and modern gap properties.

---

## 1. The Flex Sizing Equation

`flex: [flex-grow] [flex-shrink] [flex-basis]`

$$\text{Total Available Space} = \text{Container Width} - \sum(\text{Item Basis} + \text{Gaps})$$

| Shorthand | Growth | Shrink | Basis | Use Case |
| :--- | :--- | :--- | :--- | :--- |
| `flex: 1` (`1 1 0%`) | Yes | Yes | `0%` | Distribute space equally, ignoring intrinsic content size |
| `flex: auto` (`1 1 auto`) | Yes | Yes | `auto` | Distribute remaining space proportionally to content size |
| `flex: none` (`0 0 auto`) | No | No | `auto` | Rigid item; prevents shrinking (e.g. icons, avatars) |
| `flex: 0 0 240px` | No | No | `240px` | Fixed-width sidebar |

---

## 2. Preventing Flexbox Clipping & Text Overflow

When text inside a flex item contains long unbroken words or URLs, flex items will ignore `overflow: hidden` unless `min-width: 0` is set:

```css
.flex-item {
  flex: 1;
  min-width: 0; /* CRITICAL: Enables text truncation inside flex child */
}

.flex-item p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

---

## 3. Navbar Layout Pattern with `margin-inline-start: auto`

Push elements to the end of a flex container without empty wrapper `<div>` tags:

```css
.navbar {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-brand { flex-shrink: 0; }
.nav-links { display: flex; gap: 1rem; }
.user-profile-menu {
  /* Automatically pushes profile to the far right */
  margin-inline-start: auto;
}
```
