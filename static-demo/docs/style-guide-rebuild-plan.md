# Halo Style Guide Rebuild Plan

## Goal

Rebuild `static-demo/pages/style-guide.html` as a tactical web style guide for Halo page assembly. The page should stop behaving like a marketing page and become a practical reference that agents and designers can use to build, audit, and normalize Halo ecommerce pages.

The guide should answer five questions quickly:

1. What are the Halo foundations?
2. Which tokens should pages use?
3. What are the exact type, spacing, radius, grid, and elevation rules?
4. What component states exist and when should each be used?
5. Which page sections can agents assemble into real Halo pages?

## Research References

Useful models:

- Shopify Polaris: strong token structure, especially primitive and semantic typography tokens.
  Source: https://polaris-react.shopify.com/design/typography/typography-tokens
- Shopify Polaris tokens: tokens as reusable values for color, spacing, animation, typography, and multi-platform output.
  Source: https://github.com/Shopify/polaris-tokens
- Atlassian Design System: clear separation of foundations, tokens, accessibility, content, spacing, grid, color, typography, iconography, border, and elevation.
  Source: https://atlassian.design/foundations/
- Atlassian design tokens: tokens as the single source of truth for repeatable UI decisions across color, spacing, typography, elevation, opacity, and themes.
  Source: https://atlassian.design/foundations/design-tokens
- GOV.UK Design System: useful organization into styles, components, and patterns, with explicit usage guidance and coded examples.
  Source: https://design-system.service.gov.uk/styles/
- GOV.UK components: every component page has guidance on use plus coded examples.
  Source: https://design-system.service.gov.uk/components
- Material Design layout: layout regions, grouping, open space, typography, dividers, and 8dp alignment as a layout foundation.
  Source: https://m2.material.io/design/layout/understanding-layout.html
- IBM Carbon / IBM 2x Grid: grid as a geometric foundation for typography, columns, boxes, icons, and visual structure.
  Sources: https://www.ibm.com/design/language/2x-grid/ and https://carbondesignsystem.com/elements/typography/overview/

## Current Page Problems To Remove

- No tactical foundation map.
- Hero is decorative instead of useful.
- Typography examples are missing or too vague.
- CTA examples do not cover states or usage rules.
- No explicit H1-H6, body, caption, label, price, badge, or legal type specs.
- No grid, container, breakpoint, spacing, or max-width rules.
- No border-radius, border, elevation, focus, z-index, or motion specs.
- Section examples are too mixed with documentation cards.
- Nav/footer should not be rendered as decorative specimens inside a card.
- Code/token examples wrap poorly.
- The guide does not clearly tell future agents which CSS variables to use.

## Rebuild Information Architecture

### 1. System Overview

Purpose: short, practical summary.

Content:

- System name: Halo Agentic Design System.
- What it governs: website, landing pages, PDP/configurator, cart, account, membership, Pack Perks, accessories.
- Source order:
  1. Live Halo page or source repo component.
  2. Shared token layer.
  3. Shared component/page-section pattern.
  4. Page-specific override only when documented.
- Links to main demo pages and source audits.

Do not include large marketing hero CTAs here.

### 2. Foundations

Purpose: define the global visual rules.

Required subsections:

- Brand marks and logo usage.
- Color roles.
- Typography scale.
- Spacing scale.
- Grid and containers.
- Radius and border.
- Elevation and shadows.
- Motion.
- Accessibility and focus.

Each subsection should include:

- Token name.
- Value.
- Use case.
- Do / do not guidance.

### 3. Typography Specimen

Purpose: exact type rules that can be copied into pages.

Required rows:

- Display / homepage hero.
- H1 page title.
- H2 section title.
- H3 module title.
- H4 card title.
- H5 dense panel heading.
- H6 micro heading.
- Body large.
- Body.
- Body small.
- Caption.
- Eyebrow/kicker.
- Button label.
- Nav label.
- Price.
- Badge.
- Form label.
- Help/error text.
- Legal/footer text.

Each row must show:

- Rendered specimen.
- Font family.
- Font size.
- Line height.
- Weight.
- Letter spacing.
- Max width rule.
- Token or CSS variable.
- Recommended usage.

Important: Do not make the style guide H1 larger than the actual Halo homepage H1 reference unless explicitly documenting the homepage hero token.

### 4. Color System

Purpose: clarify functional color roles.

Required groups:

- Brand primitives: yellow, blue, deep blue, white, neutral surfaces.
- Text roles: primary, secondary, muted, inverse.
- Surfaces: page, raised, muted, product, dark, membership, sale.
- Actions: primary, hover, active, disabled.
- Links and selected states.
- Borders and dividers.
- Focus.
- Status: success, warning, error/info as needed.

Each color card should show:

- Swatch.
- Token.
- Hex/computed value.
- Contrast usage.
- Allowed usage.
- Forbidden usage.

### 5. Layout, Grid, Spacing, And Sizing

Purpose: give agents exact page geometry.

Required specs:

- Page max width.
- Readable text max width.
- Full-bleed section behavior.
- Standard section padding desktop/tablet/mobile.
- Grid columns by breakpoint.
- Product card media aspect ratios.
- PDP gallery ratios.
- Hero min/max heights.
- Nav height and promo bar height.
- Footer spacing.
- Container gutters.
- Spacing scale from smallest to largest.

Include visual grid examples that are useful, not decorative.

### 6. Radius, Border, Elevation, And Surface Rules

Purpose: stop one-off card styling.

Required specs:

- Button radius.
- Card radius.
- Media radius.
- Drawer radius.
- Modal radius.
- Input radius.
- Product media radius.
- Border colors and thickness.
- Shadow levels: none, subtle card, raised card, dropdown/drawer.
- When not to use cards.

Include a table and a few simple rendered examples.

### 7. Buttons And CTAs

Purpose: define interaction states.

Required variants:

- Primary purchase CTA.
- Secondary CTA.
- Tertiary/link CTA.
- White/inverse CTA for dark or image surfaces.
- Icon button.
- Quantity stepper.
- Selected option.
- Disabled.
- Loading.
- Focus.
- Hover.
- Active/pressed.

Each state should include:

- Rendered button.
- Token usage.
- When to use.
- When not to use.
- Minimum hit area.
- Accessibility note.

### 8. Forms And Selectors

Purpose: cover PDP/account inputs and choice controls.

Required components:

- Text input.
- Select/dropdown.
- Radio group.
- Checkbox/toggle.
- Color swatch.
- Size/option pill.
- Membership selector card.
- Error state.
- Help text.
- Inline validation.

### 9. Ecommerce Components

Purpose: practical component library for Halo pages.

Required components:

- Product card.
- Product media well.
- Price row.
- Sale badge.
- Review/social proof row.
- Trust/guarantee strip.
- Feature row.
- Icon feature card.
- Comparison table.
- FAQ accordion.
- Add-on card.
- Cart line item.
- Checkout summary module.
- Account status card.
- Membership plan card.
- Pack Perks benefit card.

Each component needs:

- Rendered example.
- Structure.
- Tokens.
- States.
- Content rules.
- Links to source page/repo where applicable.

### 10. Page Section Patterns

Purpose: show assembled reusable page sections.

Required sections:

- Homepage hero.
- PDP/configurator buy stack.
- Category header.
- Product grid.
- Accessory comparison section.
- How-it-works step section.
- Proof/testimonials section.
- Pricing/membership section.
- Deals/offer section.
- Account overview section.
- Pack Perks marketing section.
- Support/FAQ section.

Rules:

- These should be full-width or realistic-width section specimens.
- Notes can sit beside or below, but nav/footer should not appear inside cards.
- Use placeholder blocks only where imagery is intentionally deferred.
- Specimens should show real copy patterns and density, not random filler.

### 11. Shared Chrome

Purpose: document, not redraw, global chrome.

Content:

- Promo butter bar behavior:
  - Three messages.
  - Rotation timing.
  - Height.
  - Typography.
  - Color.
- Header/nav:
  - Logo.
  - Customer-facing links.
  - Dropdown behavior.
  - Account/cart icons.
  - Shop Now CTA.
  - Mobile behavior.
- Footer:
  - Columns.
  - Link groups.
  - Legal row.
  - Dark surface tokens.
- Workbench drawer:
  - Separate internal tool layer.
  - Never inside customer nav/footer.

No fake nav/footer card specimen.

### 12. Assets And Imagery Rules

Purpose: prevent broken product imagery.

Content:

- Product image canvas rules.
- Transparent PNG/WebP behavior.
- Product-card blue surface rules.
- Lifestyle image cropping rules.
- Hero media rules.
- Placeholder image rules.
- Alt text rules.
- Source URL manifest references.

### 13. Accessibility And QA Checklist

Purpose: create an acceptance gate.

Checks:

- Contrast.
- Focus visible.
- Hit targets.
- Text wrapping.
- No horizontal overflow.
- Responsive breakpoints.
- Reduced motion.
- Keyboard navigation.
- Image alt text.
- Link clarity.
- Form errors.
- Component state coverage.

### 14. Agent Assembly Rules

Purpose: make the guide usable by future agents.

Content:

- Source-first copy rule.
- Token-first CSS rule.
- No hardcoded values unless documented.
- Page job before layout.
- Shared chrome inheritance.
- Required verification commands.
- Required audit note format.

## Proposed Page Structure

Rebuild `style-guide.html` as:

1. Compact sticky local table of contents.
2. System overview.
3. Foundations dashboard.
4. Typography specimen table.
5. Color/token matrix.
6. Grid/spacing/sizing specs.
7. Radius/elevation/border specs.
8. CTA and interaction states.
9. Forms and selectors.
10. Ecommerce component states.
11. Page section patterns.
12. Shared chrome documentation.
13. Asset rules.
14. Agent QA checklist.

## Implementation Workstreams

### Agent 1: Information Architecture And HTML Skeleton

Task:

- Strip the current style guide content.
- Rebuild the HTML structure around the sections above.
- Keep shared nav/footer/drawer script integration.
- Add semantic landmarks and stable anchors.

Deliverables:

- Updated `static-demo/pages/style-guide.html`.
- Mirrored `static-demo/design-system/style-guide.html`.
- No fake decorative nav/footer/card specimens.

### Agent 2: Foundation Tokens And CSS Architecture

Task:

- Refactor `static-demo/design-system/style-guide.css` around the new IA.
- Ensure all examples consume `halo-theme.css` and `tokens.css`.
- Add style-guide-only layout helpers without hardcoding brand values.
- Fix code wrapping, tables, responsive grids, and mobile layout.

Deliverables:

- Updated style guide CSS.
- Token usage note in page audit.

### Agent 3: Typography, Layout, And Geometry Specs

Task:

- Build tactical specimens for typography, grid, spacing, max widths, min/max heights, radius, border, elevation, and media ratios.
- Use real token names and computed values where possible.

Deliverables:

- Rendered typography scale.
- Layout and grid examples.
- Radius/elevation tables.

### Agent 4: CTA, Forms, And Component States

Task:

- Build the button-state matrix, form states, PDP selectors, swatches, cards, badges, price rows, accordions, and comparison table examples.
- Include hover/focus/disabled/loading/selected states.

Deliverables:

- Component/state sections with usage notes.
- No abstract examples that cannot map to Halo pages.

### Agent 5: Page Section Pattern Library

Task:

- Create realistic section specimens for homepage, PDP/configurator, accessories, how-it-works, deals, testimonials, account, membership, and Pack Perks.
- Keep notes separate from specimens.

Deliverables:

- Full-width or realistic-width page section examples.
- Source mapping notes for each pattern.

### Agent 6: QA And Audit

Task:

- Verify local links/assets.
- Check desktop/tablet/mobile rendering.
- Check no horizontal overflow.
- Check typography wrapping.
- Check no fake chrome/card issues.
- Write audit.

Deliverables:

- `static-demo/docs/page-audits/style-guide-tactical-rebuild.md`
- Screenshots if browser tooling permits.

## Acceptance Criteria

- The first viewport reads like a style guide, not a marketing hero.
- The guide includes H1-H6 and all key text roles.
- CTA states are complete and visually distinct.
- Border radius, spacing, grid, max-width, min-height, and media-ratio specs are explicit.
- Every visual example maps to a real Halo page/component job.
- Nav/footer are documented as shared chrome, not embedded as decorative examples.
- All examples use shared CSS variables or clearly document why a local value exists.
- Both style guide URLs remain valid:
  - `static-demo/pages/style-guide.html`
  - `static-demo/design-system/style-guide.html`
- The guide is usable by an agent without reading this chat.
