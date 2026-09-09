# Motion Showcase

Four common website animation styles, side by side, built to help pick a
motion language before applying it to `apartment-rental-site/` and
`holiday-apartment-booking/`. No dependencies — vanilla CSS/JS, no GSAP.

## Why this exists

The original request was "animations like this TikTok video," but
`tiktok.com` is blocked from this environment's network egress, so the
clip couldn't be viewed. This page is a stand-in: four distinct, commonly
used motion styles to compare and pick from instead of guessing.

## Run it

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Styles included

- **A — Scroll reveal + parallax.** Background glow layers drift at
  different speeds on scroll; cards fade/slide up with a short stagger
  as they enter the viewport.
- **B — Magnetic buttons + tilt cards + custom cursor.** A button that
  pulls toward the cursor within a radius, cards that tilt in 3D based
  on pointer position, a two-part custom cursor (dot + lagging ring).
  Auto-disabled on touch devices (`pointer: fine` check).
- **C — Aurora / mesh gradient background.** Three blurred, screen-blended
  color blobs looping on independent 9–13s cycles behind glass-card copy.
- **D — Staggered text reveal + infinite marquee.** A headline that
  animates in word-by-word on load, and a looping horizontal strip of
  tags that pauses on hover.

All four honor `prefers-reduced-motion: reduce` — reduced-motion visitors
get the final, settled state immediately instead of the animation.

## Next step

Tell me which style(s) to carry over (e.g. "A and C"), and I'll apply that
same motion language — scroll reveals, parallax, aurora background,
magnetic/tilt, or staggered headlines — to the two apartment sites.
