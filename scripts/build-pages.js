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
const { LOCALE_ORDER, LOCALE_META } = require("./lib/locales");

const LOCALE_LANGUAGE_NAMES = {
  nl: "Nederlands",
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  pt: "Português",
  it: "Italiano"
};

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
    footerNote: "Rated 4.96/5 on Etsy for thoughtful service, beautiful detail and handmade quality.",
    footerEtsyCta: "Shop Craftygiftsplace on Etsy →",
    featuredHeading: "Best Picks",
    featuredIntro: "Start with a few standout pieces, then browse the full selection below.",
    catalogHeading: "Browse the Collection",
    faqHeading: "Frequently Asked Questions",
    faqIntro: "Quick answers for visitors who want a faster decision path.",
    relatedHeading: "Related Collections",
    relatedIntro: "Keep exploring with these suggestions.",
    whyHeading: "Why Shoppers Love It",
    whyRating: "4.96/5 on Etsy across hundreds of reviews.",
    whyCtaLabel: "Read Etsy reviews →",
    intentsHeading: "Shop by occasion",
    intentsIntro: "Start with the kind of gift you want to give.",
    collectionsHeading: "Browse by collection",
    collectionsIntro: "Prefer browsing by product type? Start with these core collections.",
    reviewsHeading: "Loved on Etsy",
    reviewsIntro: "A few short reviews that reinforce quality and trust.",
    cardCtaText: "View on Etsy",
    pageNote: "Compare here, then open Etsy for pricing, reviews and checkout.",
    heroFactsLabel: "Why this store feels safe to browse"
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
    footerNote: "Beoordeeld met 4.96/5 op Etsy voor attente service, mooi detail en handgemaakte kwaliteit.",
    footerEtsyCta: "Bekijk Craftygiftsplace op Etsy →",
    featuredHeading: "Favorieten",
    featuredIntro: "Begin met een paar uitgelichte stukken en bekijk daarna de volledige selectie.",
    catalogHeading: "Bekijk de collectie",
    faqHeading: "Veelgestelde Vragen",
    faqIntro: "Korte antwoorden voor bezoekers die sneller willen kiezen.",
    relatedHeading: "Gerelateerde Collecties",
    relatedIntro: "Blader verder met deze suggesties.",
    whyHeading: "Waarom Mensen Hiervoor Kiezen",
    whyRating: "4,96/5 op Etsy in honderden beoordelingen.",
    whyCtaLabel: "Lees Etsy-beoordelingen →",
    intentsHeading: "Shop per gelegenheid",
    intentsIntro: "Begin bij het soort cadeau dat je wilt geven.",
    collectionsHeading: "Blader per collectie",
    collectionsIntro: "Kijk je liever per producttype? Begin dan met deze hoofdcollecties.",
    reviewsHeading: "Geliefd op Etsy",
    reviewsIntro: "Een paar korte reviews die kwaliteit en vertrouwen versterken.",
    cardCtaText: "Bekijk op Etsy",
    pageNote: "Vergelijk hier en open daarna Etsy voor prijs, reviews en bestellen.",
    heroFactsLabel: "Waarom deze shop veilig voelt om te bekijken"
  },
  de: {
    brandTagline: "Handgemachte Holzgeschenke mit Charakter",
    skipLink: "Zum Inhalt springen",
    navAria: "Hauptmenü",
    langSwitch: "Sprache wählen",
    homeAria: "Zur Startseite",
    menu: "Menü",
    navToggle: "Menü öffnen",
    home: "Start",
    footerCollections: "Kollektionen",
    footerIntents: "Geschenkideen",
    footerTagline: "Handgemachte Holzgeschenke mit Wärme, Detail und Charakter.",
    footerNote: "Mit 4.96/5 auf Etsy bewertet für aufmerksamen Service, schöne Details und handgemachte Qualität.",
    footerEtsyCta: "Craftygiftsplace auf Etsy entdecken →",
    featuredHeading: "Favoriten",
    featuredIntro: "Starte mit ein paar ausgewählten Stücken und sieh dir danach die ganze Auswahl an.",
    catalogHeading: "Kollektion ansehen",
    faqHeading: "Häufige Fragen",
    faqIntro: "Kurze Antworten für Besucher, die schneller entscheiden möchten.",
    relatedHeading: "Verwandte Kollektionen",
    relatedIntro: "Mit diesen Vorschlägen kannst du weiterstöbern.",
    whyHeading: "Warum Käufer es mögen",
    whyRating: "4,96/5 auf Etsy in Hunderten von Bewertungen.",
    whyCtaLabel: "Etsy-Bewertungen lesen →",
    intentsHeading: "Nach Anlass shoppen",
    intentsIntro: "Starte mit der Art von Geschenk, die du geben möchtest.",
    collectionsHeading: "Nach Kollektion stöbern",
    collectionsIntro: "Lieber nach Produkttyp schauen? Dann beginne mit diesen Kernkollektionen.",
    reviewsHeading: "Beliebt auf Etsy",
    reviewsIntro: "Ein paar kurze Bewertungen, die Qualität und Vertrauen unterstreichen.",
    cardCtaText: "Auf Etsy ansehen",
    pageNote: "Vergleiche hier und öffne danach Etsy für Preise, Bewertungen und Bestellung.",
    heroFactsLabel: "Warum sich diese Seite vertrauenswürdig anfühlt"
  },
  fr: {
    brandTagline: "Cadeaux en bois faits main avec caractère",
    skipLink: "Aller au contenu",
    navAria: "Menu principal",
    langSwitch: "Choisir la langue",
    homeAria: "Aller à la page d'accueil",
    menu: "Menu",
    navToggle: "Ouvrir le menu",
    home: "Accueil",
    footerCollections: "Collections",
    footerIntents: "Idées cadeaux",
    footerTagline: "Cadeaux en bois faits main avec chaleur, détail et caractère.",
    footerNote: "Noté 4,96/5 sur Etsy pour un service attentionné, de beaux détails et une vraie finition artisanale.",
    footerEtsyCta: "Voir Craftygiftsplace sur Etsy →",
    featuredHeading: "Meilleures idées",
    featuredIntro: "Commencez par quelques pièces fortes, puis parcourez la sélection complète.",
    catalogHeading: "Voir la collection",
    faqHeading: "Questions fréquentes",
    faqIntro: "Des réponses rapides pour les visiteurs qui veulent décider plus vite.",
    relatedHeading: "Collections associées",
    relatedIntro: "Continuez avec ces suggestions.",
    whyHeading: "Pourquoi ça plaît",
    whyRating: "4,96/5 sur Etsy sur des centaines d'avis.",
    whyCtaLabel: "Lire les avis Etsy →",
    intentsHeading: "Acheter par occasion",
    intentsIntro: "Commencez par le type de cadeau que vous voulez offrir.",
    collectionsHeading: "Acheter par collection",
    collectionsIntro: "Vous préférez partir du type de produit ? Commencez par ces collections principales.",
    reviewsHeading: "Aimé sur Etsy",
    reviewsIntro: "Quelques avis courts qui renforcent la confiance.",
    cardCtaText: "Voir sur Etsy",
    pageNote: "Comparez ici, puis ouvrez Etsy pour les prix, les avis et la commande.",
    heroFactsLabel: "Pourquoi cette boutique inspire confiance"
  },
  es: {
    brandTagline: "Regalos de madera hechos a mano con carácter",
    skipLink: "Ir al contenido",
    navAria: "Menú principal",
    langSwitch: "Elegir idioma",
    homeAria: "Ir a la página de inicio",
    menu: "Menú",
    navToggle: "Abrir el menú",
    home: "Inicio",
    footerCollections: "Colecciones",
    footerIntents: "Ideas de regalo",
    footerTagline: "Regalos de madera hechos a mano con calidez, detalle y carácter.",
    footerNote: "Valorado con 4,96/5 en Etsy por un servicio atento, bonitos detalles y acabado artesanal.",
    footerEtsyCta: "Ver Craftygiftsplace en Etsy →",
    featuredHeading: "Mejores ideas",
    featuredIntro: "Empieza por algunas piezas destacadas y después explora la selección completa.",
    catalogHeading: "Ver la colección",
    faqHeading: "Preguntas frecuentes",
    faqIntro: "Respuestas rápidas para quien quiere decidir más deprisa.",
    relatedHeading: "Colecciones relacionadas",
    relatedIntro: "Sigue explorando con estas sugerencias.",
    whyHeading: "Por qué gusta",
    whyRating: "4,96/5 en Etsy en cientos de reseñas.",
    whyCtaLabel: "Leer reseñas de Etsy →",
    intentsHeading: "Comprar por ocasión",
    intentsIntro: "Empieza por el tipo de regalo que quieres hacer.",
    collectionsHeading: "Comprar por colección",
    collectionsIntro: "¿Prefieres empezar por el tipo de producto? Comienza por estas colecciones principales.",
    reviewsHeading: "Muy querido en Etsy",
    reviewsIntro: "Algunas reseñas breves que refuerzan calidad y confianza.",
    cardCtaText: "Ver en Etsy",
    pageNote: "Compara aquí y luego abre Etsy para ver precios, reseñas y comprar.",
    heroFactsLabel: "Por qué esta tienda transmite confianza"
  },
  pt: {
    brandTagline: "Presentes em madeira feitos à mão com carácter",
    skipLink: "Ir para o conteúdo",
    navAria: "Menu principal",
    langSwitch: "Escolher idioma",
    homeAria: "Ir para a página inicial",
    menu: "Menu",
    navToggle: "Abrir o menu",
    home: "Início",
    footerCollections: "Coleções",
    footerIntents: "Ideias de presente",
    footerTagline: "Presentes em madeira feitos à mão com calor, detalhe e carácter.",
    footerNote: "Avaliado com 4,96/5 na Etsy por um serviço atencioso, belos detalhes e acabamento artesanal.",
    footerEtsyCta: "Ver Craftygiftsplace na Etsy →",
    featuredHeading: "Melhores escolhas",
    featuredIntro: "Começa por algumas peças em destaque e depois explora a seleção completa.",
    catalogHeading: "Ver a coleção",
    faqHeading: "Perguntas frequentes",
    faqIntro: "Respostas rápidas para quem quer decidir mais depressa.",
    relatedHeading: "Coleções relacionadas",
    relatedIntro: "Continua a explorar com estas sugestões.",
    whyHeading: "Porque agrada",
    whyRating: "4,96/5 na Etsy em centenas de avaliações.",
    whyCtaLabel: "Ler avaliações na Etsy →",
    intentsHeading: "Comprar por ocasião",
    intentsIntro: "Começa pelo tipo de presente que queres oferecer.",
    collectionsHeading: "Comprar por coleção",
    collectionsIntro: "Preferes começar pelo tipo de produto? Começa por estas coleções principais.",
    reviewsHeading: "Adorado na Etsy",
    reviewsIntro: "Algumas avaliações curtas que reforçam qualidade e confiança.",
    cardCtaText: "Ver na Etsy",
    pageNote: "Compara aqui e depois abre a Etsy para preços, avaliações e encomendar.",
    heroFactsLabel: "Porque esta loja transmite confiança"
  },
  it: {
    brandTagline: "Regali in legno fatti a mano con carattere",
    skipLink: "Vai al contenuto",
    navAria: "Menu principale",
    langSwitch: "Scegli la lingua",
    homeAria: "Vai alla homepage",
    menu: "Menu",
    navToggle: "Apri il menu",
    home: "Home",
    footerCollections: "Collezioni",
    footerIntents: "Idee regalo",
    footerTagline: "Regali in legno fatti a mano con calore, dettaglio e carattere.",
    footerNote: "Valutato 4,96/5 su Etsy per un servizio attento, bei dettagli e qualità artigianale.",
    footerEtsyCta: "Vedi Craftygiftsplace su Etsy →",
    featuredHeading: "Scelte migliori",
    featuredIntro: "Inizia con alcune proposte forti e poi guarda tutta la selezione.",
    catalogHeading: "Vedi la collezione",
    faqHeading: "Domande frequenti",
    faqIntro: "Risposte rapide per chi vuole decidere più in fretta.",
    relatedHeading: "Collezioni correlate",
    relatedIntro: "Continua a esplorare con questi suggerimenti.",
    whyHeading: "Perché piace",
    whyRating: "4,96/5 su Etsy in centinaia di recensioni.",
    whyCtaLabel: "Leggi le recensioni Etsy →",
    intentsHeading: "Acquista per occasione",
    intentsIntro: "Inizia dal tipo di regalo che vuoi fare.",
    collectionsHeading: "Acquista per collezione",
    collectionsIntro: "Preferisci partire dal tipo di prodotto? Comincia da queste collezioni principali.",
    reviewsHeading: "Amato su Etsy",
    reviewsIntro: "Alcune recensioni brevi che rafforzano qualità e fiducia.",
    cardCtaText: "Vedi su Etsy",
    pageNote: "Confronta qui e poi apri Etsy per prezzi, recensioni e ordine.",
    heroFactsLabel: "Perché questo negozio ispira fiducia"
  }
};

const productCardTemplate = loadTemplate("product-card.html");
const faqTemplate = loadTemplate("faq.html");
const headTemplate = loadTemplate("head.html");
const headerTemplate = loadTemplate("header.html");
const footerTemplate = loadTemplate("footer.html");
const languageSwitcherTemplate = loadTemplate("language-switcher.html");
const homeHeroTemplate = loadTemplate("home-hero.html");
const homeCategoryCardTemplate = loadTemplate("home-category-card.html");
const homeBestsellerCardTemplate = loadTemplate("home-bestseller-card.html");

function loadData() {
  const pagesByLocale = {};
  const productsListByLocale = {};

  LOCALE_ORDER.forEach((locale) => {
    pagesByLocale[locale] = readJson(LOCALE_META[locale].pageFile);
    productsListByLocale[locale] = readJson(LOCALE_META[locale].productFile);
  });

  const pages = LOCALE_ORDER.flatMap((locale) => pagesByLocale[locale]);
  return {
    pages,
    pagesByPath: new Map(pages.map((page) => [page.path, page])),
    productsByLocale: Object.fromEntries(LOCALE_ORDER.map((locale) => [locale, new Map(productsListByLocale[locale].map((product) => [product.slug, product]))])),
    productsListByLocale
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

  if (locale === "de") {
    return [
      { label: text.de.home, path: "/de/index.html" },
      { label: "Holzuntersetzer", path: "/de/pages/holzuntersetzer.html" },
      { label: "Holzlesezeichen", path: "/de/pages/holzlesezeichen.html" },
      { label: "Holzgeschenke", path: "/de/pages/holzgeschenke.html" },
      { label: "Kontakt", path: "/de/pages/kontakt.html" }
    ];
  }

  if (locale === "fr") {
    return [
      { label: text.fr.home, path: "/fr/index.html" },
      { label: "Sous-verres en bois", path: "/fr/pages/sous-verres-en-bois.html" },
      { label: "Marque-pages en bois", path: "/fr/pages/marque-pages-en-bois.html" },
      { label: "Cadeaux en bois", path: "/fr/pages/cadeaux-en-bois.html" },
      { label: "Contact", path: "/fr/pages/contact.html" }
    ];
  }

  if (locale === "es") {
    return [
      { label: text.es.home, path: "/es/index.html" },
      { label: "Posavasos de madera", path: "/es/pages/posavasos-de-madera.html" },
      { label: "Marcapáginas de madera", path: "/es/pages/marcapaginas-de-madera.html" },
      { label: "Regalos de madera", path: "/es/pages/regalos-de-madera.html" },
      { label: "Contacto", path: "/es/pages/contacto.html" }
    ];
  }

  if (locale === "pt") {
    return [
      { label: text.pt.home, path: "/pt/index.html" },
      { label: "Porta-copos de madeira", path: "/pt/pages/porta-copos-de-madeira.html" },
      { label: "Marcadores de livros", path: "/pt/pages/marcadores-de-livros-de-madeira.html" },
      { label: "Presentes de madeira", path: "/pt/pages/presentes-de-madeira.html" },
      { label: "Contacto", path: "/pt/pages/contacto.html" }
    ];
  }

  if (locale === "it") {
    return [
      { label: text.it.home, path: "/it/index.html" },
      { label: "Sottobicchieri in legno", path: "/it/pages/sottobicchieri-in-legno.html" },
      { label: "Segnalibri in legno", path: "/it/pages/segnalibri-in-legno.html" },
      { label: "Regali in legno", path: "/it/pages/regali-in-legno.html" },
      { label: "Contatto", path: "/it/pages/contatto.html" }
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

  if (locale === "de") {
    return [
      { label: "Geschenke für Katzenliebhaber", path: "/de/pages/geschenke-fuer-katzenliebhaber.html" },
      { label: "Geschenke für Leser", path: "/de/pages/geschenke-fuer-leser.html" },
      { label: "Einzugsgeschenke", path: "/de/pages/einzugsgeschenke.html" }
    ];
  }

  if (locale === "fr") {
    return [
      { label: "Cadeaux pour amoureux des chats", path: "/fr/pages/cadeaux-pour-amoureux-des-chats.html" },
      { label: "Cadeaux pour lecteurs", path: "/fr/pages/cadeaux-pour-lecteurs.html" },
      { label: "Cadeaux de crémaillère", path: "/fr/pages/cadeaux-de-cremaillere.html" }
    ];
  }

  if (locale === "es") {
    return [
      { label: "Regalos para amantes de los gatos", path: "/es/pages/regalos-para-amantes-de-los-gatos.html" },
      { label: "Regalos para lectores", path: "/es/pages/regalos-para-lectores.html" },
      { label: "Regalos para casa nueva", path: "/es/pages/regalos-para-casa-nueva.html" }
    ];
  }

  if (locale === "pt") {
    return [
      { label: "Presentes para amantes de gatos", path: "/pt/pages/presentes-para-amantes-de-gatos.html" },
      { label: "Presentes para leitores", path: "/pt/pages/presentes-para-leitores.html" },
      { label: "Presentes de casa nova", path: "/pt/pages/presentes-de-casa-nova.html" }
    ];
  }

  if (locale === "it") {
    return [
      { label: "Regali per amanti dei gatti", path: "/it/pages/regali-per-amanti-dei-gatti.html" },
      { label: "Regali per lettori", path: "/it/pages/regali-per-lettori.html" },
      { label: "Regali per la casa nuova", path: "/it/pages/regali-per-la-casa-nuova.html" }
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
  const cleaned = String(product.name || "")
    .replace(/\bWooden Coasters?\b/gi, "")
    .replace(/\bHouten Onderzetters?\b/gi, "")
    .replace(/\bHolzuntersetzer\b/gi, "")
    .replace(/\bWooden Bookmark\b/gi, "")
    .replace(/\bHouten Bladwijzer\b/gi, "")
    .replace(/\bHolzlesezeichen\b/gi, "")
    .replace(/\bCoaster Set\b/gi, "")
    .replace(/\bOnderzetterset\b/gi, "")
    .replace(/\bUntersetzer-Set\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned || /^(with|met|mit|voor|fuer|für|for)\b/i.test(cleaned) || cleaned.length < 4) {
    return String(product.name || "").trim();
  }

  return cleaned;
}

function buildDuplicateTail(product) {
  const tails = {
    en: `Shown here in the ${product.name} design.`,
    nl: `Hier in de uitvoering ${product.name}.`,
    de: `Hier in der Ausführung ${product.name}.`,
    fr: `Ici, dans la version ${product.name}.`,
    es: `Aquí, en la versión ${product.name}.`,
    pt: `Aqui, na versão ${product.name}.`,
    it: `Qui, nella versione ${product.name}.`
  };

  return tails[product.locale] || tails.en;
}

function summarizeText(value, maxSentences = 2) {
  const normalized = String(value || "").replace(/\s+/g, " ").trim();
  if (!normalized) return "";

  const sentences = normalized.match(/[^.!?]+[.!?]?/g) || [normalized];
  const summary = sentences.slice(0, maxSentences).join(" ").trim();
  return summary || normalized;
}

function getSpecialCardDescription(product, position = 0) {
  const specialBySlug = {
    "fantasy-reader-gift-set": {
      en: [
        "A ready-made gift set with a bookmark, door hanger and coasters for fantasy readers. It works well when one themed gift feels better than combining separate pieces."
      ],
      nl: [
        "Een kant-en-klare cadeauset met bladwijzer, deurhanger en onderzetters voor fantasylezers. Het werkt goed wanneer een thematisch cadeau beter past dan losse stukken combineren."
      ],
      de: [
        "Ein komplettes Set mit Lesezeichen, Türschild und Untersetzern für Fantasy-Leser. Es passt gut, wenn ein stimmiges Geschenk besser wirkt als mehrere einzelne Stücke."
      ],
      fr: [
        "Un coffret prêt à offrir avec marque-page, suspension de porte et dessous-verres pour lecteurs de fantasy. Il fonctionne bien quand un seul cadeau cohérent vaut mieux que plusieurs pièces séparées."
      ],
      es: [
        "Un set listo para regalar con marcapáginas, colgador de puerta y posavasos para lectores de fantasía. Funciona muy bien cuando un regalo temático completo encaja mejor que varias piezas sueltas."
      ],
      pt: [
        "Um conjunto pronto a oferecer com marcador, pendente de porta e porta-copos para leitores de fantasia. Funciona bem quando um presente temático completo faz mais sentido do que juntar peças separadas."
      ],
      it: [
        "Un set pronto da regalare con segnalibro, targhetta da porta e sottobicchieri per lettori fantasy. Funziona bene quando un regalo coordinato ha più senso di vari pezzi scelti separatamente."
      ]
    }
  };

  const variants = specialBySlug[product.slug]?.[product.locale] || specialBySlug[product.slug]?.en;
  if (!variants || !variants.length) {
    return "";
  }

  return variants[position % variants.length];
}

function buildCardDescription(product, page, position = 0, repeatCount = 1) {
  const specialDescription = getSpecialCardDescription(product, position);
  if (specialDescription) {
    return specialDescription;
  }

  const preferredDescription = product.short_desc || "";
  const lead = product.name;
  const usageDefaults = {
    nl: "gezellige hoekjes in huis",
    de: "gemütliche Ecken im Zuhause",
    fr: "les coins chaleureux de la maison",
    es: "rincones acogedores del hogar",
    pt: "cantos acolhedores da casa",
    it: "angoli accoglienti della casa",
    en: "cozy corners at home"
  };
  const motifDefaults = {
    nl: "een warm houten detail",
    de: "einen warmen Holzakzent",
    fr: "un accent chaleureux en bois",
    es: "un acento cálido de madera",
    pt: "um detalhe quente em madeira",
    it: "un accento caldo in legno",
    en: "a warm wooden accent"
  };
  const audienceDefaults = {
    nl: "cadeauzoekers",
    de: "Geschenkkäufer",
    fr: "chercheurs de cadeaux",
    es: "compradores de regalos",
    pt: "compradores de presentes",
    it: "chi cerca un regalo",
    en: "gift shoppers"
  };
  const usage = product.usage_context || usageDefaults[product.locale] || usageDefaults.en;
  const motif = product.motif || motifDefaults[product.locale] || motifDefaults.en;
  const audience = (product.audience && product.audience[0]) || audienceDefaults[product.locale] || audienceDefaults.en;
  const key = product.format_key || "small-gift";
  let variants;

  if (product.locale === "nl") {
    const byFormat = {
      coasters: [
        `${lead} beschermt tafels en brengt ${motif} naar ${usage}.`,
        `${lead} voegt ${motif} toe aan ${usage} en blijft tegelijk praktisch bij dagelijkse drankjes.`,
        `${lead} is een onderzetterset voor ${usage} met meer karakter dan een gewone tafelset.`,
        `${lead} past bij ${audience} die iets bruikbaars met ${motif} in ${usage} zoeken.`
      ],
      bookmarks: [
        `${lead} houdt je pagina makkelijk terugvindbaar en geeft extra karakter aan het leesmoment.`,
        `${lead} voelt helemaal op zijn plek in ${usage}.`,
        `${lead} is een bladwijzer voor ${audience} die liever een mooi detail voor ${usage} geven dan iets algemeens.`,
        `${lead} past makkelijk bij leesjournalen, cadeaupakketten en rustige avonden.`
      ],
      "door-hanger": [
        `${lead} geeft deuren, hobbykamers en persoonlijke hoekjes extra karakter.`,
        `${lead} is een houten hanger die meteen opvalt en makkelijk op te hangen is.`,
        `${lead} werkt goed als het cadeau persoonlijk en direct zichtbaar mag zijn in ${usage}.`
      ],
      "decor-piece": [
        `${lead} brengt ${motif} naar ${usage}.`,
        `${lead} is een klein decorstuk dat planken en bijzettafels huiselijker maakt.`,
        `${lead} past bij kopers die liever sfeer geven dan iets puur praktisch voor ${usage}.`
      ],
      keepsake: [
        `${lead} maakt van een belangrijk moment iets tastbaars om te bewaren en neer te zetten.`,
        `${lead} is een persoonlijk houten aandenken voor mijlpalen, herinneringen en bijzondere dagen.`,
        `${lead} past bij momenten die meer vragen dan een kaartje alleen en graag zichtbaar blijven in ${usage}.`
      ],
      plaque: [
        `${lead} maakt van een herinnering iets dat je zichtbaar kunt bewaren.`,
        `${lead} is een warme houten plaquette voor herinneringen, mijlpalen en blijvende momenten.`,
        `${lead} is een stiller cadeau voor gelegenheden die om iets persoonlijks vragen en een plek krijgen in ${usage}.`
      ],
      craft: [
        `${lead} geeft makers een houten basis om zelf af te werken.`,
        `${lead} is een praktische DIY-basis voor projecten, lessen en handgemaakte cadeaus.`,
        `${lead} helpt wie een klein cadeau liever zelf samenstelt aan een werkplek in ${usage}.`
      ],
      "small-gift": [
        `${lead} voegt een klein handgemaakt detail toe aan bureau, lade of cadeaupakket.`,
        `${lead} is een compact houten cadeau dat ook na het geven bruikbaar blijft.`,
        `${lead} is een eenvoudig extraatje voor wie iets kleins en handgemaakts zoekt voor ${usage}.`
      ]
    };
    variants = byFormat[key] || byFormat["small-gift"];
  } else if (product.locale === "de") {
    const byFormat = {
      coasters: [
        `${lead} schützt Tische und bringt ${motif} in ${usage}.`,
        `${lead} setzt ${motif} in ${usage} und bleibt dabei praktisch für Getränke im Alltag.`,
        `${lead} ist ein Untersetzer-Set für ${usage} mit mehr Charakter als ein schlichtes Tisch-Extra.`,
        `${lead} passt zu ${audience}, die etwas Nützliches mit ${motif} in ${usage} suchen.`
      ],
      bookmarks: [
        `${lead} hält die Seite leicht wiederfindbar und gibt dem Lesemoment mehr Charakter.`,
        `${lead} bringt ein kleines Detail mit Atmosphäre in ${usage}.`,
        `${lead} ist ein Lesezeichen für ${audience}, die lieber etwas mit Charakter verschenken als ein beliebiges Extra.`,
        `${lead} gibt Geschenken für Leser mehr Persönlichkeit und bleibt im Alltag nützlich.`
      ],
      "door-hanger": [
        `${lead} gibt Türen, Hobbyräumen und persönlichen Ecken mehr Charakter.`,
        `${lead} ist ein Holzschild, das sofort auffällt und sich leicht aufhängen lässt.`,
        `${lead} passt gut, wenn das Geschenk persönlich und direkt sichtbar sein soll in ${usage}.`
      ],
      "decor-piece": [
        `${lead} bringt ${motif} in ${usage}.`,
        `${lead} ist ein kleines Deko-Stück, das Regale und Beistelltische wohnlicher macht.`,
        `${lead} passt zu Käufern, die lieber Atmosphäre als etwas rein Praktisches für ${usage} schenken.`
      ],
      keepsake: [
        `${lead} macht aus einem wichtigen Moment etwas, das sich aufstellen und bewahren lässt.`,
        `${lead} ist ein persönliches Holzstück für Erinnerungen, Meilensteine und besondere Daten.`,
        `${lead} passt zu Momenten, in denen ein einfaches Kärtchen nicht reicht und ein Platz in ${usage} wichtig ist.`
      ],
      plaque: [
        `${lead} macht aus einer Erinnerung etwas, das sich sichtbar aufstellen lässt.`,
        `${lead} ist eine warme Holzplakette für Erinnerungen, Meilensteine und bleibende Gesten.`,
        `${lead} ist ein stilleres Geschenk für Anlässe, die etwas Persönliches mit Platz in ${usage} brauchen.`
      ],
      craft: [
        `${lead} gibt Kreativen eine Holzbasis, die sie selbst fertigstellen können.`,
        `${lead} ist eine praktische DIY-Grundlage für Projekte, Unterricht und handgemachte Geschenke.`,
        `${lead} hilft allen, die ein kleines Geschenk lieber selbst gestalten für ${usage}.`
      ],
      "small-gift": [
        `${lead} setzt einen kleinen handgemachten Akzent auf Schreibtisch, Regal oder im Geschenkset.`,
        `${lead} ist ein kompaktes Holzgeschenk, das auch nach dem Anlass nützlich bleibt.`,
        `${lead} ist ein einfaches Extra für Käufer, die etwas Kleines und Handgemachtes für ${usage} suchen.`
      ]
    };
    variants = byFormat[key] || byFormat["small-gift"];
  } else if (product.locale === "fr") {
    const byFormat = {
      coasters: [
        `${lead} protège les tables et apporte ${motif} à ${usage}.`,
        `${lead} apporte ${motif} à ${usage} tout en restant pratique pour les boissons du quotidien.`,
        `${lead} est un set de dessous-verres pour ${usage} avec plus de caractère qu'un simple extra de table.`,
        `${lead} convient à ${audience} qui cherchent quelque chose d'utile avec ${motif} dans ${usage}.`
      ],
      bookmarks: [
        `${lead} garde la page facile à retrouver et donne plus de caractère au moment de lecture.`,
        `${lead} trouve naturellement sa place dans ${usage}.`,
        `${lead} est un marque-page pour ${audience} qui préfèrent offrir un beau détail pour ${usage} plutôt qu'un objet générique.`,
        `${lead} se glisse facilement dans des journaux de lecture, coffrets cadeaux et soirées calmes.`
      ],
      "door-hanger": [
        `${lead} ajoute du caractère aux portes, pièces loisirs et coins personnels.`,
        `${lead} est une pièce en bois facile à suspendre et simple à remarquer dès le premier regard.`,
        `${lead} fonctionne bien quand le cadeau doit paraître personnel et visible dans ${usage}.`
      ],
      "decor-piece": [
        `${lead} apporte ${motif} à ${usage}.`,
        `${lead} est une petite pièce déco qui rend étagères et guéridons plus vivants.`,
        `${lead} convient aux acheteurs qui préfèrent offrir de l'ambiance plutôt qu'un objet purement pratique pour ${usage}.`
      ],
      keepsake: [
        `${lead} transforme un moment important en objet facile à garder et à exposer.`,
        `${lead} est un souvenir en bois personnel pour étapes, souvenirs et journées importantes.`,
        `${lead} convient aux moments qui méritent plus qu'une simple carte et une place dans ${usage}.`
      ],
      plaque: [
        `${lead} transforme un souvenir en quelque chose que l'on peut garder visible.`,
        `${lead} est une plaque en bois attentionnée pour hommages, étapes et souvenirs durables.`,
        `${lead} convient à des occasions plus personnelles qui trouvent leur place dans ${usage}.`
      ],
      craft: [
        `${lead} donne aux créatifs une base en bois à finir eux-mêmes.`,
        `${lead} est une base DIY pratique pour projets, ateliers et idées cadeaux faites main.`,
        `${lead} aide ceux qui préfèrent composer eux-mêmes un petit cadeau pour ${usage}.`
      ],
      "small-gift": [
        `${lead} ajoute une petite touche artisanale à un bureau, un tiroir ou un coffret cadeau.`,
        `${lead} est un petit cadeau en bois qui reste utile après l'occasion.`,
        `${lead} est un extra simple pour ceux qui cherchent quelque chose de petit et fait main pour ${usage}.`
      ]
    };
    variants = byFormat[key] || byFormat["small-gift"];
  } else if (product.locale === "es") {
    const byFormat = {
      coasters: [
        `${lead} protege las mesas y lleva ${motif} a ${usage}.`,
        `${lead} aporta ${motif} a ${usage} y sigue siendo práctico para las bebidas del día a día.`,
        `${lead} es un set de posavasos para ${usage} con más carácter que un simple extra de mesa.`,
        `${lead} encaja con ${audience} que buscan algo útil con ${motif} en ${usage}.`
      ],
      bookmarks: [
        `${lead} mantiene la página fácil de encontrar y da más carácter al momento de lectura.`,
        `${lead} se siente en casa dentro de ${usage}.`,
        `${lead} es un marcapáginas para ${audience} que prefieren regalar un detalle bonito para ${usage} antes que algo genérico.`,
        `${lead} encaja bien en diarios de lectura, cajas regalo y noches tranquilas.`
      ],
      "door-hanger": [
        `${lead} da más carácter a puertas, cuartos de aficiones y rincones personales.`,
        `${lead} es una pieza de madera fácil de colgar y fácil de notar.`,
        `${lead} funciona bien cuando el regalo debe sentirse personal y visible en ${usage}.`
      ],
      "decor-piece": [
        `${lead} lleva ${motif} a ${usage}.`,
        `${lead} es una pieza decorativa pequeña que hace más vividas estanterías y mesas auxiliares.`,
        `${lead} encaja con compradores que prefieren ambiente antes que algo puramente práctico para ${usage}.`
      ],
      keepsake: [
        `${lead} convierte un momento importante en algo fácil de guardar y mostrar.`,
        `${lead} es un recuerdo personal de madera para hitos, memorias y fechas especiales.`,
        `${lead} encaja en momentos que merecen más que una tarjeta y un lugar en ${usage}.`
      ],
      plaque: [
        `${lead} convierte un recuerdo en algo que se puede mantener visible.`,
        `${lead} es una placa de madera cuidada para homenajes, hitos y recuerdos duraderos.`,
        `${lead} encaja en ocasiones más personales que encuentran su sitio en ${usage}.`
      ],
      craft: [
        `${lead} da a personas creativas una base de madera para terminar a su manera.`,
        `${lead} es una base DIY práctica para proyectos, clases e ideas de regalo hechas a mano.`,
        `${lead} ayuda a quien prefiere preparar por su cuenta un pequeño regalo para ${usage}.`
      ],
      "small-gift": [
        `${lead} añade un pequeño toque artesanal a escritorio, cajón o caja regalo.`,
        `${lead} es un pequeño regalo de madera que sigue siendo útil después de la ocasión.`,
        `${lead} es un extra sencillo para quien quiere algo pequeño y hecho a mano para ${usage}.`
      ]
    };
    variants = byFormat[key] || byFormat["small-gift"];
  } else if (product.locale === "pt") {
    const byFormat = {
      coasters: [
        `${lead} protege as mesas e leva ${motif} para ${usage}.`,
        `${lead} acrescenta ${motif} a ${usage} e continua prático para bebidas do dia a dia.`,
        `${lead} é um conjunto de porta-copos para ${usage} com mais carácter do que um simples extra de mesa.`,
        `${lead} encaixa em ${audience} que procuram algo útil com ${motif} em ${usage}.`
      ],
      bookmarks: [
        `${lead} mantém a página fácil de reencontrar e dá mais carácter ao momento de leitura.`,
        `${lead} sente-se em casa em ${usage}.`,
        `${lead} é um marcador para ${audience} que preferem oferecer um detalhe bonito para ${usage} em vez de algo genérico.`,
        `${lead} encaixa bem em diários de leitura, caixas-presente e serões tranquilos.`
      ],
      "door-hanger": [
        `${lead} dá mais carácter a portas, salas de hobbies e cantos pessoais.`,
        `${lead} é uma peça de madeira fácil de pendurar e fácil de notar.`,
        `${lead} funciona bem quando o presente deve parecer pessoal e visível em ${usage}.`
      ],
      "decor-piece": [
        `${lead} leva ${motif} para ${usage}.`,
        `${lead} é uma pequena peça decorativa que torna prateleiras e mesas de apoio mais vividas.`,
        `${lead} encaixa em compradores que preferem ambiente a algo puramente prático para ${usage}.`
      ],
      keepsake: [
        `${lead} transforma um momento importante em algo fácil de guardar e mostrar.`,
        `${lead} é uma recordação pessoal em madeira para marcos, memórias e datas especiais.`,
        `${lead} encaixa em momentos que merecem mais do que um cartão e um lugar em ${usage}.`
      ],
      plaque: [
        `${lead} transforma uma memória em algo que se pode manter visível.`,
        `${lead} é uma placa de madeira atenciosa para homenagens, marcos e recordações duradouras.`,
        `${lead} encaixa em ocasiões mais pessoais que encontram lugar em ${usage}.`
      ],
      craft: [
        `${lead} dá uma base de madeira a pessoas criativas para terminarem à sua maneira.`,
        `${lead} é uma base DIY prática para projetos, aulas e ideias de presente feitas à mão.`,
        `${lead} ajuda quem prefere montar um pequeno presente por conta própria para ${usage}.`
      ],
      "small-gift": [
        `${lead} acrescenta um pequeno toque artesanal à secretária, gaveta ou caixa-presente.`,
        `${lead} é um pequeno presente de madeira que continua útil depois da ocasião.`,
        `${lead} é um extra simples para quem quer algo pequeno e feito à mão para ${usage}.`
      ]
    };
    variants = byFormat[key] || byFormat["small-gift"];
  } else if (product.locale === "it") {
    const byFormat = {
      coasters: [
        `${lead} protegge i tavoli e porta ${motif} in ${usage}.`,
        `${lead} aggiunge ${motif} a ${usage} restando pratico per le bevande di ogni giorno.`,
        `${lead} è un set di sottobicchieri per ${usage} con più carattere di un semplice extra da tavola.`,
        `${lead} si adatta a ${audience} che cercano qualcosa di utile con ${motif} in ${usage}.`
      ],
      bookmarks: [
        `${lead} mantiene la pagina facile da ritrovare e dà più carattere al momento di lettura.`,
        `${lead} si sente subito a casa in ${usage}.`,
        `${lead} è un segnalibro per ${audience} che preferiscono regalare un bel dettaglio per ${usage} invece di qualcosa di generico.`,
        `${lead} sta bene con diari di lettura, scatole regalo e serate tranquille.`
      ],
      "door-hanger": [
        `${lead} dà più carattere a porte, stanze hobby e angoli personali.`,
        `${lead} è un pezzo in legno facile da appendere e facile da notare.`,
        `${lead} funziona bene quando il regalo deve sembrare personale e visibile in ${usage}.`
      ],
      "decor-piece": [
        `${lead} porta ${motif} in ${usage}.`,
        `${lead} è un piccolo pezzo decorativo che rende più vissute mensole e tavolini.`,
        `${lead} si adatta a chi preferisce atmosfera invece di qualcosa di puramente pratico per ${usage}.`
      ],
      keepsake: [
        `${lead} trasforma un momento importante in qualcosa di facile da custodire e mostrare.`,
        `${lead} è un ricordo personale in legno per tappe, memorie e date speciali.`,
        `${lead} si adatta a momenti che meritano più di un semplice biglietto e un posto in ${usage}.`
      ],
      plaque: [
        `${lead} trasforma un ricordo in qualcosa che si può tenere in vista.`,
        `${lead} è una placca in legno curata per omaggi, traguardi e ricordi duraturi.`,
        `${lead} si adatta a occasioni più personali che trovano posto in ${usage}.`
      ],
      craft: [
        `${lead} dà una base in legno a persone creative da finire a modo proprio.`,
        `${lead} è una base DIY pratica per progetti, lezioni e idee regalo fatte a mano.`,
        `${lead} aiuta chi preferisce preparare da solo un piccolo regalo per ${usage}.`
      ],
      "small-gift": [
        `${lead} aggiunge un piccolo tocco artigianale a scrivania, cassetto o scatola regalo.`,
        `${lead} è un piccolo regalo in legno che resta utile dopo l'occasione.`,
        `${lead} è un extra semplice per chi vuole qualcosa di piccolo e fatto a mano per ${usage}.`
      ]
    };
    variants = byFormat[key] || byFormat["small-gift"];
  } else {
    const byFormat = {
      coasters: [
        `${lead} protects tables and brings ${motif} to ${usage}.`,
        `${lead} adds ${motif} to ${usage} while staying practical for everyday drinks.`,
        `${lead} is a coaster set for ${usage} with more character than a plain table extra.`,
        `${lead} suits ${audience} who want something useful with ${motif} in ${usage}.`
      ],
      bookmarks: [
        `${lead} keeps the page easy to find and adds more character to reading time.`,
        `${lead} feels right at home in ${usage}.`,
        `${lead} is a bookmark for ${audience} who would rather give one beautiful detail for ${usage} than something generic.`,
        `${lead} fits easily into reading journals, gift boxes and quiet evenings.`
      ],
      "door-hanger": [
        `${lead} adds character to doors, hobby rooms and personal corners.`,
        `${lead} is easy to hang and easy to notice from the doorway.`,
        `${lead} suits gifts for people who would enjoy seeing the design every day in ${usage}.`
      ],
      "decor-piece": [
        `${lead} brings ${motif} to ${usage}.`,
        `${lead} is a small decor piece that makes shelves and side tables feel more lived in.`,
        `${lead} suits shoppers who want something softer and more decorative than tableware for ${usage}.`
      ],
      keepsake: [
        `${lead} turns a meaningful moment into something easy to keep and display.`,
        `${lead} is a personal wooden keepsake for milestones, memories and quieter gifts.`,
        `${lead} fits moments that deserve more than a standard card or note and a place in ${usage}.`
      ],
      plaque: [
        `${lead} turns a memory into something you can keep close and display.`,
        `${lead} is a thoughtful wooden plaque for memorials, milestones and lasting keepsakes.`,
        `${lead} is a quieter gift for moments that call for something personal and lasting in ${usage}.`
      ],
      craft: [
        `${lead} gives makers a wooden base they can finish in their own way.`,
        `${lead} is a practical craft piece for projects, lessons and handmade gift ideas.`,
        `${lead} helps anyone who wants to build a small handmade gift from scratch for ${usage}.`
      ],
      "small-gift": [
        `${lead} adds a small handmade touch to desks, drawers or gift bundles.`,
        `${lead} is a compact wooden gift that stays useful after the occasion has passed.`,
        `${lead} is an easy little extra for shoppers who want something simple and handmade for ${usage}.`
      ]
    };
    variants = byFormat[key] || byFormat["small-gift"];
  }

  const suffixSets = {
    en: {
      coasters: [
        "It sits naturally on coffee tables and desks.",
        "It feels useful from the first coffee or tea.",
        "It adds a little extra warmth to everyday drinks."
      ],
      bookmarks: [
        "It slips easily into journals, tote bags and gift boxes.",
        "It suits readers who like small details that still feel personal.",
        "It works well as a simple extra beside a good book."
      ],
      "door-hanger": [
        "It makes the room feel more personal straight away.",
        "It hangs easily on bedroom doors and hobby corners.",
        "It works especially well on doors that set the tone for the room."
      ],
      "decor-piece": [
        "It works beautifully on shelves, side tables and quieter corners.",
        "It suits shoppers who want atmosphere rather than tableware.",
        "It adds warmth without taking up much space."
      ],
      keepsake: [
        "It keeps the occasion easy to revisit long after the day itself.",
        "It keeps a date, name or memory close at hand.",
        "It feels more lasting than a standard card or note."
      ],
      plaque: [
        "It suits memorials and milestone gifts that stay on display.",
        "It keeps a name, date or message close at hand.",
        "It brings a quieter tone to more personal occasions."
      ],
      craft: [
        "It keeps the project simple to start and easy to finish.",
        "It works well for lessons, rainy afternoons and gift prep.",
        "It gives makers a warm base to build on."
      ],
      "small-gift": [
        "It fits nicely into a gift bundle or desk setup.",
        "It works well when a small handmade extra is enough.",
        "It brings a warm detail without overcomplicating the gift."
      ]
    },
    nl: {
      coasters: [
        "Het past vanzelf op salontafels en bureaus.",
        "Het werkt goed wanneer een cadeau meteen bruikbaar moet zijn.",
        "Het brengt net wat extra warmte bij dagelijkse drankjes."
      ],
      bookmarks: [
        "Het glijdt makkelijk in leesjournalen, tassen en cadeaupakketten.",
        "Het past bij lezers die houden van kleine details met karakter.",
        "Het werkt goed als eenvoudig extraatje naast een mooi boek."
      ],
      "door-hanger": [
        "Het geeft de ruimte meteen meer persoonlijkheid.",
        "Het is makkelijk op te hangen en valt direct op.",
        "Het past bij cadeaus die speels en persoonlijk mogen zijn."
      ],
      "decor-piece": [
        "Het staat mooi op planken, bijzettafels en rustige hoekjes.",
        "Het past bij kopers die liever sfeer dan tafelwaar geven.",
        "Het voegt warmte toe zonder veel ruimte in te nemen."
      ],
      keepsake: [
        "Het blijft ook na het moment mooi zichtbaar.",
        "Het houdt een datum, naam of herinnering dichtbij.",
        "Het voelt blijvender dan een standaard kaartje."
      ],
      plaque: [
        "Het past bij herinneringen en mijlpalen die zichtbaar mogen blijven.",
        "Het houdt een naam, datum of boodschap dichtbij.",
        "Het geeft persoonlijkere momenten een rustigere toon."
      ],
      craft: [
        "Het houdt een project overzichtelijk van begin tot eind.",
        "Het werkt goed voor lessen, regenachtige middagen en cadeau-ideeën.",
        "Het geeft makers een warme basis om op verder te bouwen."
      ],
      "small-gift": [
        "Het past mooi in een cadeaupakket of op een bureau.",
        "Het werkt goed wanneer een klein handgemaakt extraatje genoeg is.",
        "Het voegt warmte toe zonder het cadeau ingewikkeld te maken."
      ]
    },
    de: {
      coasters: [
        "Es passt ganz selbstverständlich auf Couchtische und Schreibtische.",
        "Es funktioniert gut, wenn ein Geschenk sofort nützlich sein soll.",
        "Es bringt etwas mehr Wärme in Getränke im Alltag."
      ],
      bookmarks: [
        "Es liegt gut zwischen Lieblingsbüchern, Geschenkboxen und stillen Leseabenden.",
        "Es gefällt Lesern, die kleine Dinge mit Atmosphäre sammeln.",
        "Es gibt einem Geschenk für Leser mehr Persönlichkeit, ohne viel Platz zu brauchen."
      ],
      "door-hanger": [
        "Es gibt dem Raum sofort mehr Persönlichkeit.",
        "Es lässt sich leicht aufhängen und direkt wahrnehmen.",
        "Es passt zu Geschenken, die verspielt und persönlich wirken sollen."
      ],
      "decor-piece": [
        "Es macht sich gut auf Regalen, Beistelltischen und in ruhigen Ecken.",
        "Es passt zu Käufern, die lieber Atmosphäre als Tischware schenken.",
        "Es bringt Wärme, ohne viel Platz zu brauchen."
      ],
      keepsake: [
        "Es bleibt auch lange nach dem Anlass schön sichtbar.",
        "Es hält ein Datum, einen Namen oder eine Erinnerung in greifbarer Nähe.",
        "Es wirkt beständiger als eine einfache Karte."
      ],
      plaque: [
        "Es passt zu Erinnerungen und Meilensteinen, die sichtbar bleiben dürfen.",
        "Es hält Namen, Datum oder Botschaft in greifbarer Nähe.",
        "Es gibt persönlicheren Anlässen einen ruhigeren Ton."
      ],
      craft: [
        "Es hält ein Projekt von Anfang bis Ende übersichtlich.",
        "Es passt gut zu Unterricht, Regentagen und Geschenkideen.",
        "Es gibt Kreativen eine warme Basis zum Weitergestalten."
      ],
      "small-gift": [
        "Es passt gut in ein Geschenkset oder auf den Schreibtisch.",
        "Es funktioniert gut, wenn ein kleines handgemachtes Extra reicht.",
        "Es bringt Wärme, ohne das Geschenk unnötig kompliziert zu machen."
      ]
    },
    fr: {
      coasters: [
        "Il trouve naturellement sa place sur les tables basses et les bureaux.",
        "Il fonctionne bien quand le cadeau doit être utile dès le premier jour.",
        "Il ajoute un peu plus de chaleur aux boissons du quotidien."
      ],
      bookmarks: [
        "Il glisse facilement dans des journaux, sacs et coffrets cadeaux.",
        "Il convient aux lecteurs qui aiment les petits détails avec du caractère.",
        "Il fonctionne bien comme petit extra à côté d'un beau livre."
      ],
      "door-hanger": [
        "Il donne aussitôt plus de personnalité à la pièce.",
        "Il est facile à suspendre et simple à remarquer.",
        "Il convient aux cadeaux qui doivent paraître ludiques et personnels."
      ],
      "decor-piece": [
        "Il se place très bien sur étagères, guéridons et coins plus calmes.",
        "Il convient à ceux qui préfèrent l'ambiance à l'objet de table.",
        "Il apporte de la chaleur sans prendre beaucoup de place."
      ],
      keepsake: [
        "Il reste facile à exposer longtemps après l'occasion.",
        "Il garde une date, un prénom ou un souvenir tout près.",
        "Il paraît plus durable qu'une simple carte."
      ],
      plaque: [
        "Il convient aux hommages et aux étapes importantes que l'on garde visibles.",
        "Il garde un nom, une date ou un message à portée de vue.",
        "Il apporte un ton plus calme aux occasions personnelles."
      ],
      craft: [
        "Il garde le projet simple à commencer et agréable à finir.",
        "Il fonctionne bien pour ateliers, après-midi pluvieux et préparations de cadeaux.",
        "Il donne une base chaleureuse aux idées créatives."
      ],
      "small-gift": [
        "Il trouve facilement sa place dans un coffret cadeau ou sur un bureau.",
        "Il fonctionne bien quand un petit supplément artisanal suffit.",
        "Il ajoute de la chaleur sans compliquer le cadeau."
      ]
    },
    es: {
      coasters: [
        "Se coloca de forma natural en mesas de centro y escritorios.",
        "Funciona bien cuando el regalo debe resultar útil desde el primer día.",
        "Aporta un poco más de calidez a las bebidas del día a día."
      ],
      bookmarks: [
        "Se desliza bien en diarios, bolsas y cajas regalo.",
        "Encaja con lectores a quienes les gustan los pequeños detalles con carácter.",
        "Funciona bien como pequeño extra junto a un buen libro."
      ],
      "door-hanger": [
        "Da más personalidad a la estancia desde el primer momento.",
        "Es fácil de colgar y fácil de notar.",
        "Encaja en regalos que deben sentirse divertidos y personales."
      ],
      "decor-piece": [
        "Queda muy bien en estanterías, mesas auxiliares y rincones tranquilos.",
        "Encaja con quien prefiere ambiente antes que menaje.",
        "Aporta calidez sin ocupar demasiado espacio."
      ],
      keepsake: [
        "Es fácil de mostrar incluso mucho después de la ocasión.",
        "Mantiene cerca una fecha, un nombre o un recuerdo.",
        "Se siente más duradero que una tarjeta sencilla."
      ],
      plaque: [
        "Encaja en homenajes y regalos de hito que siguen a la vista.",
        "Mantiene cerca un nombre, una fecha o un mensaje.",
        "Aporta un tono más sereno a ocasiones personales."
      ],
      craft: [
        "Mantiene el proyecto fácil de empezar y fácil de terminar.",
        "Funciona bien para clases, tardes de lluvia y preparación de regalos.",
        "Da una base cálida a las ideas creativas."
      ],
      "small-gift": [
        "Queda bien en una caja regalo o en un escritorio.",
        "Funciona cuando un pequeño extra artesanal es suficiente.",
        "Aporta calidez sin complicar el regalo."
      ]
    },
    pt: {
      coasters: [
        "Fica naturalmente em mesas de centro e secretárias.",
        "Funciona bem quando o presente deve ser útil desde o primeiro dia.",
        "Acrescenta um pouco mais de calor às bebidas do dia a dia."
      ],
      bookmarks: [
        "Desliza-se bem em diários, sacos e caixas-presente.",
        "Encaixa em leitores que gostam de pequenos detalhes com carácter.",
        "Funciona bem como pequeno extra ao lado de um bom livro."
      ],
      "door-hanger": [
        "Dá mais personalidade ao espaço desde o primeiro momento.",
        "É fácil de pendurar e fácil de notar.",
        "Encaixa em presentes que devem parecer divertidos e pessoais."
      ],
      "decor-piece": [
        "Fica muito bem em prateleiras, mesas de apoio e cantos tranquilos.",
        "Encaixa em quem prefere ambiente a pecas de mesa.",
        "Acrescenta calor sem ocupar muito espaço."
      ],
      keepsake: [
        "É fácil de expor muito depois da ocasião.",
        "Mantém por perto uma data, um nome ou uma memória.",
        "Parece mais duradouro do que um simples cartão."
      ],
      plaque: [
        "Encaixa em homenagens e presentes de marco que ficam à vista.",
        "Mantém por perto um nome, uma data ou uma mensagem.",
        "Dá um tom mais sereno a ocasiões pessoais."
      ],
      craft: [
        "Mantém o projeto fácil de começar e simples de terminar.",
        "Funciona bem para aulas, tardes de chuva e preparação de presentes.",
        "Dá uma base calorosa às ideias criativas."
      ],
      "small-gift": [
        "Fica bem numa caixa-presente ou numa secretária.",
        "Funciona quando um pequeno extra artesanal é suficiente.",
        "Acrescenta calor sem complicar o presente."
      ]
    },
    it: {
      coasters: [
        "Sta in modo naturale su tavolini e scrivanie.",
        "Funziona bene quando il regalo deve risultare utile dal primo giorno.",
        "Aggiunge un po' più di calore alle bevande di ogni giorno."
      ],
      bookmarks: [
        "Scivola bene in diari, borse e scatole regalo.",
        "Si adatta a lettori a cui piacciono i piccoli dettagli con carattere.",
        "Funziona bene come piccolo extra accanto a un buon libro."
      ],
      "door-hanger": [
        "Dà più personalità allo spazio fin dal primo momento.",
        "È facile da appendere e facile da notare.",
        "Si adatta a regali che devono sembrare giocosi e personali."
      ],
      "decor-piece": [
        "Sta benissimo su mensole, tavolini e angoli tranquilli.",
        "Si adatta a chi preferisce atmosfera invece di oggetti da tavola.",
        "Aggiunge calore senza occupare troppo spazio."
      ],
      keepsake: [
        "È facile da esporre anche molto dopo l'occasione.",
        "Tiene vicino una data, un nome o un ricordo.",
        "Sembra più duraturo di un semplice biglietto."
      ],
      plaque: [
        "Si adatta a omaggi e regali di tappa importante che restano in vista.",
        "Tiene vicino un nome, una data o un messaggio.",
        "Dà un tono più calmo alle occasioni personali."
      ],
      craft: [
        "Mantiene il progetto facile da iniziare e da finire.",
        "Funziona bene per lezioni, pomeriggi di pioggia e preparazione dei regali.",
        "Dà una base calda alle idee creative."
      ],
      "small-gift": [
        "Sta bene in una scatola regalo o su una scrivania.",
        "Funziona quando basta un piccolo extra artigianale.",
        "Aggiunge calore senza complicare il regalo."
      ]
    }
  };

  const suffixBucket = suffixSets[product.locale] || suffixSets.en;
  const suffixes = suffixBucket[key] || suffixBucket["small-gift"];
  const suffix = suffixes[Math.floor(position / variants.length) % suffixes.length];
  if (preferredDescription) {
    const composed = `${preferredDescription} ${suffixes[position % suffixes.length]}`;
    return repeatCount > 1 ? `${composed} ${buildDuplicateTail(product)}` : composed;
  }
  return `${variants[position % variants.length]} ${suffix}`;
}

function renderProductCard(product, page, position, repeatCount = 1) {
  const cardImage = product.image || product.image_full;
  const isPriorityCard = position < 2;
  return renderTemplate(productCardTemplate, {
    image: escapeAttribute(cardImage),
    imageSrcset: escapeAttribute(product.image_srcset || product.image),
    imageSizes: escapeAttribute(product.image_sizes),
    alt: escapeAttribute(product.alt),
    loading: escapeAttribute(isPriorityCard ? "eager" : "lazy"),
    fetchpriority: escapeAttribute(isPriorityCard ? "high" : "low"),
    chips: renderChips(product),
    title: escapeHtml(product.name),
    description: escapeHtml(buildCardDescription(product, page, position, repeatCount)),
    ctaUrl: escapeAttribute(product.etsy_url),
    ctaLabel: escapeAttribute(product.cta_label),
    ctaText: escapeHtml(text[page.locale].cardCtaText || product.cta_label)
  });
}

function renderFaq(faqItems) {
  return faqItems.map((item) => renderTemplate(faqTemplate, {
    question: escapeHtml(item.question),
    answer: escapeHtml(item.answer)
  })).join("\n");
}

function renderFeaturedCard(product, summary, locale) {
  const featuredImage = product.image || product.image_full;
  return `
    <article class="copy-card">
      <img class="listing-photo" src="${escapeAttribute(featuredImage)}" alt="${escapeAttribute(product.alt)}" width="600" height="600" loading="lazy" decoding="async" />
      <div class="product-meta">${renderChips(product)}</div>
      <h2>${escapeHtml(product.name)}</h2>
      <p>${escapeHtml(summary)}</p>
      <a class="btn" href="${escapeAttribute(product.etsy_url)}" target="_blank" rel="noopener" aria-label="${escapeAttribute(product.cta_label)}" title="${escapeAttribute(product.cta_label)}">${escapeHtml(text[locale].cardCtaText || product.cta_label)}</a>
    </article>`;
}

function renderWhyCard(page, items) {
  const loc = text[page.locale];
  return `
    <article class="copy-card">
      <h2>${escapeHtml(loc.whyHeading)}</h2>
      <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      <p class="small-note">${escapeHtml(loc.whyRating)}</p>
      <a class="btn" href="https://www.etsy.com/shop/Craftygiftsplace#reviews" target="_blank" rel="noopener">${escapeHtml(loc.whyCtaLabel)}</a>
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
          ${products.map((item) => renderFeaturedCard(item.product, item.summary, page.locale)).join("\n")}
          ${page.featuredWhy ? renderWhyCard(page, page.featuredWhy) : ""}
        </div>
      </div>
    </section>`;
}

function renderCatalogCard(product, page, position, repeatCount) {
  const cardImage = product.image || product.image_full;
  const isPriorityCard = position < 2;
  const description = buildCardDescription(product, page, position, repeatCount);
  return `<a class="product-card catalog-card-link" href="${escapeAttribute(product.etsy_url)}" target="_blank" rel="noopener" aria-label="${escapeAttribute(product.cta_label)}" title="${escapeAttribute(product.cta_label)}">
  <div class="card-media">
    <img src="${escapeAttribute(cardImage)}" srcset="${escapeAttribute(product.image_srcset || product.image)}" sizes="${escapeAttribute(product.image_sizes)}" alt="${escapeAttribute(product.alt)}" width="600" height="600" loading="${isPriorityCard ? 'eager' : 'lazy'}" decoding="async" fetchpriority="${isPriorityCard ? 'high' : 'low'}" referrerpolicy="no-referrer" />
  </div>
  <div class="card-body">
    <div class="product-meta">${renderChips(product)}</div>
    <h3>${escapeHtml(product.name)}</h3>
    <p>${escapeHtml(description)}</p>
  </div>
</a>`;
}

function renderCatalogSection(page, catalogProducts) {
  if (!page.catalog) return "";
  const descriptionCounts = new Map();
  catalogProducts.forEach((product) => {
    const key = product.short_desc || "";
    if (!key) return;
    descriptionCounts.set(key, (descriptionCounts.get(key) || 0) + 1);
  });
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
          ${catalogProducts.map((product, index) => renderCatalogCard(product, page, index, descriptionCounts.get(product.short_desc || "") || 1)).join("\n")}
        </div>
        <div class="catalog-section-cta"><a class="btn" href="${escapeAttribute(page.catalog.ctaUrl)}" target="_blank" rel="noopener">${escapeHtml(page.catalog.ctaLabel)} →</a></div>
      </div>
    </section>`;
}

function renderFaqSection(page, sectionMeta = null) {
  if (!page.faq || !page.faq.length) return "";
  const heading = sectionMeta?.heading || text[page.locale].faqHeading;
  const intro = sectionMeta?.intro || text[page.locale].faqIntro;
  const homeAttrs = page.template === "home" ? ' data-home-section="faq"' : "";
  return `
    <section class="section" id="faq"${homeAttrs}>
      <div class="container">
        <div class="section-head">
          <div>
            <h2>${escapeHtml(heading)}</h2>
            <p>${escapeHtml(intro)}</p>
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
    <section class="section page-hero">
      <div class="container page-shell page-hero-shell">
        <div class="page-grid page-hero-grid">
          <div class="page-intro page-hero-copy">
            ${renderBreadcrumbs(page)}
            <div class="eyebrow">${escapeHtml(page.eyebrow)}</div>
            <h1>${escapeHtml(page.h1)}</h1>
            <p class="page-lede">${escapeHtml(summarizeText(page.intro, 1))}</p>
            <div class="page-actions">
              <a class="btn" href="${escapeAttribute(page.primaryCta.url)}" target="_blank" rel="noopener">${escapeHtml(page.primaryCta.label)}</a>
            </div>
            <div class="page-hero-meta">
              <p class="page-note">${escapeHtml(text[page.locale].pageNote)}</p>
              <a class="inline-link page-secondary-link" href="${escapeAttribute(secondaryPath)}"${secondaryAttrs}>${escapeHtml(page.secondaryCta.label)}</a>
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
  const homeAttrs = page.template === "home" ? ` data-home-section="${id}"` : "";
  return `
    <section class="section" id="${id}"${homeAttrs}>
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
                <img src="${escapeAttribute(relativeUrl(page.path, card.image))}" alt="${escapeAttribute(card.imageAlt)}" width="600" height="600" loading="lazy" decoding="async" />
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

function renderReviews(page, sectionMeta = null) {
  if (!page.reviews) return "";
  const heading = sectionMeta?.heading || text[page.locale].reviewsHeading;
  const intro = sectionMeta?.intro || text[page.locale].reviewsIntro;
  const homeAttrs = page.template === "home" ? ' id="reviews" data-home-section="reviews"' : "";
  return `
    <section class="section"${homeAttrs}>
      <div class="container">
        <div class="section-head">
          <div>
            <h2>${escapeHtml(heading)}</h2>
            <p>${escapeHtml(intro)}</p>
          </div>
          <a class="btn-secondary" href="${escapeAttribute(page.reviews.linkUrl)}" target="_blank" rel="noopener">${escapeHtml(page.reviews.linkLabel)}</a>
        </div>
        <div class="faq-grid">
          ${page.reviews.items.map((item) => renderTemplate(faqTemplate, { question: escapeHtml(item.title), answer: escapeHtml(item.text) })).join("\n")}
        </div>
      </div>
    </section>`;
}

function renderHeroProductTiles(page, productsByLocale) {
  return (page.heroProducts || []).slice(0, 3).map((slug, index) => {
    const product = getProduct(page, productsByLocale, slug);
    const heroImage = product.image || product.image_full;
    return `
      <article class="hero-collage-tile hero-collage-tile--${index + 1}">
        <img src="${escapeAttribute(heroImage)}" alt="${escapeAttribute(product.alt)}" width="600" height="600" loading="${index === 0 ? "eager" : "lazy"}" decoding="async" fetchpriority="${index === 0 ? "high" : "low"}" />
        <div class="hero-collage-label">${escapeHtml(product.name)}</div>
      </article>`;
  }).join("\n");
}

function renderHeroFacts(page) {
  if (!page.heroFacts || !page.heroFacts.length) return "";
  return page.heroFacts.map((fact) => `<span>${escapeHtml(fact)}</span>`).join("");
}

function renderHomeHero(page, productsByLocale) {
  const discoveryHref = page.discoveryCta.target || page.discoveryCta.url || "#featured-bestsellers";
  const heroProductTiles = renderHeroProductTiles(page, productsByLocale);
  const discoveryPath = discoveryHref.startsWith("#") || discoveryHref.startsWith("http")
    ? discoveryHref
    : relativeUrl(page.path, discoveryHref);
  const discoveryAttrs = discoveryHref.startsWith("http") ? ' target="_blank" rel="noopener"' : "";

  return renderTemplate(homeHeroTemplate, {
    eyebrow: escapeHtml(page.eyebrow),
    h1: escapeHtml(page.h1),
    intro: escapeHtml(page.intro),
    heroSupport: escapeHtml(page.heroSupport),
    discoveryHref: escapeAttribute(discoveryPath),
    discoveryAttrs,
    discoveryLabel: escapeHtml(page.discoveryCta.label),
    etsyHref: escapeAttribute(page.primaryCta.url),
    etsyLabel: escapeHtml(page.primaryCta.label),
    factsAriaLabel: escapeAttribute(text[page.locale].heroFactsLabel || ""),
    heroFacts: renderHeroFacts(page),
    collageAria: escapeAttribute(page.sections?.bestsellers?.heading || text[page.locale].featuredHeading),
    heroProductTiles
  });
}

function renderHomeFeaturedCategories(page) {
  const cards = page.featuredCategories || [];
  if (!cards.length) return "";
  const section = page.sections?.featuredCategories || {};

  return `
    <section class="section" id="featured-categories" data-home-section="featured-categories">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>${escapeHtml(section.heading || "Featured Categories")}</h2>
            <p>${escapeHtml(section.intro || "")}</p>
          </div>
        </div>
        <div class="home-category-grid">
          ${cards.map((card) => renderTemplate(homeCategoryCardTemplate, {
            kicker: escapeHtml(card.kicker || ""),
            title: escapeHtml(card.title),
            description: escapeHtml(card.description),
            href: escapeAttribute(relativeUrl(page.path, card.href)),
            image: escapeAttribute(relativeUrl(page.path, card.image)),
            alt: escapeAttribute(card.imageAlt)
          })).join("\n")}
        </div>
      </div>
    </section>`;
}

function renderHomeFeaturedBestsellers(page, productsByLocale) {
  const items = (page.featuredItems || []).map((item) => ({ product: getProduct(page, productsByLocale, item.slug), summary: item.summary }));
  if (!items.length) return "";
  const section = page.sections?.bestsellers || {};

  return `
    <section class="section" id="featured-bestsellers" data-home-section="featured-bestsellers">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>${escapeHtml(section.heading || text[page.locale].featuredHeading)}</h2>
            <p>${escapeHtml(section.intro || text[page.locale].featuredIntro)}</p>
          </div>
        </div>
        <div class="home-bestsellers-grid">
          ${items.map(({ product, summary }, index) => renderTemplate(homeBestsellerCardTemplate, {
            image: escapeAttribute(product.image || product.image_full),
            imageSrcset: escapeAttribute(product.image_srcset || product.image),
            imageSizes: escapeAttribute(product.image_sizes),
            alt: escapeAttribute(product.alt),
            loading: escapeAttribute(index === 0 ? "eager" : "lazy"),
            fetchpriority: escapeAttribute(index === 0 ? "high" : "low"),
            chips: renderChips(product),
            title: escapeHtml(product.name),
            description: escapeHtml(summary),
            ctaUrl: escapeAttribute(product.etsy_url),
            ctaLabel: escapeAttribute(product.cta_label),
            ctaText: escapeHtml(text[page.locale].cardCtaText || product.cta_label)
          })).join("\n")}
        </div>
      </div>
    </section>`;
}

function renderHomeSupportSection(page) {
  const cards = page.supportCards || [];
  if (!cards.length) return "";
  const section = page.sections?.support || {};

  return `
    <section class="section" id="how-it-works" data-home-section="how-it-works">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>${escapeHtml(section.heading || "How this site helps")}</h2>
            <p>${escapeHtml(section.intro || "")}</p>
          </div>
        </div>
        <div class="support-grid">
          ${cards.map((card) => `
            <article class="copy-card support-card">
              <h3>${escapeHtml(card.title)}</h3>
              <p>${escapeHtml(card.text)}</p>
            </article>`).join("\n")}
        </div>
      </div>
    </section>`;
}

function renderHowItWorks(page) {
  if (!page.howItWorks || !page.howItWorks.steps || !page.howItWorks.steps.length) return "";
  const steps = page.howItWorks.steps;
  const stepsHtml = steps.map((step, i) => {
    const arrow = i < steps.length - 1 ? `<div class="how-step-arrow" aria-hidden="true">→</div>` : "";
    return `<div class="how-step">
        <span class="how-step-num">${escapeHtml(step.number)}</span>
        <strong>${escapeHtml(step.title)}</strong>
        <p>${escapeHtml(step.text)}</p>
      </div>${arrow}`;
  }).join("\n");
  return `
    <section class="section how-it-works-section" id="how-it-works">
      <div class="container">
        <div class="how-it-works-strip">
          ${stepsHtml}
        </div>
      </div>
    </section>`;
}

function renderMakerStory(page) {
  if (!page.makerStory) return "";
  const story = page.makerStory;
  const paragraphsHtml = (story.paragraphs || []).map((p) => `<p>${escapeHtml(p)}</p>`).join("\n");
  return `
    <section class="section maker-story-section" id="maker-story">
      <div class="container">
        <div class="maker-story-shell">
          <div class="maker-story-photo">
            <img src="${escapeAttribute(story.photo)}" alt="${escapeAttribute(story.photoAlt)}" width="480" height="600" loading="lazy" decoding="async" />
          </div>
          <div class="maker-story-copy">
            <div class="eyebrow">${escapeHtml(story.eyebrow)}</div>
            <h2>${escapeHtml(story.heading)}</h2>
            ${paragraphsHtml}
            <a class="btn" href="${escapeAttribute(story.cta.url)}" target="_blank" rel="noopener">${escapeHtml(story.cta.label)} →</a>
          </div>
        </div>
      </div>
    </section>`;
}

function renderHome(page, productsByLocale) {
  const sections = page.sections || {};
  return `
    <main id="main-content">
      ${renderHomeHero(page, productsByLocale)}
      ${renderHowItWorks(page)}
      ${renderHomeFeaturedBestsellers(page, productsByLocale)}
      ${renderHomeFeaturedCategories(page)}
      ${renderHomeSectionCards(page, "collectionCards", sections.collections?.heading || text[page.locale].collectionsHeading, sections.collections?.intro || text[page.locale].collectionsIntro)}
      ${renderMakerStory(page)}
      ${renderReviews(page, sections.reviews)}
      ${renderFaqSection(page, sections.faq)}
    </main>`;
}

function renderContact(page) {
  return `
    <main class="page-main" id="main-content">
      <section class="section page-hero">
        <div class="container page-shell page-hero-shell">
          <div class="page-grid page-hero-grid">
            <div class="page-intro page-hero-copy">
              ${renderBreadcrumbs(page)}
              <div class="eyebrow">${escapeHtml(page.eyebrow)}</div>
              <h1>${escapeHtml(page.h1)}</h1>
              <p class="page-lede">${escapeHtml(summarizeText(page.intro, 1))}</p>
              <div class="page-actions">
                <a class="btn" href="${escapeAttribute(page.primaryCta.url)}" target="_blank" rel="noopener">${escapeHtml(page.primaryCta.label)}</a>
              </div>
              <div class="page-hero-meta">
                <a class="inline-link page-secondary-link" href="${escapeAttribute(page.secondaryCta.targetUrl)}" target="_blank" rel="noopener">${escapeHtml(page.secondaryCta.label)}</a>
              </div>
            </div>
            ${renderSidebar(page)}
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container page-shell">
          <div class="page-grid">
            <div class="copy-stack info-card-grid">
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
    </main>
    <div class="sticky-mobile-cta">
      <a class="btn" href="${escapeAttribute(page.primaryCta.url)}" target="_blank" rel="noopener">${escapeHtml(page.primaryCta.label)}</a>
    </div>`;
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
  const localizedHome = LOCALE_META[page.locale].homePath;

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
      itemListElement: (page.breadcrumbs || []).filter((item) => item.path).map((item, index) => ({
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

function renderHead(page, productsByLocale) {
  const firstProduct = page.featuredItems && page.featuredItems.length ? getProduct(page, productsByLocale, page.featuredItems[0].slug) : null;
  const socialImage = firstProduct ? absoluteUrl(firstProduct.image || firstProduct.image_full) : absoluteUrl("/assets/img/products/moon-cat-tealight-holder.jpg");
  const socialImageAlt = firstProduct ? firstProduct.alt : page.heroImageAlt || page.title;
  const rootRedirectScript = page.path.endsWith("/index.html") ? `<script>
    if (/\\/index\\.html$/.test(window.location.pathname)) {
      window.location.replace(window.location.pathname.replace(/index\\.html$/, "") + window.location.search + window.location.hash);
    }
  </script>` : "";
  const alternatePaths = page.alternatePaths || { [page.locale]: page.path };
  const defaultAlternatePath = alternatePaths.en || alternatePaths[page.locale] || xDefaultPath;
  const alternateLinks = [
    ...LOCALE_ORDER.filter((locale) => alternatePaths[locale]).map((locale) => `  <link rel="alternate" hreflang="${locale}" href="${escapeAttribute(canonicalUrl(alternatePaths[locale]))}" />`),
    `  <link rel="alternate" hreflang="x-default" href="${escapeAttribute(canonicalUrl(defaultAlternatePath))}" />`
  ].join("\n");

  return renderTemplate(headTemplate, {
    locale: page.locale,
    pageTitle: escapeHtml(page.title),
    metaDescription: escapeAttribute(page.metaDescription),
    robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    rootRedirectScript,
    canonicalUrl: escapeAttribute(canonicalUrl(page.path)),
    alternateLinks,
    ogLocale: LOCALE_META[page.locale].ogLocale,
    socialImage: escapeAttribute(socialImage),
    socialImageAlt: escapeAttribute(socialImageAlt),
    faviconPath: escapeAttribute(relativeUrl(page.path, "/favicon.ico")),
    logoPath: escapeAttribute(relativeUrl(page.path, "/assets/img/logos/craftygiftsplace-logo.png")),
    preconnectLinks: '<link rel="preconnect" href="https://i.etsystatic.com" crossorigin />\n  <link rel="dns-prefetch" href="//i.etsystatic.com" />\n  <link rel="preconnect" href="https://www.etsy.com" crossorigin />',
    stylesheetPath: escapeAttribute(relativeUrl(page.path, "/assets/css/style.css")),
    structuredData: renderStructuredData(page, productsByLocale)
  });
}

function renderHeader(page) {
  const localeText = text[page.locale];
  const alternatePaths = page.alternatePaths || { [page.locale]: page.path };
  const navLinks = [
    ...navItems(page.locale).map((item) => {
      const current = page.path === item.path ? ' aria-current="page"' : "";
      return `<a href="${escapeAttribute(relativeUrl(page.path, item.path))}"${current}>${escapeHtml(item.label)}</a>`;
    }),
    `<a class="btn" href="${escapeAttribute(page.primaryCta.url)}" target="_blank" rel="noopener">${escapeHtml(page.primaryCta.label)}</a>`
  ].join("\n");

  const languageLinks = LOCALE_ORDER.filter((locale) => alternatePaths[locale]).map((locale) => ({
    locale,
    href: relativeUrl(page.path, alternatePaths[locale]),
    current: page.locale === locale,
    label: LOCALE_LANGUAGE_NAMES[locale] || locale.toUpperCase()
  })).map((item) => `<a href="${escapeAttribute(item.href)}" lang="${item.locale}" aria-label="${escapeAttribute(item.label)}" title="${escapeAttribute(item.label)}"${item.current ? ' aria-current="true"' : ""}>
          <span class="flag-icon flag-icon--${item.locale}" aria-hidden="true"></span>
          <span class="language-code">${item.locale.toUpperCase()}</span>
        </a>`).join("\n");
  const languageSwitcher = renderTemplate(languageSwitcherTemplate, {
    languageSwitchLabel: escapeAttribute(localeText.langSwitch),
    languageLinks
  });

  return renderTemplate(headerTemplate, {
    bodyClass: page.template === "home" ? "" : "page-subpage has-sticky-cta",
    skipLinkLabel: escapeHtml(localeText.skipLink),
    homePath: escapeAttribute(relativeUrl(page.path, LOCALE_META[page.locale].homePath)),
    homeAriaLabel: escapeAttribute(localeText.homeAria),
    logoPath: escapeAttribute(relativeUrl(page.path, "/assets/img/logos/craftygiftsplace-logo.png")),
    brandTagline: escapeHtml(localeText.brandTagline),
    navAriaLabel: escapeAttribute(localeText.navAria),
    navLinks,
    languageSwitcher,
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
    footerEtsyCta: escapeHtml(localeText.footerEtsyCta || "Shop on Etsy →"),
    scriptPath: escapeAttribute(relativeUrl(page.path, "/assets/js/main.js"))
  });
}

function renderPage(page, pagesByPath, productsByLocale, productsListByLocale) {
  if (!page.alternatePaths) {
    throw new Error(`Missing alternate paths for ${page.path}`);
  }
  const body = page.template === "home" ? renderHome(page, productsByLocale) : page.template === "contact" ? renderContact(page) : renderSubpage(page, productsByLocale, productsListByLocale);
  return `${renderHead(page, productsByLocale)}\n${renderHeader(page)}\n${body}\n${renderFooter(page)}`;
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
