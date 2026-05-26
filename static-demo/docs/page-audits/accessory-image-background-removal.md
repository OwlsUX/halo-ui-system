# Accessory Image Background Removal Audit

Date: 2026-05-21

## Scope

Target routes:

- `static-demo/pages/accessories.html`
- `static-demo/pages/modern-accessories.html`
- `static-demo/pages/modern-accessory-pdp.html`

Processed asset directory:

- `static-demo/assets/accessories/processed/`

Source image directory:

- `static-demo/assets/accessories/source/`
- `static-demo/assets/accessories/originals/` for the available alpha Beacon source variants used to avoid over-erasing white beacon bodies.

Manifest:

- `static-demo/data/accessory-image-assets.json`

## Tooling And Method

Local tooling available:

- Python 3
- Pillow

Unavailable locally:

- ImageMagick
- Sharp
- `rembg` or another dedicated background-removal model

Processing method:

- Preserved existing alpha when source images already had usable transparency.
- Used a Pillow border-connected solid-background mask for product images on solid gray/white source backgrounds.
- Cropped each product by alpha bounds.
- Normalized every processed output to a 1200 x 900 transparent PNG canvas.
- Built a transparent `Daily Care Kit` composite from the Charging Stand, Collar Strap 4/5, and Contact Tip Kit processed outputs.

## Inventory

| Product | Source | Processed output | Status |
| --- | --- | --- | --- |
| Zone Beacon | `assets/accessories/originals/zone-beacon--product-zone-beacon-l.webp`; page source saved at `assets/accessories/source/zone-beacon.webp` | `assets/accessories/processed/zone-beacon.png` | `transparent` |
| Remote Beacon | `assets/accessories/originals/remote-beacon--product-remote-beacon-l.webp`; page source saved at `assets/accessories/source/remote-beacon.webp` | `assets/accessories/processed/remote-beacon.png` | `transparent` |
| Pro Case | `assets/accessories/source/pro-case.webp` | `assets/accessories/processed/pro-case.png` | `transparent` |
| Collar Strap for Halo Collar 4/5 | `assets/accessories/source/collar-strap-45.webp` | `assets/accessories/processed/collar-strap-45.png` | `transparent` |
| Collar Strap for Halo Collar 1/2/2+/3 | `assets/accessories/source/collar-strap-123.webp` | `assets/accessories/processed/collar-strap-123.png` | `transparent` |
| Contact Tip Kit | `assets/accessories/source/contact-tip-kit.webp` | `assets/accessories/processed/contact-tip-kit.png` | `transparent` |
| Charging Stand | `assets/accessories/source/charging-stand.webp` | `assets/accessories/processed/charging-stand.png` | `transparent` |
| Charging Kit for Halo Collar 4/5 | `assets/accessories/source/charging-kit-45.webp` | `assets/accessories/processed/charging-kit-45.png` | `transparent` |
| Charging Kit for Halo Collar 1/2/2+/3 | `assets/accessories/source/charging-kit-123.webp` | `assets/accessories/processed/charging-kit-123.png` | `transparent` |
| Halo T-Shirt | `assets/accessories/source/halo-t-shirt.webp` | `assets/accessories/processed/halo-t-shirt.png` | `transparent` |
| Lawn Signs | `assets/accessories/source/lawn-signs.webp` | `assets/accessories/processed/lawn-signs.png` | `transparent` |
| Daily Care Kit | Composite from processed product assets | `assets/accessories/processed/daily-care-kit.png` | `transparent` |

## Page And CSS Updates

Updated image references in:

- `static-demo/pages/accessories.html`
- `static-demo/pages/modern-accessories.html`
- `static-demo/pages/modern-accessory-pdp.html`

Updated CSS in:

- `static-demo/css/accessories-page.css`
- `static-demo/modern-commerce/modern-commerce.css`

CSS changes:

- Product media surfaces use `--halo-color-surface-product`.
- Product images use `object-fit: contain`.
- Product media wells keep stable aspect ratios.
- Modern commerce product media, gallery media, related cards, cart thumbnails, and bundle items use the product surface background.
- Normalized 4:3 transparent canvases now drive consistent product scale in cards.

## Screenshot Artifacts

- `static-demo/screenshots/accessory-image-contact-sheet.png`
- `static-demo/screenshots/accessory-image-cards-desktop.png`
- `static-demo/screenshots/accessory-image-cards-mobile.png`

## Verification Results

Commands run:

- `python3 static-demo/scripts/process-accessory-images.py`
- `node static-demo/scripts/verify-accessory-images.mjs`
- Python/Pillow processed asset dimension scan
- Local link/image scan for the three edited routes
- `curl -I` route checks for:
  - `http://127.0.0.1:4174/pages/accessories.html`
  - `http://127.0.0.1:4174/pages/modern-accessories.html`
  - `http://127.0.0.1:4174/pages/modern-accessory-pdp.html`
- Browser rendered checks at 1440 x 1000 and 390 x 844 for:
  - visible broken images
  - horizontal overflow
  - `object-fit: contain`
  - product-surface backgrounds
  - image clipping

Results:

- 12 processed product entries.
- 12 processed PNG files exist.
- All processed PNGs are 1200 x 900 RGBA.
- Manifest verification passed.
- Local link/image scan passed for the three edited routes.
- All three route checks returned HTTP 200.
- Browser checks found no broken visible images, no horizontal overflow, no non-contain product images, no clipping, and no product-surface mismatches.

## Manual Retouch Notes

Products needing manual retouch:

- None required for card use.

Remaining concern:

- No dedicated local background-removal model was available, so gray/white background removal used a deterministic Pillow mask. Some source-photo product shadows remain where they are attached to the product photo, especially on the Charging Stand and small hardware parts. They are on transparent canvases and do not introduce white boxes or baked blue backgrounds.
