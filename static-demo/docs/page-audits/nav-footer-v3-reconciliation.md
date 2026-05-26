# Nav/Footer V3 Reconciliation

Date: 2026-05-21

## Pages Updated

- `static-demo/pages/home.html`
- `static-demo/pages/shop-wireless-dog-fence.html`
- `static-demo/pages/accessories.html`
- `static-demo/pages/beacons.html`
- `static-demo/pages/how-it-works.html`
- `static-demo/pages/reviews.html`
- `static-demo/pages/deals.html`
- `static-demo/pages/account.html`
- `static-demo/pages/pack-perks.html`
- `static-demo/pages/plans.html`
- `static-demo/pages/blog-template.html`
- `static-demo/pages/support-template.html`
- `static-demo/pages/feature-detail.html`
- `static-demo/pages/modern-accessories.html`
- `static-demo/pages/modern-accessory-pdp.html`
- `static-demo/js/components.js`
- `static-demo/css/v3-nav.css`
- `static-demo/modern-commerce/modern-commerce.css`
- `static-demo/modern-commerce/modern-commerce.js`

## Canonical V3 Source Used

- `static-demo/pages/home.html`
- `repos/ecomlanders/pages/Lander-v3-2026/index.html`
- `repos/ecomlanders/pages/Lander-v3-2026/shop.html`
- `repos/ecomlanders/pages/Lander-v3-2026/styles.css`

## Customer Nav Structure

- Promo strip remains page-specific where appropriate.
- Halo logo links to `home.html`.
- `Shop Halo` uses the V3 dropdown/mega-menu pattern with Halo Collar 5, Halo Collar 4, Beacons, and Accessories.
- Primary customer links are Testimonials, Deals, and How it works.
- Account icon links to `account.html`.
- Cart icon links to the PDP/configurator on standard pages and opens the accessory mini-cart on the modern accessory commerce pages.
- Primary CTA is `Shop Now`, mapped to `shop-wireless-dog-fence.html`.
- Mobile nav keeps the V3 product-card sidebar pattern and now opens on pages that rely on `components.js`.

## Customer Footer Structure

- Footer uses the V3 lander architecture: brand/social top row, multi-column customer link grid, and legal bottom row.
- Customer groups are Shop, Learn / About, Membership / Account, Support / Legal, and Why Halo.
- Footer links point only to customer-facing local routes or customer support/legal placeholders.
- Internal style guide, design-system, prompt, audit, overview, and concept links are excluded from customer footers.

## Drawer Link Cleanup

- Drawer groups were simplified to Website Pages, Account & Membership, and Design System.
- Website Pages contains only the primary customer routes.
- Account & Membership contains Account, Pack Perks, and Plans.
- Design System contains the overview hub, style guide, component catalog, integration check, relevant audits/prompts, and concept lab links.
- Broken drawer targets were removed or replaced with existing files.
- Follow-up cleanup corrected the modern concept page shells and removed broken Pack Perks hash targets from account benefit links.

## Remaining Differences From V3 Source

- Customer account is a direct icon link to the local account route rather than the live site's login/signup dropdown.
- Halo Collar 4 routes to the local PDP/configurator because there is no separate local HC4 page.
- Legal, support, blog, and feature comparison links use local template routes where dedicated pages do not exist.
- Social links remain inert placeholders because local social routes are not part of the static demo.
- The modern accessory pages keep their local accessory mini-cart drawer implementation instead of using the collar configurator cart internals.

## Verification Commands And Results

- `node --check static-demo/js/components.js`: pass.
- `node --check static-demo/modern-commerce/modern-commerce.js`: pass.
- Modern page nav/footer regression check: pass.
- Local HTML link scan across all HTML files: 19 HTML files, 1170 local refs checked, 2 JavaScript template refs skipped, 0 failures.
- Generated drawer link scan from `components.js`: 21 drawer targets checked, 0 failures.
- HTTP route checks on `127.0.0.1:4173`: requested routes plus `modern-accessories.html` and `modern-accessory-pdp.html` returned `200`.
- Internal leak grep across customer pages, including modern accessory pages, for `style-guide`, `design-system`, `agent-prompts`, `page-audits`, and `component catalog`: 0 matches.
- Customer page structure check: 15 customer/template pages each have one V3 footer and no legacy concept nav/footer fragments.
- `git diff --check`: pass.
- Browser desktop/mobile sweep: 30 route/viewport combinations checked across 15 customer pages, 0 nav/footer/drawer, overflow, leak, visible image, or console failures.
- Browser interaction checks on `modern-accessories.html` and `modern-accessory-pdp.html`: mobile nav opens/closes and workbench drawer opens/closes at 390px.

## Persistence Follow-Up

The previous reconciliation still left every page owning its own static copy of the V3 nav and footer. That made the chrome easy to drift again as soon as later page-specific agents edited the same files.

Follow-up fix:

- `static-demo/js/components.js` now normalizes customer chrome at runtime.
- Any page with `nav.nav` receives the same canonical V3 customer nav with page-aware active state, relative links, mega-menu imagery, account/cart actions, and mobile drawer markup.
- Any page with `footer.footer` receives the same canonical V3 footer.
- Style-guide-only surfaces that use `halo-navigation` / `footer-demo` are intentionally left intact.

Follow-up verification:

- `node --check static-demo/js/components.js`: pass.
- Browser-rendered selectors verified with Playwright CLI:
  - `[data-shared-halo-nav]` on homepage, accessories, and deals mobile routes.
  - `[data-shared-halo-footer]` on the how-it-works route.
- Screenshots saved:
  - `static-demo/screenshots/shared-chrome-home.png`
  - `static-demo/screenshots/shared-chrome-accessories.png`
  - `static-demo/screenshots/shared-chrome-deals-mobile.png`
  - `static-demo/screenshots/shared-chrome-accessories-mobile.png`
  - `static-demo/screenshots/shared-chrome-how-it-works-full.png`

## Source Nav Preservation Follow-Up

The runtime chrome persistence pass was too broad for the V3 homepage and PDP/configurator. Both pages register page-specific nav behavior before `components.js` runs; replacing their `nav.nav` nodes afterward removed those bound nodes and broke homepage promo/section-nav coordination plus PDP logo/cart/menu state.

Follow-up fix:

- `static-demo/js/components.js` now preserves the authored source nav on `home.html` and `shop-wireless-dog-fence.html`.
- Shared runtime nav replacement still applies to source-backed customer pages that rely on the canonical customer chrome, including accessories, beacons, deals, how-it-works, reviews, account, plans, and pack-perks.
- Runtime footer normalization remains active where a `footer.footer` is present.

Follow-up verification:

- `node --check static-demo/js/components.js`: pass.
- Playwright regression check on `http://localhost:5181`: 4 passed.
  - `home.html`: source nav retained, promo/hero visible, footer normalized, workbench opens/closes.
  - `shop-wireless-dog-fence.html`: source nav retained, dark PDP logo preserved, nav cart opens mini-cart, footer normalized, workbench opens/closes.
  - `accessories.html`: shared nav/footer retained, workbench opens/closes.
  - `deals.html` at 390px: shared mobile nav opens/closes, footer retained, workbench opens/closes.
- Screenshots saved:
  - `static-demo/screenshots/nav-footer-regression-home.png`
  - `static-demo/screenshots/nav-footer-regression-pdp.png`
  - `static-demo/screenshots/nav-footer-regression-accessories.png`
  - `static-demo/screenshots/nav-footer-regression-deals-mobile.png`
