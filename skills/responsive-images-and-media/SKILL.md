---
name: responsive-images-and-media
description: Use when implementing high-performance responsive imagery with picture tags, srcset, sizes, modern formats (AVIF/WebP), and preventing Cumulative Layout Shift (CLS).
---

# Responsive Images & Media Protocol

Images account for over 50% of the average web page's byte payload. Optimize asset delivery to reduce data usage and prevent Cumulative Layout Shift (CLS).

---

## 1. The Multi-Format `<picture>` Standard

Serve cutting-edge AVIF to modern browsers, fallback to WebP, and provide JPEG/PNG for legacy environments:

```html
<picture>
  <!-- Modern AVIF format (Smallest payload) -->
  <source
    type="image/avif"
    srcset="hero-375.avif 375w, hero-768.avif 768w, hero-1440.avif 1440w"
    sizes="(max-width: 768px) 100vw, 1200px"
  />
  <!-- WebP Fallback -->
  <source
    type="image/webp"
    srcset="hero-375.webp 375w, hero-768.webp 768w, hero-1440.webp 1440w"
    sizes="(max-width: 768px) 100vw, 1200px"
  />
  <!-- Standard fallback image -->
  <img
    src="hero-1440.jpg"
    alt="Developer collaboration team working at an office desk"
    width="1440"
    height="810"
    loading="lazy"
    decoding="async"
    class="w-full h-auto object-cover rounded-xl"
  />
</picture>
```

---

## 2. Preventing Cumulative Layout Shift (CLS)

Always provide explicit `width` and `height` attributes or CSS `aspect-ratio` so the browser reserves the layout space before the image downloads:

```css
.media-container {
  aspect-ratio: 16 / 9;
  background-color: oklch(90% 0.02 240); /* Skeleton placeholder background */
  overflow: hidden;
}

.media-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

---

## 3. LCP vs Lazy Loading Rules
- **Above-the-Fold (Hero Image / LCP)**: Set `loading="eager"` and `fetchpriority="high"`. Preload in `<head>`:
  `<link rel="preload" as="image" href="hero.avif" type="image/avif">`
- **Below-the-Fold Images**: Always set `loading="lazy"` and `decoding="async"`.
