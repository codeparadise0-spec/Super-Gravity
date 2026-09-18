---
name: devtools-console-and-cdp
description: Use when automating browser interactions via Chrome DevTools Protocol (CDP), evaluating runtime JavaScript in browser subagents, and intercepting console logs.
---

# Chrome DevTools Protocol (CDP) & Console Automation

The Chrome DevTools Protocol allows direct low-level socket communication with the Chromium browser engine for inspecting DOM nodes, intercepting network requests, and capturing heap snapshots.

---

## 1. Useful Chrome Console Utility APIs (Command Line API)

When evaluating JavaScript expressions in the DevTools console or browser subagent:

| Utility Function | Description | Example |
| :--- | :--- | :--- |
| `$$('selector')` | `document.querySelectorAll()` returning a true Array (supports `.map()`, `.filter()`). | `$$('.card').map(el => el.innerText)` |
| `$0` | The currently selected DOM node in the Elements panel. | `$0.getBoundingClientRect()` |
| `inspect(element)` | Automatically jumps to and selects the element in the DOM tree. | `inspect($$('h1')[0])` |
| `monitorEvents(el, ['click', 'input'])` | Streams all fired events on an element to the console in real time. | `monitorEvents(window, 'resize')` |
| `unmonitorEvents(el)` | Stops listening to monitored events. | `unmonitorEvents(window)` |
| `getEventListeners(el)` | Returns an object listing all event listeners attached to the node. | `getEventListeners(document.body)` |

---

## 2. Programmatic CDP Script Example (Playwright CDP Session)

```typescript
import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

// Create raw CDP session
const client = await page.context().newCDPSession(page);

// Enable Performance domain
await client.send('Performance.enable');

await page.goto('https://example.com');

// Extract low-level browser metrics
const metrics = await client.send('Performance.getMetrics');
console.table(metrics.metrics);

await browser.close();
```
