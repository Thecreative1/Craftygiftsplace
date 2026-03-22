document.documentElement.classList.add("js-ready");

document.addEventListener("DOMContentLoaded", () => {
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
