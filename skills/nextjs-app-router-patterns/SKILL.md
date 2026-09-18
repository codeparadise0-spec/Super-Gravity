---
name: nextjs-app-router-patterns
description: Use when structuring Next.js App Router applications, designing nested layouts, route groups, parallel/intercepting routes, and metadata optimization.
---

# Next.js App Router Architecture & Patterns

The Next.js App Router leverages React Server Components, file-system routing conventions, and granular layout caching.

---

## 1. Route Groups & Nested Layouts

Organize routes without affecting the URL structure using parentheses `(folder)`:

```
app/
├── (auth)/
│   ├── layout.tsx         # Centered card layout for authentication
│   ├── login/page.tsx     # URL: /login
│   └── register/page.tsx  # URL: /register
├── (dashboard)/
│   ├── layout.tsx         # Sidebar + Topbar navigation layout
│   ├── overview/page.tsx  # URL: /overview
│   └── settings/page.tsx  # URL: /settings
└── layout.tsx             # Root HTML & Global Providers layout
```

---

## 2. Dynamic SEO & OpenGraph Metadata

Generate dynamic metadata per page on the server:

```typescript
// app/products/[slug]/page.tsx
import { Metadata } from 'next';
import { db } from '@/lib/db';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await db.product.findUnique({ where: { slug: params.slug } });
  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} | Super Gravity Store`,
    description: product.description,
    openGraph: {
      title: product.name,
      images: [{ url: product.imageUrl, width: 1200, height: 630 }],
    },
  };
}
```

---

## 3. Parallel & Intercepting Routes (Modal URL Pattern)

Render a modal while preserving the background dashboard view and updating the URL (`/dashboard/photos/123`):

```
app/feed/
├── @modal/
│   └── (..)photos/[id]/page.tsx  # Intercepts /photos/[id] and displays in modal
├── photos/[id]/page.tsx          # Full-page view if directly navigated to or refreshed
├── layout.tsx                     # Accepts props: { children, modal }
└── page.tsx
```
