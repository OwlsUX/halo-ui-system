(function () {
  const cart = new Map();
  const compare = new Map();
  const filters = {
    family: "all",
    compat: new Set(),
    query: "",
  };

  const money = (value) => `$${Number(value || 0).toLocaleString("en-US")}`;
  const keyFor = (item) => [item.id, item.variant || "default"].join("::");
  const cartDrawer = document.querySelector("[data-cart-drawer]");
  const cartOverlay = document.querySelector("[data-cart-overlay]");
  const cartItems = document.querySelector("[data-cart-items]");
  const cartSubtotal = document.querySelector("[data-cart-subtotal]");
  const cartTotal = document.querySelector("[data-cart-total]");
  const cartCount = document.querySelector("[data-cart-count]");

  function openCart() {
    cartDrawer?.classList.add("is-open");
    cartOverlay?.classList.add("is-open");
    document.body.classList.add("mc-cart-open");
  }

  function closeCart() {
    cartDrawer?.classList.remove("is-open");
    cartOverlay?.classList.remove("is-open");
    document.body.classList.remove("mc-cart-open");
  }

  function addItem(item) {
    const lineKey = keyFor(item);
    const existing = cart.get(lineKey);
    const quantity = Number(item.quantity || 1);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.set(lineKey, {
        id: item.id,
        title: item.title,
        variant: item.variant || "",
        price: Number(item.price || 0),
        image: item.image,
        quantity,
      });
    }
    renderCart();
    openCart();
  }

  function cartTotals() {
    let count = 0;
    let subtotal = 0;
    cart.forEach((item) => {
      count += item.quantity;
      subtotal += item.price * item.quantity;
    });
    return { count, subtotal };
  }

  function renderCart() {
    const { count, subtotal } = cartTotals();

    if (cartCount) {
      cartCount.textContent = String(count);
      cartCount.classList.toggle("has-items", count > 0);
    }

    if (cartSubtotal) cartSubtotal.textContent = money(subtotal);
    if (cartTotal) cartTotal.textContent = money(subtotal);

    if (!cartItems) return;
    if (cart.size === 0) {
      cartItems.innerHTML = '<div class="mc-cart-empty">Your accessory cart is empty. Quick add a Beacon, charger, strap, or bundle to review the drawer state.</div>';
      return;
    }

    cartItems.innerHTML = Array.from(cart.entries())
      .map(([lineKey, item]) => `
        <article class="mc-cart-item">
          <img src="${item.image}" alt="">
          <div>
            <h3>${item.title}</h3>
            <p>${item.variant || "Ships in 2-4 business days"}</p>
            <div class="mc-cart-item__bottom">
              <div class="mc-stepper" aria-label="Quantity for ${item.title}">
                <button type="button" data-cart-dec="${lineKey}" ${item.quantity <= 1 ? "disabled" : ""}>-</button>
                <span>${item.quantity}</span>
                <button type="button" data-cart-inc="${lineKey}">+</button>
              </div>
              <strong>${money(item.price * item.quantity)}</strong>
            </div>
            <button type="button" class="mc-btn mc-btn--ghost mc-btn--sm" data-cart-remove="${lineKey}">Remove</button>
          </div>
        </article>
      `)
      .join("");
  }

  function itemFromButton(button) {
    return {
      id: button.dataset.productId,
      title: button.dataset.productTitle,
      price: Number(button.dataset.productPrice || 0),
      image: button.dataset.productImage,
      variant: button.dataset.productVariant || "",
      quantity: Number(button.dataset.productQuantity || 1),
    };
  }

  document.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-add-to-cart]");
    if (addButton) {
      const item = itemFromButton(addButton);
      if (!item.id) return;
      addItem(item);
      const original = addButton.textContent;
      addButton.textContent = "Added";
      window.setTimeout(() => {
        addButton.textContent = original || "Add";
      }, 1100);
      return;
    }

    const cartOpen = event.target.closest("[data-cart-open]");
    if (cartOpen) {
      openCart();
      return;
    }

    if (event.target.closest("[data-cart-close]") || event.target.closest("[data-cart-overlay]")) {
      closeCart();
      return;
    }

    const remove = event.target.closest("[data-cart-remove]");
    if (remove) {
      cart.delete(remove.dataset.cartRemove);
      renderCart();
      return;
    }

    const inc = event.target.closest("[data-cart-inc]");
    if (inc) {
      const item = cart.get(inc.dataset.cartInc);
      if (item) item.quantity += 1;
      renderCart();
      return;
    }

    const dec = event.target.closest("[data-cart-dec]");
    if (dec) {
      const item = cart.get(dec.dataset.cartDec);
      if (item && item.quantity > 1) item.quantity -= 1;
      renderCart();
      return;
    }

    const accordion = event.target.closest("[data-accordion-button]");
    if (accordion) {
      const item = accordion.closest(".mc-accordion-item");
      item?.classList.toggle("is-open");
      accordion.setAttribute("aria-expanded", item?.classList.contains("is-open") ? "true" : "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeCart();
  });

  function setupFilters() {
    const cards = Array.from(document.querySelectorAll("[data-product-card]"));
    const count = document.querySelector("[data-products-count]");
    if (!cards.length) return;

    function renderFilters() {
      let visible = 0;
      cards.forEach((card) => {
        const familyMatch = filters.family === "all" || card.dataset.family === filters.family;
        const compatValues = (card.dataset.compat || "").split(/\s+/).filter(Boolean);
        const compatMatch = filters.compat.size === 0 || compatValues.some((value) => filters.compat.has(value));
        const queryMatch = !filters.query || (card.dataset.search || card.innerText).toLowerCase().includes(filters.query);
        const show = familyMatch && compatMatch && queryMatch;
        card.classList.toggle("is-hidden", !show);
        if (show) visible += 1;
      });
      if (count) count.textContent = `${visible} products shown`;
    }

    document.querySelectorAll("[data-filter-family]").forEach((button) => {
      button.addEventListener("click", () => {
        filters.family = button.dataset.filterFamily || "all";
        document.querySelectorAll("[data-filter-family]").forEach((node) => {
          node.classList.toggle("is-active", node.dataset.filterFamily === filters.family);
        });
        renderFilters();
      });
    });

    document.querySelectorAll("[data-compat-filter]").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) filters.compat.add(checkbox.value);
        else filters.compat.delete(checkbox.value);
        renderFilters();
      });
    });

    const search = document.querySelector("[data-product-search]");
    search?.addEventListener("input", () => {
      filters.query = search.value.trim().toLowerCase();
      renderFilters();
    });

    document.querySelector("[data-reset-filters]")?.addEventListener("click", () => {
      filters.family = "all";
      filters.compat.clear();
      filters.query = "";
      if (search) search.value = "";
      document.querySelectorAll("[data-compat-filter]").forEach((node) => {
        node.checked = false;
      });
      document.querySelectorAll("[data-filter-family]").forEach((node) => {
        node.classList.toggle("is-active", node.dataset.filterFamily === "all");
      });
      renderFilters();
    });

    renderFilters();
  }

  function setupCompare() {
    const tray = document.querySelector("[data-compare-tray]");
    const list = document.querySelector("[data-compare-list]");
    const count = document.querySelector("[data-compare-count]");
    if (!tray) return;

    function renderCompare() {
      const items = Array.from(compare.values());
      tray.classList.toggle("is-open", items.length > 0);
      if (list) list.textContent = items.length ? items.map((item) => item.title).join(" vs. ") : "";
      if (count) count.textContent = `${items.length}/3 selected`;
      document.querySelectorAll("[data-product-card]").forEach((card) => {
        card.classList.toggle("is-compare", compare.has(card.dataset.productId));
      });
    }

    document.querySelectorAll("[data-compare-product]").forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest("[data-product-card]");
        if (!card) return;
        const id = card.dataset.productId;
        if (compare.has(id)) {
          compare.delete(id);
          button.textContent = "Compare";
        } else if (compare.size < 3) {
          compare.set(id, { title: card.dataset.productTitle || card.querySelector("h3")?.textContent || id });
          button.textContent = "Selected";
        }
        renderCompare();
      });
    });

    document.querySelector("[data-compare-clear]")?.addEventListener("click", () => {
      compare.clear();
      document.querySelectorAll("[data-compare-product]").forEach((button) => {
        button.textContent = "Compare";
      });
      renderCompare();
    });
  }

  function setupGallery() {
    const hero = document.querySelector("[data-gallery-main]");
    if (!hero) return;

    document.querySelectorAll("[data-gallery-thumb]").forEach((thumb) => {
      thumb.addEventListener("click", () => {
        document.querySelectorAll("[data-gallery-thumb]").forEach((node) => node.classList.remove("is-active"));
        thumb.classList.add("is-active");
        if (thumb.dataset.image) hero.src = thumb.dataset.image;
        if (thumb.dataset.alt) hero.alt = thumb.dataset.alt;
      });
    });
  }

  function setupPdpBuyStack() {
    const buyStack = document.querySelector("[data-accessory-buy-stack]");
    if (!buyStack) return;

    const state = {
      id: buyStack.dataset.productId,
      title: buyStack.dataset.productTitle,
      price: Number(buyStack.dataset.productPrice || 0),
      listPrice: Number(buyStack.dataset.productListPrice || 0),
      variant: buyStack.dataset.productVariant || "",
      image: buyStack.dataset.productImage,
      quantity: 1,
    };

    const price = document.querySelector("[data-pdp-price]");
    const listPrice = document.querySelector("[data-pdp-list-price]");
    const variantLabels = document.querySelectorAll("[data-selected-variant]");
    const qty = document.querySelector("[data-pdp-qty]");
    const cta = document.querySelector("[data-pdp-add]");
    const stickyPrice = document.querySelector("[data-mobile-price]");
    const stickyVariant = document.querySelector("[data-mobile-variant]");

    function renderBuyStack() {
      if (price) price.textContent = money(state.price * state.quantity);
      if (listPrice) listPrice.textContent = state.listPrice ? money(state.listPrice * state.quantity) : "";
      variantLabels.forEach((label) => {
        label.textContent = state.variant;
      });
      if (qty) qty.textContent = String(state.quantity);
      if (stickyPrice) stickyPrice.textContent = money(state.price * state.quantity);
      if (stickyVariant) stickyVariant.textContent = state.variant;
      if (cta) {
        cta.dataset.productId = state.id;
        cta.dataset.productTitle = state.title;
        cta.dataset.productPrice = String(state.price);
        cta.dataset.productImage = state.image;
        cta.dataset.productVariant = state.variant;
        cta.dataset.productQuantity = String(state.quantity);
      }
      document.querySelectorAll("[data-mobile-add]").forEach((button) => {
        button.dataset.productId = state.id;
        button.dataset.productTitle = state.title;
        button.dataset.productPrice = String(state.price);
        button.dataset.productImage = state.image;
        button.dataset.productVariant = state.variant;
        button.dataset.productQuantity = String(state.quantity);
      });
    }

    document.querySelectorAll("[data-variant-option]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-variant-option]").forEach((node) => node.classList.remove("is-active"));
        button.classList.add("is-active");
        state.id = button.dataset.productId || state.id;
        state.title = button.dataset.productTitle || state.title;
        state.price = Number(button.dataset.productPrice || state.price);
        state.listPrice = Number(button.dataset.productListPrice || state.listPrice);
        state.variant = button.dataset.productVariant || state.variant;
        state.image = button.dataset.productImage || state.image;

        const hero = document.querySelector("[data-gallery-main]");
        if (hero && state.image) {
          hero.src = state.image;
          hero.alt = state.title;
        }
        renderBuyStack();
      });
    });

    document.querySelector("[data-pdp-dec]")?.addEventListener("click", () => {
      state.quantity = Math.max(1, state.quantity - 1);
      renderBuyStack();
    });

    document.querySelector("[data-pdp-inc]")?.addEventListener("click", () => {
      state.quantity = Math.min(10, state.quantity + 1);
      renderBuyStack();
    });

    renderBuyStack();
  }

  setupFilters();
  setupCompare();
  setupGallery();
  setupPdpBuyStack();
  renderCart();
})();
