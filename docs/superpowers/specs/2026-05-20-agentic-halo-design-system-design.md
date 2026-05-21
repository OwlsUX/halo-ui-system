# Agentic Halo Design System

Date: 2026-05-20

## Purpose

Build an agentic design system for Halo Collar that lets humans and agents assemble modern Halo pages from shared, reusable sections. The first pass is a local static validation prototype; the second pass is a production-shaped Next.js component library after the visual/component model is proven.

The first deliverable is not only a component archive. It must include a working assembled static site demo with realistic route coverage, plus a component-only catalog that documents every extracted section, variant, source repo, and intended usage.

## Source Inventory

Primary sources:

- `HaloCollar/ecomlanders`: freshest source for marketing pages, PDP/shop pages, navigation, footer, and exported Tock-style section components. The canonical new homepage design is `pages/Lander-v3-2026/index.html`; use that as the homepage source of truth. Latest local clone commit: `79068b0` on 2026-05-20.
- `OwlsUX/packperks`: account dashboard, Pack Perks logged-in pages, Pack Perks public marketing pages, offer detail, cancellation, and membership-selection surfaces. Latest local clone commit: `30a12bf` on 2026-05-08.
- `OwlsUX/halo-plan-selector`: modern Pack Membership selector, billing cadence, Halo Care, multi-collar, comparison, and order-summary logic. Latest local clone commit: `b6731d3` on 2026-05-05.
- `OwlsUX/new-halo`: older landing/shop reference. Use as visual and interaction reference only where it fills gaps.

Public Halo inventory sources:

- XML sitemap index: `https://www.halocollar.com/sitemap-index.xml`
- Main sitemap: `https://www.halocollar.com/main-sitemap.xml`
- WordPress public page API: 96 published pages found during discovery.
- WordPress product API: 34 published products found during discovery.

Important discrepancy: the XML sitemap listed 60 main-site URLs, but active WordPress pages include `/dog-fence-features/` and child feature pages not present in the XML sitemap. The design system must use the combined sitemap/API view, not the XML sitemap alone.

## Product Shape

Build in two phases: a fast local static prototype first, then a production-shaped Next.js app after the visual/component direction is validated.

### Phase 1: Static Validation Prototype

Create a local static prototype that can be opened through a simple local server. This phase optimizes for speed and visual coverage:

- Audit the live primary-nav pages and break each page into named sections before building the replica.
- Build a hosted web asset database for each audited section so the static replica can reuse current Halo image/video URLs without downloading or rehosting them.
- Scrape and normalize all available components from the source repos.
- Assemble representative Halo pages using static HTML/CSS/JS.
- Include a component-only catalog page.
- Preserve source provenance and extraction status for each component.
- Keep interactions functional where they matter for evaluation: nav, modals, swatches, add-ons, cart drawer, accordions, filters, and membership selectors.
- Avoid spending time on Next.js routing, TypeScript typing, and package architecture until the page/component model is validated.

### Phase 2: Next.js Production Library

After Phase 1 is approved, convert the validated component model into one Next.js app with two first-class surfaces.

### Assembled Site Demo

Routes/pages should mirror the real Halo site enough to evaluate nav, footer, page rhythm, commerce state, and reusable templates:

- `/`
- `/shop-wireless-dog-fence/`
- `/main-shop/`
- `/main-shop/accessories/`
- `/beacons/`
- `/dog-fence-features/`
- `/dog-fence-features/virtual-gps/`
- `/dog-fence-features/gps-location-tracking/`
- `/dog-fence-features/cesar-millan-training/`
- `/dog-fence-features/halo-app/`
- `/dog-fence-features/feedback-system/`
- `/plans/`
- `/reviews/`
- `/deals-discounts/`
- `/my-account/`
- `/pack-perks/`
- `/pack-perks/offers/[offerSlug]`
- `/cart/`
- `/checkout/`
- `/blog/`
- `/blog/[slug]`
- `/support/`
- `/support/[slug]`

Blog and support are reusable template families, not page-by-page rebuilds.

### Live Page Audit

Before assembling the static replica, audit the current public pages linked from the primary Halo nav and dropdowns:

- `/`
- `/shop-wireless-dog-fence/`
- `/main-shop/accessories/`
- `/beacons/`
- `/reviews/`
- `/deals-discounts/`
- `/dog-fence-features/`
- `/dog-fence-features/halo-app/`
- `/dog-fence-features/virtual-gps/`
- `/dog-fence-features/gps-location-tracking/`
- `/dog-fence-features/cesar-millan-training/`
- `/dog-fence-features/feedback-system/`
- `/my-account/` where public markup is available; authenticated-only states come from `packperks`.

For each page, create a section map:

- Page URL and nav label.
- Ordered section list.
- Section type: hero, product grid, configurator, comparison, proof/testimonial, feature overview, how-it-works, app showcase, FAQ, CTA, footer, account shell, etc.
- Visible heading/subheading/copy summary.
- Source selector or nearby HTML marker when identifiable.
- Candidate design-system component that should reproduce it.
- Keep/adapt/merge/gap/archive recommendation.
- Notes on what should improve in the refreshed UI.

### Web Asset Database

Create a local data file during Phase 1, for example `static-demo/data/site-assets.json`, that records hosted assets already used by Halo pages. This is a reference database, not a download step.

Each asset record should include:

- `pageUrl`
- `sectionId`
- `sectionType`
- `assetUrl`
- `assetType`: image, video, svg, icon, poster, background, tracking pixel
- `alt` or nearby accessible label when available
- `usage`: hero, product image, nav card, icon, testimonial image, comparison image, app screenshot, background media, etc.
- `sourceElement`: `img`, `source`, `video`, CSS background, inline SVG, or script-provided media
- `keepForReplica`: boolean recommendation
- `notes`

Resolve relative URLs to absolute `https://www.halocollar.com/...` URLs so the static replica can consume them directly.

### Component Library View

Expose `/design-system` with:

- Component gallery grouped by family.
- Variant examples.
- Source repo and source path.
- Status: `canonical`, `extracted`, `needs-modernization`, or `gap`.
- Usage guidance: when to use, when to avoid, required content fields.
- Page assembly examples showing how components combine into real pages.

## Component Scrape Scope

The scrape must include all visible page sections, stateful commerce elements, and global chrome from the cloned repos.

### Ecomlanders Exported Components

Treat these as the initial modern canonical component set:

- `HaloPromoBanner`
- `HaloMainNav`
- `HaloHeroSplitVideo`
- `HaloBlurCarousel`
- `HaloFeaturePillsShowcase`
- `HaloPastGenBanner`
- `HaloVideoSpotlight`
- `HaloHowItWorksGrid`
- `HaloFeatureFlipGrid`
- `HaloAppFeatureCarousel`
- `HaloPersonaGrid`
- `HaloBeforeBuyTriptych`
- `HaloTabbedFAQ`
- `HaloPricingProductCard`
- `HaloStickyAnchorNav`
- `HaloProductGallery`
- `HaloProductConfigBuyStack`
- `HaloBeaconsModal`
- `HaloMembershipPlansModal`
- `HaloSiteFooter`

### Ecomlanders Configurator / Shop Components

The 2026 landing page demos include a full PDP/configurator page. This must be treated as a first-class source, not collapsed into a single PDP component.

Extract or recreate these as reusable commerce components:

- Product gallery with color-synced hero image.
- Product config shell.
- Product title and trust badge.
- Color swatch selector and selected-color label.
- Add-on card pattern from `pages/lander-2026/shop.html` and `new-halo/shop.html`.
- Add-on expanded details state.
- Add-on add/remove state.
- Membership box with collapsed and expanded states.
- Membership learn-more trigger.
- Price display with current/original/savings states.
- Checkout/add-to-cart CTA states.
- What-is-included modal.
- What-is-in-the-box modal.
- Beacon feature cards.
- Beacon comparison table.
- Mini-cart drawer.
- Cart overlay.
- Cart item row with image, variant, delivery copy, quantity controls, and delete action.
- Cart membership collapsed row.
- Cart membership detail drawer/inline expansion.
- Promo code collapsed and expanded states.
- Promo code success/error states.
- Cart subtotal, discount, tax, and total rows.
- Cart empty state.
- Membership plans modal.
- WooCommerce Store API cart behavior reference from V2/V3 `shop.js`.
- Local configurator state reference from `lander-2026` and `new-halo` `shop.js`.

Design decision: use the newest V3 shop/PDP as the primary behavior/style reference, but preserve the add-on component patterns from `lander-2026`/`new-halo` because they are present in those configurator demos and are useful for accessories and bundle flows.

### Pack Perks / Account Components

Extract these from `packperks`:

- Account shell and dashboard layout.
- Account summary cards.
- Pack Membership account module.
- Billing interval module.
- Pack Perks account banner.
- Pack Perks marketing hero and section family.
- Featured benefits section.
- Partner offer grid.
- Tier benefit matrix.
- Logged-in Pack Perks hero.
- Filter pills.
- Offer card.
- Offer detail / redemption modal.
- Cancellation save flow.
- Membership selection page components.

### Halo Plan Selector Components

Extract or recreate these from `halo-plan-selector`:

- Billing cadence selector: monthly, annual, two-year.
- Bronze/Silver/Gold plan selector.
- Tier comparison rows with included/excluded states.
- Multi-collar quantity controls.
- Halo Care toggle and pricing.
- Halo Care benefit/discount module.
- Order summary rail.
- Continue-to-payment CTA.
- Mobile sticky summary/CTA pattern.

## Page Coverage Map

Covered by existing modern source:

- Homepage / campaign lander: `ecomlanders` V2/V3 and `new-halo`.
- PDP/shop: `ecomlanders` V3 shop plus configurator pages.
- Cart drawer: `ecomlanders` V2/V3 shop.
- Membership modal: `ecomlanders` and `halo-plan-selector`.
- Nav/footer: `ecomlanders` exported components and Pack Perks nav reference.
- Pack Perks and account pages: `packperks`.
- Plan selector: `halo-plan-selector`.

Needs assembly and modernization:

- Accessories category.
- Beacon category/detail.
- How-it-works overview.
- Feature deep dives.
- Reviews page.
- Deals page.
- Main shop category.
- Account landing that combines current account and Pack Perks modules.

Template families:

- Blog index/article.
- Support index/article.
- Breed guide index/detail.
- Comparison/SEO pages.
- Legal/simple content pages.

## Design System Principles

- Prefer the newest `ecomlanders` visual language as the baseline: restrained black/white/neutral palette with Halo yellow as the primary accent.
- Normalize CTA states across marketing, commerce, account, and modal contexts.
- Keep navigation/footer universal, but allow transparent-over-hero and solid-sticky variants.
- Define content schemas for sections so agents can assemble pages from structured inputs, not copied HTML.
- Preserve provenance: every component should say whether it came from `ecomlanders`, `packperks`, `halo-plan-selector`, `new-halo`, or was created as a gap fill.
- Use raw Tock exports and static repo HTML as source material first, then standardize into canonical design-system components through shared tokens, naming, variants, responsive behavior, and state definitions.
- Evaluate every scraped component against the live Halo site map: keep it, adapt it, merge it with another pattern, or mark it as a gap-fill candidate.
- Make assembled pages responsive and functional, not static screenshots.
- Avoid copying older UI wholesale when fresher source exists; older sources fill interaction/content gaps.

## Architecture

### Phase 1 Static Prototype

Recommended structure:

```text
static-demo/
  index.html
  pages/
    home.html
    shop-wireless-dog-fence.html
    accessories.html
    beacons.html
    how-it-works.html
    feature-detail.html
    plans.html
    reviews.html
    deals.html
    account.html
    pack-perks.html
    blog-template.html
    support-template.html
  design-system/
    index.html
  assets/
  css/
    tokens.css
    components.css
    pages.css
  js/
    components.js
    commerce.js
    catalog.js
```

This static prototype should reuse and adapt source HTML/CSS quickly, while still organizing components into clear sections and documenting source provenance.

The static pass should not try to make every source component final. Its job is to expose the full inventory and let us decide what is needed to mimic the live site with improved UI. Each component in the catalog should carry a review status:

- `keep`: strong modern pattern, likely canonical.
- `adapt`: useful pattern, needs token/state/responsive standardization.
- `merge`: overlaps with another component and should become one flexible pattern.
- `gap`: missing or insufficient for live-site coverage.
- `archive`: useful reference, but not part of the final library.

### Phase 2 Next.js App

Recommended stack:

- Next.js App Router.
- TypeScript.
- Component families under `src/components`.
- Route content/config under `src/content` or `src/data`.
- Design-system registry under `src/design-system`.
- Shared tokens in CSS variables and TypeScript metadata.
- Client components only where interactivity requires them: nav menus, modals, swatches, cart drawer, accordions, carousel controls, plan selectors.

Suggested top-level structure:

```text
src/
  app/
    (site)/
    design-system/
  components/
    global/
    marketing/
    commerce/
    account/
    templates/
    ui/
  content/
    pages/
    products/
    offers/
    faqs/
  design-system/
    registry.ts
  lib/
    pricing.ts
    cart.ts
    nav.ts
```

## Data Flow

- Marketing pages consume structured page configs: hero, sections, proof, FAQ, CTA.
- Product pages consume product configs: gallery, colorways, price, add-ons, membership, cart behavior.
- Account/perks pages consume mock account data and offer data.
- Blog/support templates consume simple article/category data.
- Component catalog consumes the same component registry used by page assembly.

For the demo, use local mock data. Do not integrate real WooCommerce calls yet. Preserve WooCommerce Store API behavior as documented reference for later integration. Content and component choices should be driven by live-site coverage first, then improved UI quality.

## Testing And Verification

Phase 1 verification should include:

- Run a local static server.
- Desktop and mobile route smoke tests with Playwright or browser automation.
- Visual checks for homepage, PDP/configurator, accessories, how-it-works, account/perks, and `/design-system`.
- Interactive checks for nav, swatches, add-ons, cart drawer, modals, accordions, plan selector, and promo code state.

Phase 2 verification should add:

- `npm run lint`
- `npm run build`
- Typed component registry checks.

## Open Decisions

- Whether Pack Perks should live under `/pack-perks/` or inside `/my-account/pack-perks/` in the assembled demo, or both.
- Whether the first demo should include checkout as a mocked checkout page or only cart drawer plus CTA.
- During Phase 2, how much of each Phase 1/Tock-derived component should be carried forward directly versus rewritten after the keep/adapt/merge/gap review.

## Recommendation

Start with the static validation prototype. Use `ecomlanders/pages/Lander-v3-2026/index.html` as the homepage source of truth, scrape the component set across repos, and assemble the site demo plus component catalog as plain local HTML/CSS/JS. Once the direction is approved visually and structurally, convert the validated component model into the Next.js app and registry.
