document.documentElement.classList.add("js-ready");

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname.replace(/\\/g, "/");
  const currentPage = currentPath.endsWith("/")
    ? "index.html"
    : currentPath.split("/").pop() || "index.html";
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const mobileQuery = window.matchMedia("(max-width: 860px)");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const coarsePointerQuery = window.matchMedia("(pointer: coarse)");

  const initCarousel = () => {
    const carousel = document.querySelector("[data-carousel]");

    if (!carousel) {
      return;
    }

    const viewport = carousel.querySelector("[data-carousel-viewport]");
    const track = carousel.querySelector("[data-carousel-track]");
    const prevButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    const dots = carousel.querySelector("[data-carousel-dots]");
    const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
    let autoScrollId = 0;
    let currentIndex = 0;
    let pageCount = 1;
    let isInViewport = true;
    let touchStartX = 0;
    let touchDeltaX = 0;

    if (!viewport || !track || slides.length === 0) {
      return;
    }

    const getSlidesPerView = () => {
      const value = Number.parseInt(
        window.getComputedStyle(carousel).getPropertyValue("--carousel-slides-per-view"),
        10,
      );

      return Number.isNaN(value) || value < 1 ? 1 : value;
    };

    const getStepSize = () => {
      const firstCard = slides[0];

      if (!firstCard) {
        return viewport.clientWidth;
      }

      const carouselStyles = window.getComputedStyle(track);
      const gap = Number.parseFloat(carouselStyles.columnGap || carouselStyles.gap || "0");
      return firstCard.getBoundingClientRect().width + gap;
    };

    const getPageCount = () => Math.max(1, slides.length - getSlidesPerView() + 1);

    const renderDots = () => {
      if (!dots) {
        return;
      }

      dots.innerHTML = "";

      for (let index = 0; index < pageCount; index += 1) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", `Ga naar slide ${index + 1}`);
        dot.setAttribute("aria-current", index === currentIndex ? "true" : "false");
        dot.addEventListener("click", () => {
          currentIndex = index;
          updateCarousel();
          startAutoScroll();
        });
        dots.append(dot);
      }
    };

    const stopAutoScroll = () => {
      if (autoScrollId) {
        window.clearInterval(autoScrollId);
        autoScrollId = 0;
      }
    };

    const canAutoScroll = () =>
      pageCount > 1 &&
      !document.hidden &&
      !reducedMotionQuery.matches &&
      !coarsePointerQuery.matches &&
      isInViewport;

    const startAutoScroll = () => {
      stopAutoScroll();

      if (!canAutoScroll()) {
        return;
      }

      autoScrollId = window.setInterval(() => {
        currentIndex = (currentIndex + 1) % pageCount;
        updateCarousel();
      }, 4500);
    };

    const updateCarousel = () => {
      pageCount = getPageCount();
      currentIndex = Math.max(0, Math.min(currentIndex, pageCount - 1));
      track.style.transform = `translateX(-${currentIndex * getStepSize()}px)`;

      if (dots) {
        const dotButtons = dots.querySelectorAll(".carousel-dot");

        if (dotButtons.length !== pageCount) {
          renderDots();
        } else {
          dotButtons.forEach((dot, index) => {
            dot.setAttribute("aria-current", index === currentIndex ? "true" : "false");
          });
        }
      }
    };

    const moveCarousel = (direction) => {
      currentIndex = (currentIndex + direction + pageCount) % pageCount;
      updateCarousel();
    };

    prevButton?.addEventListener("click", () => {
      moveCarousel(-1);
      startAutoScroll();
    });

    nextButton?.addEventListener("click", () => {
      moveCarousel(1);
      startAutoScroll();
    });

    viewport.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveCarousel(-1);
        startAutoScroll();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveCarousel(1);
        startAutoScroll();
      }
    });

    viewport.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0].clientX;
      touchDeltaX = 0;
      stopAutoScroll();
    }, { passive: true });

    viewport.addEventListener("touchmove", (event) => {
      touchDeltaX = event.changedTouches[0].clientX - touchStartX;
    }, { passive: true });

    viewport.addEventListener("touchend", () => {
      if (Math.abs(touchDeltaX) > 50) {
        moveCarousel(touchDeltaX < 0 ? 1 : -1);
      }

      startAutoScroll();
    }, { passive: true });

    [carousel, viewport, prevButton, nextButton].forEach((node) => {
      node?.addEventListener("mouseenter", stopAutoScroll);
      node?.addEventListener("mouseleave", startAutoScroll);
      node?.addEventListener("focusin", stopAutoScroll);
      node?.addEventListener("focusout", startAutoScroll);
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          isInViewport = entries[0]?.isIntersecting ?? true;

          if (isInViewport) {
            startAutoScroll();
          } else {
            stopAutoScroll();
          }
        },
        {
          threshold: 0.35,
        },
      );

      observer.observe(carousel);
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopAutoScroll();
      } else {
        startAutoScroll();
      }
    });

    const syncCarouselState = () => {
      updateCarousel();
      startAutoScroll();
    };

    [reducedMotionQuery, coarsePointerQuery].forEach((query) => {
      if (typeof query.addEventListener === "function") {
        query.addEventListener("change", syncCarouselState);
      } else if (typeof query.addListener === "function") {
        query.addListener(syncCarouselState);
      }
    });

    window.addEventListener("resize", () => {
      updateCarousel();
      startAutoScroll();
    });

    updateCarousel();
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
