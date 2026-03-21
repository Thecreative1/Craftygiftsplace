const LOCALE_ORDER = ["nl", "en", "de", "fr", "es", "pt", "it"];

const LOCALE_META = {
  nl: { homePath: "/index.html", ogLocale: "nl_NL", pageFile: "data/pages.nl.json", productFile: "data/products.nl.json" },
  en: { homePath: "/en/index.html", ogLocale: "en_US", pageFile: "data/pages.en.json", productFile: "data/products.en.json" },
  de: { homePath: "/de/index.html", ogLocale: "de_DE", pageFile: "data/pages.de.json", productFile: "data/products.de.json" },
  fr: { homePath: "/fr/index.html", ogLocale: "fr_FR", pageFile: "data/pages.fr.json", productFile: "data/products.fr.json" },
  es: { homePath: "/es/index.html", ogLocale: "es_ES", pageFile: "data/pages.es.json", productFile: "data/products.es.json" },
  pt: { homePath: "/pt/index.html", ogLocale: "pt_PT", pageFile: "data/pages.pt.json", productFile: "data/products.pt.json" },
  it: { homePath: "/it/index.html", ogLocale: "it_IT", pageFile: "data/pages.it.json", productFile: "data/products.it.json" }
};

module.exports = {
  LOCALE_ORDER,
  LOCALE_META
};
