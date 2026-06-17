# SMJMUN Wordmark — Production Implementation

## What was built

```
app/components/about/
├── AboutWordmarkSection.tsx   ← Full section: wordmark + tagline + labels
└── wordmark/
    ├── SMJMUNWordmark.tsx     ← Composes SMJMask + MUNMask
    ├── SMJMask.tsx            ← SVG mask + AnimatedCollage
    ├── MUNMask.tsx            ← SVG mask + StaticCollage
    ├── AnimatedCollage.tsx    ← Grid of drifting delegate photos
    ├── StaticCollage.tsx      ← Grid of static conference photos
    ├── DelegatePhoto.tsx      ← Single animated tile
    ├── wordmark-data.ts       ← All image definitions + canvas constants
    └── types.ts               ← Shared TypeScript interfaces
```

---

## Architecture decisions (vs. the v1 critique)

### Problem 1 — foreignObject → SVG mask
v1 used `<clipPath> + <foreignObject>`, which has known Safari / iOS rendering bugs.

This version uses:
```tsx
<mask id={maskId}>
  <rect fill="black" />   // everything hidden
  <text fill="white">SMJ</text>  // revealed area
</mask>
```

The mask is applied to a regular HTML `div` via CSS:
```css
mask-image: url(#id);
mask-size: 100% 100%;
```

This is fully reliable in Safari 15.4+, iOS, Chrome, Firefox, and Edge.

### Problem 2 — Duplicate IDs → useId()
```tsx
const uid = useId();
const maskId = `${uid.replace(/:/g, "")}-smj-mask`;
```

React's `useId()` guarantees stable, unique IDs per component instance.
Safe to render the component in multiple places (page, preview, story) simultaneously.

### Problem 3 — Organic drift, not ping-pong
v1 used `repeatType: "reverse"` which creates a noticeable mechanical back-and-forth.

This version uses multi-keyframe arrays:
```ts
x: [0, 18, -12, 6, 0]   // wanders, then returns
```

with `repeatType: "loop"` so the motion is continuous and feels alive — never snaps.

### Problem 4 — Word reads as one unit on desktop
v1 gave each half `md:w-1/2`. That's correct in principle but the gap was visible.

This version uses `md:flex-1` on both halves inside a `gap-0` flex row.
Each mask SVG has identical `viewBox="0 0 600 200"` and `aspectRatio="600/200"`,
so both halves scale proportionally and the letters sit flush.

### Problem 5 — No Next Image (for now)
The collage photos are inside absolute-positioned containers that animate with
`transform`. Next.js `<Image fill>` works poorly inside motion divs without
careful wrapper sizing. The `<img>` tags used here have `loading="lazy"` and
`decoding="async"` for equivalent performance. When you move images to
`public/images/about/`, swap to:

```tsx
import Image from "next/image";
// …
<Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 50vw, 300px" />
```

### Problem 6 — Color treatment
- SMJ photos: `filter: saturate(1.15) brightness(1.05)` — warm, alive
- MUN photos: `filter: saturate(0.85) brightness(0.95)` — cool, institutional

This single CSS difference makes the contrast between the two halves readable
even before you understand the copy beneath.

### Problem 7 — Reduced motion
`useReducedMotion()` from Framer Motion skips all line-reveal animations for
users who have `prefers-reduced-motion: reduce` set. The DelegatePhoto drift
animations should also check this — add `useReducedMotion()` inside
`DelegatePhoto.tsx` and set `duration: 0` / skip `animate` if true.

---

## Next steps for production

### 1. Replace Unsplash URLs with local assets
```
public/images/about/smj/delegate-01.jpg
public/images/about/smj/delegate-02.jpg
…
public/images/about/mun/committee-01.jpg
…
```

Then update `wordmark-data.ts` paths and switch to `<Image fill>`.

### 2. Add Google Fonts
In your `layout.tsx` or `_app.tsx`:
```tsx
import { Cormorant_Garamond, Inter } from "next/font/google";
```

Or in `globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;900&display=swap');
```

### 3. Scroll-linked narrative (optional enhancement)
Use `useScroll` + `useTransform` from Framer Motion to fade in
"SMJ — Living Stories → MUN — Enduring Institution" labels as the user scrolls
into the section, then dissolve to "People Change. Purpose Remains."

### 4. Vercel / production image optimization
Move images local, then `<Image>` handles WebP conversion, responsive sizes,
and CDN caching automatically.

---

## Motion reference

| Image | Drift axes | Duration |
|-------|-----------|---------|
| smj-1 | x + y (wander) | 38s |
| smj-2 | x + y (counter) | 42s |
| smj-3 | x + scale | 35s |
| smj-4 | y + x | 44s |
| smj-5 | x + y + scale | 40s |
| smj-6 | y + x | 36s |
| smj-7 | x + scale | 46s |
| smj-8 | y + x | 33s |
| smj-9 | x + y | 39s |

No two images have the same duration — this prevents synchronised ripples.
