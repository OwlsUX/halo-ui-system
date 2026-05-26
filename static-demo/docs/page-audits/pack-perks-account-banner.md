# Pack Perks Account Banner Audit

## What changed
- Updated the Pack Perks account banner to use the Halo sale surface treatment instead of the dark banner surface.
- Removed the decorative background spot/ring pseudo-elements from the account banner.
- Added a dismiss button to the banner. The control removes the banner module from the current page view.
- Made banner dismissal persistent in the static demo with local storage.
- Added a mobile feature rail using horizontal scroll snap so the three featured benefits behave as a compact slider.
- Added a compact Pack Perks callout inside the Pack Membership account card so the account page still has a Pack Perks entry point after the banner is dismissed.
- Updated the Pack Perks cancellation modal to use Halo token-backed surfaces, borders, radius, shadows, and action styling.
- Reworked the cancellation modal loss list into a compact desktop grid so it fits within a 1440px by 900px viewport without internal scrolling.
- Kept the account dashboard layout intact and scoped the new CSS hooks to the Pack Perks account banner.

## Source files inspected
- `repos/packperks/account-perks.html`
- `repos/packperks/account-perks-v2.html`
- `repos/packperks/css/styles.css`
- `static-demo/pages/style-guide.html`
- `static-demo/css/halo-theme.css`
- `static-demo/css/tokens.css`
- `static-demo/vendor/packperks/css/styles.css`

## Preserved from the Pack Perks import
- Account-page banner placement between the welcome header and dashboard cards.
- Pack Perks copy and value proposition.
- CTA destination: `pack-perks-list.html`.
- Featured benefit concepts: TeleVet, food credits, and travel credits.
- Existing partner logo/image assets and imported Pack Perks account dashboard structure.
- Existing cancellation flow copy, partner-loss concepts, and modal trigger behavior.

## Desktop and mobile behavior
- Desktop uses the established account-dashboard module shape: sale surface background, compact pitch column, three aligned white benefit cards, and a top-right dismiss control.
- Tablet keeps the banner as a stacked account module while preserving the three-card benefit grid.
- Mobile reserves top space for the dismiss control, keeps the CTA full-width and tappable, and turns the benefit cards into a scroll-snap rail with no horizontal page overflow.
- Partner logos remain fixed-size inside the cards and do not stretch or clip.
- Desktop cancellation modal uses a two-column loss grid and fits within the 1440px by 900px viewport.
- Mobile cancellation modal is bounded to the viewport and scrolls internally when content exceeds the available height.

## Verification performed
- `git diff --check -- static-demo/pages/account.html static-demo/pages/account-perks.html static-demo/vendor/packperks/css/styles.css static-demo/vendor/packperks/js/account-banner.js`
- `node --check static-demo/vendor/packperks/js/account-banner.js`
- Local href/src check for `static-demo/pages/account.html` and `static-demo/pages/account-perks.html`: 80 local refs checked, 0 missing.
- Local server route checks:
  - `http://127.0.0.1:8765/pages/account.html` returned 200.
  - `http://127.0.0.1:8765/pages/account-perks.html` returned 200.
- Browser geometry checks at 1440px, 1024px, and 390px verified no horizontal overflow, no banner pseudo-element circles, visible dismiss button, and active mobile feature slider.
- Browser dismiss checks verified the X removes the banner on both account routes.
- Browser modal checks at 1440px by 900px verified the modal opens, opacity settles to 1, the shell fits the viewport, and no internal shell scroll is required on desktop.
- Browser modal checks at 390px by 900px verified the modal opens, the close button remains visible, the shell stays inside the viewport, and content scrolls internally without page overflow.
- Banner persistence check verified that after dismissing the banner, the banner remains hidden after reload and the Pack Membership callout remains available.

## Remaining concerns
- Banner dismissal uses local storage only for the static demo. Production should replace that with account-state persistence if dismissal needs to follow the signed-in customer across devices.
- The mobile feature rail is swipe/trackpad driven. Add visible pagination or arrow controls only if the demo needs stronger discoverability for non-touch desktop testing at mobile widths.
