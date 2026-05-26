# Shared Nav Footer Workbench Cleanup

Date: 2026-05-26

## Scope

Updated the shared Halo runtime chrome and workbench drawer for the included website, marketing LP, Pack Perks, and style-guide routes.

## Drawer Taxonomy

- Main Website: Home, Shop Wireless Dog Fence, Accessories, Beacons, How It Works, Reviews, Deals.
- Pack Perks: Pack Perks Lander, Pack Perks Marketing v1, Pack Perks Marketing v2, Pack Perks Marketing v3, Pack Perks List, Account, Account Perks, Membership Selection, Offer Detail, Cancellation Flow.
- Design System: Style Guide.

## Marketing LP Choice

Moved `pack-perks-marketing.html`, `pack-perks-marketing-v2.html`, and `pack-perks-marketing-v3.html` into the Pack Perks drawer group because they are Pack Perks-specific marketing experiments. The canonical `pack-perks.html` route remains labeled `Pack Perks Lander`.

## Chrome Notes

`components.js` now injects the shared stylesheet dependencies when missing, normalizes imported `halo-navigation` and `foot` chrome to the shared Halo customer nav/footer, and inserts shared nav/footer on whitelisted included pages that had no static chrome placeholder.

The source-authored nav on `home.html` and `shop-wireless-dog-fence.html` is still preserved because earlier audit work found those pages bind page-specific behavior to their source nav. Their footer and workbench drawer still come through the shared runtime.

## Verification

- Passed: `node --check static-demo/js/components.js`.
- Passed: `git diff --check` for changed files.
- Passed: local literal `href` and `src` existence check across 17 included pages.
- Passed: browser drawer checks on `/pages/home.html`, `/pages/pack-perks.html`, `/pages/pack-perks-list.html`, and `/pages/style-guide.html`; drawer opened, group labels matched the requested taxonomy, and forbidden audit/prompt/prototype/component links were absent.
- Passed: browser sweep across all 17 included pages for one workbench trigger, shared nav, shared footer, no remaining imported Pack Perks nav/footer, and no visible internal links in customer nav/footer.
