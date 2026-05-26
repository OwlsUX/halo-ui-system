# Primary Website Style Guide QA

Date: 2026-05-21
Branch: `impeccable-style-guide-pass`
Scope: customer-facing global nav, workbench drawer, and shared component layer during primary website style-guide migration.

## Files Audited

- `static-demo/css/v3-nav.css`
- `static-demo/css/components.css`
- `static-demo/js/components.js`
- Required context files listed in the task prompt, including the style guide, token sources, previous audits, primary page routes, and Impeccable references.

## Routes Checked

Static and HTTP checks covered:

- `/`
- `/pages/style-guide.html`
- `/pages/home.html`
- `/pages/shop-wireless-dog-fence.html`
- `/pages/accessories.html`
- `/pages/beacons.html`
- `/pages/how-it-works.html`
- `/pages/reviews.html`
- `/pages/deals.html`
- `/css/v3-nav.css`
- `/css/components.css`
- `/js/components.js`

Browser drawer checks covered:

- `/`
- `/pages/home.html`
- `/pages/shop-wireless-dog-fence.html`
- `/pages/accessories.html`
- `/pages/style-guide.html`

## Drawer Status

Status: pass with documented fallback drift.

- `components.js` still injects the workbench drawer markup and styles independently of page CSS.
- The drawer trigger was visible on overview, homepage, PDP, accessories, and style guide.
- Open state set `.workbench-drawer[aria-hidden="false"]` and `.workbench-trigger[aria-expanded="true"]`.
- Close state restored `.workbench-drawer[aria-hidden="true"]` and `.workbench-trigger[aria-expanded="false"]`.
- Drawer injected styles now prefer semantic style-guide tokens for surface, text, border, focus, shadow, and scrim roles.
- Hardcoded fallbacks remain inside the injected CSS so the drawer stays visible on pages that omit shared CSS. These are intentional resilience fallbacks, not primary styling.

## Customer Nav Status

Status: pass for global header scope.

- The primary route headers did not include internal design-system links such as style guide, component catalog, docs, audit, prompts, or workbench links.
- Header links continue to map to local primary routes for homepage, PDP/configurator, beacons, accessories, testimonials, deals, how-it-works, account, and cart/shop actions.
- The workbench drawer remains separate from the customer nav and contains internal design-system, docs, audit, and concept-lab links.
- The overview hub is intentionally not a customer-facing primary website route; it still links to style guide and docs as a hub surface.

Page-specific drift observed but not fixed because page files were outside scope:

- `static-demo/pages/accessories.html` footer includes a `Style guide` link.
- `static-demo/pages/how-it-works.html` footer includes a `Style guide` link.

## Token Fixes Made

- Replaced shared promo strip, sticky nav, nav icon hover, brand mark, hero/media dark surfaces, modal scrim, footer inverse text, and workbench drawer colors in `components.css` with semantic tokens.
- Replaced source-era hardcoded gray/black/white/blue/yellow values in `v3-nav.css` where they were global nav, mega-menu, mobile drawer, product tile, CTA, or light-nav override roles.
- Updated `components.js` injected drawer CSS to prefer semantic tokens:
  - `--halo-color-surface-dark`
  - `--halo-color-drawer-background`
  - `--halo-color-drawer-scrim`
  - `--halo-color-text-primary`
  - `--halo-color-text-secondary`
  - `--halo-color-text-inverse`
  - `--halo-color-border-*`
  - `--halo-color-focus`
  - `--halo-color-link`
  - `--halo-shadow-*`

## Remaining Global Hardcoded Drift

- `components.css` keeps a hardcoded deep-blue rgba gradient for the generic hero image overlay because no dedicated semantic overlay token exists yet and this was not a token-source pass.
- `v3-nav.css` and `components.js` retain raw fallback values inside `var(..., fallback)` declarations. These are intentional for independent rendering when a page misses shared token CSS.
- Some shadow fallbacks still use rgba values. Primary styling now resolves through `--halo-shadow-*`; the raw values are fallbacks only.
- Existing page-specific CSS and footer content may still contain source-era hardcoded drift. Those files were not edited in this pass.

## Verification

JavaScript syntax:

```bash
node --check static-demo/js/components.js
```

Result: exit 0, no output.

Local HTML link scan:

```bash
node <inline local href/src scanner>
```

Result:

- HTML files: 19
- Local href/src checked: 640
- Template placeholders skipped: 2
- Failures: 0

HTTP route check, using `python3 -m http.server 8765` from `static-demo`:

```bash
node <inline fetch route checker>
```

Result:

- `200 /`
- `200 /pages/style-guide.html`
- `200 /pages/home.html`
- `200 /pages/shop-wireless-dog-fence.html`
- `200 /pages/accessories.html`
- `200 /pages/beacons.html`
- `200 /pages/how-it-works.html`
- `200 /pages/reviews.html`
- `200 /pages/deals.html`
- `200 /css/v3-nav.css`
- `200 /css/components.css`
- `200 /js/components.js`

Header internal-link scan:

```bash
node <inline primary header scanner>
```

Result:

- `home`: internal false, bad local hrefs 0
- `shop-wireless-dog-fence`: internal false, bad local hrefs 0
- `accessories`: internal false, bad local hrefs 0
- `beacons`: internal false, bad local hrefs 0
- `how-it-works`: internal false, bad local hrefs 0
- `reviews`: internal false, bad local hrefs 0
- `deals`: internal false, bad local hrefs 0

Browser verification:

- Overview: trigger visible, open/close state passed.
- Homepage: trigger visible, open/close state passed, customer header contained no internal links.
- PDP/configurator: trigger visible, open/close state passed, customer header contained no internal links.
- Accessories: trigger visible, open/close state passed, customer header contained no internal links.
- Style guide: trigger visible, open/close state passed.

## Recommendations

- Page agents should remove customer-facing footer links to `style-guide.html` from primary pages unless those footers are intentionally demo-only.
- Main thread should consider adding explicit semantic overlay tokens if generic image scrims are expected to migrate away from rgba values across global and page CSS.
- Keep drawer CSS fallbacks in `components.js`; they are necessary for independent visibility when pages omit shared CSS.
- Future page-specific migrations should continue replacing raw overlays and black/gray source values route by route rather than broad global rewrites.
