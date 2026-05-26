# Agent Prompt: Impeccable Style Guide System Modernization

You are working in:

`/Users/drew/Documents/Codex/2026-05-20/ok-so-i-want-you-to`

Current branch:

`impeccable-style-guide-pass`

## Mission

Use Impeccable to improve the Halo design system and style guide into a modern ecommerce system for a premium pet-tech brand.

This is not a generic redesign. Preserve Halo's core brand primitives: font families, logo usage, yellow CTA system, primary blue, the new deep blue near-black ink color, existing radius language, and the V3 homepage/configurator visual direction. Your job is to make the system more useful, polished, scalable, and agent-ready while keeping the brand recognizable.

The style guide should become the source of truth that future agents can use to assemble Halo pages, landing pages, PDPs, account pages, and promotional templates without inventing random styles.

## Write Scope

You may edit:

- `static-demo/css/halo-theme.css`
- `static-demo/css/tokens.css`
- `static-demo/pages/style-guide.html`
- `static-demo/design-system/style-guide.html`
- `static-demo/design-system/style-guide.css`
- `static-demo/data/style-tokens.json`
- `static-demo/docs/web-ui-style-guide.md`
- `static-demo/index.html` only if the overview needs a style-guide status or link update
- `static-demo/docs/page-audits/style-guide-impeccable-pass.md`
- Optional screenshots under `static-demo/screenshots/`

You may make small edits to page CSS only when needed to prove that style-guide variables cascade correctly across representative pages. Do not rewrite page content or redesign individual pages as part of this task.

## Required Context

Read these first:

- `static-demo/pages/style-guide.html`
- `static-demo/design-system/style-guide.html`
- `static-demo/design-system/style-guide.css`
- `static-demo/css/halo-theme.css`
- `static-demo/css/tokens.css`
- `static-demo/data/style-tokens.json`
- `static-demo/docs/web-ui-style-guide.md`
- `static-demo/pages/home.html`
- `static-demo/pages/shop-wireless-dog-fence.html`
- `static-demo/pages/accessories.html`
- `static-demo/pages/how-it-works.html`
- `static-demo/docs/page-audits/integration-check.md`
- `repos/impeccable/skill/SKILL.md`

Then read these Impeccable references:

- `repos/impeccable/skill/reference/brand.md`
- `repos/impeccable/skill/reference/product.md`
- `repos/impeccable/skill/reference/extract.md`
- `repos/impeccable/skill/reference/typography.md`
- `repos/impeccable/skill/reference/color-and-contrast.md`
- `repos/impeccable/skill/reference/layout.md`
- `repos/impeccable/skill/reference/polish.md`
- `repos/impeccable/skill/reference/interaction-design.md`
- `repos/impeccable/skill/reference/responsive-design.md`

If available, run the Impeccable CLI or the closest local design checks against the style guide. If the CLI is unavailable, use the references manually and document that in the audit.

## Non-Negotiable Brand Constraints

Keep the core brand system intact.

- Preserve the current Halo font families and font-stack intent.
- Preserve Halo yellow as the primary CTA color.
- Preserve primary Halo blue as the link, selected, and technical accent color.
- Preserve the deep blue near-black color currently replacing `--halo-gray-900`:
  - `--halo-blue-950: #071826`
  - `--halo-ink: var(--halo-blue-950)`
  - `--halo-gray-900: var(--halo-blue-950)`
- Do not return to generic charcoal, pure black, or a new unrelated dark palette.
- Preserve white and soft neutral surfaces, but tint neutrals toward the Halo palette when expanding roles.
- Do not introduce a separate design language that conflicts with the V3 homepage and PDP.
- Do not replace the brand with generic SaaS, AI-tool, outdoor-app, or luxury-fashion aesthetics.

You may improve naming, add semantic roles, and clarify usage if the primitive values remain recognizable.

## Target Outcome

The final style guide should function as a real working design system page, not just a static list of swatches.

It should include:

1. **Brand foundation**
   - Logo usage notes.
   - Primary visual principles for Halo ecommerce.
   - Clear relationship between live Halo, V3 lander, PDP configurator, account pages, and future landing pages.

2. **Token architecture**
   - Primitive tokens: raw brand values.
   - Semantic tokens: action, surface, text, border, focus, shadow, status, promotion, membership, nav, product, and drawer roles.
   - Component tokens where useful, especially for nav, CTA, PDP modules, cards, forms, and badges.
   - Clear guidance on when to use primitive tokens versus semantic tokens.

3. **Color system**
   - Keep the existing Halo colors.
   - Improve color roles so pages stop hardcoding one-off grays and blacks.
   - Add usage examples for:
     - page backgrounds
     - deep blue hero or footer backgrounds
     - yellow CTA surfaces
     - blue selected/link states
     - subtle product-card surfaces
     - account/member states
     - sale/deal states
   - Include contrast notes for CTA text, dark sections, muted copy, links, and disabled states.

4. **Typography**
   - Preserve font families.
   - Tighten the type scale so headings do not drift into oversized generic landing-page type.
   - Define desktop and mobile ranges for:
     - hero headline
     - page headline
     - section headline
     - card title
     - nav text
     - body
     - captions, badges, legal, and microcopy
   - Document the H1/H2/H3 behavior seen on the V3 homepage and configurator.

5. **Spacing, layout, and radius**
   - Define section spacing, page gutters, max widths, grid gaps, product card dimensions, and PDP layout rhythms.
   - Keep radius values consistent with the current system.
   - Explain where cards are appropriate and where full-width bands or unframed layouts are better.
   - Explicitly ban nested cards and arbitrary repeated card grids.

6. **CTA and interaction states**
   - Define primary, secondary, tertiary, icon, selected, disabled, loading, hover, active, and focus-visible states.
   - Include examples for ecommerce flows:
     - Shop Now
     - Add to cart
     - Select plan
     - Choose color
     - Continue
     - Learn more
   - Use tokens for all state colors, borders, shadows, and focus rings.

7. **Navigation and footer standards**
   - Document the customer-facing Halo nav separately from the internal workbench drawer.
   - Define promo strip behavior, logo position, dropdown/mega menu behavior, account/cart treatment, active state, mobile state, and sticky/transparent variants.
   - Define footer variants for ecommerce pages, account pages, and simple landing pages.

8. **Section and component patterns**
   - Provide examples that future agents can reuse:
     - full-bleed image hero
     - product configurator shell
     - accessory category intro
     - product card
     - comparison table
     - testimonial proof band
     - deal/sale offer block
     - account dashboard panel
     - membership plan card
     - FAQ
     - split media section
     - support CTA
   - Examples should show real Halo-like content structure, not placeholder marketing filler.

9. **Agent assembly rules**
   - Add a compact section explaining how future agents should build pages from the system:
     - start with the matching source-backed page
     - preserve copy and product facts
     - select section patterns from the style guide
     - use shared CSS variables first
     - only add local CSS when the page has a real new requirement
     - document any new token or component

## Token Strategy

Improve the system by adding semantic tokens, not by scattering new raw values.

Recommended token families:

- `--halo-color-action-primary`
- `--halo-color-action-primary-hover`
- `--halo-color-action-secondary`
- `--halo-color-link`
- `--halo-color-focus`
- `--halo-color-surface-page`
- `--halo-color-surface-raised`
- `--halo-color-surface-muted`
- `--halo-color-surface-dark`
- `--halo-color-text-primary`
- `--halo-color-text-secondary`
- `--halo-color-text-inverse`
- `--halo-color-border-subtle`
- `--halo-color-border-strong`
- `--halo-shadow-soft`
- `--halo-shadow-raised`
- `--halo-radius-sm`
- `--halo-radius-md`
- `--halo-radius-lg`
- `--halo-duration-fast`
- `--halo-duration-base`
- `--halo-ease-out`

Use whatever names best fit the existing CSS. The important part is that pages should be able to change globally through `halo-theme.css` and `tokens.css`.

If you change a token in `style-guide.html` only, you have failed. The live pages must consume shared variables from the shared CSS files.

## Design Direction

Think of Halo as:

- premium ecommerce
- pet-tech hardware
- warm, reassuring, direct
- modern but not sterile
- product-oriented, not ornamental
- confident enough to use strong photography and clear CTAs
- restrained enough to support configurators, account tools, and repeated landing pages

The system should feel closer to the V3 homepage and configurator than the older live site, while still carrying the Halo brand language.

Avoid:

- huge generic hero typography on every page
- black-and-white fashion minimalism
- blue SaaS dashboards
- cream lifestyle editorial pages
- glassmorphism
- decorative blobs and arbitrary gradients
- endless same-size card grids
- overusing yellow outside true CTA or promo moments

## Cascade Requirement

After updating tokens, verify that the changes affect representative pages:

- `static-demo/pages/home.html`
- `static-demo/pages/shop-wireless-dog-fence.html`
- `static-demo/pages/accessories.html`
- `static-demo/pages/how-it-works.html`
- `static-demo/pages/deals.html`
- `static-demo/pages/account.html`

Inspect computed styles for at least:

- `--halo-ink`
- `--halo-gray-900`
- `--halo-blue-950`
- primary CTA background
- link color
- focus ring color
- card radius
- section background

If pages are bypassing the system with hardcoded values, fix the highest-impact examples or document them in the audit.

## Implementation Notes

- Keep the style guide readable as a web page.
- Avoid making it a wall of tables. Use concise examples, live component samples, and clear groupings.
- Do not put cards inside cards.
- Do not use visible text to explain obvious UI controls in component examples.
- Use real class names and CSS variables in examples so future agents can copy patterns safely.
- Keep all local links correct from both `pages/style-guide.html` and `design-system/style-guide.html`.
- Update `static-demo/data/style-tokens.json` when token definitions change.
- Update `static-demo/docs/web-ui-style-guide.md` so the Markdown source matches the web guide.

## Verification

Run:

1. Local link scan across all HTML files.
2. HTTP checks for primary routes.
3. Browser checks at:
   - `1440x1000`
   - `1024x900`
   - `390x844`
4. At minimum, open:
   - `/pages/style-guide.html`
   - `/pages/home.html`
   - `/pages/shop-wireless-dog-fence.html`
   - `/pages/accessories.html`
   - `/pages/how-it-works.html`
   - `/`
5. Check:
   - no console errors
   - no broken visible images
   - no horizontal overflow
   - style guide sections render cleanly
   - token examples match computed CSS variables
   - representative pages still inherit shared tokens
   - mobile type and buttons fit their containers

Save screenshots if possible:

- `static-demo/screenshots/style-guide-desktop.png`
- `static-demo/screenshots/style-guide-mobile.png`
- `static-demo/screenshots/style-guide-token-cascade.png`

## Audit Note

Create `static-demo/docs/page-audits/style-guide-impeccable-pass.md` with:

- Impeccable references consulted.
- Token changes made.
- Primitive tokens preserved.
- Semantic tokens added or renamed.
- Style guide sections changed.
- Pages checked for cascade.
- Hardcoded style drift found and fixed.
- Hardcoded style drift left for future passes.
- Verification commands and results.
- Remaining design-system questions.

## Acceptance Criteria

- The style guide feels like a modern ecommerce design system for Halo, not a generic UI kit.
- Core fonts, colors, and brand primitives remain intact.
- The deep blue near-black replacement for `--halo-gray-900` remains the dark foundation.
- Tokens are centralized in shared CSS and data files.
- Representative pages inherit the shared variables.
- The guide explains how future agents should assemble pages from source copy and shared patterns.
- CTA states, typography, color roles, nav/footer guidance, section patterns, and component examples are clear enough for another agent to use.
- Browser verification passes without broken links, visible image issues, console errors, or horizontal overflow.

## Return Format

Return:

- Changed file paths.
- Short summary of design-system and token decisions.
- Verification performed.
- Remaining gaps or questions.
