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
    footerIntents: "Gift intents",
    footerTagline: "Handmade wooden gifts with warmth, detail and character.",
    footerNote: "Rated 4.96/5 on Etsy for thoughtful service, strong detail and gift-ready quality.",
    featuredHeading: "Best Picks",
    featuredIntro: "Start with these highlighted products and then move into the full grid below.",
    catalogHeading: "Product Grid",
    faqHeading: "Frequently Asked Questions",
    faqIntro: "Quick answers for visitors who want a faster decision path.",
    relatedHeading: "Related Collections",
    relatedIntro: "Keep browsing with these internal links.",
    whyHeading: "Why This Matters",
    intentsHeading: "Shop by gift intent",
    intentsIntro: "These pages translate buyer intent into clearer landing pages.",
    collectionsHeading: "Browse by collection",
    collectionsIntro: "The classic collection view still matters and remains linked throughout the site.",
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
    footerIntents: "Cadeau-intenties",
    footerTagline: "Handgemaakte houten cadeaus met warmte, detail en karakter.",
    footerNote: "Beoordeeld met 4.96/5 op Etsy voor attente service, mooi detail en cadeauwaardige kwaliteit.",
    featuredHeading: "Beste Keuzes",
    featuredIntro: "Begin met deze uitgelichte producten en ga daarna door naar het volledige overzicht.",
    catalogHeading: "Productgrid",
    faqHeading: "Veelgestelde Vragen",
    faqIntro: "Korte antwoorden voor bezoekers die sneller willen kiezen.",
    relatedHeading: "Gerelateerde Collecties",
    relatedIntro: "Blader verder via deze interne links.",
    whyHeading: "Waarom Dit Werkt",
    intentsHeading: "Shop per cadeau-intentie",
    intentsIntro: "Deze pagina's vertalen koopintentie naar duidelijkere landingspagina's.",
    collectionsHeading: "Blader per collectie",
    collectionsIntro: "Het klassieke collectieoverzicht blijft belangrijk en is overal intern gelinkt.",
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
  const chips = [product.price_label, ...(product.chips || [])].slice(0, 3);
  return chips.map((chip) => `<span class="chip">${escapeHtml(chip)}</span>`).join("");
}

function getPageIntent(page) {
  if (page.path.includes("cat-lover") || page.path.includes("kattenliefhebbers")) return "cat";
  if (page.path.includes("reader-gifts") || page.path.includes("lezerscadeaus")) return "reader";
  if (page.path.includes("housewarming") || page.path.includes("verhuiscadeaus")) return "housewarming";
  return "generic";
}

function sentenceCase(value) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function fallbackSignal(value, fallback) {
  return value && value.trim() ? value : fallback;
}

function productLead(product) {
  return (product.name || "")
    .replace(/\bWooden Coasters?\b/gi, "")
    .replace(/\bHouten Onderzetters?\b/gi, "")
    .replace(/\bWooden Bookmark\b/gi, "")
    .replace(/\bHouten Bladwijzer\b/gi, "")
    .replace(/\bCoaster Set\b/gi, "")
    .replace(/\bOnderzetterset\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function productPatterns(locale, pageIntent, category) {
  const banks = {
    en: {
      generic: {
        coasters: [
          (p) => `${sentenceCase(p.benefit_primary)} while bringing ${p.motif} into ${p.usage_context}. ${sentenceCase(p.benefit_secondary)} without feeling overdone.`,
          (p) => `A ${p.style[0] || "cozy"} wooden pick for ${p.occasions[0] || "easy gifting"}, with ${p.motif} that suits ${p.usage_context}.`,
          (p) => `Built for ${p.audience[0] || "gift shoppers"}, this coaster set adds ${p.motif} and keeps tables feeling warm rather than generic.`,
          (p) => `Useful first and decorative second, this set ${p.benefit_primary} and still reads clearly for ${p.intent_tags[0] || "cozy gifting"}.`,
          (p) => `An easy way to add ${p.motif} to ${p.usage_context}, especially when the buyer wants something practical to open and use fast.`,
          (p) => `This coaster set balances function and theme well: it ${p.benefit_primary} and leaves behind ${p.benefit_secondary} in the room.`
        ],
        bookmarks: [
          (p) => `${sentenceCase(p.benefit_primary)} with ${p.motif} and feels right for ${p.audience[0] || "readers"} who like a clear bookish theme.`,
          (p) => `A slim reader gift for ${p.usage_context}, with ${p.motif} that makes the book stack feel more personal.`,
          (p) => `This bookmark leans into ${p.style[0] || "bookish"} detail while it ${p.benefit_primary} for daily reading and gifting.`,
          (p) => `A thoughtful option for ${p.intent_tags[0] || "book lover gifting"}, especially when someone wants one focused item instead of a bundle.`,
          (p) => `Made for ${p.audience[0] || "book lovers"}, it adds ${p.motif} and keeps the page close through repeated reading sessions.`,
          (p) => `Simple to gift and easy to use, this bookmark ${p.benefit_primary} and keeps a little more personality inside the book.`
        ],
        "wooden-gifts": [
          (p) => `${sentenceCase(p.benefit_primary)} and brings ${p.motif} into ${p.usage_context}. ${sentenceCase(p.benefit_secondary)} in a way that still feels easy to place.`,
          (p) => `A strong ${p.occasions[0] || "gift"} option when the buyer wants decor that looks intentional but does not overwhelm the room.`,
          (p) => `This ${p.format_label} works well in ${p.usage_context}, especially for shoppers chasing ${p.intent_tags[0] || "cozy home decor"}.`,
          (p) => `It leans more decorative than practical, but still helps the gift feel specific through ${p.motif} and a clear room context.`,
          (p) => `A warm wooden accent for ${p.audience[0] || "gift shoppers"}, with enough personality to feel chosen instead of filler.`,
          (p) => `Good for shelves, doors or side tables, this piece ${p.benefit_primary} while keeping the styling easy and giftable.`
        ]
      },
      cat: {
        coasters: [
          (p) => `${sentenceCase(p.benefit_primary)} and keeps the cat-led theme obvious on coffee tables, desks and cozy corners.`,
          (p) => `A practical cat lover gift with ${p.motif} that still feels warm enough for everyday styling.`,
          (p) => `Easy to buy for cat owners because it adds a clear feline mood without turning the room into novelty decor.`
        ],
        "wooden-gifts": [
          (p) => `A softer cat-themed gift for shelves and nightstands, with ${p.motif} that suits quiet corners and reading spaces.`,
          (p) => `This piece leans more decor-led than a coaster set, which makes it useful when the gift should feel cozy first.`,
          (p) => `Good for cat lovers who prefer a smaller wooden accent instead of another practical tabletop item.`
        ]
      },
      reader: {
        bookmarks: [
          (p) => `${sentenceCase(p.benefit_primary)} and instantly reads as a book lover gift for ${p.usage_context}.`,
          (p) => `A focused reader gift with ${p.motif}, especially good when a shopper wants one bookish item that still feels themed.`,
          (p) => `This bookmark makes a strong reading-nook add-on because it is easy to gift, easy to use and clearly book-led.`
        ],
        coasters: [
          (p) => `A reading-nook-friendly coaster set that keeps drinks in place while carrying ${p.motif} into the room.`,
          (p) => `Useful for book lovers who also want tabletop decor that still matches the reading mood.`
        ],
        "wooden-gifts": [
          (p) => `A decor-led reader gift that helps the room feel more bookish without relying only on bookmarks.`,
          (p) => `Good for shelves, doors and reading corners where the gift should shape the mood as much as the function.`
        ]
      },
      housewarming: {
        coasters: [
          (p) => `${sentenceCase(p.benefit_primary)} from day one, which makes this an easy housewarming pick for tables that need something useful.`,
          (p) => `A warm new-home gift because it combines ${p.motif} with daily function instead of sitting unused on a shelf.`,
          (p) => `Made for cozy rooms and coffee tables, this set works when the buyer wants something simple to style right away.`
        ],
        "wooden-gifts": [
          (p) => `A decor-led housewarming piece for shelves and side tables, with ${p.motif} that settles into the room quickly.`,
          (p) => `Useful when the gift should feel home-focused rather than person-focused, especially for calm corners and entry points.`,
          (p) => `This wooden accent fits new-home gifting because it helps shape atmosphere without asking for much space.`
        ]
      }
    },
    nl: {
      generic: {
        coasters: [
          (p) => `${sentenceCase(p.benefit_primary)} en brengt ${p.motif} naar ${p.usage_context}. ${sentenceCase(p.benefit_secondary)} zonder te zwaar te voelen.`,
          (p) => `Een ${p.style[0] || "gezellige"} houten keuze voor ${p.occasions[0] || "cadeaumomenten"}, met ${p.motif} dat past bij ${p.usage_context}.`,
          (p) => `Gemaakt voor ${p.audience[0] || "cadeauzoekers"}, met een set die tafels bruikbaar houdt en tegelijk meteen meer sfeer geeft.`,
          (p) => `Praktisch eerst en decoratief daarna: deze set ${p.benefit_primary} en voelt toch duidelijk gekozen voor ${p.intent_tags[0] || "gezellige cadeaus"}.`,
          (p) => `Een makkelijke manier om ${p.motif} toe te voegen aan ${p.usage_context}, vooral wanneer het cadeau snel goed moet voelen.`,
          (p) => `Deze onderzetterset houdt functie en thema in balans: ze ${p.benefit_primary} en laat tegelijk ${p.benefit_secondary} achter in de ruimte.`
        ],
        bookmarks: [
          (p) => `${sentenceCase(p.benefit_primary)} met ${p.motif} en voelt juist voor ${p.audience[0] || "lezers"} die een duidelijke boekensfeer willen.`,
          (p) => `Een slank lezerscadeau voor ${p.usage_context}, met ${p.motif} dat de boekenstapel persoonlijker maakt.`,
          (p) => `Deze bladwijzer leunt op ${p.style[0] || "boekachtige"} details terwijl hij ${p.benefit_primary} voor dagelijks lezen en cadeaugeven.`,
          (p) => `Een doordachte keuze voor ${p.intent_tags[0] || "cadeaus voor boekenliefhebbers"}, vooral wanneer iemand liever één gericht item geeft dan een bundel.`,
          (p) => `Gemaakt voor ${p.audience[0] || "boekenliefhebbers"} en makkelijk mee te geven, met een detail dat in het boek blijft doorwerken.`,
          (p) => `Eenvoudig om cadeau te doen en prettig om te gebruiken: deze bladwijzer ${p.benefit_primary} en laat wat extra persoonlijkheid achter in het boek.`
        ],
        "wooden-gifts": [
          (p) => `${sentenceCase(p.benefit_primary)} en brengt ${p.motif} naar ${p.usage_context}. ${sentenceCase(p.benefit_secondary)} op een manier die makkelijk neer te zetten blijft.`,
          (p) => `Een sterke keuze voor ${p.occasions[0] || "cadeaumomenten"} wanneer de koper decoratie wil die bewust voelt zonder te overheersen.`,
          (p) => `Dit ${p.format_label} werkt goed in ${p.usage_context}, vooral voor bezoekers die zoeken naar ${p.intent_tags[0] || "gezellige woondecoratie"}.`,
          (p) => `Meer decoratief dan praktisch, maar daardoor juist sterk wanneer het cadeau vooral sfeer en karakter moet toevoegen.`,
          (p) => `Een warm houten accent voor ${p.audience[0] || "cadeauzoekers"}, met genoeg persoonlijkheid om niet als opvuller te voelen.`,
          (p) => `Goed voor planken, deuren of bijzettafels: dit stuk ${p.benefit_primary} en houdt de styling tegelijk makkelijk en cadeauwaardig.`
        ]
      },
      cat: {
        coasters: [
          (p) => `${sentenceCase(p.benefit_primary)} en houdt het kattenthema duidelijk aanwezig op salontafels, bureaus en knusse hoekjes.`,
          (p) => `Een praktisch cadeau voor kattenliefhebbers met ${p.motif} dat toch warm genoeg blijft voor dagelijks gebruik.`,
          (p) => `Makkelijk te kopen voor katteneigenaars omdat het een duidelijke kattensfeer toevoegt zonder kitscherig te worden.`
        ],
        "wooden-gifts": [
          (p) => `Een zachter kattenthema-cadeau voor planken en nachtkastjes, met ${p.motif} dat goed werkt in stille hoekjes en leesplekken.`,
          (p) => `Dit stuk leunt meer op decoratie dan op gebruik, waardoor het goed past als het cadeau vooral gezellig moet voelen.`,
          (p) => `Sterk voor kattenliefhebbers die liever een klein houten accent krijgen dan nog een puur praktisch tafelitem.`
        ]
      },
      reader: {
        bookmarks: [
          (p) => `${sentenceCase(p.benefit_primary)} en leest meteen als boekcadeau voor ${p.usage_context}.`,
          (p) => `Een gericht lezerscadeau met ${p.motif}, vooral fijn wanneer iemand één boekig item wil dat toch thematisch aanvoelt.`,
          (p) => `Deze bladwijzer werkt sterk in een leeshoek omdat hij makkelijk te geven is, prettig gebruikt en duidelijk boekgericht blijft.`
        ],
        coasters: [
          (p) => `Een leeshoekvriendelijke onderzetterset die drankjes op hun plek houdt en tegelijk ${p.motif} naar de ruimte brengt.`,
          (p) => `Handig voor boekenliefhebbers die ook decoratie op tafel willen die nog steeds bij het leesgevoel past.`
        ],
        "wooden-gifts": [
          (p) => `Een decoratief lezerscadeau dat de ruimte boekachtiger laat voelen zonder alleen op bladwijzers te leunen.`,
          (p) => `Goed voor planken, deuren en leeshoeken waar het cadeau net zo goed sfeer als functie moet toevoegen.`
        ]
      },
      housewarming: {
        coasters: [
          (p) => `${sentenceCase(p.benefit_primary)} vanaf dag één, wat dit tot een makkelijke verhuiskeuze maakt voor tafels die meteen iets bruikbaars nodig hebben.`,
          (p) => `Een warm wooncadeau omdat het ${p.motif} combineert met dagelijks gebruik in plaats van ongebruikt op een plank te belanden.`,
          (p) => `Gemaakt voor gezellige kamers en salontafels, juist wanneer de koper iets zoekt dat meteen neer te zetten is.`
        ],
        "wooden-gifts": [
          (p) => `Een decoratief verhuisstuk voor planken en bijzettafels, met ${p.motif} dat snel in de ruimte landt.`,
          (p) => `Handig wanneer het cadeau meer op het huis dan op één persoon gericht moet zijn, vooral voor rustige hoekjes en ingangen.`,
          (p) => `Dit houten accent past goed bij een nieuw huis omdat het sfeer helpt neerzetten zonder veel plek te vragen.`
        ]
      }
    }
  };

  const source = banks[locale];
  return (source[pageIntent] && source[pageIntent][category]) || source.generic[category] || source.generic["wooden-gifts"];
}

function buildCardDetails(product, page, lead) {
  const audience = fallbackSignal(product.audience[0], page.locale === "en" ? "gift shoppers" : "cadeauzoekers");
  const occasion = fallbackSignal(product.occasions[0], page.locale === "en" ? "everyday gifting" : "kleine cadeaumomenten");
  const style = fallbackSignal(product.style[0], page.locale === "en" ? "cozy" : "gezellig");
  const intent = fallbackSignal(product.intent_tags[0], page.locale === "en" ? "cozy gifting" : "gezellige cadeaus");
  const usage = fallbackSignal(product.usage_context, page.locale === "en" ? "tables, shelves and easy gift bundles" : "tafels, planken en makkelijke cadeaupakketten");
  const motif = fallbackSignal(product.motif, page.locale === "en" ? "warm engraved detail" : "een warme gravure");
  const signature = lead || product.name;
  return page.locale === "en"
    ? [
        `The ${signature} design keeps the set closer to ${intent} than plain tabletop decor.`,
        `It feels especially easy for ${audience} shopping around ${occasion} rather than generic filler gifts.`,
        `That ${style} styling gives ${audience} a more specific pick for ${usage}.`,
        `The ${signature} look makes ${motif} feel chosen instead of generic when it lands in ${usage}.`,
        `It is a cleaner match for ${occasion} because ${audience} can picture the ${signature} theme straight away.`,
        `That mix of ${motif} and daily use keeps ${signature} more memorable in Etsy search-heavy gifting.`,
        `${signature} also leans more personal because the theme reads clearly before someone even clicks through.`,
        `For buyers comparing many listings fast, ${signature} gives ${audience} a more obvious reason to stop on this one.`,
        `It works best when ${usage} needs a gift that feels identifiable, not just practical.`,
        `The overall mood stays ${style}, which helps ${signature} land better for ${occasion} searches.`
      ]
    : [
        `Het ${signature}-ontwerp houdt de set dichter bij ${intent} dan bij gewone tafeldecoratie.`,
        `Het voelt vooral makkelijk voor ${audience} die zoeken rond ${occasion} in plaats van een algemeen cadeau.`,
        `Die ${style} uitstraling geeft ${audience} een gerichtere keuze voor ${usage}.`,
        `De ${signature}-uitstraling laat ${motif} gekozen voelen in plaats van algemeen wanneer het in ${usage} terechtkomt.`,
        `Het past beter bij ${occasion} omdat ${audience} het ${signature}-thema meteen voor zich zien.`,
        `De combinatie van ${motif} en dagelijks gebruik maakt ${signature} beter onthoudbaar tijdens cadeauzoekopdrachten op Etsy.`,
        `${signature} voelt ook persoonlijker omdat het thema al duidelijk is voordat iemand doorklikt.`,
        `Voor kopers die snel veel listings vergelijken, geeft ${signature} ${audience} een duidelijkere reden om hier te stoppen.`,
        `Het werkt het best wanneer ${usage} een cadeau nodig heeft dat herkenbaar voelt en niet alleen praktisch is.`,
        `De totale sfeer blijft ${style}, waardoor ${signature} beter aansluit op zoekopdrachten rond ${occasion}.`
      ];
}

function buildCardDescription(product, page, position = 0) {
  const patterns = productPatterns(page.locale, getPageIntent(page), product.category);
  const closers = page.locale === "en"
    ? [
        "It suits quick Etsy clicks when the theme matters first.",
        "That keeps the gift practical without flattening the personality.",
        "It works especially well in bundles and smaller occasion gifting.",
        "That makes it easier to match to a room, a person or a shelf.",
        "It is a strong pick when someone wants useful decor, not filler.",
        "That balance is why it fits so many easy-gift searches."
      ]
    : [
        "Dat helpt wanneer het cadeau snel goed moet aanvoelen.",
        "Zo blijft het praktisch zonder dat het karakter verloren gaat.",
        "Daardoor werkt het goed in bundels en kleinere cadeaumomenten.",
        "Zo is het makkelijker te koppelen aan een ruimte, persoon of plank.",
        "Het is sterk wanneer iemand bruikbare decoratie zoekt in plaats van opvulling.",
        "Die balans maakt het passend voor veel makkelijke cadeauzoekopdrachten."
      ];
  const lead = productLead(product);
  const details = buildCardDetails(product, page, lead);
  const patternIndex = position % patterns.length;
  const detailIndex = Math.floor(position / patterns.length) % details.length;
  const closerIndex = Math.floor(position / (patterns.length * details.length)) % closers.length;
  const body = patterns[patternIndex](product);
  const detail = details[detailIndex];
  const closer = closers[closerIndex];
  return lead ? `${lead}: ${body} ${detail} ${closer}` : `${body} ${detail} ${closer}`;
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
  const id = key === "intentCards" ? "gift-intents" : "collections";
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

  if (page.template === "home") {
    scripts.push({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${canonicalUrl(page.path)}#website`,
          url: canonicalUrl(page.path),
          name: "Craftygiftsplace",
          inLanguage: page.locale
        },
        {
          "@type": "Organization",
          "@id": `${canonicalUrl("/index.html")}#organization`,
          name: "Craftygiftsplace",
          url: canonicalUrl("/index.html"),
          logo: absoluteUrl("/assets/img/logos/craftygiftsplace-logo.png"),
          sameAs: ["https://www.etsy.com/shop/Craftygiftsplace"]
        },
        {
          "@type": "ItemList",
          "@id": `${canonicalUrl(page.path)}#featured-items`,
          name: page.locale === "en" ? "Featured products" : "Uitgelichte producten",
          itemListElement: featured
        }
      ]
    });
  } else {
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
    if (featured.length) {
      scripts.push({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: page.h1,
        itemListElement: featured
      });
    }
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
