(function () {
  function setSelectedThumb(gallery, thumb, shouldFocus) {
    const featured = gallery.querySelector("[data-gallery-featured]");
    const emptyState = gallery.querySelector("[data-gallery-empty]");
    const thumbs = Array.from(gallery.querySelectorAll("[data-gallery-thumb]"));
    const nextSrc = thumb.dataset.gallerySrc;
    const nextAlt = thumb.dataset.galleryAlt || "";
    const nextLabel = thumb.dataset.galleryLabel || nextAlt || "Product image";

    thumbs.forEach((entry) => {
      const isCurrent = entry === thumb;
      entry.classList.toggle("is-selected", isCurrent);
      entry.setAttribute("aria-pressed", String(isCurrent));
      if (isCurrent) entry.setAttribute("aria-current", "true");
      else entry.removeAttribute("aria-current");
    });

    if (featured && featured.tagName === "IMG" && nextSrc) {
      featured.src = nextSrc;
      featured.alt = nextAlt;
    } else if (emptyState) {
      emptyState.textContent = nextLabel;
    }

    if (shouldFocus) thumb.focus();
  }

  function moveThumbFocus(gallery, currentThumb, direction) {
    const thumbs = Array.from(gallery.querySelectorAll("[data-gallery-thumb]"));
    const index = thumbs.indexOf(currentThumb);
    if (index === -1) return;

    let nextIndex = index;
    if (direction === "next") nextIndex = (index + 1) % thumbs.length;
    if (direction === "previous") nextIndex = (index - 1 + thumbs.length) % thumbs.length;
    if (direction === "first") nextIndex = 0;
    if (direction === "last") nextIndex = thumbs.length - 1;

    setSelectedThumb(gallery, thumbs[nextIndex], true);
  }

  function initGallery(gallery) {
    const thumbs = Array.from(gallery.querySelectorAll("[data-gallery-thumb]"));
    if (!thumbs.length) return;

    if (thumbs.length === 1) gallery.classList.add("is-single-image");

    thumbs.forEach((thumb, index) => {
      thumb.setAttribute("aria-pressed", index === 0 ? "true" : "false");
      if (index === 0 && !thumb.hasAttribute("aria-current")) {
        thumb.setAttribute("aria-current", "true");
      }

      thumb.addEventListener("click", () => setSelectedThumb(gallery, thumb, false));
      thumb.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setSelectedThumb(gallery, thumb, false);
          return;
        }

        const keys = {
          ArrowRight: "next",
          ArrowDown: "next",
          ArrowLeft: "previous",
          ArrowUp: "previous",
          Home: "first",
          End: "last"
        };
        const direction = keys[event.key];
        if (!direction) return;
        event.preventDefault();
        moveThumbFocus(gallery, thumb, direction);
      });
    });
  }

  function clampQuantity(input) {
    const value = Number.parseInt(input.value, 10);
    if (!Number.isFinite(value) || value < 1) return 1;
    return Math.min(value, 99);
  }

  function initQuantity(control) {
    const input = control.querySelector("[data-qty-input]");
    const decrement = control.querySelector("[data-qty-dec]");
    const increment = control.querySelector("[data-qty-inc]");
    if (!input || !decrement || !increment) return;

    const sync = (nextValue) => {
      input.value = String(nextValue);
      decrement.disabled = nextValue <= 1;
    };

    decrement.addEventListener("click", () => sync(Math.max(1, clampQuantity(input) - 1)));
    increment.addEventListener("click", () => sync(Math.min(99, clampQuantity(input) + 1)));
    input.addEventListener("change", () => sync(clampQuantity(input)));
    sync(clampQuantity(input));
  }

  function initAddToCart(button) {
    const productRoot = button.closest("[data-accessory-pdp]");
    const status = productRoot?.querySelector("[data-cart-status]");
    const input = productRoot?.querySelector("[data-qty-input]");
    const productName = button.dataset.productName || "Accessory";

    button.addEventListener("click", () => {
      if (button.disabled || button.getAttribute("aria-disabled") === "true") return;
      const quantity = input ? clampQuantity(input) : 1;
      const label = quantity === 1 ? productName : `${quantity} x ${productName}`;
      if (status) {
        status.hidden = false;
        status.textContent = `Added ${label} to cart.`;
      }

      document.querySelectorAll(".main-nav-cart[data-total]").forEach((cartButton) => {
        cartButton.classList.add("active");
        cartButton.setAttribute("data-total", String(quantity));
      });
      document.querySelectorAll("[data-cart-count]").forEach((cartCount) => {
        cartCount.textContent = String(quantity);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-accessory-gallery]").forEach(initGallery);
    document.querySelectorAll("[data-quantity-control]").forEach(initQuantity);
    document.querySelectorAll("[data-add-to-cart]").forEach(initAddToCart);
  });
})();
