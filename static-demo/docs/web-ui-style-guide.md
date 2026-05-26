# Halo Ecommerce Web UI Style Guide

Date: 2026-05-21  
Scope: HaloCollar.com marketing pages, PDP/configurator flows, account and membership pages, promotional templates, and future agent-built page copies.

## Source Provenance

Primary references:

- Live Halo homepage: public nav, promo strip, footer, Inter usage, live CTA yellow, and customer-facing chrome.
- V3 ecomlanders homepage and shop: `repos/ecomlanders/pages/Lander-v3-2026/styles.css` and `repos/ecomlanders/pages/Lander-v3-2026/shop.css`; primary modernized marketing and PDP direction.
- Pack Perks: `repos/packperks/css/styles.css`; account, membership, offers, rewards, and denser operational surfaces.
- Plan selector: `repos/halo-plan-selector/src/styles/globals.css`; membership selector state and form/control assumptions.
- Local system sources: `static-demo/css/halo-theme.css`, `static-demo/css/tokens.css`, `static-demo/data/style-tokens.json`, and the web guide at `static-demo/pages/style-guide.html`.

Use this precedence when sources conflict:

1. Live-replica chrome follows live homepage nav, promo strip, and footer values.
2. New marketing pages follow V3 homepage visual rhythm, with Halo logo, yellow CTA, deep blue ink, and shared tokens.
3. PDP and configurator flows follow V3 shop structure.
4. Account, Pack Perks, and membership surfaces follow Pack Perks and plan-selector density.

## Brand Foundation

Halo is premium ecommerce, pet-tech hardware, warm, reassuring, direct, and product-oriented. The design system should feel close to the V3 homepage and configurator while preserving recognizable Halo primitives.

Logo usage:

- Use existing Halo SVG logo assets. Do not draw replacement marks or synthetic monograms.
- Use dark logo assets on white and soft neutral surfaces.
- Use white logo assets in dark footers or deep blue sections.

Core primitives that must stay intact:

- `--halo-font-live`: Inter stack for live/account/member pages.
- `--halo-font-sans`: preserved V3/system stack for existing V3 marketing variants.
- `--halo-yellow: #fcd62d` for primary CTA and promo roles.
- `--halo-live-yellow: #ffd700` for live nav CTA fidelity.
- `--halo-blue: #2f93f3` for links, focus, selected states, and technical accents.
- `--halo-blue-950: #071826`, `--halo-ink: var(--halo-blue-950)`, `--halo-gray-900: var(--halo-blue-950)`.

## Token Architecture

Shared token files:

- `static-demo/css/halo-theme.css`: primitives, semantic color roles, type roles, spacing, radius, shadows, motion, and legacy source bridges.
- `static-demo/css/tokens.css`: compatibility aliases and base utility/component styles used by non-V3 pages.
- `static-demo/data/style-tokens.json`: machine-readable mirror for future agents.

Use primitives only to document source values or define semantic roles. Page and component CSS should prefer semantic tokens:

| Role | Token examples | Use |
| --- | --- | --- |
| Action | `--halo-color-action-primary`, `--halo-color-action-secondary`, `--halo-color-action-disabled` | CTAs, checkout, plan selection, disabled actions |
| Link/focus | `--halo-color-link`, `--halo-color-focus`, `--halo-color-focus-ring` | Links, selected states, keyboard focus |
| Surface | `--halo-color-surface-page`, `--halo-color-surface-raised`, `--halo-color-surface-product`, `--halo-color-surface-dark` | Page backgrounds, cards, product media, dark sections |
| Text | `--halo-color-text-primary`, `--halo-color-text-secondary`, `--halo-color-text-inverse` | Copy hierarchy on light and dark surfaces |
| Border | `--halo-color-border-subtle`, `--halo-color-border-strong`, `--halo-color-border-dark` | Cards, dividers, active states |
| Status | `--halo-color-status-success`, `--halo-color-status-danger`, `--halo-color-sale`, `--halo-color-membership` | Success, error, sale, member states |
| Component | `--halo-component-button-radius`, `--halo-component-card-radius`, `--halo-component-pdp-gallery-radius` | Shared control geometry |

## Color System

Halo pages should balance white/light surfaces, deep blue ink, yellow action moments, restrained blue links, and occasional sale/success/member states. Avoid one-note palettes and do not make yellow decorative.

Usage guidance:

- Page backgrounds: use `--halo-color-surface-page` or `--halo-color-surface-muted`.
- Raised panels: use `--halo-color-surface-raised`, `--halo-color-card-border`, and `--halo-shadow-card`.
- Product cards and PDP gallery: use `--halo-color-product-surface` and stable aspect ratios.
- Dark hero/footer backgrounds: use `--halo-color-surface-dark`, not generic charcoal or pure black.
- Yellow CTAs: use `--halo-color-action-primary` with `--halo-color-action-primary-text`.
- Blue links/focus: use `--halo-color-link` and `--halo-color-focus`.
- Account/member states: use `--halo-color-membership-surface` and `--halo-color-membership`.
- Sale/deal states: use `--halo-color-sale-surface` and `--halo-color-sale`.

Contrast notes:

- Yellow CTA text must be deep blue ink, not white.
- Dark sections use white or inverse-muted text. Do not use gray copy on deep blue.
- Muted copy must stay readable on white and tinted neutrals.
- Links should be visibly blue and not rely on color alone when they carry state.
- Disabled states keep control dimensions stable and labels readable.

## Typography

Inter is the default live/account font. The V3 system/SF stack is preserved for existing V3 marketing pages and intentionally modernized variants.

Type roles:

| Role | Desktop | Mobile | Use |
| --- | ---: | ---: | --- |
| Hero headline | `3.5rem` | `2.25rem` | First-viewport brand moments |
| Page headline | `3rem` | `2rem` | Category, account, support, promo pages |
| Section headline | `2.5rem` | `1.85rem` | Reusable content bands |
| Subsection | `1.75rem` | `1.75rem` | Split media, module headings |
| Card title | `1.125rem` | `1.125rem` | Product cards, panels, plan cards |
| Body | `1rem` | `1rem` | Default copy |
| Small | `0.875rem` | `0.875rem` | Nav, footer, dense metadata |
| Caption | `0.75rem` | `0.75rem` | Badges, legal, helper text |

V3 behavior:

- Homepage hero can use the hero/display range with strong photography.
- Configurator/PDP title and buy-stack headings stay tighter because the user is comparing options.
- H2 sections should be confident but not oversized on every route.
- H3/product card titles should read as scannable ecommerce UI, not landing-page hero type.

## Spacing, Layout, Radius

Layout standards:

- Live chrome container: `1240px`, 20px desktop side padding.
- V3 marketing container: up to `1400px`, with stronger image-led bands.
- PDP desktop: gallery left, sticky buy stack right, 32px to 64px gap.
- Product card media: stable aspect ratios so hover, price, badge, and CTA states do not shift layout.
- Section spacing: 64px to 96px desktop, 44px to 64px mobile. Larger only for true immersive hero or proof moments.

Radius:

- 4px: tiny tags and microstates.
- 6px to 8px: live controls, nav CTA, compact buttons.
- 12px: account cards, forms, default cards.
- 16px: PDP gallery, featured product media, large image modules.
- 999px: CTAs, badges, plan chips.

Cards are appropriate for products, plans, account panels, modals, cart rows, and discrete repeated objects. Use full-width bands or unframed split layouts for storytelling sections. Ban nested cards and arbitrary repeated card grids.

## CTA and Interaction States

Required states for interactive elements:

- Default
- Hover
- Active
- Focus-visible
- Disabled
- Loading
- Error where validation applies
- Success where confirmation applies

CTA variants:

- Primary yellow: `Shop Now`, `Add to cart`, `Select plan`, `Choose color`, high-value promo actions.
- Secondary dark: checkout progression, `Continue`, account management, strong actions on light surfaces.
- Tertiary: `Learn more`, support links, secondary education.
- Icon buttons: account, cart, close, quantity, drawer controls. Keep 40px to 44px targets.
- Selected: use blue/link/focus roles or yellow borders when the selection is a featured plan.
- Disabled/loading: preserve dimensions, remove transform/shadow, keep text readable.

## Navigation and Footer

Customer-facing nav:

- Promo strip above nav, yellow background, deep blue text.
- Logo left, nav links center, account/cart/CTA right on desktop.
- Mega menu uses product tiles for Halo Collar 5 and Halo Collar 4 plus category links for Beacons and Accessories.
- Active state uses Halo blue or yellow underline depending on surface.
- Mobile state uses a drawer below promo/nav with product tiles and clear section dividers.
- Sticky white nav is the default. Transparent nav is only for image-led hero pages with verified contrast.

Internal workbench drawer:

- Separate from customer-facing nav.
- Use only for demo navigation, QA notes, status, and agent controls.
- Never replace customer cart, account, or support treatment.

Footer variants:

- Ecommerce pages: full dark footer with shop, about, membership, and support columns.
- Account pages: compact dark footer with membership and support emphasis.
- Simple landing pages: simplified dark footer when there is one conversion goal.

## Section and Component Patterns

Reusable patterns documented in the web guide:

- Full-bleed image hero: product/lifestyle media with dark scrim, concrete H1, primary and secondary actions.
- Product configurator shell: left gallery, right sticky buy stack, sale badge, price, swatches, plan/add-on cards, add-to-cart CTA.
- Accessory category intro: source-backed heading, category shortcuts, product media stack, support link.
- Product card: stable media, badge, title, concise factual copy, price, CTA.
- Comparison table: scannable rows, mobile-safe collapse, no decorative metrics.
- Testimonial proof band: real customer quote, property context, video controls when available.
- Deal/sale offer block: sale badge, product image or offer context, current/original price, clear CTA.
- Account dashboard panel: plan status, renewal/payment details, credit balance, management CTA.
- Membership plan card: plan name, included benefits, price cadence, selected/featured state.
- FAQ: semantic accordion rows with large hit targets and focus-visible state.
- Split media section: app/setup/training explanation with real Halo assets.
- Support CTA: support, fit guidance, or plan education without interrupting checkout.

## Agent Assembly Rules

1. Start with the matching source-backed page: live, V3, PDP, account, Pack Perks, or plan selector.
2. Preserve copy, product facts, pricing, legal language, and claims.
3. Select section patterns from the style guide.
4. Use shared CSS variables first.
5. Add local CSS only for a real new requirement.
6. Add new tokens to `halo-theme.css`, `tokens.css`, and `style-tokens.json`.
7. Update this Markdown guide and the web guide when system behavior changes.
8. Document hardcoded drift and cascade verification in a page audit.

## Accessibility and QA

- Keep visible focus on links, buttons, nav toggles, accordions, swatches, cart controls, and drawer controls.
- Use semantic buttons for dropdowns, drawers, accordions, swatches, add/remove, and modal actions.
- Product color swatches need accessible names and selected state.
- Badge-only price or eligibility information must also appear in readable copy.
- Overlay text must pass contrast against the actual image/video frame.
- Mobile type and button labels must fit containers.
- Loading states must not resize buttons, cards, nav, buy stacks, or drawers.

## Current Known Drift

- Several representative page CSS files still contain source-era hardcoded black/rgba overlays. Highest-impact shared roles now exist, but full migration should happen page by page.
- The V3 source CSS still uses legacy `--black`, `--gray-*`, and `--accent` variables. `halo-theme.css` now bridges those to Halo semantic primitives where pages import it after the vendor CSS.
- Live nav CTA yellow and brand CTA yellow remain separate by design.
