const fs = require("fs");
const { canonicalUrl, readJson, sitePathToFile } = require("./lib/site");
const { LOCALE_ORDER, LOCALE_META } = require("./lib/locales");

const LOCALES = LOCALE_ORDER;

const localeBans = {
  en: ["onderzetters", "bladwijzers", "houten", "persoonlijke", "personaliseerbare"],
  nl: ["housewarming", "coasters", "gift-ready", "reader gift"],
  de: ["onderzetters", "bladwijzers", "houten", "housewarming", "reader gift", "wooden coasters", "wooden bookmarks"],
  fr: ["onderzetters", "bladwijzers", "houten", "housewarming", "reader gift", "tealight"],
  es: ["onderzetters", "bladwijzers", "houten", "housewarming", "reader gift", "fantasy", "tealight"],
  pt: ["onderzetters", "bladwijzers", "houten", "housewarming", "reader gift", "fantasy", "tealight"],
  it: ["onderzetters", "bladwijzers", "houten", "housewarming", "reader gift", "tealight"]
};

const editorialBans = {
  en: [
    "product grid",
    "localized product data",
    "shared source",
    "localized structure",
    "support layer",
    "gift intent",
    "gift intents",
    "landing page",
    "metadata",
    "taxonomy",
    "internal links",
    "internal routes",
    "site architecture",
    "gift-ready",
    "etsy-ready",
    "reader gifting"
  ],
  nl: [
    "productgrid",
    "gelokaliseerde productdata",
    "gedeelde bron",
    "gelokaliseerde structuur",
    "ondersteuningslaag",
    "cadeau-intentie",
    "cadeau-intenties",
    "landingspagina",
    "metadata",
    "taxonomie",
    "interne links",
    "sitestructuur",
    "cadeauredenering",
    "plankstuk",
    "fantasyplanken",
    "bewaarcadeau",
    "cadeauwaardig"
  ],
  de: [
    "produktgitter",
    "lokalisierte produktdaten",
    "gemeinsame quelle",
    "unterstuetzungsebene",
    "geschenkintention",
    "geschenk-intention",
    "landingpage",
    "metadaten",
    "taxonomie",
    "interne links",
    "seitenarchitektur",
    "product grid",
    "localized product data",
    "geschenkfertig",
    "lesegeschenk",
    "buchgeschenk",
    "regalstück",
    "geschenkgrund",
    "gesamtgeschenk"
  ],
  fr: [
    "product grid",
    "données produit localisées",
    "source partagée",
    "landing page",
    "métadonnées",
    "taxonomie",
    "liens internes",
    "architecture du site"
  ],
  es: [
    "product grid",
    "datos de producto localizados",
    "fuente compartida",
    "landing page",
    "metadatos",
    "taxonomía",
    "enlaces internos",
    "arquitectura del sitio"
  ],
  pt: [
    "product grid",
    "dados de produto localizados",
    "fonte partilhada",
    "landing page",
    "metadados",
    "taxonomia",
    "ligações internas",
    "arquitetura do site"
  ],
  it: [
    "product grid",
    "dati prodotto localizzati",
    "fonte condivisa",
    "landing page",
    "metadati",
    "tassonomia",
    "link interni",
    "architettura del sito"
  ]
};

const productLocaleBans = {
  nl: [
    /\brocket\b/i,
    /\bclassic\b/i,
    /\binspired\b/i,
    /\bfeather\b/i,
    /\bwitch\b/i,
    /\bsymbols\b/i,
    /\bfishing\b/i,
    /\bhunting\b/i,
    /\bcelestial\b/i,
    /\bspanish guitar\b/i,
    /\bmotif\b/i,
    /\bspiderweb\b/i,
    /\bskull\b/i,
    /\bcheckers\b/i,
    /\bsword\b/i,
    /\badventure\b/i,
    /\bdad\b/i,
    /\bdartboard\b/i,
    /\broots?\b/i,
    /\bwortels\b/i,
    /\bgepersonaliseerde team\b/i
  ],
  de: [
    /\bhouten\b/i,
    /\bonderzetters?\b/i,
    /\bbladwijzers?\b/i,
    /\bwortels\b/i,
    /\breader gift\b/i,
    /\bgift-ready\b/i,
    /\bgepersonaliseerde team\b/i
  ],
  fr: [
    /\btealight\b/i
  ],
  es: [
    /\bfantasy\b/i,
    /\btealight\b/i
  ],
  pt: [
    /\bfantasy\b/i,
    /\btealight\b/i
  ],
  it: [
    /\btealight\b/i
  ]
};

const productRepetitionBans = {
  en: [/\bwooden\s+wooden\b/i],
  nl: [/\bhouten\s+houten\b/i],
  de: [/\bholz(?:-| )holz\b/i],
  fr: [/\bbois\s+bois\b/i],
  es: [/\bmadera\s+madera\b/i],
  pt: [/\bmadeira\s+madeira\b/i],
  it: [/\blegno\s+legno\b/i]
};

const collectionIntentTerms = {
  en: ["reader gifts", "cat lover gifts", "housewarming gifts"],
  nl: ["lezerscadeaus", "cadeaus voor kattenliefhebbers", "verhuiscadeaus"],
  de: ["geschenke für leser", "geschenke für katzenliebhaber", "einzugsgeschenke"],
  fr: ["cadeaux pour lecteurs", "cadeaux pour amoureux des chats", "cadeaux de crémaillère"],
  es: ["regalos para lectores", "regalos para amantes de los gatos", "regalos para casa nueva"],
  pt: ["presentes para leitores", "presentes para amantes de gatos", "presentes de casa nova"],
  it: ["regali per lettori", "regali per amanti dei gatti", "regali per la casa nuova"]
};

const supportPageDisallowedProductPatterns = [
  /\bdog\b/i,
  /\bgamer\b/i,
  /\bgaming\b/i,
  /\bmoba\b/i,
  /\bfps\b/i,
  /\bmotorsport\b/i,
  /\bcricket\b/i,
  /\bgolf\b/i,
  /\bsports?-ball\b/i,
  /\bfishing\b/i,
  /\bhunting\b/i,
  /\bbitcoin\b/i,
  /\bcannabis\b/i,
  /\bspider\b/i,
  /\bskull\b/i,
  /\bhalloween\b/i,
  /\bwiccan\b/i,
  /\bbuddha\b/i,
  /\bfaith\b/i,
  /\bprayer\b/i,
  /\bbaby\b/i,
  /\bnumicon\b/i,
  /\bdinosaur\b/i,
  /\bdiy\b/i,
  /\bchristmas\b/i,
  /\bram-keychain\b/i,
  /\bcomb\b/i,
  /\bhusband\b/i,
  /\bswear\b/i,
  /\bteam\b/i,
  /\bcheckers\b/i,
  /\bchess\b/i,
  /\bpoker\b/i,
  /\bsamurai\b/i,
  /\bmayan\b/i,
  /\bpersian\b/i,
  /\brocket\b/i,
  /\bsardine\b/i,
  /\bguitar\b/i
];

const broadSupportPagePaths = new Set([
  "/index.html",
  "/en/index.html",
  "/de/index.html",
  "/fr/index.html",
  "/es/index.html",
  "/pt/index.html",
  "/it/index.html",
  "/pages/onderzetters.html",
  "/en/pages/wooden-coasters.html",
  "/de/pages/holzuntersetzer.html",
  "/fr/pages/sous-verres-en-bois.html",
  "/es/pages/posavasos-de-madera.html",
  "/pt/pages/porta-copos-de-madeira.html",
  "/it/pages/sottobicchieri-in-legno.html"
]);

const bestsellerSupportSlugs = new Set([
  "tree-of-life-wooden-coasters",
  "sun-and-moon-wooden-coasters",
  "viking-wooden-coasters",
  "buddha-wood-wooden-coasters",
  "mushroom-moon-wooden-coasters",
  "zodiac-wooden-coasters",
  "hand-painted-wiccan-symbol-wooden-coasters",
  "dartboard-wooden-coasters",
  "sports-ball-wooden-coasters",
  "bitcoin-wooden-coasters"
]);

const HOME_SECTION_ORDER = [
  "hero-home",
  "featured-categories",
  "featured-bestsellers",
  "gift-guides",
  "collections",
  "how-it-works",
  "reviews",
  "faq"
];

const homepageLanguagePromotionBans = {
  en: [
    "shop in three languages",
    "available in three languages",
    "browse in 3 languages",
    "browse in three languages"
  ],
  nl: [
    "shop in drie talen",
    "beschikbaar in drie talen",
    "bladeren in 3 talen",
    "bladeren in drie talen"
  ],
  de: [
    "in drei sprachen stöbern",
    "verfügbar in drei sprachen",
    "verfugbar in drei sprachen",
    "in 3 sprachen stöbern",
    "in 3 sprachen stobern"
  ],
  fr: [
    "en trois langues",
    "disponible en trois langues",
    "parcourir en 3 langues",
    "parcourir en trois langues"
  ],
  es: [
    "en tres idiomas",
    "disponible en tres idiomas",
    "navegar en 3 idiomas",
    "navegar en tres idiomas"
  ],
  pt: [
    "em três idiomas",
    "disponível em três idiomas",
    "navegar em 3 idiomas",
    "navegar em três idiomas"
  ],
  it: [
    "in tre lingue",
    "disponibile in tre lingue",
    "navigare in 3 lingue",
    "navigare in tre lingue"
  ]
};

const CARD_DESCRIPTION_SIMILARITY_LIMIT = 0.88;

function readFile(sitePath) {
  return fs.readFileSync(sitePathToFile(sitePath), "utf8");
}

function fail(message) {
  throw new Error(message);
}

function getTitle(html) {
  return (html.match(/<title>(.*?)<\/title>/is) || [])[1]?.trim() || "";
}

function getMetaDescription(html) {
  return (html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || [])[1]?.trim() || "";
}

function getCanonical(html) {
  return (html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i) || [])[1]?.trim() || "";
}

function getAlternate(html, locale) {
  const pattern = new RegExp(`<link\\s+rel="alternate"\\s+hreflang="${locale}"\\s+href="([^"]*)"`, "i");
  return (html.match(pattern) || [])[1]?.trim() || "";
}

function getXDefault(html) {
  return getAlternate(html, "x-default");
}

function getHtmlLang(html) {
  return (html.match(/<html\s+lang="([^"]*)"/i) || [])[1]?.trim() || "";
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function imageAltIssues(html, path) {
  const matches = [...html.matchAll(/<img\b[^>]*>/gi)];
  return matches
    .filter((match) => !/\balt="[^"]+"/i.test(match[0]))
    .map(() => `${path} contains an image without alt text.`);
}

function extractProductDescriptions(html) {
  return [...html.matchAll(/<article class="product-card">[\s\S]*?<p>(.*?)<\/p>[\s\S]*?<\/article>/gi)]
    .map((match) => match[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function levenshtein(a, b) {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const dp = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 0; i < rows; i += 1) dp[i][0] = i;
  for (let j = 0; j < cols; j += 1) dp[0][j] = j;

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[a.length][b.length];
}

function similarity(a, b) {
  const left = a.toLowerCase();
  const right = b.toLowerCase();
  const maxLength = Math.max(left.length, right.length) || 1;
  return 1 - levenshtein(left, right) / maxLength;
}

function hasMeaningfulTokenDifference(a, b) {
  if (
    a !== b &&
    /(design|uitvoering|ausführung|version|versión|versione|versão|versao|variante)/i.test(`${a} ${b}`)
  ) {
    return true;
  }

  const stopwords = new Set([
    "a", "an", "the", "and", "or", "of", "in", "on", "for", "to", "with", "that", "this", "it",
    "de", "het", "een", "en", "voor", "met", "die", "dat", "dit", "op", "bij", "van",
    "der", "die", "das", "und", "mit", "für", "auf", "ein", "eine", "den", "dem",
    "le", "la", "les", "et", "pour", "avec", "des", "une", "un", "dans",
    "el", "la", "los", "las", "y", "para", "con", "una", "un", "del",
    "o", "os", "as", "um", "uma", "com", "para", "dos", "das",
    "il", "lo", "la", "gli", "le", "e", "per", "con", "una", "un"
  ]);

  const tokenize = (value) =>
    (String(value || "").toLowerCase().match(/[a-zà-ÿ0-9'-]+/gi) || [])
      .filter((token) => token.length > 2 && !stopwords.has(token));

  const left = new Set(tokenize(a));
  const right = new Set(tokenize(b));
  const leftOnly = [...left].filter((token) => !right.has(token));
  const rightOnly = [...right].filter((token) => !left.has(token));

  return leftOnly.length >= 1 && rightOnly.length >= 1;
}

function validateProducts(products, locale) {
  products.forEach((product) => {
    if (!product.alt || !product.alt.trim()) {
      fail(`Missing alt text in ${locale} product "${product.slug}".`);
    }
    if (!product.etsy_url || !product.etsy_url.trim()) {
      fail(`Missing Etsy URL in ${locale} product "${product.slug}".`);
    }

    const bannedPatterns = productLocaleBans[locale] || [];
    const fields = [product.name, product.alt, product.cta_label].filter(Boolean);
    bannedPatterns.forEach((pattern) => {
      if (fields.some((field) => pattern.test(field))) {
        fail(`Suspicious untranslated token ${pattern} found in ${locale} product "${product.slug}".`);
      }
    });

    const repetitionPatterns = productRepetitionBans[locale] || [];
    repetitionPatterns.forEach((pattern) => {
      if (fields.some((field) => pattern.test(field))) {
        fail(`Repeated material wording ${pattern} found in ${locale} product "${product.slug}".`);
      }
    });
  });
}

function looksLikeKeywordDump(items) {
  if (!Array.isArray(items) || items.length < 3) {
    return false;
  }

  return items.every((item) => {
    const text = String(item || "").trim();
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    return wordCount <= 5 && !/[.!?]/.test(text);
  });
}

function isStaleSeasonalProduct(product) {
  const source = `${product.slug} ${product.name}`;
  const match = source.match(/\b(20\d{2})\b/);
  if (!match) {
    return false;
  }

  const year = Number(match[1]);
  const currentYear = new Date().getFullYear();
  const seasonal =
    (product.style_keys || []).includes("seasonal") ||
    (product.occasion_keys || []).includes("christmas") ||
    /\bchristmas\b|\bkerst\b/i.test(source);

  return seasonal && year < currentYear;
}

function validateReferencedProduct(pagePath, product) {
  if (!product) {
    fail(`Referenced product is missing for ${pagePath}.`);
  }

  const isAllowedBestsellerOnBroadPage =
    broadSupportPagePaths.has(pagePath) &&
    bestsellerSupportSlugs.has(product.slug);

  if (!isAllowedBestsellerOnBroadPage && supportPageDisallowedProductPatterns.some((pattern) => pattern.test(product.slug))) {
    fail(`Off-brand product "${product.slug}" is still referenced on ${pagePath}.`);
  }

  if (isStaleSeasonalProduct(product)) {
    fail(`Stale seasonal product "${product.slug}" is still referenced on ${pagePath}.`);
  }
}

function loadAllPages() {
  return LOCALES.flatMap((locale) => readJson(`data/pages.${locale}.json`));
}

function validatePageData(productsEn) {
  const pages = loadAllPages();
  const productsBySlug = new Map(productsEn.map((product) => [product.slug, product]));

  pages.forEach((page) => {
    if (looksLikeKeywordDump(page.featuredWhy)) {
      fail(`Keyword-style visible block detected in ${page.path}.`);
    }

    if (page.template === "collection") {
      if (!page.catalog || page.catalog.mode !== "slugs") {
        fail(`Collection page ${page.path} must use an explicit curated slug list.`);
      }

      const lowerH1 = String(page.h1 || "").toLowerCase();
      collectionIntentTerms[page.locale].forEach((term) => {
        if (lowerH1.includes(term)) {
          fail(`Collection page ${page.path} H1 overlaps with intent term "${term}".`);
        }
      });
    }

    const referencedSlugs = [
      ...(page.featuredItems || []).map((item) => item.slug),
      ...((page.catalog && page.catalog.mode === "slugs") ? page.catalog.slugs : [])
    ];

    referencedSlugs.forEach((slug) => {
      validateReferencedProduct(page.path, productsBySlug.get(slug));
    });
  });
}

function validatePages() {
  const pages = loadAllPages();
  const byPath = new Map(pages.map((page) => [page.path, page]));
  const titles = new Map();
  const metas = new Map();

  pages.forEach((page) => {
    const html = readFile(page.path);
    const title = getTitle(html);
    const meta = getMetaDescription(html);
    const canonical = getCanonical(html);
    const xDefault = getXDefault(html);
    const lang = getHtmlLang(html);
    const alternates = page.alternatePaths || {};

    if (!title) fail(`Missing title in ${page.path}`);
    if (!meta) fail(`Missing meta description in ${page.path}`);
    if (titles.has(title)) fail(`Duplicate title found in ${page.path} and ${titles.get(title)}`);
    if (metas.has(meta)) fail(`Duplicate meta description found in ${page.path} and ${metas.get(meta)}`);
    titles.set(title, page.path);
    metas.set(meta, page.path);

    if (canonical !== canonicalUrl(page.path)) {
      fail(`Canonical mismatch in ${page.path}. Expected ${canonicalUrl(page.path)} but found ${canonical}`);
    }

    if (Object.keys(alternates).length !== LOCALES.length) {
      fail(`Missing alternate paths on ${page.path}`);
    }

    LOCALES.forEach((locale) => {
      const expectedPath = alternates[locale];
      if (!expectedPath) {
        fail(`Missing hreflang path for ${locale} on ${page.path}`);
      }
      const actual = getAlternate(html, locale);
      if (actual !== canonicalUrl(expectedPath)) {
        fail(`hreflang ${locale} mismatch in ${page.path}`);
      }
    });

    if (xDefault !== canonicalUrl("/en/index.html")) fail(`x-default mismatch in ${page.path}`);
    if (lang !== page.locale) fail(`html lang mismatch in ${page.path}`);

    imageAltIssues(html, page.path).forEach((issue) => fail(issue));

    const textContent = visibleText(html);
    localeBans[page.locale].forEach((word) => {
      if (textContent.includes(word.toLowerCase())) {
        fail(`Forbidden locale string "${word}" found in ${page.path}`);
      }
    });

    editorialBans[page.locale].forEach((phrase) => {
      if (textContent.includes(phrase.toLowerCase())) {
        fail(`Backstage copy "${phrase}" found in ${page.path}`);
      }
    });

    const descriptions = extractProductDescriptions(html);
    for (let i = 0; i < descriptions.length; i += 1) {
      for (let j = i + 1; j < descriptions.length; j += 1) {
        if (
          similarity(descriptions[i], descriptions[j]) > CARD_DESCRIPTION_SIMILARITY_LIMIT &&
          !hasMeaningfulTokenDifference(descriptions[i], descriptions[j])
        ) {
          fail(`Card descriptions too similar in ${page.path}: "${descriptions[i]}" / "${descriptions[j]}"`);
        }
      }
    }

    LOCALES.filter((locale) => locale !== page.locale).forEach((locale) => {
      const alternatePage = byPath.get(alternates[locale]);
      if (!alternatePage) {
        fail(`Missing alternate page ${alternates[locale]} referenced from ${page.path}`);
      }
      const alternateHtml = readFile(alternatePage.path);
      const backLink = getAlternate(alternateHtml, page.locale);
      if (backLink !== canonicalUrl(page.path)) {
        fail(`Reciprocal hreflang missing between ${page.path} and ${alternatePage.path}`);
      }
    });
  });
}

function extractHomeSectionOrder(html) {
  return [...html.matchAll(/data-home-section="([^"]+)"/g)]
    .map((match) => match[1])
    .filter(Boolean);
}

function extractLanguageSwitcherLocales(html) {
  return [...html.matchAll(/<a[^>]+lang="([^"]+)"/gi)]
    .map((match) => match[1].toLowerCase());
}

function validateHomepages() {
  const pages = loadAllPages().filter((page) => page.template === "home");
  const expectedOrder = HOME_SECTION_ORDER.join("|");

  pages.forEach((page) => {
    const html = readFile(page.path);
    const visible = visibleText(html);
    const order = extractHomeSectionOrder(html).join("|");
    const locales = new Set(extractLanguageSwitcherLocales(html));
    const bestsellerCount = [...html.matchAll(/data-home-bestseller="true"/g)].length;
    const featuredCategoryCount = [...html.matchAll(/data-home-featured-category="true"/g)].length;
    const bannedPhrases = homepageLanguagePromotionBans[page.locale] || [];

    if (order !== expectedOrder) {
      fail(`Homepage section order mismatch in ${page.path}.`);
    }

    LOCALES.forEach((locale) => {
      if (!locales.has(locale)) {
        fail(`Homepage language switcher missing ${locale.toUpperCase()} on ${page.path}.`);
      }
    });

    bannedPhrases.forEach((phrase) => {
      if (visible.includes(phrase)) {
        fail(`Homepage ${page.path} still promotes multilingual support with "${phrase}".`);
      }
    });

    if (bestsellerCount < 3) {
      fail(`Homepage ${page.path} has fewer than 3 bestseller product slots.`);
    }

    if (featuredCategoryCount < 3) {
      fail(`Homepage ${page.path} has fewer than 3 featured categories.`);
    }
  });
}

function validateSitemap() {
  const pages = loadAllPages();
  const sitemap = fs.readFileSync(sitePathToFile("/sitemap.xml"), "utf8");
  pages.forEach((page) => {
    if (!sitemap.includes(`<loc>${canonicalUrl(page.path)}</loc>`)) {
      fail(`Missing ${page.path} in sitemap.xml`);
    }
  });
}

const productsEn = readJson("data/products.en.json");
const productsNl = readJson("data/products.nl.json");
const productsDe = readJson("data/products.de.json");
const productsFr = readJson(LOCALE_META.fr.productFile);
const productsEs = readJson(LOCALE_META.es.productFile);
const productsPt = readJson(LOCALE_META.pt.productFile);
const productsIt = readJson(LOCALE_META.it.productFile);

validateProducts(productsEn, "en");
validateProducts(productsNl, "nl");
validateProducts(productsDe, "de");
validateProducts(productsFr, "fr");
validateProducts(productsEs, "es");
validateProducts(productsPt, "pt");
validateProducts(productsIt, "it");
validatePageData(productsEn);
validatePages();
validateHomepages();
validateSitemap();

console.log("SEO validation passed.");
