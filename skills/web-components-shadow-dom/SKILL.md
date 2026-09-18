---
name: web-components-shadow-dom
description: Use when building framework-agnostic custom elements, encapsulated Shadow DOM design tokens, slot composition, and lifecycle management.
---

# Web Components & Encapsulated Shadow DOM

Web Components allow you to create reusable, framework-independent custom HTML tags with encapsulated styling that cannot be leaked or overridden by outside CSS.

---

## 1. Defining a Custom Element (`<user-badge>`)

```javascript
class UserBadge extends HTMLElement {
  constructor() {
    super();
    // Attach isolated Shadow Root
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['name', 'avatar', 'role'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute('name') || 'Anonymous';
    const avatar = this.getAttribute('avatar') || 'https://api.dicebear.com/7.x/bottts/svg?seed=user';
    const role = this.getAttribute('role') || 'Member';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 6px 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 9999px;
          font-family: system-ui, sans-serif;
        }
        img {
          width: 28px;
          height: 28px;
          border-radius: 50%;
        }
        .name { font-weight: 600; font-size: 14px; color: #0f172a; }
        .role { font-size: 11px; color: #64748b; }
      </style>
      <img src="${avatar}" alt="${name}">
      <div>
        <div class="name">${name}</div>
        <div class="role">${role}</div>
      </div>
      <slot></slot>
    `;
  }
}

customElements.define('user-badge', UserBadge);
```

---

## 2. Usage Across Any Framework or HTML
```html
<user-badge name="Elena Rostova" role="Principal Architect">
  <button class="action-btn">Follow</button>
</user-badge>
```
