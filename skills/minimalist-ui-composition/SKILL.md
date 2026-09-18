---
name: minimalist-ui-composition
description: Use when brainstorming or designing websites, applications, or dashboards to enforce visual restraint, prevent element clutter, and reference visual design assets in assets/examples/.
---

# Minimalist UI Composition & Visual Asset Reference Protocol

AI coding assistants frequently fall into the trap of **"Element Overload"**—cramming every available pixel with unnecessary pill badges, dense cards, redundant metrics, and visual noise. This skill enforces intentional minimalism, whitespace architecture, and visual reference alignment.

---

## 1. Visual Asset Reference Check

Before writing code or sketching UI component trees:

1. **Locate the Reference Folder**:
   - For websites/landing pages: Check `assets/examples/websites/`
   - For applications & tools: Check `assets/examples/apps/`
   - For dashboards: Check `assets/examples/dashboards/`
   - For individual components: Check `assets/examples/components/`
2. **Review Existing Mockups / Screenshots**:
   - Inspect the images in the directory to calibrate visual balance, section padding scales, card border styles, and typography weights.
3. **Align Tone & Restraint**:
   - Mirror the simplicity, clean whitespace, and typography hierarchy demonstrated in the reference examples.

---

## 2. The 3-Rule Anti-Clutter Design Standard

### Rule 1: The Whitespace Hierarchy
- **Section Spacing**: Keep $64\text{px}-96\text{px}$ of vertical padding (`py-16` to `py-24`) between major landing page sections.
- **Card Padding**: Use generous internal padding ($24\text{px}-32\text{px}$, `p-6` to `p-8`) inside cards. Never cram text right against container borders.
- **Component Gap**: Use consistent $16\text{px}-24\text{px}$ gaps (`gap-4` to `gap-6`) in flex and grid layouts.

### Rule 2: Typography Over Extra Boxes
- Avoid wrapping every single label or subtitle in its own border box, background pill, or badge.
- Establish visual hierarchy using:
  - Font Size (`text-2xl` vs `text-sm`)
  - Font Weight (`font-bold` vs `font-normal`)
  - Text Color Contrast (`text-slate-900` vs `text-slate-500` in light mode; `text-white` vs `text-slate-400` in dark mode)

### Rule 3: The 1-Focus Rule
- Every card or screen section must have **one** unambiguous primary focus or call-to-action.
- Secondary actions must be styled as subdued ghost buttons or text links (`variant="ghost"`), not competing with the primary solid/gradient button.

---

## 3. UI Decluttering Checklist
- [ ] Checked `assets/examples/` for relevant design reference images.
- [ ] Removed all redundant badge pills and non-essential decorative borders.
- [ ] Ensured background has generous negative space (whitespace).
- [ ] Confirmed that interactive buttons have clear visual hierarchy (1 primary, rest secondary/ghost).
- [ ] Verified that text content does not feel dense or cramped.
