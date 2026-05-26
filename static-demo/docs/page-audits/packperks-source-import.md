# Pack Perks Source Import

## Source

- Repository: `https://github.com/OwlsUX/packperks.git`
- Local clone: `repos/packperks`
- Pull status: clean and already up to date at import time.

## Goal

Reset the Pack Perks surface to the original OwlsUX prototype UI before any further normalization. The imported pages should act as the visual/source baseline for Pack Perks account, membership, offer, cancellation, and marketing work.

## Imported Routes

- `static-demo/pages/pack-perks-source-index.html` from `repos/packperks/index.html`
- `static-demo/pages/account.html` from `repos/packperks/account-perks.html`
- `static-demo/pages/account-perks.html` from `repos/packperks/account-perks.html`
- `static-demo/pages/account-perks-v2.html` from `repos/packperks/account-perks-v2.html`
- `static-demo/pages/pack-perks-list.html` from `repos/packperks/pack-perks-list.html`
- `static-demo/pages/offer-detail.html` from `repos/packperks/offer-detail.html`
- `static-demo/pages/membership-selection.html` from `repos/packperks/membership-selection.html`
- `static-demo/pages/cancellation.html` from `repos/packperks/cancellation.html`
- `static-demo/pages/pack-perks-marketing.html` from `repos/packperks/marketing.html`
- `static-demo/pages/pack-perks-marketing-v2.html` from `repos/packperks/marketing-v2.html`
- `static-demo/pages/pack-perks-marketing-v3.html` from `repos/packperks/marketing-v3.html`
- `static-demo/pages/pack-perks.html` from `repos/packperks/marketing-v3.html`

## Imported Assets

- `static-demo/vendor/packperks/assets/`
- `static-demo/vendor/packperks/css/styles.css`
- `static-demo/vendor/packperks/css/robinhood.css`
- `static-demo/vendor/packperks/js/nav.js`
- `static-demo/vendor/packperks/js/perks-filter.js`
- `static-demo/vendor/packperks/js/cancel-modal.js`
- `static-demo/vendor/packperks/js/include-nav.js`

## Path Adjustments

- Original `assets/`, `css/`, and `js/` references now point to `../vendor/packperks/...`.
- Original prototype page links now point to their `static-demo/pages` route names.
- Imported Pack Perks nav placeholder links were updated where they map to existing demo pages:
  - Halo Collars -> `shop-wireless-dog-fence.html`
  - Accessories -> `accessories.html`
  - Beacons -> `beacons.html`
  - Testimonials -> `reviews.html`
  - Deals -> `deals.html`
  - How it works -> `how-it-works.html`
  - Account/login/order placeholders -> account routes
  - Cart -> `shop-wireless-dog-fence.html`
- Offer and cancellation action placeholders that are part of prototype behavior remain as `#`.

## Navigation Updates

- `static-demo/index.html` now links to the imported Pack Perks source routes.
- `static-demo/js/components.js` workbench drawer now includes the Pack Perks source pages under Account/Membership and Pack Perks Original Repo.

## Verification

- Confirmed `repos/packperks` remote is `https://github.com/OwlsUX/packperks.git`.
- Ran `git pull --ff-only` in `repos/packperks`; repo was already up to date.
- Ran local href/src existence check across all imported Pack Perks pages; passed.
- Ran `node --check static-demo/js/components.js`; passed.
- Ran `git diff --check` across imported pages, vendor CSS, overview, drawer script, and this audit; passed.
- Started a static server on port `4173` and confirmed representative routes return `200`:
  - `/pages/pack-perks.html`
  - `/pages/account-perks.html`
  - `/pages/pack-perks-list.html`
  - `/pages/membership-selection.html`
  - `/pages/cancellation.html`

## Remaining Notes

- These routes intentionally preserve the original Pack Perks UI as the baseline. They are not yet normalized into the shared Halo nav/footer design system.
- Some source prototype CTA links still use `#` because they represent mock partner/cancel actions rather than real local routes.
- Future normalization should start from these imported routes and document every deviation from the original UI.
