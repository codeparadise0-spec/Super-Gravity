---
name: e2e-testing
description: Use when building, maintaining, or debugging End-to-End (E2E) browser automation test suites (Playwright, Cypress) for user journeys and flow verification.
---

# End-to-End (E2E) Testing Protocol

E2E tests verify that the entire assembled system (frontend, backend, database, external mocks) functions cohesively from a real user's perspective.

---

## 1. Golden Selector Hierarchy

Brittle selectors (e.g. `div > div:nth-child(3) > span.css-1234x`) break whenever styles change. Always follow this priority order:

1. **User-Facing Roles & Labels** (Best):
   `page.getByRole('button', { name: /submit order/i })`
   `page.getByLabel('Email Address')`
2. **Explicit Test IDs** (Acceptable for non-textual UI):
   `page.getByTestId('cart-item-row')`
3. **Never Use**: Brittle DOM hierarchies, auto-generated Tailwind/CSS-in-JS classes, or arbitrary XPath.

---

## 2. Eliminating Test Flakiness

Flaky tests erode trust in CI. Adhere strictly to these principles:

- **Never use arbitrary sleeps**: Never write `page.waitForTimeout(3000)` or `sleep(3)`. Always wait on web assertions:
  `await expect(page.getByText('Order Confirmed')).toBeVisible();`
- **Isolate Test State**: Every test must run with fresh, isolated data. Never depend on test order or shared user accounts.
- **Mock Flaky Third Parties**: Mock payment gateways (Stripe 3DS modals), SMS delivery, and external identity providers.

---

## 3. Standard Playwright User Flow Example

```typescript
import { test, expect } from '@playwright/test';

test.describe('Checkout Journey', () => {
  test('allows an authenticated user to complete purchase', async ({ page }) => {
    // 1. Arrange: Navigate to product catalog
    await page.goto('/products');

    // 2. Act: Add item to cart
    const productCard = page.getByTestId('product-card-101');
    await productCard.getByRole('button', { name: /add to cart/i }).click();

    // Verify cart badge increments
    await expect(page.getByTestId('cart-badge')).toHaveText('1');

    // Proceed to checkout
    await page.getByRole('link', { name: /cart/i }).click();
    await page.getByRole('button', { name: /checkout/i }).click();

    // Fill shipping form
    await page.getByLabel('Street Address').fill('123 Innovation Way');
    await page.getByLabel('City').fill('San Francisco');
    await page.getByLabel('Postal Code').fill('94105');

    // Submit order
    await page.getByRole('button', { name: /place order/i }).click();

    // 3. Assert: Order confirmation banner appears
    await expect(page.getByRole('heading', { name: /thank you for your order/i })).toBeVisible();
    await expect(page.getByTestId('order-number')).not.toBeEmpty();
  });
});
```
