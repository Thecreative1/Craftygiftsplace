document.documentElement.classList.add("js-ready");

document.addEventListener("DOMContentLoaded", () => {
  const pageLang = (document.documentElement.lang || "en").toLowerCase();
  const isDutch = pageLang.startsWith("nl");
  const labels = {
    openMenu: isDutch ? "Open het menu" : "Open the menu",
    closeMenu: isDutch ? "Sluit het menu" : "Close the menu",
  };
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
