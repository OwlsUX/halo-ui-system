# Phase 1 Commerce And Account Extraction

Worker: D
Date: 2026-05-20
Scope: commerce/configurator, Pack Perks account, and membership plan selector targets.

## Source Priority

- Commerce PDP/configurator: `repos/ecomlanders/pages/Lander-v3-2026/shop.html` and `shop.js` are the primary style and behavior references. `Lander-v2-2026` is near-duplicate backup. `lander-2026` and `new-halo` are retained for add-on card patterns that are not present in the V3 buy stack.
- Pack Perks/account: `repos/packperks/account-perks.html`, `account-perks-v2.html`, `pack-perks-list.html`, `marketing-v3.html`, `membership-selection.html`, `cancellation.html`, `offer-detail.html`, `css/styles.css`, `css/robinhood.css`, and `js/*.js`.
- Membership plan selector: `repos/halo-plan-selector/src/AppV4.tsx` is the preferred modern plan selector. `App.tsx` keeps the larger multi-step flow, Halo Care decision gate, summary, and checkout draft. `VersionSelector.tsx` documents the two UX concepts.

## Commerce Component Inventory

| Component | Source | Lines | Status | Recommendation |
| --- | --- | ---: | --- | --- |
| Product gallery, waterfall desktop and thumbnail mobile | `repos/ecomlanders/pages/Lander-v3-2026/shop.html` | 253-297 | keep | Use as canonical PDP media gallery. Preserve colorway slots and Realtree overlay; convert JS-inserted selected color hero into declarative state later. |
| Product config shell | `repos/ecomlanders/pages/Lander-v3-2026/shop.html` | 299-443 | keep | Use as canonical PDP right rail/buy stack structure. |
| Trust badge + product title | `repos/ecomlanders/pages/Lander-v3-2026/shop.html` | 302-325 | adapt | Keep hierarchy and compact trust signal, but replace inline Trustpilot SVG with shared badge/icon asset. |
| Color swatch selector | `repos/ecomlanders/pages/Lander-v3-2026/shop.html`, `shop.js` | 327-359, 148-224 | keep | Canonical color state. `active` class updates selected label and inserts selected color image at top of gallery. |
| Feature icon grid | `repos/ecomlanders/pages/Lander-v3-2026/shop.html` | 361-387 | merge | Merge with marketing feature-pill/icon patterns; keep as compact PDP proof list. |
| Add-on card | `repos/ecomlanders/pages/lander-2026/shop.html`, `repos/new-halo/shop.html` | 283-346 | keep | Preserve because V3 removed visible add-ons. Card supports image, description, price, expanded details, learn-more, add/remove. |
| Add-on interactions | `repos/ecomlanders/pages/lander-2026/shop.js`, `repos/ecomlanders/pages/Lander-v3-2026/shop.js` | 101-156, 238-294 | keep | Reusable state model: `expanded`, `added`, button text, total recalculation. In V3 code it is dormant unless add-on cards exist. |
| Membership collapsed/expanded box | `repos/ecomlanders/pages/Lander-v3-2026/shop.html`, `shop.js` | 389-409, 320-355 | keep | Required plan explanation on PDP. Collapse state opens text and "Compare plans" trigger. |
| Price display, sale pill, savings banner | `repos/ecomlanders/pages/Lander-v3-2026/shop.html`, `shop.js` | 411-431, 96-110, 357-451 | keep | Canonical price UI. Live pricing hits `/pricing.php`, updates `data-price`, `data-savings`, `BASE_PRICE`, and PETDAYS sale states. |
| Add-to-cart CTA states | `repos/ecomlanders/pages/Lander-v3-2026/shop.html`, `shop.js` | 433-435, 852-931 | keep | Keep loading/disabled text and WooCommerce add-item fallback to checkout form POST. |
| Beacon feature modal | `repos/ecomlanders/pages/Lander-v3-2026/shop.html`, `shop.js` | 447-560, 296-318 | adapt | Use as "what beacons do" modal; rename from `included-modal` for clarity. |
| What's in the box modal | `repos/ecomlanders/pages/Lander-v3-2026/shop.html` | 562-578 | gap | Marked up but no dedicated JS open trigger in V3. Needs trigger wiring and richer contents. |
| Mini-cart drawer + overlay | `repos/ecomlanders/pages/Lander-v3-2026/shop.html`, `shop.js` | 580-654, 453-620 | keep | Canonical cart drawer shell, overlay open/close, Escape close, cart-open body lock. |
| Cart item row | `repos/ecomlanders/pages/Lander-v3-2026/shop.js` | 637-765 | keep | Renders Store API items with image, name, variation, delivery copy, unit price, quantity controls, and delete action. |
| Cart membership row/detail | `repos/ecomlanders/pages/Lander-v3-2026/shop.html`, `shop.js` | 599-616, 548-563 | keep | Inline membership explanation in drawer. Keep as lightweight disclosure, not a second modal. |
| Promo code drawer state | `repos/ecomlanders/pages/Lander-v3-2026/shop.html`, `shop.js` | 618-631, 521-539, 968-1030 | keep | Supports collapsed/expanded, input, loading, success, error, coupon row insertion. |
| Cart totals and empty state | `repos/ecomlanders/pages/Lander-v3-2026/shop.html`, `shop.js` | 633-647, 705-749 | keep | Keep subtotal, discount, tax/shipping estimate, total, and hidden totals when empty. |
| Membership plans modal | `repos/ecomlanders/pages/Lander-v3-2026/shop.html` | 656-734 | adapt | Useful static comparison, but deeper selector logic should come from `halo-plan-selector`. |
| WooCommerce Store API adapter | `repos/ecomlanders/pages/Lander-v3-2026/shop.js` | 622-850, 852-1030 | keep | Future Next.js needs a clean adapter around cart fetch, add, remove, update, apply coupon, nonce refresh, and GA4 events. |
| Local configurator persistence | `repos/ecomlanders/pages/Lander-v3-2026/shop.js` | 1032-1090 | adapt | Good prototype persistence for color/add-ons/quantity. In production, reconcile local state with cart API as source of truth. |

## Commerce State And Interaction List

- PDP gallery: desktop waterfall; mobile thumbnail strip; color swatch inserts selected color image as first gallery item; mobile thumbnails rebuild after swatch change.
- Color selector: inactive/default, active selected, selected color label, selected hero insert, desktop scroll-to-gallery, mobile active thumbnail reset.
- Add-ons: collapsed, expanded, unselected, added, add button, remove button, hover over added button, learn-more opens beacon modal, total updates from `data-price`.
- Membership box: collapsed, expanded, compare-plans modal open, overlay close, close button close.
- Price: fallback hardcoded price, live `/pricing.php` price, savings text, original/list price, PETDAYS pill hidden/visible, two-collar savings copy.
- CTA: idle "Add to Cart", disabled "Adding...", success opens cart, failure restores CTA and falls back to checkout POST.
- Cart drawer: closed, open, overlay active, body locked, Escape close, nav cart open, add-to-cart open.
- Cart data: fetch current cart, render Store API cart, empty cart, non-empty cart, nav cart badge active/inactive, item count.
- Cart item: product image, item name, variation label, delivery label, unit price, quantity decrement disabled at one, increment, remove.
- Promo code: collapsed, expanded, empty no-op, applying disabled state, success message, error message, coupon discount row inserted, coupon badge display.
- Totals: subtotal, discount row hidden/visible, tax/shipping estimate, discounted total, checkout hidden when empty.
- Membership drawer row: collapsed row, inline expanded details, close inline details.
- Analytics: `view_item`, `add_to_cart`, `view_cart`, `begin_checkout`, `remove_from_cart` are pushed to `dataLayer`.

## Account And Pack Perks Inventory

| Component | Source | Lines | Status | Recommendation |
| --- | --- | ---: | --- | --- |
| Account welcome shell | `repos/packperks/account-perks.html` | 132-137 | keep | Use as `/my-account/` authenticated header. Needs real user/member date data later. |
| Pack Perks account banner v5 | `repos/packperks/account-perks.html` | 139-179 | adapt | Current richer account banner with pitch plus three featured cards. Preserve layout intent; replace inline partner copy with data records. |
| Pack Perks account banner v6 | `repos/packperks/account-perks-v2.html` | 139-177 | merge | Alternate stacked variant. Keep as responsive variant if v5 becomes too dense. |
| Account details card | `repos/packperks/account-perks.html` | 181-223 | keep | Maps account details, payment, tools, orders, warranty, help. Convert emoji icons to icon set. |
| Pack Membership account module | `repos/packperks/account-perks.html` | 225-284 | keep | Shows collars on plan, tier cards, Halo Care cards, current/faded state, quantity shell. |
| Billing interval module | `repos/packperks/account-perks.html` | 286-334 | keep | Shows billing options, next payment, credits code input, disabled update CTA, cancellation trigger. |
| Cancellation save modal | `repos/packperks/account-perks.html`, `js/cancel-modal.js` | 344-413, 1-58 | keep | In-account modal with focus return, Escape close, body lock, save-flow actions. |
| Standalone cancellation page | `repos/packperks/cancellation.html` | 132-210 | archive | Keep as route fallback/reference, but use modal for account prototype. |
| Logged-in Pack Perks hero | `repos/packperks/pack-perks-list.html` | 137-154 | keep | Account-specific Pack Perks landing hero with member tier pill. |
| Featured benefit cards | `repos/packperks/pack-perks-list.html` | 156-199 | keep | Three-card logged-in benefit grid; opens same offer modal via JS. |
| Perks category sections | `repos/packperks/pack-perks-list.html` | 201-345 | keep | Health, food/treats, travel category blocks with repeated offer cards. |
| Offer card | `repos/packperks/pack-perks-list.html` | 210-345 | keep | Repeated image/logo/body/redeem/code pattern. Hide code on card and reveal in modal. |
| Offer filtering/search | `repos/packperks/js/perks-filter.js` | 8-93 | adapt | Requires `.ppl-filter` markup not present in current `pack-perks-list.html`; keep behavior for future filter bar. |
| Offer modal/redemption | `repos/packperks/pack-perks-list.html`, `js/perks-filter.js` | 353-372, 143-274 | keep | Populates modal from clicked card, handles copy code, keyboard activation, Escape close, focus return. |
| Standalone offer detail | `repos/packperks/offer-detail.html` | 132-167 | archive | Superseded by modal, useful as `/pack-perks/offers/[offerSlug]` page template reference. |
| Pack Perks marketing hero v3 | `repos/packperks/marketing-v3.html` | 140-152 | keep | Best public marketing hero variant. |
| Marketing benefit spotlights | `repos/packperks/marketing-v3.html` | 155-220 | keep | Public benefit spotlight section with overlay cards and carrier logos. |
| Partner offer grid/marquee | `repos/packperks/marketing-v3.html` | 223-693 | adapt | Many hidden/in-page variants; pick one modern partner tile grid for static prototype. |
| Value summary | `repos/packperks/marketing-v3.html` | 696-731 | keep | Compact annual savings summary. |
| Tier benefit matrix | `repos/packperks/marketing-v3.html` | 733-788 | keep | Public benefits-by-tier table; merge content with plan selector comparison where possible. |
| Final Pack Perks CTA | `repos/packperks/marketing-v3.html` | 790-799 | adapt | Useful closing CTA; avoid overusing full-bleed background in account surfaces. |
| Pack Perks CSS system | `repos/packperks/css/styles.css`, `css/robinhood.css` | 1728-2557, 1-919 | adapt | Contains account/list/modal styles and separate Robinhood-inspired public marketing system. Needs token normalization. |

## Pack Perks Section And Page Mapping

- `/my-account/`: account welcome, Pack Perks account banner, account details card, Pack Membership module, Billing Interval module, cancellation modal.
- `/pack-perks/` logged-in: breadcrumb, logged-in hero, featured benefits, category blocks, offer cards, offer modal.
- `/pack-perks/` public: marketing v3 hero, featured benefit spotlights, partner offers, value summary, tier matrix, finale CTA.
- `/pack-perks/offers/[offerSlug]`: use offer modal content model as primary; standalone `offer-detail.html` supplies page-shell fallback.
- `/membership-selection/` or checkout step: Pack membership cards from Pack Perks static page can seed content, but pricing/state should come from `halo-plan-selector`.

## Plan Selector Inventory And Pricing Notes

| Component | Source | Lines | Status | Recommendation |
| --- | --- | ---: | --- | --- |
| Version selector | `repos/halo-plan-selector/src/VersionSelector.tsx` | 1-150 | archive | Useful only as source documentation for V1 multi-step vs V2 mobile-first concept. Do not ship in prototype routes. |
| App router between concepts | `repos/halo-plan-selector/src/App.tsx` | 32-47 | archive | Keep note that V2 maps to `AppV4`; no production route selector needed. |
| Multi-step plan flow | `repos/halo-plan-selector/src/App.tsx` | 49-296 | adapt | Keep state machine, progress, back behavior, and Safari scroll-to-top workaround for future checkout flow. |
| Billing cadence toggle, V1 | `repos/halo-plan-selector/src/App.tsx` | 317-360 | merge | Three-segment monthly/annual/two-year toggle; content matches static `membership-selection.html`. |
| Plan cards, V1 | `repos/halo-plan-selector/src/App.tsx` | 362-690 | merge | Good desktop card reference, but less preferred than V4 for compact mobile-first flow. |
| Halo Care decision step | `repos/halo-plan-selector/src/App.tsx` | 705-946 | keep | Strong source for required yes/no Halo Care decision, validation error, tier-specific replacement/upgrade pricing. |
| Summary and checkout draft | `repos/halo-plan-selector/src/App.tsx` | 969-1335 | adapt | Keep order summary math and terms-gated CTA as future checkout reference; not needed in static prototype beyond summary display. |
| V4 plan data model | `repos/halo-plan-selector/src/AppV4.tsx` | 14-77 | keep | Canonical plan data: bronze/silver/gold monthly/annual/two-year/additional-collar rates and feature metadata. |
| V4 pricing helpers | `repos/halo-plan-selector/src/AppV4.tsx` | 79-156 | keep | Canonical calculation model for monthly equivalents, period totals, savings, Halo Care, extra collars, grand total. |
| Desktop order summary rail | `repos/halo-plan-selector/src/AppV4.tsx` | 166-228 | keep | Preferred right rail summary with line items, savings, total, and continue CTA. |
| Mobile-first plan tabs and comparison | `repos/halo-plan-selector/src/AppV4.tsx` | 251-342 | keep | Preferred plan selection UI. Included/excluded rows are derived from selected plan. |
| Halo Care toggle module | `repos/halo-plan-selector/src/AppV4.tsx` | 344-399 | keep | Preferred compact add-on toggle with included benefits and billing savings callout. |
| Billing radio cards | `repos/halo-plan-selector/src/AppV4.tsx` | 401-463 | keep | Preferred billing cadence UI for static and Next.js. Shows per-month price and savings for non-monthly options. |
| Multi-collar quantity control | `repos/halo-plan-selector/src/AppV4.tsx` | 465-500 | keep | Quantity stepper capped 1-10 with disabled boundaries and extra-collar savings copy. |
| Mobile order breakdown | `repos/halo-plan-selector/src/AppV4.tsx` | 502-549 | keep | Collapsible mobile order detail. |
| FAQ accordion | `repos/halo-plan-selector/src/AppV4.tsx` | 551-580 | adapt | Keep only if `/plans/` needs compact education below selector. |
| Mobile sticky summary CTA | `repos/halo-plan-selector/src/AppV4.tsx` | 590-614 | keep | Required mobile pattern: total, billed cadence, savings, CTA fixed to bottom. |
| UI primitives | `repos/halo-plan-selector/src/components/ui/*` | varies | adapt | Shadcn-style primitives are useful for Next.js phase; static prototype should only mirror resulting states/classes. |

Pricing/state notes:

- Plan base prices: Bronze `$9.99/mo`, `$101.89/yr`, `$191.81/2yr`; Silver `$14.99/mo`, `$152.84/yr`, `$287.81/2yr`; Gold `$19.99/mo`, `$203.90/yr`, `$383.81/2yr`.
- Additional collars: Bronze `$3.99/mo`; Silver and Gold `$4.99/mo`. V4 applies 15% annual and 20% two-year discounts to additional-collar period pricing.
- Halo Care: `$9.99/mo`, `$101.89/yr`, `$191.81/2yr`, multiplied by collar count when enabled.
- V4 default state: Silver, two-year billing, Halo Care enabled, one collar, order details expanded.
- V1 default state: Silver, monthly billing, one collar, Halo Care unset until the dedicated decision step.
- Savings: V4 `totalSavings(plan)` only compares the selected plan base against monthly billing. V1 `calculateSavings()` includes additional collars. Future implementation should choose one explicit model and label whether savings include Halo Care and extra collars.

## Static Prototype Vs Future Next.js Risks

- Static prototype can fake WooCommerce cart responses, but the future app needs nonce refresh, Store API error handling, cart source-of-truth reconciliation, and coupon error parsing exactly enough to avoid checkout drift.
- V3 add-on JS is present but V3 markup has no add-on cards. Static prototype should include add-ons using `lander-2026`/`new-halo` markup and verify the state path still works.
- `whats-in-box-modal` exists without a visible trigger in V3. Treat as a gap until wired.
- Pack Perks has duplicate account banner variants and several hidden marketing partner grid variants. Pick one canonical presentation for the prototype, preserve alternates only in the component data.
- Pack Perks filtering JS expects `.ppl-filter` markup that is absent from the current list page; add a filter bar only if the static prototype needs search/category filtering.
- Partner logos and offer values are hardcoded and partly rough/mismatched. Future Next.js should use a data model for brands, tiers, terms, codes, and entitlement.
- Plan selector has two competing calculation implementations. Before Next.js conversion, centralize pricing in a typed pricing module and add tests for monthly/annual/two-year, extra collars, Halo Care, and savings labels.
- Current TSX includes prototype-only checkout forms and alerts. Do not treat them as production payment implementation.
- Accessibility needs review: modals mostly manage focus and Escape, but static commerce modals need consistent focus trapping, ARIA labels, and keyboard controls.
- Visual systems differ: ecomlanders, Pack Perks, Robinhood-inspired marketing, and plan selector all define their own tokens. Phase 1 can preserve source look, but Phase 2 needs token consolidation.
