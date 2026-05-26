# Style Guide Page Tactical Rebuild

Date: 2026-05-26
Branch: `impeccable-style-guide-pass`

## What Was Wrong

- The prior redesign overcorrected into a verbose design-rationale page.
- The hero typography was far too large for a style guide and made the page unusable as a reference.
- Full-width UX slabs and long explanatory copy distracted from the practical job: showing the actual web UI system.
- Tactical information such as colors, type, containers, grids, surfaces, and control states was buried under oversized specimens.

## What Changed

- Rebuilt the page as a compact tactical website guide.
- Replaced the oversized hero with a short, left-aligned intro. The H1 is now the literal page title: `Halo Web Style Guide`.
- Removed the source-file panel and hero CTA cluster.
- Changed the intro to a dark Halo foundation surface with inverted text, modest vertical space, and a small Halo-yellow rule so it feels anchored without becoming a marketing hero.
- Updated the typography table to show actual pixel sizes beside each type token, including responsive desktop/mobile values for display, hero, page, and section roles.
- Clarified font guidance so `--halo-font-live` is the visible primary Halo web stack, removed the fallback stack specimen, and aligned type specimens and section headings to the lighter 650 weight.
- Re-centered the IA around practical sections:
  - Color roles
  - Typography scale
  - Containers, grids, and spacing
  - Card templates, grids, surfaces, radius, and elevation
  - Component catalog link and inline component review rows
- Removed the reusable page patterns section after review because the examples were not useful enough for this tactical guide.
- Kept the shared Halo promo/nav/footer injection through `components.js`.
- Kept both routes synchronized:
  - `static-demo/pages/style-guide.html`
  - `static-demo/design-system/style-guide.html`

## Card, Grid, And Badge Updates

- Replaced the weak surface-card table with card template states for default, hover/raised, selected, and disabled cards.
- Added layout examples for a 3-up card grid, 2-up card grid, a taller 50/50 full-width card, and a compact full-width card.
- Replaced the small breakpoint proxy diagrams with full inline product-card examples for desktop 3-up plus featured span, tablet 2-up, and mobile 1-up layouts.
- Used colored media placeholders in these card templates so the guide demonstrates card anatomy and layout behavior without depending on specific product imagery.
- Restored the tactical badge examples from the prior guide:
  - `NEW`
  - `Save $75`
  - `Current plan`
  - `Most popular`
  - `WHILE SUPPLIES LAST`

## Token Usage

- Continued using `static-demo/css/halo-theme.css` and `static-demo/css/tokens.css`.
- Kept Halo yellow for action and promotional CTAs.
- Kept Halo blue for links, selected states, and focus.
- Kept `--halo-blue-950` as the deep blue ink and dark-surface foundation.
- Used page-scoped `sg-*` classes to avoid collisions with shared nav/footer and existing product card classes.
- Removed framed component demo panels from the tactical guide; component inventory now lives behind the component catalog link, while the guide shows only inline rows for quick review.
- Kept button, badge, and field-label text at a readable lighter weight instead of the prior extra-bold control styling.
- Removed all `#patterns` links and pattern-specific CSS.

## Verification

- `diff -q` confirmed the two style-guide routes are synchronized.
- CSS brace check passed.
- Local HTML link and image reference scan passed.
- Browser verification passed for both routes at `1440x1000`, `1024x900`, and `390x844`.
- Confirmed:
  - HTTP `200` on both routes
  - shared Halo nav injected
  - shared Halo footer injected
  - yellow promo bar has 3 messages
  - intro H1 is `Halo Web Style Guide`
  - intro has no CTAs
  - source-file panel is absent
  - intro has no horizontal overflow and stays on the page grid
  - no browser console errors
  - no failed local requests
  - no broken rendered images
  - no body-level horizontal overflow
  - three breakpoint grid examples render
  - four card state templates render
  - three card layout panels render
  - old `.surface-card` and `.grid-demo` examples are gone
  - no `.component-panel` boxes remain in the component section
  - component catalog link resolves to `../design-system/index.html`
  - four inline component review rows render
  - no `#patterns` section or links remain
  - visible main content text bottoms out at 13px
  - max type size is 60px desktop and 32px mobile

## Screenshots

- `static-demo/screenshots/style-guide-redesign-desktop.png`
- `static-demo/screenshots/style-guide-redesign-mobile.png`

## Remaining Gaps

- Impeccable still flags Inter and single-font usage. This is expected under the Halo font-stack constraint.
- The style guide is now tactical again, but component extraction into shared HTML/CSS primitives remains a separate implementation step.
