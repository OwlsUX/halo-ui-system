(function () {
  var STORAGE_KEY = 'haloPackPerksAccountBannerDismissed';

  function getDismissed() {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === '1';
    } catch (error) {
      return false;
    }
  }

  function setDismissed() {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch (error) {
      // The in-session remove behavior still works if storage is unavailable.
    }
  }

  function init() {
    var banners = document.querySelectorAll('[data-pp-dismissible]');
    var dismissButtons = document.querySelectorAll('[data-pp-banner-dismiss]');

    if (getDismissed()) {
      banners.forEach(function (banner) {
        banner.remove();
      });
      return;
    }

    dismissButtons.forEach(function (button) {
      if (button.dataset.bound === '1') return;
      button.dataset.bound = '1';

      button.addEventListener('click', function () {
        var banner = button.closest('[data-pp-dismissible]');
        if (!banner) return;
        setDismissed();
        banner.remove();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
