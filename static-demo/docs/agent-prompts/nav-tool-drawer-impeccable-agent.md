# Agent Prompt: Halo Navigation + Workbench Tool Drawer

You are working in:

`/Users/drew/Documents/Codex/2026-05-20/ok-so-i-want-you-to`

Current branch:

`impeccable-style-guide-pass`

## Mission

Redesign the navigation system so the actual site navigation feels like HaloCollar.com, while all internal design-system/demo links move into a separate left-side workbench drawer.

Right now the nav mixes real customer-facing Halo links with internal project links such as style guide, component catalog, prompts, audits, and concept pages. That makes the demo feel unlike the live website and makes the active nav treatment look off-balance. Your job is to separate those concerns:

1. **Customer-facing Halo nav:** mimic the live Halo/ecommerce navigation as closely as possible.
2. **Internal workbench drawer:** provide fast access to our design-system routes, page audits, prompts, component catalog, and concept pages without polluting the site nav.

Use Impeccable to make the result feel polished, snappy, and intentional.

## Write Scope

You may edit:

- `static-demo/css/components.css`
- `static-demo/js/components.js`
- `static-demo/css/halo-theme.css` only if a reusable nav/drawer token is needed
- `static-demo/pages/*.html` only for nav/tool-drawer shell wiring
- `static-demo/index.html` only if overview links need to reflect the new drawer model
- `static-demo/docs/page-audits/nav-tool-drawer.md`
- Optional screenshots under `static-demo/screenshots/`

Avoid editing page content sections. This task is about global navigation and the demo workbench drawer.

Do not rewrite the V3 homepage or PDP page content. If their existing V3 nav is the best live-reference implementation, reuse its structure as the model.

## Required Context

Read these first:

- `static-demo/pages/home.html`
- `static-demo/pages/shop-wireless-dog-fence.html`
- `static-demo/pages/accessories.html`
- `static-demo/css/components.css`
- `static-demo/js/components.js`
- `static-demo/css/halo-theme.css`
- `static-demo/pages/style-guide.html`
- `static-demo/index.html`
- `static-demo/data/live-nav.json`
- `static-demo/docs/page-audits/integration-check.md`
- `repos/impeccable/skill/SKILL.md`

Then read these Impeccable references:

- `repos/impeccable/skill/reference/layout.md`
- `repos/impeccable/skill/reference/polish.md`
- `repos/impeccable/skill/reference/interaction-design.md`
- `repos/impeccable/skill/reference/motion-design.md`
- `repos/impeccable/skill/reference/responsive-design.md`
- `repos/impeccable/skill/reference/color-and-contrast.md`

Also inspect the current live Halo nav in a browser:

- `https://www.halocollar.com/`

Record the current live nav labels, dropdown behavior, account/cart treatment, CTA treatment, and mobile behavior before changing the local demo.

## Current Problem

The local demo has two conflicting navigation jobs:

- Customer site navigation: Homepage, Shop Halo, Accessories, Beacons, Testimonials, Deals, How it works, Account, Cart, Shop Now.
- Internal workbench navigation: Overview, style guide, component catalog, integration checks, page audits, prompts, modern concept pages, implementation docs.

These should not live in the same nav. The Halo nav should feel customer-facing. The workbench nav should feel like a tool layer added for our design-system project.

## Target Design

### 1. Customer-Facing Halo Nav

Build the primary nav to mimic HaloCollar.com:

- Promo strip above nav.
- Halo logo.
- `Shop Halo` dropdown/mega menu with:
  - Halo Collar 5
  - Halo Collar 4, if present in live/source nav
  - Beacons
  - Accessories
- Primary links:
  - Testimonials
  - Deals
  - How it works
- Account icon/link.
- Cart icon/link.
- Primary `Shop Now` CTA.

Important:

- Remove `Style guide`, `Design system`, `Component catalog`, and other internal links from the customer-facing nav.
- Do not add random extra product links unless they exist in source/live nav.
- Keep local routes mapped correctly:
  - Shop Halo / Shop Now -> `shop-wireless-dog-fence.html`
  - Accessories -> `accessories.html`
  - Beacons -> `beacons.html`
  - Testimonials -> `reviews.html`
  - Deals -> `deals.html`
  - How it works -> `how-it-works.html`
  - Account -> `account.html`

### 2. Active State

The current active nav treatment is visually heavy and off-balance. Replace it with a more refined state:

- Avoid a large black pill unless it matches the live nav exactly.
- Prefer a subtle underline, small marker, soft tinted background, or balanced pill treatment.
- Active state must work on light and transparent/sticky nav states.
- Hover, focus-visible, active, and selected states must all be designed.
- Use `--halo-ink`, `--halo-blue-950`, `--halo-yellow`, and `--halo-blue` tokens. Avoid hardcoded one-off colors.

### 3. Workbench Tool Drawer

Add a small tool trigger on the left side of the viewport that opens a drawer. This is for designers/agents reviewing the system, not for customers.

Requirements:

- Trigger sits fixed on the left edge or lower-left corner and is visually separate from the site nav.
- It should be discoverable but not loud.
- It must not cover customer nav links or key page CTAs.
- Drawer opens from the left.
- Drawer has a clear title, close button, focus-visible states, and Escape/outside-click behavior if feasible.
- Drawer should be usable on mobile.
- Use semantic button/link markup and good ARIA attributes.

Workbench drawer links:

- Overview -> `../index.html` from pages, or `index.html` from overview
- Homepage -> `home.html`
- PDP / configurator -> `shop-wireless-dog-fence.html`
- Accessories -> `accessories.html`
- Beacons -> `beacons.html`
- How it works -> `how-it-works.html`
- Reviews -> `reviews.html`
- Deals -> `deals.html`
- Account -> `account.html`
- Pack Perks -> `pack-perks.html`
- Plans -> `plans.html`
- Style guide -> `style-guide.html`
- Component catalog -> `../design-system/index.html` from pages
- Integration check -> `../docs/page-audits/integration-check.md` from pages
- Agent prompts:
  - `../docs/agent-prompts/accessories-elevated-design-pass-agent.md`
  - `../docs/agent-prompts/nav-tool-drawer-impeccable-agent.md`
- Concept lab:
  - `modern-accessories.html`
  - `modern-accessory-pdp.html`

Because page-relative paths differ between `static-demo/index.html`, `static-demo/pages/*.html`, and `static-demo/design-system/*.html`, solve this deliberately. Do not create broken relative links.

Acceptable implementation options:

- Add small repeated drawer markup to each HTML page.
- Or inject drawer markup via `components.js` using a `data-workbench-root` path.
- Or use a minimal shared script that computes paths from `window.location`.

Pick the simplest approach that keeps links correct and maintainable.

### 4. Visual Quality Bar

Use Impeccable guidance:

- No arbitrary z-index values. Use a small semantic scale in CSS comments or tokens.
- No glassmorphism as a default.
- No giant black active pills unless live Halo uses them.
- No mixed internal/customer nav.
- No identical bulky drawer cards. Use compact grouping and hierarchy.
- Motion should feel snappy: 150-260ms, ease-out, no bounce/elastic.
- Drawer should feel like a tool, not a marketing modal.
- The main nav should feel like a polished ecommerce nav.

## Suggested Structure

Consider adding classes like:

- `.halo-site-nav`
- `.halo-site-nav__link`
- `.halo-site-nav__link[aria-current="page"]`
- `.halo-mega-menu`
- `.workbench-trigger`
- `.workbench-drawer`
- `.workbench-drawer__backdrop`
- `.workbench-drawer__section`
- `.workbench-drawer__link`

If existing classes are easier to preserve, keep them, but make the system coherent.

## Implementation Notes

- The V3 homepage and PDP already have richer nav markup. Use them as the live-style reference.
- The source-backed subpages currently use the simpler `.site-nav` / `.nav-links` shell. Upgrade that shell so it looks and behaves closer to the V3/live nav.
- If you cannot safely unify all nav markup in one pass, prioritize:
  1. Source-backed pages using `.site-nav`
  2. Overview/workbench access
  3. V3 homepage/PDP consistency polish
- Preserve all local route mappings.
- Do not remove the overview page. It should remain the launchpad, but it should no longer compensate for polluted customer nav.

## Verification

Run:

1. Local link scan across all HTML files.
2. HTTP checks for primary pages.
3. Browser checks at:
   - `1440x1000`
   - `1024x900`
   - `390x844`
4. For at least these routes:
   - `/pages/home.html`
   - `/pages/shop-wireless-dog-fence.html`
   - `/pages/accessories.html`
   - `/pages/how-it-works.html`
   - `/pages/style-guide.html`
   - `/`
5. Check:
   - nav renders
   - drawer trigger renders
   - drawer opens and closes
   - no horizontal overflow
   - no console errors
   - no broken images
   - internal workbench links are not in the customer nav
   - style guide remains reachable from drawer

Save screenshots if possible:

- `static-demo/screenshots/nav-desktop.png`
- `static-demo/screenshots/nav-drawer-open.png`
- `static-demo/screenshots/nav-mobile.png`

## Audit Note

Create `static-demo/docs/page-audits/nav-tool-drawer.md` with:

- Live nav/source references inspected.
- What changed in the customer nav.
- What moved into the workbench drawer.
- Active/hover/focus/motion design decisions.
- Link strategy for relative paths.
- Verification commands and results.
- Remaining issues or follow-up recommendations.

## Return Format

Return:

- Changed file paths.
- Short summary of nav and drawer design decisions.
- Verification performed.
- Any remaining gaps.
