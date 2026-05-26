# Primary Marketing Style Guide Migration

Date: 2026-05-21
Branch: `impeccable-style-guide-pass`

## Scope

Owned pages:

- `static-demo/pages/beacons.html`
- `static-demo/pages/how-it-works.html`
- `static-demo/pages/reviews.html`
- `static-demo/pages/deals.html`

Owned CSS:

- `static-demo/css/beacons-page.css`
- `static-demo/css/feature-page.css`
- `static-demo/css/reviews-page.css`
- `static-demo/css/deals-page.css`

## Shared Context Read

- `static-demo/pages/style-guide.html`
- `static-demo/design-system/style-guide.html`
- `static-demo/css/halo-theme.css`
- `static-demo/css/tokens.css`
- `static-demo/data/style-tokens.json`
- `static-demo/docs/web-ui-style-guide.md`
- `static-demo/docs/page-audits/style-guide-impeccable-pass.md`
- `static-demo/pages/home.html`
- Target page HTML and CSS listed above
- `repos/impeccable/skill/SKILL.md`
- `repos/impeccable/skill/reference/layout.md`
- `repos/impeccable/skill/reference/polish.md`
- `repos/impeccable/skill/reference/typography.md`
- `repos/impeccable/skill/reference/color-and-contrast.md`
- `repos/impeccable/skill/reference/responsive-design.md`

`node repos/impeccable/skill/scripts/load-context.mjs` returned no `PRODUCT.md` or `DESIGN.md`, so Halo-specific direction came from the user prompt and the required local style-guide files.

## Per-Page Changes

### Beacons

- Completed the V3 ecommerce nav markup that had been partially inserted before this pass.
- Kept live/source copy, Beacon products, prices, comparison rows, setup instructions, FAQ, and CTA intent intact.
- Tightened hero and section type to style-guide page/section/card roles.
- Shifted the page toward full-width dark/product bands, product modules, comparison, setup, FAQ, and support CTA rhythm instead of oversized repeated card treatments.
- Converted Beacon product surfaces, chips, comparison table header, success/no states, dark sections, and product shadows toward semantic tokens or local page tokens backed by Halo semantics.

### How It Works

- Completed the V3 ecommerce nav markup and removed the internal style-guide footer link, replacing it with a customer-facing support link.
- Preserved all setup, fence, app, collar, commerce, assurance, and FAQ copy.
- Migrated dark hero, footer, muted surfaces, text colors, image shadows, and inverse copy toward shared Halo roles.
- Kept the image-led hero as the page’s true first-viewport hero while keeping later section and card type tighter.

### Reviews

- Completed the V3 ecommerce nav markup.
- Preserved review metrics, quotes, press tiles, story links, product proof, purchase benefits, and FAQ copy.
- Reduced the reviews H1 to the page-headline role rather than oversized generic display type.
- Migrated dark/yellow proof tiles, story overlays, getting-started scrims, product proof shadows, muted surfaces, and text colors toward semantic tokens or local overlay tokens.

### Deals

- Completed the V3 ecommerce nav markup.
- Preserved all deals, prices, product names, bundle savings, model comparison facts, swatches, and CTAs.
- Kept the page-specific blue deal CTA exception, now expressed through local tokens backed by `--halo-color-link` and dark action semantics.
- Tightened deal product heading scale so offer modules read as commerce UI rather than hero type.
- Reworked the blue CTA rendering so the button label is visible in mobile and desktop screenshots.

## Token Migration Notes

- Required hardcoded grep targets were removed from owned CSS:
  - `#000`
  - `#111`
  - `#171717`
  - `#424242`
  - `rgba(0, 0, 0...)`
  - `rgba(17, 17, 17...)`
- Page-local overlay/shadow tokens remain where the shared system does not yet expose exact semantic overlay roles for hero scrims, image chips, and product drop shadows.
- Product color swatches in Deals intentionally keep source-backed raw swatch colors because they represent actual collar colors, not theme UI colors.
- Reviews keeps the New York Post red as a page-local source/press color.
- Deals keeps a blue primary deal CTA as a documented page-specific exception.

## Hardcoded Drift Left

- White alpha overlays remain in local page tokens for dark hero controls and image overlays because no shared inverse overlay token exists yet.
- Yellow radial accents remain as local rgba expressions around product media; a future shared token could expose a `--halo-color-action-primary-glow` role.
- V3 nav CSS still contains source-era hardcoded values outside this pass and was not edited per scope.

## Verification

Hardcoded target grep before this pass found matches in all four owned CSS files. Final command:

```bash
rg -n "#000|#111|#171717|#424242|rgba\\(0, 0, 0|rgba\\(17, 17, 17" static-demo/css/beacons-page.css static-demo/css/feature-page.css static-demo/css/reviews-page.css static-demo/css/deals-page.css
```

Result: no matches.

HTML local link scan:

```bash
node <inline local href/src scanner>
```

Result:

- HTML files checked: 4
- Failures: 0

Route checks with the existing local server:

```bash
node <inline fetch route checker>
```

Result:

- `/pages/beacons.html 200`
- `/pages/how-it-works.html 200`
- `/pages/reviews.html 200`
- `/pages/deals.html 200`

Diff whitespace check:

```bash
git diff --check -- static-demo/pages/beacons.html static-demo/pages/how-it-works.html static-demo/pages/reviews.html static-demo/pages/deals.html static-demo/css/beacons-page.css static-demo/css/feature-page.css static-demo/css/reviews-page.css static-demo/css/deals-page.css
```

Result: no output.

Browser screenshots:

- `static-demo/screenshots/primary-marketing-beacons-desktop.png`
- `static-demo/screenshots/primary-marketing-beacons-mobile.png`
- `static-demo/screenshots/primary-marketing-how-it-works-desktop.png`
- `static-demo/screenshots/primary-marketing-how-it-works-mobile.png`
- `static-demo/screenshots/primary-marketing-reviews-desktop.png`
- `static-demo/screenshots/primary-marketing-reviews-mobile.png`
- `static-demo/screenshots/primary-marketing-deals-desktop.png`
- `static-demo/screenshots/primary-marketing-deals-mobile.png`

Visual checks from screenshots:

- Mobile drawer trigger is visible on target mobile routes.
- Primary page CTAs are visible and readable, including the Deals blue CTA exception.
- First viewport layout renders without obvious horizontal clipping in captured desktop/mobile screenshots.

Limitation:

- The workspace can run the Playwright CLI for screenshots, but `require('playwright')` is not available to an inline Node script. Console-error and precise `scrollWidth > clientWidth` checks were therefore not automated in this pass.
