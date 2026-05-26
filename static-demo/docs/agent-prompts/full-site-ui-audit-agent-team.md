# Claude Code Agent Team Prompt: Full Halo UI System Page Audit

You are working in the `OwlsUX/halo-ui-system` repo. Your goal is to perform a full-page audit and repair pass across every live static page so the system is cohesive, production-like, and ready for repeated page assembly by future agents.

Do not invent a new visual language. Use the current Halo style guide and shared tokens as the source of truth:

- `static-demo/pages/style-guide.html`
- `static-demo/design-system/style-guide.css`
- `static-demo/css/tokens.css`
- `static-demo/css/halo-theme.css`
- `static-demo/css/components.css`
- `static-demo/css/v3-nav.css`
- `static-demo/js/components.js`
- `static-demo/docs/live-page-index.md`

Primary live reference:

- `https://owlsux.github.io/halo-ui-system/pages/style-guide.html`

## Team Structure

Split the work across agents by page family. Each agent should work on a branch or clearly scoped file set and report changed files, screenshots, and verification results before merge.

### Agent 1: Shared Chrome and Drawer

Scope:

- `static-demo/js/components.js`
- `static-demo/css/components.css`
- `static-demo/css/v3-nav.css`
- every page listed in `static-demo/docs/live-page-index.md`

Responsibilities:

1. Ensure every live page loads the shared customer-facing nav/header, footer, promo bar, and floating workbench drawer.
2. Remove duplicated or stale local nav/footer implementations where they conflict with shared chrome.
3. Ensure the yellow promo/butter bar uses the same three rotating messages everywhere customer chrome appears.
4. Ensure the floating page drawer is available on every page and only includes the agreed page groups:
   - Main website pages
   - Marketing landing pages
   - Pack Perks pages
   - Style Guide
   - Component System as a coming-soon link
5. Fix broken drawer links and relative paths from root, `/pages/`, and `/design-system/` routes.
6. Keep customer nav separate from internal workbench navigation.

Acceptance criteria:

- Header, footer, promo bar, and drawer are visually consistent across every page.
- No page has overlapping navs, duplicate headers, duplicate footers, or old footer variants.
- Drawer opens/closes and links resolve from every route family.

### Agent 2: Main Website Pages

Scope:

- `static-demo/pages/home.html`
- `static-demo/pages/shop-wireless-dog-fence.html`
- `static-demo/pages/accessories.html`
- `static-demo/pages/modern-accessories.html`
- `static-demo/pages/modern-accessory-pdp.html`
- `static-demo/pages/beacons.html`
- `static-demo/pages/how-it-works.html`
- `static-demo/pages/deals.html`
- `static-demo/pages/reviews.html`
- `static-demo/pages/plans.html`
- related page CSS files

Responsibilities:

1. Audit typography against the style guide: H1-H6 sizing, paragraph scale, eyebrow text, labels, captions, price text, and CTA text.
2. Normalize page section spacing, max widths, section rhythm, and grid behavior using shared tokens.
3. Make all category/PDP/product grids consistent across desktop, tablet, and mobile.
4. Remove one-off overlarge fonts or legacy spacing values that do not match the homepage/style guide.
5. Confirm every page still carries the intended live Halo content and page purpose.

Acceptance criteria:

- Pages feel like one website.
- Page grids align to the same container system.
- Mobile pages have no horizontal overflow, clipped CTAs, or broken media framing.

### Agent 3: Accessory PDPs

Scope:

- all `static-demo/pages/accessory-*.html`
- `static-demo/js/accessory-pdp.js`
- accessory image assets and manifest if referenced
- relevant product/card CSS

Responsibilities:

1. Audit every accessory PDP listed in `static-demo/docs/live-page-index.md`.
2. Ensure accessory PDPs use the accessory-specific carousel model: one featured image with a horizontal thumbnail carousel.
3. Keep the collar PDP waterfall gallery unchanged.
4. Ensure accessory PDP typography, spacing, CTA stack, price area, comparison modules, related products, and product-card media follow the current style guide.
5. Verify processed transparent product images fit on the blue product-card surface without clipping or awkward white boxes.

Acceptance criteria:

- Every accessory product has a valid PDP route.
- All accessory PDPs feel like one template family.
- Product media is centered, not clipped, and uses `object-fit: contain`.

### Agent 4: Account, Membership, and Pack Perks

Scope:

- `static-demo/pages/account.html`
- `static-demo/pages/account-perks.html`
- `static-demo/pages/account-perks-v2.html`
- `static-demo/pages/membership-selection.html`
- `static-demo/pages/pack-perks-list.html`
- `static-demo/pages/pack-perks-source-index.html`
- `static-demo/pages/pack-perks-marketing.html`
- `static-demo/pages/pack-perks-marketing-v2.html`
- `static-demo/pages/pack-perks-marketing-v3.html`
- `static-demo/pages/pack-perks.html`
- `static-demo/pages/offer-detail.html`
- `static-demo/pages/cancellation.html`
- `static-demo/css/account-packperks-page.css`
- Pack Perks vendor CSS only where necessary

Responsibilities:

1. Bring Pack Perks/account pages into the same typography, spacing, and grid system without erasing the Pack Perks source UI intent.
2. Use the established Pack Perks color roles and membership/status tokens.
3. Fix page grids on desktop and mobile.
4. Remove mobile hero imagery where already decided, especially when docked decorative art no longer helps.
5. Ensure CTAs, cards, plan selectors, benefit cards, and billing modules follow shared radius, border, shadow, and focus rules.

Acceptance criteria:

- Account and Pack Perks pages feel related to Halo ecommerce while preserving their internal-app density.
- Mobile layouts are usable, not just scaled-down desktop.
- No local header/footer drift.

### Agent 5: Design System and Template Pages

Scope:

- `static-demo/pages/style-guide.html`
- `static-demo/design-system/style-guide.html`
- `static-demo/design-system/style-guide.css`
- `static-demo/pages/component-system.html`
- `static-demo/pages/blog-template.html`
- `static-demo/pages/feature-detail.html`
- `static-demo/pages/support-template.html`
- `static-demo/index.html`

Responsibilities:

1. Ensure the style guide remains tactical and readable, with clear H1-H6 typography specs, button states, radius, grid/container rules, spacing, and component examples.
2. Ensure the component-system route is a coming-soon page unless real component inventory is ready.
3. Ensure overview/index links match the real live page inventory.
4. Avoid placing nav/footer examples inside decorative cards if it makes the example misleading.
5. Keep pills/badges content-sized, not full-width, unless explicitly used as a block status row.

Acceptance criteria:

- The style guide is useful for future page-building agents.
- Examples show real decisions, not decorative filler.
- Overview and design-system links are current.

## Required Audit Procedure

Every agent must:

1. Read `static-demo/docs/live-page-index.md`.
2. Read the style guide and shared token files.
3. Inspect the pages in their scope before editing.
4. Document exact discrepancies in a page-audit note before or while fixing.
5. Prefer shared CSS variables and shared components over new local values.
6. Keep edits scoped to the pages and CSS in their assignment.
7. Do not overwrite unrelated dirty work.

## Responsive QA Matrix

Check each page family at:

- Desktop: `1440x1000`
- Tablet: `1024x900`
- Mobile: `390x844`

At each viewport verify:

- no horizontal overflow
- no text overlap
- no CTA text clipping
- no cards stretching unexpectedly
- no full-width pills unless explicitly intentional
- product cards keep stable media ratios
- hero copy and media remain balanced
- section spacing matches the style guide rhythm
- page footer lands cleanly after content

## Technical Verification

Run at minimum:

```bash
git status --short --branch
git diff --check
find static-demo -name '*.html' -print | sort
```

If a local server is available:

```bash
npx serve static-demo -l 4173
```

Then check representative routes:

- `/`
- `/pages/home.html`
- `/pages/style-guide.html`
- `/pages/shop-wireless-dog-fence.html`
- `/pages/accessories.html`
- `/pages/accessory-zone-beacon.html`
- `/pages/pack-perks.html`
- `/pages/pack-perks-list.html`
- `/pages/account.html`
- `/pages/membership-selection.html`

Browser verification should capture screenshots for changed page families and confirm:

- 0 visible broken images
- 0 console errors from edited code
- 0 horizontal overflow
- drawer available on all checked routes
- header/footer consistent on all checked routes

## Deliverables

Each agent returns:

- Status: `DONE`, `DONE_WITH_CONCERNS`, or `BLOCKED`
- Page family owned
- Files changed
- Pages audited
- Issues found
- Fixes applied
- Screenshots saved
- Verification commands and results
- Remaining gaps

The coordinator must compile a final audit summary at:

`static-demo/docs/page-audits/full-site-ui-audit.md`

The final summary must include:

- every page from `static-demo/docs/live-page-index.md`
- pass/fail/needs-follow-up status for chrome, typography, spacing, grid, mobile, images, and links
- remaining high-priority cleanup tasks
- exact files changed by each agent

