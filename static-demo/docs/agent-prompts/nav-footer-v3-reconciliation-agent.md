# Agent Prompt: V3 Navigation And Footer Reconciliation

You are working in:

`/Users/drew/Documents/Codex/2026-05-20/ok-so-i-want-you-to`

Current branch:

`impeccable-style-guide-pass`

## Mission

Reconcile navigation and footer across every website page so the customer-facing chrome uses the same V3 lander navigation and footer system everywhere.

Right now the demo has inconsistent nav/footer structures across pages. Some pages use the richer V3 lander nav, some use partial source-backed nav, some still have older footer fragments, and internal design-system links occasionally leak into customer-facing surfaces. Your job is to make the website feel like one Halo ecommerce site.

Do not redesign the pages. This task is global chrome reconciliation only.

## Write Scope

You may edit:

- `static-demo/pages/*.html`
- `static-demo/css/v3-nav.css`
- `static-demo/css/components.css` only if a shared footer/nav utility is required
- `static-demo/js/components.js` only if nav/drawer behavior requires a bug fix
- `static-demo/docs/page-audits/nav-footer-v3-reconciliation.md`
- Optional screenshots under `static-demo/screenshots/` with names beginning `nav-footer-v3-`

Do not edit page-specific section content, product cards, PDP buy-stack behavior, style-guide tokens, or the vendor source files unless you document a blocker.

## Required Context

Read these first:

- `static-demo/pages/home.html`
- `static-demo/pages/shop-wireless-dog-fence.html`
- `static-demo/pages/accessories.html`
- `static-demo/pages/beacons.html`
- `static-demo/pages/how-it-works.html`
- `static-demo/pages/reviews.html`
- `static-demo/pages/deals.html`
- `static-demo/pages/account.html`
- `static-demo/pages/pack-perks.html`
- `static-demo/pages/plans.html`
- `static-demo/css/v3-nav.css`
- `static-demo/css/components.css`
- `static-demo/js/components.js`
- `static-demo/css/halo-theme.css`
- `static-demo/css/tokens.css`
- `static-demo/pages/style-guide.html`
- `static-demo/docs/page-audits/nav-tool-drawer.md`
- `static-demo/docs/page-audits/primary-website-style-guide-qa.md`
- `static-demo/docs/page-audits/primary-website-style-guide-integration-checklist.md`

Then inspect the V3 lander source:

- `repos/ecomlanders/pages/Lander-v3-2026`

Use `home.html` and the V3 lander source as the canonical customer-facing navigation and footer reference.

## Target Architecture

There must be two separate navigation systems:

1. **Customer-facing Halo nav/footer**
   - Appears on website pages.
   - Mimics the V3 lander/live Halo ecommerce structure.
   - Contains only customer routes and customer legal/support links.

2. **Internal workbench drawer**
   - Injected by `components.js`.
   - Contains internal overview, design system, audits, prompts, and concept links.
   - Must not pollute the customer nav or footer.

## Customer Nav Requirements

Use the V3 lander nav pattern across all website pages:

- Promo strip where appropriate.
- Halo logo.
- `Shop Halo` dropdown/mega menu.
- Customer links:
  - Testimonials
  - Deals
  - How it works
- Account icon/link.
- Cart icon/link.
- Primary `Shop Now` CTA.
- Mobile nav behavior consistent with the V3 lander pattern.

Local route mapping:

- Logo/Home -> `home.html`
- Shop Halo / Shop Now -> `shop-wireless-dog-fence.html`
- Accessories -> `accessories.html`
- Beacons -> `beacons.html`
- Testimonials -> `reviews.html`
- Deals -> `deals.html`
- How it works -> `how-it-works.html`
- Account -> `account.html`

Remove all customer-nav references to:

- Style guide
- Design system
- Component catalog
- Agent prompts
- Page audits
- Overview hub
- Modern concept lab

Those links belong only in the workbench drawer.

## Customer Footer Requirements

Use the V3 lander footer structure as the canonical pattern. Every customer-facing website page should use the same footer architecture, adjusted only for correct local relative paths.

Footer should include customer-facing groups only, such as:

- Shop
  - Halo Collar
  - Accessories
  - Beacons
  - Deals
- Learn / About
  - How it works
  - Testimonials
  - Blog or support template routes where local equivalents exist
- Membership / Account
  - Account
  - Plans
  - Pack Perks if it is positioned as customer-facing membership content
- Support / Legal
  - Halo Support
  - Privacy Policy
  - Terms of Use
  - Legal Disclaimer

Do not include internal system links in customer footers.

## Drawer Requirements

The workbench drawer should remain visible and working.

Also simplify the drawer groups so it is easier to use:

- Website Pages
  - Homepage
  - PDP / Configurator
  - Accessories
  - Beacons
  - How it works
  - Reviews
  - Deals
- Account & Membership
  - Account
  - Pack Perks
  - Plans
- Design System
  - Overview Hub
  - Style guide
  - Component catalog
  - Integration check
  - Relevant agent prompts and audits

Remove broken drawer links. If a drawer link points to a file that does not exist, either correct it or remove it.

## Relative Path Rules

Be deliberate about paths from:

- `static-demo/index.html`
- `static-demo/pages/*.html`
- `static-demo/design-system/*.html`
- `static-demo/docs/*.md` if linked from the drawer

Run a local link scan after changes. Broken internal links are not acceptable.

## Visual Quality Bar

- Nav/footer should feel like one system across pages.
- Do not mix V3 nav with older `.site-nav` fragments on customer pages.
- Active/hover/focus states should use shared tokens.
- Footer spacing, type, and link density should feel consistent with the V3 homepage and the style guide.
- Avoid adding explanatory in-app text.
- Preserve all page content sections.

## Verification

Run:

1. `node --check static-demo/js/components.js`
2. Local HTML link scan across all HTML files.
3. HTTP route checks for:
   - `/`
   - `/pages/home.html`
   - `/pages/shop-wireless-dog-fence.html`
   - `/pages/accessories.html`
   - `/pages/beacons.html`
   - `/pages/how-it-works.html`
   - `/pages/reviews.html`
   - `/pages/deals.html`
   - `/pages/account.html`
   - `/pages/pack-perks.html`
   - `/pages/plans.html`
   - `/pages/style-guide.html`
4. Grep primary customer pages for internal nav/footer leaks:
   - `style-guide`
   - `design-system`
   - `agent-prompts`
   - `page-audits`
   - `component catalog`
5. If browser tooling is available, verify desktop/mobile:
   - nav renders
   - footer renders
   - mobile nav opens
   - workbench drawer trigger is visible
   - drawer opens and closes
   - no horizontal overflow
   - no console errors
   - no visible broken images

## Audit Note

Create `static-demo/docs/page-audits/nav-footer-v3-reconciliation.md` with:

- Pages updated.
- Canonical V3 source used.
- Customer nav structure.
- Customer footer structure.
- Drawer link cleanup.
- Remaining differences from V3 source.
- Verification commands and results.

## Return Format

Return:

- Status: `DONE`, `DONE_WITH_CONCERNS`, or `BLOCKED`
- Changed files
- Nav/footer reconciliation summary
- Drawer link cleanup summary
- Verification performed
- Remaining gaps
