---
name: form-ux-and-microcopy
description: Use when designing conversion-focused checkout forms, registration flows, inline validation feedback, and clear microcopy.
---

# Form UX & Microcopy Design Standards

Forms represent the primary conversion friction point in any web application. Minimize cognitive load, provide instant inline validation, and craft reassuring microcopy.

---

## 1. Top 5 Rules of High-Converting Form UX

1. **Single-Column Layout**: Single-column vertical forms are completed 30% faster than multi-column forms because the eye moves in a predictable downward line.
2. **Top-Aligned Labels**: Always place `<label>` elements directly above the input field. Avoid placeholder-only inputs (placeholders vanish upon typing and break accessibility).
3. **Appropriate Mobile Keyboards**: Always set the `inputmode` and `type` attributes:
   - Email: `type="email" autocomplete="email" inputmode="email"`
   - Phone: `type="tel" autocomplete="tel" inputmode="tel"`
   - Currency / Numbers: `inputmode="decimal"` or `inputmode="numeric"`
4. **Reward Early, Punish Late (Inline Validation)**:
   - Do not display aggressive error messages while the user is still actively typing.
   - Trigger validation on `blur` (when leaving the field) or on submit attempt.
   - Instantly clear error messages the moment the user corrects the input.
5. **Clear, Action-Oriented Button Microcopy**:
   - Bad: *"Submit"*, *"Click Here"*, *"OK"*.
   - Good: *"Create Free Account"*, *"Complete $49 Purchase"*, *"Send Reset Link"*.

---

## 2. Accessible Error Message Pattern

```html
<div class="form-group">
  <label for="cardNumber" class="form-label">Card Number</label>
  <input
    id="cardNumber"
    name="cardNumber"
    type="text"
    inputmode="numeric"
    autocomplete="cc-number"
    placeholder="4242 •••• •••• 4242"
    aria-invalid="true"
    aria-describedby="cardNumber-error"
    class="input-error"
  />
  <p id="cardNumber-error" class="error-message" role="alert">
    <svg aria-hidden="true" class="error-icon" ...></svg>
    Please enter a valid 16-digit card number.
  </p>
</div>
```
