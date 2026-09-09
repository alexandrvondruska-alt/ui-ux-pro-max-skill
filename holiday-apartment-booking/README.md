# Willow & Pine — Holiday Apartment Booking Page

A single-property booking page for an apartment available over the
holidays: a photo gallery, amenities, an interactive availability
calendar with live price calculation, reviews, location, an FAQ, and a
"request to book" contact form. Self-contained, no build step — just
open `index.html`.

## Run it

```bash
# from this folder
python3 -m http.server 8000
# then open http://localhost:8000
```

Or double-click `index.html` to open it directly in a browser.

## Design choices

Palette, typography and layout pattern came from this repo's own
design-intelligence search (`ui-ux-pro-max`) rather than being picked
arbitrarily:

```bash
python3 ../src/ui-ux-pro-max/scripts/search.py "vacation rental short term booking holiday" --domain product
python3 ../src/ui-ux-pro-max/scripts/search.py "travel tourism destination" --domain color
python3 ../src/ui-ux-pro-max/scripts/search.py "hospitality elegant vacation home" --domain typography
python3 ../src/ui-ux-pro-max/scripts/search.py "storytelling hero centric booking" --domain landing
```

- **Layout pattern:** Hero-Centric Design — since this is one listing
  (not a directory of many), a full-bleed hero + value-prop strip fits
  better than the filter-heavy grid used for the multi-listing
  `apartment-rental-site/`.
- **Color:** Travel/Tourism palette — sky blue (`#0EA5E9`) primary with
  adventure orange (`#EA580C`) accent, for a warm, inviting "holiday"
  feel rather than a purely corporate trust palette.
- **Typography:** "Classic Elegant" pairing — Playfair Display for
  headings, Inter for body — elegant but still easy to scan.
- Light/dark mode both defined via `prefers-color-scheme`.

## What's interactive

Everything is client-side JS, no backend:

- **Availability calendar** — pick a check-in and check-out date;
  already-booked days are disabled and can't be selected across. Price
  (nightly rate × nights + cleaning fee + service fee) updates live and
  feeds into the "Request to book" summary.
- **FAQ accordion**, mobile nav, scroll-reveal animations, a frosted
  header that appears on scroll.
- **Request form** with basic client-side validation and a success
  state — it doesn't submit anywhere; this is a static front-end demo.

## Note on the 21st.dev MCP server

This site was built directly against the `ui-ux-pro-max` skill's design
data. The `21st` MCP server that was added to this session's local
Claude Code config isn't loaded mid-session (MCP servers are read at
session start), so it wasn't available to source components from here —
a fresh session against this project would pick it up.
