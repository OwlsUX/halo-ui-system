# Agent Prompt: Halo Accessory Image Background Removal And Product Card Asset Prep

You are working in:

`/Users/drew/Documents/Codex/2026-05-20/ok-so-i-want-you-to`

Current branch:

`impeccable-style-guide-pass`

## Mission

Prepare all Halo accessory product images used on the accessories pages so they sit cleanly on Halo blue product-card backgrounds.

The goal is to remove distracting image backgrounds, create transparent-background product assets where possible, and size each product consistently so it fits its card window beautifully. The final accessories pages should show product images that feel intentionally art-directed, not random crops from source ecommerce images.

## Write Scope

You may edit:

- New processed image assets under `static-demo/assets/accessories/processed/`
- A generated asset manifest, such as `static-demo/data/accessory-image-assets.json`
- `static-demo/pages/accessories.html`
- `static-demo/pages/modern-accessories.html`
- `static-demo/pages/modern-accessory-pdp.html` only if it uses accessory product imagery
- `static-demo/css/accessories-page.css`
- The CSS file that styles `modern-accessories.html` / `modern-accessory-pdp.html`, if separate
- `static-demo/docs/page-audits/accessory-image-background-removal.md`
- Optional before/after contact sheet under `static-demo/screenshots/`

Do not edit global tokens, nav/footer, drawer scripts, or unrelated pages.

## Required Context

Read these first:

- `static-demo/pages/accessories.html`
- `static-demo/pages/modern-accessories.html`
- `static-demo/pages/modern-accessory-pdp.html`
- `static-demo/css/accessories-page.css`
- `static-demo/pages/style-guide.html`
- `static-demo/design-system/style-guide.html`
- `static-demo/css/halo-theme.css`
- `static-demo/css/tokens.css`
- `static-demo/data/style-tokens.json`
- `static-demo/docs/page-audits/accessories-style-guide-migration.md`
- `static-demo/docs/page-audits/style-guide-impeccable-pass.md`

Identify every accessory product image currently used on the accessories category, modern accessories concept, and accessory PDP template.

## Image Processing Goal

For each accessory product image:

1. Download or read the source image.
2. Remove the background where feasible.
3. Export a transparent PNG or WebP with alpha.
4. Normalize canvas size and product placement.
5. Place the processed product image on the existing Halo product-card blue/product surface using CSS, not by baking blue into the image unless transparency is impossible.
6. Update the page image references to use the processed assets.

Target product image behavior:

- Transparent asset.
- Centered in card media window.
- Consistent visual scale across product families.
- No clipped product edges.
- No tiny floating products.
- No awkward white boxes or source-image backgrounds.
- `object-fit: contain`.
- Stable card media aspect ratio.

## Product Families To Handle

At minimum, process images for products represented on the accessories page:

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

If the page includes additional accessory products, process those too.

## Visual Placement Rules

Use a consistent blue/product-card background from the design system:

- Prefer `--halo-color-surface-product` for normal product cards.
- Use deep blue only where the design specifically calls for a dark product showcase.
- Do not bake text, shadows, or decorative backgrounds into product images.
- Product image should occupy roughly:
  - 70-86% of media width for simple products
  - 58-72% for wide/flat products
  - 78-90% for small objects that need presence
- Keep consistent bottom alignment when products have a visible base.
- Beacons and chargers can be slightly larger than straps/contact tips.
- Apparel/signs should be sized to feel like merchandise, not hardware.

## Tooling Guidance

Use the best local tool available.

Suggested approaches:

- Use image-processing libraries available in the workspace, such as Sharp, ImageMagick, Python/Pillow, or other installed tools.
- If a background-removal model/tool is available locally, use it.
- If true automated background removal is unavailable, create a clean fallback:
  - crop and pad consistently
  - mask obvious solid backgrounds when possible
  - document which assets still need manual retouching

Do not use destructive edits on original source images. Save processed outputs as new files.

## Asset Manifest

Create a manifest, ideally:

`static-demo/data/accessory-image-assets.json`

Include for each product:

- product name
- source URL or original path
- processed asset path
- output dimensions
- intended card group
- scale/placement notes
- processing status:
  - `transparent`
  - `fallback-clean-crop`
  - `needs-manual-retouch`

## Page/CSS Update Requirements

Update accessories page image references to use processed assets.

Ensure CSS supports:

- stable media aspect ratio
- `object-fit: contain`
- consistent padding
- blue/product-surface card background
- no layout shift
- responsive mobile sizing

If a processed asset still looks poor, do not force it. Use the best fallback and document it.

## Verification

Run:

1. Confirm all processed asset files exist.
2. Confirm every local image path referenced by edited pages exists.
3. Local HTML link/image scan.
4. Route checks:
   - `/pages/accessories.html`
   - `/pages/modern-accessories.html`
   - `/pages/modern-accessory-pdp.html`
5. If browser tooling is available, verify:
   - desktop and mobile card image fit
   - no broken visible images
   - no horizontal overflow
   - product cards use blue/product surface backgrounds
   - processed assets are not blurry or clipped

Save before/after or contact-sheet screenshots if possible:

- `static-demo/screenshots/accessory-image-contact-sheet.png`
- `static-demo/screenshots/accessory-image-cards-desktop.png`
- `static-demo/screenshots/accessory-image-cards-mobile.png`

## Audit Note

Create `static-demo/docs/page-audits/accessory-image-background-removal.md` with:

- Inventory of all source images.
- Processed output paths.
- Processing method/tool used.
- Products successfully made transparent.
- Products using fallback clean crops.
- Products needing manual retouching.
- CSS/page references updated.
- Verification commands and results.

## Return Format

Return:

- Status: `DONE`, `DONE_WITH_CONCERNS`, or `BLOCKED`
- Changed files
- Processed asset count
- Products completed
- Products needing manual retouching
- Verification performed
- Remaining gaps
