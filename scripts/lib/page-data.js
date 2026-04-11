const productsEnCatalog = require("../../data/products-en.json");

const EN_FULL_COASTER_SLUGS = productsEnCatalog
  .filter((product) => product.category === "onderzetters")
  .map((product) => product.id);

const EN_FULL_BOOKMARK_SLUGS = productsEnCatalog
  .filter((product) => product.category === "bladwijzers")
  .map((product) => product.id);

const EN_FULL_WOODEN_GIFT_SLUGS = productsEnCatalog
  .filter((product) => product.category === "houten-cadeaus")
  .filter((product) => product.id !== "my-first-christmas-ornament-2025")
  .map((product) => product.id);

const pagesEn = [];
const pagesNl = [];

pagesEn.push({
  path: "/en/index.html",
  pairPath: "/index.html",
  template: "home",
  locale: "en",
  title: "Handmade Wooden Gifts for Readers, Cat Lovers and Cozy Homes | Craftygiftsplace",
  metaDescription: "Discover handmade wooden gifts for readers, cat lovers and cozy homes. Browse bestselling coasters, bookmarks and wooden decor that lead shoppers to Etsy.",
  h1: "Handmade wooden gifts for readers, cat lovers and cozy homes",
  eyebrow: "4.96/5 Etsy rating · bestselling picks",
  intro: "Craftygiftsplace helps shoppers find the right handmade wooden gift faster. Instead of scrolling through everything at once, visitors can start with coasters, bookmarks and small decor pieces for readers, cat lovers, housewarmings and personalized keepsakes.",
  heroImage: "/assets/img/products/moon-cat-tealight-holder.jpg",
  heroImageAlt: "Moon Cat wooden tealight holder by Craftygiftsplace",
  heroCaption: "Moon Cat tealight holder",
  heroPoints: [
    {
      title: "Shop by occasion",
      text: "Send visitors straight to reader gifts, cat lover gifts and housewarming ideas instead of only category pages."
    },
    {
      title: "Bestselling products",
      text: "Coasters, bookmarks and wooden decor all lead directly to the matching Etsy search or listing."
    },
    {
      title: "Shop in three languages",
      text: "Core pages are available in English, Dutch and German so visitors can browse in the language that feels natural."
    },
    {
      title: "Clear buying path",
      text: "Visitors can move from gift ideas to a collection and then straight to Etsy without getting lost."
    }
  ],
  primaryCta: {
    label: "Shop Craftygiftsplace on Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?ref=shop-header-name"
  },
  secondaryCta: {
    label: "Shop by occasion",
    target: "#gift-guides"
  },
  featuredItems: [
    {
      slug: "cat-and-moon-wooden-coasters",
      summary: "A warm cat lover pick that also works beautifully as a cozy housewarming gift for coffee tables and sideboards."
    },
    {
      slug: "fantasy-reader-gift-set",
      summary: "A reader gift bundle with bookmark, door hanger and coasters for shoppers who want one themed Etsy-ready set."
    },
    {
      slug: "moon-cat-shadow-tealight-holder",
      summary: "A small decor piece that turns a shelf or reading nook into something giftable without feeling generic."
    }
  ],
  intentCards: [
    {
      title: "Cat lover gifts",
      description: "Wooden cat-themed coasters and decor for cozy homes, birthdays and thoughtful cat owner gifts.",
      image: "/assets/img/products/cat-and-moon-coasters.jpg",
      imageAlt: "Cat and Moon wooden coasters gift idea",
      href: "/en/pages/cat-lover-gifts.html"
    },
    {
      title: "Reader gifts",
      description: "Bookmarks, fantasy reader bundles and reading nook pieces that suit book lovers and BookTok-style gifting.",
      image: "/assets/img/products/fantasy-reader-gift-set.jpg",
      imageAlt: "Fantasy Reader Gift Set for book lovers",
      href: "/en/pages/reader-gifts.html"
    },
    {
      title: "Housewarming gifts",
      description: "Wooden coasters and shelf accents that feel easy to buy for new homes, apartments and host gifts.",
      image: "/assets/img/products/zodiac-wooden-coasters.jpg",
      imageAlt: "Zodiac wooden coasters for housewarming gifting",
      href: "/en/pages/housewarming-gifts.html"
    }
  ],
  collectionCards: [
    {
      title: "Wooden coasters",
      description: "Cat, celestial and botanical coaster sets for cozy tables, shelves and easy gifting.",
      image: "/assets/img/products/cat-and-moon-coasters.jpg",
      imageAlt: "Wooden coaster collection",
      href: "/en/pages/wooden-coasters.html"
    },
    {
      title: "Wooden bookmarks",
      description: "Reader-focused bookmarks and gift sets for fantasy shelves, reading journals and cozy evenings.",
      image: "/assets/img/products/celtic-bookmark.jpg",
      imageAlt: "Wooden bookmark collection",
      href: "/en/pages/wooden-bookmarks.html"
    },
    {
      title: "Wooden gifts",
      description: "Tealight holders, keepsakes, door hangers and decor pieces for shelves, entryways and thoughtful gifting moments.",
      image: "/assets/img/products/just-married-door-hanger.jpg",
      imageAlt: "Wooden gifts collection",
      href: "/en/pages/wooden-gifts.html"
    }
  ],
  reviews: {
    linkLabel: "Read Etsy reviews",
    linkUrl: "https://www.etsy.com/shop/Craftygiftsplace#reviews",
    items: [
      {
        title: "Clare · 5/5",
        text: "\"Absolute pleasure to deal with... I'll be back for more.\""
      },
      {
        title: "Caroline · 5/5",
        text: "\"Great quality, exactly as described, and seller was kind and communicative.\""
      },
      {
        title: "Andrew · 5/5",
        text: "\"These are beautiful coasters. They are made of wood and seem very durable.\""
      },
      {
        title: "Bookmark buyer · 5/5",
        text: "\"The detail is incredible, well crafted and very durable. Lovely bookmark.\""
      }
    ]
  },
  faq: [
    {
      question: "Do I order on this website?",
      answer: "No. This website helps shoppers explore the range and then sends them to Etsy to complete the order."
    },
    {
      question: "Can I shop by occasion here?",
      answer: "Yes. Cat lover gifts, reader gifts and housewarming gifts each have their own page in English, Dutch and German."
    },
    {
      question: "Can buyers still browse by collection?",
      answer: "Yes. The main collection pages for wooden coasters, bookmarks and wooden gifts remain available and are linked throughout the site."
    },
    {
      question: "Where can someone ask about personalization?",
      answer: "The contact page points people to Etsy messaging, where personalization questions and order details can be handled directly."
    }
  ],
  ctaPanel: {
    title: "Ready to browse and then shop on Etsy?",
    text: "Start with a gift guide or a collection, then head to Etsy for pricing, reviews and ordering.",
    label: "Open the Etsy shop",
    url: "https://www.etsy.com/shop/Craftygiftsplace?ref=shop-header-name"
  },
  howItWorks: {
    steps: [
      { number: "1", title: "Browse here", text: "Find the right gift from curated collections and gift guides." },
      { number: "2", title: "Pick your favourite", text: "Use photos, themes and descriptions to choose with confidence." },
      { number: "3", title: "Order on Etsy", text: "Head to Etsy for full pricing, reviews and secure checkout." }
    ]
  },
  makerStory: {
    heading: "Made by one person, with care",
    eyebrow: "Behind the workshop",
    photo: "/assets/img/maker-photo.jpg",
    photoAlt: "The maker behind Craftygiftsplace, photographed in Porto, Portugal",
    paragraphs: [
      "Working in IT for years, I found myself needing something that balanced screen time with real making. Craftygiftsplace started with a small laser engraver and a clear idea: wooden gifts should feel personal, not mass-produced.",
      "Every coaster, bookmark and keepsake is made to order by one person — not a warehouse. That means real attention to the engraving, the finish and the detail that makes a gift worth keeping.",
      "If you have ever given someone a gift and thought 'I wish it felt more chosen', that is exactly what this shop is for."
    ],
    cta: {
      label: "Shop Craftygiftsplace on Etsy",
      url: "https://www.etsy.com/shop/Craftygiftsplace"
    }
  }
});

pagesNl.push({
  path: "/index.html",
  pairPath: "/en/index.html",
  template: "home",
  locale: "nl",
  title: "Handgemaakte Houten Cadeaus voor Lezers, Kattenliefhebbers en Gezellige Huizen | Craftygiftsplace",
  metaDescription: "Ontdek handgemaakte houten cadeaus voor lezers, kattenliefhebbers en gezellige huizen. Bekijk onderzetters, bladwijzers en houten decoratie die doorsturen naar Etsy.",
  h1: "Handgemaakte houten cadeaus voor lezers, kattenliefhebbers en gezellige huizen",
  eyebrow: "4.96/5 Etsy score · cadeauklare favorieten",
  intro: "Craftygiftsplace helpt bezoekers sneller het juiste handgemaakte houten cadeau te vinden. In plaats van door alles tegelijk te scrollen, kunnen mensen starten met onderzetters, bladwijzers en kleine decorstukken voor lezers, kattenliefhebbers, verhuiscadeaus en persoonlijke herinneringscadeaus.",
  heroImage: "/assets/img/products/moon-cat-tealight-holder.jpg",
  heroImageAlt: "Kat en maan houten theelichthouder van Craftygiftsplace",
  heroCaption: "Kat en maan theelichthouder",
  heroPoints: [
    {
      title: "Shop per gelegenheid",
      text: "Stuur bezoekers direct naar lezerscadeaus, cadeaus voor kattenliefhebbers en verhuiscadeaus in plaats van alleen categoriepagina's."
    },
    {
      title: "Cadeauklare producten",
      text: "Onderzetters, bladwijzers en houten decoratie leiden rechtstreeks naar een passende Etsy zoekopdracht of listing."
    },
    {
      title: "Shop in drie talen",
      text: "De belangrijkste pagina's zijn beschikbaar in het Nederlands, Engels en Duits, zodat bezoekers kunnen bladeren in de taal die het prettigst voelt."
    },
    {
      title: "Duidelijke kooproute",
      text: "Bezoekers gaan van cadeau-idee naar collectie en daarna rechtstreeks naar Etsy zonder te verdwalen."
    }
  ],
  primaryCta: {
    label: "Bekijk Craftygiftsplace op Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?ref=shop-header-name"
  },
  secondaryCta: {
    label: "Shop per gelegenheid",
    target: "#gift-guides"
  },
  featuredItems: [
    {
      slug: "cat-and-moon-wooden-coasters",
      summary: "Een warme favoriet voor kattenliefhebbers die ook goed werkt als gezellig verhuiscadeau voor salontafels en bijzettafels."
    },
    {
      slug: "fantasy-reader-gift-set",
      summary: "Een lezerscadeauset met bladwijzer, deurhanger en onderzetters voor kopers die meteen één compleet Etsy cadeau zoeken."
    },
    {
      slug: "moon-cat-shadow-tealight-holder",
      summary: "Een klein decorstuk dat een plank of leeshoek meteen warmer maakt zonder generiek te voelen."
    }
  ],
  intentCards: [
    {
      title: "Cadeaus voor kattenliefhebbers",
      description: "Houten onderzetters en decoratie met kattenthema voor gezellige huizen, verjaardagen en doordachte cadeaus voor katteneigenaars.",
      image: "/assets/img/products/cat-and-moon-coasters.jpg",
      imageAlt: "Kat en maan houten onderzetters als cadeau-idee",
      href: "/pages/cadeaus-voor-kattenliefhebbers.html"
    },
    {
      title: "Lezerscadeaus",
      description: "Bladwijzers, fantasy lezerssets en stukken voor de leeshoek die passen bij boekenliefhebbers en BookTok-achtige cadeaus.",
      image: "/assets/img/products/fantasy-reader-gift-set.jpg",
      imageAlt: "Fantasy lezerscadeauset voor boekenliefhebbers",
      href: "/pages/lezerscadeaus.html"
    },
    {
      title: "Verhuiscadeaus",
      description: "Houten onderzetters en warme decoratie voor salontafels, planken en doordachte cadeaus voor een nieuw huis.",
      image: "/assets/img/products/zodiac-wooden-coasters.jpg",
      imageAlt: "Zodiac houten onderzetters als verhuiscadeau",
      href: "/pages/verhuiscadeaus.html"
    }
  ],
  collectionCards: [
    {
      title: "Houten onderzetters",
      description: "Kat-, hemelse en botanische onderzettersets voor gezellige tafels, planken en cadeaus met karakter.",
      image: "/assets/img/products/cat-and-moon-coasters.jpg",
      imageAlt: "Collectie houten onderzetters",
      href: "/pages/onderzetters.html"
    },
    {
      title: "Houten bladwijzers",
      description: "Lezersgerichte bladwijzers en boekcadeaus voor fantasylezers, leesjournalen en rustige leesmomenten.",
      image: "/assets/img/products/celtic-bookmark.jpg",
      imageAlt: "Collectie houten bladwijzers",
      href: "/pages/bladwijzers.html"
    },
    {
      title: "Houten cadeaus",
      description: "Deurhangers, theelichthouders, herinneringscadeaus en decoratie voor planken, entrees en bijzondere gelegenheden.",
      image: "/assets/img/products/just-married-door-hanger.jpg",
      imageAlt: "Just Married deurhanger uit de collectie houten cadeaus",
      href: "/pages/houten-cadeaus.html"
    }
  ],
  reviews: {
    linkLabel: "Lees Etsy beoordelingen",
    linkUrl: "https://www.etsy.com/shop/Craftygiftsplace#reviews",
    items: [
      {
        title: "Clare · 5/5",
        text: "\"Hele fijne verkoper om mee te schakelen... ik kom graag terug voor meer.\""
      },
      {
        title: "Caroline · 5/5",
        text: "\"Geweldige kwaliteit, precies zoals beschreven, en de verkoper was vriendelijk en duidelijk in de communicatie.\""
      },
      {
        title: "Andrew · 5/5",
        text: "\"Dit zijn prachtige onderzetters. Ze zijn van hout gemaakt en voelen erg stevig aan.\""
      },
      {
        title: "Bladwijzer koper · 5/5",
        text: "\"Het detail is prachtig, mooi afgewerkt en erg stevig. Een heerlijke bladwijzer.\""
      }
    ]
  },
  faq: [
    {
      question: "Bestel ik op deze website?",
      answer: "Nee. Deze website helpt bij het kiezen en stuurt daarna door naar Etsy om te bestellen."
    },
    {
      question: "Kan ik hier per gelegenheid kijken?",
      answer: "Ja. Cadeaus voor kattenliefhebbers, lezerscadeaus en verhuiscadeaus hebben elk een eigen pagina in het Nederlands, Engels en Duits."
    },
    {
      question: "Kun je nog steeds per collectie bladeren?",
      answer: "Ja. De hoofdcollecties voor houten onderzetters, bladwijzers en houten cadeaus blijven overal bereikbaar."
    },
    {
      question: "Waar kan iemand naar personalisatie vragen?",
      answer: "De contactpagina stuurt bezoekers naar Etsy berichten, waar personalisatie en bestelvragen direct afgehandeld kunnen worden."
    }
  ],
  ctaPanel: {
    title: "Klaar om te bladeren en daarna op Etsy te shoppen?",
    text: "Begin bij een cadeaugids of collectie en ga daarna naar Etsy voor prijzen, beoordelingen en bestellen.",
    label: "Open de Etsy shop",
    url: "https://www.etsy.com/shop/Craftygiftsplace?ref=shop-header-name"
  }
});

pagesEn.push({
  path: "/en/pages/wooden-coasters.html",
  pairPath: "/pages/onderzetters.html",
  template: "collection",
  locale: "en",
  title: "Wooden Coasters — Engraved Handmade Sets | Craftygiftsplace",
  metaDescription: "Browse handmade wooden coaster sets in celestial, nature, Viking and other engraved styles for coffee tables, shelves and thoughtful gifts.",
  h1: "Handmade wooden coasters in celestial, nature and bold engraved styles",
  eyebrow: "Collection",
  intro: "Browse the curated coaster collection in one place. This page stays product-type first, so shoppers can compare bestselling engraved sets for coffee tables, desks and shelves without jumping between broader gift guides. It brings together calmer celestial and nature designs alongside bolder picks like Viking, spiritual and game-room themes, which makes it easier to choose by look and mood before heading to Etsy.",
  breadcrumbs: [
    { label: "Home", path: "/en/index.html" },
    { label: "Wooden coasters", path: "/en/pages/wooden-coasters.html" }
  ],
  primaryCta: {
    label: "Shop coaster sets on Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?search_query=coaster"
  },
  secondaryCta: {
    label: "See the curated coaster selection",
    target: "#shop-catalog"
  },
  linkCloud: [
    { label: "Cat lover gifts", target: "/en/pages/cat-lover-gifts.html" },
    { label: "Housewarming gifts", target: "/en/pages/housewarming-gifts.html" },
    { label: "All coaster styles", target: "#shop-catalog" }
  ],
  sidebar: {
    title: "Buying confidence",
    quote: "\"These are beautiful coasters. They are made of wood and seem very durable.\"",
    attribution: "Andrew · Etsy review",
    text: "Coasters work well for housewarmings and everyday gifts because they feel useful, warm and easy to live with.",
    links: [
      { label: "See cat lover gifts", href: "/en/pages/cat-lover-gifts.html" },
      { label: "See housewarming gifts", href: "/en/pages/housewarming-gifts.html" },
      { label: "Browse wooden bookmarks", href: "/en/pages/wooden-bookmarks.html" },
      { label: "How personalization works", href: "/en/pages/personalization.html" }
    ]
  },
  featuredItems: [
    { slug: "tree-of-life-wooden-coasters", summary: "A bestselling coaster set that adds warm engraved detail to coffee tables, shelves and easy housewarming gifts." },
    { slug: "sun-and-moon-wooden-coasters", summary: "A celestial design for cozy interiors, evening tables and shoppers who want a set with clear visual character." },
    { slug: "viking-wooden-coasters", summary: "A bold engraved set for Norse-inspired decor, hobby rooms and gifts with a stronger theme." },
    { slug: "buddha-wood-wooden-coasters", summary: "A calmer spiritual set for tea corners, shelves and homes that suit meaningful table details." }
  ],
  featuredWhy: [
    "It keeps the bestselling coaster themes in one easy view.",
    "It makes it simple to compare calmer table sets and bolder statement designs.",
    "It still points shoppers toward cat-lover, housewarming and broader wooden gift pages when they want something more specific."
  ],
  catalog: {
    mode: "slugs",
    slugs: EN_FULL_COASTER_SLUGS,
    intro: "The full matched coaster range from the live Etsy shop, kept inside the same English collection layout.",
    ctaLabel: "View coasters on Etsy",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?search_query=coaster"
  },
  faq: [
    {
      question: "Are these coasters good for housewarming gifts?",
      answer: "Yes. Many designs naturally fit new-home gifting because they are practical, decorative and easy to style on tables right away."
    },
    {
      question: "Will I find bolder themed coaster sets here too?",
      answer: "Yes. Alongside calmer nature and celestial options, this page also includes stronger themed picks such as Viking, spiritual, gaming and alternative engraved sets."
    },
    {
      question: "Can shoppers still find other wooden collections from here?",
      answer: "Yes. This page links out to bookmarks, wooden gifts and the reader and housewarming gift guides."
    }
  ],
  relatedLinks: [
    {
      label: "Cat lover gifts",
      href: "/en/pages/cat-lover-gifts.html",
      description: "Cat-themed coasters and wooden decor collected for cat-owner gifting."
    },
    {
      label: "Housewarming gifts",
      href: "/en/pages/housewarming-gifts.html",
      description: "Useful wooden pieces that fit coffee tables, shelves and new-home gifting."
    },
    {
      label: "Wooden bookmarks",
      href: "/en/pages/wooden-bookmarks.html",
      description: "Shift from home-focused gifts to reader-focused products and themed sets."
    }
  ],
  ctaPanel: {
    title: "Ready to compare coaster sets on Etsy?",
    text: "Open the coaster search on Etsy to review prices, full listing details and buyer feedback.",
    label: "Open coaster results on Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?search_query=coaster"
  }
});

pagesNl.push({
  path: "/pages/onderzetters.html",
  pairPath: "/en/pages/wooden-coasters.html",
  template: "collection",
  locale: "nl",
  title: "Handgemaakte houten onderzetters met hemelse, natuurlijke en opvallende gravures | Craftygiftsplace",
  metaDescription: "Bekijk handgemaakte houten onderzettersets met hemelse, natuurlijke, Viking- en andere gegraveerde ontwerpen voor tafels, planken en doordachte cadeaus.",
  h1: "Handgemaakte houten onderzetters met hemelse, natuurlijke en opvallende gravures",
  eyebrow: "Collectie",
  intro: "Bekijk hier de gecureerde collectie onderzetters op één plek. Deze pagina blijft bewust productgericht, zodat bezoekers bestverkochte gegraveerde sets voor salontafels, bureaus en planken kunnen vergelijken zonder meteen tussen bredere cadeaugidsen te springen. Je vindt er rustige hemelse en natuurlijke ontwerpen naast uitgesproken keuzes zoals Viking-, spirituele en game-room thema's, zodat kiezen op stijl en sfeer eenvoudiger wordt voordat iemand doorklikt naar Etsy.",
  breadcrumbs: [
    { label: "Home", path: "/index.html" },
    { label: "Houten onderzetters", path: "/pages/onderzetters.html" }
  ],
  primaryCta: {
    label: "Bekijk onderzetters op Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?search_query=coaster"
  },
  secondaryCta: {
    label: "Bekijk de gecureerde onderzetters",
    target: "#shop-catalog"
  },
  linkCloud: [
    { label: "Cadeaus voor kattenliefhebbers", target: "/pages/cadeaus-voor-kattenliefhebbers.html" },
    { label: "Verhuiscadeaus", target: "/pages/verhuiscadeaus.html" },
    { label: "Alle onderzetters", target: "#shop-catalog" }
  ],
  sidebar: {
    title: "Koop met vertrouwen",
    quote: "\"Dit zijn prachtige onderzetters. Ze zijn van hout gemaakt en voelen erg stevig aan.\"",
    attribution: "Andrew · Etsy beoordeling",
    text: "Onderzetters zijn een sterke keuze voor verhuiscadeaus en alledaagse geschenken omdat ze bruikbaar, warm en makkelijk te stylen zijn in huis.",
    links: [
      { label: "Bekijk cadeaus voor kattenliefhebbers", href: "/pages/cadeaus-voor-kattenliefhebbers.html" },
      { label: "Bekijk verhuiscadeaus", href: "/pages/verhuiscadeaus.html" },
      { label: "Bekijk houten bladwijzers", href: "/pages/bladwijzers.html" },
      { label: "Hoe personalisatie werkt", href: "/pages/personalisatie.html" }
    ]
  },
  featuredItems: [
    { slug: "tree-of-life-wooden-coasters", summary: "Een bestverkochte onderzetterset die warme gravure naar salontafels, planken en makkelijke verhuiscadeaus brengt." },
    { slug: "sun-and-moon-wooden-coasters", summary: "Een hemels ontwerp voor gezellige interieurs, avondtafels en kopers die een set met duidelijk karakter zoeken." },
    { slug: "viking-wooden-coasters", summary: "Een uitgesproken gegraveerde set voor Viking-inspiratie, hobbykamers en cadeaus met een sterker thema." },
    { slug: "buddha-wood-wooden-coasters", summary: "Een rustiger spiritueel ontwerp voor theehoekjes, planken en huizen waar tafeldecoratie iets betekenisvols mag toevoegen." }
  ],
  featuredWhy: [
    "Ze houdt de bestverkochte onderzetterthema's samen in één duidelijk overzicht.",
    "Ze maakt het makkelijk om rustigere tafelsets en uitgesproken statementontwerpen te vergelijken.",
    "Ze verwijst nog steeds door naar cadeaus voor kattenliefhebbers, verhuiscadeaus en bredere houten cadeaupagina's zodra iemand gerichter zoekt."
  ],
  catalog: {
    mode: "slugs",
    slugs: [
      "tree-of-life-wooden-coasters",
      "sun-and-moon-wooden-coasters",
      "viking-wooden-coasters",
      "buddha-wood-wooden-coasters",
      "mushroom-moon-wooden-coasters",
      "zodiac-wooden-coasters",
      "hand-painted-wiccan-symbol-wooden-coasters",
      "dartboard-wooden-coasters",
      "sports-ball-wooden-coasters",
      "bitcoin-wooden-coasters",
      "cat-and-moon-wooden-coasters",
      "cat-wooden-coasters",
      "celestial-cat-wooden-coasters",
      "floral-wooden-coasters",
      "leaf-wooden-coasters",
      "bee-motif-wooden-coasters",
      "forest-animal-wooden-coasters"
    ],
    intro: "Een gecureerde selectie onderzetters die bestverkochte tafelsets, warme wooncadeaus en meer uitgesproken gravures samenbrengt.",
    ctaLabel: "Bekijk onderzetters op Etsy",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?search_query=coaster"
  },
  faq: [
    {
      question: "Zijn deze onderzetters geschikt als verhuiscadeau?",
      answer: "Ja. Veel ontwerpen passen goed bij nieuwe huizen omdat ze praktisch, decoratief en meteen bruikbaar op tafel zijn."
    },
    {
      question: "Vind ik hier ook uitgesproken onderzetterthema's?",
      answer: "Ja. Naast rustigere natuur- en hemelontwerpen bevat deze pagina ook sterkere thema's zoals Viking-, spirituele, gaming- en alternatieve gravures."
    },
    {
      question: "Kan ik vanaf hier nog andere houten collecties vinden?",
      answer: "Ja. Deze pagina linkt door naar bladwijzers, houten cadeaus en naar de cadeaugidsen voor lezers en verhuiscadeaus."
    }
  ],
  relatedLinks: [
    {
      label: "Cadeaus voor kattenliefhebbers",
      href: "/pages/cadeaus-voor-kattenliefhebbers.html",
      description: "Kattenthema-onderzetters en houten decoratie verzameld rond katteneigenaars en gezellige interieurs."
    },
    {
      label: "Verhuiscadeaus",
      href: "/pages/verhuiscadeaus.html",
      description: "Bruikbare houten keuzes voor salontafels, planken en nieuwe woningen."
    },
    {
      label: "Houten bladwijzers",
      href: "/pages/bladwijzers.html",
      description: "Verschuif van wooncadeaus naar lezersgerichte producten en boekcadeaus."
    }
  ],
  ctaPanel: {
    title: "Klaar om onderzetters op Etsy te vergelijken?",
    text: "Open de Etsy zoekopdracht voor prijzen, volledige listingdetails en kopersbeoordelingen.",
    label: "Open onderzetters op Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?search_query=coaster"
  }
});

pagesEn.push({
  path: "/en/pages/wooden-bookmarks.html",
  pairPath: "/pages/bladwijzers.html",
  template: "collection",
  locale: "en",
  title: "Handmade Wooden Bookmarks for Readers and Fantasy Shelves | Craftygiftsplace",
  metaDescription: "Browse handmade wooden bookmarks for readers and fantasy shelves, from classic designs to personalized favorites.",
  h1: "Handmade wooden bookmarks for readers and fantasy shelves",
  eyebrow: "Collection",
  intro: "Browse the curated bookmark collection in one place. This page stays focused on bookmarks first, so shoppers can compare classic, fantasy and personalized designs before moving to broader reader gift ideas.",
  breadcrumbs: [
    { label: "Home", path: "/en/index.html" },
    { label: "Wooden bookmarks", path: "/en/pages/wooden-bookmarks.html" }
  ],
  primaryCta: {
    label: "Shop bookmarks on Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?search_query=bookmark"
  },
  secondaryCta: {
    label: "See the curated bookmark selection",
    target: "#shop-catalog"
  },
  linkCloud: [
    { label: "Reader gifts", target: "/en/pages/reader-gifts.html" },
    { label: "Wooden gifts", target: "/en/pages/wooden-gifts.html" },
    { label: "All bookmarks", target: "#shop-catalog" }
  ],
  sidebar: {
    title: "Buying confidence",
    quote: "\"The detail is incredible, well crafted and very durable. Lovely bookmark.\"",
    attribution: "Bookmark buyer · Etsy review",
    text: "Bookmarks are especially easy to gift when the shopper already has a reader or fantasy fan in mind, so this page keeps individual picks and reader-friendly ideas close together.",
    links: [
      { label: "See reader gifts", href: "/en/pages/reader-gifts.html" },
      { label: "Browse wooden gifts", href: "/en/pages/wooden-gifts.html" },
      { label: "Open bookmarks on Etsy", href: "https://www.etsy.com/shop/Craftygiftsplace?search_query=bookmark" },
      { label: "How personalization works", href: "/en/pages/personalization.html" }
    ]
  },
  featuredItems: [
    { slug: "dragon-eye-wooden-bookmark", summary: "A fantasy-led bookmark that feels like a real gift for a reader instead of a generic accessory." },
    { slug: "fantasy-reader-gift-set", summary: "A ready-made bundle for buyers who want more than a single bookmark and prefer one complete reader gift." },
    { slug: "personalized-feather-wooden-bookmark", summary: "A softer, more personalized option for readers who want a name-led or keepsake-style present." },
    { slug: "celtic-wooden-bookmark", summary: "A more classic wooden bookmark for readers who prefer a calmer gift with handcrafted detail." }
  ],
  featuredWhy: [
    "It keeps every bookmark style in one easy browse.",
    "It mixes standalone bookmarks with reader-friendly gift ideas and cozy room pieces.",
    "It helps shoppers move from a single bookmark to a fuller reader gift without starting over."
  ],
  catalog: {
    mode: "slugs",
    slugs: EN_FULL_BOOKMARK_SLUGS,
    intro: "The full matched bookmark range for readers, fantasy shelves and ready-to-gift book lovers.",
    ctaLabel: "View bookmarks on Etsy",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?search_query=bookmark"
  },
  faq: [
    {
      question: "Is there a dedicated page for reader gifts?",
      answer: "Yes. The reader gifts page gathers bookmarks, bundles, decor and reading-nook-friendly pieces in one place."
    },
    {
      question: "Are all bookmarks fantasy themed?",
      answer: "No. The collection includes fantasy, classic and personalized styles, so shoppers can choose a mood that matches the reader."
    },
    {
      question: "Can buyers move from bookmarks to other reader-friendly gifts?",
      answer: "Yes. Related links connect this collection to reader gifts and to broader wooden gifts that also suit reading nooks."
    }
  ],
  relatedLinks: [
    {
      label: "Reader gifts",
      href: "/en/pages/reader-gifts.html",
      description: "Bookmarks, bundles and decor for book lovers and cozy reading nooks."
    },
    {
      label: "Wooden gifts",
      href: "/en/pages/wooden-gifts.html",
      description: "Broader decor and sign pieces that still fit readers and cozy corners."
    },
    {
      label: "Housewarming gifts",
      href: "/en/pages/housewarming-gifts.html",
      description: "A related path for shoppers who want cozy home gifts rather than purely reader gifts."
    }
  ],
  ctaPanel: {
    title: "Ready to browse bookmark listings on Etsy?",
    text: "Open Etsy to compare bookmark styles, delivery details and full product information.",
    label: "Open bookmark results on Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?search_query=bookmark"
  }
});

pagesNl.push({
  path: "/pages/bladwijzers.html",
  pairPath: "/en/pages/wooden-bookmarks.html",
  template: "collection",
  locale: "nl",
  title: "Handgemaakte Houten Bladwijzers voor Lezers en Fans van Fantasyboeken | Craftygiftsplace",
  metaDescription: "Bekijk handgemaakte houten bladwijzers voor lezers en fans van fantasyboeken, van klassieke ontwerpen tot persoonlijke boekfavorieten.",
  h1: "Handgemaakte houten bladwijzers voor lezers en fans van fantasyboeken",
  eyebrow: "Collectie",
  intro: "Bekijk hier de gecureerde collectie bladwijzers op één plek. Deze pagina blijft bewust bij bladwijzers zelf, zodat bezoekers klassieke, fantasy- en persoonlijke ontwerpen kunnen vergelijken voordat ze naar bredere lezerscadeaus gaan.",
  breadcrumbs: [
    { label: "Home", path: "/index.html" },
    { label: "Houten bladwijzers", path: "/pages/bladwijzers.html" }
  ],
  primaryCta: {
    label: "Bekijk bladwijzers op Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?search_query=bookmark"
  },
  secondaryCta: {
    label: "Bekijk de gecureerde bladwijzers",
    target: "#shop-catalog"
  },
  linkCloud: [
    { label: "Lezerscadeaus", target: "/pages/lezerscadeaus.html" },
    { label: "Houten cadeaus", target: "/pages/houten-cadeaus.html" },
    { label: "Alle bladwijzers", target: "#shop-catalog" }
  ],
  sidebar: {
    title: "Koop met vertrouwen",
    quote: "\"Het detail is prachtig, mooi afgewerkt en erg stevig. Een heerlijke bladwijzer.\"",
    attribution: "Bladwijzer koper · Etsy beoordeling",
    text: "Bladwijzers zijn extra makkelijk cadeau te geven wanneer de koper al een lezer of fantasyfan in gedachten heeft, dus deze pagina houdt losse favorieten en cadeau-ideeën voor lezers dicht bij elkaar.",
    links: [
      { label: "Bekijk lezerscadeaus", href: "/pages/lezerscadeaus.html" },
      { label: "Bekijk houten cadeaus", href: "/pages/houten-cadeaus.html" },
      { label: "Open bladwijzers op Etsy", href: "https://www.etsy.com/shop/Craftygiftsplace?search_query=bookmark" },
      { label: "Hoe personalisatie werkt", href: "/pages/personalisatie.html" }
    ]
  },
  featuredItems: [
    { slug: "dragon-eye-wooden-bookmark", summary: "Een fantasybladwijzer die meteen als boekcadeau aanvoelt in plaats van als generiek accessoire." },
    { slug: "fantasy-reader-gift-set", summary: "Een complete set voor kopers die meer willen dan één bladwijzer en liever direct één volledig lezerscadeau kiezen." },
    { slug: "personalized-feather-wooden-bookmark", summary: "Een zachtere, persoonlijkere optie voor lezers die een naam of een bijzonder detail willen toevoegen." },
    { slug: "celtic-wooden-bookmark", summary: "Een klassiek houten ontwerp voor lezers die een rustiger boekcadeau met ambachtelijk detail zoeken." }
  ],
  featuredWhy: [
    "Ze houdt elke bladwijzerstijl samen in één duidelijk overzicht.",
    "Ze combineert losse bladwijzers met cadeau-ideeën voor lezers en gezellige kamerstukken.",
    "Ze helpt bezoekers om van één bladwijzer naar een completer lezerscadeau te gaan zonder opnieuw te beginnen."
  ],
  catalog: {
    mode: "slugs",
    slugs: [
      "dragon-eye-wooden-bookmark",
      "dragon-wooden-bookmark",
      "epic-fantasy-wooden-bookmark",
      "fantasy-sword-wooden-bookmark",
      "fantasy-reader-gift-set",
      "celtic-wooden-bookmark",
      "classic-wooden-bookmark",
      "personalized-feather-wooden-bookmark",
      "1984-inspired-wooden-bookmark",
      "lighthouse-wooden-bookmark"
    ],
    intro: "Een gecureerde bladwijzerselectie voor lezers, fantasyfans en rustige leeshoeken.",
    ctaLabel: "Bekijk bladwijzers op Etsy",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?search_query=bookmark"
  },
  faq: [
    {
      question: "Is er ook een aparte pagina voor lezerscadeaus?",
      answer: "Ja. De pagina lezerscadeaus brengt bladwijzers, sets, decoratie en leeshoekstukken samen op één plek."
    },
    {
      question: "Zijn alle bladwijzers fantasygericht?",
      answer: "Nee. De collectie bevat fantasy-, klassieke en gepersonaliseerde stijlen, zodat de koper een sfeer kan kiezen die bij de lezer past."
    },
    {
      question: "Kun je vanaf hier ook andere cadeaus voor lezers vinden?",
      answer: "Ja. Gerelateerde links verbinden deze collectie met lezerscadeaus en bredere houten cadeaus voor leeshoeken."
    }
  ],
  relatedLinks: [
    {
      label: "Lezerscadeaus",
      href: "/pages/lezerscadeaus.html",
      description: "Bladwijzers, sets en decoratie gericht op boekenliefhebbers en leeshoeken."
    },
    {
      label: "Houten cadeaus",
      href: "/pages/houten-cadeaus.html",
      description: "Bredere decoratie- en wandstukken die ook passen bij gezellige leesruimtes."
    },
    {
      label: "Verhuiscadeaus",
      href: "/pages/verhuiscadeaus.html",
      description: "Een verwante route voor kopers die toch meer naar gezellige wooncadeaus neigen."
    }
  ],
  ctaPanel: {
    title: "Klaar om bladwijzer listings op Etsy te bekijken?",
    text: "Open Etsy om stijlen, levering en volledige productinformatie te vergelijken.",
    label: "Open bladwijzers op Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?search_query=bookmark"
  }
});

pagesEn.push({
  path: "/en/pages/wooden-gifts.html",
  pairPath: "/pages/houten-cadeaus.html",
  template: "collection",
  locale: "en",
  title: "Handmade Wooden Gifts for Shelves, Doors and Keepsake Moments | Craftygiftsplace",
  metaDescription: "Browse handmade wooden gifts including decor pieces, door hangers and keepsakes for cozy homes, readers and meaningful personalized moments.",
  h1: "Handmade wooden gifts for shelves, doors and keepsake moments",
  eyebrow: "Collection",
  intro: "Browse the curated wooden gifts collection for decor pieces, door hangers and keepsakes. This page stays focused on the product type itself, while the gift guides handle occasions like housewarming, reader gifts and cat-themed ideas.",
  breadcrumbs: [
    { label: "Home", path: "/en/index.html" },
    { label: "Wooden gifts", path: "/en/pages/wooden-gifts.html" }
  ],
  primaryCta: {
    label: "Shop wooden gifts on Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?ref=shop-header-name"
  },
  secondaryCta: {
    label: "See selected wooden gifts",
    target: "#shop-catalog"
  },
  linkCloud: [
    { label: "Housewarming gifts", target: "/en/pages/housewarming-gifts.html" },
    { label: "Reader gifts", target: "/en/pages/reader-gifts.html" },
    { label: "Cat lover gifts", target: "/en/pages/cat-lover-gifts.html" }
  ],
  sidebar: {
    title: "Buying confidence",
    quote: "\"Great quality, exactly as described, and seller was kind and communicative.\"",
    attribution: "Caroline · Etsy review",
    text: "This collection is a good fit for shoppers who want something more decorative, more personal or less table-focused than a coaster set.",
    links: [
      { label: "See housewarming gifts", href: "/en/pages/housewarming-gifts.html" },
      { label: "See reader gifts", href: "/en/pages/reader-gifts.html" },
      { label: "Contact on Etsy", href: "/en/pages/contact.html" },
      { label: "How personalization works", href: "/en/pages/personalization.html" }
    ]
  },
    featuredItems: [
      { slug: "moon-cat-shadow-tealight-holder", summary: "A cozy shelf and side-table piece that fits cat lover gifts and reading nook styling." },
      { slug: "personalized-just-married-wooden-door-hanger", summary: "A visible personalized door piece that marks a wedding or newlywed moment with warmth." },
      { slug: "just-married-wedding-money-holder", summary: "A wedding cash or gift-card holder that feels more personal than handing over a plain envelope." },
      { slug: "laser-birch-wood-incense-burner", summary: "An incense holder for shelves and quiet corners when a wooden gift should feel calm, decorative and a little different." }
    ],
  featuredWhy: [
    "It brings together signs, decor and keepsakes in one browse.",
    "It gives shoppers more choice for shelves, doors and cozy corners.",
    "It pairs well with housewarming, reader and cat-lover gift ideas."
  ],
  catalog: {
    mode: "slugs",
    slugs: EN_FULL_WOODEN_GIFT_SLUGS,
    intro: "The full matched wooden gifts range, including decor, door pieces, keepsakes and smaller handmade extras.",
    ctaLabel: "View wooden gifts on Etsy",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?ref=shop-header-name"
  },
  faq: [
    {
      question: "Are these wooden gifts useful for housewarming pages too?",
      answer: "Yes. Several decor and door pieces also appear on the housewarming gifts page because they suit new homes."
    },
    {
      question: "Do any of these items also suit gifts for readers?",
      answer: "Yes. A few decor and sign pieces are also linked from the reader gifts page because they work in cozy reading nooks."
    },
    {
      question: "Is personalization covered here?",
      answer: "Yes. Personalized signs and milestone pieces live in this collection, with Etsy handling the final ordering and messaging."
    }
  ],
  relatedLinks: [
    {
      label: "Housewarming gifts",
      href: "/en/pages/housewarming-gifts.html",
      description: "Decor-led products collected for new-home and cozy-table gifting."
    },
    {
      label: "Reader gifts",
      href: "/en/pages/reader-gifts.html",
      description: "Bookmarks, bundles and reading-nook pieces for readers and book lovers."
    },
    {
      label: "Cat lover gifts",
      href: "/en/pages/cat-lover-gifts.html",
      description: "Cat-led coaster and decor products curated around a stronger audience signal."
    }
  ],
  ctaPanel: {
    title: "Ready to view the full wooden gift range on Etsy?",
    text: "Jump to Etsy for product availability, reviews and personalization details.",
    label: "Open wooden gifts on Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?ref=shop-header-name"
  }
});

pagesNl.push({
  path: "/pages/houten-cadeaus.html",
  pairPath: "/en/pages/wooden-gifts.html",
  template: "collection",
  locale: "nl",
  title: "Handgemaakte Houten Cadeaus voor Planken, Deuren en Herinneringsmomenten | Craftygiftsplace",
  metaDescription: "Bekijk handgemaakte houten cadeaus met decorstukken, deurhangers en herinneringscadeaus voor gezellige huizen, lezers en betekenisvolle persoonlijke momenten.",
  h1: "Handgemaakte houten cadeaus voor planken, deuren en herinneringsmomenten",
  eyebrow: "Collectie",
  intro: "Bekijk de gecureerde collectie houten cadeaus met decorstukken, deurhangers en herinneringscadeaus. Deze pagina blijft bewust bij het producttype zelf, terwijl de cadeaugidsen zich richten op gelegenheden zoals verhuizen, lezerscadeaus en cadeaus voor kattenliefhebbers.",
  breadcrumbs: [
    { label: "Home", path: "/index.html" },
    { label: "Houten cadeaus", path: "/pages/houten-cadeaus.html" }
  ],
  primaryCta: {
    label: "Bekijk houten cadeaus op Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?ref=shop-header-name"
  },
  secondaryCta: {
    label: "Bekijk geselecteerde houten cadeaus",
    target: "#shop-catalog"
  },
  linkCloud: [
    { label: "Verhuiscadeaus", target: "/pages/verhuiscadeaus.html" },
    { label: "Lezerscadeaus", target: "/pages/lezerscadeaus.html" },
    { label: "Cadeaus voor kattenliefhebbers", target: "/pages/cadeaus-voor-kattenliefhebbers.html" }
  ],
  sidebar: {
    title: "Koop met vertrouwen",
    quote: "\"Geweldige kwaliteit, precies zoals beschreven, en de verkoper was vriendelijk en duidelijk in de communicatie.\"",
    attribution: "Caroline · Etsy beoordeling",
    text: "Deze collectie past goed bij bezoekers die iets decoratievers, persoonlijkers of minder op tafel gericht zoeken dan een set onderzetters.",
    links: [
      { label: "Bekijk verhuiscadeaus", href: "/pages/verhuiscadeaus.html" },
      { label: "Bekijk lezerscadeaus", href: "/pages/lezerscadeaus.html" },
      { label: "Contact via Etsy", href: "/pages/contact.html" },
      { label: "Hoe personalisatie werkt", href: "/pages/personalisatie.html" }
    ]
  },
    featuredItems: [
      { slug: "moon-cat-shadow-tealight-holder", summary: "Een gezellige plank- en bijzettafelkeuze die werkt voor kattenliefhebbers en leeshoekstyling." },
      { slug: "personalized-just-married-wooden-door-hanger", summary: "Een persoonlijke deurhanger die een bruiloft of pasgetrouwd moment meteen zichtbaar maakt." },
      { slug: "just-married-wedding-money-holder", summary: "Een trouwgeldhouder die een geldcadeau of cadeaubon net wat persoonlijker laat aanvoelen." },
      { slug: "laser-birch-wood-incense-burner", summary: "Een wierookhouder voor planken en rustige hoekjes wanneer een houten cadeau kalm, decoratief en net even anders mag zijn." }
    ],
  featuredWhy: [
    "Ze brengt deurhangers, decoratie en herinneringscadeaus samen in één overzicht.",
    "Ze geeft bezoekers meer keuze voor planken, deuren en gezellige hoekjes.",
    "Ze past mooi naast cadeau-ideeën voor verhuizen, lezen en kattenliefhebbers."
  ],
  catalog: {
    mode: "slugs",
      slugs: [
        "moon-cat-shadow-tealight-holder",
        "laser-birch-wood-incense-burner",
        "personalized-just-married-wooden-door-hanger",
        "just-married-wedding-money-holder",
        "epic-fantasy-door-sign",
        "personalized-pet-memorial-plaque",
        "do-not-ring-door-sign"
    ],
    intro: "Een gecureerde mix van decorstukken, deurhangers en persoonlijke herinneringscadeaus.",
    ctaLabel: "Bekijk houten cadeaus op Etsy",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?ref=shop-header-name"
  },
  faq: [
    {
      question: "Zijn deze houten cadeaus ook geschikt voor verhuiscadeaus?",
      answer: "Ja. Verschillende decoratie- en deurstukken komen ook terug op de pagina verhuiscadeaus omdat ze goed passen bij nieuwe woningen."
    },
    {
      question: "Ondersteunen sommige items ook lezerscadeaus?",
      answer: "Ja. Een paar decoratie- en bordenstukken linken ook door vanaf de lezerscadeauspagina omdat ze goed werken in leeshoeken."
    },
    {
      question: "Zit personalisatie ook in deze collectie?",
      answer: "Ja. Gepersonaliseerde borden en mijlpaalstukken vallen onder deze collectie, terwijl Etsy de uiteindelijke bestelling en berichten afhandelt."
    }
  ],
  relatedLinks: [
    {
      label: "Verhuiscadeaus",
      href: "/pages/verhuiscadeaus.html",
      description: "Decoratieve producten verzameld voor nieuwe huizen, salontafels en planken."
    },
    {
      label: "Lezerscadeaus",
      href: "/pages/lezerscadeaus.html",
      description: "Bladwijzers, sets en leeshoekstukken voor boekenliefhebbers."
    },
    {
      label: "Cadeaus voor kattenliefhebbers",
      href: "/pages/cadeaus-voor-kattenliefhebbers.html",
      description: "Kattenthema-onderzetters en decoratie voor gezellige huizen en warme hoeken."
    }
  ],
  ctaPanel: {
    title: "Klaar om het volledige houten cadeauaanbod op Etsy te bekijken?",
    text: "Spring naar Etsy voor beschikbaarheid, beoordelingen en personalisatiedetails.",
    label: "Open houten cadeaus op Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?ref=shop-header-name"
  }
});

pagesEn.push({
  path: "/en/pages/contact.html",
  pairPath: "/pages/contact.html",
  template: "contact",
  locale: "en",
  title: "Contact Craftygiftsplace for Personalized Wooden Gifts | Craftygiftsplace",
  metaDescription: "Contact Craftygiftsplace on Etsy for personalization questions, gift guidance and help choosing wooden coasters, bookmarks or decor.",
  h1: "Questions or personalization?",
  eyebrow: "Contact",
  intro: "For ordering, personalization and questions about a specific item, Etsy is the best place to get in touch. This page simply shows the clearest next step and a few easy routes into the main collections.",
  breadcrumbs: [
    { label: "Home", path: "/en/index.html" },
    { label: "Contact", path: "/en/pages/contact.html" }
  ],
  primaryCta: {
    label: "Message us on Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?ref=shop-header-name"
  },
  secondaryCta: {
    label: "Read Etsy reviews",
    targetUrl: "https://www.etsy.com/shop/Craftygiftsplace#reviews"
  },
  infoCards: [
    {
      title: "Small handmade wood studio",
      text: "Craftygiftsplace focuses on engraved wooden gifts that feel warm, useful and personal rather than mass-made. The collection here stays close to readers, cat lovers, cozy homes and a few personalized keepsakes."
    },
    {
      title: "Materials and finish",
      items: [
        "Wood is chosen for clean engraving, visible grain and a warm natural finish.",
        "Many coaster sets use cork backing when it is included in the Etsy listing.",
        "Each piece is checked after engraving so the finish looks clean, warm and ready to give."
      ]
    },
    {
      title: "How the process works",
      text: "Designs usually start as themed sketches, names or lettering, then move through engraving, hand-finishing and a final quality check before they are listed on Etsy."
    },
    {
      title: "What buyers can ask about",
      items: [
        "Personalization with a name, date or short message.",
        "Help choosing between coasters, bookmarks and broader wooden gifts.",
        "Questions about gift fit for housewarming, reader gifts or milestone occasions."
      ]
    },
    {
      title: "Why Etsy is the contact point",
      text: "Etsy keeps ordering, delivery estimates, personalization notes, buyer protection and messaging together in one trusted place."
    },
    {
      title: "Helpful starting points",
      text: "If someone is still deciding, start with wooden coasters, wooden bookmarks or one of the gift guides."
    }
  ],
  sidebar: {
    title: "Buying confidence",
    quote: "\"This seller was an absolute pleasure to deal with... I'll be back for more.\"",
    attribution: "Clare · Etsy review",
    text: "The contact page keeps things simple: message on Etsy for order-specific help, or browse a collection first if you want to compare styles.",
    links: [
      { label: "Wooden coasters", href: "/en/pages/wooden-coasters.html" },
      { label: "Reader gifts", href: "/en/pages/reader-gifts.html" },
      { label: "Housewarming gifts", href: "/en/pages/housewarming-gifts.html" }
    ]
  },
  faq: [
    {
      question: "Do orders happen on this website?",
      answer: "No. Orders and messages are handled on Etsy, where shoppers can review the listing, delivery details and personalization options in one place."
    },
    {
      question: "Can I ask for personalization before ordering?",
      answer: "Yes. Etsy messaging is the best place to ask about names, dates, short messages or other listing-specific details."
    },
    {
      question: "Can I browse the collections before I message?",
      answer: "Yes. The main collections and gift guides stay linked from this page so shoppers can compare styles first if they want."
    }
  ],
  ctaPanel: {
    title: "Ready to message or browse on Etsy?",
    text: "Open the Etsy shop to send a message, check reviews or keep exploring the listings that match your gift idea.",
    label: "Open Craftygiftsplace on Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?ref=shop-header-name"
  }
});

pagesNl.push({
  path: "/pages/contact.html",
  pairPath: "/en/pages/contact.html",
  template: "contact",
  locale: "nl",
  title: "Contact met Craftygiftsplace voor Gepersonaliseerde Houten Cadeaus | Craftygiftsplace",
  metaDescription: "Neem contact op met Craftygiftsplace via Etsy voor personalisatie, cadeauvragen en hulp bij het kiezen van houten onderzetters, bladwijzers of decoratie.",
  h1: "Vragen of personalisatie?",
  eyebrow: "Contact",
  intro: "Voor bestellen, personalisatie en vragen over een specifiek item is Etsy de beste plek om contact op te nemen. Deze pagina laat vooral de duidelijkste volgende stap zien en geeft een paar snelle routes naar de belangrijkste collecties.",
  breadcrumbs: [
    { label: "Home", path: "/index.html" },
    { label: "Contact", path: "/pages/contact.html" }
  ],
  primaryCta: {
    label: "Stuur ons een bericht op Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?ref=shop-header-name"
  },
  secondaryCta: {
    label: "Lees Etsy beoordelingen",
    targetUrl: "https://www.etsy.com/shop/Craftygiftsplace#reviews"
  },
  infoCards: [
    {
      title: "Kleine handgemaakte houtstudio",
      text: "Craftygiftsplace richt zich op gegraveerde houten cadeaus die warm, bruikbaar en persoonlijk aanvoelen in plaats van massaproductie. De collectie hier blijft dicht bij lezers, kattenliefhebbers, gezellige huizen en een klein aantal gepersonaliseerde herinneringscadeaus."
    },
    {
      title: "Materialen en afwerking",
      items: [
        "Het hout wordt gekozen voor een mooie nerf, heldere gravure en warme natuurlijke uitstraling.",
        "Veel onderzettersets krijgen een kurken achterkant wanneer die in de Etsy listing vermeld staat.",
        "Elk stuk wordt na het graveren nagekeken zodat de afwerking netjes, warm en verzorgd aanvoelt."
      ]
    },
    {
      title: "Hoe het proces werkt",
      text: "Ontwerpen beginnen meestal als thema, naam of belettering en gaan daarna door graveren, handmatige afwerking en een laatste kwaliteitscontrole voordat ze op Etsy verschijnen."
    },
    {
      title: "Waar kunnen kopers naar vragen?",
      items: [
        "Personalisatie met een naam, datum of korte tekst.",
        "Hulp bij het kiezen tussen onderzetters, bladwijzers en bredere houten cadeaus.",
        "Vragen over cadeaugeschiktheid voor verhuiscadeaus, lezerscadeaus of persoonlijke gelegenheden."
      ]
    },
    {
      title: "Waarom Etsy het contactpunt blijft",
      text: "Zo blijven bestellen, levertijden, personalisatienotities, kopersbescherming en berichten netjes samen op één vertrouwde plek."
    },
    {
      title: "Handige startpunten",
      text: "Wie nog twijfelt, kan starten bij houten onderzetters, houten bladwijzers of een van de cadeaugidsen."
    }
  ],
  sidebar: {
    title: "Koop met vertrouwen",
    quote: "\"Deze verkoper was ontzettend prettig om mee te schakelen... ik kom zeker terug voor meer.\"",
    attribution: "Clare · Etsy beoordeling",
    text: "De contactpagina houdt het eenvoudig: stuur een bericht op Etsy voor ordervragen, of bekijk eerst een collectie als je stijlen wilt vergelijken.",
    links: [
      { label: "Houten onderzetters", href: "/pages/onderzetters.html" },
      { label: "Lezerscadeaus", href: "/pages/lezerscadeaus.html" },
      { label: "Verhuiscadeaus", href: "/pages/verhuiscadeaus.html" }
    ]
  },
  faq: [
    {
      question: "Wordt er op deze website besteld?",
      answer: "Nee. Bestellen en berichten lopen via Etsy, zodat shoppers de listing, levering en personalisatie op één plek kunnen bekijken."
    },
    {
      question: "Kan ik voor het bestellen naar personalisatie vragen?",
      answer: "Ja. Etsy berichten is de beste plek om te vragen naar namen, data, korte teksten of andere listing-specifieke details."
    },
    {
      question: "Kan ik eerst de collecties bekijken voordat ik bericht stuur?",
      answer: "Ja. De hoofdcollecties en cadeaugidsen blijven vanaf deze pagina bereikbaar, zodat shoppers eerst stijlen kunnen vergelijken als ze dat willen."
    }
  ],
  ctaPanel: {
    title: "Klaar om te berichten of verder te kijken op Etsy?",
    text: "Open de Etsy shop om een bericht te sturen, beoordelingen te lezen of verder te bladeren tussen listings die bij jouw cadeau-idee passen.",
    label: "Open Craftygiftsplace op Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?ref=shop-header-name"
  }
});

pagesEn.push({
  path: "/en/pages/cat-lover-gifts.html",
  pairPath: "/pages/cadeaus-voor-kattenliefhebbers.html",
  template: "intent",
  locale: "en",
  title: "Wooden Cat Lover Gifts for Cozy Homes | Craftygiftsplace",
  metaDescription: "Shop wooden cat lover gifts including cat-themed coasters and cozy decor for shelves, coffee tables and thoughtful gifting.",
  h1: "Wooden cat lover gifts for cozy homes, shelves and coffee tables",
  eyebrow: "Gift guide",
  intro: "This page is for shoppers who already know they want a gift for a cat lover. Instead of piecing that theme together across different collections, it brings the strongest cat-themed wooden picks into one place. That includes cat coasters for coffee tables, celestial cat designs for cozy interiors and a smaller decor piece for shelves, desks or reading nooks. It is a simple way to compare practical gifts and decorative ones before heading to Etsy.",
  breadcrumbs: [
    { label: "Home", path: "/en/index.html" },
    { label: "Cat lover gifts", path: "/en/pages/cat-lover-gifts.html" }
  ],
  primaryCta: {
    label: "Shop cat-themed gifts on Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?search_query=cat"
  },
  secondaryCta: {
    label: "Jump to cat gift picks",
    target: "#featured-products"
  },
  linkCloud: [
    { label: "Wooden coasters", target: "/en/pages/wooden-coasters.html" },
    { label: "Housewarming gifts", target: "/en/pages/housewarming-gifts.html" },
    { label: "All cat gift products", target: "#shop-catalog" }
  ],
  sidebar: {
    title: "Buying confidence",
    quote: "\"Great quality, exactly as described, and seller was kind and communicative! Excited to gift these.\"",
    attribution: "Caroline · Etsy review",
    text: "Cat-themed wooden gifts with a 4.96/5 rating on Etsy — compare them here, then head straight to the shop.",
    links: [
      { label: "Browse wooden coasters", href: "/en/pages/wooden-coasters.html" },
      { label: "See housewarming gifts", href: "/en/pages/housewarming-gifts.html" },
      { label: "Shop cat results on Etsy", href: "https://www.etsy.com/shop/Craftygiftsplace?search_query=cat" }
    ]
  },
  featuredItems: [
    { slug: "cat-and-moon-wooden-coasters", summary: "A cat-lover favorite that feels both decorative and practical for living rooms, desks and easy birthday gifting." },
    { slug: "celestial-cat-wooden-coasters", summary: "A slightly moodier cat gift pick for shoppers who want celestial detail and cozy coffee-table styling." },
    { slug: "moon-cat-shadow-tealight-holder", summary: "A shelf-ready decor piece that turns the cat theme into a softer gift for reading nooks and nightstands." },
    { slug: "cat-wooden-coasters", summary: "A simpler cat-themed coaster set for buyers who want an easy, practical gift with a clear feline look." }
  ],
  featuredWhy: [
    "It keeps every cat-themed pick in one calm, easy browse.",
    "It mixes practical coaster sets with one softer decor option.",
    "It works well when the gift should feel cozy, useful and clearly cat-led."
  ],
  catalog: {
    mode: "slugs",
    slugs: [
      "cat-and-moon-wooden-coasters",
      "cat-wooden-coasters",
      "celestial-cat-wooden-coasters",
      "moon-cat-shadow-tealight-holder"
    ],
    intro: "These are the strongest cat-themed picks for cozy homes, shelves and coffee-table gifting.",
    ctaLabel: "View cat-themed gifts on Etsy",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?search_query=cat"
  },
  faq: [
    {
      question: "Are these cat lover gifts all coasters?",
      answer: "No. The page includes cat-themed coaster sets and a small wooden decor piece so shoppers can choose between practical and display-led gifts."
    },
    {
      question: "Do these gifts work for housewarming too?",
      answer: "Yes. Several cat-themed coaster designs also suit housewarming buyers, especially when the gift needs to feel useful and cozy."
    },
    {
      question: "Can I still browse the full coaster collection?",
      answer: "Yes. This page links directly back to the broader wooden coaster collection for anyone who wants more themes."
    }
  ],
  relatedLinks: [
    {
      label: "Wooden coasters",
      href: "/en/pages/wooden-coasters.html",
      description: "A curated coaster selection with cat, celestial and botanical styles."
    },
    {
      label: "Housewarming gifts",
      href: "/en/pages/housewarming-gifts.html",
      description: "Useful wooden picks for cozy homes, coffee tables and shelf styling."
    },
    {
      label: "Wooden gifts",
      href: "/en/pages/wooden-gifts.html",
      description: "Browse decor pieces and signs if the buyer wants something beyond coaster sets."
    }
  ],
  ctaPanel: {
    title: "Ready to send a cat lover to Etsy?",
    text: "Open the cat-themed Etsy results to compare designs, prices and reviews.",
    label: "Open cat gift results on Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?search_query=cat"
  }
});

pagesNl.push({
  path: "/pages/cadeaus-voor-kattenliefhebbers.html",
  pairPath: "/en/pages/cat-lover-gifts.html",
  template: "intent",
  locale: "nl",
  title: "Cadeaus voor Kattenliefhebbers in Hout voor Gezellige Huizen en Doordachte Etsy Cadeaus | Craftygiftsplace",
  metaDescription: "Bekijk houten cadeaus voor kattenliefhebbers met kattenthema-onderzetters en gezellige decoratie voor planken, salontafels en warme woonhoeken.",
  h1: "Houten cadeaus voor kattenliefhebbers voor gezellige huizen, planken en salontafels",
  eyebrow: "Cadeaugids",
  intro: "Deze pagina is er voor bezoekers die al weten dat ze een cadeau voor een kattenliefhebber zoeken. In plaats van dat thema over verschillende collecties te verdelen, brengt ze de sterkste houten keuzes met kattenthema samen op één plek. Denk aan kattenonderzetters voor salontafels, hemelse kattenontwerpen voor warme interieurs en een kleiner decorstuk voor planken, bureaus of leeshoeken. Zo wordt het makkelijker om praktische en decoratieve cadeaus te vergelijken voordat iemand doorklikt naar Etsy.",
  breadcrumbs: [
    { label: "Home", path: "/index.html" },
    { label: "Cadeaus voor kattenliefhebbers", path: "/pages/cadeaus-voor-kattenliefhebbers.html" }
  ],
  primaryCta: {
    label: "Bekijk kattenthema cadeaus op Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?search_query=cat"
  },
  secondaryCta: {
    label: "Spring naar kattenfavorieten",
    target: "#featured-products"
  },
  linkCloud: [
    { label: "Houten onderzetters", target: "/pages/onderzetters.html" },
    { label: "Verhuiscadeaus", target: "/pages/verhuiscadeaus.html" },
    { label: "Alle kattenproducten", target: "#shop-catalog" }
  ],
  sidebar: {
    title: "Waarom kattenliefhebbers dit waarderen",
    quote: "\"Dit zijn prachtige onderzetters. Ze zijn van hout gemaakt en voelen erg stevig aan.\"",
    attribution: "Andrew · Etsy beoordeling",
    text: "Producten met kattenthema waren al populair in de shop, en deze pagina brengt ze samen zodat kopers rustig kunnen vergelijken zonder tussen categorieën heen en weer te gaan.",
    links: [
      { label: "Bekijk houten onderzetters", href: "/pages/onderzetters.html" },
      { label: "Bekijk verhuiscadeaus", href: "/pages/verhuiscadeaus.html" },
      { label: "Bekijk kattenresultaten op Etsy", href: "https://www.etsy.com/shop/Craftygiftsplace?search_query=cat" }
    ]
  },
  featuredItems: [
    { slug: "cat-and-moon-wooden-coasters", summary: "Een favoriet voor kattenliefhebbers die tegelijk decoratief en praktisch voelt voor woonkamers, bureaus en verjaardagen." },
    { slug: "celestial-cat-wooden-coasters", summary: "Een iets sfeervollere kattenkeuze voor kopers die hemelse details en warme koffietafelstyling zoeken." },
    { slug: "moon-cat-shadow-tealight-holder", summary: "Een klein decorstuk dat het kattenthema zachter maakt voor leeshoeken en nachtkastjes." },
    { slug: "cat-wooden-coasters", summary: "Een eenvoudigere set kattenonderzetters voor kopers die een bruikbaar cadeau met een duidelijk kattenthema zoeken." }
  ],
  featuredWhy: [
    "Ze brengt alle kattenthema-keuzes samen in één rustig overzicht.",
    "Ze combineert praktische onderzettersets met één zachter decorstuk.",
    "Ze werkt goed wanneer het cadeau gezellig, bruikbaar en duidelijk kattengericht moet zijn."
  ],
  catalog: {
    mode: "slugs",
    slugs: [
      "cat-and-moon-wooden-coasters",
      "cat-wooden-coasters",
      "celestial-cat-wooden-coasters",
      "moon-cat-shadow-tealight-holder"
    ],
    intro: "Dit zijn de sterkste keuzes met kattenthema voor gezellige huizen, planken en cadeaus rond de koffietafel.",
    ctaLabel: "Bekijk kattencadeaus op Etsy",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?search_query=cat"
  },
  faq: [
    {
      question: "Bestaan deze cadeaus alleen uit onderzetters?",
      answer: "Nee. De pagina bevat kattenthema-onderzetters en een klein houten decorstuk, zodat kopers kunnen kiezen tussen praktisch en decoratief."
    },
    {
      question: "Werken deze cadeaus ook als verhuiscadeau?",
      answer: "Ja. Meerdere kattenthema-onderzetters passen ook goed bij verhuiscadeaus, vooral wanneer het cadeau bruikbaar én gezellig moet voelen."
    },
    {
      question: "Kan ik nog steeds de volledige onderzettercollectie bekijken?",
      answer: "Ja. Deze pagina linkt rechtstreeks terug naar de bredere collectie houten onderzetters voor wie meer thema's wil zien."
    }
  ],
  relatedLinks: [
    {
      label: "Houten onderzetters",
      href: "/pages/onderzetters.html",
      description: "Een gecureerde selectie onderzetters met katten-, hemelse en botanische stijlen."
    },
    {
      label: "Verhuiscadeaus",
      href: "/pages/verhuiscadeaus.html",
      description: "Bruikbare houten keuzes voor salontafels, planken en nieuwe woningen."
    },
    {
      label: "Houten cadeaus",
      href: "/pages/houten-cadeaus.html",
      description: "Bekijk decorstukken en borden als de koper iets anders wil dan alleen onderzetters."
    }
  ],
  ctaPanel: {
    title: "Klaar om kattencadeaus op Etsy te vergelijken?",
    text: "Open de Etsy resultaten met kattenthema om ontwerpen, prijzen en beoordelingen te vergelijken.",
    label: "Open kattenresultaten op Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?search_query=cat"
  }
});

pagesEn.push({
  path: "/en/pages/reader-gifts.html",
  pairPath: "/pages/lezerscadeaus.html",
  template: "intent",
  locale: "en",
  title: "Reader Gifts in Wood for Book Lovers, Fantasy Readers and Cozy Reading Nooks | Craftygiftsplace",
  metaDescription: "Shop wooden reader gifts for book lovers, fantasy readers and reading nooks. Browse bookmarks, themed sets and cozy decor.",
  h1: "Wooden Reader Gifts for Book Lovers and Cozy Reading Nooks",
  eyebrow: "Gift guide",
  intro: "This page is for shoppers looking for a gift that feels clearly chosen for a reader. It gathers bookmarks, fantasy-themed pieces and cozy reading-nook accents in one place, so buyers can compare a single bookmark with a fuller set or a room-friendly extra. Someone shopping for a reader usually wants the gift to match the person, the shelf or the reading habit, not just the product type. This guide makes that choice easier before the final click to Etsy.",
  breadcrumbs: [
    { label: "Home", path: "/en/index.html" },
    { label: "Reader gifts", path: "/en/pages/reader-gifts.html" }
  ],
  primaryCta: {
    label: "Shop reader gifts on Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?search_query=bookmark"
  },
  secondaryCta: {
    label: "Jump to reader gift picks",
    target: "#featured-products"
  },
  linkCloud: [
    { label: "Wooden bookmarks", target: "/en/pages/wooden-bookmarks.html" },
    { label: "Wooden gifts", target: "/en/pages/wooden-gifts.html" },
    { label: "All reader gift products", target: "#shop-catalog" }
  ],
  sidebar: {
    title: "Why readers enjoy this page",
    quote: "\"The detail is incredible, well crafted and very durable. Lovely bookmark.\"",
    attribution: "Bookmark buyer · Etsy review",
    text: "Reader-focused pieces were already part of the shop, and this page brings them together so readers and gift buyers can compare them side by side.",
    links: [
      { label: "Browse wooden bookmarks", href: "/en/pages/wooden-bookmarks.html" },
      { label: "Browse wooden gifts", href: "/en/pages/wooden-gifts.html" },
      { label: "Open Etsy bookmark results", href: "https://www.etsy.com/shop/Craftygiftsplace?search_query=bookmark" }
    ]
  },
  featuredItems: [
    { slug: "fantasy-reader-gift-set", summary: "The fastest way to buy a themed reader gift that already feels complete without combining separate listings manually." },
    { slug: "dragon-eye-wooden-bookmark", summary: "A fantasy bookmark that feels instantly right for a reader who prefers one focused gift." },
    { slug: "epic-fantasy-door-sign", summary: "A reading-room or hobby-room piece that expands the page beyond bookmarks while staying firmly inside the fantasy reader mood." },
    { slug: "personalized-feather-wooden-bookmark", summary: "A personalized bookmark for shoppers who want the reader gift to feel quieter, more personal and easy to keep." }
  ],
  featuredWhy: [
    "It starts with gifts that feel clearly chosen for a reader.",
    "It mixes bookmarks with a fuller set and one room piece.",
    "It helps shoppers choose for a reader, not just a product type."
  ],
  catalog: {
    mode: "slugs",
    slugs: [
      "fantasy-reader-gift-set",
      "dragon-eye-wooden-bookmark",
      "epic-fantasy-wooden-bookmark",
      "fantasy-sword-wooden-bookmark",
      "dragon-wooden-bookmark",
      "personalized-feather-wooden-bookmark",
      "classic-wooden-bookmark",
      "epic-fantasy-door-sign",
      "fantasy-wooden-coasters",
      "laser-birch-wood-incense-burner"
    ],
    intro: "These are the most relevant products for book lovers, fantasy readers and cozy reading corners.",
    ctaLabel: "View reader gifts on Etsy",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?search_query=bookmark"
  },
  faq: [
    {
      question: "Are reader gifts limited to bookmarks here?",
      answer: "No. The page includes bookmarks, a bundled reader gift set and related room pieces that also suit reading nooks."
    },
    {
      question: "Is this page useful for fantasy reader searches too?",
      answer: "Yes. Several featured items lean fantasy, so the page suits fantasy reader gifts as well as broader book-lover gifting."
    },
    {
      question: "Can I still browse the full bookmark collection?",
      answer: "Yes. The wooden bookmarks collection remains available for anyone who wants the complete bookmark range."
    }
  ],
  relatedLinks: [
    {
      label: "Wooden bookmarks",
      href: "/en/pages/wooden-bookmarks.html",
      description: "The full bookmark collection for readers, fantasy fans and book gifts."
    },
    {
      label: "Wooden gifts",
      href: "/en/pages/wooden-gifts.html",
      description: "Decor and signs that also fit cozy reading corners and themed rooms."
    },
    {
      label: "Housewarming gifts",
      href: "/en/pages/housewarming-gifts.html",
      description: "A related path for shoppers leaning more toward cozy home gifting than purely reader-focused gifts."
    }
  ],
  ctaPanel: {
    title: "Ready to shop reader gifts on Etsy?",
    text: "Open the Etsy results to compare bookmarks, bundles and reader-friendly decor pieces.",
    label: "Open reader gift results on Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?search_query=bookmark"
  }
});

pagesNl.push({
  path: "/pages/lezerscadeaus.html",
  pairPath: "/en/pages/reader-gifts.html",
  template: "intent",
  locale: "nl",
  title: "Lezerscadeaus in Hout voor Boekenliefhebbers, Fantasylezers en Gezellige Leeshoeken | Craftygiftsplace",
  metaDescription: "Bekijk houten lezerscadeaus voor boekenliefhebbers, fantasylezers en leeshoeken. Ontdek bladwijzers, themasets en warme decoratie.",
  h1: "Houten lezerscadeaus voor boekenliefhebbers en gezellige leeshoeken",
  eyebrow: "Cadeaugids",
  intro: "Deze pagina is er voor bezoekers die een cadeau zoeken dat duidelijk voor een lezer bedoeld voelt. Ze brengt bladwijzers, fantasy-ontwerpen en gezellige leeshoekaccenten samen op één plek, zodat kopers een losse bladwijzer kunnen vergelijken met een completere set of een extra decorstuk voor de kamer. Iemand die voor een lezer koopt, wil meestal iets dat past bij de persoon, de plank of de leesgewoonte, niet alleen bij het producttype. Deze gids maakt die keuze makkelijker voordat iemand doorklikt naar Etsy.",
  breadcrumbs: [
    { label: "Home", path: "/index.html" },
    { label: "Lezerscadeaus", path: "/pages/lezerscadeaus.html" }
  ],
  primaryCta: {
    label: "Bekijk lezerscadeaus op Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?search_query=bookmark"
  },
  secondaryCta: {
    label: "Spring naar lezersfavorieten",
    target: "#featured-products"
  },
  linkCloud: [
    { label: "Houten bladwijzers", target: "/pages/bladwijzers.html" },
    { label: "Houten cadeaus", target: "/pages/houten-cadeaus.html" },
    { label: "Alle lezersproducten", target: "#shop-catalog" }
  ],
  sidebar: {
    title: "Waarom lezers dit waarderen",
    quote: "\"Het detail is prachtig, mooi afgewerkt en erg stevig. Een heerlijke bladwijzer.\"",
    attribution: "Bladwijzer koper · Etsy beoordeling",
    text: "Boekachtige stukken waren al onderdeel van de shop, en deze pagina brengt ze samen zodat lezers en cadeaukopers ze rustig naast elkaar kunnen bekijken.",
    links: [
      { label: "Bekijk houten bladwijzers", href: "/pages/bladwijzers.html" },
      { label: "Bekijk houten cadeaus", href: "/pages/houten-cadeaus.html" },
      { label: "Open Etsy bladwijzerresultaten", href: "https://www.etsy.com/shop/Craftygiftsplace?search_query=bookmark" }
    ]
  },
  featuredItems: [
    { slug: "fantasy-reader-gift-set", summary: "De snelste manier om één thematisch lezerscadeau te kopen dat al compleet aanvoelt zonder losse listings te combineren." },
    { slug: "dragon-eye-wooden-bookmark", summary: "Een fantasybladwijzer die meteen als boekcadeau leest en goed werkt voor lezers die liever één gericht item krijgen." },
    { slug: "epic-fantasy-door-sign", summary: "Een leeskamer- of hobbykamerstuk dat de pagina breder maakt dan alleen bladwijzers zonder het fantasylezersgevoel te verliezen." },
    { slug: "personalized-feather-wooden-bookmark", summary: "Een persoonlijke bladwijzer voor kopers die het lezerscadeau liever wat rustiger, persoonlijker en blijvender maken." }
  ],
  featuredWhy: [
    "Ze begint bij cadeaus die meteen bij een lezer passen.",
    "Ze combineert bladwijzers met een completere set en een kamerstuk.",
    "Ze helpt kopers kiezen voor een lezer, niet alleen voor een producttype."
  ],
  catalog: {
    mode: "slugs",
    slugs: [
      "fantasy-reader-gift-set",
      "dragon-eye-wooden-bookmark",
      "epic-fantasy-wooden-bookmark",
      "fantasy-sword-wooden-bookmark",
      "dragon-wooden-bookmark",
      "personalized-feather-wooden-bookmark",
      "classic-wooden-bookmark",
      "epic-fantasy-door-sign",
      "fantasy-wooden-coasters",
      "laser-birch-wood-incense-burner"
    ],
    intro: "Dit zijn de meest relevante producten voor boekenliefhebbers, fantasylezers en gezellige leeshoeken.",
    ctaLabel: "Bekijk lezerscadeaus op Etsy",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?search_query=bookmark"
  },
  faq: [
    {
      question: "Bestaan lezerscadeaus hier alleen uit bladwijzers?",
      answer: "Nee. De pagina bevat bladwijzers, een complete lezerscadeauset en bijpassende kamerstukken voor gezellige leeshoeken."
    },
    {
      question: "Is deze pagina ook geschikt voor fantasy lezerscadeaus?",
      answer: "Ja. Meerdere uitgelichte producten leunen fantasy, waardoor de pagina zowel fantasy lezerscadeaus als bredere cadeaus voor boekenliefhebbers ondersteunt."
    },
    {
      question: "Kan ik nog steeds de volledige bladwijzercollectie bekijken?",
      answer: "Ja. De collectie houten bladwijzers blijft beschikbaar voor iedereen die het volledige bladwijzerassortiment wil zien."
    }
  ],
  relatedLinks: [
    {
      label: "Houten bladwijzers",
      href: "/pages/bladwijzers.html",
      description: "De volledige bladwijzercollectie voor lezers, fantasyfans en boekcadeaus."
    },
    {
      label: "Houten cadeaus",
      href: "/pages/houten-cadeaus.html",
      description: "Decoratie en borden die ook goed passen in gezellige leeskamers en themahoeken."
    },
    {
      label: "Verhuiscadeaus",
      href: "/pages/verhuiscadeaus.html",
      description: "Een verwante route voor kopers die meer naar een gezellig wooncadeau dan naar een puur lezerscadeau neigen."
    }
  ],
  ctaPanel: {
    title: "Klaar om cadeaus voor lezers op Etsy te bekijken?",
    text: "Open Etsy om bladwijzers, sets en lezersvriendelijke decorstukken te vergelijken.",
    label: "Open lezersresultaten op Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?search_query=bookmark"
  }
});

pagesEn.push({
  path: "/en/pages/housewarming-gifts.html",
  pairPath: "/pages/verhuiscadeaus.html",
  template: "intent",
  locale: "en",
  title: "Housewarming Gifts in Wood for Cozy Coffee Tables, Shelves and New Homes | Craftygiftsplace",
  metaDescription: "Shop wooden housewarming gifts including coaster sets and cozy decor for coffee tables, shelves and thoughtful home gifting.",
  h1: "Wooden housewarming gifts for cozy coffee tables, shelves and new homes",
  eyebrow: "Gift guide",
  intro: "This page is for shoppers who want a housewarming gift that feels useful and warm at the same time. It combines coaster sets with small decor-led wooden gifts that work on coffee tables, shelves and side tables, so visitors can compare practical pieces with softer decorative options in one place. That makes it easier to choose something that feels at home right away before heading to Etsy for the full listing details.",
  breadcrumbs: [
    { label: "Home", path: "/en/index.html" },
    { label: "Housewarming gifts", path: "/en/pages/housewarming-gifts.html" }
  ],
  primaryCta: {
    label: "Shop housewarming-ready gifts on Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?search_query=coaster"
  },
  secondaryCta: {
    label: "Jump to housewarming picks",
    target: "#featured-products"
  },
  linkCloud: [
    { label: "Wooden coasters", target: "/en/pages/wooden-coasters.html" },
    { label: "Wooden gifts", target: "/en/pages/wooden-gifts.html" },
    { label: "All housewarming products", target: "#shop-catalog" }
  ],
  sidebar: {
    title: "Why new-home shoppers like it",
    quote: "\"Great quality, exactly as described, and seller was kind and communicative.\"",
    attribution: "Caroline · Etsy review",
    text: "Housewarming ideas already appeared across the shop, and this page brings the best table pieces and small decor gifts together for an easier choice.",
    links: [
      { label: "Browse wooden coasters", href: "/en/pages/wooden-coasters.html" },
      { label: "Browse wooden gifts", href: "/en/pages/wooden-gifts.html" },
      { label: "Shop coaster results on Etsy", href: "https://www.etsy.com/shop/Craftygiftsplace?search_query=coaster" }
    ]
  },
  featuredItems: [
    { slug: "zodiac-wooden-coasters", summary: "A practical table gift with enough visual personality to feel chosen for the home, not just for the occasion." },
    { slug: "moon-cat-shadow-tealight-holder", summary: "A smaller decor piece for shelves and side tables when a housewarming gift needs warmth more than size." },
    { slug: "laser-birch-wood-incense-burner", summary: "A calm, decor-led option for shoppers who want a cozy atmosphere gift rather than a purely functional table set." },
    { slug: "tree-of-life-wooden-coasters", summary: "A warm tree motif that suits new shelves, coffee tables and easy welcome-home gifting." }
  ],
  featuredWhy: [
    "It keeps practical table gifts and softer decor together.",
    "It helps new-home shoppers compare useful and decorative options.",
    "It suits cozy shelves, coffee tables and small welcome-home moments."
  ],
  catalog: {
    mode: "slugs",
    slugs: [
      "zodiac-wooden-coasters",
      "floral-wooden-coasters",
      "bee-motif-wooden-coasters",
      "tree-of-life-wooden-coasters",
      "cat-and-moon-wooden-coasters",
      "moon-cat-shadow-tealight-holder",
      "laser-birch-wood-incense-burner",
      "mushroom-moon-wooden-coasters",
      "forest-animal-wooden-coasters",
      "leaf-wooden-coasters"
    ],
    intro: "These products suit new-home buyers best because they combine daily use with warm wooden styling.",
    ctaLabel: "View housewarming-friendly products on Etsy",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?search_query=coaster"
  },
  faq: [
    {
      question: "Why are coasters featured so heavily for housewarming gifts?",
      answer: "Because they are practical from day one, easy to style on tables and still feel themed enough to count as a thoughtful gift."
    },
    {
      question: "Are there decor-only housewarming options too?",
      answer: "Yes. The page also includes small decor-led wooden gifts such as tealight holders and incense pieces for shelves and side tables."
    },
    {
      question: "Can I browse the broader wooden gift collection from here?",
      answer: "Yes. Related links connect this page to both the wooden coaster collection and the wider wooden gifts category."
    }
  ],
  relatedLinks: [
    {
      label: "Wooden coasters",
      href: "/en/pages/wooden-coasters.html",
      description: "The strongest collection if the buyer mainly wants practical table gifts."
    },
    {
      label: "Wooden gifts",
      href: "/en/pages/wooden-gifts.html",
      description: "Decor, signs and keepsake pieces for broader home-led gifting."
    },
    {
      label: "Cat lover gifts",
      href: "/en/pages/cat-lover-gifts.html",
      description: "A related path when the new-home buyer is also clearly shopping for a cat owner."
    }
  ],
  ctaPanel: {
    title: "Ready to compare housewarming picks on Etsy?",
    text: "Open Etsy to review cozy table gifts, decor pieces and listing details.",
    label: "Open housewarming-ready results on Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?search_query=coaster"
  }
});

pagesNl.push({
  path: "/pages/verhuiscadeaus.html",
  pairPath: "/en/pages/housewarming-gifts.html",
  template: "intent",
  locale: "nl",
  title: "Verhuiscadeaus in Hout voor Gezellige Salontafels, Planken en Nieuwe Huizen | Craftygiftsplace",
  metaDescription: "Bekijk houten verhuiscadeaus met onderzettersets en gezellige decoratie voor salontafels, planken en doordachte Etsy wooncadeaus.",
  h1: "Houten verhuiscadeaus voor gezellige salontafels, planken en nieuwe huizen",
  eyebrow: "Cadeaugids",
  intro: "Deze pagina is er voor bezoekers die een verhuiscadeau zoeken dat tegelijk bruikbaar en warm aanvoelt. Ze combineert onderzettersets met kleinere houten decorstukken voor salontafels, planken en bijzettafels, zodat bezoekers praktische en meer decoratieve keuzes op één plek kunnen vergelijken. Zo wordt het makkelijker om iets te kiezen dat meteen thuis voelt voordat iemand doorklikt naar Etsy voor alle details.",
  breadcrumbs: [
    { label: "Home", path: "/index.html" },
    { label: "Verhuiscadeaus", path: "/pages/verhuiscadeaus.html" }
  ],
  primaryCta: {
    label: "Bekijk verhuiswaardige cadeaus op Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?search_query=coaster"
  },
  secondaryCta: {
    label: "Spring naar verhuisfavorieten",
    target: "#featured-products"
  },
  linkCloud: [
    { label: "Houten onderzetters", target: "/pages/onderzetters.html" },
    { label: "Houten cadeaus", target: "/pages/houten-cadeaus.html" },
    { label: "Alle verhuisproducten", target: "#shop-catalog" }
  ],
  sidebar: {
    title: "Waarom nieuwe bewoners dit mooi vinden",
    quote: "\"Geweldige kwaliteit, precies zoals beschreven, en de verkoper was vriendelijk en duidelijk in de communicatie.\"",
    attribution: "Caroline · Etsy beoordeling",
    text: "Verhuiscadeaus kwamen al terug in de shop, en deze pagina brengt de fijnste tafelstukken en kleine decoratie samen zodat kiezen makkelijker wordt.",
    links: [
      { label: "Bekijk houten onderzetters", href: "/pages/onderzetters.html" },
      { label: "Bekijk houten cadeaus", href: "/pages/houten-cadeaus.html" },
      { label: "Bekijk onderzetterresultaten op Etsy", href: "https://www.etsy.com/shop/Craftygiftsplace?search_query=coaster" }
    ]
  },
  featuredItems: [
    { slug: "zodiac-wooden-coasters", summary: "Een praktisch tafelcadeau met genoeg karakter om gekozen aan te voelen voor het huis, niet alleen voor de gelegenheid." },
    { slug: "moon-cat-shadow-tealight-holder", summary: "Een kleiner decorstuk voor planken en bijzettafels wanneer een verhuiscadeau vooral warmte moet toevoegen." },
    { slug: "laser-birch-wood-incense-burner", summary: "Een rustige decoratieve keuze voor kopers die liever een sfeerobject dan een puur functionele tafelset geven." },
    { slug: "tree-of-life-wooden-coasters", summary: "Een warme boomgravure die goed past bij nieuwe planken, salontafels en een makkelijk welkom-thuiscadeau." }
  ],
  featuredWhy: [
    "Ze houdt praktische tafelcadeaus en zachtere decoratie samen.",
    "Ze helpt nieuwe bewoners bruikbare en decoratieve keuzes vergelijken.",
    "Ze past bij gezellige planken, salontafels en kleine welkom-thuis momenten."
  ],
  catalog: {
    mode: "slugs",
    slugs: [
      "zodiac-wooden-coasters",
      "floral-wooden-coasters",
      "bee-motif-wooden-coasters",
      "tree-of-life-wooden-coasters",
      "cat-and-moon-wooden-coasters",
      "moon-cat-shadow-tealight-holder",
      "laser-birch-wood-incense-burner",
      "mushroom-moon-wooden-coasters",
      "forest-animal-wooden-coasters",
      "leaf-wooden-coasters"
    ],
    intro: "Deze producten passen het best bij nieuwe huizen omdat ze dagelijks gebruik combineren met warme houten styling.",
    ctaLabel: "Bekijk verhuiswaardige producten op Etsy",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?search_query=coaster"
  },
  faq: [
    {
      question: "Waarom staan onderzetters zo centraal bij verhuiscadeaus?",
      answer: "Omdat ze vanaf dag één bruikbaar zijn, gemakkelijk op tafel liggen en toch thematisch genoeg voelen om als doordacht cadeau over te komen."
    },
    {
      question: "Zijn er ook decoratieve verhuiscadeaus zonder tafelgebruik?",
      answer: "Ja. De pagina bevat ook kleinere houten decorstukken zoals theelichthouders en wierookhouders voor planken en bijzettafels."
    },
    {
      question: "Kan ik vanaf hier ook de bredere collectie houten cadeaus bekijken?",
      answer: "Ja. Gerelateerde links verbinden deze pagina met zowel houten onderzetters als de ruimere houten cadeaucollectie."
    }
  ],
  relatedLinks: [
    {
      label: "Houten onderzetters",
      href: "/pages/onderzetters.html",
      description: "De sterkste collectie als de koper vooral praktische tafelcadeaus zoekt."
    },
    {
      label: "Houten cadeaus",
      href: "/pages/houten-cadeaus.html",
      description: "Decoratie, deurhangers en herinneringscadeaus voor een warm nieuw huis."
    },
    {
      label: "Cadeaus voor kattenliefhebbers",
      href: "/pages/cadeaus-voor-kattenliefhebbers.html",
      description: "Een verwante route wanneer de koper voor een nieuwe woning en een katteneigenaar koopt."
    }
  ],
  ctaPanel: {
    title: "Klaar om verhuisfavorieten op Etsy te vergelijken?",
    text: "Open Etsy om gezellige tafelcadeaus, decorstukken en listingdetails te bekijken.",
    label: "Open verhuisresultaten op Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace?search_query=coaster"
  }
});

const EN_ETSY_SECTION_PAGES = [
  {
    label: "DIY",
    path: "/en/pages/diy.html",
    pairPath: "/en/pages/wooden-gifts.html",
    intro: "This Etsy section groups the hands-on blanks and kits that make sense for painting, crafting or finishing at home.",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?search_query=diy",
    slugs: [
      "birch-wood-circle-blanks",
      "wooden-dinosaur-shapes",
      "diy-christmas-ornaments",
      "diy-halloween-kit-wooden-coasters"
    ],
    relatedLinks: [
      {
        label: "Wooden gifts",
        href: "/en/pages/wooden-gifts.html",
        description: "The broader handmade gift collection for decor, signs and keepsakes."
      },
      {
        label: "Educational Toys & Games",
        href: "/en/pages/educational-toys-and-games.html",
        description: "A nearby section for the learning-focused wooden piece in the shop."
      },
      {
        label: "Christmas",
        href: "/en/pages/christmas.html",
        description: "Holiday-ready keepsakes and seasonal wooden browsing."
      }
    ]
  },
  {
    label: "Baby Bliss",
    path: "/en/pages/baby-bliss.html",
    pairPath: "/en/pages/wooden-gifts.html",
    intro: "This Etsy section keeps the baby milestone and nursery-friendly pieces together for new-arrival gifting and memory-making.",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?search_query=baby",
    slugs: [
      "wooden-baby-milestone-discs",
      "wooden-baby-closet-dividers"
    ],
    relatedLinks: [
      {
        label: "Personalized Items",
        href: "/en/pages/personalized-items.html",
        description: "Custom-ready listings for names, dates and memorable milestones."
      },
      {
        label: "Christmas",
        href: "/en/pages/christmas.html",
        description: "The holiday keepsake page for the current Christmas listing."
      },
      {
        label: "Wooden gifts",
        href: "/en/pages/wooden-gifts.html",
        description: "The broader handmade gifts collection for home-led browsing."
      }
    ]
  },
  {
    label: "Door Hanger",
    path: "/en/pages/door-hangers.html",
    pairPath: "/en/pages/wooden-gifts.html",
    intro: "This Etsy section focuses on wooden signs and hangers for doors, bedrooms, gaming setups and quiet corners.",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?search_query=door%20hanger",
    slugs: [
      "fantasy-gamer-door-sign",
      "moba-gamer-door-hanger",
      "fps-gamer-door-hanger",
      "gaming-do-not-disturb-sign",
      "wooden-no-cameras-door-hanger",
      "do-not-ring-door-sign",
      "prayer-in-progress-door-hanger",
      "epic-fantasy-door-sign"
    ],
    relatedLinks: [
      {
        label: "Wooden gifts",
        href: "/en/pages/wooden-gifts.html",
        description: "The wider gifts page for signs, decor and keepsake pieces."
      },
      {
        label: "Gifts for IT & Gamers",
        href: "/en/pages/gifts-for-it-and-gamers.html",
        description: "A smaller tech-leaning section linked to desk and gamer gifting."
      },
      {
        label: "Wedding",
        href: "/en/pages/wedding.html",
        description: "A focused newlywed page for the wedding-ready listing."
      }
    ]
  },
  {
    label: "Pet Memorial",
    path: "/en/pages/pet-memorial.html",
    pairPath: "/en/pages/wooden-gifts.html",
    intro: "This Etsy section keeps the pet memorial piece on a dedicated page instead of burying it inside a broader gift category.",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?search_query=pet%20memorial",
    slugs: [
      "personalized-pet-memorial-plaque"
    ],
    relatedLinks: [
      {
        label: "Personalized Items",
        href: "/en/pages/personalized-items.html",
        description: "More custom-led pieces where names, dates or personal details matter."
      },
      {
        label: "Candle Holders",
        href: "/en/pages/candle-holders.html",
        description: "Warm shelf pieces that also sit inside the broader wooden gifts world."
      },
      {
        label: "Wooden gifts",
        href: "/en/pages/wooden-gifts.html",
        description: "The broad category page for decor, keepsakes and home pieces."
      }
    ]
  },
  {
    label: "Personalized Items",
    path: "/en/pages/personalized-items.html",
    pairPath: "/en/pages/wooden-gifts.html",
    intro: "This Etsy section gathers the listings where names, dates or custom wording are the main reason someone clicks through.",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?search_query=personalized",
    slugs: [
      "personalized-wooden-coasters",
      "personalised-team-wooden-coasters",
      "personalized-calendar-coaster",
      "personalized-feather-wooden-bookmark",
      "personaliseerbare-houten-onderzetters-met-kurk-onderkant-set-van-6"
    ],
    relatedLinks: [
      {
        label: "Wooden gifts",
        href: "/en/pages/wooden-gifts.html",
        description: "The wider gift range that still sends shoppers to Etsy for customization."
      },
      {
        label: "Wedding",
        href: "/en/pages/wedding.html",
        description: "A focused wedding section for the newlywed cash-gift listing."
      },
      {
        label: "Wooden bookmarks",
        href: "/en/pages/wooden-bookmarks.html",
        description: "The full bookmark collection, including reader-friendly personalized picks."
      }
    ]
  },
  {
    label: "Candle Holders",
    path: "/en/pages/candle-holders.html",
    pairPath: "/en/pages/wooden-gifts.html",
    intro: "This Etsy section brings together the candle-ready pieces and shadow-casting tealight holders for shelves, consoles and cozy corners.",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?search_query=candle%20holder",
    slugs: [
      "moon-cat-shadow-tealight-holder",
      "spider-web-tealight-holder",
      "skull-tealight-holder"
    ],
    relatedLinks: [
      {
        label: "Wooden gifts",
        href: "/en/pages/wooden-gifts.html",
        description: "The broader handmade gifts page for decor, signs and keepsakes."
      },
      {
        label: "Housewarming gifts",
        href: "/en/pages/housewarming-gifts.html",
        description: "A warm home-focused route for shelf accents and table-ready pieces."
      },
      {
        label: "Cat lover gifts",
        href: "/en/pages/cat-lover-gifts.html",
        description: "Cat-themed coasters and decor for cat-owner gifting."
      }
    ]
  },
  {
    label: "Incense burners",
    path: "/en/pages/incense-burners.html",
    pairPath: "/en/pages/wooden-gifts.html",
    intro: "This Etsy section keeps the incense burner on a focused page for calm corners, reading nooks and shelf styling.",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?search_query=incense%20burner",
    slugs: [
      "laser-birch-wood-incense-burner"
    ],
    relatedLinks: [
      {
        label: "Wooden gifts",
        href: "/en/pages/wooden-gifts.html",
        description: "The full decor and keepsake category for broader gift browsing."
      },
      {
        label: "Housewarming gifts",
        href: "/en/pages/housewarming-gifts.html",
        description: "A nearby page for shoppers leaning more toward cozy-home gifting."
      },
      {
        label: "Reader gifts",
        href: "/en/pages/reader-gifts.html",
        description: "Bookmarks, bundles and room pieces for book lovers and reading corners."
      }
    ]
  },
  {
    label: "Educational Toys & Games",
    path: "/en/pages/educational-toys-and-games.html",
    pairPath: "/en/pages/wooden-gifts.html",
    intro: "This Etsy section highlights the hands-on learning piece in the shop for classroom, homeschool and early maths gifting.",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?search_query=montessori",
    slugs: [
      "montessori-wooden-numicon-set"
    ],
    relatedLinks: [
      {
        label: "DIY",
        href: "/en/pages/diy.html",
        description: "More hands-on blanks and kits for painting, finishing and making."
      },
      {
        label: "Baby Bliss",
        href: "/en/pages/baby-bliss.html",
        description: "Nursery-friendly keepsakes and baby milestone pieces."
      },
      {
        label: "Wooden gifts",
        href: "/en/pages/wooden-gifts.html",
        description: "The broader handmade gift range for non-toy browsing."
      }
    ]
  },
  {
    label: "Funny Presents",
    path: "/en/pages/funny-presents.html",
    pairPath: "/en/pages/wooden-gifts.html",
    intro: "This Etsy section keeps the novelty wooden gift easy to find without mixing it into the wider catalog.",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?search_query=funny%20gift",
    slugs: [
      "bald-man-s-comb"
    ],
    relatedLinks: [
      {
        label: "Wooden gifts",
        href: "/en/pages/wooden-gifts.html",
        description: "The wider handmade gifts page for calmer decor-led browsing."
      },
      {
        label: "Gifts for IT & Gamers",
        href: "/en/pages/gifts-for-it-and-gamers.html",
        description: "A nearby tech-themed page for smaller desk-ready gift ideas."
      },
      {
        label: "Housewarming gifts",
        href: "/en/pages/housewarming-gifts.html",
        description: "Useful wooden gifts for homes, tables and easy gifting."
      }
    ]
  },
  {
    label: "Christmas",
    path: "/en/pages/christmas.html",
    pairPath: "/en/pages/wooden-gifts.html",
    intro: "This Etsy section surfaces the live Christmas keepsake so holiday shoppers can reach it without searching through the full catalog.",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?search_query=christmas",
    slugs: [
      "diy-christmas-ornaments"
    ],
    relatedLinks: [
      {
        label: "DIY",
        href: "/en/pages/diy.html",
        description: "Craft blanks and seasonal kits for hands-on holiday making."
      },
      {
        label: "Baby Bliss",
        href: "/en/pages/baby-bliss.html",
        description: "New-arrival keepsakes that also fit first-Christmas gifting."
      },
      {
        label: "Wooden gifts",
        href: "/en/pages/wooden-gifts.html",
        description: "The broader handmade gifts category for non-seasonal browsing."
      }
    ]
  },
  {
    label: "Gifts for IT & Gamers",
    path: "/en/pages/gifts-for-it-and-gamers.html",
    pairPath: "/en/pages/wooden-gifts.html",
    intro: "This Etsy section gives the shop's tech-themed gift a clear place inside the existing English catalog.",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?search_query=ram%20keychain",
    slugs: [
      "upcycled-ram-keychain"
    ],
    relatedLinks: [
      {
        label: "Door Hanger",
        href: "/en/pages/door-hangers.html",
        description: "Gaming signs and hangers for desks, rooms and streaming setups."
      },
      {
        label: "Wooden coasters",
        href: "/en/pages/wooden-coasters.html",
        description: "The broader coaster page, including gaming and desk-ready themes."
      },
      {
        label: "Wooden gifts",
        href: "/en/pages/wooden-gifts.html",
        description: "The wider handmade gifts page for decor, keepsakes and smaller extras."
      }
    ]
  },
  {
    label: "Readers Kit",
    path: "/en/pages/readers-kit.html",
    pairPath: "/en/pages/reader-gifts.html",
    intro: "This Etsy section keeps the bundled reader gift separate from the individual bookmarks for shoppers who want one ready-made set.",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?search_query=reader%20gift",
    slugs: [
      "fantasy-reader-gift-set"
    ],
    relatedLinks: [
      {
        label: "Wooden bookmarks",
        href: "/en/pages/wooden-bookmarks.html",
        description: "The full bookmark collection for readers, fantasy fans and book gifts."
      },
      {
        label: "Reader gifts",
        href: "/en/pages/reader-gifts.html",
        description: "The broader gift-guide page for readers and cozy reading corners."
      },
      {
        label: "Candle Holders",
        href: "/en/pages/candle-holders.html",
        description: "Shelf accents that also fit reading nooks and quiet corners."
      }
    ]
  },
  {
    label: "Wedding",
    path: "/en/pages/wedding.html",
    pairPath: "/en/pages/wooden-gifts.html",
    intro: "This Etsy section gives the wedding cash holder its own focused page for newlywed gifting and milestone browsing.",
    ctaUrl: "https://www.etsy.com/shop/Craftygiftsplace?search_query=wedding",
    slugs: [
      "just-married-wedding-money-holder"
    ],
    relatedLinks: [
      {
        label: "Personalized Items",
        href: "/en/pages/personalized-items.html",
        description: "Custom-ready pieces where names, dates and personal wording matter most."
      },
      {
        label: "Door Hanger",
        href: "/en/pages/door-hangers.html",
        description: "Wooden signs and hangers for rooms, doors and milestone gifting."
      },
      {
        label: "Wooden gifts",
        href: "/en/pages/wooden-gifts.html",
        description: "The broader decor and keepsake category for related handmade gifts."
      }
    ]
  }
];

function buildEnglishSectionFeaturedItems(slugs, label) {
  const labelLower = label.toLowerCase();
  const summaries = [
    `A strong first click inside ${labelLower} when the shopper wants a clearly handmade option.`,
    `Another matched Etsy pick that keeps this section specific without changing the site structure.`,
    "A useful comparison point before opening Etsy for live pricing, reviews and checkout."
  ];

  return slugs.slice(0, 3).map((slug, index) => ({
    slug,
    summary: summaries[index] || summaries[summaries.length - 1]
  }));
}

function buildEnglishEtsySectionPage(config) {
  const labelLower = config.label.toLowerCase();
  const relatedLinks = config.relatedLinks || [];
  return {
    path: config.path,
    pairPath: config.pairPath || "/en/pages/wooden-gifts.html",
    alternatePaths: { en: config.path },
    template: "collection",
    locale: "en",
    title: `${config.label} | Craftygiftsplace`,
    metaDescription: config.metaDescription || `Browse ${labelLower} from Craftygiftsplace, then head to Etsy for live pricing, reviews and checkout.`,
    h1: config.h1 || config.label,
    eyebrow: "Etsy section",
    intro: config.intro,
    breadcrumbs: [
      { label: "Home", path: "/en/index.html" },
      { label: config.label, path: config.path }
    ],
    primaryCta: {
      label: config.primaryCtaLabel || `Open ${config.label} on Etsy`,
      url: config.ctaUrl
    },
    secondaryCta: {
      label: config.secondaryCtaLabel || `Browse ${config.label}`,
      target: "#shop-catalog"
    },
    linkCloud: relatedLinks.slice(0, 3).map((link) => ({
      label: link.label,
      target: link.href
    })),
    sidebar: {
      title: "See related pages",
      quote: "\"Great quality, exactly as described, and seller was kind and communicative! Excited to gift these.\"",
      attribution: "Caroline · Etsy review",
      text: config.sidebarText || `This page keeps the live ${config.label} section inside the existing English site structure without changing the layout, branding or Etsy checkout flow.`,
      links: relatedLinks.slice(0, 3).map((link) => ({
        label: link.label,
        href: link.href
      }))
    },
    featuredItems: buildEnglishSectionFeaturedItems(config.slugs, config.label),
    featuredWhy: [
      `It keeps the live Etsy ${labelLower} section browseable on the English site.`,
      "It uses the same page shell, product cards and CTA pattern as the rest of the catalog.",
      "It still sends shoppers to Etsy for live pricing, reviews and checkout."
    ],
    catalog: {
      mode: "slugs",
      slugs: config.slugs,
      intro: config.catalogIntro || `Matched English products currently aligned with the Etsy ${config.label} section.`,
      ctaLabel: config.catalogCtaLabel || `View ${config.label} on Etsy`,
      ctaUrl: config.ctaUrl
    },
    faq: [
      {
        question: `Does this page follow the Etsy ${config.label} section?`,
        answer: `Yes. This page mirrors the public Etsy ${config.label} section as closely as the current English catalog data allows.`
      },
      {
        question: "Do I still order on Etsy from here?",
        answer: "Yes. This site stays browse-first, then sends shoppers to Etsy for live pricing, reviews, personalization details and checkout."
      },
      {
        question: "Can I move back to broader category pages from here?",
        answer: "Yes. The related links keep the wider English collections and nearby sections easy to reach."
      }
    ],
    relatedLinks,
    ctaPanel: {
      title: `Ready to compare ${labelLower} on Etsy?`,
      text: "Open Etsy to review live prices, listing details and buyer feedback for this section.",
      label: config.catalogCtaLabel || `View ${config.label} on Etsy`,
      url: config.ctaUrl
    }
  };
}

pagesEn.push(...EN_ETSY_SECTION_PAGES.map(buildEnglishEtsySectionPage));

pagesEn.push({
  path: "/en/pages/personalization.html",
  alternatePaths: { en: "/en/pages/personalization.html" },
  template: "contact",
  locale: "en",
  title: "How Personalization Works | Craftygiftsplace",
  metaDescription: "Learn how to add a name, date or message to handmade wooden gifts from Craftygiftsplace — before and after ordering on Etsy.",
  h1: "How personalization works",
  eyebrow: "Customize your gift",
  intro: "Many items can be personalized with a name, date or short message. Here is what to expect, step by step.",
  breadcrumbs: [
    { label: "Home", path: "/en/index.html" },
    { label: "Personalization" }
  ],
  primaryCta: {
    label: "Open Craftygiftsplace on Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace"
  },
  secondaryCta: {
    label: "Message the shop on Etsy",
    targetUrl: "https://www.etsy.com/shop/Craftygiftsplace#about"
  },
  sidebar: {
    title: "Quick tip",
    quote: "\"The seller was incredibly helpful when I asked about personalizing the coasters for our wedding.\"",
    attribution: "Tanya · 5/5 on Etsy",
    text: "Message the shop before ordering and the seller will confirm exactly what is possible for your chosen piece.",
    links: [
      { label: "Open the Etsy shop", href: "https://www.etsy.com/shop/Craftygiftsplace" },
      { label: "Browse wooden coasters", href: "/en/pages/wooden-coasters.html" },
      { label: "Browse wooden bookmarks", href: "/en/pages/wooden-bookmarks.html" }
    ]
  },
  infoCards: [
    {
      title: "Which products can be personalized?",
      text: "Most coasters, bookmarks and keepsake pieces in the shop can be personalized. This includes adding a first name, a couple's names, a short date, or a brief message. The listing on Etsy will indicate what is available for each piece — and you can always message the seller to confirm before ordering."
    },
    {
      title: "Where do I enter personalization details?",
      text: "On the Etsy listing page, look for the 'Add your personalization' field in the order form. Enter your text there before adding to cart. If the field is not visible, message the seller first and they will guide you through the next step."
    },
    {
      title: "What can I personalize with?",
      items: [
        "A first name or pair of names (e.g. 'Emma' or 'Emma & James')",
        "A date (e.g. a wedding date, birthday or anniversary)",
        "A short message of up to two or three lines",
        "A pet name for memorial pieces",
        "A custom phrase for themed gifts"
      ]
    },
    {
      title: "Can I message before I order?",
      text: "Yes, and it is often the easiest way to get it right. Use the Etsy message function on the shop page to describe what you want. The seller replies quickly and will confirm the options, layout and any limits before you place the order."
    },
    {
      title: "What happens after I order?",
      text: "Once the order is placed with your personalization details, the seller begins making the piece to order. You will receive an Etsy notification when it ships. If anything needs clarifying, the seller will reach out through Etsy messages before starting production."
    },
    {
      title: "What if I make a mistake in my personalization?",
      text: "Contact the seller through Etsy as soon as possible after ordering. Because each piece is made individually, corrections are usually possible if caught early. The seller will confirm what can be adjusted and how."
    }
  ],
  faq: [
    {
      question: "Is personalization included in the price?",
      answer: "Personalization costs vary by product. Check the Etsy listing for pricing details — some pieces include it, others have a small addition. Messaging the seller first is the fastest way to confirm."
    },
    {
      question: "How long does a personalized order take?",
      answer: "Personalized pieces are made to order, so allow a few extra days beyond the standard processing time shown on Etsy. The listing will give an estimated dispatch window, and the seller can advise on rush orders."
    },
    {
      question: "Can I see a preview before the piece is made?",
      answer: "In many cases, yes. Message the seller with your personalization request and ask for a preview. This is especially useful for complex layouts or when exact positioning matters."
    }
  ],
  ctaPanel: {
    title: "Ready to personalize your gift?",
    text: "Head to Etsy to browse listings, check personalization options and message the seller.",
    label: "Open Craftygiftsplace on Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace"
  }
});

pagesEn.push({
  path: "/en/pages/why-wooden-gifts.html",
  alternatePaths: { en: "/en/pages/why-wooden-gifts.html" },
  template: "contact",
  locale: "en",
  title: "Why Wooden Gifts? Handmade, Lasting and Personal | Craftygiftsplace",
  metaDescription: "Handmade wooden gifts last longer, feel more personal and carry real craft. Find out why engraved wood makes a better gift than generic alternatives.",
  h1: "Why wooden gifts last longer than most",
  eyebrow: "The case for wood",
  intro: "Generic gifts get forgotten. Wooden gifts get kept. Here is why handmade, engraved wood works so well as a gift for almost any occasion.",
  breadcrumbs: [
    { label: "Home", path: "/en/index.html" },
    { label: "Why wooden gifts?" }
  ],
  primaryCta: {
    label: "Browse wooden gifts on Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace"
  },
  secondaryCta: {
    label: "See all collections",
    targetUrl: "/en/pages/wooden-gifts.html"
  },
  sidebar: {
    title: "What shoppers say",
    quote: "\"Wow, the craftsmanship on this is spectacular. It even smells like fresh wood.\"",
    attribution: "Alex · 5/5 on Etsy",
    text: "Rated 4.96/5 across hundreds of Etsy reviews. Shoppers consistently mention quality, detail and lasting finish.",
    links: [
      { label: "Wooden coasters", href: "/en/pages/wooden-coasters.html" },
      { label: "Wooden bookmarks", href: "/en/pages/wooden-bookmarks.html" },
      { label: "All wooden gifts", href: "/en/pages/wooden-gifts.html" }
    ]
  },
  infoCards: [
    {
      title: "Wood feels different in the hand",
      text: "There is a tactile quality to real wood that no printed card or plastic alternative can match. The weight, the grain, the slight warmth of the material — these things register before the recipient even reads the engraving. A wooden coaster or bookmark announces itself as something made, not ordered from a dropdown."
    },
    {
      title: "Engraving makes it permanent",
      text: "A name, a date, a short phrase cut into wood does not fade, peel or wash off. It is part of the piece. That permanence is what separates an engraved gift from one that gets quietly put in a drawer. Readers keep their bookmarks. Coasters stay on the coffee table. The gift becomes part of how the home looks."
    },
    {
      title: "It works for almost any occasion",
      text: "Housewarming gifts that go on the coffee table from day one. Reader gifts that live inside a favourite book. Cat lover pieces that sit on the shelf year-round. Wooden gifts are useful and decorative at the same time, which means they stay visible instead of getting packed away after the occasion."
    },
    {
      title: "Handmade means one person made it",
      text: "Each piece from this shop is made to order by one person with a laser engraver and a clear standard for finish. That is not marketing language — it means your order is not picked from a shelf. It is made after you place it, which is why personalization is possible and why the quality is consistent across reviews."
    },
    {
      title: "Good for readers, cat lovers, new homes and more",
      items: [
        "Readers: dragon eye, feather, Celtic and fantasy bookmarks that outlast the books they mark",
        "Cat lovers: Moon Cat tealight holders and cat-themed coasters for cozy shelves and home gifting",
        "New homes: engraved coaster sets that feel chosen rather than convenient",
        "Memorial moments: pet memorial plaques for a gift that acknowledges loss with real care",
        "Gamers and tech: upcycled RAM keychains and gaming door signs for desk setups"
      ]
    },
    {
      title: "The honest case for spending a little more",
      text: "A well-made wooden gift costs more than a card and less than most experiences. It lasts longer than flowers, takes up less space than a voucher and requires no batteries. For the occasions when generic will not do, it is usually the right call."
    }
  ],
  faq: [
    {
      question: "Are wooden gifts suitable for all ages?",
      answer: "Yes. Coasters, bookmarks and decorative pieces work for adults of any age. The range includes functional items for everyday use and keepsakes for milestone occasions. There are also baby milestone pieces in the shop for new-arrival gifting."
    },
    {
      question: "Do wooden gifts hold up over time?",
      answer: "Birch and similar hardwoods are durable and stable for indoor use. Engraved detail does not fade. Most coasters come with cork backing, which protects surfaces and adds to longevity. Reviewers consistently mention durability alongside the visual quality."
    },
    {
      question: "Can wooden gifts be personalized for any occasion?",
      answer: "Many pieces can be personalized with a name, date or short message. This makes them suitable for birthdays, anniversaries, housewarmings, weddings and memorial gifts. See the personalization page for full details on how it works."
    }
  ],
  ctaPanel: {
    title: "Ready to find the right wooden gift?",
    text: "Browse the full collection on Etsy — coasters, bookmarks, keepsakes and more.",
    label: "Open Craftygiftsplace on Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace"
  }
});

pagesNl.push({
  path: "/pages/waarom-houten-cadeaus.html",
  template: "contact",
  locale: "nl",
  title: "Waarom houten cadeaus? Handgemaakt, duurzaam en persoonlijk | Craftygiftsplace",
  metaDescription: "Handgemaakte houten cadeaus gaan langer mee, voelen persoonlijker aan en dragen echte vakmanschap. Ontdek waarom gegraveerd hout een beter cadeau is dan generieke alternatieven.",
  h1: "Waarom houten cadeaus langer meegaan dan de meeste andere",
  eyebrow: "Het argument voor hout",
  intro: "Generieke cadeaus worden vergeten. Houten cadeaus worden bewaard. Dit is waarom handgemaakt, gegraveerd hout zo goed werkt voor bijna elke gelegenheid.",
  breadcrumbs: [
    { label: "Home", path: "/index.html" },
    { label: "Waarom houten cadeaus?" }
  ],
  primaryCta: {
    label: "Houten cadeaus bekijken op Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace"
  },
  secondaryCta: {
    label: "Alle collecties bekijken",
    targetUrl: "/pages/houten-cadeaus.html"
  },
  sidebar: {
    title: "Wat kopers zeggen",
    quote: "\"Wow, het vakmanschap is spectaculair. Het ruikt zelfs naar vers hout.\"",
    attribution: "Alex · 5/5 op Etsy",
    text: "Beoordeeld met 4,96/5 in honderden Etsy-beoordelingen. Kopers noemen steeds kwaliteit, detail en duurzame afwerking.",
    links: [
      { label: "Houten onderzetters", href: "/pages/onderzetters.html" },
      { label: "Houten bladwijzers", href: "/pages/bladwijzers.html" },
      { label: "Alle houten cadeaus", href: "/pages/houten-cadeaus.html" }
    ]
  },
  infoCards: [
    {
      title: "Hout voelt anders aan",
      text: "Echt hout heeft een tactiele kwaliteit die geen gedrukte kaart of plastic alternatief kan evenaren. Het gewicht, de nerf, de lichte warmte van het materiaal — dat alles merk je voordat de ontvanger de gravure leest. Een houten onderzetter of bladwijzer kondigt zichzelf aan als iets dat gemaakt is, niet besteld via een dropdown."
    },
    {
      title: "Gravure maakt het permanent",
      text: "Een naam, een datum, een korte zin gegraveerd in hout vervaagt niet, schilfert niet af en wast niet weg. Het maakt deel uit van het stuk. Die duurzaamheid onderscheidt een gegraveerd cadeau van een dat stilletjes in een lade belandt. Lezers bewaren hun bladwijzers. Onderzetters blijven op de salontafel."
    },
    {
      title: "Het werkt voor bijna elke gelegenheid",
      text: "Verhuiscadeaus die vanaf dag één op de salontafel staan. Lezercadeaus die in een favoriete boek leven. Kattenliefhebberstukken die het hele jaar op de plank staan. Houten cadeaus zijn zowel functioneel als decoratief, waardoor ze zichtbaar blijven in plaats van na de gelegenheid te worden opgeborgen."
    },
    {
      title: "Handgemaakt betekent: één persoon heeft het gemaakt",
      text: "Elk stuk uit deze shop wordt op bestelling gemaakt door één persoon met een lasergraveermachine en een duidelijke kwaliteitsstandaard. Dat is geen marketingtaal — het betekent dat jouw bestelling niet van een plank wordt gepakt. Ze wordt gemaakt nadat je hem hebt geplaatst."
    },
    {
      title: "Ideaal voor lezers, kattenliefhebbers, nieuwe huizen en meer",
      items: [
        "Lezers: drakenog-, veer-, Keltische en fantasy-bladwijzers die langer meegaan dan de boeken die ze markeren",
        "Kattenliefhebbers: Moon Cat-waxinehouders en onderzetters met kattenmotief voor gezellige planken",
        "Nieuwe huizen: gegraveerde onderzettersets die gekozen aanvoelen, niet handig",
        "Herdenkingsmomenten: huisdiergedenkplaquettes voor een cadeau dat verlies erkent met echte zorg",
        "Gamers en tech: gerecyclede RAM-sleutelhangers en gaming-deurhangers voor bureauopstellingen"
      ]
    },
    {
      title: "Het eerlijke argument om iets meer uit te geven",
      text: "Een goed gemaakt houten cadeau kost meer dan een kaart en minder dan de meeste ervaringen. Het gaat langer mee dan bloemen, neemt minder ruimte in dan een cadeaubon en heeft geen batterijen nodig. Voor de gelegenheden waarbij generiek niet volstaat, is het doorgaans de juiste keuze."
    }
  ],
  faq: [
    {
      question: "Zijn houten cadeaus geschikt voor alle leeftijden?",
      answer: "Ja. Onderzetters, bladwijzers en decoratieve stukken werken voor volwassenen van elke leeftijd. Het assortiment omvat functionele artikelen voor dagelijks gebruik en aandenken voor bijzondere momenten. De shop heeft ook baby-mijlpaalpakketjes voor nieuwe aankomsten."
    },
    {
      question: "Gaan houten cadeaus lang mee?",
      answer: "Berk en vergelijkbare houtsoorten zijn duurzaam en stabiel voor binnengebruik. Gegraveerde details vervagen niet. De meeste onderzetters hebben een kurk achterkant die oppervlakken beschermt. Kopers noemen regelmatig duurzaamheid naast de visuele kwaliteit."
    },
    {
      question: "Kunnen houten cadeaus voor elke gelegenheid worden gepersonaliseerd?",
      answer: "Veel stukken kunnen worden gepersonaliseerd met een naam, datum of kort bericht. Dit maakt ze geschikt voor verjaardagen, jubilea, verhuizingen, bruiloften en herdenkingscadeaus. Zie de personalisatiepagina voor alle details."
    }
  ],
  ctaPanel: {
    title: "Klaar om het juiste houten cadeau te vinden?",
    text: "Bekijk de volledige collectie op Etsy — onderzetters, bladwijzers, aandenken en meer.",
    label: "Craftygiftsplace op Etsy openen",
    url: "https://www.etsy.com/shop/Craftygiftsplace"
  },
  alternatePaths: { en: "/pages/waarom-houten-cadeaus.html" }
});

pagesNl.push({
  path: "/pages/personalisatie.html",
  template: "contact",
  locale: "nl",
  title: "Hoe personalisatie werkt | Craftygiftsplace",
  metaDescription: "Ontdek hoe je een naam, datum of bericht kunt toevoegen aan handgemaakte houten cadeaus van Craftygiftsplace — voor en na de bestelling op Etsy.",
  h1: "Hoe personalisatie werkt",
  eyebrow: "Jouw cadeau aanpassen",
  intro: "Veel artikelen kunnen worden gepersonaliseerd met een naam, datum of kort bericht. Hier lees je wat je kunt verwachten, stap voor stap.",
  breadcrumbs: [
    { label: "Home", path: "/index.html" },
    { label: "Personalisatie" }
  ],
  primaryCta: {
    label: "Craftygiftsplace op Etsy openen",
    url: "https://www.etsy.com/shop/Craftygiftsplace"
  },
  secondaryCta: {
    label: "Contact via Etsy",
    targetUrl: "https://www.etsy.com/shop/Craftygiftsplace#about"
  },
  sidebar: {
    title: "Snelle tip",
    quote: "\"De verkoper was ontzettend behulpzaam toen ik vroeg naar personalisatieopties.\"",
    attribution: "Tanya · 5/5 op Etsy",
    text: "Stuur de shop een bericht vóór je bestelt en de verkoper bevestigt precies wat mogelijk is voor jouw gekozen stuk.",
    links: [
      { label: "Etsy-shop openen", href: "https://www.etsy.com/shop/Craftygiftsplace" },
      { label: "Houten onderzetters bekijken", href: "/pages/onderzetters.html" },
      { label: "Houten bladwijzers bekijken", href: "/pages/bladwijzers.html" }
    ]
  },
  infoCards: [
    {
      title: "Welke artikelen kunnen worden gepersonaliseerd?",
      text: "De meeste onderzetters, bladwijzers en herinneringen in de shop kunnen worden gepersonaliseerd. Dit omvat het toevoegen van een voornaam, namen van een koppel, een korte datum of een kort bericht. De Etsy-listing geeft aan wat beschikbaar is voor elk stuk — en je kunt altijd een bericht sturen voor de bestelling."
    },
    {
      title: "Waar voer ik de personalisatiedetails in?",
      text: "Zoek op de Etsy-listingpagina naar het veld 'Voeg personalisatie toe'. Voer je tekst in voordat je aan het winkelwagentje toevoegt. Als het veld niet zichtbaar is, stuur dan eerst een bericht naar de verkoper."
    },
    {
      title: "Wat kan ik personaliseren?",
      items: [
        "Een voornaam of namen van een koppel (bijv. 'Emma' of 'Emma & James')",
        "Een datum (bijv. trouwdatum, verjaardag of jubileum)",
        "Een kort bericht van twee of drie regels",
        "Een huisdiernaam voor gedenkstukken",
        "Een eigen zin voor thematische cadeaus"
      ]
    },
    {
      title: "Kan ik vóór de bestelling een bericht sturen?",
      text: "Ja, en dat is vaak de makkelijkste manier om het goed te doen. Gebruik de Etsy-berichtfunctie om te beschrijven wat je wilt. De verkoper reageert snel en bevestigt opties voor je bestelt."
    },
    {
      title: "Wat gebeurt er na de bestelling?",
      text: "Zodra de bestelling is geplaatst met jouw personalisatiedetails, begint de verkoper met de vervaardiging. Je ontvangt een Etsy-melding bij verzending. Als iets verduidelijkt moet worden, neemt de verkoper via Etsy contact op."
    },
    {
      title: "Wat als ik een fout heb gemaakt in de personalisatie?",
      text: "Neem zo snel mogelijk contact op met de verkoper via Etsy. Omdat elk stuk individueel wordt gemaakt, zijn correcties doorgaans mogelijk als ze tijdig worden gemeld."
    }
  ],
  faq: [
    {
      question: "Is personalisatie inbegrepen in de prijs?",
      answer: "De kosten variëren per product. Bekijk de Etsy-listing voor details — sommige stukken hebben het inbegrepen, andere hebben een kleine toeslag. Een bericht sturen naar de verkoper is de snelste manier om dit te bevestigen."
    },
    {
      question: "Hoe lang duurt een gepersonaliseerde bestelling?",
      answer: "Gepersonaliseerde stukken worden op bestelling gemaakt. Reken op een paar extra dagen bovenop de verwerkingstijd op Etsy. De verkoper kan ook adviseren over spoedbestellingen."
    },
    {
      question: "Kan ik een voorbeeld zien voor het stuk wordt gemaakt?",
      answer: "In veel gevallen wel. Stuur de verkoper een bericht met jouw personalisatiedetails en vraag om een voorbeeld — vooral handig voor complexe lay-outs."
    }
  ],
  ctaPanel: {
    title: "Klaar om jouw cadeau te personaliseren?",
    text: "Ga naar Etsy om listings te bekijken, personalisatieopties te checken en een bericht te sturen.",
    label: "Craftygiftsplace op Etsy openen",
    url: "https://www.etsy.com/shop/Craftygiftsplace"
  },
  alternatePaths: { en: "/pages/personalisatie.html" }
});

module.exports = {
  pagesEn,
  pagesNl
};
