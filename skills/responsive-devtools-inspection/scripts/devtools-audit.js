/**
 * Comprehensive Responsive DevTools Audit Script
 * Evaluates mobile ergonomics, touch targets, font legibility, and viewport configuration.
 */
(() => {
  const issues = [];
  const warnings = [];

  // 1. Viewport Meta Tag Check
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  if (!viewportMeta) {
    issues.push({
      category: 'Viewport Meta',
      message: 'Missing <meta name="viewport"> tag. Mobile devices will render desktop scale.'
    });
  } else {
    const content = viewportMeta.getAttribute('content') || '';
    if (!content.includes('width=device-width')) {
      warnings.push({
        category: 'Viewport Meta',
        message: 'Viewport content does not contain "width=device-width".'
      });
    }
    if (content.includes('user-scalable=no') || content.includes('maximum-scale=1')) {
      warnings.push({
        category: 'Accessibility',
        message: 'Disabling user zoom (user-scalable=no / maximum-scale=1) violates WCAG accessibility guidelines.'
      });
    }
  }

  // 2. Touch Target Size Check (WCAG recommends >= 44x44px or 48x48px)
  const interactiveSelector = 'button, a, input, select, textarea, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])';
  const interactiveElements = document.querySelectorAll(interactiveSelector);

  interactiveElements.forEach((el) => {
    if (el.offsetParent === null) return; // Hidden element
    const rect = el.getBoundingClientRect();
    const computed = window.getComputedStyle(el);

    if (computed.display === 'none' || computed.visibility === 'hidden') return;

    // Check minimum hit dimensions
    const isTooSmall = rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44);
    // Ignore inline text links that wrap inside paragraphs
    const isInlineTextLink = el.tagName === 'A' && computed.display === 'inline';

    if (isTooSmall && !isInlineTextLink) {
      issues.push({
        category: 'Touch Target',
        element: el,
        selector: `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${el.className ? '.' + el.className.trim().split(/\s+/)[0] : ''}`,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        message: `Touch target is ${Math.round(rect.width)}x${Math.round(rect.height)}px. Should be at least 44x44px (recommended 48x48px) on touch devices.`
      });
    }
  });

  // 3. Input Font Size Check (prevent iOS Safari auto-zoom on focus)
  const formInputs = document.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), select, textarea');
  formInputs.forEach((input) => {
    const computed = window.getComputedStyle(input);
    const fontSize = parseFloat(computed.fontSize);
    if (fontSize < 16) {
      warnings.push({
        category: 'iOS Auto-Zoom',
        element: input,
        fontSize: `${fontSize}px`,
        message: `Input font-size is ${fontSize}px. Font sizes under 16px cause iOS Safari to forcefully zoom in on focus, breaking responsive layouts.`
      });
    }
  });

  // Summary Report
  console.group('%c[DevTools Responsive & Ergonomics Audit]', 'color: #3b82f6; font-weight: bold; font-size: 14px;');
  console.log(`Total Interactive Elements Checked: ${interactiveElements.length}`);
  console.log(`Issues (Must Fix): ${issues.length}`);
  console.log(`Warnings (Review): ${warnings.length}`);

  if (issues.length > 0) {
    console.group('%cIssues Found:', 'color: #ef4444; font-weight: bold;');
    issues.forEach((item, i) => console.error(`#${i+1} [${item.category}]`, item.message, item.element || ''));
    console.groupEnd();
  }

  if (warnings.length > 0) {
    console.group('%cWarnings:', 'color: #f59e0b; font-weight: bold;');
    warnings.forEach((item, i) => console.warn(`#${i+1} [${item.category}]`, item.message, item.element || ''));
    console.groupEnd();
  }

  console.groupEnd();

  return {
    success: issues.length === 0,
    issueCount: issues.length,
    warningCount: warnings.length,
    issues,
    warnings
  };
})();
