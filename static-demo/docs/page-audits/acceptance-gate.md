# Halo Page Replica Acceptance Gate

Every page worker must pass this checklist before the page can be called usable.

## Source Backing

- Identify the live URL or repo file used as the primary source.
- Capture the page H1, major H2/H3 sequence, CTAs, offer text, and repeated product/feature copy.
- Use exact source copy for the baseline page wherever source copy exists.
- Use live Halo image URLs or repo-local Halo assets; do not substitute synthetic imagery.

## Design System Fit

- Match the current homepage as the visual reference.
- Use the shared tokens in `static-demo/css/halo-theme.css`.
- Keep typography restrained: no oversized placeholder H1s on subpages.
- Use Halo-style pill CTAs, soft white sections, high-quality image blocks, and focused section layouts.
- Avoid generic three-card filler, nested cards, purple/blue gradients, and decorative placeholder modules.

## Page Structure

- Include global promo/nav/footer behavior consistent with the v3 homepage.
- Build distinct section types that match the source page content, not a repeated template.
- Keep page-specific CSS in the assigned page stylesheet.
- Preserve all local navigation links.

## Audit Output

Each worker must add a short note under `static-demo/docs/page-audits/` listing:

- Source URL/files inspected.
- Sections represented.
- Image assets used.
- Known gaps or static-only limitations.
- Verification command or browser check performed.

## Verification

- Page returns HTTP 200 on the local server.
- Linked CSS and JS return HTTP 200.
- No broken local links from the page.
- Main visible images load.
- Browser check confirms the hero, first content section, CTA, nav, and footer render at desktop width.
