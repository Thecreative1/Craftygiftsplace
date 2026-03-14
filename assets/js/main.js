document.documentElement.classList.add("js-ready");

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname.replace(/\\/g, "/");
  const currentPage = currentPath.endsWith("/")
    ? "index.html"
    : currentPath.split("/").pop() || "index.html";
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const mobileQuery = window.matchMedia("(max-width: 860px)");

  const initCarousel = () => {
    const carousel = document.querySelector("[data-carousel]");

    if (!carousel) {
      return;
    }

    const prevButton = document.querySelector("[data-carousel-prev]");
    const nextButton = document.querySelector("[data-carousel-next]");
    let autoScrollId = 0;

    const getStepSize = () => {
      const firstCard = carousel.querySelector(".carousel-card");

      if (!firstCard) {
        return Math.max(carousel.clientWidth * 0.85, 240);
      }

      const carouselStyles = window.getComputedStyle(carousel);
      const gap = Number.parseFloat(carouselStyles.columnGap || carouselStyles.gap || "0");
      return firstCard.getBoundingClientRect().width + gap;
    };

    const scrollCarousel = (direction) => {
      carousel.scrollBy({
        left: getStepSize() * direction,
        behavior: "smooth",
      });
    };

    const stopAutoScroll = () => {
      if (autoScrollId) {
        window.clearInterval(autoScrollId);
        autoScrollId = 0;
      }
    };

    const startAutoScroll = () => {
      stopAutoScroll();

      if (carousel.scrollWidth <= carousel.clientWidth + 24) {
        return;
      }

      autoScrollId = window.setInterval(() => {
        const maxScrollLeft = Math.max(carousel.scrollWidth - carousel.clientWidth, 0);
        const nextScrollLeft = carousel.scrollLeft + getStepSize();
        const target = nextScrollLeft >= maxScrollLeft - 8 ? 0 : nextScrollLeft;

        carousel.scrollTo({
          left: target,
          behavior: "smooth",
        });
      }, 4500);
    };

    prevButton?.addEventListener("click", () => {
      scrollCarousel(-1);
      startAutoScroll();
    });

    nextButton?.addEventListener("click", () => {
      scrollCarousel(1);
      startAutoScroll();
    });

    carousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollCarousel(-1);
        startAutoScroll();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollCarousel(1);
        startAutoScroll();
      }
    });

    [carousel, prevButton, nextButton].forEach((node) => {
      node?.addEventListener("mouseenter", stopAutoScroll);
      node?.addEventListener("mouseleave", startAutoScroll);
      node?.addEventListener("focusin", stopAutoScroll);
      node?.addEventListener("focusout", startAutoScroll);
    });

    window.addEventListener("resize", startAutoScroll);
    startAutoScroll();
  };

  document.querySelectorAll("[data-page]").forEach((link) => {
    if (link.getAttribute("data-page") === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });

  initCarousel();

  if (!navToggle || !navLinks) {
    return;
  }

  const closeMenu = () => {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open het menu");
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
    navToggle.setAttribute("aria-label", nextState ? "Sluit het menu" : "Open het menu");
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
