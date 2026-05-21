(function () {
  const state = {
    color: "Ivory",
    basePrice: 524,
    addons: new Map(),
    membership: "Silver",
  };

  const galleryImage = document.querySelector("[data-gallery-main]");
  const colorLabel = document.querySelector("[data-color-label]");
  const priceEl = document.querySelector("[data-price]");
  const cartSummary = document.querySelector("[data-cart-summary]");

  function dollars(value) {
    return `$${value.toLocaleString()}`;
  }

  function total() {
    let addons = 0;
    state.addons.forEach((price) => {
      addons += price;
    });
    return state.basePrice + addons;
  }

  function render() {
    if (colorLabel) colorLabel.textContent = state.color;
    if (priceEl) priceEl.textContent = dollars(total());
    if (cartSummary) {
      const addOnCount = state.addons.size;
      cartSummary.textContent = `Halo Collar 5 in ${state.color}, ${state.membership} membership, ${addOnCount} add-on${addOnCount === 1 ? "" : "s"}. Estimated total ${dollars(total())}.`;
    }
  }

  document.querySelectorAll("[data-swatch]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-swatch]").forEach((swatch) => swatch.classList.remove("is-active"));
      button.classList.add("is-active");
      state.color = button.dataset.swatch || state.color;
      if (galleryImage && button.dataset.image) galleryImage.src = button.dataset.image;
      render();
    });
  });

  document.querySelectorAll("[data-gallery-thumb]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-gallery-thumb]").forEach((thumb) => thumb.classList.remove("is-active"));
      button.classList.add("is-active");
      if (galleryImage && button.dataset.image) galleryImage.src = button.dataset.image;
    });
  });

  document.querySelectorAll("[data-addon]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".addon-card");
      const id = button.dataset.addon;
      const price = Number(button.dataset.price || 0);
      if (!id) return;
      if (state.addons.has(id)) {
        state.addons.delete(id);
        card?.classList.remove("is-selected");
        button.textContent = "Add";
      } else {
        state.addons.set(id, price);
        card?.classList.add("is-selected");
        button.textContent = "Remove";
      }
      render();
    });
  });

  document.querySelectorAll("[data-membership]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-membership]").forEach((plan) => plan.closest(".plan-card")?.classList.remove("is-selected"));
      button.closest(".plan-card")?.classList.add("is-selected");
      state.membership = button.dataset.membership || state.membership;
      render();
    });
  });

  document.querySelectorAll("[data-cart-open]").forEach((button) => {
    button.addEventListener("click", () => {
      render();
      document.querySelector(button.dataset.cartOpen || "#cartDrawer")?.classList.add("is-open");
    });
  });

  document.querySelectorAll("[data-cart-close]").forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".drawer")?.classList.remove("is-open");
    });
  });

  render();
})();
