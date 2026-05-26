# Agent Prompt: Accessory PDP Expansion + Thumbnail Carousel

You are working in:

`/Users/drew/Documents/Codex/2026-05-20/ok-so-i-want-you-to`

## Mission

Create a full accessory PDP system where every accessory product has its own PDP route, and accessory PDPs use a featured-image gallery with a horizontal thumbnail carousel.

Important constraint: this is for accessories only. Do not change the Halo Collar PDP/configurator gallery. The collar PDP must keep its current waterfall/gallery layout.

## Source Of Truth

Read these first:

- `static-demo/pages/accessories.html`
- `static-demo/pages/modern-accessory-pdp.html`
- `static-demo/pages/shop-wireless-dog-fence.html`
- `static-demo/css/accessories-page.css`
- `static-demo/css/pdp-configurator-page.css`
- `static-demo/css/halo-theme.css`
- `static-demo/css/tokens.css`
- `static-demo/pages/style-guide.html`
- `static-demo/docs/page-audits/accessory-image-background-removal.md`
- `static-demo/data/accessory-image-assets.json`

Use the current accessories page as the product inventory source. Do not invent new products, claims, pricing, compatibility, or images.

## Product Coverage

Every accessory product represented on the accessories page must have a PDP route.

At minimum, create PDPs for:

- Zone Beacon
- Remote Beacon
- Pro Case
- Collar Strap for Halo Collar 4/5
- Collar Strap for Halo Collar 1/2/2+/3
- Contact Tip Kit
- Charging Stand
- Charging Kit for Halo Collar 4/5
- Charging Kit for Halo Collar 1/2/2+/3
- Halo T-Shirt
- Lawn Signs

If `accessories.html` includes any additional accessory products, create PDPs for those too.

## Route Requirements

Use stable, readable filenames under `static-demo/pages/`, for example:

- `accessory-zone-beacon.html`
- `accessory-remote-beacon.html`
- `accessory-pro-case.html`
- `accessory-collar-strap-halo-4-5.html`
- `accessory-collar-strap-halo-1-2-3.html`
- `accessory-contact-tip-kit.html`
- `accessory-charging-stand.html`
- `accessory-charging-kit-halo-4-5.html`
- `accessory-charging-kit-halo-1-2-3.html`
- `accessory-halo-t-shirt.html`
- `accessory-lawn-signs.html`

Update accessory category product-card links to point to the matching PDPs.

Keep `modern-accessory-pdp.html` as a template/reference page if useful, but the shopper-facing cards should not all point to the same generic PDP.

## Gallery Requirement

Accessory PDPs must use:

- One large featured image.
- A horizontal thumbnail carousel below or adjacent to the featured image.
- Thumbnail buttons with selected state.
- Keyboard-accessible controls.
- `aria-current` or equivalent selected-state semantics.
- Stable media aspect ratio.
- `object-fit: contain`.
- Product surface background from the design system.

Accessory PDPs must not use the collar PDP waterfall gallery.

The collar PDP at:

- `static-demo/pages/shop-wireless-dog-fence.html`

must remain unchanged in gallery structure.

## Carousel Behavior

Implement a lightweight shared accessory gallery script or inline module.

Expected behavior:

- Clicking a thumbnail swaps the featured image.
- Keyboard users can tab to thumbnails and activate with Enter/Space.
- The selected thumb is visually obvious.
- The featured image alt text updates appropriately.
- Works for products with one image and products with multiple images.
- If a product has only one available image, show the image cleanly and either hide the thumbnail row or show one selected thumbnail without broken empty slots.

Do not add a heavy framework.

## PDP Content Requirements

Each accessory PDP should include:

1. Shared nav/promo/footer chrome.
2. Breadcrumb back to Accessories.
3. Product gallery with featured image + thumbnail carousel.
4. Buy stack:
   - Product name.
   - Price from the category/source data.
   - Product summary.
   - Compatibility notes where relevant.
   - Quantity selector.
   - Add to cart CTA.
   - Shipping/support/returns confidence row.
5. Details section:
   - What it does.
   - What works with it.
   - What's included.
6. Compatibility or sizing section when relevant.
7. Related accessories.
8. FAQ/support CTA.

Use actual category/product copy where available. If a field is missing, write neutral placeholder copy only if it is clearly marked as a placeholder in the audit.

## Product Data Structure

Create or update a structured product manifest, preferably:

`static-demo/data/accessory-products.json`

Include:

- id
- product name
- slug/route
- category/family
- price
- source image paths
- gallery images
- short description
- compatibility
- included items
- related product ids
- status notes if any data is incomplete

Use this manifest to keep PDP generation consistent if possible.

## Styling Requirements

Use shared Halo tokens:

- `--halo-color-surface-product` or equivalent product-surface token for gallery media wells.
- `--halo-color-action-primary` for Add to cart.
- `--halo-color-link` and focus tokens for selected/focus states.
- shared button/card/media radius tokens.
- shared text/surface/border tokens.

Avoid:

- oversized hero typography from earlier experiments.
- decorative gradients/blobs.
- one-off black/gray values.
- white-background source image boxes.
- clipped products.
- carousel thumbs that shift layout.

## Files You May Edit

Likely files:

- `static-demo/pages/accessories.html`
- `static-demo/pages/modern-accessory-pdp.html`
- new `static-demo/pages/accessory-*.html` files
- `static-demo/css/accessories-page.css`
- optional new JS file, e.g. `static-demo/js/accessory-pdp.js`
- optional product manifest, e.g. `static-demo/data/accessory-products.json`
- `static-demo/docs/page-audits/accessory-pdp-all-products-carousel.md`

Do not edit:

- `static-demo/pages/shop-wireless-dog-fence.html` except to verify it was not changed.
- `static-demo/css/pdp-configurator-page.css` unless absolutely necessary, and document why.
- Global nav/footer files unless required for link exposure, and document why.

## Navigation / Drawer

If the workbench drawer includes an accessory PDP link, update it to point to a representative accessory PDP route or a small accessory PDP index.

Do not add every product PDP to the customer-facing nav.

## Verification

Run:

1. Confirm every accessory card on `accessories.html` links to an existing PDP file.
2. Confirm every `accessory-*.html` route exists.
3. Confirm every local image referenced by the new PDPs exists.
4. Confirm `shop-wireless-dog-fence.html` has no diff unless explicitly justified.
5. Run `node --check` on any edited JS.
6. Run `git diff --check` on all edited files.
7. If a local server is available, route-check:
   - `/pages/accessories.html`
   - representative PDPs from each family:
     - beacon
     - charging
     - strap
     - merch/sign
8. If browser tooling is available, test desktop and mobile:
   - no horizontal overflow
   - no broken visible images
   - featured image fits
   - thumbnail carousel swaps images
   - selected thumbnail state is visible
   - keyboard focus is visible
   - Add to cart CTA is usable

Save screenshots if possible:

- `static-demo/screenshots/accessory-pdp-carousel-desktop.png`
- `static-demo/screenshots/accessory-pdp-carousel-mobile.png`
- `static-demo/screenshots/accessory-pdp-carousel-category-links.png`

## Audit Note

Create:

`static-demo/docs/page-audits/accessory-pdp-all-products-carousel.md`

Include:

- product inventory covered
- created routes
- manifest fields
- category link updates
- gallery/carousel behavior
- confirmation that collar PDP waterfall was not changed
- verification results
- incomplete product data or image concerns
- recommended next pass

## Return Format

Return:

- Status: `DONE`, `DONE_WITH_CONCERNS`, or `BLOCKED`
- Changed files
- PDP routes created
- Products covered
- Carousel behavior summary
- Confirmation that collar PDP gallery was not changed
- Verification performed
- Remaining gaps
