# Shared Nav Footer Workbench Cleanup

Date: 2026-05-26

## Scope

Updated the shared Halo runtime chrome and workbench drawer for the included website, marketing LP, Pack Perks, and style-guide routes.

## Drawer Taxonomy

- Main Website: Home, Shop Wireless Dog Fence, Accessories, Beacons, How It Works, Reviews, Deals.
- Marketing LPs: Pack Perks Marketing v1 and Pack Perks Marketing v2.
- Pack Perks: Pack Perks Lander, Pack Perks List, Account, Account Perks, Membership Selection, Offer Detail, Cancellation Flow.
- Design System: Style Guide.

## Marketing LP Choice

Chose `pack-perks-marketing.html` and `pack-perks-marketing-v2.html` as the two marketing LP variants because they are the two existing imported marketing experiments that are not the canonical `pack-perks.html` route. The v3 marketing route is represented by `pack-perks.html` and labeled `Pack Perks Lander` in the Pack Perks group to avoid duplicating the same concept across drawer sections.

## Chrome Notes

`components.js` now injects the shared stylesheet dependencies when missing, normalizes imported `halo-navigation` and `foot` chrome to the shared Halo customer nav/footer, and inserts shared nav/footer on whitelisted included pages that had no static chrome placeholder.

The source-authored nav on `home.html` and `shop-wireless-dog-fence.html` is still preserved because earlier audit work found those pages bind page-specific behavior to their source nav. Their footer and workbench drawer still come through the shared runtime.

## Verification

- Passed: `node --check static-demo/js/components.js`.
- Passed: `git diff --check` for changed files.
- Passed: local literal `href` and `src` existence check across 17 included pages.
- Passed: browser drawer checks on `/pages/home.html`, `/pages/pack-perks.html`, `/pages/pack-perks-list.html`, and `/pages/style-guide.html`; drawer opened, group labels matched the requested taxonomy, and forbidden audit/prompt/prototype/component links were absent.
- Passed: browser sweep across all 17 included pages for one workbench trigger, shared nav, shared footer, no remaining imported Pack Perks nav/footer, and no visible internal links in customer nav/footer.
