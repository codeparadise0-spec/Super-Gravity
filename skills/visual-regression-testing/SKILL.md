---
name: visual-regression-testing
description: Use when validating UI layouts against visual regressions, unintended style breakage, CSS clipping, theme inconsistencies, and cross-browser visual defects.
---

# Visual Regression Testing Protocol

Visual regression testing prevents accidental CSS leakage, font clipping, unintended wrapping, and alignment breakage across application iterations.

---

## 1. Visual Verification Workflow

```
1. Baseline Capture  ──>  2. Change Application  ──>  3. Diff Generation  ──>  4. Triage & Approval
```

### 1. Viewport Matrix Capture
Always capture screenshots at consistent, deterministic viewports:
- **Mobile**: 375 × 667 (scale: 1)
- **Tablet**: 768 × 1024 (scale: 1)
- **Desktop**: 1440 × 900 (scale: 1)

### 2. State Coverage Checklist
For every component or screen under test, capture all core interaction states:
- [ ] **Default / Empty State** (no data, placeholder illustrations)
- [ ] **Loading / Skeleton State** (shimmer animations, loading spinners)
- [ ] **Populated State** (standard realistic data)
- [ ] **Extreme / Edge-Case State** (overflowing text, long usernames, 100+ items)
- [ ] **Error State** (validation error callouts, network failure banners)
- [ ] **Theme Variants** (Dark Mode vs Light Mode parity)

---

## 3. Playwright Visual Comparison Snippet

```typescript
import { test, expect } from '@playwright/test';

test.describe('Visual Regression - Dashboard', () => {
  test('matches desktop snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    // Mask dynamic timestamps and avatars to prevent false-positive diffs
    await expect(page).toHaveScreenshot('dashboard-desktop.png', {
      mask: [page.locator('.timestamp'), page.locator('.dynamic-avatar')],
      maxDiffPixelRatio: 0.01,
    });
  });

  test('matches mobile snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('dashboard-mobile.png', {
      maxDiffPixelRatio: 0.01,
    });
  });
});
```

---

## 4. Triage Checklist for Visual Diffs
When a visual difference is detected:
1. **Is the diff intentional?** (e.g. padding adjusted per design ticket) -> Update baseline.
2. **Is the diff caused by font rendering differences?** -> Ensure web fonts are fully loaded (`document.fonts.ready`) before taking screenshots.
3. **Is it an unintended side effect?** -> Trace CSS cascade specificity, flexbox shrinking (`flex-shrink: 0`), or grid layout collapse.
