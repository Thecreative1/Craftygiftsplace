/**
 * Gift Finder — Craftygiftsplace
 *
 * Loads product data, renders result cards, and handles filter interactions.
 * All filtering runs in the browser — no server calls required.
 *
 * TODO (Etsy sync): Replace the local JSON fetch below with a call to a
 * server-side endpoint that proxies the Etsy Listings API and returns data
 * in the same schema as /data/gift-finder-products.en.json.
 * Example future endpoint: /api/en/gift-finder-products
 */

(function () {
  "use strict";

  // ── Budget bracket helper ─────────────────────────────────────────────────

  /** Derives a budget key from a numeric price. Must stay in sync with
   *  the filter button data-values in gift-finder.html. */
  function getBudgetBracket(price) {
    if (price < 20) return "under-20";
    if (price < 35) return "20-35";
    return "35-plus";
  }

  // ── Filter state ─────────────────────────────────────────────────────────

  /** One active value per dimension; null means "show all". */
  const activeFilters = {
    recipient: null,
    occasion: null,
    budget: null,
    style: null,
    personalizable: null,
  };

  let allProducts = [];

  // ── DOM references ────────────────────────────────────────────────────────

  const grid     = document.getElementById("gf-grid");
  const empty    = document.getElementById("gf-empty");
  const countEl  = document.getElementById("gf-count");

  // ── Filtering logic ───────────────────────────────────────────────────────

  /**
   * Returns products that pass ALL active filters.
   * Within each dimension the filter is an exact or array-inclusion match.
   * A null filter dimension means "no restriction".
   */
  function filterProducts(products) {
    return products.filter(function (p) {
      const budget = getBudgetBracket(p.price);

      if (activeFilters.recipient && !p.recipient.includes(activeFilters.recipient)) {
        return false;
      }
      if (activeFilters.occasion && !p.occasion.includes(activeFilters.occasion)) {
        return false;
      }
      if (activeFilters.budget && budget !== activeFilters.budget) {
        return false;
      }
      if (activeFilters.style && !p.style.includes(activeFilters.style)) {
        return false;
      }
      // personalizable filter value is stored as the string "true" or "false"
      if (
        activeFilters.personalizable !== null &&
        String(p.personalizable) !== activeFilters.personalizable
      ) {
        return false;
      }

      return true;
    });
  }

  // ── Card rendering ────────────────────────────────────────────────────────

  function formatPrice(price, currency) {
    return currency + "\u00a0" + price.toFixed(2);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderCard(p) {
    const priceLabel   = formatPrice(p.price, p.currency);
    const titleEsc     = escapeHtml(p.title);
    const descEsc      = escapeHtml(p.short_description);
    const chips        = p.tags.slice(0, 2);

    const chipHtml = chips
      .map(function (t) {
        return '<span class="chip">' + escapeHtml(t) + "</span>";
      })
      .join("");

    const personalChip = p.personalizable
      ? '<span class="chip chip--personal">Personalizable</span>'
      : "";

    return (
      '<article class="gf-card" role="listitem">' +
        '<div class="gf-card-media">' +
          "<img" +
          ' src="' + escapeHtml(p.image) + '"' +
          ' alt="' + titleEsc + " by Craftygiftsplace" + '"' +
          ' width="600" height="600"' +
          ' loading="lazy" decoding="async" referrerpolicy="no-referrer"' +
          " />" +
        "</div>" +
        '<div class="gf-card-body">' +
          '<div class="gf-card-chips">' + chipHtml + personalChip + "</div>" +
          '<h2 class="gf-card-title">' + titleEsc + "</h2>" +
          '<p class="gf-card-desc">' + descEsc + "</p>" +
          '<div class="gf-card-footer">' +
            '<span class="gf-card-price">' + priceLabel + "</span>" +
            '<a class="btn gf-card-cta"' +
              ' href="' + escapeHtml(p.url) + '"' +
              ' target="_blank" rel="noopener"' +
              ' aria-label="View ' + titleEsc + ' on Etsy">' +
              "View on Etsy" +
            "</a>" +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  // ── Render results ────────────────────────────────────────────────────────

  function render() {
    const matches = filterProducts(allProducts);

    if (countEl) {
      countEl.textContent = matches.length;
    }

    if (matches.length === 0) {
      grid.innerHTML = "";
      empty.hidden   = false;
    } else {
      empty.hidden   = true;
      grid.innerHTML = matches.map(renderCard).join("");
    }
  }

  // ── Reset helper ──────────────────────────────────────────────────────────

  function resetAll() {
    Object.keys(activeFilters).forEach(function (k) {
      activeFilters[k] = null;
    });
    document.querySelectorAll(".gf-filter-btn").forEach(function (b) {
      b.classList.remove("is-active");
      b.setAttribute("aria-pressed", "false");
    });
    render();
  }

  // ── Filter button wiring ──────────────────────────────────────────────────

  function initFilters() {
    document.querySelectorAll(".gf-filter-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var dim = btn.dataset.filter;
        var val = btn.dataset.value;

        if (activeFilters[dim] === val) {
          // Clicking an active button clears that dimension
          activeFilters[dim] = null;
          btn.classList.remove("is-active");
          btn.setAttribute("aria-pressed", "false");
        } else {
          // Deactivate any previously active button in this dimension
          document
            .querySelectorAll('.gf-filter-btn[data-filter="' + dim + '"]')
            .forEach(function (b) {
              b.classList.remove("is-active");
              b.setAttribute("aria-pressed", "false");
            });

          activeFilters[dim] = val;
          btn.classList.add("is-active");
          btn.setAttribute("aria-pressed", "true");
        }

        render();
      });
    });

    // Wire all reset buttons (panel button + empty-state button)
    document.querySelectorAll(".gf-reset").forEach(function (btn) {
      btn.addEventListener("click", resetAll);
    });
  }

  // ── Bootstrap ─────────────────────────────────────────────────────────────

  /**
   * TODO (Etsy sync): When live sync is enabled, replace this fetch URL with
   * your server-side endpoint. The response must be a JSON array matching the
   * gift-finder-products.en.json schema. Example:
   *
   *   fetch("/api/en/gift-finder-products")
   */
  fetch("/data/gift-finder-products.en.json")
    .then(function (res) {
      if (!res.ok) {
        throw new Error("HTTP " + res.status);
      }
      return res.json();
    })
    .then(function (data) {
      allProducts = data;
      initFilters();
      render();
    })
    .catch(function (err) {
      console.error("[GiftFinder] Could not load product data:", err);
      // Show empty state gracefully rather than leaving the grid blank
      if (countEl) countEl.textContent = "0";
      if (grid)    grid.innerHTML = "";
      if (empty)   empty.hidden = false;
    });
})();
