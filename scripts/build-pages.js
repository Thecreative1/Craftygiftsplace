const {
  absoluteUrl,
  canonicalUrl,
  escapeAttribute,
  escapeHtml,
  hashString,
  loadTemplate,
  readJson,
  relativeUrl,
  renderTemplate,
  writeText,
  xDefaultPath
} = require("./lib/site");

const text = {
  en: {
    brandTagline: "Handmade wooden gifts with character",
    skipLink: "Skip to content",
    navAria: "Main menu",
    langSwitch: "Choose language",
    homeAria: "Go to the homepage",
    menu: "Menu",
    navToggle: "Open the menu",
    home: "Home",
    footerCollections: "Collections",
    footerIntents: "Gift ideas",
    footerTagline: "Handmade wooden gifts with warmth, detail and character.",
    footerNote: "Rated 4.96/5 on Etsy for thoughtful service, strong detail and gift-ready quality.",
    featuredHeading: "Best Picks",
    featuredIntro: "Start with these highlighted products and then continue into the collection below.",
    catalogHeading: "Browse the Collection",
    faqHeading: "Frequently Asked Questions",
    faqIntro: "Quick answers for visitors who want a faster decision path.",
    relatedHeading: "Related Collections",
    relatedIntro: "Keep exploring with these suggestions.",
    whyHeading: "Why Shoppers Love It",
    intentsHeading: "Shop by occasion",
    intentsIntro: "Start with the kind of gift you want to give.",
    collectionsHeading: "Browse by collection",
    collectionsIntro: "Prefer browsing by product type? Start with these core collections.",
    reviewsHeading: "Loved on Etsy",
    reviewsIntro: "A few short reviews that reinforce quality and trust."
  },
  nl: {
    brandTagline: "Handgemaakte houten cadeaus met karakter",
    skipLink: "Ga naar inhoud",
    navAria: "Hoofdmenu",
    langSwitch: "Kies taal",
    homeAria: "Ga naar de homepage",
    menu: "Menu",
    navToggle: "Open het menu",
    home: "Home",
    footerCollections: "Collecties",
    footerIntents: "Cadeau-ideeën",
    footerTagline: "Handgemaakte houten cadeaus met warmte, detail en karakter.",
    footerNote: "Beoordeeld met 4.96/5 op Etsy voor attente service, mooi detail en cadeauwaardige kwaliteit.",
    featuredHeading: "Beste Keuzes",
    featuredIntro: "Begin met deze uitgelichte producten en ga daarna verder in de collectie hieronder.",
    catalogHeading: "Bekijk de collectie",
    faqHeading: "Veelgestelde Vragen",
    faqIntro: "Korte antwoorden voor bezoekers die sneller willen kiezen.",
    relatedHeading: "Gerelateerde Collecties",
    relatedIntro: "Blader verder met deze suggesties.",
    whyHeading: "Waarom Bezoekers Dit Mooi Vinden",
    intentsHeading: "Shop per gelegenheid",
    intentsIntro: "Begin bij het soort cadeau dat je wilt geven.",
    collectionsHeading: "Blader per collectie",
    collectionsIntro: "Kijk je liever per producttype? Begin dan met deze hoofdcollecties.",
    reviewsHeading: "Geliefd op Etsy",
    reviewsIntro: "Een paar korte reviews die kwaliteit en vertrouwen versterken."
  }
};

const productCardTemplate = loadTemplate("product-card.html");
const faqTemplate = loadTemplate("faq.html");
const headTemplate = loadTemplate("head.html");
const headerTemplate = loadTemplate("header.html");
const footerTemplate = loadTemplate("footer.html");

function loadData() {
  const pagesEn = readJson("data/pages.en.json");
  const pagesNl = readJson("data/pages.nl.json");
  const productsEn = readJson("data/products.en.json");
  const productsNl = readJson("data/products.nl.json");

  const pages = [...pagesEn, ...pagesNl];
  return {
    pages,
    pagesByPath: new Map(pages.map((page) => [page.path, page])),
    productsByLocale: {
      en: new Map(productsEn.map((product) => [product.slug, product])),
      nl: new Map(productsNl.map((product) => [product.slug, product]))
    },
    productsListByLocale: {
      en: productsEn,
      nl: productsNl
    }
  };
}

function navItems(locale) {
  if (locale === "en") {
    return [
      { label: text.en.home, path: "/en/index.html" },
      { label: "Coasters", path: "/en/pages/wooden-coasters.html" },
      { label: "Bookmarks", path: "/en/pages/wooden-bookmarks.html" },
      { label: "Wooden gifts", path: "/en/pages/wooden-gifts.html" },
      { label: "Contact", path: "/en/pages/contact.html" }
    ];
  }

  return [
    { label: text.nl.home, path: "/index.html" },
    { label: "Onderzetters", path: "/pages/onderzetters.html" },
    { label: "Bladwijzers", path: "/pages/bladwijzers.html" },
    { label: "Houten cadeaus", path: "/pages/houten-cadeaus.html" },
    { label: "Contact", path: "/pages/contact.html" }
  ];
}

function footerCollections(locale) {
  return navItems(locale).slice(1, 4);
}

function footerIntents(locale) {
  if (locale === "en") {
    return [
      { label: "Cat lover gifts", path: "/en/pages/cat-lover-gifts.html" },
      { label: "Reader gifts", path: "/en/pages/reader-gifts.html" },
      { label: "Housewarming gifts", path: "/en/pages/housewarming-gifts.html" }
    ];
  }

  return [
    { label: "Cadeaus voor kattenliefhebbers", path: "/pages/cadeaus-voor-kattenliefhebbers.html" },
    { label: "Lezerscadeaus", path: "/pages/lezerscadeaus.html" },
    { label: "Verhuiscadeaus", path: "/pages/verhuiscadeaus.html" }
  ];
}

function getProduct(page, productsByLocale, slug) {
  const product = productsByLocale[page.locale].get(slug);
  if (!product) {
    throw new Error(`Unknown product slug "${slug}" for ${page.path}`);
  }
  return product;
}

function selectCatalogProducts(page, productsListByLocale) {
  if (!page.catalog) {
    return [];
  }

  const products = productsListByLocale[page.locale];
  if (page.catalog.mode === "category") {
    return products.filter((product) => product.category === page.catalog.category);
  }

  return page.catalog.slugs.map((slug) => {
    const product = products.find((item) => item.slug === slug);
    if (!product) {
      throw new Error(`Unknown product slug "${slug}" in ${page.path}`);
    }
    return product;
  });
}

function renderChips(product) {
  const chips = (product.chips || []).slice(0, 2);
  return chips.map((chip) => `<span class="chip">${escapeHtml(chip)}</span>`).join("");
}

function compactProductLead(product) {
  return String(product.name || "")
    .replace(/\bWooden Coasters?\b/gi, "")
    .replace(/\bHouten Onderzetters?\b/gi, "")
    .replace(/\bWooden Bookmark\b/gi, "")
    .replace(/\bHouten Bladwijzer\b/gi, "")
    .replace(/\bCoaster Set\b/gi, "")
    .replace(/\bOnderzetterset\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function buildCardDescription(product, page, position = 0) {
  const lead = compactProductLead(product);
  const usage = product.usage_context || (product.locale === "nl" ? "gezellige hoekjes in huis" : "cozy corners at home");
  const motif = product.motif || (product.locale === "nl" ? "een warme gravure" : "warm engraved detail");
  const benefit = product.benefit_primary || (product.locale === "nl" ? "voelt prettig in gebruik" : "feels easy to use");
  const audience = (product.audience && product.audience[0]) || (product.locale === "nl" ? "cadeauzoekers" : "gift shoppers");
  const occasion = (product.occasions && product.occasions[0]) || (product.locale === "nl" ? "kleine cadeaumomenten" : "easy gifting");
  const name = lead || product.name;
  const variants = product.locale === "nl"
    ? [
        `${name} brengt ${motif} naar ${usage}.`,
        `${name} is een warme keuze voor ${occasion} met ${motif}.`,
        `${name} houdt het praktisch en voegt tegelijk ${motif} toe.`,
        `${name} past mooi bij ${usage}.`,
        `${name} voegt ${motif} toe zonder te zwaar te voelen.`,
        `${name} is een makkelijke keuze voor ${occasion}.`,
        `${name} houdt de handgemaakte uitstraling warm en bruikbaar.`,
        `${name} voelt natuurlijk in ${usage}.`,
        `${name} geeft extra karakter via ${motif}.`,
        `${name} werkt goed wanneer een cadeau gezellig moet aanvoelen.`,
        `${name} houdt de styling eenvoudig, warm en makkelijk neer te zetten.`,
        `${name} past bij kopers die iets bruikbaars met persoonlijkheid zoeken.`
      ]
    : [
        `${name} brings ${motif} to ${usage}.`,
        `${name} is a warm ${occasion} pick with ${motif}.`,
        `${name} keeps things practical while adding ${motif}.`,
        `${name} feels right for ${usage}.`,
        `${name} adds ${motif} without feeling overdone.`,
        `${name} makes an easy pick for ${occasion}.`,
        `${name} keeps the handmade look warm and useful.`,
        `${name} fits naturally into ${usage}.`,
        `${name} adds extra character through ${motif}.`,
        `${name} works well when the gift needs a cozy feel.`,
        `${name} keeps the styling simple, warm and easy to place.`,
        `${name} suits shoppers who want something useful with personality.`
      ];

  return variants[position % variants.length];
}

function renderProductCard(product, page, position) {
  return renderTemplate(productCardTemplate, {
    image: escapeAttribute(product.image),
    imageSrcset: escapeAttribute(product.image_srcset || product.image),
    imageSizes: escapeAttribute(product.image_sizes),
    alt: escapeAttribute(product.alt),
    chips: renderChips(product),
    title: escapeHtml(product.name),
    description: escapeHtml(buildCardDescription(product, page, position)),
    ctaUrl: escapeAttribute(product.etsy_url),
    ctaLabel: escapeAttribute(product.cta_label)
  });
}

function renderFaq(faqItems) {
  return faqItems.map((item) => renderTemplate(faqTemplate, {
    question: escapeHtml(item.question),
    answer: escapeHtml(item.answer)
  })).join("\n");
}

function renderFeaturedCard(product, summary) {
  return `
    <article class="copy-card">
      <img class="listing-photo" src="${escapeAttribute(product.image)}" alt="${escapeAttribute(product.alt)}" width="600" height="600" loading="lazy" decoding="async" />
      <div class="product-meta">${renderChips(product)}</div>
      <h2>${escapeHtml(product.name)}</h2>
      <p>${escapeHtml(summary)}</p>
      <a class="btn" href="${escapeAttribute(product.etsy_url)}" target="_blank" rel="noopener">${escapeHtml(product.cta_label)}</a>
    </article>`;
}

function renderWhyCard(page, items) {
  return `
    <article class="copy-card">
      <h2>${escapeHtml(text[page.locale].whyHeading)}</h2>
      <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>`;
}

function renderLinkCloud(page) {
  if (!page.linkCloud || !page.linkCloud.length) return "";
  return `<div class="link-cloud">${page.linkCloud.map((link) => `<a href="${escapeAttribute(link.target.startsWith("#") ? link.target : relativeUrl(page.path, link.target))}">${escapeHtml(link.label)}</a>`).join("")}</div>`;
}

function renderBreadcrumbs(page) {
  if (!page.breadcrumbs || !page.breadcrumbs.length) return "";
  return `<div class="breadcrumbs">${page.breadcrumbs.map((item, index) => index === page.breadcrumbs.length - 1 ? escapeHtml(item.label) : `<a href="${escapeAttribute(relativeUrl(page.path, item.path))}">${escapeHtml(item.label)}</a>`).join(" / ")}</div>`;
}

function renderSidebar(page) {
  if (!page.sidebar) return "";
  return `
    <aside class="page-sidebar">
      <h2>${escapeHtml(page.sidebar.title)}</h2>
      <p>${escapeHtml(page.sidebar.quote)}</p>
      <p class="small-note">${escapeHtml(page.sidebar.attribution)}</p>
      <p>${escapeHtml(page.sidebar.text)}</p>
      <div class="quick-links">
        ${page.sidebar.links.map((link) => {
          const href = link.href.startsWith("http") ? link.href : relativeUrl(page.path, link.href);
          const attrs = link.href.startsWith("http") ? ' target="_blank" rel="noopener"' : "";
          return `<a href="${escapeAttribute(href)}"${attrs}>${escapeHtml(link.label)} <span>></span></a>`;
        }).join("")}
      </div>
    </aside>`;
}
function renderFeaturedSection(page, productsByLocale) {
  if (!page.featuredItems || !page.featuredItems.length) return "";
  const products = page.featuredItems.map((item) => ({ product: getProduct(page, productsByLocale, item.slug), summary: item.summary }));
  return `
    <section class="section" id="featured-products">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>${escapeHtml(text[page.locale].featuredHeading)}</h2>
            <p>${escapeHtml(text[page.locale].featuredIntro)}</p>
          </div>
          <a class="btn-secondary" href="#shop-catalog">${escapeHtml(page.secondaryCta ? page.secondaryCta.label : text[page.locale].catalogHeading)}</a>
        </div>
        <div class="copy-stack featured-copy-grid">
          ${products.map((item) => renderFeaturedCard(item.product, item.summary)).join("\n")}
          ${page.featuredWhy ? renderWhyCard(page, page.featuredWhy) : ""}
        </div>
      </div>
    </section>`;
}

function renderCatalogSection(page, catalogProducts) {
  if (!page.catalog) return "";
  return `
    <section class="section" id="shop-catalog">
      <div class="container">
        <div class="catalog-header">
          <div>
            <h2>${escapeHtml(text[page.locale].catalogHeading)}</h2>
            <p>${escapeHtml(page.catalog.intro)}</p>
          </div>
          <a class="btn" href="${escapeAttribute(page.catalog.ctaUrl)}" target="_blank" rel="noopener">${escapeHtml(page.catalog.ctaLabel)}</a>
        </div>
        <div class="product-grid catalog-grid">
          ${catalogProducts.map((product, index) => renderProductCard(product, page, index)).join("\n")}
        </div>
      </div>
    </section>`;
}

function renderFaqSection(page) {
  if (!page.faq || !page.faq.length) return "";
  return `
    <section class="section" id="faq">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>${escapeHtml(text[page.locale].faqHeading)}</h2>
            <p>${escapeHtml(text[page.locale].faqIntro)}</p>
          </div>
        </div>
        <div class="faq-grid">${renderFaq(page.faq)}</div>
      </div>
    </section>`;
}

function renderRelatedSection(page) {
  if (!page.relatedLinks || !page.relatedLinks.length) return "";
  return `
    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>${escapeHtml(text[page.locale].relatedHeading)}</h2>
            <p>${escapeHtml(text[page.locale].relatedIntro)}</p>
          </div>
        </div>
        <div class="copy-stack">
          ${page.relatedLinks.map((link) => `
            <article class="copy-card">
              <h2>${escapeHtml(link.label)}</h2>
              <p>${escapeHtml(link.description)}</p>
              <a class="btn" href="${escapeAttribute(relativeUrl(page.path, link.href))}">${escapeHtml(link.label)}</a>
            </article>`).join("\n")}
        </div>
      </div>
    </section>`;
}

function renderCtaPanel(page) {
  if (!page.ctaPanel) return "";
  return `
    <section class="section">
      <div class="container">
        <div class="cta-panel">
          <div>
            <h2>${escapeHtml(page.ctaPanel.title)}</h2>
            <p>${escapeHtml(page.ctaPanel.text)}</p>
          </div>
          <a class="btn" href="${escapeAttribute(page.ctaPanel.url)}" target="_blank" rel="noopener">${escapeHtml(page.ctaPanel.label)}</a>
        </div>
      </div>
    </section>`;
}

function renderSubpageIntro(page) {
  const secondaryHref = page.secondaryCta ? (page.secondaryCta.targetUrl || page.secondaryCta.target || "#shop-catalog") : "#shop-catalog";
  const secondaryPath = secondaryHref.startsWith("#") || secondaryHref.startsWith("http") ? secondaryHref : relativeUrl(page.path, secondaryHref);
  const secondaryAttrs = secondaryHref.startsWith("http") ? ' target="_blank" rel="noopener"' : "";

  return `
    <section class="section">
      <div class="container page-shell">
        <div class="page-grid">
          <div class="page-intro">
            ${renderBreadcrumbs(page)}
            <div class="eyebrow">${escapeHtml(page.eyebrow)}</div>
            <h1>${escapeHtml(page.h1)}</h1>
            <p>${escapeHtml(page.intro)}</p>
            <div class="page-actions">
              <a class="btn" href="${escapeAttribute(page.primaryCta.url)}" target="_blank" rel="noopener">${escapeHtml(page.primaryCta.label)}</a>
              <a class="btn-secondary" href="${escapeAttribute(secondaryPath)}"${secondaryAttrs}>${escapeHtml(page.secondaryCta.label)}</a>
            </div>
            ${renderLinkCloud(page)}
          </div>
          ${renderSidebar(page)}
        </div>
      </div>
    </section>`;
}

function renderHomeSectionCards(page, key, heading, intro) {
  const cards = page[key];
  if (!cards || !cards.length) return "";
  const id = key === "intentCards" ? "gift-guides" : "collections";
  return `
    <section class="section" id="${id}">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>${escapeHtml(heading)}</h2>
            <p>${escapeHtml(intro)}</p>
          </div>
        </div>
        <div class="category-grid">
          ${cards.map((card) => `
            <article class="category-card">
              <div class="card-media">
                <img src="${escapeAttribute(relativeUrl(page.path, card.image))}" alt="${escapeAttribute(card.imageAlt)}" loading="lazy" decoding="async" />
                <h3>${escapeHtml(card.title)}</h3>
              </div>
              <div class="card-body">
                <p>${escapeHtml(card.description)}</p>
                <a class="btn" href="${escapeAttribute(relativeUrl(page.path, card.href))}">${escapeHtml(card.title)}</a>
              </div>
            </article>`).join("\n")}
        </div>
      </div>
    </section>`;
}

function renderReviews(page) {
  if (!page.reviews) return "";
  return `
    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>${escapeHtml(text[page.locale].reviewsHeading)}</h2>
            <p>${escapeHtml(text[page.locale].reviewsIntro)}</p>
          </div>
          <a class="btn-secondary" href="${escapeAttribute(page.reviews.linkUrl)}" target="_blank" rel="noopener">${escapeHtml(page.reviews.linkLabel)}</a>
        </div>
        <div class="faq-grid">
          ${page.reviews.items.map((item) => renderTemplate(faqTemplate, { question: escapeHtml(item.title), answer: escapeHtml(item.text) })).join("\n")}
        </div>
      </div>
    </section>`;
}

function renderHome(page, productsByLocale) {
  const featuredProducts = page.featuredItems.map((item) => ({ product: getProduct(page, productsByLocale, item.slug), summary: item.summary }));
  return `
    <main id="main-content">
      <section class="hero">
        <div class="container hero-shell">
          <div class="hero-copy">
            <div class="eyebrow">${escapeHtml(page.eyebrow)}</div>
            <h1>${escapeHtml(page.h1)}</h1>
            <p>${escapeHtml(page.intro)}</p>
            <div class="hero-actions">
              <a class="btn" href="${escapeAttribute(page.primaryCta.url)}" target="_blank" rel="noopener">${escapeHtml(page.primaryCta.label)}</a>
              <a class="btn-secondary" href="${escapeAttribute(page.secondaryCta.target)}">${escapeHtml(page.secondaryCta.label)}</a>
            </div>
            <div class="hero-points">
              ${page.heroPoints.map((point) => `
                <div class="hero-point">
                  <strong>${escapeHtml(point.title)}</strong>
                  <span>${escapeHtml(point.text)}</span>
                </div>`).join("\n")}
            </div>
          </div>
          <div class="hero-visual" aria-hidden="true">
            <div class="hero-photo-zone">
              <img src="${escapeAttribute(relativeUrl(page.path, page.heroImage))}" alt="${escapeAttribute(page.heroImageAlt)}" fetchpriority="high" />
              <div class="hero-photo-caption">${escapeHtml(page.heroCaption)}</div>
            </div>
          </div>
        </div>
      </section>
      <section class="section" id="featured">
        <div class="container">
          <div class="section-head">
            <div>
              <h2>${escapeHtml(text[page.locale].featuredHeading)}</h2>
              <p>${escapeHtml(text[page.locale].featuredIntro)}</p>
            </div>
          </div>
          <div class="copy-stack featured-copy-grid">
            ${featuredProducts.map((item) => renderFeaturedCard(item.product, item.summary)).join("\n")}
          </div>
        </div>
      </section>
      ${renderHomeSectionCards(page, "intentCards", text[page.locale].intentsHeading, text[page.locale].intentsIntro)}
      ${renderHomeSectionCards(page, "collectionCards", text[page.locale].collectionsHeading, text[page.locale].collectionsIntro)}
      ${renderReviews(page)}
      ${renderFaqSection(page)}
      ${renderCtaPanel(page)}
    </main>`;
}

function renderContact(page) {
  return `
    <main class="page-main" id="main-content">
      <section class="section">
        <div class="container page-shell">
          <div class="page-grid">
            <div class="page-intro">
              ${renderBreadcrumbs(page)}
              <div class="eyebrow">${escapeHtml(page.eyebrow)}</div>
              <h1>${escapeHtml(page.h1)}</h1>
              <p>${escapeHtml(page.intro)}</p>
              <div class="page-actions">
                <a class="btn" href="${escapeAttribute(page.primaryCta.url)}" target="_blank" rel="noopener">${escapeHtml(page.primaryCta.label)}</a>
                <a class="btn-secondary" href="${escapeAttribute(page.secondaryCta.targetUrl)}" target="_blank" rel="noopener">${escapeHtml(page.secondaryCta.label)}</a>
              </div>
            </div>
            ${renderSidebar(page)}
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container page-shell">
          <div class="page-grid">
            <div class="copy-stack">
              ${page.infoCards.map((card) => {
                const body = card.items ? `<ul>${card.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : `<p>${escapeHtml(card.text)}</p>`;
                return `<article class="copy-card"><h2>${escapeHtml(card.title)}</h2>${body}</article>`;
              }).join("\n")}
            </div>
            <div></div>
          </div>
        </div>
      </section>
      ${page.faq ? renderFaqSection(page) : ""}
      ${page.ctaPanel ? renderCtaPanel(page) : ""}
    </main>`;
}

function renderSubpage(page, productsByLocale, productsListByLocale) {
  const catalogProducts = selectCatalogProducts(page, productsListByLocale);
  return `
    <main class="page-main" id="main-content">
      ${renderSubpageIntro(page)}
      ${renderFeaturedSection(page, productsByLocale)}
      ${renderCatalogSection(page, catalogProducts)}
      ${renderFaqSection(page)}
      ${renderRelatedSection(page)}
      ${renderCtaPanel(page)}
    </main>
    <div class="sticky-mobile-cta">
      <a class="btn" href="${escapeAttribute(page.primaryCta.url)}" target="_blank" rel="noopener">${escapeHtml(page.primaryCta.label)}</a>
    </div>`;
}
function renderStructuredData(page, productsByLocale) {
  const scripts = [];
  const featured = (page.featuredItems || []).map((item, index) => {
    const product = getProduct(page, productsByLocale, item.slug);
    return { "@type": "ListItem", position: index + 1, name: product.name, url: product.etsy_url };
  });
  const localizedHome = page.locale === "en" ? "/en/index.html" : "/index.html";

  scripts.push({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${canonicalUrl("/index.html")}#organization`,
        name: "Craftygiftsplace",
        url: canonicalUrl("/index.html"),
        logo: absoluteUrl("/assets/img/logos/craftygiftsplace-logo.png"),
        sameAs: ["https://www.etsy.com/shop/Craftygiftsplace"]
      },
      {
        "@type": "WebSite",
        "@id": `${canonicalUrl(localizedHome)}#website`,
        url: canonicalUrl(localizedHome),
        name: "Craftygiftsplace",
        inLanguage: page.locale
      }
    ]
  });

  if (page.breadcrumbs && page.breadcrumbs.length) {
    scripts.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: (page.breadcrumbs || []).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: canonicalUrl(item.path)
      }))
    });
  }

  if (featured.length) {
    scripts.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${canonicalUrl(page.path)}#featured-items`,
      name: page.h1,
      itemListElement: featured
    });
  }

  if (page.faq && page.faq.length) {
    scripts.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    });
  }

  return scripts.map((script) => `<script type="application/ld+json">\n${JSON.stringify(script, null, 2)}\n</script>`).join("\n");
}

function renderHead(page, pairPage, productsByLocale) {
  const firstProduct = page.featuredItems && page.featuredItems.length ? getProduct(page, productsByLocale, page.featuredItems[0].slug) : null;
  const socialImage = firstProduct ? absoluteUrl(firstProduct.image) : absoluteUrl("/assets/img/products/moon-cat-tealight-holder.jpg");
  const socialImageAlt = firstProduct ? firstProduct.alt : page.heroImageAlt || "Craftygiftsplace product";
  const rootRedirectScript = page.path === "/index.html" ? `<script>
    if (/\\/index\\.html$/.test(window.location.pathname)) {
      window.location.replace(window.location.pathname.replace(/index\\.html$/, "") + window.location.search + window.location.hash);
    }
  </script>` : "";

  return renderTemplate(headTemplate, {
    locale: page.locale,
    pageTitle: escapeHtml(page.title),
    metaDescription: escapeAttribute(page.metaDescription),
    robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    rootRedirectScript,
    canonicalUrl: escapeAttribute(canonicalUrl(page.path)),
    altNlUrl: escapeAttribute(canonicalUrl(page.locale === "nl" ? page.path : pairPage.path)),
    altEnUrl: escapeAttribute(canonicalUrl(page.locale === "en" ? page.path : pairPage.path)),
    xDefaultUrl: escapeAttribute(canonicalUrl(xDefaultPath)),
    ogLocale: page.locale === "en" ? "en_US" : "nl_NL",
    socialImage: escapeAttribute(socialImage),
    socialImageAlt: escapeAttribute(socialImageAlt),
    faviconPath: escapeAttribute(relativeUrl(page.path, "/favicon.ico")),
    logoPath: escapeAttribute(relativeUrl(page.path, "/assets/img/logos/craftygiftsplace-logo.png")),
    preconnectLinks: '<link rel="preconnect" href="https://i.etsystatic.com" crossorigin />\n  <link rel="dns-prefetch" href="//i.etsystatic.com" />\n  <link rel="preconnect" href="https://www.etsy.com" crossorigin />',
    stylesheetPath: escapeAttribute(relativeUrl(page.path, "/assets/css/style.css")),
    structuredData: renderStructuredData(page, productsByLocale)
  });
}

function renderHeader(page, pairPage) {
  const localeText = text[page.locale];
  const navLinks = [
    ...navItems(page.locale).map((item) => {
      const current = page.path === item.path ? ' aria-current="page"' : "";
      return `<a href="${escapeAttribute(relativeUrl(page.path, item.path))}"${current}>${escapeHtml(item.label)}</a>`;
    }),
    `<a class="btn" href="${escapeAttribute(page.primaryCta.url)}" target="_blank" rel="noopener">${escapeHtml(page.primaryCta.label)}</a>`
  ].join("\n");

  const languageLinks = [
    { locale: "nl", href: relativeUrl(page.path, page.locale === "nl" ? page.path : pairPage.path), current: page.locale === "nl" },
    { locale: "en", href: relativeUrl(page.path, page.locale === "en" ? page.path : pairPage.path), current: page.locale === "en" }
  ].map((item) => `<a href="${escapeAttribute(item.href)}" lang="${item.locale}"${item.current ? ' aria-current="true"' : ""}>
          <span class="flag-icon flag-icon--${item.locale}" aria-hidden="true"></span>
          <span class="language-code">${item.locale.toUpperCase()}</span>
        </a>`).join("\n");

  return renderTemplate(headerTemplate, {
    bodyClass: page.template === "home" ? "" : page.template === "contact" ? "page-subpage" : "page-subpage has-sticky-cta",
    skipLinkLabel: escapeHtml(localeText.skipLink),
    homePath: escapeAttribute(relativeUrl(page.path, page.locale === "en" ? "/en/index.html" : "/index.html")),
    homeAriaLabel: escapeAttribute(localeText.homeAria),
    logoPath: escapeAttribute(relativeUrl(page.path, "/assets/img/logos/craftygiftsplace-logo.png")),
    brandTagline: escapeHtml(localeText.brandTagline),
    navAriaLabel: escapeAttribute(localeText.navAria),
    navLinks,
    languageSwitchLabel: escapeAttribute(localeText.langSwitch),
    languageLinks,
    navToggleLabel: escapeAttribute(localeText.navToggle),
    menuLabel: escapeHtml(localeText.menu)
  });
}

function renderFooter(page) {
  const localeText = text[page.locale];
  const collectionLinks = footerCollections(page.locale).map((item) => `<a href="${escapeAttribute(relativeUrl(page.path, item.path))}">${escapeHtml(item.label)}</a>`).join("");
  const intentLinks = footerIntents(page.locale).map((item) => `<a href="${escapeAttribute(relativeUrl(page.path, item.path))}">${escapeHtml(item.label)}</a>`).join("");
  return renderTemplate(footerTemplate, {
    logoPath: escapeAttribute(relativeUrl(page.path, "/assets/img/logos/craftygiftsplace-logo.png")),
    footerTagline: escapeHtml(localeText.footerTagline),
    footerCollectionsTitle: escapeHtml(localeText.footerCollections),
    footerCollectionLinks: collectionLinks,
    footerIntentTitle: escapeHtml(localeText.footerIntents),
    footerIntentLinks: intentLinks,
    footerNote: escapeHtml(localeText.footerNote),
    scriptPath: escapeAttribute(relativeUrl(page.path, "/assets/js/main.js"))
  });
}

function renderPage(page, pagesByPath, productsByLocale, productsListByLocale) {
  const pairPage = pagesByPath.get(page.pairPath);
  if (!pairPage) throw new Error(`Missing paired page for ${page.path}`);
  const body = page.template === "home" ? renderHome(page, productsByLocale) : page.template === "contact" ? renderContact(page) : renderSubpage(page, productsByLocale, productsListByLocale);
  return `${renderHead(page, pairPage, productsByLocale)}\n${renderHeader(page, pairPage)}\n${body}\n${renderFooter(page)}`;
}

function renderRedirect(toPath) {
  const href = canonicalUrl(toPath);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="refresh" content="0; url=${href}" />
  <meta name="robots" content="noindex,follow" />
  <link rel="canonical" href="${href}" />
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting to <a href="${href}">${href}</a>.</p>
</body>
</html>`;
}

function buildPages() {
  const { pages, pagesByPath, productsByLocale, productsListByLocale } = loadData();
  pages.forEach((page) => {
    writeText(page.path.replace(/^\//, ""), renderPage(page, pagesByPath, productsByLocale, productsListByLocale));
  });

  [
    { from: "/en/pages/onderzetters.html", to: "/en/pages/wooden-coasters.html" },
    { from: "/en/pages/bladwijzers.html", to: "/en/pages/wooden-bookmarks.html" },
    { from: "/en/pages/houten-cadeaus.html", to: "/en/pages/wooden-gifts.html" }
  ].forEach((redirect) => {
    writeText(redirect.from.replace(/^\//, ""), renderRedirect(redirect.to));
  });
}

buildPages();
console.log("Built HTML pages.");
