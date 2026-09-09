# Harborline Rentals — Apartment Listing Site

A single-page, self-contained apartment rental website: search/filter bar,
a live-filtered listing grid, neighborhood highlights, testimonials, a
tour-request form, and an FAQ accordion. No build step, no external
dependencies besides a Google Fonts import — just open `index.html`.

## Run it

```bash
# from this folder
python3 -m http.server 8000
# then open http://localhost:8000
```

Or just double-click `index.html` to open it directly in a browser.

## Design choices

The palette, typography and layout pattern were pulled from this repo's own
design-intelligence search rather than picked arbitrarily:

```bash
python3 ../src/ui-ux-pro-max/scripts/search.py "apartment rental listing real estate" --domain product
python3 ../src/ui-ux-pro-max/scripts/search.py "real estate property trust" --domain color
python3 ../src/ui-ux-pro-max/scripts/search.py "real estate minimal professional" --domain typography
```

- **Style:** Glassmorphism (frosted header/search bar/hero card) + Minimalism,
  matching the "Real Estate/Property" and "Directory/Listing" product
  recommendations (filter-heavy grid, hero-centric landing pattern).
- **Color:** Trust teal/blue palette (`#0F766E` primary, `#0369A1` accent)
  with a gold accent for "Featured" badges, per the Real Estate/Property
  palette entry in `data/colors.csv`.
- **Typography:** Inter ("Minimal Swiss" pairing) for a clean, functional
  feel suited to a filter-heavy directory rather than the more ornate
  luxury real-estate pairing.
- Light/dark mode both defined via `prefers-color-scheme`.

## Structure

Everything lives in one file, `index.html` (HTML + inline `<style>` +
inline `<script>`), for easy portability:

- Sticky header that turns into a frosted-glass bar on scroll, with a
  mobile menu.
- Hero with a glassmorphic search/filter card (location, bedrooms, max
  price, move-in date).
- Listing grid driven by an in-memory JS array — filters by amenity chips,
  sorts by price/bedrooms, and supports per-card favoriting, all client-side.
- "How it works", neighborhood/feature highlights, testimonials, an FAQ
  accordion, and a tour-request form with client-side validation and a
  success state (no backend — this is a static front-end demo).

## Notes

This is a demo/portfolio site: listing data is hard-coded, the tour form
doesn't submit anywhere, and photos are drawn as gradient placeholders
instead of real images so the page stays fully self-contained and works
offline.
