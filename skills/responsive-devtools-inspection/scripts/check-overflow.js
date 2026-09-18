/**
 * Responsive DevTools Overflow Checker
 * Scans the DOM for any elements causing horizontal scrolling (overflow-x).
 * Can be executed directly in the Chrome DevTools console or injected via Playwright/Puppeteer.
 */
(() => {
  const docWidth = document.documentElement.clientWidth;
  const bodyWidth = document.body ? document.body.clientWidth : docWidth;
  const viewportWidth = Math.min(docWidth, window.innerWidth);
  
  const culprits = [];
  const allElements = document.querySelectorAll('*');

  allElements.forEach((el) => {
    // Ignore script, style, head, meta, link tags
    if (['SCRIPT', 'STYLE', 'HEAD', 'META', 'LINK', 'NOSCRIPT'].includes(el.tagName)) return;

    const rect = el.getBoundingClientRect();
    const computed = window.getComputedStyle(el);
    
    // Check if element extends beyond viewport width
    const rightEdge = rect.right;
    const scrollWidth = el.scrollWidth;
    const clientWidth = el.clientWidth;
    const isOverflowingX = (rect.width > viewportWidth + 1) || (rightEdge > viewportWidth + 1);

    if (isOverflowingX && computed.display !== 'none' && computed.visibility !== 'hidden' && computed.opacity !== '0') {
      culprits.push({
        element: el,
        tagName: el.tagName.toLowerCase(),
        id: el.id ? `#${el.id}` : '',
        className: typeof el.className === 'string' ? `.${el.className.trim().split(/\s+/).join('.')}` : '',
        rectWidth: Math.round(rect.width),
        viewportWidth: viewportWidth,
        overflowPixels: Math.round(rightEdge - viewportWidth),
        computedStyles: {
          width: computed.width,
          maxWidth: computed.maxWidth,
          minWidth: computed.minWidth,
          overflowX: computed.overflowX,
          position: computed.position,
          margin: `${computed.marginTop} ${computed.marginRight} ${computed.marginBottom} ${computed.marginLeft}`,
          padding: `${computed.paddingTop} ${computed.paddingRight} ${computed.paddingBottom} ${computed.paddingLeft}`
        }
      });
    }
  });

  if (culprits.length === 0) {
    console.log(`%c[DevTools QA] PASS: No horizontal overflow detected at ${viewportWidth}px viewport width!`, 'color: #10b981; font-weight: bold; font-size: 14px;');
    return { pass: true, viewportWidth, count: 0, culprits: [] };
  } else {
    console.group(`%c[DevTools QA] FAIL: Found ${culprits.length} elements causing horizontal overflow at ${viewportWidth}px!`, 'color: #ef4444; font-weight: bold; font-size: 14px;');
    culprits.forEach((item, index) => {
      const selector = `${item.tagName}${item.id}${item.className}`;
      console.warn(
        `#${index + 1}: %c${selector}`, 'font-weight: bold; color: #f59e0b;',
        `\n  Width: ${item.rectWidth}px (exceeds viewport by ${item.overflowPixels}px)`,
        `\n  overflow-x: ${item.computedStyles.overflowX}, position: ${item.computedStyles.position}`,
        '\n  Element node:', item.element
      );
    });
    console.groupEnd();
    return { pass: false, viewportWidth, count: culprits.length, culprits };
  }
})();
