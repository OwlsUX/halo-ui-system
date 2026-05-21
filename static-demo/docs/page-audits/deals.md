# Deals Page Audit

Source page: https://www.halocollar.com/deals-discounts/
Audit data: `static-demo/data/live-page-audit.json`, generated 2026-05-20T19:30:38.753Z.
Implementation status: rebuilt as a static modernized demo page.

## Source Files Inspected

- `static-demo/pages/style-guide.html`
- `static-demo/design-system/style-guide.css`
- `static-demo/css/halo-theme.css`
- `static-demo/css/tokens.css`
- `static-demo/css/components.css`
- `static-demo/css/pages.css`
- `static-demo/pages/home.html`
- `static-demo/data/live-page-audit.json`
- `static-demo/docs/page-audits/acceptance-gate.md`
- `https://www.halocollar.com/deals-discounts/`
- `https://github.com/pbakaus/impeccable`

## Live Sections Carried Over

1. Hero: "Save $125 on Halo Collar 4", "Now $424 for a limited time", "Shop Now".
2. Product deal: "Halo Collar 4", "Save $125 | $424 $549", "Shop Now".
3. Bundle heading: "Halo Collar 5 Bundles".
4. Bundle product: "Halo Collar 5 (2-pack)", "Save $50 | $998 $1048", "Shop Now".
5. Bundle product: "Halo Collar 5 (3-pack)", "Save $100 | $1472 $1572", "Shop Now".
6. Comparison: "Compare Halo Collar Models" with the live H5/H4 rows for materials, colors, sizing, battery life, charge time, charging, feedback, waterproof rating, and Wi-Fi/Bluetooth chips.

## Hosted Assets Used

- `https://d252xzqwj6utz.cloudfront.net/static/h5/bf-h4.webp`
- `https://d252xzqwj6utz.cloudfront.net/static/h5/deals-h4.webp`
- `https://d252xzqwj6utz.cloudfront.net/static/h5/deal-2-piece.webp`
- `https://d252xzqwj6utz.cloudfront.net/static/h5/deal-3-piece.webp`
- `https://d252xzqwj6utz.cloudfront.net/static/h5/check-yellow.svg`
- `https://d252xzqwj6utz.cloudfront.net/static/h5/check-grey.svg`
- `https://d252xzqwj6utz.cloudfront.net/static/h5/realtree-small-swatch.png`

## Notes

- Halo Collar 5 CTAs point to the local static PDP route, `shop-wireless-dog-fence.html`.
- Halo Collar 4 CTAs point to the live Halo Collar 4 product URL because the static demo does not include a dedicated H4 product route.
- Page UI intentionally omits source/status metadata.

## Verification

- Local href/src check: `node` script over `static-demo/pages/deals.html`, 31 local references checked, 0 missing.
- CSS URL check: `node` script over `static-demo/css/deals-page.css`, 1 CSS URL checked, 0 missing local URLs.
- Local server check: `curl -I http://127.0.0.1:4173/pages/deals.html` returned HTTP 200.
- Linked asset check: `HEAD` requests returned HTTP 200 for `deals.html`, `tokens.css`, `components.css?v=2`, `pages.css`, `deals-page.css`, and `components.js`.
- Browser desktop check: opened `http://127.0.0.1:4173/pages/deals.html`; nav, hero, first content section, hero CTA, and footer returned non-zero render boxes; all main images loaded; no console errors; no horizontal overflow.
- Browser mobile check: 390px viewport had no horizontal overflow and no visible overflow offenders.
