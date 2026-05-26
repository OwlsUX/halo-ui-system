# Pack Perks Account Banner Agent Prompt

You are the Pack Perks account-page specialist for the Halo static demo.

Your first task is to improve the Pack Perks banner on the account page while preserving the exact imported Pack Perks account UI as the baseline. Do not redesign the full page. Do not replace the account dashboard structure. Start with the banner module only.

## Primary Goal

Update the account page banner so it feels polished, premium, and intentional inside the Halo account dashboard.

The current target page is:

- `static-demo/pages/account.html`

Keep this companion route in sync if it contains the same account-page banner:

- `static-demo/pages/account-perks.html`

The imported source reference is:

- `repos/packperks/account-perks.html`
- `repos/packperks/account-perks-v2.html`
- `repos/packperks/css/styles.css`

The current static-demo CSS source is:

- `static-demo/vendor/packperks/css/styles.css`

## Screenshot Context

The provided screenshot shows the desired account-page context:

- Halo ecommerce/account nav at top.
- "Welcome back, Hunter" account header.
- A dark Pack Perks value banner immediately below.
- Three featured benefit cards inside the banner.
- Dashboard cards below for Account Details, Pack Membership, and Billing Interval.

Important: the purple "B" circles in the screenshot are review callouts, not UI. Do not implement them.

## Banner Requirements

Keep the banner as an account-dashboard module, not a full marketing hero.

The banner should:

- Sit cleanly between the account greeting and the dashboard cards.
- Use the existing Halo/Pack Perks copy unless a copy update is explicitly needed.
- Preserve the current CTA destination to `pack-perks-list.html`.
- Preserve the three featured benefit concept:
  - Unlimited 24/7 TeleVet
  - $250 in Annual Food Credits
  - $1,000 in Annual Travel Credits
- Use real partner logo/image assets that already exist in the Pack Perks import whenever possible.
- Feel premium and benefit-rich without becoming noisy.
- Improve visual hierarchy, spacing, card alignment, responsive behavior, and CTA placement.
- Avoid oversized type. The account page should feel dense and useful, not like a marketing landing page.
- Use Halo design tokens where available, but do not force a full visual rewrite of the imported Pack Perks system.

## Design Direction

Use the current Halo style guide as the governing system:

- `static-demo/pages/style-guide.html`
- `static-demo/css/halo-theme.css`
- `static-demo/css/tokens.css`

Apply these principles:

- Yellow is for the primary action.
- Dark blue/near-black surfaces can replace flat black where it improves consistency.
- Cards should be compact, legible, and aligned.
- Account UI should prioritize scannability and task completion.
- Product/account pages should not use giant marketing H1 treatment.
- Do not put nav/footer examples or unrelated system content inside this page.

## Implementation Scope

Allowed edits:

- Account banner HTML in `static-demo/pages/account.html`.
- Matching banner HTML in `static-demo/pages/account-perks.html` if the module exists there.
- Pack Perks banner CSS in `static-demo/vendor/packperks/css/styles.css`.
- A page audit note documenting the change.

Avoid unless required:

- Editing unrelated account dashboard cards.
- Editing Pack Perks marketing pages.
- Editing global shared nav/footer.
- Editing unrelated shared tokens.
- Replacing the whole Pack Perks source import.

If you need new banner-only CSS hooks, add them cleanly and keep them scoped to the Pack Perks account banner.

## Specific Banner Checks

Before editing, inspect:

- `.pp-banner`
- `.pp-banner-inner`
- `.pp-copy`
- `.pp-eyebrow`
- `.pp-headline`
- `.pp-body`
- `.pp-cta-btn`
- `.pp-pillar-grid`
- `.pp-pillar-card`
- `.pp-pillar-media`

Then decide whether the banner needs:

- better internal grid proportions
- better vertical rhythm
- stronger CTA placement
- softer dark surface treatment
- tighter benefit-card layout
- improved mobile stacking
- more consistent logo/image sizing
- better text contrast
- removal of any visual clutter

## Responsive Requirements

Verify at minimum:

- desktop around `1440px`
- tablet around `1024px`
- mobile around `390px`

The banner must:

- avoid horizontal overflow
- keep CTA visible and tappable
- keep card text readable
- prevent partner logos from stretching or clipping
- stack naturally on mobile
- preserve account-dashboard content below without awkward gaps

## Verification

Run these checks if available:

1. `git diff --check -- static-demo/pages/account.html static-demo/pages/account-perks.html static-demo/vendor/packperks/css/styles.css`
2. Local href/src check for edited HTML pages.
3. Browser check for:
   - `/pages/account.html`
   - `/pages/account-perks.html`
4. Screenshot or visual QA for desktop and mobile.

If browser tooling is unavailable, document that clearly and still run static checks.

## Audit Note

Create:

- `static-demo/docs/page-audits/pack-perks-account-banner.md`

Include:

- What changed.
- Which source files were inspected.
- What was intentionally preserved from the original Pack Perks import.
- Desktop/mobile behavior.
- Verification performed.
- Remaining concerns or follow-up recommendations.

## Return Format

Return:

- Status: `DONE`, `DONE_WITH_CONCERNS`, or `BLOCKED`
- Files changed
- Summary of banner improvements
- Source routes verified
- Verification performed
- Remaining gaps
