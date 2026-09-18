---
name: css-grid-and-subgrid
description: Use when designing complex multi-dimensional layouts, asymmetric editorial grids, responsive dashboard dashboards, and subgrid track alignments.
---

# CSS Grid & Subgrid Architecture

CSS Grid is the ultimate layout engine for two-dimensional page structures. Avoid hacky flexbox nested math; use explicit grid tracks, template areas, and subgrids.

---

## 1. 12-Column Responsive Layout Grid

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  row-gap: 32px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}

/* Responsive spans */
.hero-main {
  grid-column: span 12;
}

@media (min-width: 768px) {
  .hero-main { grid-column: span 8; }
  .hero-sidebar { grid-column: span 4; }
}
```

---

## 2. Auto-Fit vs Auto-Fill with `minmax()`

Create dynamic responsive card grids that automatically adjust column count without media queries:

```css
.auto-card-grid {
  display: grid;
  /* Automatically wraps when items drop below 280px */
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 1.5rem;
}
```

> **Crucial Tip**: Using `min(100%, 280px)` prevents horizontal overflow when the viewport width is narrower than the $280\text{px}$ minimum.

---

## 3. CSS Subgrid (Nested Track Alignment)

Align child elements (like card headers, bodies, and footer buttons) across sibling cards regardless of varying content height:

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.card {
  display: grid;
  /* Inherit row tracks from the parent card structure */
  grid-row: span 3;
  grid-template-rows: subgrid;
}

.card-header { /* Automatically aligned across cards */ }
.card-body { /* Automatically aligned across cards */ }
.card-footer { /* Always pinned to the bottom in perfect alignment */ }
```
