---
name: devtools-css-grid-flex-debugging
description: Use when debugging CSS Grid and Flexbox layouts in Chrome DevTools Elements panel, toggling grid badges, line numbers, track sizes, and flex alignment overlays.
---

# Chrome DevTools CSS Grid & Flexbox Inspection

Chrome DevTools provides interactive badges and visual overlays directly on top of the web page to inspect flexbox gap distribution, track sizes, and grid line alignments.

---

## 1. Grid Visual Badges & Overlays

1. In the **Elements** panel, locate any DOM element with `display: grid`.
2. Click the small **`grid`** badge next to the element tag.
3. The visual grid overlay appears over your page:
   - **Track numbers**: Displays `1`, `2`, `-1`, `-2` to help you write exact `grid-column: 2 / -1` spans.
   - **Track sizes**: Shows computed pixel widths next to each column (`280px`, `1fr`).
   - **Area names**: Visualizes named grid template areas (e.g. `[header]`, `[sidebar]`).

---

## 2. Flexbox Visual Alignment Editor

1. Click the **`flex`** badge next to any flex container.
2. In the **Styles** pane, locate `display: flex`.
3. Click the **Flexbox Editor icon** (the small layout icon next to `display: flex`).
4. An interactive UI popup appears allowing you to visually toggle:
   - `flex-direction` (row / column)
   - `justify-content` (flex-start, center, space-between, space-around)
   - `align-items` (stretch, center, baseline)
   - `flex-wrap` (nowrap / wrap)

---

## 3. Container Queries Inspection
- If elements use `@container (min-width: 400px)`, click the **`container`** badge in the Elements tree to inspect the bounding box of the query container.
