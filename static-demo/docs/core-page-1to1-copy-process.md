# Halo Core Page 1:1 Copy Process

Date: 2026-05-21

## Objective

Rebuild every core Halo page as a faithful local static copy before doing any modernization. The copied pages are the baseline for the design system. Modernized pages must live separately so they do not contaminate the 1:1 source-of-truth work.

## Core Page Scope

Primary live nav and account/commerce surfaces:

| Surface | Live URL / Source | Local target | Copy mode |
| --- | --- | --- | --- |
| Home | `https://www.halocollar.com/` plus `repos/ecomlanders/pages/Lander-v3-2026` | `static-demo/pages/home.html` | V3 structure with live hero variant |
| Halo Collar PDP / configurator | `https://www.halocollar.com/shop-wireless-dog-fence/` and `repos/ecomlanders/pages/Lander-v3-2026/shop.html` | `static-demo/pages/shop-wireless-dog-fence.html` | V3 shop/configurator copy |
| Accessories category | `https://www.halocollar.com/main-shop/accessories/` | `static-demo/pages/accessories.html` | Live 1:1 first, modernized variant separate |
| Beacons | `https://www.halocollar.com/beacons/` | `static-demo/pages/beacons.html` | Live 1:1 |
| Testimonials | `https://www.halocollar.com/reviews/` | `static-demo/pages/reviews.html` | Live 1:1 |
| Deals | `https://www.halocollar.com/deals-discounts/` | `static-demo/pages/deals.html` | Live 1:1 |
| How it works | `https://www.halocollar.com/dog-fence-features/` | `static-demo/pages/how-it-works.html` | Live 1:1 |
| Virtual GPS | `https://www.halocollar.com/dog-fence-features/virtual-gps/` | `static-demo/pages/feature-virtual-gps.html` | Live 1:1 |
| GPS Tracking | `https://www.halocollar.com/dog-fence-features/gps-location-tracking/` | `static-demo/pages/feature-gps-tracking.html` | Live 1:1 |
| Cesar Training | `https://www.halocollar.com/dog-fence-features/cesar-millan-training/` | `static-demo/pages/feature-cesar-training.html` | Live 1:1 |
| Halo App | `https://www.halocollar.com/dog-fence-features/halo-app/` | `static-demo/pages/feature-halo-app.html` | Live 1:1 |
| Feedback System | `https://www.halocollar.com/dog-fence-features/feedback-system/` | `static-demo/pages/feature-feedback-system.html` | Live 1:1 |
| My Account login | `https://www.halocollar.com/my-account/` and `repos/packperks` account surfaces | `static-demo/pages/account.html` | Live/login copy plus Pack Perks account variants |
| Plan selector | `repos/halo-plan-selector` | `static-demo/pages/plans.html` | Repo 1:1, AppV4 preferred |
| Pack Perks | `repos/packperks` | `static-demo/pages/pack-perks.html` | Repo 1:1 |

## Current Baseline Status

Completed on 2026-05-21:

- `static-demo/pages/home.html`: replaced the loose static shell with the V3 ecomlanders homepage source, vendored under `static-demo/vendor/ecomlanders-v3/`, with the requested `Your backyard, now everywhere` hero variant and local PDP links.
- `static-demo/pages/shop-wireless-dog-fence.html`: replaced the loose PDP shell with V3 `shop.html`, `shop.css`, and `shop.js`; local demo fallback keeps color selection and cart drawer functional without WordPress/WooCommerce endpoints.
- `static-demo/design-system/style-guide.html` and `docs/web-ui-style-guide.md`: source-aware web UI style guide covering typography, colors, radius, shadows, button states, nav/footer, cards, forms, PDP/configurator, and section patterns.

Next 1:1 copy targets:

1. Accessories category.
2. Beacons.
3. How it works plus feature child pages.
4. Deals and Testimonials.
5. Account/Pack Perks and plan selector flows.

## Required Method

1. **Source capture**
   - Open the live page in the browser.
   - Record title, URL, H1/H2 sequence, nav/footer shape, CTAs, visible media, and key interactions.
   - If a repo implementation exists, use it as the primary HTML/CSS/JS source and patch only paths/copy needed to match live or the requested V3 variant.

2. **Asset capture**
   - Prefer hosted Halo URLs when they are already live.
   - Vendor repo-local assets under `static-demo/vendor/<source-name>/`.
   - Do not use synthetic substitute images.

3. **Static copy**
   - Preserve source HTML class names where practical.
   - Preserve source CSS/JS as vendored files when the page already works in a repo.
   - Avoid rebuilding source components from scratch unless the original is unavailable.

4. **Verification**
   - HTTP 200 for page, CSS, JS, logo, and local assets.
   - Browser computed-style check for hero, nav, H1, primary CTA, and first three section headings.
   - Check visible copy against source.
   - Check for broken images.
   - Record known mismatches in a per-page audit note.

5. **Component extraction**
   - After the 1:1 page works, identify reusable sections and add them to the design-system catalog.
   - Mark each component as `copied-live`, `copied-repo`, `modernized-variant`, or `template-gap`.

## Non-Negotiables

- Do not invent nav, hero, cards, stats, or generic section modules for a 1:1 page.
- Do not use the old static shell typography on copied pages.
- Do not mix modernization into the baseline copy.
- Do not replace Halo logo/assets with placeholders.
- Do not call a page complete until browser verification proves source CSS/JS/assets are loading.
