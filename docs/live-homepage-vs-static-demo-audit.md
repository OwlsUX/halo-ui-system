# Live Halo Homepage vs Static Demo Audit

Date: 2026-05-20

Source pages:
- Live homepage: https://www.halocollar.com/
- Static demo: http://127.0.0.1:4173/pages/home.html

## 2026-05-21 Status Update

This audit described the earlier loose shell. It has since been replaced in `static-demo/pages/home.html` with the V3 ecomlanders homepage source from `repos/ecomlanders/pages/Lander-v3-2026`, vendored under `static-demo/vendor/ecomlanders-v3/`.

Verified current local homepage baseline:

- Loads V3 `styles.css` from `/vendor/ecomlanders-v3/styles.css`.
- Uses the real Halo logo asset from the V3 vendor copy.
- Uses fixed transparent V3 hero nav over media.
- Uses hero copy `Your backyard, now everywhere®`.
- Routes `Shop Now` links to local `shop-wireless-dog-fence.html`.
- No old static shell selectors remain for `.site-nav`, `.brand-mark`, or `.hero__title`.

The comparison below is retained as a record of why the earlier shell was rejected and should not be used as a baseline.

## Summary

The current static demo is a loose Halo-inspired shell, not a component-level reconstruction. It uses some hosted Halo assets and some repo-derived section labels, but it does not copy the live page's nav structure, typography scale, section composition, card treatments, CTA system, or hero copy closely enough to serve as an agentic design system source.

The biggest issue is that the static demo invented a new visual system. The live homepage uses smaller, denser Inter-based typography with 500-600 weights, precise negative tracking, white/black/yellow CTA rules, and highly specific homepage modules. The demo uses oversized poster typography, a synthetic `H` logo mark, generic cards, simplified grids, and generic section copy.

## Browser-Measured Differences

### Global Type

Live homepage:
- Body font: `Inter, sans-serif`
- Body size: `14px`
- Body line-height: `20px`
- Body color: `rgb(51, 51, 51)`

Static demo:
- Body font: `Inter, ui-sans-serif, system-ui, ...`
- Body size: `16px`
- Body line-height: browser normal
- Body color: `rgb(23, 23, 23)`

Correction:
- Normalize marketing body text to live scale: `14px / 20px`.
- Keep Inter as the primary observed live homepage font.
- Use account/plan selector typography separately where it is truly from those flows.

### Hero

Live homepage:
- H1 copy: `Your backyard, now everywhere`
- H1 size at current browser width: `42px`
- H1 weight: `500`
- H1 line-height: `42px`
- H1 letter-spacing: `-1px`
- Hero height: `844px`
- Hero padding: `345px 40px 21px`
- Hero media includes Realtree lockup, play icon, HC4/HC5 video assets.

Static demo:
- H1 copy: `Freedom without fences`
- H1 size at current browser width: `117.84px`
- H1 weight: `700`
- H1 line-height: `101.342px`
- H1 letter-spacing: `normal`
- Hero height: `801px`
- Hero media is a single background image.

Correction:
- Use live hero copy, sizing, text rhythm, and media composition for the live-replica page.
- If we keep the ecomlanders V3 version, label it as a future/fresh variant, not the live homepage replica.

### Navigation

Live homepage:
- Uses the Halo logo image, not a synthetic text/letter mark.
- Nav height: `70px`
- Desktop nav links are around `16px`, `500`, muted gray.
- CTA: `Explore Halo`, yellow `#FFD700`, `16px`, `600`, `12px 24px`.
- Includes structured Shop Halo dropdown/product cards.

Static demo:
- Uses synthetic `H` circle mark.
- Nav height: `74px`.
- Links are `16px`, `750`, black, pill active state.
- CTA text is `Shop Now`, yellow `#ffd200`, `800`, `0 18px`.
- No real dropdown/product-card nav model.

Correction:
- Replace synthetic brand mark with hosted Halo logo.
- Build actual nav states: base, dropdown, scrolled, mobile drawer.
- Copy live nav labels and CTA behavior first; map the ecomlanders nav as an alternate modernized variant later.

### Section Structure

Live homepage early order:
1. `Your backyard, now everywhere` hero
2. `The ultimate smart collar`
3. Feature cards: `Create escape-proof fences anywhere`, `Precision+ GPS technology`, `Safety that never sleeps`, `Training & expert support`
4. `Built tough for all your adventures`
5. `Precision+` section
6. `Getting started with Halo is easy`
7. `Happy dogs, happy owners`
8. `Smart safety in the Halo app`

Static demo early order:
1. `Freedom without fences` hero
2. Stat strip
3. Generic `The ultimate smart collar` cards
4. `Meet Halo Collar 5`
5. Past-generation card + video placeholder
6. `How Halo works`
7. Generic feature cards
8. `Smart safety in the Halo app`

Correction:
- Rebuild the homepage demo from the live section order and only then add modernized alternatives.
- Stop using generic placeholders for live sections that already exist.

### Component Fidelity

Live homepage components are specific:
- Product nav cards with HC5/HC4 pricing and imagery.
- Feature icon cards with exact headline/subhead rhythm.
- Color/product showcase for `Built tough for all your adventures`.
- Precision+ dark section.
- Getting-started video CTA.
- Testimonials section.
- App safety carousel/media grid.

Static demo components are generic:
- Basic cards.
- Basic media cards.
- Synthetic stat strip.
- Timeline module not present in this live homepage position.
- Generic CTA/price card.

Correction:
- Component inventory should classify these as `copied-live`, `repo-modernized`, `template-gap`, or `generic-shell`.
- Anything in the replica page that is `generic-shell` should be replaced or moved to the component-only playground.

## Decision Needed

We should split the work into two parallel surfaces:

1. **Live Replica**
   A high-fidelity, browser-measured reconstruction of halocollar.com as it exists now. This becomes the baseline for sitemap, assets, and component coverage.

2. **Modernized Design System**
   A cleaner component library that uses ecomlanders V3, Pack Perks, and plan-selector patterns to modernize the baseline. This should not pretend to be the live page until we intentionally apply it.

## Immediate Fix List

1. Add a style guide page with measured live tokens:
   - typography
   - color
   - CTA states
   - nav states
   - section heading rhythm
   - cards
   - product modules

2. Rename current homepage demo to a `modernized-draft` or clearly mark it as non-replica.

3. Create a new live-homepage replica page:
   - use live copy
   - use live nav/logo
   - use live section order
   - use hosted asset URLs from `site-assets.json`
   - use measured typography and CTA values

4. Update component inventory review statuses:
   - `copied-live`
   - `repo-source`
   - `modernized-adapt`
   - `template-gap`
   - `generic-shell`
