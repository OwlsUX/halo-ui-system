(function () {
  const pagePath = window.location.pathname.replace(/\/index\.html$/, "/");
  const sharedChromePages = new Set([
    'home.html',
    'shop-wireless-dog-fence.html',
    'accessories.html',
    'beacons.html',
    'how-it-works.html',
    'reviews.html',
    'deals.html',
    'pack-perks-marketing.html',
    'pack-perks-marketing-v2.html',
    'pack-perks.html',
    'pack-perks-list.html',
    'account.html',
    'account-perks.html',
    'membership-selection.html',
    'offer-detail.html',
    'cancellation.html',
    'style-guide.html'
  ]);

  function getRootPrefix() {
    const parts = window.location.pathname.split('/').filter(Boolean);
    const sectionIndex = parts.findIndex((part) => ['pages', 'design-system', 'docs'].includes(part));
    if (sectionIndex === -1) return '';
    const depthFromRoot = Math.max(0, parts.length - sectionIndex - 1);
    return '../'.repeat(depthFromRoot);
  }

  function currentFileName() {
    const pathname = window.location.pathname.replace(/\/$/, '/index.html');
    return pathname.split('/').pop() || 'index.html';
  }

  function normalizeHaloChrome() {
    const fileName = currentFileName();
    ensureSharedChromeAssets();
    const preservesSourceNav = fileName === 'home.html' || fileName === 'shop-wireless-dog-fence.html';
    const shouldUseSharedChrome = sharedChromePages.has(fileName);
    const nav = preservesSourceNav ? null : document.querySelector('nav.nav, nav.halo-navigation');
    const footer = document.querySelector('footer.footer, footer.footer-demo, footer.foot');
    if (!nav && !footer && !shouldUseSharedChrome) return;

    const basePath = getRootPrefix();
    const href = (path) => `${basePath}${path}`;
    const isImmersive = fileName === 'home.html' || fileName === 'shop-wireless-dog-fence.html';
    const isModernCart = document.body.classList.contains('modern-commerce');
    const isPdpCart = document.body.classList.contains('pdp-page');
    const logo = isImmersive ? 'halo-logo.svg?v=2' : 'halo-logo-dark.svg';
    const navClass = isImmersive ? 'nav' : 'nav nav--light';
    const current = (page) => fileName === page ? ' aria-current="page"' : '';
    const cartButton = isModernCart
      ? `<button class="main-nav-cart nav-icon-btn" type="button" aria-label="Open accessory cart" data-cart-open>${cartIcon()}<span class="mc-cart-count" data-cart-count>0</span></button>`
      : isPdpCart
        ? `<button class="main-nav-cart nav-icon-btn js-open-cart" type="button" aria-label="Cart" data-total="0">${cartIcon()}</button>`
        : `<a href="${href('pages/shop-wireless-dog-fence.html')}" class="main-nav-cart nav-icon-btn" aria-label="Cart">${cartIcon()}</a>`;

    const navHtml = `
      <nav class="${navClass}" aria-label="Main navigation" data-shared-halo-nav>
        <div class="container nav-inner">
          <a href="${href('pages/home.html')}" class="nav-logo" aria-label="Halo home"${current('home.html')}>
            <img src="${href(`vendor/ecomlanders-v3/${logo}`)}" alt="Halo" class="logo-img">
          </a>

          <div class="nav-menu-desktop">
            <div class="nav-dropdown">
              <button class="nav-dropdown-toggle" type="button" aria-expanded="false">
                Shop Halo
                <svg class="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </button>
              <div class="mega-menu">
                <div class="mega-menu__container">
                  <div class="mega-menu__products-area">
                    <div class="mega-menu__grid">
                      <a href="${href('pages/shop-wireless-dog-fence.html')}" class="product-card product-card__animated hc5-product"${current('shop-wireless-dog-fence.html')}>
                        <div class="product-card__bg">
                          <img src="https://go.halocollar.com/misc/exp-19-images/white-2.jpg?hc5" alt="Halo Collar 5" class="product-card__image">
                        </div>
                        <div class="product-card__content product-card__content--light">
                          <div class="product-card__badge">NEW</div>
                          <h3 class="product-card__title">Halo Collar 5</h3>
                          <div class="product-card__price">
                            <p class="price-label">Save <span data-savings="HC5">$75</span></p>
                            <p><span data-price="HC5">$524</span> <span class="strikethrough">$599</span></p>
                          </div>
                        </div>
                      </a>
                      <a href="${href('pages/shop-wireless-dog-fence.html')}" class="product-card product-card__animated hc4-product">
                        <div class="product-card__bg">
                          <img src="https://go.halocollar.com/misc/exp-19-images/white-1.jpg?hc4" alt="Halo Collar 4" class="product-card__image">
                        </div>
                        <div class="product-card__content product-card__content--light">
                          <div class="product-card__badge product-card__badge--dark">WHILE SUPPLIES LAST</div>
                          <h3 class="product-card__title">Halo Collar 4</h3>
                          <div class="product-card__price">
                            <p class="price-label">Save <span data-savings="HC4">$125</span></p>
                            <p><span data-price="HC4">$424</span> <span class="strikethrough">$549</span></p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div class="mega-menu__sidebar">
                    <nav aria-label="Shop categories">
                      <a href="${href('pages/beacons.html')}" class="mega-nav-item"${current('beacons.html')}>
                        <div class="mega-nav-item__left">
                          <img src="${href('assets/accessories/processed/remote-beacon.png')}" alt="Shop Beacons" class="mega-nav-item__image mega-nav-item__image--scaled">
                          <span>Shop Beacons</span>
                        </div>
                        ${arrowIcon('mega-nav-item__arrow')}
                      </a>
                      <a href="${href('pages/accessories.html')}" class="mega-nav-item"${current('accessories.html')}>
                        <div class="mega-nav-item__left">
                          <img src="${href('assets/accessories/processed/charging-stand.png')}" alt="Shop Accessories" class="mega-nav-item__image">
                          <span>Shop Accessories</span>
                        </div>
                        ${arrowIcon('mega-nav-item__arrow')}
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            <a href="${href('pages/reviews.html')}" class="nav-link"${current('reviews.html')}>Testimonials</a>
            <a href="${href('pages/deals.html')}" class="nav-link"${current('deals.html')}>Deals</a>
            <a href="${href('pages/how-it-works.html')}" class="nav-link"${current('how-it-works.html')}>How it works</a>
          </div>

          <div class="nav-right-desktop">
            <a href="${href('pages/account.html')}" class="nav-icon-btn" aria-label="Account"${current('account.html')}>${accountIcon()}</a>
            ${cartButton}
            <a href="${href('pages/shop-wireless-dog-fence.html')}" class="nav-cta-btn">Shop Now</a>
          </div>

          <div class="nav-right-mobile">
            ${cartButton}
            <button class="nav-mobile-toggle" type="button" aria-label="Menu" aria-expanded="false">
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
            </button>
          </div>
        </div>

        <div class="nav-mobile-menu" aria-hidden="true">
          <div class="sidebar-menu">
            <div class="sidebar-menu__content custom-scrollbar">
              <div class="sidebar-menu__section sidebar-menu__section--products">
                <div class="products-container">
                  <a href="${href('pages/shop-wireless-dog-fence.html')}" class="product-card-mobile hc5-product">
                    <div class="product-card-mobile__image-wrapper aspect-3-2">
                      <img src="https://go.halocollar.com/misc/exp-19-images/white-2.jpg?hc5" alt="Halo Collar 5" class="product-card-mobile__image">
                      <div class="product-card-mobile__content_mobile">
                        <span class="badge badge--white">NEW</span>
                        <h3 class="product-card-mobile__title">Halo Collar 5</h3>
                        <div class="product-card-mobile__price">
                          <p class="product-card-mobile__promo">Save <span data-savings="HC5">$75</span></p>
                          <p><span data-price="HC5">$524</span> <span class="strikethrough">$599</span></p>
                        </div>
                      </div>
                    </div>
                  </a>
                  <a href="${href('pages/shop-wireless-dog-fence.html')}" class="product-card-mobile hc4-product">
                    <div class="product-card-mobile__image-wrapper aspect-3-2">
                      <img src="https://go.halocollar.com/misc/exp-19-images/white-1.jpg?hc4" alt="Halo Collar 4" class="product-card-mobile__image">
                      <div class="product-card-mobile__content_mobile">
                        <span class="badge badge--dark">WHILE SUPPLIES LAST</span>
                        <h3 class="product-card-mobile__title">Halo Collar 4</h3>
                        <div class="product-card-mobile__price">
                          <p class="product-card-mobile__promo">Save <span data-savings="HC4">$125</span></p>
                          <p><span data-price="HC4">$424</span> <span class="strikethrough">$549</span></p>
                        </div>
                      </div>
                    </div>
                  </a>
                  <div class="accessory-links">
                    <a href="${href('pages/beacons.html')}" class="accessory-item"${current('beacons.html')}>
                      <img src="${href('assets/accessories/processed/remote-beacon.png')}" alt="Beacons" class="accessory-item__thumb">
                      <span>Shop Beacons</span>
                    </a>
                    <a href="${href('pages/accessories.html')}" class="accessory-item"${current('accessories.html')}>
                      <img src="${href('assets/accessories/processed/charging-stand.png')}" alt="Accessories" class="accessory-item__thumb">
                      <span>Shop Accessories</span>
                    </a>
                  </div>
                </div>
              </div>
              <nav class="sidebar-menu__nav" aria-label="Mobile navigation">
                <ul class="menu-list">
                  <li><a href="${href('pages/reviews.html')}" class="menu-list__link">Testimonials</a></li>
                  <li><a href="${href('pages/deals.html')}" class="menu-list__link">Deals</a></li>
                  <li><a href="${href('pages/how-it-works.html')}" class="menu-list__link">How it works</a></li>
                </ul>
                <ul class="menu-list">
                  <li><a href="${href('pages/account.html')}" class="menu-list__link">My Account</a></li>
                  <li><a href="${href('pages/plans.html')}" class="menu-list__link">Plans</a></li>
                  <li><a href="${href('pages/pack-perks.html')}" class="menu-list__link">Pack Perks</a></li>
                </ul>
              </nav>
            </div>
            <div class="sidebar-menu__footer">
              <a href="${href('pages/shop-wireless-dog-fence.html')}" class="btn-explore-halo">Shop Now</a>
            </div>
          </div>
        </div>
      </nav>
    `;

    const footerHtml = `
      <footer class="footer" data-shared-halo-footer>
        <div class="container">
          <div class="footer-top">
            <div class="footer-brand">
              <a class="footer-logo" href="${href('pages/home.html')}" aria-label="Halo home">
                <img src="${href('vendor/ecomlanders-v3/halo-logo.svg?v=2')}" alt="Halo" class="footer-logo-img footer-logo-dark">
              </a>
              <div class="footer-socials">
                <a href="#" aria-label="YouTube" class="social-icon">${youtubeIcon()}</a>
                <a href="#" aria-label="Facebook" class="social-icon">${facebookIcon()}</a>
                <a href="#" aria-label="Instagram" class="social-icon">${instagramIcon()}</a>
                <a href="#" aria-label="TikTok" class="social-icon">${tiktokIcon()}</a>
              </div>
            </div>
          </div>

          <div class="footer-grid">
            <div class="footer-column">
              <h4>Shop</h4>
              <a href="${href('pages/shop-wireless-dog-fence.html')}">Halo Collar</a>
              <a href="${href('pages/accessories.html')}">Accessories</a>
              <a href="${href('pages/beacons.html')}">Beacons</a>
              <a href="${href('pages/deals.html')}">Deals</a>
            </div>
            <div class="footer-column">
              <h4>Learn / About</h4>
              <a href="${href('pages/how-it-works.html')}">How it works</a>
              <a href="${href('pages/reviews.html')}">Testimonials</a>
              <a href="${href('pages/blog-template.html')}">Blog</a>
            </div>
            <div class="footer-column">
              <h4>Membership / Account</h4>
              <a href="${href('pages/account.html')}">Account</a>
              <a href="${href('pages/plans.html')}">Plans</a>
              <a href="${href('pages/pack-perks.html')}">Pack Perks</a>
            </div>
            <div class="footer-column">
              <h4>Support / Legal</h4>
              <a href="${href('pages/support-template.html')}">Halo Support</a>
              <a href="${href('pages/support-template.html')}">Privacy Policy</a>
              <a href="${href('pages/support-template.html')}">Terms of Use</a>
              <a href="${href('pages/support-template.html')}">Legal Disclaimer</a>
            </div>
            <div class="footer-column">
              <h4>Why Halo?</h4>
              <a href="${href('pages/feature-detail.html')}">Best GPS Dog Fence</a>
              <a href="${href('pages/feature-detail.html')}">GPS Dog Fence Accuracy</a>
              <a href="${href('pages/feature-detail.html')}">Halo vs. SpotOn</a>
              <a href="${href('pages/feature-detail.html')}">Underground fence comparison</a>
            </div>
          </div>

          <div class="footer-bottom">
            <div class="footer-copyright">
              <p>&copy; 2026 | Halo&reg; by Protect Animals with Satellites LLC</p>
            </div>
            <div class="footer-legal">
              <a href="${href('pages/support-template.html')}">Privacy Policy</a>
              <a href="${href('pages/support-template.html')}">Terms of Use</a>
              <a href="${href('pages/support-template.html')}">Legal Disclaimer</a>
            </div>
          </div>
        </div>
      </footer>
    `;

    if (!preservesSourceNav) {
      if (nav) {
        nav.outerHTML = navHtml;
      } else if (shouldUseSharedChrome) {
        document.body.insertAdjacentHTML('afterbegin', navHtml);
      }
    }

    if (footer) {
      footer.outerHTML = footerHtml;
    } else if (shouldUseSharedChrome) {
      document.body.insertAdjacentHTML('beforeend', footerHtml);
    }

    normalizeHaloPromo();
  }

  function normalizeHaloPromo() {
    const fileName = currentFileName();
    const existingPromo = document.querySelector('.promo-banner, .promo-strip, .sg-top');
    const nav = document.querySelector('nav.nav');
    if ((fileName === 'home.html' || fileName === 'shop-wireless-dog-fence.html') && existingPromo?.classList.contains('promo-banner')) {
      existingPromo.setAttribute('data-shared-halo-promo', '');
      existingPromo.dataset.promoBound = 'true';
      nav?.classList.add('has-banner');
      return;
    }

    const promoHtml = `
      <div class="promo-banner" aria-label="Current Halo offers" data-shared-halo-promo>
        <p class="promo-msg active">Price drop: <strong data-price-drop="HC5">$75 off</strong></p>
        <p class="promo-msg">90-day satisfaction guarantee</p>
        <p class="promo-msg">Introducing Precision+ &nbsp; The new standard in safety</p>
      </div>
    `;

    if (existingPromo) {
      existingPromo.outerHTML = promoHtml;
    } else if (nav) {
      nav.insertAdjacentHTML('beforebegin', promoHtml);
    }

    const promo = document.querySelector('[data-shared-halo-promo]');
    const currentNav = document.querySelector('nav.nav');
    if (!promo || promo.dataset.promoBound === 'true') return;
    promo.dataset.promoBound = 'true';

    const messages = Array.from(promo.querySelectorAll('.promo-msg'));
    if (messages.length > 1) {
      let activeIndex = Math.max(0, messages.findIndex((message) => message.classList.contains('active')));
      window.setInterval(() => {
        messages[activeIndex].classList.remove('active');
        activeIndex = (activeIndex + 1) % messages.length;
        messages[activeIndex].classList.add('active');
      }, 6500);
    }

    if (currentNav && !currentNav.classList.contains('nav--light')) {
      currentNav.classList.add('has-banner');
    }
  }

  function ensureSharedChromeAssets() {
    const basePath = getRootPrefix();
    const href = (path) => `${basePath}${path}`;

    if (!document.querySelector('link[href*="components.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href('css/components.css');
      document.head.appendChild(link);
    }

    if (!document.querySelector('link[href*="v3-nav.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href('css/v3-nav.css');
      document.head.appendChild(link);
    }

    if (document.getElementById('shared-halo-promo-styles')) return;
    const style = document.createElement('style');
    style.id = 'shared-halo-promo-styles';
    style.textContent = `
      .promo-banner {
        min-height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px 16px;
        background: var(--halo-color-nav-promo-background, #fcd62d);
        color: var(--halo-color-nav-promo-text, #071826);
        text-align: center;
        font: 800 0.875rem/1.15 var(--halo-font-sans, Inter, system-ui, sans-serif);
        position: relative;
        z-index: 1001;
      }

      .promo-banner .promo-msg {
        display: none;
        margin: 0;
      }

      .promo-banner .promo-msg.active {
        display: block;
      }
    `;
    document.head.appendChild(style);
  }

  function accountIcon() {
    return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
  }

  function cartIcon() {
    return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
  }

  function arrowIcon(className) {
    return `<svg xmlns="http://www.w3.org/2000/svg" class="${className}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>`;
  }

  function youtubeIcon() {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z"></path></svg>';
  }

  function facebookIcon() {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12z"></path></svg>';
  }

  function instagramIcon() {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 5.8.1 4.9.3 4.1.6c-.8.3-1.5.7-2.1 1.4C1.3 2.6.9 3.3.6 4.1.3 4.9.1 5.8.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.1 1.3.2 2.2.5 3 .3.8.7 1.5 1.4 2.1.7.7 1.3 1.1 2.1 1.4.8.3 1.7.5 3 .5 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c1.3-.1 2.2-.2 3-.5.8-.3 1.5-.7 2.1-1.4.7-.7 1.1-1.3 1.4-2.1.3-.8.5-1.7.5-3 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.1-1.3-.2-2.2-.5-3-.3-.8-.7-1.5-1.4-2.1C21.4 1.3 20.7.9 19.9.6c-.8-.3-1.7-.5-3-.5C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"></path></svg>';
  }

  function tiktokIcon() {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.3 5.3A4.5 4.5 0 0 1 16.5 2h-3.4v13.5a2.7 2.7 0 1 1-1.9-2.6V9.4a6.2 6.2 0 1 0 5.3 6.1V9.7a7.9 7.9 0 0 0 4.5 1.4V7.7a4.5 4.5 0 0 1-1.7-2.4z"></path></svg>';
  }

  document.querySelectorAll("[data-nav-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.navToggle);
      target?.classList.toggle("is-open");
      button.setAttribute("aria-expanded", target?.classList.contains("is-open") ? "true" : "false");
    });
  });

  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (href && pagePath.endsWith(href.replace("../", "").replace("./", ""))) {
      link.setAttribute("aria-current", "page");
    }
  });

  document.querySelectorAll(".accordion__button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".accordion__item");
      item?.classList.toggle("is-open");
      button.setAttribute("aria-expanded", item?.classList.contains("is-open") ? "true" : "false");
    });
  });

  document.querySelectorAll("[data-modal-open]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(button.dataset.modalOpen)?.classList.add("is-open");
    });
  });

  document.querySelectorAll("[data-modal-close]").forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".modal")?.classList.remove("is-open");
    });
  });

  document.querySelectorAll("[data-promo-state]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.promoState);
      if (!target) return;
      target.textContent = button.dataset.message || "Promo applied";
      target.classList.add("badge--yellow");
    });
  });

  function initV3MobileNav() {
    const path = window.location.pathname;
    if (path.endsWith('/home.html') || document.body.classList.contains('pdp-page')) return;

    document.querySelectorAll('.nav').forEach((nav) => {
      const toggle = nav.querySelector('.nav-mobile-toggle');
      const menu = nav.querySelector('.nav-mobile-menu');
      if (!toggle || !menu || toggle.dataset.mobileNavBound === 'true') return;
      toggle.dataset.mobileNavBound = 'true';

      const openMenu = () => {
        toggle.classList.add('active');
        menu.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        menu.setAttribute('aria-hidden', 'false');
        document.body.classList.add('mobile-nav-open');
      };

      const closeMenu = () => {
        toggle.classList.remove('active');
        menu.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('mobile-nav-open');
      };

      toggle.addEventListener('click', () => {
        if (menu.classList.contains('active')) closeMenu();
        else openMenu();
      });

      menu.addEventListener('click', (event) => {
        if (event.target === menu || event.target.closest('a')) closeMenu();
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menu.classList.contains('active')) closeMenu();
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth > 900 && menu.classList.contains('active')) closeMenu();
      });
    });
  }

  // Inject Workbench Drawer
  function initWorkbenchDrawer() {
    if (document.querySelector('.workbench-trigger')) return;

    injectWorkbenchStyles();

    const basePath = getRootPrefix();
    const href = (path) => `${basePath}${path}`;

    const drawerHtml = `
      <button class="workbench-trigger" type="button" aria-label="Open workbench drawer" aria-controls="workbenchDrawer" aria-expanded="false">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
      </button>
      <div class="workbench-drawer__backdrop" aria-hidden="true"></div>
      <aside class="workbench-drawer" id="workbenchDrawer" aria-label="UI System" aria-hidden="true">
        <div class="workbench-drawer__header">
          <div class="workbench-drawer__brand">
            <img src="${href('vendor/ecomlanders-v3/halo-logo-dark.svg')}" alt="Halo" class="workbench-drawer__logo">
            <span class="workbench-drawer__brand-text">UI System</span>
          </div>
          <button class="workbench-drawer__close" type="button" aria-label="Close drawer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"></path></svg>
          </button>
        </div>
        <div class="workbench-drawer__content">
          <div class="workbench-drawer__section">
            <h3>Main Website</h3>
            <a class="workbench-drawer__link" href="${href('pages/home.html')}">Home</a>
            <a class="workbench-drawer__link" href="${href('pages/shop-wireless-dog-fence.html')}">Shop Wireless Dog Fence</a>
            <a class="workbench-drawer__link" href="${href('pages/accessories.html')}">Accessories</a>
            <a class="workbench-drawer__link" href="${href('pages/beacons.html')}">Beacons</a>
            <a class="workbench-drawer__link" href="${href('pages/how-it-works.html')}">How It Works</a>
            <a class="workbench-drawer__link" href="${href('pages/reviews.html')}">Reviews</a>
            <a class="workbench-drawer__link" href="${href('pages/deals.html')}">Deals</a>
          </div>
          <div class="workbench-drawer__section">
            <h3>Pack Perks</h3>
            <a class="workbench-drawer__link" href="${href('pages/pack-perks.html')}">Pack Perks Lander</a>
            <a class="workbench-drawer__link" href="${href('pages/pack-perks-marketing.html')}">Pack Perks Marketing v1</a>
            <a class="workbench-drawer__link" href="${href('pages/pack-perks-marketing-v2.html')}">Pack Perks Marketing v2</a>
            <a class="workbench-drawer__link" href="${href('pages/pack-perks-marketing-v3.html')}">Pack Perks Marketing v3</a>
            <a class="workbench-drawer__link" href="${href('pages/pack-perks-list.html')}">Pack Perks List</a>
            <a class="workbench-drawer__link" href="${href('pages/account.html')}">Account</a>
            <a class="workbench-drawer__link" href="${href('pages/account-perks.html')}">Account Perks</a>
            <a class="workbench-drawer__link" href="${href('pages/membership-selection.html')}">Membership Selection</a>
            <a class="workbench-drawer__link" href="${href('pages/offer-detail.html')}">Offer Detail</a>
            <a class="workbench-drawer__link" href="${href('pages/cancellation.html')}">Cancellation Flow</a>
          </div>
          <div class="workbench-drawer__section">
            <h3>Design System</h3>
            <a class="workbench-drawer__link" href="${href('pages/style-guide.html')}">Style Guide</a>
          </div>
        </div>
      </aside>
    `;

    document.body.insertAdjacentHTML('beforeend', drawerHtml);

    const trigger = document.querySelector('.workbench-trigger');
    const drawer = document.querySelector('.workbench-drawer');
    const backdrop = document.querySelector('.workbench-drawer__backdrop');
    const closeBtn = document.querySelector('.workbench-drawer__close');

    const openDrawer = () => {
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    };

    const closeDrawer = () => {
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      trigger.focus();
    };

    const toggleDrawer = () => (drawer.classList.contains('is-open') ? closeDrawer() : openDrawer());

    trigger.addEventListener('click', toggleDrawer);
    closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
    });
  }

  function injectWorkbenchStyles() {
    if (document.getElementById('workbench-drawer-styles')) return;

    const style = document.createElement('style');
    style.id = 'workbench-drawer-styles';
    style.textContent = `
      .workbench-trigger,
      .workbench-drawer,
      .workbench-drawer__backdrop {
        box-sizing: border-box;
      }

      .workbench-trigger {
        position: fixed !important;
        left: max(18px, env(safe-area-inset-left, 0px) + 16px) !important;
        bottom: max(18px, env(safe-area-inset-bottom, 0px) + 16px) !important;
        z-index: 1200 !important;
        width: 46px !important;
        height: 46px !important;
        display: grid !important;
        place-items: center !important;
        border: 1px solid var(--halo-color-border-dark, #244258) !important;
        border-radius: 999px !important;
        background: var(--halo-color-surface-dark, #071826) !important;
        color: var(--halo-color-text-inverse, #ffffff) !important;
        box-shadow: var(--halo-shadow-raised, 0 18px 42px rgba(7, 24, 38, 0.14)) !important;
        cursor: pointer !important;
        opacity: 1 !important;
        visibility: visible !important;
        transform: translateZ(0) !important;
        transition: transform 180ms ease-out, background 180ms ease-out, box-shadow 180ms ease-out !important;
      }

      .workbench-trigger svg,
      .workbench-drawer__close svg {
        display: block;
        pointer-events: none;
      }

      .workbench-trigger:hover,
      .workbench-trigger:focus-visible {
        background: var(--halo-color-action-secondary-hover, #0b2235) !important;
        box-shadow: var(--halo-shadow-dropdown, 0 24px 48px rgba(7, 24, 38, 0.22)) !important;
        transform: translateY(-1px) scale(1.04) !important;
        outline: none !important;
      }

      .workbench-trigger:focus-visible,
      .workbench-drawer__close:focus-visible,
      .workbench-drawer__link:focus-visible {
        outline: 3px solid var(--halo-color-focus, #2f93f3) !important;
        outline-offset: 3px !important;
      }

      .workbench-drawer__backdrop {
        position: fixed !important;
        inset: 0 !important;
        z-index: 1201 !important;
        background: var(--halo-color-drawer-scrim, rgba(7, 24, 38, 0.48)) !important;
        opacity: 0 !important;
        visibility: hidden !important;
        transition: opacity 180ms ease-out, visibility 180ms ease-out !important;
      }

      .workbench-drawer__backdrop.is-open {
        opacity: 1 !important;
        visibility: visible !important;
      }

      .workbench-drawer {
        position: fixed !important;
        inset: 0 auto 0 0 !important;
        z-index: 1202 !important;
        width: min(360px, 92vw) !important;
        display: flex !important;
        flex-direction: column !important;
        background: var(--halo-color-drawer-background, #ffffff) !important;
        color: var(--halo-color-text-primary, #071826) !important;
        box-shadow: var(--halo-shadow-raised, 18px 0 44px rgba(7, 24, 38, 0.24)) !important;
        transform: translateX(-102%) !important;
        transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1) !important;
      }

      .workbench-drawer.is-open {
        transform: translateX(0) !important;
      }

      .workbench-drawer__header {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 16px !important;
        min-height: 72px !important;
        padding: 20px 24px !important;
        border-bottom: 1px solid var(--halo-color-border-subtle, #e2e9ee) !important;
      }

      .workbench-drawer__header h2 {
        margin: 0 !important;
        color: var(--halo-color-text-primary, #071826) !important;
        font: 800 1.125rem/1.1 var(--halo-font-sans, Inter, system-ui, sans-serif) !important;
        letter-spacing: 0 !important;
      }

      .workbench-drawer__close {
        display: grid !important;
        place-items: center !important;
        width: 38px !important;
        height: 38px !important;
        border: 0 !important;
        border-radius: 999px !important;
        background: var(--halo-color-surface-muted, #f2f6f8) !important;
        color: var(--halo-color-text-primary, #071826) !important;
        cursor: pointer !important;
      }

      .workbench-drawer__close:hover {
        background: var(--halo-color-surface-product, #f4f7f9) !important;
      }

      .workbench-drawer__content {
        flex: 1 !important;
        overflow-y: auto !important;
        padding: 18px 24px 32px !important;
      }

      .workbench-drawer__section + .workbench-drawer__section {
        margin-top: 24px !important;
      }

      .workbench-drawer__section h3 {
        margin: 0 0 8px !important;
        color: var(--halo-color-text-secondary, #526777) !important;
        font: 800 0.72rem/1.2 var(--halo-font-sans, Inter, system-ui, sans-serif) !important;
        letter-spacing: 0.08em !important;
        text-transform: uppercase !important;
      }

      .workbench-drawer__link {
        display: block !important;
        margin: 2px -10px !important;
        padding: 9px 10px !important;
        border-radius: 10px !important;
        color: var(--halo-color-text-primary, #071826) !important;
        font: 700 0.95rem/1.25 var(--halo-font-sans, Inter, system-ui, sans-serif) !important;
        text-decoration: none !important;
      }

      .workbench-drawer__link:hover,
      .workbench-drawer__link:focus-visible {
        background: var(--halo-color-surface-muted, #f2f6f8) !important;
        color: var(--halo-color-link, #2f93f3) !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize drawer when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      normalizeHaloChrome();
      initV3MobileNav();
      initWorkbenchDrawer();
    });
  } else {
    normalizeHaloChrome();
    initV3MobileNav();
    initWorkbenchDrawer();
  }
})();
