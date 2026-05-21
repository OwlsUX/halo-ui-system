# Agent Prompt: Accessories Elevated Design Pass

You are working in:

`/Users/drew/Documents/Codex/2026-05-20/ok-so-i-want-you-to`

## Mission

Elevate the current Halo Accessories page from a structurally sound source-backed page into a more polished, intentional, premium commerce/category experience.

The current layout has the right basic content and sections, but the design still feels uneven: some areas are overdesigned, some are underdesigned, and product imagery is being forced into image boxes that do not serve the composition. Your job is to refine the page so the content, typography, spacing, section rhythm, and product shopping hierarchy feel deliberate and beautiful.

Do not redesign the whole site. Focus only on the Accessories category page.

## Write Scope

Own only these files:

- `static-demo/pages/accessories.html`
- `static-demo/css/accessories-page.css`
- `static-demo/docs/page-audits/accessories-elevated-pass.md`
- Optional screenshots under `static-demo/screenshots/`

Do not edit homepage, PDP, style guide, shared tokens, shared nav/footer CSS, or other pages unless you first document a blocking reason.

## Required Context

Read these before making changes:

- `static-demo/pages/accessories.html`
- `static-demo/css/accessories-page.css`
- `static-demo/pages/style-guide.html`
- `static-demo/css/halo-theme.css`
- `static-demo/css/tokens.css`
- `static-demo/docs/page-audits/accessories.md`
- `static-demo/docs/page-audits/integration-check.md`
- `repos/impeccable/skill/SKILL.md`

Then read these Impeccable references:

- `repos/impeccable/skill/reference/layout.md`
- `repos/impeccable/skill/reference/polish.md`
- `repos/impeccable/skill/reference/typography.md`
- `repos/impeccable/skill/reference/color-and-contrast.md`
- `repos/impeccable/skill/reference/responsive-design.md`
- `repos/impeccable/skill/reference/interaction-design.md`

If available, also run the Impeccable CLI or equivalent design checks against the page. If it is unavailable, continue manually and note that in the audit.

## Design Direction

Use the current page structure as the starting point:

- Promo strip
- Global nav
- Accessories hero
- Shop-by-need shortcuts
- Featured accessory
- Catalog grouped by Beacons, fit/parts, charging, merch
- Fit guide
- Support CTA
- Footer

The page should still use the exact product set, product names, prices, and source copy already captured from the live Halo page and linked PDPs. Do not invent new accessories or fake product claims.

## Key Change: Placeholder Media For Composition

The hero/product-stack imagery is not working. Replace hero and high-level section image compositions with simple solid-color placeholder media blocks so the team can evaluate the layout, typography, hierarchy, and spacing without being distracted by image cropping.

Rules:

- Use solid color or subtly tinted placeholder blocks, not gradients or decorative blobs.
- Placeholder blocks should be clearly intentional, with optional small labels like `Accessory system`, `Beacon zone`, `Charging`, `Fit parts`.
- Do not use product cutout images in the hero.
- Product images may still be used inside product cards, but the image wells must be normalized:
  - stable aspect ratio
  - `object-fit: contain`
  - consistent padding
  - no awkward crops
  - no layout shift
- If a product image still looks poor in its well, use a clean placeholder for that product card and document the image issue in the audit.

## Visual Quality Bar

This should feel like a polished Halo commerce page, not a generic ecommerce grid.

Use Impeccable guidance explicitly:

- Replace repeated same-size card grids with more intentional rhythm.
- Use spacing and grouping before adding borders and boxes.
- Avoid nested cards.
- Avoid arbitrary decorative elements.
- Avoid giant headings that do not match the Halo homepage/style guide.
- Keep type restrained, crisp, and readable.
- Use `#071826`/`--halo-ink` as the near-black blue ink tone, not generic charcoal.
- Use yellow only for real CTA emphasis.
- Use primary blue sparingly for links, focus, and selected states.
- Preserve accessibility: keyboard focus, contrast, touch targets, alt text, semantic sections.

## Specific Design Tasks

1. **Hero**
   - Keep copy concise and source-aligned.
   - Replace product-image collage with a cleaner placeholder composition.
   - Make the hero feel like a category entry point, not a product PDP.
   - Ensure hero fits gracefully on mobile without awkward empty media blocks.

2. **Shop By Need**
   - Make this section useful as navigation, not just four boxes.
   - Clarify hierarchy between category name and supporting copy.
   - Consider a horizontal segmented/nav treatment or compact row if it serves the content better.

3. **Featured Accessory**
   - Decide whether this section earns its prominence.
   - If kept, make it feel editorial and intentional.
   - If it feels arbitrary, reframe it as a practical utility panel such as `Charging and readiness`.

4. **Catalog**
   - Keep all current product groups and products.
   - Improve card rhythm and image well consistency.
   - Do not make every card visually identical if the content does not need equal emphasis.
   - Ensure product descriptions, specs, prices, badges, and CTAs scan cleanly.

5. **Fit Guide / Support CTA**
   - Tighten these into useful end-of-page decision support.
   - Avoid making them look like leftover marketing sections.

6. **Responsive**
   - Verify desktop, tablet, and mobile.
   - No horizontal overflow.
   - No clipped text.
   - Buttons and category links stay tappable.

## Recommended Tools

Use whatever design verification tools are available in the environment:

- Browser or Playwright for screenshots at `1440x1000`, `1024x900`, and `390x844`.
- DOM checks for broken images, horizontal overflow, and console errors.
- Color contrast checks for text on placeholder blocks and CTA surfaces.
- Impeccable CLI or manual Impeccable checklist for layout, polish, typography, contrast, interaction, and responsive behavior.

Save screenshots if possible under:

- `static-demo/screenshots/accessories-elevated-desktop.png`
- `static-demo/screenshots/accessories-elevated-tablet.png`
- `static-demo/screenshots/accessories-elevated-mobile.png`

## Acceptance Criteria

- The page still contains the live-source product set and core copy.
- Hero and major section media use clean placeholder compositions where product imagery was harming the design.
- Product cards no longer have awkward image crops or mismatched image wells.
- The page feels more intentional, premium, and Halo-specific.
- The design uses shared tokens from `halo-theme.css` and does not hardcode a separate palette.
- No generic stock imagery, no decorative gradient blobs, no nested cards, no repeated filler modules.
- Browser verification passes:
  - page returns 200
  - linked CSS/JS returns 200
  - no broken visible images
  - no console errors
  - no horizontal overflow
  - mobile layout is usable

## Audit Note

Create `static-demo/docs/page-audits/accessories-elevated-pass.md` with:

- Impeccable references consulted.
- What was changed section by section.
- Which imagery was replaced by placeholders and why.
- Product images retained and any known image-fit issues.
- Screenshots generated.
- Verification commands/results.
- Remaining design questions for the next human review.

## Return Format

Return a concise summary with:

- Changed file paths.
- Design decisions made.
- Verification performed.
- Remaining gaps or questions.
