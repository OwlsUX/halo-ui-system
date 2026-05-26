# Agent Prompt: V3/V2 Design Principles + Workbench Drawer Reconciliation

You are working in:

`/Users/drew/Documents/Codex/2026-05-20/ok-so-i-want-you-to`

## Mission

Review the current tactical style guide against the strongest Halo landing page sources, then reconcile the internal workbench drawer so it clearly exposes:

1. Main website pages.
2. Internal account / membership / Pack Perks pages.
3. Marketing landing pages from `HaloCollar/ecomlanders`.
4. Design-system resources.

The current issue: the style guide is improving, but many V3 landing-page design principles are not yet reflected across the broader page system. The workbench drawer also has Pack Perks listed in multiple places and does not clearly expose the ecomlanders marketing landing pages.

## Core Principle

Do not mix internal workbench links into the customer-facing Halo nav.

The customer-facing nav should stay ecommerce-focused. The workbench drawer is the internal routing layer for demo/system pages.

## Required Context

Read these first:

- `static-demo/pages/style-guide.html`
- `static-demo/design-system/style-guide.html`
- `static-demo/design-system/style-guide.css`
- `static-demo/docs/page-audits/style-guide-tactical-rebuild.md`
- `static-demo/pages/home.html`
- `static-demo/pages/shop-wireless-dog-fence.html`
- `static-demo/vendor/ecomlanders-v3/styles.css`
- `static-demo/vendor/ecomlanders-v3/script.js`
- `static-demo/css/halo-theme.css`
- `static-demo/css/tokens.css`
- `static-demo/js/components.js`
- `static-demo/index.html`

Then inventory these source repos:

- `repos/ecomlanders`
- `repos/packperks`
- `repos/halo-plan-selector`
- `repos/new-halo`

For ecomlanders, specifically inventory all HTML lander/demo sources, including but not limited to:

- `repos/ecomlanders/your-backyard.html`
- `repos/ecomlanders/misc/*.html`
- `repos/ecomlanders/comparison-modal/*.html`

If there are additional relevant marketing lander files, include them in the audit and drawer plan.

## Part 1: V3/V2 Design Principles Audit

Create a short design-principles audit that extracts what makes the V3/V2 Halo landing page system work.

Compare:

- V3 homepage/current demo: `static-demo/pages/home.html`
- Collar PDP/configurator: `static-demo/pages/shop-wireless-dog-fence.html`
- Ecomlanders source pages in `repos/ecomlanders`
- Current tactical style guide

Document concrete principles such as:

- nav/promo behavior
- hero composition
- typography scale and weight
- image-first section strategy
- restrained CTA hierarchy
- product-media surfaces
- section rhythm and vertical spacing
- card usage and when not to use cards
- dark sections vs light sections
- proof/offer/price treatment
- responsive behavior

Then identify where the current style guide or shared page system still fails to express those principles.

Do not over-philosophize. The output should be actionable.

## Part 2: Style Guide Improvement Recommendations

Create a focused recommendation list for applying V3/V2 principles to the style guide and broader system.

Include:

- Specific sections in the style guide that should be revised.
- Missing specimens or rules.
- Component/style rules that should be promoted to tokens.
- Page templates that still drift from the V3/V2 language.
- Suggested follow-up agent tasks.

If you make small direct edits to the style guide, keep them tightly scoped. The priority is the audit and drawer reconciliation.

## Part 3: Workbench Drawer Reconciliation

Update the workbench drawer in `static-demo/js/components.js`.

Current problem:

- Pack Perks appears more than once.
- The drawer is not organized around all the actual work surfaces.
- Marketing landing pages from ecomlanders are not clearly represented.

Required drawer taxonomy:

### Main Website

Include customer-facing website/demo pages:

- Homepage
- Collar PDP / Configurator
- Accessories
- Accessory PDP
- Beacons
- How it works
- Reviews / Testimonials
- Deals

### Account + Membership

Include internal/member pages:

- Account
- Plans
- Membership Selection
- Pack Perks Account
- Pack Perks List
- Offer Detail
- Cancellation Flow

Avoid duplicate generic “Pack Perks” entries in this section if the marketing Pack Perks page is also listed under Marketing Landers.

### Marketing Landers

Include marketing/lander routes:

- Pack Perks Marketing v1
- Pack Perks Marketing v2
- Pack Perks Marketing v3
- Ecomlanders V3 / homepage source route if present in the demo
- Ecomlanders V2 / `your-backyard` source route if imported or importable
- Any other ecomlanders marketing HTML sources that already exist in `static-demo/pages` or should be added as source-backed routes

If ecomlanders source pages are not yet imported into `static-demo/pages`, create a clear plan and optionally add source-route pages if this is low risk. If importing is too large, document exact filenames and proposed route names.

### Design System

Include:

- Style Guide
- Component Catalog
- Rebuild / audit docs if useful

## Import Rules For Ecomlanders Marketing Pages

If you import ecomlanders pages into `static-demo/pages`:

- Preserve the source UI as much as possible.
- Store copied assets under `static-demo/vendor/ecomlanders-*` only if they are not already present.
- Rewrite local links/assets so file/server preview works.
- Add source comments at the top of imported pages.
- Do not normalize them into the shared style guide in this pass unless the task is trivial.
- Add imported routes to `static-demo/index.html` and the workbench drawer.

If you do not import them:

- Document why.
- List the exact source files and proposed target routes in the audit.

## Write Scope

You may edit:

- `static-demo/js/components.js`
- `static-demo/index.html`
- `static-demo/pages/style-guide.html`
- `static-demo/design-system/style-guide.html`
- `static-demo/design-system/style-guide.css`
- New imported ecomlander source routes under `static-demo/pages/` if low risk.
- New vendor assets under `static-demo/vendor/` if needed.
- `static-demo/docs/page-audits/v3-style-guide-and-workbench-nav.md`

Do not edit:

- Collar PDP gallery/waterfall behavior.
- Accessory PDP work from another agent unless only updating drawer links.
- Pack Perks source-imported pages except route labels/links if needed.
- Customer-facing nav/footer unless directly fixing a regression and documented.

## Drawer Acceptance Criteria

- No duplicate Pack Perks entries with ambiguous labels.
- Drawer sections are named clearly:
  - Main Website
  - Account + Membership
  - Marketing Landers
  - Design System
- All drawer links resolve locally.
- Main website pages remain separate from marketing landers and internal account flows.
- Workbench drawer stays internal and is not added to customer nav/footer.

## Audit Note

Create:

`static-demo/docs/page-audits/v3-style-guide-and-workbench-nav.md`

Include:

- V3/V2 principles extracted.
- Style guide gaps found.
- Page/system drift found.
- Drawer taxonomy before/after.
- Ecomlanders source inventory.
- Imported ecomlanders routes, or proposed route plan if not imported.
- Files changed.
- Verification results.
- Remaining follow-ups.

## Verification

Run:

1. `node --check static-demo/js/components.js`
2. Local href/src check for any edited/imported HTML files.
3. Confirm every workbench drawer href resolves.
4. `git diff --check` for all edited files.
5. If browser tooling works:
   - open `static-demo/pages/style-guide.html`
   - open the drawer
   - verify no duplicate Pack Perks labels
   - verify the drawer sections and marketing lander links are visible
   - check no horizontal overflow on desktop and mobile

## Return Format

Return:

- Status: `DONE`, `DONE_WITH_CONCERNS`, or `BLOCKED`
- Changed files
- V3/V2 principles summary
- Drawer taxonomy summary
- Ecomlanders marketing lander routes added or proposed
- Verification performed
- Remaining gaps
