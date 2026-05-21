# Plans Page Audit

## Sources Inspected

- Primary source: `repos/halo-plan-selector/src/AppV4.tsx`
- Version router/source freshness: `repos/halo-plan-selector/src/App.tsx`, `repos/halo-plan-selector/src/VersionSelector.tsx`
- Earlier plan and Halo Care flows: `repos/halo-plan-selector/src/AppV3.tsx`, `repos/halo-plan-selector/src/AppV2.tsx`, `repos/halo-plan-selector/src/AppV1.tsx`, `repos/halo-plan-selector/src/AppV1MultiStep.tsx`
- Plan selector styling baseline: `repos/halo-plan-selector/src/index.css`, `repos/halo-plan-selector/src/styles/globals.css`, `repos/halo-plan-selector/src/components/ui/button.tsx`, `card.tsx`, `badge.tsx`, `accordion.tsx`, `checkbox.tsx`, `radio-group.tsx`
- Static Halo system: `static-demo/pages/home.html`, `static-demo/pages/style-guide.html`, `static-demo/css/halo-theme.css`, `static-demo/css/components.css`, `static-demo/design-system/style-guide.css`
- Adjacent static membership copy: `static-demo/pages/shop-wireless-dog-fence.html`, `static-demo/data/repo-page-inventory.json`, `static-demo/data/live-page-audit.json`
- Acceptance checklist: `static-demo/docs/page-audits/acceptance-gate.md`
- Layout guidance: `repos/impeccable/STYLE.md`, `repos/impeccable/DESIGN.md`, `repos/impeccable/skill/SKILL.md`, `repos/impeccable/skill/reference/layout.md`, `typography.md`, `color-and-contrast.md`

## Source Sections Represented

- H1/hero: AppV4 `Pack Membership` eyebrow and `Choose your plan` heading.
- Plan data: AppV4 `plans` object for Bronze, Silver, Gold labels, badges, monthly/annual/2-year pricing, extra collar rates, and feature tiering.
- Default state: AppV4 defaults, Silver selected, 2-Year billing selected, Halo Care enabled, 1 collar.
- Billing cycle: AppV4 monthly, annual, and 2-Year options with `1 month free` and `3 months free` language.
- Halo Care: AppV4 Halo Care toggle, savings badge, per-collar pricing, and included lines: `Replace collar for $199 (retail $599)`, `Free upgrades to latest model`, `Priority support`.
- Order summary: AppV4 right-rail/mobile summary behavior, including plan row, extra collars row, Halo Care row, billing savings row, monthly equivalent total, period total, and `Continue to payment`.
- FAQ: AppV4 FAQ for plan changes, Halo Care contents, and multiple collars; homepage FAQ for Pack Membership requirement and annual billing.
- Footer/nav: local Halo demo links aligned to the current homepage/style-guide route set.

## Image Assets Used

- Hero product image: `https://d252xzqwj6utz.cloudfront.net/static/h5/white-2-s.webp`
- Halo Care/app image: `https://www.halocollar.com/static/images/features/app-functions.webp`
- Nav/footer logos: `static-demo/vendor/ecomlanders-v3/halo-logo-dark.svg`, `static-demo/vendor/ecomlanders-v3/halo-logo.svg`

## Implementation Notes

- The static page implements the AppV4 selector behavior with plain HTML, scoped CSS, and an inline script inside the owned page file.
- Page-specific CSS is isolated in `static-demo/css/plans-page.css`; shared `tokens.css`, `components.css`, `pages.css`, and `halo-theme.css` tokens remain unchanged.
- The page uses source-backed plan tiers and comparison rows rather than filler cards. Cards are limited to actionable selector surfaces, the summary, and Halo Care benefit rows.
- Copy is mostly exact from AppV4/AppV2/homepage sources. Some punctuation was normalized to ASCII where source variants used decorative punctuation.

## Known Gaps

- Checkout is static. The CTA updates the summary note but does not collect payment.
- Pricing is sourced from the local plan selector repo and is not connected to live pricing services.
- The AppV4 logo URL is not used because the static demo already carries local Halo logo assets.
- Halo Care tier-specific $179/$149 variants exist in older imported drafts, but AppV4 uses the current simplified $199 language, so the page follows AppV4.

## Verification

- Red check before implementation failed as expected against the old draft for missing selector markers.
- Local server: `python3 -m http.server 4186 --bind 127.0.0.1` from `static-demo/`.
- HTTP checks passed: `pages/plans.html`, `css/plans-page.css`, `js/components.js`, and local logo assets returned 200.
- Link check passed: 44 local `href` and `src` attributes resolved inside `static-demo/`, with same-page fragments present.
- Image checks passed: hero product image and Halo app image returned 200; browser reported product, app, and logo images complete with natural dimensions.
- Browser check passed at 1280px desktop width: nav, hero, first selector section, CTA, loaded images, selected Silver state, and footer were present; selector interactions updated Gold, Monthly, 2 collars, and summary total.
