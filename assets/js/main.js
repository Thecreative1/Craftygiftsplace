document.documentElement.classList.add("js-ready");

document.addEventListener("DOMContentLoaded", () => {
  const mediaShapeRules = {
    portrait: 0.9,
    wide: 1.25,
    panorama: 1.75
  };
  const pageLang = (document.documentElement.lang || "en").toLowerCase();
  const locale = pageLang.split("-")[0];
  const localizedLabels = {
    nl: {
      openMenu: "Open het menu",
      closeMenu: "Sluit het menu"
    },
    en: {
      openMenu: "Open the menu",
      closeMenu: "Close the menu"
    },
    de: {
      openMenu: "Menü öffnen",
      closeMenu: "Menü schließen"
    },
    fr: {
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu"
    },
    es: {
      openMenu: "Abrir el menú",
      closeMenu: "Cerrar el menú"
    },
    pt: {
      openMenu: "Abrir o menu",
      closeMenu: "Fechar o menu"
    },
    it: {
      openMenu: "Apri il menu",
      closeMenu: "Chiudi il menu"
    }
  };
  const labels = localizedLabels[locale] || localizedLabels.en;
  const currentPath = window.location.pathname.replace(/\\/g, "/");
  const currentPage = currentPath.endsWith("/")
    ? "index.html"
    : currentPath.split("/").pop() || "index.html";
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const mobileQuery = window.matchMedia("(max-width: 860px)");

  document.querySelectorAll("[data-page]").forEach((link) => {
    if (link.getAttribute("data-page") === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });

  const applyMediaShape = (target, frameResolver) => {
    const frame = frameResolver(target);

    if (!frame || !target.naturalWidth || !target.naturalHeight) {
      return;
    }

    const ratio = target.naturalWidth / target.naturalHeight;
    let shape = "balanced";

    if (ratio <= mediaShapeRules.portrait) {
      shape = "portrait";
    } else if (ratio >= mediaShapeRules.panorama) {
      shape = "panorama";
    } else if (ratio >= mediaShapeRules.wide) {
      shape = "wide";
    }

    frame.dataset.mediaShape = shape;
  };

  const observeMediaShape = (selector, frameResolver) => {
    document.querySelectorAll(selector).forEach((target) => {
      if (target.complete) {
        applyMediaShape(target, frameResolver);
        return;
      }

      target.addEventListener("load", () => {
        applyMediaShape(target, frameResolver);
      }, { once: true });
    });
  };

  observeMediaShape(".product-card .card-media img", (target) => target.closest(".card-media"));
  observeMediaShape(".home-category-media img", (target) => target.closest(".home-category-media"));
  observeMediaShape(".listing-photo", (target) => target.closest(".copy-card"));

  if (!navToggle || !navLinks) {
    return;
  }

  const closeMenu = () => {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", labels.openMenu);
    navLinks.classList.remove("is-open");
  };

  const syncMenuState = () => {
    if (!mobileQuery.matches) {
      closeMenu();
    }
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    const nextState = !isOpen;
    navToggle.setAttribute("aria-expanded", String(nextState));
    navToggle.setAttribute("aria-label", nextState ? labels.closeMenu : labels.openMenu);
    navLinks.classList.toggle("is-open", nextState);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileQuery.matches) {
        closeMenu();
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", syncMenuState);
  } else if (typeof mobileQuery.addListener === "function") {
    mobileQuery.addListener(syncMenuState);
  }

  syncMenuState();
});
