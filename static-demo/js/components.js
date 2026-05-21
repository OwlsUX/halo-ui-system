(function () {
  const pagePath = window.location.pathname.replace(/\/index\.html$/, "/");

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
})();
