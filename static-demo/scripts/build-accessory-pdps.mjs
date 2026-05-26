import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const manifest = JSON.parse(fs.readFileSync(path.join(root, "data", "accessory-products.json"), "utf8"));
const products = manifest.products;
const byId = new Map(products.map((product) => [product.id, product]));

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
  return [first, "90-day satisfaction guarantee", "Halo Support available"]
    .map((item) => `<span>${escapeHtml(item)}</span>`)
    .join("\n              ");
}

function renderPage(product) {
  const isComingSoon = product.availability === "coming-soon";
  const related = product.relatedProductIds.map(relatedCard).filter(Boolean).join("");
  const statusNotes = product.statusNotes.length
    ? `<div class="accessory-status-note" role="note"><strong>Source note</strong><ul>${listItems(product.statusNotes)}</ul></div>`
    : "";

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

        <aside class="accessory-buy-stack" aria-labelledby="product-title">
          <p class="eyebrow">${escapeHtml(product.category)}</p>
          <h1 id="product-title">${escapeHtml(product.name)}</h1>
          <p class="accessory-buy-stack__summary">${escapeHtml(product.shortDescription)}</p>
          <div class="accessory-buy-stack__price">${escapeHtml(product.price)}</div>
          <div class="accessory-member-note">Gold Pack Members Get 50% off.</div>
          <div class="accessory-compatibility-note">
            <strong>Works with</strong>
            <span>${escapeHtml(product.compatibility)}</span>
          </div>
          ${statusNotes}
          <div class="accessory-quantity" data-quantity-control>
            <span id="quantity-label">Quantity</span>
            <div class="accessory-quantity__controls" role="group" aria-labelledby="quantity-label">
              <button type="button" data-qty-dec aria-label="Decrease quantity"${isComingSoon ? " disabled" : ""}>-</button>
              <input type="number" inputmode="numeric" min="1" max="99" value="1" data-qty-input aria-label="Quantity"${isComingSoon ? " disabled" : ""}>
              <button type="button" data-qty-inc aria-label="Increase quantity"${isComingSoon ? " disabled" : ""}>+</button>
            </div>
          </div>
          <button class="button button--yellow accessory-add-cart" type="button" data-add-to-cart data-product-name="${escapeHtml(product.name)}"${isComingSoon ? ' disabled aria-disabled="true"' : ""}>${isComingSoon ? "Coming soon" : "Add to cart"}</button>
          <p class="accessory-cart-status" data-cart-status aria-live="polite" hidden></p>
          <div class="accessory-confidence-row" aria-label="Shipping, support, and returns">
              ${confidenceRows(product)}
          </div>
        </aside>
      </div>
    </section>

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

    <section class="accessory-support" aria-labelledby="support-heading">
      <div class="container accessory-support__grid">
        <div>
          <p class="eyebrow">Support</p>
          <h2 id="support-heading">Need help choosing?</h2>
          <p>Halo Support can help confirm compatibility before checkout.</p>
        </div>
        <div class="accessory-faq">
          <details>
            <summary>How do I confirm compatibility?</summary>
            <p>Start with the compatibility note above, then contact Halo Support if your collar model or accessory choice is unclear.</p>
          </details>
          <details>
            <summary>Can Gold Pack members save on accessories?</summary>
            <p>The Accessories page states that Gold Pack Members Get 50% off.</p>
          </details>
          <a class="button button--yellow" href="https://dogpark.halocollar.com/">Speak to Halo Support</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer"></footer>

  <script src="../js/components.js?v=shared-chrome-20260521"></script>
  <script src="../js/accessory-pdp.js?v=carousel-20260526"></script>
</body>
</html>
`;
}

for (const product of products) {
  fs.writeFileSync(path.join(root, "pages", product.route), renderPage(product));
  console.log(`Wrote pages/${product.route}`);
}
