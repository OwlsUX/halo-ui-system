# V3 Style Guide and Workbench Drawer Audit

Date: 2026-05-25

## Files Changed

- `static-demo/js/components.js`
- `static-demo/index.html`
- `static-demo/docs/page-audits/v3-style-guide-and-workbench-nav.md`

## V3/V2 Principles Extracted

- Navigation is commerce-first. Customer nav keeps Shop Halo, product/category links, Testimonials, Deals, How it works, account, cart, and a single purchase CTA. Internal docs and workbench routes stay out of customer-facing nav/footer.
- Promo and price treatment should be compact and specific. Sale copy works best as tight price deltas, badges, sticky section-nav pricing, or offer rows rather than large decorative banners.
- Hero sections are media-led. The V3 homepage uses full-bleed product/lifestyle media, bottom-left copy, restrained CTA hierarchy, and short headline copy. The PDP uses product media and configurator controls as the hero instead of abstract marketing panels.
- Typography is strong but not heavy everywhere. Display weight belongs to campaign heroes; page/system headings should stay calmer, with Inter/system fallback, short line lengths, and section titles that do not mimic hero scale.
- Image-first sections carry the brand language. V3/V2 pages rely on actual collars, app screens, product surfaces, lifestyle footage, comparison media, and proof imagery. Generic cards should not replace source media.
- CTA hierarchy is restrained. Yellow is for purchase/high-value actions, dark is secondary on light surfaces, and light/inverse CTAs appear on dark or image surfaces. Avoid stacking multiple visually equal CTAs.
- Product-media surfaces are quiet and precise. PDP/gallery/product card surfaces should preserve aspect ratios, swatches, selected rings, and product imagery. Do not normalize the collar PDP gallery/waterfall behavior in this pass.
- Section rhythm alternates full-width bands, media-heavy rows, and compact proof/offer blocks. Avoid turning every section into a card grid.
- Cards are for repeated products/modules, account panels, and compact commerce units. Full-width narrative, hero, and large media sections should remain unframed.
- Dark sections work when they create contrast for video, app, pricing, footer, or proof moments. Light sections should use clear product surfaces and enough whitespace rather than extra borders.
- Proof, offer, and price modules should be dense, scannable, and close to purchase decisions. They should not drift into detached editorial sections.
- Responsive behavior should preserve the image-first hierarchy: mobile stacks copy over/near media, keeps CTAs visible, avoids horizontal overflow, and avoids oversized desktop-only headings.

## Style Guide Gaps Found

- The tactical style guide documents many tokens and components, but it still under-specifies full landing-page composition: media-led heroes, bottom-anchored hero copy, sticky product section-nav, full-bleed video/image moments, and offer/proof placement.
- The page-section directory is useful, but it needs more source-specific specimens from V3/V2 landers: hero, feature carousel, comparison/proof, pricing/offer, app, persona/use-case, FAQ, and PDP purchase stack.
- Typography rules have improved, but the guide should add stricter guidance for where display type is allowed and how campaign hero scale differs from account, catalog, PDP, and docs pages.
- Card guidance is present, but broader pages still drift toward card-heavy layouts. The guide should explicitly say when to use unframed bands and media rows.
- CTA states are documented, but the system needs page-level CTA recipes: hero, sticky nav, PDP add-to-cart, membership selection, account, marketing lander, and footer.
- Tokens worth promoting after more reuse: hero minimum heights, sticky section-nav height, product-media aspect ratios, offer badge roles, proof module spacing, image overlay gradient, and full-bleed media caption rhythm.

## Page/System Drift Found

- `static-demo/pages/home.html` is the strongest V3 source route and should remain the visual baseline for marketing pages.
- `static-demo/pages/shop-wireless-dog-fence.html` is the PDP/configurator baseline and should not be touched by this drawer/style-guide pass.
- Some main website pages use the shared theme but are still less source-like than the homepage/PDP. Highest-risk drift areas are generic card grids, less precise media usage, and weaker proof/offer proximity.
- Pack Perks routes are source-imported and useful, but they were mixed with account and marketing labels in the drawer. That made "Pack Perks" ambiguous.
- Ecomlanders V2/Webflow sources are not imported into `static-demo/pages`; they need a separate source-import pass because local CSS, images, Webflow JS, analytics scripts, and remote assets need cleanup.

## Drawer Taxonomy Before/After

Before:

- `Web Pages`
- `Account & Membership Style Guide`
- `Pack Perks Original Repo`
- `Design System`
- The same Pack Perks concept appeared as account source, list source, generic Pack Perks, prototype index, and marketing routes without a clear account-vs-marketing split.

After:

- `Main Website`: Homepage, Collar PDP / Configurator, Accessories, Accessory PDP, Beacons, How it works, Reviews / Testimonials, Deals.
- `Account + Membership`: Account, Plans, Membership Selection, Pack Perks Account, Pack Perks List, Offer Detail, Cancellation Flow.
- `Marketing Landers`: Pack Perks Marketing v1, Pack Perks Marketing v2, Pack Perks Marketing v3, Ecomlanders V3 / Homepage Source.
- `Design System`: Style Guide, Component Catalog, Style Guide Rebuild Audit, V3 / Drawer Audit, Pack Perks Prototype Index.

## Ecomlanders Source Inventory

Imported or represented in `static-demo`:

- `repos/ecomlanders/pages/Lander-v3-2026/index.html` is represented by `static-demo/pages/home.html`.
- Pack Perks marketing routes already exist in `static-demo/pages/pack-perks-marketing.html`, `static-demo/pages/pack-perks-marketing-v2.html`, and `static-demo/pages/pack-perks-marketing-v3.html`.

Ecomlanders HTML source files inventoried, excluding `node_modules` report UIs:

- `repos/ecomlanders/your-backyard.html`
- `repos/ecomlanders/pages/Lander-v2-2026/index.html`
- `repos/ecomlanders/pages/Lander-v2-2026/shop.html`
- `repos/ecomlanders/pages/Lander-v2-2026/reference-design/index.html`
- `repos/ecomlanders/pages/Lander-v2-2026/reference-design/shop.html`
- `repos/ecomlanders/pages/Lander-v3-2026/index.html`
- `repos/ecomlanders/pages/Lander-v3-2026/shop.html`
- `repos/ecomlanders/pages/Lander-v3-2026/reference-design/index.html`
- `repos/ecomlanders/pages/Lander-v3-2026/reference-design/shop.html`
- `repos/ecomlanders/pages/lander-2026/index.html`
- `repos/ecomlanders/pages/lander-2026/index-alt.html`
- `repos/ecomlanders/pages/lander-2026/shop.html`
- `repos/ecomlanders/pages/tiktok-lander/index.html`
- `repos/ecomlanders/pages/track-your-order/index.html`
- `repos/ecomlanders/comparison-modal/index.html`
- `repos/ecomlanders/comparison-modal/halo-comparison-modal-clean.html`
- `repos/ecomlanders/comparison-modal/updated.html`
- `repos/ecomlanders/misc/17.2-product-mix/index.html`
- `repos/ecomlanders/misc/dow/report.html`
- `repos/ecomlanders/misc/exp-16-dashboard.html`
- `repos/ecomlanders/misc/exp-16-post-11-04.html`
- `repos/ecomlanders/misc/exp-16-post-11-04-ltv.html`
- `repos/ecomlanders/misc/exp-16-post-11-04-updated-pricing.html`
- `repos/ecomlanders/misc/experiment-debug/index.html`
- `repos/ecomlanders/misc/experiment-debug/index-solution-a.html`
- `repos/ecomlanders/misc/experiment-debug/index-solution-b.html`
- `repos/ecomlanders/misc/experiment-debug/index-solution-c.html`
- `repos/ecomlanders/misc/modal-report/report.html`
- `repos/ecomlanders/misc/tiktok2/index.html`

## Ecomlanders Routes Added or Proposed

Added to the workbench drawer:

- `pages/home.html` as `Ecomlanders V3 / Homepage Source`.

Added to the overview index for clearer route handling:

- `pages/pack-perks-marketing.html`
- `pages/pack-perks-marketing-v2.html`
- `pages/pack-perks-marketing-v3.html`

Proposed source-import routes:

- `static-demo/pages/ecomlanders-your-backyard.html` from `repos/ecomlanders/your-backyard.html`.
- `static-demo/pages/ecomlanders-v2-lander.html` from `repos/ecomlanders/pages/Lander-v2-2026/index.html`.
- `static-demo/pages/ecomlanders-v2-shop.html` from `repos/ecomlanders/pages/Lander-v2-2026/shop.html`.
- `static-demo/pages/ecomlanders-v3-shop.html` from `repos/ecomlanders/pages/Lander-v3-2026/shop.html`.
- `static-demo/pages/ecomlanders-tiktok-lander.html` from `repos/ecomlanders/pages/tiktok-lander/index.html`.
- `static-demo/pages/ecomlanders-comparison-modal.html` from `repos/ecomlanders/comparison-modal/halo-comparison-modal-clean.html`.

These were not imported in this pass because the Webflow/V2 sources reference local `css/`, `images/`, and `js/` trees, many remote scripts, analytics embeds, Swiper/Webflow runtime dependencies, and product media `srcset` values. A faithful import should copy or map those assets into `static-demo/vendor/ecomlanders-*`, strip unsafe analytics where appropriate, and rewrite links in a dedicated source-import task.

## Style Guide Recommendations

- Add a V3/V2 landing-page principles section near the top of `static-demo/pages/style-guide.html` and mirror it into `static-demo/design-system/style-guide.html`.
- Add source-backed page-section specimens or deep links for V3 homepage hero, feature carousel, app section, proof/review, price/offer, FAQ, and PDP purchase stack.
- Add explicit "no card" composition rules for full-width media bands, campaign hero sections, and narrative/product proof rows.
- Promote repeated page-level values into tokens after confirming reuse: section-nav height, hero overlay gradient, product media ratios, proof card density, offer badge roles, and sticky CTA spacing.
- Follow-up agent tasks: source-import ecomlanders V2/your-backyard routes; audit main website pages against V3/V2 principles; add a rendered screenshot QA matrix for style guide desktop/mobile; add a drawer link resolver test to catch broken workbench routes.

## Verification Results

- Passed: `node --check static-demo/js/components.js`.
- Passed: local href/src check for edited HTML file `static-demo/index.html`.
- Passed: workbench drawer href resolver against `static-demo/js/components.js`; 24 drawer links resolve locally and duplicate labels count is 0.
- Passed: `git diff --check -- static-demo/js/components.js static-demo/index.html static-demo/docs/page-audits/v3-style-guide-and-workbench-nav.md`.
- Passed: browser render check at `http://localhost:8765/pages/style-guide.html?drawer-check=20260525`.
  - Drawer opened from the workbench trigger.
  - Visible sections: `Main Website`, `Account + Membership`, `Marketing Landers`, `Design System`.
  - Drawer labels matched the updated taxonomy.
  - Duplicate drawer labels: 0.
  - Desktop body horizontal overflow: 0.
  - Desktop drawer horizontal overflow: 0.
- Passed: browser render check at `390x1000`.
  - Drawer opened from the workbench trigger.
  - Visible sections matched the requested taxonomy.
  - Duplicate drawer labels: 0.
  - Mobile body horizontal overflow: 0.
  - Mobile drawer horizontal overflow: 0.

## Remaining Follow-ups

- Import ecomlanders V2/your-backyard/tiktok/comparison source pages as dedicated source-backed routes.
- Expand the style guide from token/component coverage into stronger page-template coverage.
- Run browser drawer checks when browser tooling is available.
