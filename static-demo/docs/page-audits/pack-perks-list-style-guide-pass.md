# Pack Perks List Style Guide Pass

Date: 2026-05-26

## Files Inspected Before Editing

- `static-demo/pages/pack-perks-list.html`
- `static-demo/pages/style-guide.html`
- `static-demo/pages/component-system.html`
- `static-demo/css/halo-theme.css`
- `static-demo/css/tokens.css`
- `static-demo/css/components.css`
- `static-demo/vendor/packperks/css/styles.css`
- `static-demo/vendor/packperks/js/perks-filter.js`
- `static-demo/vendor/packperks/assets/`

## What Changed

### Hero

- Added the current Halo theme variables to the page before the Pack Perks stylesheet.
- Added a page-scoped body hook, `pack-perks-list-page`, so the modernization rules do not affect account, navigation, footer, or Pack Perks marketing pages.
- Rebuilt the hero treatment around the same flat Halo sale surface card aesthetic used on the account Pack Perks banner.
- Updated the hero heading to `Explore your pack perks`.
- Kept the hero focused to one primary CTA while preserving the existing member name and Pack Perks value claim.
- Kept the desktop/tablet hero image but moved it into a stable two-column layout.

### Cards, Typography, And Grid

- Removed the JS-driven filter/search controls so the page always renders every Pack Perks row without a broken inactive control surface.
- Added featured and category counts without changing offer values or partner content.
- Reworked featured benefits into a distinct full-bleed visual card type with image-as-surface, overlaid logo/value treatments, inverse copy, and a light CTA.
- Scoped card styling to use Halo card radius, borders, shadows, button radius, type scale, and muted text roles.
- Updated offer grids to use predictable 4-up desktop, 2-up tablet, and 1-up mobile behavior.
- Stabilized media ratios and card text heights on larger viewports.

### Mobile Behavior

- The hero image/art is hidden on mobile at `max-width: 720px`.
- Hero content stacks copy-first with full-width actions.
- Featured cards become a horizontal snap carousel on mobile/tablet so they remain visually distinct from the standard full-width offer cards.
- Partner offer cards collapse to one column with stable image ratios.

## Tokens And Style-Guide Rules Used

- `--halo-color-surface-page`, `--halo-color-surface-raised`, `--halo-color-surface-muted`
- `--halo-color-text-primary`, `--halo-color-text-secondary`, `--halo-color-text-inverse`, `--halo-color-text-inverse-muted`
- `--halo-color-action-primary`, `--halo-color-action-primary-hover`
- `--halo-color-link`, `--halo-color-link-hover`, `--halo-color-status-info-surface`
- `--halo-blue-950`, `--halo-blue-900`
- `--halo-container-live`
- `--halo-type-page`, `--halo-type-subsection`, `--halo-type-card-title`, `--halo-type-small`, `--halo-type-caption`
- `--halo-radius-*`, `--halo-component-card-radius`, `--halo-component-button-radius`, `--halo-component-form-radius`
- `--halo-shadow-card`, `--halo-shadow-card-lg`, `--halo-shadow-focus`

## Verification Commands And Results

- `git diff --check -- static-demo/pages/pack-perks-list.html static-demo/vendor/packperks/css/styles.css`
  - Result: passed with no output.
- Local href/src check for `static-demo/pages/pack-perks-list.html`
  - Result: checked 73 href/src values; local missing: 0.
- Browser verification at `http://127.0.0.1:4173/pages/pack-perks-list.html`
  - Desktop 1440x1000: no horizontal overflow, visible broken images: 0, hero image visible, featured grid 3 columns, offer grid 4 columns.
  - Tablet 820x1000: no horizontal overflow, visible broken images: 0, hero image visible, featured grid 2 columns, offer grid 2 columns.
  - Mobile 390x900: no horizontal overflow, visible broken images: 0, hero image display `none`, featured grid 1 column, offer grid 1 column.
  - Follow-up hero verification at desktop 1440x1000 and mobile 410x803: hero uses the flat sale surface, has one visible CTA, has no hero eyebrow, has no hero value chips, has no horizontal overflow, and mobile hero image display is `none`.
  - Browser console errors: none.
- Follow-up row visibility regression check:
  - Static count: 3 featured cards, 3 category blocks, and 11 standard offer cards remain in `static-demo/pages/pack-perks-list.html`.
  - The page no longer has a filter/search wrapper or `data-filter` controls, so `perks-filter.js` cannot hide rows on load.
- Follow-up featured card pass:
  - Static count remains 3 featured cards and 11 standard offer cards.
  - Hero heading is `Explore your pack perks`.
  - Featured cards use a full-bleed visual card style and switch to horizontal scroll snap below 900px.
- Screenshots saved:
  - `static-demo/screenshots/pack-perks-list-desktop.png`
  - `static-demo/screenshots/pack-perks-list-tablet.png`
  - `static-demo/screenshots/pack-perks-list-mobile.png`

## Remaining Concerns

- The source page still uses a few placeholder or reused partner images/logos inherited from the imported Pack Perks demo. This pass preserved those assets because replacing partner creative would risk inventing or altering source content.
- The hidden offer modal contains empty image elements until populated by JavaScript. They are not visible and were excluded from visible-image verification.
