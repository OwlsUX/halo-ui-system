/* ============================================
   SHOP / CONFIGURATOR PAGE SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initMobileGallery();
    initColorSelector();
    initAddons();
    initModal();
    initMembership();
    initMiniCart();
    updateTotalPrice();
    loadLivePricing();
    restoreCartState();
    if (IS_LOCAL_STATIC_DEMO) {
        renderLocalDemoCart();
    } else {
        fetchAndRenderCart();
    }

    // GA4: view_item on page load
    pushDataLayerEvent('view_item', {
        currency: 'USD',
        value: BASE_PRICE,
        items: [buildGA4Item('sunburst', 'Sunburst', 1)]
    });
});

/* ---------- Mobile Gallery ---------- */
function initMobileGallery() {
    if (window.innerWidth > 640) return;

    const gallery = document.querySelector('.product-gallery');
    const images = gallery.querySelectorAll('.gallery-image');
    if (!images.length) return;

    // Mark the first image as active
    images[0].classList.add('mobile-active');

    // Build thumbnail strip
    const thumbStrip = document.createElement('div');
    thumbStrip.className = 'gallery-thumbs';

    images.forEach((imgContainer, i) => {
        const img = imgContainer.querySelector('img');
        const thumb = document.createElement('button');
        thumb.className = 'gallery-thumb' + (i === 0 ? ' active' : '');
        thumb.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;

        thumb.addEventListener('click', () => {
            // Swap active main image
            images.forEach(el => el.classList.remove('mobile-active'));
            imgContainer.classList.add('mobile-active');

            // Swap active thumb
            thumbStrip.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });

        thumbStrip.appendChild(thumb);
    });

    gallery.appendChild(thumbStrip);
}

/* ---------- Mobile Navigation ---------- */
function initMobileNav() {
    const hamburger = document.getElementById('nav-hamburger');
    const sidebar = document.getElementById('mobile-nav-sidebar');
    const overlay = document.getElementById('mobile-nav-overlay');
    const closeBtn = document.getElementById('mobile-nav-close');

    if (!hamburger || !sidebar) return;

    function openNav() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('mobile-nav-open');
    }

    function closeNav() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('mobile-nav-open');
    }

    hamburger.addEventListener('click', openNav);
    closeBtn.addEventListener('click', closeNav);
    overlay.addEventListener('click', closeNav);

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeNav();
        }
    });
}

// Base prices. BASE_PRICE is overwritten by loadLivePricing() once
// halocollar.com/pricing.php returns. Hardcoded value is the fallback if the
// fetch fails. ORIGINAL_PRICE is the strikethrough "list" price — not in the
// API, used by loadLivePricing() to compute savings copy.
let BASE_PRICE = 524;
const ORIGINAL_PRICE = 599;
const HC4_LIST_PRICE = 549;
// Bundle bonus: when buying 2 collars, customer saves an extra $25 per collar
// on top of the single-collar saving. E.g. $75 single → $200 for two = (75+25)*2.
const TWO_COLLAR_BUNDLE_BONUS = 25;
// Below this HC5 price, treat as a PETDAYS-style deeper-discount sale: reveal
// the PETDAYS pill and switch the savings copy to show both 1- and 2-collar
// dollar amounts. Above this threshold, the static copy ("$200 when you buy 2")
// stays as-is.
const PETDAYS_THRESHOLD = 500;

// WooCommerce product + variation IDs
const WC_PRODUCT_ID = 1638871;
const WC_VARIATIONS = {
    sunburst: 1638874,
    midnight: 1638876,
    orchid: 1638875,
    graphite: 1638873,
    blaze: 1638872,
    realtree: 1726318
};

const IS_LOCAL_STATIC_DEMO = ['localhost', '127.0.0.1', ''].includes(window.location.hostname);
const LOCAL_DEMO_COLOR_IMAGES = {
    sunburst: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/pdp-sunburst.webp',
    midnight: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/pdp-midnight.webp',
    orchid: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/pdp-orchid.webp',
    graphite: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/pdp-graphite.webp',
    blaze: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/pdp-blaze.webp',
    realtree: 'https://d252xzqwj6utz.cloudfront.net/static/h5/pdp-realtree.webp'
};

// GA4 dataLayer helper
function pushDataLayerEvent(eventName, ecommerceData) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push({
        event: eventName,
        ecommerce: ecommerceData
    });
}

function buildGA4Item(colorKey, colorName, qty) {
    var variationId = WC_VARIATIONS[colorKey] || '';
    return {
        item_id: variationId.toString(),
        item_name: 'Halo Wireless Dog Fence and GPS Dog Collar',
        item_brand: 'Halo Collars',
        price: BASE_PRICE,
        item_category: 'Halo Collars',
        item_variant: colorName || colorKey,
        quantity: (qty || 1).toString(),
        google_business_vertical: 'retail',
        id: variationId.toString()
    };
}

// Color to image mapping
const colorImages = {
    sunburst: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/pdp-sunburst.webp',
    midnight: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/pdp-midnight.webp',
    orchid: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/pdp-orchid.webp',
    graphite: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/pdp-graphite.webp',
    blaze: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/pdp-blaze.webp',
    realtree: 'https://halo.onitdigital.com/wp-content/themes/halocollar/images/h5/h5-realtree-collar.webp'
};


/* ---------- Color Selector ---------- */
function initColorSelector() {
    const colorOptions = document.querySelectorAll('.color-option');
    const colorNameDisplay = document.getElementById('selected-color-name');
    const gallery = document.querySelector('.product-gallery');

    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const color = option.dataset.color;
            const name = option.dataset.name;

            // Update active state
            colorOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');

            // Update color name display
            colorNameDisplay.textContent = name;

            // Find the source colorway image
            const colorSlide = document.querySelector(`.gallery-image[data-color-select="${color}"]`);
            if (!colorSlide) return;

            // Remove any previously inserted swatch image
            const prev = gallery.querySelector('.gallery-image[data-swatch-inserted]');
            if (prev) prev.remove();

            // Clone the colorway image and insert as first gallery image
            const clone = colorSlide.cloneNode(true);
            clone.setAttribute('data-swatch-inserted', 'true');
            gallery.insertBefore(clone, gallery.firstElementChild);

            if (window.innerWidth <= 640) {
                // Rebuild mobile gallery: update thumbs and show first image
                const allImages = gallery.querySelectorAll('.gallery-image');
                const thumbStrip = gallery.querySelector('.gallery-thumbs');

                // Update active main image
                allImages.forEach(el => el.classList.remove('mobile-active'));
                clone.classList.add('mobile-active');

                // Rebuild thumbnail strip
                if (thumbStrip) {
                    thumbStrip.innerHTML = '';
                    allImages.forEach((imgContainer, i) => {
                        const img = imgContainer.querySelector('img');
                        if (!img) return;
                        const thumb = document.createElement('button');
                        thumb.className = 'gallery-thumb' + (i === 0 ? ' active' : '');
                        thumb.innerHTML = '<img src="' + img.src + '" alt="' + img.alt + '">';
                        thumb.addEventListener('click', () => {
                            allImages.forEach(el => el.classList.remove('mobile-active'));
                            imgContainer.classList.add('mobile-active');
                            thumbStrip.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
                            thumb.classList.add('active');
                        });
                        thumbStrip.appendChild(thumb);
                    });
                    thumbStrip.scrollTo({ left: 0 });
                }
            } else {
                // On desktop, scroll to top of gallery to show the inserted image
                gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}


/* ---------- Scroll Helper ---------- */
function scrollToExpanded(element) {
    setTimeout(() => {
        // Scroll so the purchase section (CTA) is visible
        const purchaseSection = document.querySelector('.purchase-section');
        if (purchaseSection) {
            purchaseSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, 100);
}

/* ---------- Add-ons ---------- */
function initAddons() {
    const addonCards = document.querySelectorAll('.addon-card');
    if (addonCards.length === 0) return;

    addonCards.forEach(card => {
        const expandBtn = card.querySelector('.addon-expand-btn');
        const addBtn = card.querySelector('.addon-add-btn');
        const header = card.querySelector('.addon-card-header');

        // Expand/collapse on header or expand button click
        expandBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            card.classList.toggle('expanded');
            if (card.classList.contains('expanded')) {
                scrollToExpanded(card);
            }
        });

        header.addEventListener('click', (e) => {
            if (e.target !== expandBtn && !expandBtn.contains(e.target)) {
                card.classList.toggle('expanded');
                if (card.classList.contains('expanded')) {
                    scrollToExpanded(card);
                }
            }
        });

        // Add/remove on button click
        addBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            card.classList.toggle('added');

            // Update button text
            if (card.classList.contains('added')) {
                addBtn.textContent = 'Remove';
            } else {
                addBtn.textContent = 'Add to order';
            }

            updateTotalPrice();
        });

        // Hover states for added items
        addBtn.addEventListener('mouseenter', () => {
            if (card.classList.contains('added')) {
                addBtn.textContent = 'Remove';
            }
        });

        addBtn.addEventListener('mouseleave', () => {
            if (card.classList.contains('added')) {
                addBtn.textContent = 'Remove';
            }
        });
    });
}

/* ---------- Modal ---------- */
function initModal() {
    const modal = document.getElementById('included-modal');
    const closeBtn = document.getElementById('close-included-modal');
    const openBtns = document.querySelectorAll('[data-open-modal]');

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            modal.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

/* ---------- Membership ---------- */
function initMembership() {
    const membershipBox = document.getElementById('membership-box');
    const membershipHeader = membershipBox.querySelector('.membership-header');
    const membershipToggle = membershipBox.querySelector('.membership-toggle');
    const membershipModal = document.getElementById('membership-modal');
    const closeMembershipModal = document.getElementById('close-membership-modal');
    const openMembershipModalBtn = document.querySelector('[data-open-membership-modal]');

    // Toggle expand/collapse
    membershipHeader.addEventListener('click', () => {
        membershipBox.classList.toggle('expanded');
        if (membershipBox.classList.contains('expanded')) {
            setTimeout(() => {
                membershipBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 350);
        }
    });

    // Open membership modal
    openMembershipModalBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        membershipModal.classList.add('active');
    });

    // Close membership modal
    closeMembershipModal.addEventListener('click', () => {
        membershipModal.classList.remove('active');
    });

    membershipModal.addEventListener('click', (e) => {
        if (e.target === membershipModal) {
            membershipModal.classList.remove('active');
        }
    });
}

/* ---------- Price Calculation ---------- */
function updateTotalPrice() {
    const addedCards = document.querySelectorAll('.addon-card.added');

    let total = BASE_PRICE;

    addedCards.forEach(card => {
        total += parseInt(card.dataset.price);
    });

    // Show 2 decimals unless both are zero — and keep thousand-separators
    // (e.g. $1,524 / $1,445.40 for two-collar totals).
    const rounded = Math.round(total * 100) / 100;
    const fractionDigits = rounded % 1 === 0 ? 0 : 2;
    document.getElementById('total-price').textContent = '$' + rounded.toLocaleString('en-US', {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
    });
}

/* ---------- Live pricing (mirrors mutation.js#loadLivePricing) ----------
 * Pulls current HC4/HC5 prices from halocollar.com/pricing.php and rewrites
 * any element tagged with data-price / data-savings / data-price-drop.
 * Also overwrites BASE_PRICE so the PDP configurator math reflects reality,
 * and re-runs updateTotalPrice() afterward.
 * Silent on failure — hardcoded text in markup stays as fallback. */
function formatPrice(n) {
    var rounded = Math.round(n * 100) / 100;
    return rounded % 1 === 0 ? String(rounded) : rounded.toFixed(2);
}

function loadLivePricing() {
    var LIST_PRICES = { HC5: ORIGINAL_PRICE, HC4: HC4_LIST_PRICE };
    // Relative URL — uses whichever origin the page is served from
    // (www.halocollar.com vs halocollar.com). Hardcoding the apex broke CORS
    // for users on the www subdomain; relative paths sidestep that entirely.
    fetch('/pricing.php')
        .then(function (r) { return r.json(); })
        .then(function (prices) {
            document.querySelectorAll('[data-price]').forEach(function (el) {
                var key = el.getAttribute('data-price');
                if (key && prices[key]) {
                    el.textContent = '$' + prices[key];
                }
            });

            document.querySelectorAll('[data-savings]').forEach(function (el) {
                var key = el.getAttribute('data-savings');
                var apiPrice = parseFloat(prices[key]);
                var listPrice = LIST_PRICES[key];
                if (!key || isNaN(apiPrice) || !listPrice) return;
                var saving = listPrice - apiPrice;
                if (saving <= 0) return;
                el.textContent = '$' + formatPrice(saving);
            });

            document.querySelectorAll('[data-price-drop]').forEach(function (el) {
                var key = el.getAttribute('data-price-drop');
                var apiPrice = parseFloat(prices[key]);
                var listPrice = LIST_PRICES[key];
                if (!key || isNaN(apiPrice) || !listPrice) return;
                var saving = listPrice - apiPrice;
                if (saving <= 0) return;
                el.textContent = '$' + formatPrice(saving) + ' off';
            });

            // Push the HC5 price into the configurator math, then refresh.
            var apiHC5 = parseFloat(prices.HC5);
            if (!isNaN(apiHC5) && apiHC5 > 0) {
                BASE_PRICE = apiHC5;
                if (typeof updateTotalPrice === 'function') updateTotalPrice();

                // PETDAYS-tier sale: HC5 dropped below the threshold. Reveal the
                // pill and rewrite the savings banner with both 1- and 2-collar
                // dollar amounts. Otherwise leave the default copy untouched —
                // the data-savings hook above has already updated the "$75" span.
                var singleSaving = ORIGINAL_PRICE - apiHC5;
                var twoCollarSaving = (singleSaving + TWO_COLLAR_BUNDLE_BONUS) * 2;
                var pill = document.getElementById('petdays-pill');
                var banner = document.getElementById('savings-banner-text');
                if (apiHC5 < PETDAYS_THRESHOLD && singleSaving > 0) {
                    if (pill) pill.removeAttribute('hidden');
                    if (banner) {
                        banner.textContent = 'Save $' + formatPrice(singleSaving)
                            + ' on 1 collar, and $' + formatPrice(twoCollarSaving)
                            + ' when you buy 2';
                    }
                } else {
                    if (pill) pill.setAttribute('hidden', '');
                    // Leave default banner copy alone — data-savings hook already updated it.
                }
            }
        })
        .catch(function () { /* leave hardcoded fallback */ });
}

/* ---------- Mini Cart ---------- */
// Store quantities for cart items
const cartQuantities = {
    collar: 1
};

function initMiniCart() {
    const checkoutBtn = document.getElementById('checkout-btn');
    const miniCart = document.getElementById('mini-cart');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart');
    const continueCheckoutBtn = document.getElementById('continue-checkout');
    const promoToggle = document.getElementById('promo-toggle');
    const promoSection = document.getElementById('promo-code-section');

    // Add to cart on main CTA click — adds to WC cart, then opens side cart
    checkoutBtn.addEventListener('click', () => {
        addToWooCommerceCart();
    });

    // Open cart from nav cart button
    const navCartBtn = document.querySelector('.nav-cart-btn');
    if (navCartBtn) {
        navCartBtn.addEventListener('click', () => {
            openMiniCart();
        });
    }

    // Close cart
    closeCartBtn.addEventListener('click', () => {
        closeMiniCart();
    });

    cartOverlay.addEventListener('click', () => {
        closeMiniCart();
    });

    // Continue to checkout — item is already in WC cart, just redirect
    continueCheckoutBtn.addEventListener('click', () => {
        // GA4: begin_checkout
        if (lastWcCart && lastWcCart.items && lastWcCart.items.length > 0) {
            var cartTotal = lastWcCart.items.reduce(function (sum, item) {
                return sum + (parseInt(item.prices.price) / 100 * item.quantity);
            }, 0);
            var ga4Items = lastWcCart.items.map(function (item) {
                var variant = (item.variation && item.variation.length > 0)
                    ? item.variation[0].value : '';
                return {
                    item_id: item.id.toString(),
                    item_name: item.name,
                    item_brand: 'Halo Collars',
                    price: parseInt(item.prices.price) / 100,
                    item_category: 'Halo Collars',
                    item_variant: variant,
                    quantity: item.quantity.toString(),
                    google_business_vertical: 'retail',
                    id: item.id.toString()
                };
            });
            pushDataLayerEvent('begin_checkout', {
                currency: 'USD',
                value: cartTotal,
                items: ga4Items
            });
        }
        if (IS_LOCAL_STATIC_DEMO) {
            continueCheckoutBtn.textContent = 'Checkout ready';
            return;
        }
        window.location.href = '/checkout/';
    });

    // Promo code toggle
    promoToggle.addEventListener('click', () => {
        promoSection.classList.toggle('expanded');
    });

    // Promo code apply
    const promoApplyBtn = document.getElementById('promo-apply-btn');
    const promoInput = document.getElementById('promo-input');
    if (promoApplyBtn && promoInput) {
        promoApplyBtn.addEventListener('click', () => {
            applyPromoCoupon(promoInput.value.trim());
        });
        promoInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                applyPromoCoupon(promoInput.value.trim());
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && miniCart.classList.contains('active')) {
            closeMiniCart();
        }
    });

    // Handle membership details toggle in cart
    const cartSeeDetails = document.getElementById('cart-see-details');
    const cartMembershipDetails = document.getElementById('cart-membership-details');
    const cartMembershipClose = document.getElementById('cart-membership-close');

    if (cartSeeDetails && cartMembershipDetails) {
        cartSeeDetails.addEventListener('click', () => {
            var isVisible = cartMembershipDetails.style.display !== 'none';
            cartMembershipDetails.style.display = isVisible ? 'none' : 'block';
        });
    }
    if (cartMembershipClose && cartMembershipDetails) {
        cartMembershipClose.addEventListener('click', () => {
            cartMembershipDetails.style.display = 'none';
        });
    }
}

// Last known WC cart data (populated by API responses)
var lastWcCart = null;

function buildLocalDemoCart() {
    var activeColor = document.querySelector('.color-option.active');
    var colorKey = activeColor ? activeColor.dataset.color : 'sunburst';
    var colorName = activeColor ? activeColor.dataset.name : 'Sunburst';
    var qty = cartQuantities.collar || 1;
    var unitCents = Math.round(BASE_PRICE * 100);

    return {
        items_count: qty,
        items: [{
            key: 'local-demo-halo-collar-5',
            id: WC_VARIATIONS[colorKey] || WC_PRODUCT_ID,
            name: 'Halo Collar 5',
            quantity: qty,
            images: [{ src: LOCAL_DEMO_COLOR_IMAGES[colorKey] || LOCAL_DEMO_COLOR_IMAGES.sunburst }],
            variation: [{ attribute: 'Color', value: colorName }],
            prices: { price: String(unitCents) }
        }],
        totals: {
            total_items: String(unitCents * qty),
            total_discount: '0'
        },
        coupons: []
    };
}

function renderLocalDemoCart() {
    lastWcCart = buildLocalDemoCart();
    renderWcCart(lastWcCart);
}

function openMiniCart() {
    var miniCart = document.getElementById('mini-cart');
    var cartOverlay = document.getElementById('cart-overlay');

    // Populate from last known WC cart data, or fetch fresh
    if (IS_LOCAL_STATIC_DEMO) {
        renderLocalDemoCart();
    } else if (lastWcCart) {
        renderWcCart(lastWcCart);
    } else {
        fetchAndRenderCart();
    }

    miniCart.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.classList.add('cart-open');

    // GA4: view_cart
    var cart = lastWcCart;
    if (cart && cart.items && cart.items.length > 0) {
        var cartTotal = cart.items.reduce(function (sum, item) {
            return sum + (parseInt(item.prices.price) / 100 * item.quantity);
        }, 0);
        var ga4Items = cart.items.map(function (item) {
            var variant = (item.variation && item.variation.length > 0)
                ? item.variation[0].value : '';
            return {
                item_id: item.id.toString(),
                item_name: item.name,
                item_brand: 'Halo Collars',
                price: parseInt(item.prices.price) / 100,
                item_category: 'Halo Collars',
                item_variant: variant,
                quantity: item.quantity.toString(),
                google_business_vertical: 'retail',
                id: item.id.toString()
            };
        });
        pushDataLayerEvent('view_cart', {
            currency: 'USD',
            value: cartTotal,
            items: ga4Items
        });
    }
}

function closeMiniCart() {
    var miniCart = document.getElementById('mini-cart');
    var cartOverlay = document.getElementById('cart-overlay');

    miniCart.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.classList.remove('cart-open');
}

/* Fetch real cart from WC Store API and render */
async function fetchAndRenderCart() {
    if (IS_LOCAL_STATIC_DEMO) {
        renderLocalDemoCart();
        return;
    }

    try {
        var response = await fetch('/wp-json/wc/store/v1/cart', { credentials: 'same-origin' });
        var cart = await response.json();
        // Update nonce
        var nonce = response.headers.get('Nonce');
        if (nonce) wcStoreNonce = nonce;
        lastWcCart = cart;
        renderWcCart(cart);
    } catch (err) {
        console.error('[Halo Shop] Failed to fetch cart:', err);
    }
}

/* Render cart from WC Store API response */
function renderWcCart(cart) {
    var cartItemsContainer = document.getElementById('cart-items');
    var cartSubtotal = document.getElementById('cart-subtotal');
    var cartTotal = document.getElementById('cart-total');
    var cartCount = document.getElementById('cart-count');

    var items = cart.items || [];
    var totals = cart.totals || {};

    // Update cart count
    var itemCount = cart.items_count || items.reduce(function (sum, i) { return sum + i.quantity; }, 0);
    cartCount.textContent = '(' + itemCount + ')';

    // Update nav cart badge
    var navCartBtn = document.querySelector('.nav-cart-btn');
    if (navCartBtn) {
        if (itemCount > 0) {
            navCartBtn.classList.add('active');
            navCartBtn.setAttribute('data-total', itemCount);
        } else {
            navCartBtn.classList.remove('active');
            navCartBtn.setAttribute('data-total', '0');
        }
    }

    // Build cart HTML from real WC items
    var cartHTML = '';

    items.forEach(function (item) {
        var imgSrc = (item.images && item.images[0]) ? item.images[0].src : '';
        var itemName = item.name || 'Item';
        var variation = '';
        if (item.variation && item.variation.length > 0) {
            variation = item.variation.map(function (v) { return v.attribute + ': ' + v.value; }).join(', ');
        }
        // WC Store API prices are in minor units (cents)
        var unitPrice = (parseInt(item.prices.price) / 100).toFixed(2);
        var qty = item.quantity;
        var itemKey = item.key;

        cartHTML += '<div class="cart-item" data-item-key="' + itemKey + '">' +
            '<div class="cart-item-image">' +
                '<img src="' + imgSrc + '" alt="' + itemName + '">' +
            '</div>' +
            '<div class="cart-item-content">' +
                '<div class="cart-item-header">' +
                    '<span class="cart-item-name">' + itemName + '</span>' +
                    '<button class="cart-item-delete" data-key="' + itemKey + '" aria-label="Remove item">' +
                        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
                            '<path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6"/>' +
                        '</svg>' +
                    '</button>' +
                '</div>' +
                (variation ? '<span class="cart-item-variant">' + variation + '</span>' : '') +
                '<span class="cart-item-delivery">Delivery in 2 - 4 business days</span>' +
                '<div class="cart-item-bottom">' +
                    '<span class="cart-item-price">$' + unitPrice + '</span>' +
                    '<div class="cart-qty-controls">' +
                        '<button class="cart-qty-btn cart-qty-dec" data-key="' + itemKey + '" ' + (qty <= 1 ? 'disabled' : '') + '>-</button>' +
                        '<span class="cart-qty-value">' + qty + '</span>' +
                        '<button class="cart-qty-btn cart-qty-inc" data-key="' + itemKey + '">+</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
    });

    // Hide checkout button and totals when cart is empty
    var checkoutBtn = document.getElementById('continue-checkout');
    var cartTotals = document.querySelector('.cart-totals');

    if (items.length === 0) {
        cartHTML = '<div class="cart-empty"><p>Your cart is empty</p></div>';
        if (checkoutBtn) checkoutBtn.style.display = 'none';
        if (cartTotals) cartTotals.style.display = 'none';
    } else {
        if (checkoutBtn) checkoutBtn.style.display = '';
        if (cartTotals) cartTotals.style.display = '';
    }

    cartItemsContainer.innerHTML = cartHTML;

    // Format totals (WC Store API uses minor units)
    var subtotal = (parseInt(totals.total_items || 0) / 100).toFixed(2);
    var totalDiscount = parseInt(totals.total_discount || 0) / 100;

    cartSubtotal.textContent = '$' + subtotal;

    // Show/hide discount row
    var discountRow = document.getElementById('cart-discount-row');
    if (totalDiscount > 0 && cart.coupons && cart.coupons.length > 0) {
        var couponBadges = cart.coupons.map(function (c) {
            return '<span class="discount-badge">' + c.code + '</span>';
        }).join(' ');

        if (!discountRow) {
            // Create discount row dynamically between subtotal and tax rows
            discountRow = document.createElement('div');
            discountRow.id = 'cart-discount-row';
            discountRow.className = 'cart-total-row cart-total-row-discount';
            var taxRow = cartTotals.querySelector('.cart-total-row-light');
            if (taxRow) cartTotals.insertBefore(discountRow, taxRow);
        }
        discountRow.innerHTML = '<span>Discount ' + couponBadges + '</span>' +
            '<span class="discount-amount">-$' + totalDiscount.toFixed(2) + '</span>';
        discountRow.style.display = '';
        var discountedTotal = (parseFloat(subtotal) - totalDiscount).toFixed(2);
        cartTotal.textContent = '$' + discountedTotal;
    } else {
        if (discountRow) discountRow.style.display = 'none';
        cartTotal.textContent = '$' + subtotal;
    }

    // Wire up remove and quantity buttons via event delegation
    cartItemsContainer.onclick = function (e) {
        var deleteBtn = e.target.closest('.cart-item-delete');
        var incBtn = e.target.closest('.cart-qty-inc');
        var decBtn = e.target.closest('.cart-qty-dec');

        if (deleteBtn) {
            wcRemoveCartItem(deleteBtn.dataset.key);
        } else if (incBtn) {
            wcUpdateCartItemQty(incBtn.dataset.key, 1);
        } else if (decBtn) {
            wcUpdateCartItemQty(decBtn.dataset.key, -1);
        }
    };
}

/* Remove item from WC cart via Store API */
async function wcRemoveCartItem(itemKey) {
    // Capture removed item data before removal for GA4 tracking
    var removedItem = (lastWcCart && lastWcCart.items || []).find(function (i) { return i.key === itemKey; });

    try {
        var nonce = await getWcStoreNonce();
        var response = await fetch('/wp-json/wc/store/v1/cart/remove-item', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json', 'Nonce': nonce || '' },
            body: JSON.stringify({ key: itemKey })
        });
        var cart = await response.json();
        var newNonce = response.headers.get('Nonce');
        if (newNonce) wcStoreNonce = newNonce;
        lastWcCart = cart;
        renderWcCart(cart);

        // GA4: remove_from_cart
        if (removedItem) {
            var variant = (removedItem.variation && removedItem.variation.length > 0)
                ? removedItem.variation[0].value : '';
            pushDataLayerEvent('remove_from_cart', {
                currency: 'USD',
                value: parseInt(removedItem.prices.price) / 100 * removedItem.quantity,
                items: [{
                    item_id: removedItem.id.toString(),
                    item_name: removedItem.name,
                    item_brand: 'Halo Collars',
                    price: parseInt(removedItem.prices.price) / 100,
                    item_category: 'Halo Collars',
                    item_variant: variant,
                    quantity: removedItem.quantity.toString(),
                    google_business_vertical: 'retail',
                    id: removedItem.id.toString()
                }]
            });
        }
    } catch (err) {
        console.error('[Halo Shop] Remove item error:', err);
    }
}

/* Update item quantity in WC cart via Store API */
async function wcUpdateCartItemQty(itemKey, delta) {
    // Find current quantity
    var currentItem = (lastWcCart && lastWcCart.items || []).find(function (i) { return i.key === itemKey; });
    if (!currentItem) return;

    var newQty = currentItem.quantity + delta;
    if (newQty < 1) return;

    try {
        var nonce = await getWcStoreNonce();
        var response = await fetch('/wp-json/wc/store/v1/cart/update-item', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json', 'Nonce': nonce || '' },
            body: JSON.stringify({ key: itemKey, quantity: newQty })
        });
        var cart = await response.json();
        var newNonce = response.headers.get('Nonce');
        if (newNonce) wcStoreNonce = newNonce;
        lastWcCart = cart;
        renderWcCart(cart);
    } catch (err) {
        console.error('[Halo Shop] Update qty error:', err);
    }
}

/* ---------- WooCommerce Store API Nonce ---------- */
var wcStoreNonce = null;

async function getWcStoreNonce() {
    if (wcStoreNonce) return wcStoreNonce;
    try {
        var response = await fetch('/wp-json/wc/store/v1/cart', { credentials: 'same-origin' });
        wcStoreNonce = response.headers.get('Nonce') || response.headers.get('X-WC-Store-API-Nonce');
        return wcStoreNonce;
    } catch (e) {
        return null;
    }
}

/* ---------- WooCommerce Add to Cart (AJAX, stays on page) ---------- */
async function addToWooCommerceCart() {
    var addToCartBtn = document.getElementById('checkout-btn');

    // Disable button and show loading
    if (addToCartBtn) {
        addToCartBtn.disabled = true;
        addToCartBtn.textContent = 'Adding...';
    }

    if (IS_LOCAL_STATIC_DEMO) {
        saveCartState();
        renderLocalDemoCart();
        if (addToCartBtn) {
            addToCartBtn.disabled = false;
            addToCartBtn.textContent = 'Add to Cart';
        }
        openMiniCart();
        return;
    }

    // Get selected color
    var activeColor = document.querySelector('.color-option.active');
    var colorKey = activeColor ? activeColor.dataset.color : 'sunburst';
    var colorName = activeColor ? activeColor.dataset.name : 'Sunburst';
    var variationId = WC_VARIATIONS[colorKey];
    var qty = cartQuantities.collar || 1;

    try {
        var nonce = await getWcStoreNonce();

        var response = await fetch('/wp-json/wc/store/v1/cart/add-item', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Nonce': nonce || ''
            },
            body: JSON.stringify({
                id: variationId,
                quantity: qty
            })
        });

        if (!response.ok) {
            throw new Error('Add to cart failed: ' + response.status);
        }

        // The add-item response IS the full cart object
        var cart = await response.json();

        // Update nonce from response (WC rotates it)
        var newNonce = response.headers.get('Nonce') || response.headers.get('X-WC-Store-API-Nonce');
        if (newNonce) wcStoreNonce = newNonce;

        // Store cart data so the side cart renders real WC contents
        lastWcCart = cart;
        renderWcCart(cart);

        // Save local cart state
        saveCartState();

        // Restore button
        if (addToCartBtn) {
            addToCartBtn.disabled = false;
            addToCartBtn.textContent = 'Add to Cart';
        }

        // GA4: add_to_cart
        pushDataLayerEvent('add_to_cart', {
            currency: 'USD',
            value: BASE_PRICE * qty,
            items: [buildGA4Item(colorKey, colorName, qty)]
        });

        // Open the side cart with real WC data
        openMiniCart();

    } catch (err) {
        console.error('[Halo Shop] Add to cart error:', err);

        // Restore button
        if (addToCartBtn) {
            addToCartBtn.disabled = false;
            addToCartBtn.textContent = 'Add to Cart';
        }

        // Fallback: try the form POST approach
        goToCheckoutViaFormPost();
    }
}

/* ---------- Checkout: redirect to /checkout/ via form POST ---------- */
function goToCheckoutViaFormPost() {
    var activeColor = document.querySelector('.color-option.active');
    var colorKey = activeColor ? activeColor.dataset.color : 'sunburst';
    var colorName = activeColor ? activeColor.dataset.name : 'Sunburst';
    var variationId = WC_VARIATIONS[colorKey];
    var qty = cartQuantities.collar || 1;

    saveCartState();

    var form = document.createElement('form');
    form.method = 'POST';
    form.action = '/checkout/';
    form.style.display = 'none';

    var fields = {
        'add-to-cart': WC_PRODUCT_ID,
        'product_id': WC_PRODUCT_ID,
        'variation_id': variationId || '',
        'attribute_halo-color': colorName,
        'quantity': qty
    };

    for (var key in fields) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = fields[key];
        form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
}

/* ---------- Promo Code via WooCommerce ---------- */
async function applyPromoCoupon(code) {
    if (!code) return;

    const promoApplyBtn = document.getElementById('promo-apply-btn');
    const promoInput = document.getElementById('promo-input');
    const promoMessage = document.getElementById('promo-message');

    // Loading state
    if (promoApplyBtn) {
        promoApplyBtn.disabled = true;
        promoApplyBtn.textContent = '...';
    }

    if (IS_LOCAL_STATIC_DEMO) {
        if (promoMessage) {
            promoMessage.textContent = code.toUpperCase() + ' ready for checkout demo.';
            promoMessage.className = 'promo-message promo-success';
            promoMessage.style.display = 'block';
        }
        if (promoInput) promoInput.value = '';
        if (promoApplyBtn) {
            promoApplyBtn.disabled = false;
            promoApplyBtn.textContent = 'Apply';
        }
        return;
    }

    try {
        var nonce = await getWcStoreNonce();

        var response = await fetch('/wp-json/wc/store/v1/cart/apply-coupon', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Nonce': nonce || ''
            },
            body: JSON.stringify({ code: code })
        });

        var newNonce = response.headers.get('Nonce');
        if (newNonce) wcStoreNonce = newNonce;

        if (promoMessage) {
            if (response.ok) {
                var cart = await response.json();
                lastWcCart = cart;
                renderWcCart(cart);
                promoMessage.textContent = 'Coupon applied!';
                promoMessage.className = 'promo-message promo-success';
                if (promoInput) promoInput.value = '';
            } else {
                var errorData = await response.json();
                var errorMsg = errorData.message || 'Invalid coupon code';
                // WC returns HTML-encoded strings, decode them
                var tmp = document.createElement('span');
                tmp.innerHTML = errorMsg;
                promoMessage.textContent = tmp.textContent;
                promoMessage.className = 'promo-message promo-error';
            }
            promoMessage.style.display = 'block';
        }
    } catch (err) {
        console.error('[Halo Shop] Coupon error:', err);
        if (promoMessage) {
            promoMessage.textContent = 'Could not apply coupon. Try again.';
            promoMessage.className = 'promo-message promo-error';
            promoMessage.style.display = 'block';
        }
    } finally {
        if (promoApplyBtn) {
            promoApplyBtn.disabled = false;
            promoApplyBtn.textContent = 'Apply';
        }
    }
}

/* ---------- Cart State Persistence ---------- */
function saveCartState() {
    const activeColor = document.querySelector('.color-option.active');
    const addedAddons = document.querySelectorAll('.addon-card.added');

    const state = {
        color: activeColor ? activeColor.dataset.color : null,
        addons: Array.from(addedAddons).map(card => card.dataset.addon),
        quantities: { ...cartQuantities },
        timestamp: Date.now()
    };

    try {
        localStorage.setItem('halo-shop-cart', JSON.stringify(state));
    } catch (e) {
        // localStorage unavailable — silent fail
    }
}

function restoreCartState() {
    try {
        const saved = localStorage.getItem('halo-shop-cart');
        if (!saved) return;

        const state = JSON.parse(saved);

        // Expire after 24 hours
        if (Date.now() - state.timestamp > 24 * 60 * 60 * 1000) {
            localStorage.removeItem('halo-shop-cart');
            return;
        }

        // Restore color selection
        if (state.color) {
            const colorOption = document.querySelector(`.color-option[data-color="${state.color}"]`);
            if (colorOption) {
                colorOption.click();
            }
        }

        // Restore addons
        if (state.addons) {
            state.addons.forEach(addonKey => {
                const card = document.querySelector(`.addon-card[data-addon="${addonKey}"]`);
                if (card && !card.classList.contains('added')) {
                    const addBtn = card.querySelector('.addon-add-btn');
                    if (addBtn) addBtn.click();
                }
            });
        }

        // Restore quantities
        if (state.quantities) {
            Object.assign(cartQuantities, state.quantities);
        }
    } catch (e) {
        // Parse error — silent fail
    }
}

// Rotate promo banner messages
(function () {
    var banner = document.querySelector('.promo-banner');
    if (!banner) return;
    var msgs = banner.querySelectorAll('.promo-msg');
    if (msgs.length > 1) {
        var current = 0;
        setInterval(function () {
            msgs[current].classList.remove('active');
            current = (current + 1) % msgs.length;
            msgs[current].classList.add('active');
        }, 10000);
    }
})();

console.log('Halo Shop Configurator initialized');
