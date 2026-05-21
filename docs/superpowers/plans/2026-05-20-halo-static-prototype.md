# Halo Static Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local static Halo design-system prototype that audits the live primary-nav pages, catalogs hosted assets and source components, and assembles a working demo plus component catalog.

**Architecture:** Phase 1 is static HTML/CSS/JS with JSON data outputs. Discovery scripts write data under `static-demo/data/`; the demo shell reads those files when available and has useful fallback content. Phase 2 will convert the validated model to Next.js after visual and component coverage are approved.

**Tech Stack:** Node ESM scripts, static HTML, CSS variables, vanilla JavaScript, hosted Halo media URLs, optional `python3 -m http.server` for local serving.

---

## File Structure

- `scripts/audit-live-site.mjs`: fetches live primary-nav pages, creates section maps and hosted asset database.
- `scripts/scrape-repo-components.mjs`: inventories repo-derived components, pages, headings, assets, and source provenance.
- `static-demo/data/live-nav.json`: primary nav links discovered from the live site.
- `static-demo/data/live-page-audit.json`: section map for live primary-nav pages.
- `static-demo/data/site-assets.json`: hosted image/video/SVG/media assets by page and section.
- `static-demo/data/component-inventory.json`: normalized source component catalog.
- `static-demo/data/repo-page-inventory.json`: repo page inventory for static HTML and React/Figma exports.
- `static-demo/data/commerce-account-components.json`: structured commerce/account/plan extraction inventory.
- `docs/phase-1-commerce-account-extraction.md`: human-readable extraction notes.
- `static-demo/index.html`: local demo landing page.
- `static-demo/pages/*.html`: assembled route demos.
- `static-demo/design-system/index.html`: component catalog view.
- `static-demo/css/tokens.css`: shared colors, type, spacing, radii, shadows.
- `static-demo/css/components.css`: reusable component styles.
- `static-demo/css/pages.css`: page-specific composition styles.
- `static-demo/js/components.js`: global nav, accordions, filters, modals, catalog data loading.
- `static-demo/js/commerce.js`: swatches, add-ons, price states, mini-cart drawer, promo state.

## Task 1: Live Site Audit And Hosted Asset DB

**Files:**
- Create: `scripts/audit-live-site.mjs`
- Create: `static-demo/data/live-nav.json`
- Create: `static-demo/data/live-page-audit.json`
- Create: `static-demo/data/site-assets.json`

- [ ] **Step 1: Create script with target pages**

Use this target page list:

```js
const TARGET_PAGES = [
  ['Home', 'https://www.halocollar.com/'],
  ['Halo Collars', 'https://www.halocollar.com/shop-wireless-dog-fence/'],
  ['Accessories', 'https://www.halocollar.com/main-shop/accessories/'],
  ['Beacons', 'https://www.halocollar.com/beacons/'],
  ['Testimonials', 'https://www.halocollar.com/reviews/'],
  ['Deals', 'https://www.halocollar.com/deals-discounts/'],
  ['How it works', 'https://www.halocollar.com/dog-fence-features/'],
  ['Halo App', 'https://www.halocollar.com/dog-fence-features/halo-app/'],
  ['Virtual GPS', 'https://www.halocollar.com/dog-fence-features/virtual-gps/'],
  ['GPS & Location Tracking', 'https://www.halocollar.com/dog-fence-features/gps-location-tracking/'],
  ['Cesar Millan Training', 'https://www.halocollar.com/dog-fence-features/cesar-millan-training/'],
  ['Feedback System', 'https://www.halocollar.com/dog-fence-features/feedback-system/'],
];
```

- [ ] **Step 2: Normalize relative URLs**

Implement URL normalization using:

```js
function absoluteUrl(raw, pageUrl) {
  if (!raw || raw.startsWith('data:') || raw.startsWith('blob:')) return null;
  try {
    return new URL(raw, pageUrl).href;
  } catch {
    return null;
  }
}
```

- [ ] **Step 3: Extract live nav links**

Extract anchor text/href from the homepage and keep nav-relevant labels matching:

```js
const NAV_LABEL_RE = /Halo Collars|Accessories|Beacons|Testimonials|Deals|How it works|Halo App|Explore Halo|My Account/i;
```

- [ ] **Step 4: Extract sections**

Use heading order as the first reliable section boundary. For every `h1`, `h2`, and meaningful `h3`, produce:

```json
{
  "sectionId": "home-hero",
  "order": 1,
  "sectionType": "hero",
  "heading": "Your backyard, now everywhere",
  "copySummary": "",
  "assetUrls": [],
  "candidateComponent": "Hero",
  "recommendation": "adapt",
  "notes": "Use V3 ecomlanders styling for the refreshed replica."
}
```

- [ ] **Step 5: Extract hosted assets**

Capture `img[src]`, `img[srcset]`, `source[src]`, `source[srcset]`, `video[src]`, `video[poster]`, and `url(...)` references in HTML. Skip `data:` URLs. Include tracking pixels only if they are remote image URLs and mark `assetType` as `tracking-pixel`.

- [ ] **Step 6: Run audit script**

Run:

```bash
node scripts/audit-live-site.mjs
```

Expected: three JSON files written under `static-demo/data/` and console output with page, section, and asset counts.

## Task 2: Repo Component Scrape

**Files:**
- Create: `scripts/scrape-repo-components.mjs`
- Create: `static-demo/data/component-inventory.json`
- Create: `static-demo/data/repo-page-inventory.json`

- [ ] **Step 1: Inventory Tock components**

Read `repos/ecomlanders/pages/Lander-v2-2026/tock-components/*/tock-component.json` and `template.tsx`. Extract name, metadata description, keywords, source path, props from `propsSchema`, interactions from comments and JSX cues, and `reviewStatus`.

- [ ] **Step 2: Inventory static repo pages**

Read HTML pages in:

```text
repos/ecomlanders/pages/Lander-v3-2026/
repos/ecomlanders/pages/Lander-v2-2026/
repos/ecomlanders/pages/lander-2026/
repos/ecomlanders/pages/tiktok-lander/
repos/packperks/
repos/new-halo/
```

For each page capture title, headings, major section classes, linked CSS, linked JS, and asset reference count.

- [ ] **Step 3: Inventory React plan selector**

Read `repos/halo-plan-selector/src/App*.tsx`, `VersionSelector.tsx`, and `components/ui`. Capture exported variants, plan selector behavior, Halo Care behavior, order summary, and UI primitives.

- [ ] **Step 4: Run scrape script**

Run:

```bash
node scripts/scrape-repo-components.mjs
```

Expected: `component-inventory.json` and `repo-page-inventory.json` written with repo/family/status counts.

## Task 3: Static Demo Shell

**Files:**
- Create: `static-demo/index.html`
- Create: `static-demo/pages/home.html`
- Create: `static-demo/pages/shop-wireless-dog-fence.html`
- Create: `static-demo/pages/accessories.html`
- Create: `static-demo/pages/beacons.html`
- Create: `static-demo/pages/how-it-works.html`
- Create: `static-demo/pages/feature-detail.html`
- Create: `static-demo/pages/plans.html`
- Create: `static-demo/pages/reviews.html`
- Create: `static-demo/pages/deals.html`
- Create: `static-demo/pages/account.html`
- Create: `static-demo/pages/pack-perks.html`
- Create: `static-demo/pages/blog-template.html`
- Create: `static-demo/pages/support-template.html`
- Create: `static-demo/design-system/index.html`
- Create: `static-demo/css/tokens.css`
- Create: `static-demo/css/components.css`
- Create: `static-demo/css/pages.css`
- Create: `static-demo/js/components.js`
- Create: `static-demo/js/commerce.js`

- [ ] **Step 1: Create shared shell**

Every static page should include:

```html
<link rel="stylesheet" href="../css/tokens.css">
<link rel="stylesheet" href="../css/components.css">
<link rel="stylesheet" href="../css/pages.css">
<script src="../js/components.js" defer></script>
```

Use corrected relative paths from `index.html` and `design-system/index.html`.

- [ ] **Step 2: Build homepage from V3 structure**

Use `repos/ecomlanders/pages/Lander-v3-2026/index.html` as section-order source. Include visible sections for hero, product intro, video, how-it-works, feature showcase, app safety, personas, before-buy, FAQ, and pricing CTA.

- [ ] **Step 3: Build PDP/configurator shell**

Include gallery, color swatches, membership box, add-on cards, price block, checkout CTA, mini-cart drawer, promo code toggle, and membership modal trigger.

- [ ] **Step 4: Build secondary route pages**

Each secondary route page must have real section structure and source/status badges, not empty filler text. Use headings from the live audit or repo pages.

- [ ] **Step 5: Build design-system catalog shell**

Group components by Global, Marketing, Commerce, Account, Templates. Attempt to fetch `../data/component-inventory.json` and `../data/commerce-account-components.json`; render fallback component cards if unavailable.

- [ ] **Step 6: Wire interactions**

Implement vanilla JS for:

```js
// components.js
// - mobile nav toggle
// - accordions
// - modal open/close
// - design-system JSON loading

// commerce.js
// - swatch selection
// - add-on add/remove state
// - price updates
// - mini-cart open/close
// - promo code success/error demo state
```

## Task 4: Commerce, Account, And Plan Extraction

**Files:**
- Create: `docs/phase-1-commerce-account-extraction.md`
- Create: `static-demo/data/commerce-account-components.json`

- [ ] **Step 1: Inventory commerce configurator components**

Inspect the `shop.html` and `shop.js` files in `ecomlanders` V3, V2, `lander-2026`, and `new-halo`. Record gallery, swatches, add-ons, membership box, modals, cart drawer, promo code, and WooCommerce API behavior.

- [ ] **Step 2: Inventory Pack Perks/account**

Inspect `repos/packperks/*.html`, `css/styles.css`, `css/robinhood.css`, and `js/*.js`. Record account shell, benefits cards, offer grid, offer detail, cancellation, and membership selection.

- [ ] **Step 3: Inventory plan selector**

Inspect `repos/halo-plan-selector/src/App*.tsx` and `VersionSelector.tsx`. Record plan tiers, billing cadence, Halo Care, multi-collar, and order summary logic.

- [ ] **Step 4: Write structured JSON**

Each record should include:

```json
{
  "id": "commerce-mini-cart",
  "family": "Commerce",
  "name": "Mini Cart Drawer",
  "sourceRepo": "HaloCollar/ecomlanders",
  "sourcePath": "repos/ecomlanders/pages/Lander-v3-2026/shop.html",
  "interactions": ["open", "close", "quantity increment", "quantity decrement", "remove item"],
  "states": ["empty", "with items", "promo collapsed", "promo success", "promo error"],
  "reviewStatus": "adapt",
  "notes": "Static demo should mimic behavior with local state; later Next.js can preserve WC Store API integration notes."
}
```

- [ ] **Step 5: Write human-readable extraction doc**

The doc must list component families, source files, review statuses, interaction states, and conversion risks.

## Task 5: Integration And Verification

**Files:**
- Modify as needed after worker outputs:
  - `static-demo/design-system/index.html`
  - `static-demo/pages/*.html`
  - `static-demo/js/*.js`
  - `static-demo/css/*.css`

- [ ] **Step 1: Validate JSON files**

Run:

```bash
node -e "for (const f of ['static-demo/data/live-page-audit.json','static-demo/data/site-assets.json','static-demo/data/component-inventory.json','static-demo/data/repo-page-inventory.json','static-demo/data/commerce-account-components.json']) { JSON.parse(require('fs').readFileSync(f,'utf8')); console.log('ok', f); }"
```

Expected: every file prints `ok`.

- [ ] **Step 2: Serve static demo**

Run:

```bash
cd static-demo && python3 -m http.server 4173
```

Expected: local server listens at `http://localhost:4173/`.

- [ ] **Step 3: Smoke test key URLs**

Open:

```text
http://localhost:4173/
http://localhost:4173/pages/home.html
http://localhost:4173/pages/shop-wireless-dog-fence.html
http://localhost:4173/design-system/
```

Expected: pages render without missing local CSS/JS.

- [ ] **Step 4: Interaction test**

On the PDP page, test swatches, add-on add/remove, cart drawer, promo code, and membership modal. Expected: all states change visibly without console errors.

- [ ] **Step 5: Catalog data test**

On `/design-system/`, confirm component cards load from JSON if available and fallback cards render if JSON fails.

## Self-Review Checklist

- Spec coverage: live primary-nav audit, asset DB, repo component scrape, static demo, component catalog, commerce/account extraction.
- Completeness scan: no unresolved markers or empty route pages.
- Type consistency: use `reviewStatus` values only from `keep`, `adapt`, `merge`, `gap`, `archive`.
- Static-first: no Next.js build setup in Phase 1.
