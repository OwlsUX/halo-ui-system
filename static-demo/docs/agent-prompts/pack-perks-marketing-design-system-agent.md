# Pack Perks Marketing Design System Agent Prompt

You are the Pack Perks marketing-page specialist for the Halo static demo.

Your task is to update the Pack Perks marketing page using the current Halo design system, with special attention to the hero banner, card designs, and the new grid/container rules in the style guide. This is a focused modernization pass, not a full content rewrite.

## First: Merge, Sort, And Protect Existing Work

Before editing, inspect the current worktree and reconcile existing changes.

Required first steps:

1. Run `git status --short`.
2. Inspect relevant diffs before touching files:
   - `static-demo/pages/pack-perks.html`
   - `static-demo/pages/pack-perks-marketing.html`
   - `static-demo/pages/pack-perks-marketing-v2.html`
   - `static-demo/pages/pack-perks-marketing-v3.html`
   - `static-demo/vendor/packperks/css/robinhood.css`
   - `static-demo/vendor/packperks/css/styles.css`
   - `static-demo/css/halo-theme.css`
   - `static-demo/css/tokens.css`
   - `static-demo/pages/style-guide.html`
3. Identify which changes are source imports, which are design-system updates, and which are unrelated.
4. Do not overwrite unrelated dirty work. If the same file has existing changes, work with them and keep the final diff coherent.
5. Do not revert any source-imported Pack Perks pages.
6. Sort duplicated/competing Pack Perks routes before editing:
   - Treat `static-demo/pages/pack-perks.html` as the primary route.
   - Treat `static-demo/pages/pack-perks-marketing-v3.html` as the v3 source comparison route.
   - Treat v1/v2 routes as reference/comparison unless the same shared CSS change intentionally improves them.

If the worktree is too conflicted to safely continue, stop and return `BLOCKED` with the exact files and reason.

## Primary Page

Primary route to update:

- `static-demo/pages/pack-perks.html`

Reference routes:

- `static-demo/pages/pack-perks-marketing.html`
- `static-demo/pages/pack-perks-marketing-v2.html`
- `static-demo/pages/pack-perks-marketing-v3.html`
- `static-demo/pages/pack-perks-list.html`
- `static-demo/pages/account.html`
- `static-demo/pages/account-perks.html`

Original source references:

- `repos/packperks/marketing-v3.html`
- `repos/packperks/marketing.html`
- `repos/packperks/marketing-v2.html`
- `repos/packperks/css/robinhood.css`
- `repos/packperks/css/styles.css`

## Design System References

Use the current design system as the source of truth:

- `static-demo/pages/style-guide.html`
- `static-demo/design-system/style-guide.html`
- `static-demo/css/halo-theme.css`
- `static-demo/css/tokens.css`
- `static-demo/css/components.css`

Pay particular attention to:

- container widths:
  - `--halo-container: 1400px`
  - `--halo-container-live: 1240px`
  - `--halo-container-readable: 760px`
- responsive grid guidance
- card patterns
- CTA states
- typography scale
- radius and shadow tokens
- yellow primary action usage
- deep blue/near-black surface usage
- media-led section composition

## Goal

Bring the Pack Perks marketing page into the same visual system as the updated Halo homepage/PDP/style guide while preserving the Pack Perks content and value proposition.

The page should feel like:

- a premium Halo ecommerce/member-benefit page
- clear and benefit-led
- dense enough for conversion
- cleaner and more modern than the current imported prototype
- aligned with the new grid/container system

It should not feel like:

- a generic SaaS landing page
- a Robinhood clone disconnected from Halo
- a loose card dump
- an over-large hero with poor hierarchy
- a page that ignores the source Pack Perks copy

## Content Preservation

Preserve the Pack Perks content and claims unless you are correcting obvious duplication or layout labels.

Keep core messaging such as:

- `$1,500+ in annual value`
- Pack Perks included with Halo membership
- unlimited TeleVet / Vet + Rx value
- food credits
- travel credits
- partner benefits
- membership-tier value framing
- CTA to view perks or sign in/account access

Do not invent new partner offers or dollar values.

## Hero Banner Requirements

Update the hero banner first.

The hero should:

- use the new container/grid system
- have a clear H1 that is not oversized beyond the style guide
- keep short supporting copy
- include one primary CTA and, only if useful, one restrained secondary action
- use Halo yellow only for the primary conversion action
- incorporate a premium benefit/value visual without overcrowding
- use real available Pack Perks/Halo imagery or clean product/member-benefit surfaces
- avoid awkward empty space, giant type, or decorative-only cards
- work cleanly at desktop, tablet, and mobile widths

If the current hero image breaks the composition, replace it with a clean design-system-compliant surface using existing assets or a refined benefit-card composition. Do not use broken remote imagery.

## Card Design Requirements

Update card patterns used on the Pack Perks marketing page.

Focus on:

- featured benefit cards
- partner/offer cards
- value statement cards
- tier/value comparison cards
- final CTA cards

Cards should:

- use consistent radius, border, shadow, and spacing tokens
- have clear hierarchy between category, title, value, body, and CTA
- avoid clipped logos/images
- use predictable image/media aspect ratios
- avoid too many competing badges
- support 2/3/4-column layouts using the new grid guidance
- collapse gracefully on mobile
- keep CTA and interactive states visible and accessible

Do not put every section inside a card. Full-width narrative/media sections should remain unframed where appropriate.

## Grid And Layout Requirements

Apply the current design-system grid rules.

Use:

- shared containers instead of ad hoc max-width values where practical
- predictable 12-column or repeat-column sections
- stable media aspect ratios
- responsive breakpoints aligned with existing page CSS
- readable line lengths for long copy

Avoid:

- one-off widths that conflict with tokens
- cramped cards at tablet widths
- horizontal overflow
- type wrapping inside small badges/buttons
- page sections that visually float without relationship to the grid

## Implementation Scope

Allowed edits:

- `static-demo/pages/pack-perks.html`
- shared Pack Perks marketing CSS if necessary:
  - `static-demo/vendor/packperks/css/robinhood.css`
  - `static-demo/vendor/packperks/css/styles.css`
- a page-specific CSS file if it already exists or is clearly better than adding more inline styles
- an audit note documenting the pass

Use restraint when editing:

- `static-demo/pages/pack-perks-marketing-v3.html`
- `static-demo/pages/pack-perks-marketing.html`
- `static-demo/pages/pack-perks-marketing-v2.html`

Only update those routes if the shared CSS change requires it or if you explicitly decide to keep the comparison routes visually aligned.

Avoid editing:

- account dashboard pages
- Pack Perks list page
- global nav/footer
- unrelated main website pages
- source files under `repos/packperks`

## Audit Note

Create:

- `static-demo/docs/page-audits/pack-perks-marketing-design-system-pass.md`

Include:

- worktree reconciliation notes
- files inspected before editing
- why `pack-perks.html` was treated as primary
- hero changes
- card/grid changes
- design-system tokens/rules used
- routes verified
- remaining gaps

## Verification

Run:

1. `git diff --check -- static-demo/pages/pack-perks.html static-demo/vendor/packperks/css/robinhood.css static-demo/vendor/packperks/css/styles.css`
2. HTML href/src check for edited pages.
3. CSS/JS syntax checks where applicable.
4. Browser checks if tooling is available:
   - `/pages/pack-perks.html`
   - `/pages/pack-perks-marketing-v3.html` if affected
   - desktop around `1440px`
   - tablet around `1024px`
   - mobile around `390px`

Verify:

- no visible broken images
- no horizontal overflow
- hero CTA visible above fold
- card grids align and wrap correctly
- button states remain legible
- page still uses Pack Perks copy and value claims

Save screenshots if possible:

- `static-demo/screenshots/pack-perks-design-system-desktop.png`
- `static-demo/screenshots/pack-perks-design-system-mobile.png`

## Return Format

Return:

- Status: `DONE`, `DONE_WITH_CONCERNS`, or `BLOCKED`
- Worktree reconciliation summary
- Files changed
- Hero updates
- Card/grid updates
- Routes verified
- Verification performed
- Remaining gaps
