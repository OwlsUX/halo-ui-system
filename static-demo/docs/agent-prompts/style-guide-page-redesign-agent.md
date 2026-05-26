# Agent Prompt: Redesign the Halo Style Guide Page

You are working in:

`/Users/drew/Documents/Codex/2026-05-20/ok-so-i-want-you-to`

Current branch:

`impeccable-style-guide-pass`

## Mission

Redesign the Halo style guide page into a beautiful, readable, useful web page for the Agentic Design System.

The current style guide has useful underlying tokens, but the page presentation is not good enough. Some font styles are hard to read, sections feel dense or generic, and the example/pattern section is not polished or useful for future page-building agents. Your job is to make the style guide page feel like a premium ecommerce design-system artifact for a modern pet-tech brand while preserving the Halo brand system.

This is a page/interface redesign task, not a broad site redesign and not a token replacement task.

## Primary Files

Focus edits on:

- `static-demo/pages/style-guide.html`
- `static-demo/design-system/style-guide.html`
- `static-demo/design-system/style-guide.css`
- `static-demo/docs/web-ui-style-guide.md` only if documentation needs to reflect page changes
- `static-demo/docs/page-audits/style-guide-page-redesign.md`
- Optional screenshots under `static-demo/screenshots/`

Do not redesign the rest of the site. Do not change shared site pages unless a tiny shared-token or shared-chrome adjustment is required and clearly justified.

## Required Context

Read these first:

- `static-demo/pages/style-guide.html`
- `static-demo/design-system/style-guide.html`
- `static-demo/design-system/style-guide.css`
- `static-demo/css/halo-theme.css`
- `static-demo/css/tokens.css`
- `static-demo/js/components.js`
- `static-demo/pages/home.html`
- `static-demo/pages/shop-wireless-dog-fence.html`
- `static-demo/pages/accessories.html`
- `static-demo/pages/modern-accessory-pdp.html`
- `static-demo/docs/web-ui-style-guide.md`

Then read the Impeccable guidance:

- `repos/impeccable/skill/SKILL.md`
- `repos/impeccable/skill/reference/typography.md`
- `repos/impeccable/skill/reference/color-and-contrast.md`
- `repos/impeccable/skill/reference/layout.md`
- `repos/impeccable/skill/reference/polish.md`
- `repos/impeccable/skill/reference/interaction-design.md`
- `repos/impeccable/skill/reference/responsive-design.md`

If the Impeccable CLI is available, run it against the redesigned style guide and fix actionable issues. If unavailable, apply the references manually and document that.

## Brand Constraints

Preserve the established Halo design system:

- Keep the current Halo font-stack intent.
- Keep Halo yellow as the primary CTA/action color.
- Keep primary Halo blue for links, selected states, and technical accents.
- Keep the deep blue near-black foundation:
  - `--halo-blue-950: #071826`
  - `--halo-ink: var(--halo-blue-950)`
  - `--halo-gray-900: var(--halo-blue-950)`
- Keep the V3 homepage and PDP configurator as the visual reference.
- Do not introduce generic startup gradients, purple/blue SaaS styling, oversized poster typography everywhere, beige lifestyle branding, or unrelated luxury editorial styling.
- The style guide should feel like Halo, not a generic design-system template.

## Problems To Solve

Specifically improve:

1. **Readability**
   - Audit every heading, body paragraph, label, chip, token sample, and code label.
   - Fix hard-to-read font sizes, weights, contrast, line-height, spacing, and text widths.
   - Make code/token labels legible without making the page feel like developer documentation only.
   - Avoid tiny pale text and oversized dense blocks.

2. **Page Structure**
   - Create a clear, scannable information architecture.
   - Use a strong page intro that explains this is the source of truth for Halo page assembly.
   - Make sections feel intentionally designed, not stacked documentation cards.
   - Add a useful in-page navigation or section index if it improves scanability.
   - Keep the shared Halo nav, footer, and 3-message yellow promo bar intact.

3. **Visual Quality**
   - Make the style guide feel premium and modern.
   - Use restrained but polished surfaces, spacing, dividers, sample panels, and responsive grids.
   - Avoid overdesign: no decorative blobs, no generic gradients, no nested card piles, no arbitrary illustrations.
   - Use Halo product/page context where useful: PDP buy stack, product cards, account/membership modules, hero sections, promo bars, nav/footer.

4. **Useful Examples**
   - Replace weak pattern examples with useful component/pattern specimens that an agent can actually copy.
   - Include examples for:
     - Hero modules
     - CTA/button hierarchy and states
     - Product cards
     - PDP buy stack modules
     - Pricing/offer blocks
     - Beacon/accessory comparison sections
     - Account/member cards
     - Promo bars
     - Nav/footer rules
   - Each example should show realistic Halo copy and layout behavior, not placeholder boxes with generic labels.

5. **Agent-Ready Guidance**
   - Make it explicit how future agents should assemble new pages.
   - Include concise rules for:
     - choosing section types
     - using tokens instead of hardcoded colors
     - choosing CTA hierarchy
     - using product surfaces
     - keeping typography scale controlled
     - handling mobile layouts
   - This guidance should be visible and useful, not buried in long paragraphs.

## Design Direction

Use the V3 homepage and PDP/configurator as the visual anchors:

- clean white and soft neutral sections
- deep blue footer/dark surfaces
- Halo yellow actions
- blue links/selected/focus states
- practical ecommerce modules
- confident but controlled type
- generous whitespace where useful, denser structure where a tool surface needs scanning

The redesigned style guide should feel like a polished internal product design tool that still uses Halo customer-facing brand language.

## Implementation Requirements

- Use existing tokens from `halo-theme.css` and `tokens.css`.
- Add semantic CSS only if it improves clarity and reuse.
- Do not hardcode a new color palette.
- Do not use non-system fonts or import new font families unless already used by the project.
- Keep layout responsive across desktop, tablet, and mobile.
- Preserve links to the key demo pages.
- Preserve or improve the shared chrome injected by `components.js`.
- Avoid visible explanatory text that says how the page visually works; design should demonstrate the rules through examples.

## Verification

Run:

1. HTML route check:
   - `/pages/style-guide.html`
   - `/design-system/style-guide.html`

2. Static checks:
   - ensure local links still resolve
   - ensure no broken local image references
   - ensure no horizontal overflow

3. Browser verification:
   - desktop viewport around `1440x1000`
   - tablet viewport around `1024x900`
   - mobile viewport around `390x844`

4. Confirm:
   - nav is shared Halo nav
   - footer is shared Halo footer
   - yellow promo bar has 3 rotating messages
   - text is readable at all tested sizes
   - example section is visually useful and not generic
   - no console errors

Save screenshots:

- `static-demo/screenshots/style-guide-redesign-desktop.png`
- `static-demo/screenshots/style-guide-redesign-mobile.png`

## Audit Note

Create:

`static-demo/docs/page-audits/style-guide-page-redesign.md`

Include:

- what was wrong with the previous style guide
- what changed structurally
- typography/readability fixes
- example/pattern improvements
- token usage decisions
- verification results
- remaining gaps

## Return Format

Return:

- Status: `DONE`, `DONE_WITH_CONCERNS`, or `BLOCKED`
- Summary of design changes
- Changed files
- Screenshots created
- Verification performed
- Remaining gaps
