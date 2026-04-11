const { pagesEn } = require("./page-data");

const EN = {
  home: "/en/index.html",
  coasters: "/en/pages/wooden-coasters.html",
  bookmarks: "/en/pages/wooden-bookmarks.html",
  gifts: "/en/pages/wooden-gifts.html",
  contact: "/en/pages/contact.html",
  cat: "/en/pages/cat-lover-gifts.html",
  reader: "/en/pages/reader-gifts.html",
  housewarming: "/en/pages/housewarming-gifts.html"
};

const basePages = new Map(pagesEn.map((page) => [page.path, page]));

function cloneBase(path) {
  const page = basePages.get(path);
  if (!page) {
    throw new Error(`Missing EN base page for ${path}`);
  }
  return JSON.parse(JSON.stringify(page));
}

function makeHomeStub(definition) {
  return {
    path: definition.routes.home,
    pairPath: EN.home,
    template: "home",
    locale: definition.code
  };
}

function mapFeaturedItems(basePage, summaries) {
  return basePage.featuredItems.map((item, index) => ({
    slug: item.slug,
    summary: summaries[index]
  }));
}

function makeCollectionPage(definition, kind, copy) {
  const basePath = EN[kind];
  const basePage = cloneBase(basePath);
  const routes = definition.routes;
  const labels = definition.labels;

  return {
    ...basePage,
    path: routes[kind],
    pairPath: basePath,
    locale: definition.code,
    eyebrow: definition.eyebrows.collection,
    title: copy.title,
    metaDescription: copy.metaDescription,
    h1: copy.h1,
    intro: copy.intro,
    breadcrumbs: [
      { label: labels.home, path: routes.home },
      { label: labels[kind], path: routes[kind] }
    ],
    primaryCta: {
      label: copy.primaryCtaLabel,
      url: basePage.primaryCta.url
    },
    secondaryCta: {
      label: copy.secondaryCtaLabel,
      target: "#shop-catalog"
    },
    linkCloud: copy.linkCloud.map((item) => ({
      label: item.label,
      target: item.targetKey === "catalog" ? "#shop-catalog" : routes[item.targetKey]
    })),
    sidebar: {
      title: copy.sidebar.title,
      quote: copy.sidebar.quote,
      attribution: copy.sidebar.attribution,
      text: copy.sidebar.text,
      links: copy.sidebar.links.map((item) => ({
        label: item.label,
        href: item.href || routes[item.targetKey]
      }))
    },
    featuredItems: mapFeaturedItems(basePage, copy.featuredSummaries),
    featuredWhy: copy.featuredWhy,
    catalog: {
      ...basePage.catalog,
      intro: copy.catalogIntro,
      ctaLabel: copy.catalogCtaLabel || copy.primaryCtaLabel
    },
    faq: copy.faq,
    relatedLinks: copy.relatedLinks.map((item) => ({
      label: item.label,
      href: item.href || routes[item.targetKey],
      description: item.description
    })),
    ctaPanel: {
      title: copy.ctaPanel.title,
      text: copy.ctaPanel.text,
      label: copy.ctaPanel.label,
      url: basePage.primaryCta.url
    }
  };
}

function makeIntentPage(definition, kind, copy) {
  const basePath = EN[kind];
  const basePage = cloneBase(basePath);
  const routes = definition.routes;
  const labels = definition.labels;

  return {
    ...basePage,
    path: routes[kind],
    pairPath: basePath,
    locale: definition.code,
    eyebrow: definition.eyebrows.intent,
    title: copy.title,
    metaDescription: copy.metaDescription,
    h1: copy.h1,
    intro: copy.intro,
    breadcrumbs: [
      { label: labels.home, path: routes.home },
      { label: labels[kind], path: routes[kind] }
    ],
    primaryCta: {
      label: copy.primaryCtaLabel,
      url: basePage.primaryCta.url
    },
    secondaryCta: {
      label: copy.secondaryCtaLabel,
      target: "#featured-products"
    },
    linkCloud: copy.linkCloud.map((item) => ({
      label: item.label,
      target: item.targetKey === "catalog" ? "#shop-catalog" : routes[item.targetKey]
    })),
    sidebar: {
      title: copy.sidebar.title,
      quote: copy.sidebar.quote,
      attribution: copy.sidebar.attribution,
      text: copy.sidebar.text,
      links: copy.sidebar.links.map((item) => ({
        label: item.label,
        href: item.href || (item.external ? basePage.primaryCta.url : routes[item.targetKey])
      }))
    },
    featuredItems: mapFeaturedItems(basePage, copy.featuredSummaries),
    featuredWhy: copy.featuredWhy,
    catalog: {
      ...basePage.catalog,
      intro: copy.catalogIntro,
      ctaLabel: copy.catalogCtaLabel || copy.primaryCtaLabel
    },
    faq: copy.faq,
    relatedLinks: copy.relatedLinks.map((item) => ({
      label: item.label,
      href: routes[item.targetKey],
      description: item.description
    })),
    ctaPanel: {
      title: copy.ctaPanel.title,
      text: copy.ctaPanel.text,
      label: copy.ctaPanel.label,
      url: basePage.primaryCta.url
    }
  };
}

function makeContactPage(definition, copy) {
  const basePage = cloneBase(EN.contact);
  const routes = definition.routes;
  const labels = definition.labels;

  return {
    ...basePage,
    path: routes.contact,
    pairPath: EN.contact,
    locale: definition.code,
    eyebrow: definition.eyebrows.contact,
    title: copy.title,
    metaDescription: copy.metaDescription,
    h1: copy.h1,
    intro: copy.intro,
    breadcrumbs: [
      { label: labels.home, path: routes.home },
      { label: labels.contact, path: routes.contact }
    ],
    primaryCta: {
      label: copy.primaryCtaLabel,
      url: basePage.primaryCta.url
    },
    secondaryCta: {
      label: copy.secondaryCtaLabel,
      targetUrl: basePage.secondaryCta.targetUrl
    },
    infoCards: copy.infoCards,
    sidebar: {
      title: copy.sidebar.title,
      quote: copy.sidebar.quote,
      attribution: copy.sidebar.attribution,
      text: copy.sidebar.text,
      links: copy.sidebar.links.map((item) => ({
        label: item.label,
        href: routes[item.targetKey]
      }))
    },
    faq: copy.faq,
    ctaPanel: {
      title: copy.ctaPanel.title,
      text: copy.ctaPanel.text,
      label: copy.ctaPanel.label,
      url: basePage.primaryCta.url
    }
  };
}

function buildLocalePages(definition) {
  return [
    makeHomeStub(definition),
    makeCollectionPage(definition, "coasters", definition.pages.coasters),
    makeCollectionPage(definition, "bookmarks", definition.pages.bookmarks),
    makeCollectionPage(definition, "gifts", definition.pages.gifts),
    makeContactPage(definition, definition.pages.contact),
    makeIntentPage(definition, "cat", definition.pages.cat),
    makeIntentPage(definition, "reader", definition.pages.reader),
    makeIntentPage(definition, "housewarming", definition.pages.housewarming)
  ];
}

module.exports = {
  buildLocalePages
};
