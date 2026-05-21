# Halo Web UI Style Guide

Date: 2026-05-21  
Scope: HaloCollar.com web UI for live-replica pages, V3 modernized marketing pages, commerce/PDP flows, account/Pack Perks flows, and agent-built page copies.

## Source Provenance

Primary sources inspected:

- Live Halo homepage, `https://www.halocollar.com/`: current public nav, promo strip, footer, Inter preload, live CTA yellow, page copy, and embedded component styles.
- V3 ecomlanders: `repos/ecomlanders/pages/Lander-v3-2026/styles.css` and `repos/ecomlanders/pages/Lander-v3-2026/shop.css`; newest marketing/PDP visual direction.
- Pack Perks: `repos/packperks/css/styles.css`; account, membership, offers, nav reuse, rewards/tier surfaces.
- Plan selector: `repos/halo-plan-selector/src/styles/globals.css`; membership selector base tokens and Tailwind/shadcn-style component assumptions.
- Existing inventories: `docs/live-homepage-vs-static-demo-audit.md`, `static-demo/data/component-inventory.json`, `static-demo/data/live-nav.json`, `static-demo/data/site-assets.json`.

Use this rule when sources conflict:

1. Live-replica pages should use live homepage values.
2. New marketing pages should use V3 ecomlanders values, with live nav/footer unless intentionally modernizing chrome.
3. Commerce/PDP/configurator should use V3 `shop.css`.
4. Account, Pack Perks, and membership areas should use Pack Perks and plan-selector tokens.

## Typography

Primary live/account font stack:

```css
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

Observed on live homepage, Pack Perks, and plan selector. The live page preloads Inter from Google Fonts and consolidated CSS sets body type to Inter, `16px`, `1.7`, weight `500`, color `#3B3B3B`. The existing live audit measured some rendered homepage body text at `14px / 20px`; treat that as section/component-specific and verify with browser-computed styles when rebuilding exact live sections.

V3 marketing draft font stack:

```css
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif;
```

This appears in V3 ecomlanders `styles.css`. Use it only for V3/future marketing variants if the page is intentionally moving away from the live Inter baseline.

Recommended type scale:

| Token | Size / line | Weight | Letter spacing | Use | Provenance |
| --- | ---: | ---: | ---: | --- | --- |
| Display | `64px / 1` desktop, `48px` tablet, `40.8px` mobile | `600` | `0` | Immersive hero only | `--halo-type-display` |
| H1 live | source page CSS, currently `64px / 1` in the static V3 homepage viewport | `600` | source page value | Live homepage hero replica | V3 homepage |
| H2 section | `52px / 1.05` desktop, `37.6px` tablet, `32px` mobile | `600` | `0` | Major sections | `--halo-type-section` |
| H3 card | `18-24px / 1.2-1.35` | `600-700` | `0` | Product cards, module titles | V3 shop, Pack Perks |
| Body | `16px / 1.5-1.7` | `400-500` | `0` | Default readable copy | live/account |
| Small body | `14px / 20px` | `400-500` | `0` | Nav, footer, dense cards | live nav/footer |
| Eyebrow | `11-13px / 1` | `600-800` | `0.04-0.18em` | Uppercase labels, metadata | Pack Perks/V3 |

Avoid oversized poster type in dense UI, cards, sidebars, PDP buy stacks, or account modules.

## Color Tokens

Implementation note: the local static demo now has a shared CSS token bridge at `static-demo/css/halo-theme.css`. It exposes `--halo-*` variables and maps the V3 source variables (`--accent`, `--gray-900`, `--font-sans`, etc.) to those values so the homepage, configurator, modern accessories, overview hub, and style guide can move together.

| Token | Value | Source | Usage |
| --- | --- | --- | --- |
| `--halo-yellow` | `#FCD62D` | V3, Pack Perks, plan selector, live promo/footer | Brand accent, plan selector, badges, footer/social accents |
| `--halo-yellow-hover` | `#E8C428` | Pack Perks | Account/Pack Perks yellow hover |
| `--live-cta-yellow` | `#FFD700` | live inline nav | Live-replica nav CTA |
| `--live-cta-yellow-hover` | `#FFC700` | live inline nav | Live-replica nav CTA hover |
| `--ink` | `#111111` | Pack Perks | Primary text, dark CTA |
| `--live-dark-grey` | `#424242` | live consolidated CSS/nav | Live nav/footer text, promo text |
| `--v3-black` | `#000000` | V3 | Dark marketing sections |
| `--white` | `#FFFFFF` | all | Surfaces and reversed text |
| `--surface` | `#F5F5F5` | V3/Pack Perks | Light section bands |
| `--surface-soft` | `#FAFAFA` | V3/live tailwind | Subtle cards and page backgrounds |
| `--line` | `#E5E7EB` | V3 shop/Pack Perks | Borders and separators |
| `--muted` | `#6B7280` | Pack Perks/plan selector | Secondary text |
| `--halo-blue-950` / `--halo-gray-900` / `--halo-ink` | `#071826` | darkened from primary blue | Primary ink and near-black branded backgrounds |
| `--link-blue` | `#2F93F3` | live/V3 shop | Text links and nav hover |
| `--success` | `#22C55E` | V3 shop | Savings, checks, success state |
| `--danger` | `#DC2626` | V3 shop inferred | Remove/error states |

Do not make new pages single-hue. Halo pages should balance white/light gray surfaces, near-black blue ink, yellow CTAs, restrained blue links, and occasional green success states.

## Spacing, Radius, Shadow

Spacing:

- Live chrome container: `max-width: 1240px`, side padding `20px`.
- V3 marketing container: `max-width: 1400px`, side padding `6rem` desktop, reduced on tablet/mobile.
- PDP grid: `1fr 480px`, `4rem` gap, sticky buy stack.
- Section padding: use `96-140px` desktop for major marketing bands, `56-80px` mobile. Dense account/PDP modules can use `24-48px`.
- Component gap scale: `4, 8, 12, 16, 24, 32, 40, 64, 96`.

Radius:

- `4px`: tiny tags, promo microstates.
- `6px`: live small controls and badges.
- `8px`: live nav CTA/icon buttons and dropdown links.
- `10-12px`: account cards, forms, cart surfaces.
- `16px`: V3 PDP gallery tiles and featured plan cards.
- `999px`: Pack Perks/V3 pills and modern CTAs.

Shadow:

- Live nav: `0 2px 4px rgba(0,0,0,0.05)`.
- Live dropdown: `0 4px 24px rgba(0,0,0,0.12)`.
- V3 mega menu: `0 25px 50px -12px rgba(0,0,0,0.25)`.
- Pack Perks card small: `0 1px 2px rgba(17,17,17,0.04)`.
- Pack Perks card medium: `0 4px 14px rgba(17,17,17,0.06)`.
- Pack Perks card large: `0 10px 28px rgba(17,17,17,0.08)`.

## CTA and Button System

Live nav CTA:

- Background `#FFD700`, text `#333`, `16px`, weight `600`, padding `12px 24px`, radius `8px`.
- Hover `#FFC700`, translateY `-1px`, shadow `0 4px 12px rgba(255,215,0,.4)`.
- Use for live-replica header only.

Brand yellow CTA:

- Background `#FCD62D`, text `#111/#000`, radius `999px` in Pack Perks/V3, padding about `16px 30px`.
- Hover `#E8C428` or `#FFE05A` depending on source surface.
- Use for plan selection, Pack Perks marketing, promo states, and component-library defaults.

Dark commerce CTA:

- Background `#071826`, text white, radius `8px` or pill by context.
- Hover `#000000`.
- Use for PDP checkout/add buttons on light commerce surfaces.

White-on-media CTA:

- Background white, text black, pill radius, hover `#E5E5E5`.
- Use only over dark/image hero media.

Ghost CTA:

- Transparent with `1px` border.
- On dark media: border `rgba(255,255,255,.3)`, hover background `rgba(255,255,255,.1)`.
- On light surfaces: border `rgba(0,0,0,.18-.3)`, hover `rgba(0,0,0,.04-.06)`.

States:

- Focus must be visible. Use `2px solid #2F93F3` or browser focus ring when matching live nav.
- Disabled: reduce opacity to `.45-.55`, remove transform/shadow, keep cursor default.
- Loading: preserve button dimensions; add spinner or text swap without shifting layout.

## Global Chrome

### Promo Strip

Live homepage uses a top notice with `#FCD62D` background and `#434343` text. Messages rotate: Precision+, price drop, satisfaction guarantee. Keep height stable and ensure links inherit the same dark text.

### Header / Nav

Live header:

- Sticky white nav, `70px` high, Inter, `500`.
- Logo asset: `https://d252xzqwj6utz.cloudfront.net/static/owls-home/Halo-Logo.svg`; do not use synthetic letter marks.
- Container `1240px`, `20px` side padding.
- Desktop nav links: `16px`, `#424242`, hover `#000`.
- Shop dropdown includes product cards for Halo Collar 5 and Halo Collar 4 plus sidebar links for Beacons and Accessories.
- Account/cart icon buttons are `40px` controls; live uses `8px` radius while V3 shop uses circular icon buttons.
- Mobile menu opens full-screen below nav/promo, with `20px` links and section dividers.

V3 shop nav:

- Light nav border `#E5E5E5`, links `#525252`, hover `#071826`.
- Mega menu: gray `rgb(243,243,243)`, `1rem` radius, large shadow, two product cards plus sidebar.

### Footer

Live embedded footer:

- Background `#333`, text white.
- Padding `60px 0 30px`, container `1240px`.
- Logo height `45px`.
- Social buttons: `40px`, circle, `2px solid #FCD62D`, hover yellow fill.
- Link columns: heading `18px/600`, links `14px #ccc`, hover white.
- Legal/copyright: `14px #999`, top border `#444`.

V3 ecomlanders footer keeps dark contrast even in light theme; align that with the live footer unless intentionally refreshing the footer.

## Forms and Inputs

- Use Inter, `16px`, line-height `1.5`.
- Default input surface: white or `#F8F9FA`, border `#E5E7EB` or `rgba(0,0,0,.08)`, radius `8-10px`, padding `12-14px`.
- Focus: yellow ring for plan-selector contexts (`#FCD62D`) or blue ring for web/accessibility contexts (`#2F93F3`). Pick one per surface.
- Error: border/text `#DC2626`, pale red background only for inline alerts.
- Success: `#22C55E` or green tints for savings/success confirmation.
- Cart promo input on live uses `10px` radius and compact width; normalize to full-width on mobile.

## Cards, Product Tiles, Badges

Cards:

- Account/Pack Perks: white card, `1px solid #E5E7EB`, radius `12px`, subtle shadow, hover shadow for clickable cards.
- V3 PDP gallery: `#F5F5F5`, `16px`, square aspect ratio, image contained.
- Feature/image cards: use real Halo hosted assets, overlay text only when contrast is sufficient.

Product nav tiles:

- Product image background, overlaid content, white badge with `0.375rem` radius, title `20px/700`, price `18px`.
- Use actual product assets from live/V3. Do not replace product cards with generic icon cards.

Badges/pills:

- White-on-image badge: white background, black text, `12px`, `6px` radius.
- Popular plan badge: yellow background, `12px`, weight `600`, pill radius.
- Pack Perks tier badges: bronze/silver/gold tints from Pack Perks tokens.
- Uppercase metadata labels should use small sizes and positive letter spacing.

## PDP / Configurator Patterns

Source: V3 `shop.css`.

Use a two-column desktop layout with product gallery left and sticky config/buy stack right. Keep the buy stack scrollable when content exceeds viewport height.

Required states:

- Product title, review/trust badge, sale price/original price/savings.
- Color swatches with selected color label.
- Gallery image changes with color selection.
- Add-on cards: collapsed, expanded, add/remove, added state.
- Membership plan card: collapsed, expanded, featured, selected, learn-more modal.
- Quantity or multi-collar savings where applicable.
- Checkout CTA: available, disabled until selections complete, loading, error.
- Included/box contents modals.
- Cart drawer: empty, item rows, membership detail, promo collapsed/expanded, promo success/error, subtotal/tax/total.

Commerce surfaces should prefer dark CTAs on light backgrounds and keep yellow for promo/featured selection, not every action.

## Section Patterns

Hero:

- Live-replica hero copy starts with `Your backyard, now everywhere`.
- Use actual hosted video/image assets from `static-demo/data/site-assets.json`.
- Hero text should be anchored over media with strong contrast. Avoid generic stock-like crops.

Feature overview:

- Live homepage uses dense feature cards after `The ultimate smart collar`.
- V3 can use larger immersive cards and dark sections, but still preserve Halo assets and product-specific proof.

How it works / app sections:

- Use icon cards and app screenshots from hosted assets.
- Keep copy concise; avoid inventing new feature names when live copy exists.

Proof/testimonials:

- Use quote cards with customer name/property metadata and play controls when video is available.
- Do not use placeholder avatars or generic testimonial shells.

Pricing/product CTA:

- Use product image, current/original price, savings, and support/trial proof.
- CTA text should be concrete: `Explore Halo`, `Shop now`, `Get Halo Collar 5`.

FAQ:

- Dark V3 FAQ is acceptable for contrast.
- Accordion rows should have large hit targets and keyboard focus.

Account/Pack Perks:

- Quieter, denser operational UI: white cards, restrained shadows, clear tier/status labels, table/card hybrids for benefits.

## Accessibility Notes

- Maintain visible focus on all links, buttons, nav toggles, accordions, swatches, quantity controls, and cart controls.
- Use semantic buttons for dropdowns, drawers, accordions, swatches, add/remove, and modals.
- Product color swatches need accessible names and selected state.
- Badge-only information must be duplicated in text for screen readers when it affects price or eligibility.
- Ensure yellow buttons meet contrast by using near-black text.
- Overlay text must pass contrast against the actual image/video frame; add scrim only where needed.
- Preserve layout dimensions during loading to avoid shifts in nav, buy stack, cart, and cards.
- Mobile nav/cart drawers must trap focus while open and restore focus to the trigger when closed.

## Gaps and Decisions

- Live homepage body typography has two observed baselines: CSS body `16px / 1.7 / 500` and audit-measured text at `14px / 20px`. Verify section-level computed styles with Playwright/browser before a pixel-level live replica.
- Live nav CTA uses `#FFD700`; newer internal systems use `#FCD62D`. Keep both tokens and choose by surface rather than forcing one.
- V3 marketing uses an SF/system stack while live/account use Inter. Inter should be the default for agent-built Halo pages until a full rebrand decision is made.
- Existing static demo pages were already flagged as loose modernized drafts. This guide does not edit those pages.
- Footer source has both older consolidated CSS footer rules and a newer embedded live footer. Use the embedded live footer pattern for current page copies.
