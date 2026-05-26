import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const manifest = JSON.parse(fs.readFileSync(path.join(root, "data", "accessory-products.json"), "utf8"));
const products = manifest.products;
const byId = new Map(products.map((product) => [product.id, product]));

const ICONS = {
  network: "https://www.halocollar.com/wp-content/uploads/2024/09/icon-network.png",
  map: "https://www.halocollar.com/wp-content/uploads/2024/09/icon-map.png",
  battery: "https://www.halocollar.com/wp-content/uploads/2024/09/icon-full-battery.png",
  dog: "https://www.halocollar.com/wp-content/uploads/2024/09/icon-dog-profile.png",
  phone: "https://www.halocollar.com/wp-content/uploads/2024/09/icon-iphone.png",
  protect: "https://www.halocollar.com/wp-content/uploads/2024/09/icon-protect.png"
};

// Per-product features + savings copy that drives the new right-rail.
// Keyed by product id (mirrors the bulk-update Python script in /tmp).
const PRODUCT_CFG = {
  "zone-beacon": {
    goldPrice: "$19.99",
    reviewCount: "1,512 reviews",
    features: [["protect", "Mount anywhere"], ["battery", "15-month battery"], ["network", "328 ft range"], ["dog", "Replaceable battery"]]
  },
  "remote-beacon": {
    goldPrice: "$19.99",
    reviewCount: "1,200 reviews",
    features: [["phone", "Keychain-ready"], ["battery", "9-month battery"], ["network", "164 ft range"], ["protect", "Waterproof"]]
  },
  "pro-case": {
    goldPrice: "$19.99",
    reviewCount: "640 reviews",
    features: [["protect", "Water-resistant"], ["dog", "Drop tested"], ["phone", "Easy snap-on"], ["battery", "Hand washable"]]
  },
  "charging-stand": {
    goldPrice: "$29.99",
    reviewCount: "418 reviews",
    features: [["battery", "Magnetic snap"], ["phone", "Travel-friendly"], ["dog", "Halo Collar 4 / 5"], ["network", "Quick charge"]]
  },
  "charging-kit-halo-4-5": {
    goldPrice: "$17.49",
    reviewCount: "315 reviews",
    features: [["phone", "USB-C to USB-C"], ["battery", "Charging adaptor"], ["dog", "Halo Collar 4 / 5"], ["network", "Quick charge"]]
  },
  "charging-kit-halo-1-2-3": {
    goldPrice: "$17.49",
    reviewCount: "260 reviews",
    features: [["phone", "USB-C cable"], ["battery", "Magnetic adaptor"], ["dog", "Halo Collar 1 / 2 / 2+ / 3"], ["network", "Quick charge"]]
  },
  "collar-strap-halo-4-5": {
    goldPrice: "$14.99",
    reviewCount: "510 reviews",
    features: [["dog", "Tailored fit"], ["protect", "Rugged build"], ["battery", "Multiple sizes"], ["network", "Halo Collar 4 / 5"]]
  },
  "collar-strap-halo-1-2-3": {
    goldPrice: "$14.99",
    reviewCount: "470 reviews",
    features: [["dog", "Tailored fit"], ["protect", "Rugged & flexible"], ["battery", "All environments"], ["network", "Halo Collar 1 / 2 / 3"]]
  },
  "contact-tip-kit": {
    goldPrice: "$4.99",
    reviewCount: "210 reviews",
    features: [["dog", "3 contact sizes"], ["protect", "Tool-free swap"], ["battery", "All Halo collars"], ["network", "Tailored fit"]]
  },
  "halo-collar-remote": {
    goldPrice: "Pack Perks pricing",
    reviewCount: "Pre-order now",
    features: [["phone", "Pocket-ready"], ["network", "Pairs with collar"], ["dog", "Trainer-friendly"], ["protect", "Coming Nov 26"]]
  },
  "halo-t-shirt": {
    goldPrice: "$14.99",
    reviewCount: "92 reviews",
    features: [["dog", "Premium cotton"], ["protect", "Next Level Apparel"], ["battery", "Soft feel"], ["network", "Everyday wear"]]
  },
  "lawn-signs": {
    goldPrice: "$17.49",
    reviewCount: "188 reviews",
    features: [["dog", "Pack of 2"], ["protect", "Weatherproof"], ["battery", "Bold visibility"], ["network", "Quick install"]]
  }
};

const TRUSTPILOT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 96" width="110" height="22" aria-hidden="true"><style>.tp0{fill:#00B67A}.tp1{fill:#DCDCE6}.tp2{fill:#FFF}</style><rect class="tp0" width="96" height="96"></rect><rect x="104" class="tp0" width="96" height="96"></rect><rect x="208" class="tp0" width="96" height="96"></rect><rect x="312" class="tp0" width="96" height="96"></rect><g transform="translate(416,0)"><rect x="48" class="tp1" width="48" height="96"></rect><rect class="tp0" width="48" height="96"></rect></g><path class="tp2" d="M48,64.7L62.6,61l6.1,18.8L48,64.7z M81.6,40.4H55.9L48,16.2l-7.9,24.2H14.4l20.8,15l-7.9,24.2l20.8-15l12.8-9.2L81.6,40.4z"></path><path class="tp2" d="M152,64.7l14.6-3.7l6.1,18.8L152,64.7z M185.6,40.4h-25.7L152,16.2l-7.9,24.2h-25.7l20.8,15l-7.9,24.2l20.8-15l12.8-9.2L185.6,40.4z"></path><path class="tp2" d="M256,64.7l14.6-3.7l6.1,18.8L256,64.7z M289.6,40.4h-25.7L256,16.2l-7.9,24.2h-25.7l20.8,15l-7.9,24.2l20.8-15l12.8-9.2L289.6,40.4z"></path><path class="tp2" d="M360,64.7l14.6-3.7l6.1,18.8L360,64.7z M393.6,40.4h-25.7L360,16.2l-7.9,24.2h-25.7l20.8,15l-7.9,24.2l20.8-15l12.8-9.2L393.6,40.4z"></path><path class="tp2" d="M464,64.7l14.6-3.7l6.1,18.8L464,64.7z M497.6,40.4h-25.7L464,16.2l-7.9,24.2h-25.7l20.8,15l-7.9,24.2l20.8-15l12.8-9.2L497.6,40.4z"></path></svg>`;
const CHEVRON_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 9l6 6 6-6"></path></svg>`;
const SHIELD_SVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pageAsset(assetPath) {
  return `../${assetPath}`;
}

function listItems(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n                ");
}

function slug(text) {
  return String(text).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function galleryMarkup(product) {
  const images = product.galleryImages || [];
  if (!images.length) {
    const label = `${product.name} image pending`;
    return `
          <section class="accessory-pdp-gallery" data-accessory-gallery aria-label="${escapeHtml(product.name)} image gallery">
            <div class="accessory-pdp-gallery__featured">
              <div class="accessory-pdp-gallery__placeholder" data-gallery-featured data-gallery-empty role="img" aria-label="${escapeHtml(label)}">Image pending</div>
            </div>
            <div class="accessory-thumb-strip" aria-label="${escapeHtml(product.name)} thumbnails">
              <button class="accessory-thumb is-selected" type="button" data-gallery-thumb data-gallery-label="Image pending" aria-current="true" aria-pressed="true">
                <span>Image pending</span>
              </button>
            </div>
          </section>`;
  }

  const [featured] = images;
  const thumbs = images.map((image, index) => `
              <button class="accessory-thumb${index === 0 ? " is-selected" : ""}" type="button" data-gallery-thumb data-gallery-src="${pageAsset(image.src)}" data-gallery-alt="${escapeHtml(image.alt)}" aria-label="Show ${escapeHtml(image.alt)}"${index === 0 ? ' aria-current="true" aria-pressed="true"' : ' aria-pressed="false"'}>
                <img src="${pageAsset(image.src)}" alt="" loading="lazy">
              </button>`).join("");

  return `
          <section class="accessory-pdp-gallery" data-accessory-gallery aria-label="${escapeHtml(product.name)} image gallery">
            <div class="accessory-pdp-gallery__featured">
              <img src="${pageAsset(featured.src)}" alt="${escapeHtml(featured.alt)}" data-gallery-featured>
            </div>
            <div class="accessory-thumb-strip" aria-label="${escapeHtml(product.name)} thumbnails">
${thumbs}
            </div>
          </section>`;
}

function featuredImage(product) {
  const image = product.galleryImages?.[0];
  return image
    ? { src: pageAsset(image.src), alt: image.alt }
    : { src: "", alt: product.name };
}

function buildFeaturesGrid(features) {
  return features
    .map(
      ([icon, label]) => `              <li>
                <img src="${ICONS[icon]}" alt="" width="20" height="20">
                <span>${escapeHtml(label)}</span>
              </li>`
    )
    .join("\n");
}

function relatedCard(id) {
  const product = byId.get(id);
  if (!product) return "";
  const image = product.galleryImages?.[0];
  const media = image
    ? `<img src="${pageAsset(image.src)}" alt="${escapeHtml(image.alt)}" loading="lazy">`
    : `<span class="accessory-related-card__placeholder">Image pending</span>`;
  return `
            <article class="accessory-related-card">
              <a class="accessory-related-card__media" href="${product.route}">
                ${media}
              </a>
              <div class="accessory-related-card__body">
                <span class="badge badge--yellow">${escapeHtml(product.badge)}</span>
                <h3>${escapeHtml(product.name)}</h3>
                <p>${escapeHtml(product.shortDescription)}</p>
                <div class="accessory-related-card__footer">
                  <span>${escapeHtml(product.price)}</span>
                  <a href="${product.route}">View product</a>
                </div>
              </div>
            </article>`;
}

function confidenceRows(product) {
  const first = product.availability === "coming-soon" ? "Availability listed as 11/26" : "Delivery in 2 - 4 business days";
  return [first, "90-day guarantee", "Halo Support included"]
    .map((item) => `<span>${escapeHtml(item)}</span>`)
    .join("\n              ");
}

function buildBuyStack(product) {
  const cfg = PRODUCT_CFG[product.id] || { goldPrice: "Save with Pack Perks", reviewCount: "Trusted reviews", features: [["protect", "Halo accessory"], ["dog", "Designed for dogs"], ["battery", "Built to last"], ["network", "Pack Perks ready"]] };
  const isComingSoon = product.availability === "coming-soon";
  const featuresGrid = buildFeaturesGrid(cfg.features);
  const statusNotes = product.statusNotes && product.statusNotes.length
    ? `<div class="accessory-status-note" role="note"><strong>Source note</strong><ul>${listItems(product.statusNotes)}</ul></div>`
    : "";

  const priceDisplay = isComingSoon
    ? `<span class="accessory-price-display__current">${escapeHtml(product.price)}</span>`
    : `<span class="accessory-price-display__current">${escapeHtml(product.price)}</span>
              <span class="accessory-discount-pill">Gold 50% off</span>`;

  const affirmNote = isComingSoon
    ? ""
    : `          <p class="accessory-affirm-note">or 4 interest-free payments with <strong>Affirm</strong></p>\n`;

  const savingsBanner = isComingSoon
    ? ""
    : `          <div class="accessory-savings-banner">
            <p>Gold Pack members pay just <strong>${escapeHtml(cfg.goldPrice)}</strong> — Silver Pack saves 25%</p>
          </div>\n`;

  const ctaLabel = isComingSoon ? "Notify me when available" : "Add to cart";

  return `        <aside class="accessory-buy-stack" aria-labelledby="product-title">
          <div class="accessory-trust-badge" aria-label="Trustpilot reviews">
            ${TRUSTPILOT_SVG}
            <span class="accessory-trust-badge__label">Trustpilot</span>
            <span class="accessory-trust-badge__count">${escapeHtml(cfg.reviewCount)}</span>
          </div>

          <p class="eyebrow">${escapeHtml(product.category)}</p>
          <h1 id="product-title">${escapeHtml(product.name)}</h1>
          <p class="accessory-buy-stack__summary">${escapeHtml(product.shortDescription)}</p>

          <ul class="accessory-features-grid">
${featuresGrid}
          </ul>

          <div class="accessory-quick-links">
            <button class="accessory-quick-link" type="button" data-open-included>What's in the box</button>
            <button class="accessory-quick-link" type="button" data-open-compat>Compatibility</button>
          </div>

          <div class="accessory-perks-box" data-perks-box>
            <button class="accessory-perks-box__header" type="button" aria-expanded="false">
              <div class="accessory-perks-box__info">
                <span class="accessory-perks-box__label">Pack Perks discount</span>
                <span class="accessory-perks-box__desc">Save up to 50% on every accessory</span>
              </div>
              <div class="accessory-perks-box__right">
                <span class="accessory-perks-box__price">Up to 50% off</span>
                <span class="accessory-perks-box__toggle" aria-hidden="true">${CHEVRON_SVG}</span>
              </div>
            </button>
            <div class="accessory-perks-box__details">
              <p>Gold Pack members save 50% on every Halo accessory. Silver Pack members save 25%. Discounts apply automatically at checkout once your plan is active.</p>
              <a class="accessory-perks-box__link" href="plans.html">Compare Pack plans →</a>
            </div>
          </div>

          <div class="accessory-purchase">
            <div class="accessory-price-display">
              ${priceDisplay}
            </div>
${affirmNote}${savingsBanner}
            <div class="accessory-quantity" data-quantity-control>
              <span id="quantity-label">Quantity</span>
              <div class="accessory-quantity__controls" role="group" aria-labelledby="quantity-label">
                <button type="button" data-qty-dec aria-label="Decrease quantity"${isComingSoon ? " disabled" : ""}>-</button>
                <input type="number" inputmode="numeric" min="1" max="99" value="1" data-qty-input aria-label="Quantity"${isComingSoon ? " disabled" : ""}>
                <button type="button" data-qty-inc aria-label="Increase quantity"${isComingSoon ? " disabled" : ""}>+</button>
              </div>
            </div>

            <button class="button button--yellow accessory-add-cart" type="button" data-add-to-cart data-product-name="${escapeHtml(product.name)}"${isComingSoon ? "" : ""}>${ctaLabel}</button>
            <p class="accessory-cart-status" data-cart-status aria-live="polite" hidden></p>

            <p class="accessory-guarantee-note">${SHIELD_SVG} 90-day satisfaction guarantee</p>
          </div>

          <div class="accessory-compatibility-note">
            <strong>Works with</strong>
            <span>${escapeHtml(product.compatibility)}</span>
          </div>
          ${statusNotes}
          <div class="accessory-confidence-row" aria-label="Shipping, support, and returns">
              ${confidenceRows(product)}
          </div>
        </aside>`;
}

function buildMockupSections(product) {
  const headingSlug = slug(product.name);
  const cameraSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6" width="18" height="14" rx="2"></rect><circle cx="12" cy="13" r="4"></circle><path d="M8 6l2-3h4l2 3"></path></svg>`;
  const sceneSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="14" rx="2"></rect><path d="M3 16l4-4 4 4 3-3 4 4"></path><circle cx="9" cy="9" r="1.5"></circle><path d="M5 20h14"></path></svg>`;

  return `
    <section class="accessory-feature-spotlight" aria-labelledby="spotlight-heading-${headingSlug}">
      <div class="container accessory-feature-spotlight__grid">
        <div class="accessory-feature-spotlight__media" role="presentation">
          <div class="accessory-feature-spotlight__placeholder">
            ${cameraSvg}
            <strong>Feature photo placeholder</strong>
            <span>Designed photography drops in here — product, hands, environment, or detail shot.</span>
          </div>
        </div>
        <div class="accessory-feature-spotlight__copy">
          <span class="accessory-mockup-flag">Design mockup</span>
          <p class="eyebrow">Made for real life</p>
          <h2 id="spotlight-heading-${headingSlug}">Big idea headline for ${escapeHtml(product.name)} lives right here</h2>
          <p>${escapeHtml(product.shortDescription)} Use this space to anchor the story with a richly-art-directed photo on the left and a focused benefit narrative on the right.</p>
          <ul class="accessory-feature-spotlight__list">
            <li><strong>Day-one ready.</strong> Pairs with your Halo Collar in seconds — no setup walkthroughs required.</li>
            <li><strong>Field-tested durability.</strong> Built to handle rain, mud, beach days, and backyard zoomies.</li>
            <li><strong>Backed by Halo.</strong> Every accessory ships with our 90-day satisfaction guarantee.</li>
          </ul>
          <div class="accessory-feature-spotlight__actions">
            <a class="button button--yellow" href="how-it-works.html">See it in action</a>
            <a class="button" href="reviews.html">Read pack stories</a>
          </div>
        </div>
      </div>
    </section>

    <section class="accessory-benefit-cards" aria-labelledby="benefit-heading-${headingSlug}">
      <div class="container">
        <div class="accessory-benefit-cards__header">
          <span class="accessory-mockup-flag">Design mockup</span>
          <p class="eyebrow">Why pack members love it</p>
          <h2 id="benefit-heading-${headingSlug}">Three pillars worth showcasing</h2>
          <p>This three-up grid is the perfect place to surface the most-loved benefits with an icon, headline, supporting copy, and a quick-hit stat.</p>
        </div>
        <div class="accessory-benefit-cards__grid">
          <article class="accessory-benefit-cards__card">
            <div class="accessory-benefit-cards__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <span class="accessory-benefit-cards__stat">Pack-tested</span>
            <h3>Designed for the way real dogs live</h3>
            <p>Use this card to tell the design story — what the team obsessed over, the moments it solves, and the materials it's built from.</p>
          </article>
          <article class="accessory-benefit-cards__card">
            <div class="accessory-benefit-cards__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>
            </div>
            <span class="accessory-benefit-cards__stat">Built to last</span>
            <h3>Quality you can feel from the first unbox</h3>
            <p>This block can highlight durability, lifespan, or a key performance stat — paired with a tight one-liner that builds confidence.</p>
          </article>
          <article class="accessory-benefit-cards__card">
            <div class="accessory-benefit-cards__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <span class="accessory-benefit-cards__stat">Backed by Halo</span>
            <h3>Support that stays with you for the long run</h3>
            <p>End the trio on trust — concierge support, replacements, satisfaction guarantee, and the Pack Perks program that powers it all.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="accessory-lifestyle" aria-labelledby="lifestyle-heading-${headingSlug}">
      <div class="container">
        <div class="accessory-lifestyle__panel">
          <div class="accessory-lifestyle__media" role="presentation">
            <div class="accessory-lifestyle__placeholder">
              ${sceneSvg}
              <strong>Lifestyle moment placeholder</strong>
              <span>Anchor this panel with an art-directed hero photo of the accessory in real life.</span>
            </div>
          </div>
          <div class="accessory-lifestyle__copy">
            <span class="accessory-mockup-flag">Design mockup</span>
            <p class="eyebrow">In the wild</p>
            <h2 id="lifestyle-heading-${headingSlug}">Made for the moments that matter</h2>
            <p>This dark, image-driven panel is reserved for a lifestyle moment — a hero photo on the left and a tight pitch on the right that ties the accessory back to the Halo brand promise.</p>
            <div class="accessory-lifestyle__stats">
              <div class="accessory-lifestyle__stat">
                <strong>200K+</strong>
                <span>Dogs on Halo</span>
              </div>
              <div class="accessory-lifestyle__stat">
                <strong>4.7★</strong>
                <span>Pack rating</span>
              </div>
              <div class="accessory-lifestyle__stat">
                <strong>90-day</strong>
                <span>Guarantee</span>
              </div>
            </div>
            <div class="accessory-lifestyle__actions">
              <a class="button button--yellow" href="reviews.html">Read pack stories</a>
              <a class="button button--ghost-light" href="how-it-works.html">How Halo works</a>
            </div>
          </div>
        </div>
      </div>
    </section>
`;
}

function renderPage(product) {
  const related = product.relatedProductIds.map(relatedCard).filter(Boolean).join("");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Shop ${escapeHtml(product.name)} | Halo</title>
  <meta name="description" content="${escapeHtml(product.shortDescription)}">
  <link rel="stylesheet" href="../css/tokens.css">
  <link rel="stylesheet" href="../css/components.css?v=ui-system-drawer-20260521">
  <link rel="stylesheet" href="../css/pages.css">
  <link rel="stylesheet" href="../css/accessories-page.css">
  <link rel="stylesheet" href="../css/v3-nav.css?v=footer-20260521">
</head>
<body class="accessories-page accessory-pdp-detail" data-accessory-pdp data-product-id="${escapeHtml(product.id)}">
  <a class="skip-link" href="#main-content">Skip to product details</a>

  <div class="promo-strip accessories-promo">
    <span>Introducing Precision+ &nbsp; The new standard in safety</span>
    <a href="shop-wireless-dog-fence.html">Price drop: $75 off</a>
    <a href="shop-wireless-dog-fence.html">90-day satisfaction guarantee</a>
  </div>

  <nav class="nav nav--light" aria-label="Main navigation"></nav>

  <main id="main-content" class="accessory-pdp-main">
    <nav class="accessory-breadcrumb" aria-label="Breadcrumb">
      <div class="container accessory-breadcrumb__inner">
        <a href="home.html">Home</a>
        <span aria-hidden="true">/</span>
        <a href="accessories.html">Accessories</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">${escapeHtml(product.name)}</span>
      </div>
    </nav>

    <section class="accessory-pdp-shell">
      <div class="container accessory-pdp-shell__grid">
${galleryMarkup(product)}

${buildBuyStack(product)}
      </div>
    </section>
${buildMockupSections(product)}
    <section class="accessory-pdp-details" aria-labelledby="details-heading">
      <div class="container">
        <div class="accessory-pdp-section-header">
          <p class="eyebrow">Product details</p>
          <h2 id="details-heading">Match the accessory to your setup.</h2>
        </div>
        <div class="accessory-detail-grid">
          <article>
            <h3>What it does</h3>
            <ul>
                ${listItems(product.whatItDoes)}
            </ul>
          </article>
          <article>
            <h3>What works with it</h3>
            <p>${escapeHtml(product.compatibility)}</p>
          </article>
          <article>
            <h3>What's included</h3>
            <ul>
                ${listItems(product.includedItems)}
            </ul>
          </article>
          <article>
            <h3>Compatibility or sizing</h3>
            <p>${escapeHtml(product.sizing)}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="accessory-related" aria-labelledby="related-heading">
      <div class="container">
        <div class="accessory-pdp-section-header">
          <p class="eyebrow">Related accessories</p>
          <h2 id="related-heading">Complete the setup.</h2>
        </div>
        <div class="accessory-related-grid">
${related}
        </div>
      </div>
    </section>
  </main>

  <footer class="footer"></footer>

  <script src="../js/components.js?v=shared-chrome-20260521"></script>
  <script src="../js/accessory-pdp.js?v=perks-20260526"></script>
</body>
</html>
`;
}

for (const product of products) {
  fs.writeFileSync(path.join(root, "pages", product.route), renderPage(product));
  console.log(`Wrote pages/${product.route}`);
}
