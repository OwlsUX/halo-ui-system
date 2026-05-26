# Agent Prompt: Impeccable Accessory PDP Upgrade

You are working in:

`/Users/drew/Documents/Codex/2026-05-20/ok-so-i-want-you-to`

Current branch:

`impeccable-style-guide-pass`

## Mission

Use Impeccable and the current Halo design system to upgrade the accessory PDP template so it feels like a modern Halo ecommerce product page.

The current accessory PDP is structurally acceptable, but visually underwhelming. It does not yet feel related enough to the V3 Halo Collar configurator/PDP buy stack. Your job is to redesign the accessory PDP as a lighter accessory version of the configurator experience: same premium Halo system, same buy-stack discipline, simpler product complexity.

## Write Scope

You may edit:

- `static-demo/pages/modern-accessory-pdp.html`
- The CSS file that currently styles `modern-accessory-pdp.html`, if separate.
- `static-demo/css/accessories-page.css` only if the accessory PDP shares this file.
- `static-demo/docs/page-audits/accessory-pdp-impeccable-configurator.md`
- Optional screenshots under `static-demo/screenshots/` with names beginning `accessory-pdp-impeccable-`

Do not edit the collar PDP, homepage, style-guide token files, global nav/footer files, or vendor source files unless you document a blocker.

## Required Context

Read these first:

- `static-demo/pages/modern-accessory-pdp.html`
- `static-demo/pages/shop-wireless-dog-fence.html`
- `static-demo/css/pdp-configurator-page.css`
- `static-demo/pages/style-guide.html`
- `static-demo/design-system/style-guide.html`
- `static-demo/css/halo-theme.css`
- `static-demo/css/tokens.css`
- `static-demo/data/style-tokens.json`
- `static-demo/docs/web-ui-style-guide.md`
- `static-demo/docs/page-audits/style-guide-impeccable-pass.md`
- `static-demo/docs/page-audits/pdp-style-guide-migration.md`
- `static-demo/docs/page-audits/accessories-style-guide-migration.md`
- `repos/ecomlanders/pages/Lander-v3-2026`
- `repos/impeccable/skill/SKILL.md`

Then read these Impeccable references:

- `repos/impeccable/skill/reference/product.md`
- `repos/impeccable/skill/reference/layout.md`
- `repos/impeccable/skill/reference/polish.md`
- `repos/impeccable/skill/reference/typography.md`
- `repos/impeccable/skill/reference/color-and-contrast.md`
- `repos/impeccable/skill/reference/interaction-design.md`
- `repos/impeccable/skill/reference/responsive-design.md`

Use the V3 collar PDP/configurator buy stack as the primary pattern reference.

## Design Goal

Create an accessory PDP template that can support:

- Beacons
- Charging Stand
- Charging Kits
- Collar straps
- Contact tip kits
- Pro case
- Merch and lightweight accessories

It should not copy all collar configurator complexity. Instead, it should use a lighter PDP structure with the same visual language.

## Required Page Structure

The accessory PDP should include:

1. **Global nav and promo chrome**
   - Use the reconciled V3 nav/footer system if available.
   - Do not include internal design-system links.

2. **Product gallery**
   - Large product media area.
   - Thumbnail or small selector row if useful.
   - Stable media wells.
   - Product image on a Halo-style product surface.

3. **Buy stack**
   - Product title.
   - Price.
   - Sale/member note where appropriate.
   - Short product description.
   - Compatibility selector or fit selector.
   - Quantity selector.
   - Primary Add to cart CTA.
   - Secondary support/compatibility action.
   - Delivery/returns/support confidence notes.
   - Optional Pack Perks/member benefit treatment.

4. **Product details**
   - What it is.
   - What it works with.
   - What's included.
   - Key specs.

5. **Compatibility support**
   - Make replacement-part compatibility obvious before purchase.
   - This is especially important for straps, charging kits, contact tips, and older collar generations.

6. **Related accessories**
   - Cards should inherit the accessories category card style.
   - Product images must use stable image wells.

7. **FAQ / support CTA**
   - Compact, practical, support-oriented.

## Visual Direction

This should feel like:

- V3 configurator discipline
- Halo style guide tokens
- Premium ecommerce hardware
- Faster, lighter accessory checkout
- Clear compatibility and support

Use:

- `--halo-color-action-primary` for add-to-cart.
- `--halo-color-link` / `--halo-color-focus` for selected/focus states.
- `--halo-color-surface-product` for gallery and image wells.
- `--halo-color-surface-dark` only where a real dark band is useful.
- `--halo-component-pdp-gallery-radius`, `--halo-component-card-radius`, and shared shadow/radius tokens.

Avoid:

- Generic oversized landing-page type.
- Equal-card filler grids.
- Decorative blobs or gradients.
- White product cutouts floating awkwardly on white.
- Inventing product claims, fake ratings, fake reviews, or unsupported compatibility.

## Interaction Requirements

If the current template has interactions, preserve or improve them.

Expected interactions:

- Variant/compatibility selector.
- Quantity stepper or quantity buttons.
- Add-to-cart opens or maps into the same mini-cart/drawer pattern used by the collar PDP, if feasible.
- Keyboard focus-visible states.
- Mobile buy stack remains usable and not cramped.

If a full mini-cart integration is too large for this pass, document the needed follow-up and keep the CTA behavior stable.

## Copy Rules

- Preserve existing accessory PDP copy unless it is placeholder filler.
- Use real product names and product facts from the accessories category.
- Do not invent claims, prices, reviews, or compatibility.
- If the page is a reusable template, label product-specific examples clearly and keep them realistic.

## Verification

Run:

1. Route check:
   - `http://127.0.0.1:4173/pages/modern-accessory-pdp.html`
2. Local HTML link scan if links changed.
3. Grep owned CSS for hardcoded drift:
   - `#000`
   - `#111`
   - `#171717`
   - `#424242`
   - `rgba(0, 0, 0`
   - `rgba(17, 17, 17`
4. If browser tooling is available, check:
   - desktop and mobile layout
   - no horizontal overflow
   - no console errors
   - no visible broken images
   - gallery image fits the product window
   - buy stack CTA and selectors are usable
   - workbench drawer trigger remains visible

Save screenshots if possible:

- `static-demo/screenshots/accessory-pdp-impeccable-desktop.png`
- `static-demo/screenshots/accessory-pdp-impeccable-mobile.png`

## Audit Note

Create `static-demo/docs/page-audits/accessory-pdp-impeccable-configurator.md` with:

- Impeccable references used.
- V3 PDP/configurator patterns borrowed.
- Accessory-specific simplifications.
- Section-by-section changes.
- Interaction changes.
- Verification commands and results.
- Remaining follow-ups.

## Return Format

Return:

- Status: `DONE`, `DONE_WITH_CONCERNS`, or `BLOCKED`
- Changed files
- Design summary
- Configurator/buy-stack alignment notes
- Verification performed
- Remaining gaps
