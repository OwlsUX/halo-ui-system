# Primary Website Style Guide Integration Checklist

Date: 2026-05-21
Branch: `impeccable-style-guide-pass`

## Scope

Primary website surfaces for this pass:

- `pages/home.html`
- `pages/shop-wireless-dog-fence.html`
- `pages/accessories.html`
- `pages/beacons.html`
- `pages/how-it-works.html`
- `pages/reviews.html`
- `pages/deals.html`

Secondary surfaces remain in backlog unless directly affected by shared tokens:

- `pages/account.html`
- `pages/pack-perks.html`
- `pages/plans.html`
- `pages/modern-accessories.html`
- `pages/modern-accessory-pdp.html`
- template pages

## Shared Criteria

Each primary page should:

- Load the correct shared token layer for its page family.
- Preserve source-backed copy, products, prices, proof, and claims.
- Use `--halo-blue-950`, `--halo-ink`, and semantic text/surface tokens instead of generic black where practical.
- Use yellow only for true primary CTA or promo moments.
- Use Halo blue for links, selected states, focus states, and technical accents.
- Avoid oversized generic heading scales outside true first-viewport hero moments.
- Avoid nested cards and repeated same-size filler card grids.
- Keep product/media wells stable with fixed aspect ratio and no awkward image crops.
- Keep the customer-facing nav free of internal design-system links.
- Keep the workbench drawer visible and working.

## Baseline Drift Snapshot

Hardcoded black/gray drift found before this integration pass:

| File | Count | Notes |
| --- | ---: | --- |
| `css/accessories-page.css` | 0 | Token cleanup mostly complete; focus should be layout/media polish. |
| `css/beacons-page.css` | 1 | One `rgba(17, 17, 17...)` shadow. |
| `css/feature-page.css` | 6 | Hero/media overlays and shadows. |
| `css/reviews-page.css` | 9 | Media overlays and proof/story surfaces. |
| `css/deals-page.css` | 4 | Product shadows and comparison borders. |
| `css/pdp-configurator-page.css` | 37 | Heavy use of `--halo-gray-900` plus overlay rgba values. |
| `css/v3-nav.css` | 20 | Global nav hardcoded black/rgba values. |
| `css/components.css` | 8 | Global overlay and drawer legacy rgba values. |

## Integration Review Order

1. Accessories category: confirm category layout, image wells, product cards, and support CTA.
2. PDP/configurator: confirm buy flow, plan states, swatches, add-ons, mini-cart, and typography.
3. Marketing pages: confirm Beacons, How it works, Reviews, and Deals use the same visual language.
4. Global nav/drawer: confirm customer nav and workbench drawer remain separate and persistent.
5. Full route/link check.
6. Browser or equivalent visual check at desktop and mobile.

## Verification Commands

```bash
node --check static-demo/js/components.js
node -e "JSON.parse(require('fs').readFileSync('static-demo/data/style-tokens.json','utf8')); console.log('tokens json ok')"
```

Run the local HTML link scanner used in previous audits.

Check primary routes:

```bash
node <inline fetch route checker>
```

If browser tooling is available, verify:

- no console errors
- no visible broken images
- no horizontal overflow
- workbench trigger visible
- drawer opens and closes
- PDP color swatch changes
- PDP plan selection works
- PDP add-to-cart opens mini-cart

## Open Questions

- Should Deals move from blue local CTA treatment to yellow primary action for shopping CTAs?
- Should V3 homepage/PDP eventually load `tokens.css`, or should `halo-theme.css` remain the bridge for V3-derived pages?
- Should source-era overlay values become named semantic overlay tokens rather than one-off rgba values?

## Integration Result

Completed the first primary website style-guide migration pass across:

- Accessories category
- Beacons
- How it works
- Reviews
- Deals
- PDP/configurator
- Global V3 nav and workbench drawer layer

Audit files created by the agent team:

- `static-demo/docs/page-audits/accessories-style-guide-migration.md`
- `static-demo/docs/page-audits/primary-marketing-style-guide-migration.md`
- `static-demo/docs/page-audits/pdp-style-guide-migration.md`
- `static-demo/docs/page-audits/primary-website-style-guide-qa.md`

Main-thread integration fixes:

- Removed the remaining internal `Style guide` footer link from `pages/accessories.html`.
- Removed trailing whitespace from `js/components.js`.
- Replaced the remaining `--black` fallback in `css/v3-nav.css` with the deep blue ink fallback.

Fresh verification after integration:

- `node --check static-demo/js/components.js`: pass.
- `style-tokens.json` parse check: pass.
- `git diff --check`: pass.
- Local HTML link scan: 19 files, 639 refs, 2 JavaScript template refs skipped, 0 failures.
- Primary HTTP route check: all checked routes returned `200`.
- Target raw black/gray drift scan across primary CSS files: 0 matches.
- Customer-facing primary pages no longer contain internal style-guide/design-system/prompt/audit links.

Browser verification note:

- Agents captured Playwright screenshots and browser metrics for their page areas.
- Main-thread Playwright test-runner verification was attempted, but the workspace has the Playwright screenshot CLI without a resolvable local `@playwright/test` module for custom tests. No persistent dependency was added.
