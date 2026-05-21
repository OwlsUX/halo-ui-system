# Reviews Page Audit

## Source URL and Files Inspected

- `https://www.halocollar.com/reviews/`
- `static-demo/pages/style-guide.html`
- `static-demo/design-system/style-guide.css`
- `static-demo/css/halo-theme.css`
- `static-demo/css/tokens.css`
- `static-demo/css/components.css`
- `static-demo/css/pages.css`
- `static-demo/data/live-page-audit.json`
- `static-demo/data/site-assets.json`
- `https://github.com/pbakaus/impeccable`
- `static-demo/docs/page-audits/acceptance-gate.md`

## Sections Represented

- Hero: `Happy dogs, happy owners`
- Proof strip: `4.3/5`, `1,512 reviews`, `350+ breeds`, `90-day trial`
- Review proof grid: Fast Company award, James C., Liz, New York Post, Christina, Jeremy S., Jamie + Amy, Robert B., Trustpilot-style summary, Animal Wellness, Jena, Olivia, GearJunkie, Mary
- Halo Stories media proof: Andrea, Deana, Scott, Jackie
- Video CTA: `Getting started with Halo is easy` / `Watch video`
- Product CTA: `Halo Collar 5`, `$524`, `$599`, `Save an extra $50 when you buy two`, `Shop now`
- Product benefits: `Easy-to-use mobile app`, `Fast shipping`, `90-day trial`
- FAQ: five FAQ items from the live reviews page

## Image Assets Used

- `https://d252xzqwj6utz.cloudfront.net/static/h5/fastcompany-dark.svg`
- `https://d252xzqwj6utz.cloudfront.net/static/h5/most-innovative-dark.svg`
- `https://d252xzqwj6utz.cloudfront.net/static/h5/reviews-james.webp`
- `https://d252xzqwj6utz.cloudfront.net/static/h5/reviews-stars.svg`
- `https://d252xzqwj6utz.cloudfront.net/static/h5/reviews-nypost.webp`
- `https://d252xzqwj6utz.cloudfront.net/static/h5/reviews-nypost-collar.webp`
- `https://d252xzqwj6utz.cloudfront.net/static/h5/reviews-andrea.webp`
- `https://d252xzqwj6utz.cloudfront.net/static/h5/reviews-deana.webp`
- `https://d252xzqwj6utz.cloudfront.net/static/h5/reviews-robert.webp`
- `https://d252xzqwj6utz.cloudfront.net/static/h5/reviews-stars-4-5.svg`
- `https://d252xzqwj6utz.cloudfront.net/static/h5/reviews-animalwellness.webp`
- `https://d252xzqwj6utz.cloudfront.net/static/h5/reviews-jackie.webp`
- `https://d252xzqwj6utz.cloudfront.net/static/h5/reviews-gearjunkie.png`
- `https://d252xzqwj6utz.cloudfront.net/static/h5/reviews-gearjunkie-dog.png`
- `https://d252xzqwj6utz.cloudfront.net/static/h5/reviews-scott.webp`
- `https://d252xzqwj6utz.cloudfront.net/static/h5/play-btn.svg`
- `https://d252xzqwj6utz.cloudfront.net/static/h5/get-started.webp`
- `https://d252xzqwj6utz.cloudfront.net/static/h5/get-started-m.webp`
- `https://d252xzqwj6utz.cloudfront.net/static/owls-home/halo-yellow_1.webp`
- `https://d252xzqwj6utz.cloudfront.net/static/owls-home/11.webp`
- `https://d252xzqwj6utz.cloudfront.net/static/owls-home/12.webp`
- `https://d252xzqwj6utz.cloudfront.net/static/owls-home/Vector.svg`

## Known Gaps and Static-Only Limitations

- Trustpilot score and count are static values from the live structured data and rendered page, not fetched at runtime.
- Halo Stories and the getting-started video CTA link out to YouTube instead of opening the live modal player.
- Header and footer use the static demo shell that existed on `reviews.html`; no shared navigation or footer files were edited.

## Verification

- Local reference check: `node` scan of `static-demo/pages/reviews.html` found 16 local `href`/`src` references and 0 missing files.
- Local link check: `node` scan of local `href` values found 13 local links and 0 missing targets.
- HTTP check: `http://127.0.0.1:4173/pages/reviews.html`, linked CSS, and `../js/components.js` returned 200.
- Hosted image check: all 22 CloudFront image/background URLs used by `reviews.html` and `reviews-page.css` returned 200.
- Browser check: in-app browser loaded `http://127.0.0.1:4173/pages/reviews.html`; nav, hero, proof grid, product CTA, and footer were visible at 1280px, with 0 image failures and 0 console errors. Mobile viewport check at 390px had no horizontal overflow and no detected text overflow.
