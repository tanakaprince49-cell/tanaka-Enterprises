# Design & Architecture — Tanaka Enterprises

## Philosophy

The previous version of this document described "Calm Software" and then shipped
a site that funnelled every button to a dead Nestly URL. The philosophy was not
wrong; the execution had drifted from it. This rebuild keeps the intent and
makes the site tell the truth.

**Software built with intent** means two things at once:

1. The products we ship respect the user's time (see `/about`).
2. This site should not claim anything that is not true — no dead links, no
   fake login, no product that does not exist listed as live.

## Visual language: liquid glass

The brief was "liquid glass and animations". Real glass is not a blur box — it
is a *refractive* surface, so the system has four layers:

| Layer | Implementation | Why |
| --- | --- | --- |
| **Aurora** | Three blurred blobs (cyan / violet / amber) drifting on 26–38s cycles behind everything | `backdrop-filter` over flat colour looks like grey mud. The glass needs something to refract. |
| **Glass** | `blur(26px) saturate(180%)` + a two-tone inset shadow (bright top rim, dark bottom rim) | The rim shadows are what read as *thickness*. Without them it is a translucent rectangle. |
| **Sheen** | Pointer-tracked radial highlight on the border and inside the surface | Gives the pane a specular response to the cursor; the thing that makes glass feel alive. |
| **Grain** | Animated SVG `feTurbulence` at 16% overlay | Breaks up the plastic smoothness of a large blur. |

### Type

- **Inter** for everything structural — tight tracking (`-0.045em`) on display
  sizes so the big headlines read as one object.
- **Instrument Serif** for accent statements and pull quotes. One serif voice,
  used sparingly, is what separates "editorial" from "dashboard".
- Uppercase micro-labels at `0.22em` tracking as the third voice.

### Colour

Near-black with a blue undertone (`#05070c`), never flat `#000`. A single
accent gradient — cyan `#38bdf8` → violet `#8b5cf6` — carries the brand. Amber
appears once, as the third aurora blob and the "press" accent. Everything else
is slate.

### Motion

- Spring easing (`cubic-bezier(0.34,1.56,0.64,1)`) on anything pressable.
- Scroll reveals with an 80ms stagger, one `IntersectionObserver` per element,
  disconnected after firing.
- Hover: `translateY(-2px)` plus a sheen sweep across buttons.
- **All of it collapses under `prefers-reduced-motion: reduce`.**

## Architectural decisions

- **Plain React + Vite, no framework.** Six routes, no data fetching, no
  server state. The value here is the glass and the copy, not an abstraction.
- **Tailwind v4 via the Vite plugin, not the CDN.** The previous build loaded
  `cdn.tailwindcss.com` in production — a dev-only script that most CSPs block
  and that ships a compiler to every visitor.
- **Custom CSS layer alongside Tailwind.** `.glass`, `.btn`, the aurora and the
  reveal system are hand-written. Expressing a four-layer refractive surface in
  utility classes produces unreadable class strings and cannot express the
  `mask-composite` border trick.
- **Real paths, not `HashRouter`.** The old app used hash routing, which is
  invisible to search engines. Now `/ventures` is a real URL with a real
  prerendered HTML file.
- **Prerendering instead of SSR.** The content is static, so `scripts/prerender.mjs`
  writes a complete HTML file per route at build time. Same SEO outcome as SSR
  with none of the runtime.
- **Data in `data/*.js`, not TS.** The prerenderer runs in Node and imports the
  same modules the app does. Plain `.js` means no build step for the data layer.

## Accessibility

- `prefers-reduced-motion` honoured globally.
- `@supports not (backdrop-filter)` fallback to opaque surfaces — critical
  because this site's likely audience is on budget Android where
  `backdrop-filter` is often unsupported.
- Mobile menu is `fixed` and **not** nested inside the blurred `<nav>`: a
  `backdrop-filter` cannot blur content in its own stacking context. That bug
  made the first build's menu transparent.
- Real `alt` text on all 18 photos, `aria-expanded` and `aria-controls` on the
  menu, labelled form inputs, visible focus rings.

## Deployment

Vercel auto-detects Vite. `vercel.json` handles the SPA fallback, XML
content-types for sitemaps, and immutable caching for `/images/tanaka/*`.

**Before going live:** set `SITE.origin` in `data/siteConfig.js` to the real
domain. `tanakaenterprises.com` is currently registered to an unrelated US
company and cannot be used.
