# Willow & Pine — Premium Motion Site

A full rebuild of the holiday apartment listing as a premium,
Awwwards-style Next.js site: full-screen hero, cinematic text/image
reveals, scroll-driven parallax, and smooth scrolling — built with
Next.js, React, TypeScript, Tailwind CSS, GSAP + ScrollTrigger, and
Lenis.

## Important context on this build

The original ask referenced a TikTok video as a visual reference. That
domain is blocked from this environment's network, and no video file
was ever uploaded to the conversation — so this was **not** built by
analyzing footage frame by frame. It's a premium site built directly
from the detailed written brief (full-bleed hero, text/image reveals,
parallax, sticky/pinned sections, GSAP + ScrollTrigger + Lenis, cinematic
easing, responsive design), reusing the Willow & Pine holiday-apartment
content that already exists elsewhere in this repo
(`holiday-apartment-booking/`).

## Run it

```bash
cd willow-pine-premium
npm install   # already run once during setup — re-run if node_modules is missing
npm run dev
# open http://localhost:3000
```

Production build (this is what was used to verify the site — see
below):

```bash
npm run build
npm run start
```

## What's implemented

- **Preloader** — a brief counting curtain that wipes away on load,
  skipped entirely under `prefers-reduced-motion`.
- **Smooth scrolling** — Lenis, synced to GSAP's ticker so
  `ScrollTrigger` reads the smoothed scroll position.
- **Nav** — hides on scroll-down, reappears on scroll-up, gains a
  frosted background past a scroll threshold; animated underline
  hovers; separate mobile menu.
- **Custom cursor** — a two-part dot + lagging ring that scales up over
  anything tagged `data-cursor="hover"`. Desktop-only (`pointer: fine`),
  disabled under reduced motion.
- **`RevealText`** — splits any heading/paragraph into lines with GSAP's
  `SplitText` and reveals them with a clipped translate + slight
  rotation, staggered. Used for every section headline.
- **`RevealImage`** — a placeholder "photo" (CSS gradient — swap for a
  real `<Image>`) that wipes in via `clip-path` as it scrolls into
  view, with an optional slower-than-scroll parallax drift.
- **Hero** — full-bleed, huge display type, a slow zoom-out on load, and
  a parallax background layer that drifts as the hero scrolls away.
- **Sections** — value marquee, about (with stats), photo gallery grid,
  amenities list, a fully interactive **availability calendar**
  (pick check-in/check-out, already-booked days are disabled, live
  pricing), reviews, location, an FAQ accordion, and a request-to-stay
  contact form (client-side only, no backend) — nothing is a stub.
- Every animated component respects `prefers-reduced-motion: reduce`.

## Structure

```
src/
  app/
    layout.tsx        Fonts (Fraunces + Inter via next/font), Nav/Preloader/CustomCursor/SmoothScroll wiring
    page.tsx           Assembles all sections
    globals.css        Design tokens + base styles
  lib/gsap.ts          Registers GSAP's ScrollTrigger + SplitText once, client-side
  components/
    SmoothScroll.tsx   Lenis provider synced to GSAP's ticker
    CustomCursor.tsx
    Nav.tsx
    Preloader.tsx
    RevealText.tsx     Reusable line-reveal wrapper
    RevealImage.tsx     Reusable clip-path image reveal + parallax wrapper
    Hero.tsx
    ValueMarquee.tsx
    About.tsx
    Gallery.tsx
    Amenities.tsx
    Booking.tsx / BookingCalendar.tsx
    Reviews.tsx
    Location.tsx
    Faq.tsx
    Contact.tsx
    Footer.tsx
```

## Images

All "photos" are CSS-gradient placeholders rendered by `RevealImage`
(`gradient` prop), each carrying the aspect ratio and grid slot a real
photo would take. To swap in real photos, replace the `gradient` prop
usages with a Next.js `<Image>` inside `RevealImage` — the reveal/
parallax animation wrapper works the same either way.

## Verification performed

- `npx tsc --noEmit` — clean
- `npx eslint .` — clean
- `npm run build` — production build succeeds, all routes prerender as
  static content
- `npm run start` + a local HTTP check — the server responds `200` and
  every section's heading text and `id` anchor is present in the
  server-rendered HTML
- A rendered screenshot of the hero was reviewed visually to confirm
  the typography, nav, and gradient hero render as intended
