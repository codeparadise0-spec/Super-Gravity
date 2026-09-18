---
name: accessibility-a11y-audit
description: Use when building or reviewing user interfaces to ensure compliance with WCAG 2.1 AA accessibility standards, keyboard navigation, and screen reader ergonomics.
---

# Accessibility (a11y) Audit Protocol

Web applications must be fully usable by individuals navigating via keyboards, screen readers, switch devices, or with vision/motor impairments.

---

## 1. The Core WCAG 2.1 AA Checklist

### A. Perceivable
- **Text Alternatives**: All `<img>` tags must have descriptive `alt` attributes. Decorative images must have `alt=""` or `aria-hidden="true"`.
- **Color Contrast**:
  - Normal text ($< 18\text{pt}$ or $< 14\text{pt}$ bold): Minimum contrast ratio of **4.5:1** against background.
  - Large text ($\ge 18\text{pt}$ or $\ge 14\text{pt}$ bold): Minimum contrast ratio of **3.0:1**.
  - UI components & graphical objects (borders, icons): Minimum contrast ratio of **3.0:1**.
- **Do Not Rely on Color Alone**: Error messages, active states, and statuses must include text labels or distinct icons, not just red/green colors.

### B. Operable
- **Keyboard Navigability**:
  - Every interactive element (`<button>`, `<a>`, `<input>`) must be focusable using `Tab` and activatable using `Enter` or `Space`.
  - No keyboard traps: Tab order must follow logical visual reading order.
- **Focus Indicators**:
  - Never remove focus rings with `outline: none` without providing a high-contrast replacement (`:focus-visible`).
- **Touch Target Sizing**:
  - Interactive touch targets must be at least **$44 \times 44\text{px}$** (WCAG 2.5.5).

### C. Understandable
- **Form Labels**:
  - All form controls must have associated `<label for="id">` elements or `aria-label` / `aria-labelledby`.
- **Error Identification**:
  - Form validation errors must be linked to inputs using `aria-describedby="error-id"` and `aria-invalid="true"`.

### D. Robust (ARIA Usage)
- **Rule of ARIA**: Prefer native HTML5 elements (`<button>`, `<dialog>`, `<nav>`, `<main>`, `<header>`) over generic `<div>` elements with ARIA roles.
- **Dynamic Content**: Announce asynchronous updates or alerts using `aria-live="polite"` or `role="status"`.

---

## 2. Automated Console a11y Check Script

Inject into the page console to detect missing labels, invalid roles, and broken alt tags:

```javascript
(() => {
  const issues = [];
  
  // 1. Missing image alt tags
  document.querySelectorAll('img:not([alt])').forEach(img => {
    issues.push({ type: 'Missing Alt Tag', element: img });
  });

  // 2. Buttons without accessible names
  document.querySelectorAll('button').forEach(btn => {
    const text = btn.innerText.trim() || btn.getAttribute('aria-label') || btn.getAttribute('title');
    if (!text) issues.push({ type: 'Empty Button Name', element: btn });
  });

  // 3. Form inputs without associated labels
  document.querySelectorAll('input:not([type="hidden"]), select, textarea').forEach(input => {
    const id = input.id;
    const hasLabel = id ? document.querySelector(`label[for="${id}"]`) : null;
    const hasAria = input.getAttribute('aria-label') || input.getAttribute('aria-labelledby');
    if (!hasLabel && !hasAria) issues.push({ type: 'Unlabeled Input', element: input });
  });

  console.table(issues);
  return issues;
})();
```
