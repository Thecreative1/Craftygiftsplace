const fs = require("fs");
const { canonicalUrl, readJson, sitePathToFile } = require("./lib/site");

const localeBans = {
  en: ["onderzetters", "bladwijzers", "houten", "persoonlijke", "personaliseerbare"],
  nl: ["housewarming", "coasters", "gift-ready", "reader gift"]
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
    "site architecture"
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
    "sitestructuur"
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
  ]
};

const collectionIntentTerms = {
  en: ["reader gifts", "cat lover gifts", "housewarming gifts"],
  nl: ["lezerscadeaus", "cadeaus voor kattenliefhebbers", "verhuiscadeaus"]
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

  if (supportPageDisallowedProductPatterns.some((pattern) => pattern.test(product.slug))) {
    fail(`Off-brand product "${product.slug}" is still referenced on ${pagePath}.`);
  }

  if (isStaleSeasonalProduct(product)) {
    fail(`Stale seasonal product "${product.slug}" is still referenced on ${pagePath}.`);
  }
}

function validatePageData(productsEn) {
  const pages = [...readJson("data/pages.en.json"), ...readJson("data/pages.nl.json")];
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
  const pages = [...readJson("data/pages.en.json"), ...readJson("data/pages.nl.json")];
  const byPath = new Map(pages.map((page) => [page.path, page]));
  const titles = new Map();
  const metas = new Map();

  pages.forEach((page) => {
    const html = readFile(page.path);
    const title = getTitle(html);
    const meta = getMetaDescription(html);
    const canonical = getCanonical(html);
    const altEn = getAlternate(html, "en");
    const altNl = getAlternate(html, "nl");
    const xDefault = getXDefault(html);
    const lang = getHtmlLang(html);
    const pair = byPath.get(page.pairPath);

    if (!title) fail(`Missing title in ${page.path}`);
    if (!meta) fail(`Missing meta description in ${page.path}`);
    if (titles.has(title)) fail(`Duplicate title found in ${page.path} and ${titles.get(title)}`);
    if (metas.has(meta)) fail(`Duplicate meta description found in ${page.path} and ${metas.get(meta)}`);
    titles.set(title, page.path);
    metas.set(meta, page.path);

    if (canonical !== canonicalUrl(page.path)) {
      fail(`Canonical mismatch in ${page.path}. Expected ${canonicalUrl(page.path)} but found ${canonical}`);
    }

    if (!pair) {
      fail(`Missing pair definition for ${page.path}`);
    }

    const expectedEn = canonicalUrl(page.locale === "en" ? page.path : pair.path);
    const expectedNl = canonicalUrl(page.locale === "nl" ? page.path : pair.path);

    if (altEn !== expectedEn) fail(`hreflang en mismatch in ${page.path}`);
    if (altNl !== expectedNl) fail(`hreflang nl mismatch in ${page.path}`);
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
        if (similarity(descriptions[i], descriptions[j]) > 0.8) {
          fail(`Card descriptions too similar in ${page.path}: "${descriptions[i]}" / "${descriptions[j]}"`);
        }
      }
    }

    const pairHtml = readFile(pair.path);
    const pairAlternate = getAlternate(pairHtml, page.locale);
    if (pairAlternate !== canonicalUrl(page.path)) {
      fail(`Reciprocal hreflang missing between ${page.path} and ${pair.path}`);
    }
  });
}

function validateSitemap() {
  const pages = [...readJson("data/pages.en.json"), ...readJson("data/pages.nl.json")];
  const sitemap = fs.readFileSync(sitePathToFile("/sitemap.xml"), "utf8");
  pages.forEach((page) => {
    if (!sitemap.includes(`<loc>${canonicalUrl(page.path)}</loc>`)) {
      fail(`Missing ${page.path} in sitemap.xml`);
    }
  });
}

const productsEn = readJson("data/products.en.json");
const productsNl = readJson("data/products.nl.json");

validateProducts(productsEn, "en");
validateProducts(productsNl, "nl");
validatePageData(productsEn);
validatePages();
validateSitemap();

console.log("SEO validation passed.");
