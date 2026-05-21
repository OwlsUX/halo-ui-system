# Agent Prompt: Modernized Accessories Category and PDP Template

You are working in `/Users/drew/Documents/Codex/2026-05-20/ok-so-i-want-you-to`.

## Mission

Create a modernized design direction for Halo's Accessories category page and accessory/PDP template, while keeping the current 1:1 live-copy baseline untouched. The modernization must sit alongside the V3 Halo Collar configurator experience from `repos/ecomlanders/pages/Lander-v3-2026/shop.html` and must feel like it belongs to the same product system.

## Source Material

Use these as primary references:

- Live Accessories page: `https://www.halocollar.com/main-shop/accessories/`
- Live Halo Collar PDP/configurator: `https://www.halocollar.com/shop-wireless-dog-fence/`
- V3 configurator source: `repos/ecomlanders/pages/Lander-v3-2026/shop.html`
- V3 configurator behavior: `repos/ecomlanders/pages/Lander-v3-2026/shop.js`
- V3 configurator styles: `repos/ecomlanders/pages/Lander-v3-2026/shop.css`
- V3 homepage/nav system: `repos/ecomlanders/pages/Lander-v3-2026/index.html`, `styles.css`, `script.js`
- Existing extraction notes: `docs/phase-1-commerce-account-extraction.md`
- Component inventories: `static-demo/data/component-inventory.json`, `static-demo/data/commerce-account-components.json`, `static-demo/data/site-assets.json`

## Critical Boundary

Do not modify the 1:1 baseline pages except to add links to the modernized variant. Build modernized work under separate routes, for example:

- `static-demo/pages/modern-accessories.html`
- `static-demo/pages/modern-accessory-pdp.html`
- optional shared CSS/JS under `static-demo/modern-commerce/`

The baseline pages should remain source-faithful. The modernized pages are the design proposal.

## Design Goals

1. **Accessories category**
   - Replace the current live category's dated storefront feel with a focused commerce/category page.
   - Present product families clearly: Beacons, charging, straps/replacement parts, merch, bundles.
   - Use a restrained V3-compatible visual system: Inter, clean product cards, strong imagery, clear yellow/black/white CTA hierarchy.
   - Add useful commerce affordances: category filters, compatibility tags, quick add, compare, bundle builder entry point, support/warranty cross-sell.
   - Keep page dense enough for shopping. Avoid marketing-page fluff.

2. **Accessory PDP template**
   - Create a reusable PDP template for accessories, not just one product.
   - Must support gallery, title/price, compatibility, purchase CTA, quantity, optional variant selector, benefit bullets, details/specs, reviews/proof, FAQ, and related products.
   - It should sit visually beside the V3 Halo Collar configurator, but be simpler because accessory configuration is lighter.

3. **Configurator alignment**
   - Reuse V3 shop patterns where they make sense:
     - product media/gallery treatment
     - selection cards
     - price/CTA stack
     - mini-cart drawer
     - add-on/bundle logic
     - sticky mobile purchase affordance
   - Do not copy the full collar configurator complexity into every accessory PDP.

4. **Agentic design system output**
   - Identify reusable components:
     - `CategoryHero`
     - `ProductFamilyGrid`
     - `AccessoryProductCard`
     - `CompatibilityBadge`
     - `QuickAddButton`
     - `BundleBuilderPanel`
     - `AccessoryPdpGallery`
     - `AccessoryBuyStack`
     - `AccessorySpecsAccordion`
     - `RelatedProductsRail`
     - `MiniCartDrawer`
   - For each component, define props/state/interactions in comments or a small JSON companion file.

## Required Process

1. Inspect the live Accessories page in the browser and record:
   - H1/H2 sequence
   - product/category groups
   - assets
   - nav/footer behavior
   - dated UI issues to solve

2. Inspect V3 `shop.html`, `shop.css`, and `shop.js`.
   - Extract the configurator visual rules and interaction patterns that should become commerce-system primitives.

3. Build a modernized static prototype route.
   - Use real Halo hosted assets whenever possible.
   - If a product image is unavailable, use an existing Halo category/product image from `site-assets.json`; do not use generic stock imagery.
   - Keep CSS scoped to modern commerce routes so it does not break the copied V3 homepage.

4. Verify in browser.
   - Desktop and mobile viewport checks.
   - No broken images.
   - Product cards and CTAs fit without text overflow.
   - Quick-add/cart interactions work if implemented.

5. Deliver:
   - Changed file list.
   - What was copied vs modernized.
   - Component list with proposed props.
   - Verification evidence.
   - Known gaps.

## Acceptance Criteria

- The modernized Accessories page is recognizably Halo and compatible with V3, not a generic ecommerce template.
- The accessory PDP template is reusable across Beacons, charging stand, straps, replacement parts, and merch.
- The V3 collar configurator remains the canonical complex commerce view.
- The 1:1 baseline pages remain separate and unmodified.
- Browser verification is fresh and explicit.

