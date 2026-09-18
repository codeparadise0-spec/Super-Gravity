---
name: frontend-design
description: Use when designing, building, or styling web user interfaces, components, landing pages, and web applications to create visually stunning, modern, and high-conversion experiences.
---

# 🎨 World-Class Frontend UI/UX Design System & Aesthetics

Create web interfaces of the highest international caliber matching Awwwards, Apple, Stripe, and Linear standards. Generic, plain, or boilerplate AI designs are strictly prohibited.

> [!TIP]
> **World-Class Website Blueprint**: For the complete architectural and structural guide, inspect [`skills/super-gravity/WORLD_CLASS_WEBSITE_BLUEPRINT.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/super-gravity/WORLD_CLASS_WEBSITE_BLUEPRINT.md).

---

## 🏛️ The 6 Pillars of High-End UI Aesthetics

```
══════════════════════════════════════════════════════════════════════════════════════════════════
                               THE 6 PILLARS OF DESIGN EXCELLENCE
══════════════════════════════════════════════════════════════════════════════════════════════════
  1. Vibe-Engineered Palette     ├──►  2. Fluid Display Typography    ├──►  3. Multi-Tier Dark Elevation
  4. Asymmetric Bento Geometry   ├──►  5. Real Cutout Transparent PNG └──►  6. 60fps Micro-Physics
══════════════════════════════════════════════════════════════════════════════════════════════════
```

---

### 1. Curated Palette & Multi-Tier Dark Elevation
- **Never use generic plain black (`#000000`) or flat grey (`#1f2937`)**:
  - `Surface Level 0` (Canvas Base): Deep obsidian `#04060A` or warm espresso `#0C0A09`.
  - `Surface Level 1` (Section Plates): Charcoal carbon `#090D16` / `#0B0F19`.
  - `Surface Level 2` (Bento Cards): Frosted glass `rgba(15, 23, 42, 0.75)` with `backdrop-filter: blur(16px)`.
  - `Surface Level 3` (Modals / Floating Pills): `rgba(25, 32, 48, 0.9)` with 1px laser border.
- **Ambient Radial Glows**: Layer multi-point radial gradients to give luminous life to dark interfaces:
  ```css
  .ambient-glow {
    background: radial-gradient(ellipse at 50% 0%, rgba(99, 102, 241, 0.18) 0%, transparent 70%);
  }
  ```

---

### 2. Dramatic Fluid Typography & Contrast
- **Font Stack Pairing**:
  - **Tech / AI / SaaS**: `Plus Jakarta Sans` or `Syne` (Headings, 800) + `Inter` / `Geist` (Body) + `JetBrains Mono` (Labels).
  - **Luxury / Editorial**: `Playfair Display` (Headings, italic accents) + `Plus Jakarta Sans` (Body) + `ui-monospace`.
- **Fluid Sizing with `clamp()`**:
  ```css
  h1.display-title {
    font-size: clamp(2.75rem, 5.5vw + 1rem, 5.5rem);
    font-weight: 800;
    letter-spacing: -0.035em;
    line-height: 1.05;
  }
  ```
- **Typographic Contrast**: Pair massive ultra-bold display headings with crisp, microscopic uppercase labels (`letter-spacing: 0.15em; font-size: 0.75rem; color: #94a3b8`).

---

### 3. Asymmetric Bento Layouts & Whitespace Discipline
- **Extreme Visual Restraint**: Minimum $80\text{px}-120\text{px}$ vertical section padding.
- **Single Focal Point**: Each screen view must direct user attention to one primary interactive centerpiece.
- **Bento Geometry**: Use irregular column spans (`span 8` + `span 4`) with internal interactive elements (mini-calculators, metric tickers, live tabs) instead of static text blocks.

---

### 4. Real Cutout Transparent Imagery & Layered Depth
- **Zero Placeholders**: Never use grey placeholder boxes or broken images.
- **Removed-Background Cutout PNGs**: Layer transparent product cutouts directly over dark glass cards and ambient glows.
- **Organic Silhouette Drop Shadows**:
  ```css
  .product-cutout {
    filter: drop-shadow(0 25px 35px rgba(0, 0, 0, 0.5));
    animation: sineFloat 5s ease-in-out infinite;
  }
  ```

---

### 5. 60fps Micro-Interactions & Tactile Polish
- **Hover Lift**: `transform: translateY(-3px)` with smooth spring ease `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Button Shimmer**: High-velocity foil sheen sweeps across primary CTA pills.
- **Active Tap Feedback**: `transform: scale(0.98)` on pointer down.

---

### 6. Zero Horizontal Overflow & DevTools Gate
- Guarantee responsive layouts down to 360px without horizontal scrollbars (`overflow-x: hidden`).
- Ensure all interactive elements satisfy WCAG touch targets ($\ge 44\times 44\text{px}$).
