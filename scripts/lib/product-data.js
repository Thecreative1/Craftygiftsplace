const { readJson, unique } = require("./site");

const CATEGORY_MAP = {
  onderzetters: "coasters",
  bladwijzers: "bookmarks",
  "houten-cadeaus": "wooden-gifts"
};

  const DUTCH_NAME_OVERRIDES = {
  "bee-motif-wooden-coasters": "Bijenmotief houten onderzetters",
  "personalised-team-wooden-coasters": "Gepersonaliseerde teamonderzetters",
  "hand-painted-spiderweb-wooden-coasters": "Handbeschilderde spinnenweb houten onderzetters",
  "skull-tealight-holder": "Schedel theelichthouder",
  "checkers-wooden-coasters": "Dam houten onderzetters",
  "cricket-dad-coaster": "Cricket papa houten onderzetters",
  "dartboard-wooden-coasters": "Dartbord houten onderzetters",
  "bitcoin-wooden-coasters": "Bitcoin houten onderzetters",
  "buddha-wood-wooden-coasters": "Boeddha, OM en lotus houten onderzetters",
  "hand-painted-wiccan-symbol-wooden-coasters": "Handbeschilderde wicca-symbool houten onderzetters",
  "mushroom-moon-wooden-coasters": "Paddenstoel en maan houten onderzetters",
  "sports-ball-wooden-coasters": "Sportbal houten onderzetters",
  "sun-and-moon-wooden-coasters": "Zon en maan houten onderzetters",
  "tree-of-life-wooden-coasters": "Levensboom houten onderzetters",
  "fantasy-sword-wooden-bookmark": "Fantasiezwaard houten bladwijzer",
  "tabletop-adventure-coaster-set": "Tafelspel-avontuur houten onderzetters",
  "rocket-wooden-bookmark": "Raket houten bladwijzer",
  "1984-inspired-wooden-bookmark": "1984-geinspireerde houten bladwijzer",
  "fishing-wooden-coasters": "Vis-thema houten onderzetters",
  "witch-symbols-wooden-bookmark": "Hekssymbolen houten bladwijzer",
  "classic-wooden-bookmark": "Klassieke houten bladwijzer",
  "personalized-feather-wooden-bookmark": "Gepersonaliseerde houten bladwijzer met veer",
  "celestial-cat-wooden-coasters": "Hemelse kat houten onderzetters",
  "spanish-guitar-wooden-bookmark": "Spaanse gitaar houten bladwijzer",
  "hunting-life-wooden-coasters": "Jachtthema houten onderzetters",
  "upcycled-ram-keychain": "Upcyclede RAM-sleutelhanger",
    "fantasy-reader-gift-set": "Cadeauset voor fantasylezers",
    "laser-birch-wood-incense-burner": "Berkenhouten wierookhouder",
    "birch-wood-circle-blanks": "Berkenhouten cirkels",
    "moon-cat-shadow-tealight-holder": "Theelichthouder met maan en kat",
    "personalized-just-married-wooden-door-hanger": "Gepersonaliseerde deurhanger voor pasgetrouwden",
    "just-married-wedding-money-holder": "Trouwgeldhouder voor pasgetrouwden"
  };

const GERMAN_NAME_OVERRIDES = {
  "1984-inspired-wooden-bookmark": "Von 1984 inspiriertes Holzlesezeichen",
  "bee-motif-wooden-coasters": "Bienenmotiv Holzuntersetzer",
  "cat-and-moon-wooden-coasters": "Katze und Mond Holzuntersetzer",
  "cat-wooden-coasters": "Katzenmotiv Holzuntersetzer",
  "celestial-cat-wooden-coasters": "Himmlische Katzen Holzuntersetzer",
  "celtic-wooden-bookmark": "Keltisches Holzlesezeichen",
  "classic-wooden-bookmark": "Klassisches Holzlesezeichen",
  "do-not-ring-door-sign": "Bitte nicht klingeln Türschild",
  "dog-paw-wooden-coasters": "Hundepfoten Holzuntersetzer",
  "dragon-eye-wooden-bookmark": "Drachenauge Holzlesezeichen",
  "dragon-wooden-bookmark": "Drachen Holzlesezeichen",
  "epic-fantasy-door-sign": "Fantasy-Türschild",
    "epic-fantasy-wooden-bookmark": "Episches Fantasy-Holzlesezeichen",
    "fantasy-reader-gift-set": "Fantasy-Leserset",
    "fantasy-sword-wooden-bookmark": "Fantasy-Schwert Holzlesezeichen",
    "fantasy-wooden-coasters": "Fantasy Holzuntersetzer",
  "bitcoin-wooden-coasters": "Bitcoin-Holzuntersetzer",
  "buddha-wood-wooden-coasters": "Buddha-, OM- und Lotus-Holzuntersetzer",
  "dartboard-wooden-coasters": "Dartscheiben-Holzuntersetzer",
  "floral-wooden-coasters": "Blumenmotiv Holzuntersetzer",
  "forest-animal-wooden-coasters": "Waldtiere Holzuntersetzer",
  "funny-husband-medal-wooden-coasters": "Holzuntersetzer mit lustiger Ehemann-Medaille",
  "hand-painted-wiccan-symbol-wooden-coasters": "Handbemalte Wicca-Symbol-Holzuntersetzer",
  "laser-birch-wood-incense-burner": "Räucherhalter aus Birkenholz",
  "leaf-wooden-coasters": "Blattmotiv Holzuntersetzer",
  "lighthouse-wooden-bookmark": "Leuchtturm Holzlesezeichen",
    "moon-cat-shadow-tealight-holder": "Teelichthalter mit Mondkatze",
    "mushroom-moon-wooden-coasters": "Pilz und Mond Holzuntersetzer",
    "personalized-feather-wooden-bookmark": "Personalisiertes Holzlesezeichen mit Feder",
    "personalized-just-married-wooden-door-hanger": "Personalisierter Türhänger für Frischvermählte",
    "just-married-wedding-money-holder": "Geldgeschenkhalter zur Hochzeit",
    "personalized-pet-memorial-plaque": "Personalisierte Haustier-Gedenkplakette",
  "picasso-animal-line-art-wooden-coasters": "Picasso Tier Line Art Holzuntersetzer",
  "sports-ball-wooden-coasters": "Holzuntersetzer mit Sportball-Motiven",
  "viking-wooden-coasters": "Wikinger-Holzuntersetzer",
  "sun-and-moon-wooden-coasters": "Sonne und Mond Holzuntersetzer",
  "tree-of-life-wooden-coasters": "Lebensbaum Holzuntersetzer",
  "zodiac-wooden-coasters": "Sternzeichen Holzuntersetzer"
};

const ETSY_URL_OVERRIDES = {
  "epic-fantasy-door-sign": "https://www.etsy.com/shop/Craftygiftsplace?search_query=epic%20fantasy%20door%20sign"
};

const SPECIAL_SHORT_DESCRIPTIONS = {
  "fantasy-reader-gift-set": {
    en: "A ready-made gift set with a bookmark, door hanger and coasters for fantasy readers.",
    nl: "Een kant-en-klare cadeauset met bladwijzer, deurhanger en onderzetters voor fantasylezers.",
    de: "Ein komplettes Set mit Lesezeichen, Türschild und Untersetzern für Fantasy-Leser.",
    fr: "Un coffret prêt à offrir avec marque-page, suspension de porte et sous-verres pour lecteurs de fantasy.",
    es: "Un set listo para regalar con marcapáginas, colgador de puerta y posavasos para lectores de fantasía.",
    pt: "Um conjunto pronto a oferecer com marcador, pendente de porta e porta-copos para leitores de fantasia.",
    it: "Un set pronto da regalare con segnalibro, targhetta da porta e sottobicchieri per lettori fantasy."
  }
};

const LABELS = {
  en: {
    audience: {
      "cat-lovers": "cat lovers",
      "dog-lovers": "dog lovers",
      readers: "readers",
      "book-lovers": "book lovers",
      "fantasy-readers": "fantasy readers",
      gamers: "gamers",
      newlyweds: "newlyweds",
      "new-parents": "new parents",
      "cozy-homeowners": "cozy home lovers",
      "alternative-decor-fans": "alternative decor fans",
      crafters: "crafters",
      "gift-shoppers": "gift shoppers"
    },
    occasion: {
      housewarming: "housewarming",
      birthday: "birthday",
      "reader-gift": "gift for readers",
      wedding: "wedding",
      anniversary: "anniversary",
      christmas: "Christmas",
      "new-baby": "new baby",
      "everyday-gift": "everyday gifting",
      memorial: "memorial",
      "hobby-gift": "hobby gifting"
    },
    style: {
      cozy: "cozy",
      celestial: "celestial",
      fantasy: "fantasy",
      botanical: "botanical",
      playful: "playful",
      personalized: "personalized",
      gothic: "gothic",
      rustic: "rustic",
      minimal: "minimal",
      alternative: "alternative",
      "faith-inspired": "faith-inspired",
      seasonal: "seasonal",
      coastal: "coastal"
    },
    intent: {
      "cat-lover-gift": "cat lover gift",
      "reader-gift": "reader gift",
      "book-lover-gift": "book lover gift",
      "fantasy-reader-gift": "fantasy reader gift",
      "bookmark-gift": "bookmark gift",
      "reading-nook-gift": "reading nook gift",
      "housewarming-gift": "housewarming gift",
      "cozy-home-decor": "cozy home decor",
      "personalized-wedding-gift": "personalized wedding gift"
    },
    chip: {
      "cat-lovers": "Cat lover gift",
      "dog-lovers": "Dog lover gift",
      readers: "Gift for readers",
      "book-lovers": "Book lover gift",
      "fantasy-readers": "Fantasy reader gift",
      gamers: "Gamer gift",
      newlyweds: "Gift for newlyweds",
      "new-parents": "New baby",
      "cozy-homeowners": "Cozy home gift",
      "alternative-decor-fans": "Bold decor",
      crafters: "DIY gift",
      housewarming: "Housewarming gift",
      wedding: "Wedding gift",
      anniversary: "Anniversary keepsake",
      christmas: "Seasonal decor",
      memorial: "Memorial keepsake",
      personalized: "Personalized gift",
      cozy: "Cozy style",
      celestial: "Celestial design",
      fantasy: "Fantasy design",
      botanical: "Nature theme",
      playful: "Playful theme",
      gothic: "Gothic decor",
      coastal: "Home styling",
      seasonal: "Seasonal decor"
    },
    format: {
      coasters: "coaster set",
      bookmarks: "bookmark",
      "door-hanger": "door hanger",
      "decor-piece": "decor piece",
      keepsake: "keepsake gift",
      craft: "DIY wood set",
      plaque: "wooden plaque",
      "small-gift": "small wooden gift"
    },
    benefitPrimary: {
      coasters: "protects tables",
      bookmarks: "keeps the page easy to find",
      "door-hanger": "personalizes the room",
      "decor-piece": "adds atmosphere to shelves and tables",
      keepsake: "marks a milestone in a practical way",
      craft: "gives makers a ready-to-finish wood base",
      plaque: "turns a memory into something displayable",
      "small-gift": "adds a small handmade touch"
    },
    benefitSecondary: {
      coasters: "adds themed decor",
      bookmarks: "makes a book gift feel more personal",
      "door-hanger": "sets a playful tone before someone enters",
      "decor-piece": "layers in a warm themed accent",
      keepsake: "makes the moment easier to keep and revisit",
      craft: "keeps craft ideas giftable and easy to start",
      plaque: "adds a thoughtful keepsake finish",
      "small-gift": "feels easy to gift or add to a bundle"
    },
    motif: {
      cat: "cat-led engraving",
      dog: "paw-print detail",
      celestial: "celestial linework",
      fantasy: "fantasy artwork",
      gaming: "game-night motif",
      botanical: "botanical detail",
      coastal: "coastal detail",
      faith: "faith-inspired detail",
      gothic: "gothic detail",
      seasonal: "seasonal motif",
      wedding: "milestone detail",
      baby: "keepsake-ready wording",
      craft: "unfinished wood ready for making",
      memorial: "memory-focused wording",
      default: "warm engraved detail"
    },
    usage: {
      coasters: {
        cat: "coffee tables, desks and cozy corners",
        dog: "everyday tables and pet-friendly spaces",
        celestial: "coffee tables, side tables and mood-lit rooms",
        fantasy: "reading nooks, desks and hobby spaces",
        gaming: "game rooms, desks and weekend tables",
        botanical: "kitchens, guest tables and warm interiors",
        coastal: "guest rooms, patios and relaxed homes",
        gothic: "side tables, shelves and darker decor schemes",
        default: "daily tables, desks and easy gift bundles"
      },
      bookmarks: {
        fantasy: "book stacks, evening reading and fantasy shelves",
        celestial: "reading journals, nightstands and cozy chapters",
        botanical: "book gifts, tote bags and quiet reading time",
        gothic: "dark academia shelves and dramatic reading corners",
        default: "book stacks, reading journals and thoughtful gift boxes"
      },
      "door-hanger": {
        fantasy: "reading nooks, hobby rooms and bedroom doors",
        gaming: "game rooms, streaming setups and desks",
        wedding: "entryways, wedding corners and shared spaces",
        default: "bedroom doors, home offices and personalized corners"
      },
      "decor-piece": {
        cat: "shelves, side tables and candlelit corners",
        celestial: "nightstands, consoles and warm evening setups",
        gothic: "shelves, sideboards and atmospheric corners",
        default: "shelves, side tables and cozy corners"
      },
      keepsake: {
        wedding: "gift boxes, memory shelves and milestone tables",
        baby: "nursery shelves, drawers and milestone photos",
        memorial: "memory corners and meaningful shelves",
        default: "gift boxes, shelves and meaningful keepsake moments"
      },
      craft: {
        default: "craft tables, personalized projects and handmade gift sessions"
      },
      plaque: {
        memorial: "memory corners, desks and quiet tribute spaces",
        default: "shelves, side tables and keepsake spots"
      },
      "small-gift": {
        default: "desk drawers, gift bundles and practical everyday setups"
      }
    },
    ctaPrefix: "View",
    brandSuffix: "by Craftygiftsplace"
  },
  nl: {
    audience: {
      "cat-lovers": "kattenliefhebbers",
      "dog-lovers": "hondenliefhebbers",
      readers: "lezers",
      "book-lovers": "boekenliefhebbers",
      "fantasy-readers": "fantasylezers",
      gamers: "gamers",
      newlyweds: "pasgetrouwden",
      "new-parents": "nieuwe ouders",
      "cozy-homeowners": "liefhebbers van knusse interieurs",
      "alternative-decor-fans": "liefhebbers van alternatieve decoratie",
      crafters: "creatievelingen",
      "gift-shoppers": "cadeauzoekers"
    },
    occasion: {
      housewarming: "verhuiscadeau",
      birthday: "verjaardag",
      "reader-gift": "cadeau voor lezers",
      wedding: "bruiloft",
      anniversary: "jubileum",
      christmas: "kerst",
      "new-baby": "nieuwe baby",
      "everyday-gift": "klein cadeau",
      memorial: "herinneringscadeau",
      "hobby-gift": "hobbycadeau"
    },
    style: {
      cozy: "gezellig",
      celestial: "hemels",
      fantasy: "fantasy",
      botanical: "botanisch",
      playful: "speels",
      personalized: "persoonlijk",
      gothic: "gotisch",
      rustic: "rustiek",
      minimal: "rustig",
      alternative: "alternatief",
      "faith-inspired": "spiritueel",
      seasonal: "seizoensgebonden",
      coastal: "kuststijl"
    },
    intent: {
      "cat-lover-gift": "cadeau voor kattenliefhebbers",
      "reader-gift": "lezerscadeau",
      "book-lover-gift": "cadeau voor boekenliefhebbers",
      "fantasy-reader-gift": "fantasy lezerscadeau",
      "bookmark-gift": "bladwijzercadeau",
      "reading-nook-gift": "cadeau voor een leeshoek",
      "housewarming-gift": "verhuiscadeau",
      "cozy-home-decor": "gezellige woondecoratie",
      "personalized-wedding-gift": "gepersonaliseerd huwelijkscadeau"
    },
    chip: {
      "cat-lovers": "Cadeau voor kattenliefhebbers",
      "dog-lovers": "Cadeau voor hondenliefhebbers",
      readers: "Cadeau voor lezers",
      "book-lovers": "Cadeau voor boekenliefhebbers",
      "fantasy-readers": "Fantasycadeau",
      gamers: "Gamercadeau",
      newlyweds: "Cadeau voor pasgetrouwden",
      "new-parents": "Nieuwe baby",
      "cozy-homeowners": "Gezellig wooncadeau",
      "alternative-decor-fans": "Karaktervol decor",
      crafters: "DIY-cadeau",
      housewarming: "Verhuiscadeau",
      wedding: "Bruiloftscadeau",
      anniversary: "Herinneringscadeau",
      christmas: "Seizoensdecoratie",
      memorial: "Herinneringscadeau",
      personalized: "Gepersonaliseerd cadeau",
      cozy: "Warme stijl",
      celestial: "Hemels ontwerp",
      fantasy: "Fantasy decor",
      botanical: "Natuurthema",
      playful: "Speels thema",
      gothic: "Gotische sfeer",
      coastal: "Woondecoratie",
      seasonal: "Seizoensdecoratie"
    },
    format: {
      coasters: "onderzetterset",
      bookmarks: "bladwijzer",
      "door-hanger": "deurhanger",
      "decor-piece": "decorstuk",
      keepsake: "herinneringscadeau",
      craft: "houten DIY-set",
      plaque: "houten plaquette",
      "small-gift": "klein houten cadeau"
    },
    benefitPrimary: {
      coasters: "beschermt tafels",
      bookmarks: "houdt je pagina makkelijk terugvindbaar",
      "door-hanger": "geeft een kamer meer eigen karakter",
      "decor-piece": "brengt sfeer naar planken en tafels",
      keepsake: "markeert een mijlpaal op een bruikbare manier",
      craft: "geeft makers een houten basis om af te werken",
      plaque: "maakt een herinnering zichtbaar",
      "small-gift": "voegt een klein handgemaakt detail toe"
    },
    benefitSecondary: {
      coasters: "voegt thematische decoratie toe",
      bookmarks: "maakt een boekcadeau persoonlijker",
      "door-hanger": "zet meteen de juiste toon voor de ruimte",
      "decor-piece": "legt een warm thematisch accent neer",
      keepsake: "maakt het moment makkelijker om te bewaren",
      craft: "houdt creatieve ideeën makkelijk en cadeauwaardig",
      plaque: "geeft een aandachtige bewaarafwerking",
      "small-gift": "werkt vlot als los cadeau of extraatje"
    },
    motif: {
      cat: "een kattenmotief",
      dog: "een pootdetail",
      celestial: "hemelse lijntekening",
      fantasy: "fantasydetail",
      gaming: "een spelthema",
      botanical: "een botanisch detail",
      coastal: "een kustdetail",
      faith: "een spiritueel detail",
      gothic: "een gotisch detail",
      seasonal: "een seizoensmotief",
      wedding: "een mijlpaaldetail",
      baby: "een bewaarmoment-detail",
      craft: "onbewerkt hout om zelf af te werken",
      memorial: "een herinneringsdetail",
      default: "een warme gravure"
    },
      usage: {
      coasters: {
        cat: "salontafels, bureaus en knusse hoekjes",
        dog: "dagelijkse tafels en huiselijke plekken",
        celestial: "salontafels, bijzettafels en sfeervolle kamers",
        fantasy: "leeshoeken, bureaus en hobbykamers",
        gaming: "spelkamers, bureaus en weekendtafels",
        botanical: "keukentafels, gastentafels en warme interieurs",
        coastal: "logeerkamers, terrassen en ontspannen huizen",
        gothic: "bijzettafels, planken en uitgesproken interieurs",
        default: "dagelijkse tafels, bureaus en gezellige hoekjes"
      },
      bookmarks: {
        fantasy: "boekenstapels, fantasyboeken en avondlezen",
        celestial: "leesjournalen, nachtkastjes en rustige leesuren",
        botanical: "boekcadeaus, tassen en stille leesmomenten",
        gothic: "dark academia planken en uitgesproken leeshoeken",
        default: "boekenstapels, leesjournalen en doordachte cadeaupakketjes"
      },
      "door-hanger": {
        fantasy: "leeshoeken, hobbykamers en slaapkamerdeuren",
        gaming: "spelkamers, streaminghoeken en bureaus",
        wedding: "entrees, trouwhoeken en gedeelde ruimtes",
        default: "slaapkamerdeuren, thuiskantoren en persoonlijke hoekjes"
      },
      "decor-piece": {
        cat: "planken, bijzettafels en kaarsverlichte hoekjes",
        celestial: "nachtkastjes, consoles en warme avondopstellingen",
        gothic: "planken, sideboards en sfeervolle hoekjes",
        default: "planken, bijzettafels en gezellige hoekjes"
      },
      keepsake: {
        wedding: "cadeaudozen, herinneringsplanken en mijlpaaltafels",
        baby: "kinderkamerplanken, lades en mijlpaalfoto's",
        memorial: "herinneringshoekjes en betekenisvolle planken",
        default: "cadeaudozen, planken en betekenisvolle bewaarplekken"
      },
      craft: {
        default: "knutseltafels, persoonlijke projecten en handgemaakte cadeaumomenten"
      },
      plaque: {
        memorial: "herinneringshoekjes, bureaus en rustige bewaarplekken",
        default: "planken, bijzettafels en bewaarmomenten"
      },
      "small-gift": {
        default: "bureaulades, cadeaupakketten en dagelijkse plekken"
      }
    },
    ctaPrefix: "Bekijk",
    brandSuffix: "van Craftygiftsplace"
  },
  de: {
    audience: {
      "cat-lovers": "Katzenliebhaber",
      "dog-lovers": "Hundeliebhaber",
      readers: "Leser",
      "book-lovers": "Bücherliebhaber",
      "fantasy-readers": "Fantasy-Leser",
      gamers: "Gamer",
      newlyweds: "Frischvermählte",
      "new-parents": "frische Eltern",
      "cozy-homeowners": "Liebhaber gemütlicher Wohnräume",
      "alternative-decor-fans": "Fans auffälliger Deko",
      crafters: "Kreative",
      "gift-shoppers": "Geschenkkäufer"
    },
    occasion: {
      housewarming: "Einzug",
      birthday: "Geburtstag",
      "reader-gift": "Geschenk für Leser",
      wedding: "Hochzeit",
      anniversary: "Jubiläum",
      christmas: "Weihnachten",
      "new-baby": "neues Baby",
      "everyday-gift": "kleines Alltagsgeschenk",
      memorial: "Erinnerungsgeschenk",
      "hobby-gift": "Hobbygeschenk"
    },
    style: {
      cozy: "gemütlich",
      celestial: "himmlisch",
      fantasy: "fantasy",
      botanical: "botanisch",
      playful: "verspielt",
      personalized: "personalisiert",
      gothic: "gotisch",
      rustic: "rustikal",
      minimal: "ruhig",
      alternative: "alternativ",
      "faith-inspired": "spirituell",
      seasonal: "saisonal",
      coastal: "Küstenstil"
    },
    intent: {
      "cat-lover-gift": "Geschenk für Katzenliebhaber",
      "reader-gift": "Geschenk für Leser",
      "book-lover-gift": "Geschenk für Bücherfans",
      "fantasy-reader-gift": "Fantasy Geschenk für Leser",
      "bookmark-gift": "Lesezeichengeschenk",
      "reading-nook-gift": "Geschenk für die Leseecke",
      "housewarming-gift": "Einzugsgeschenk",
      "cozy-home-decor": "gemütliche Wohndeko",
      "personalized-wedding-gift": "personalisiertes Hochzeitsgeschenk"
    },
    chip: {
      "cat-lovers": "Geschenk für Katzenliebhaber",
      "dog-lovers": "Geschenk für Hundeliebhaber",
      readers: "Geschenk für Leser",
      "book-lovers": "Geschenk für Bücherfans",
      "fantasy-readers": "Fantasy-Geschenk",
      gamers: "Gamergeschenk",
      newlyweds: "Geschenk für Frischvermählte",
      "new-parents": "Neues Baby",
      "cozy-homeowners": "Geschenk fürs Zuhause",
      "alternative-decor-fans": "Markante Deko",
      crafters: "DIY-Geschenk",
      housewarming: "Geschenk zum Einzug",
      wedding: "Hochzeitsgeschenk",
      anniversary: "Erinnerungsgeschenk",
      christmas: "Saisonale Deko",
      memorial: "Erinnerungsgeschenk",
      personalized: "Personalisiertes Geschenk",
      cozy: "Warmer Stil",
      celestial: "Himmlisches Design",
      fantasy: "Fantasy Deko",
      botanical: "Naturthema",
      playful: "Verspieltes Thema",
      gothic: "Gotische Stimmung",
      coastal: "Wohndeko",
      seasonal: "Saisonale Deko"
    },
    format: {
      coasters: "Untersetzer-Set",
      bookmarks: "Holzlesezeichen",
      "door-hanger": "Türhänger",
      "decor-piece": "Deko-Stück",
      keepsake: "Erinnerungsstück",
      craft: "DIY-Holzset",
      plaque: "Holzplakette",
      "small-gift": "kleines Holzgeschenk"
    },
    benefitPrimary: {
      coasters: "schützt Tische",
      bookmarks: "hält die Seite leicht wiederfindbar",
      "door-hanger": "gibt dem Raum eine persönliche Note",
      "decor-piece": "bringt Stimmung auf Regale und Tische",
      keepsake: "markiert einen wichtigen Moment auf praktische Weise",
      craft: "gibt Kreativen eine fertige Holzbasis",
      plaque: "macht eine Erinnerung sichtbar",
      "small-gift": "setzt einen kleinen handgemachten Akzent"
    },
    benefitSecondary: {
      coasters: "setzt thematische Deko",
      bookmarks: "macht ein Geschenk für Leser persönlicher",
      "door-hanger": "setzt schon vor dem Eintreten den richtigen Ton",
      "decor-piece": "legt einen warmen thematischen Akzent",
      keepsake: "macht den Moment leichter bewahrbar",
      craft: "hält Bastelideen leicht verschenkbar und einfach umzusetzen",
      plaque: "gibt dem Geschenk einen aufmerksamen Erinnerungscharakter",
      "small-gift": "funktioniert gut als kleines Geschenk oder Extra"
    },
    motif: {
      cat: "ein Katzenmotiv",
      dog: "ein Pfotendetail",
      celestial: "himmlische Linienarbeit",
      fantasy: "ein Fantasy-Detail",
      gaming: "ein Spielemotiv",
      botanical: "ein botanisches Detail",
      coastal: "ein Küstendetail",
      faith: "ein spirituelles Detail",
      gothic: "ein gotisches Detail",
      seasonal: "ein saisonales Motiv",
      wedding: "ein Anlassdetail",
      baby: "eine erinnerungsstarke Botschaft",
      craft: "unbehandeltes Holz zum Weitergestalten",
      memorial: "ein Erinnerungsdetail",
      default: "eine warme Gravur"
    },
    usage: {
      coasters: {
        cat: "Kaffeetische, Schreibtische und gemütliche Ecken",
        dog: "Alltagstischen und haustierfreundlichen Räumen",
        celestial: "Kaffeetische, Beistelltische und stimmungsvolle Räume",
        fantasy: "Leseecken, Schreibtische und Hobbyräume",
        gaming: "Spielzimmer, Schreibtische und Wochenendtische",
        botanical: "Küchen, Gästetische und warme Wohnräume",
        coastal: "Gästezimmern, Terrassen und entspannten Wohnungen",
        gothic: "Beistelltische, Regale und markante Deko-Konzepte",
        default: "Alltagstische, Schreibtische und gemütliche Ecken"
      },
      bookmarks: {
        fantasy: "Bücherstapeln, Fantasy-Regalen und der Abendlektüre",
        celestial: "Nachttischen, Buchregalen und ruhigen Lesestunden",
        botanical: "Stofftaschen, Buchregalen und stillen Lesemomenten",
        gothic: "Dark-Academia-Regalen und stimmungsvollen Leseecken",
        default: "Bücherstapeln, Geschenkboxen und ruhigen Leseabenden"
      },
      "door-hanger": {
        fantasy: "Leseecken, Hobbyräumen und Schlafzimmertüren",
        gaming: "Spielzimmern, Streaming-Ecken und Schreibtischen",
        wedding: "Eingängen, Hochzeitsecken und gemeinsamen Räumen",
        default: "Schlafzimmertüren, Homeoffices und persönlichen Ecken"
      },
      "decor-piece": {
        cat: "Regalen, Beistelltischen und kerzenbeleuchteten Ecken",
        celestial: "Nachttischen, Konsolen und warmen Abendsettings",
        gothic: "Regalen, Sideboards und atmosphärischen Ecken",
        default: "Regalen, Beistelltischen und gemütlichen Ecken"
      },
      keepsake: {
        wedding: "Geschenkboxen, Erinnerungsregalen und Anlass-Tischen",
        baby: "Kinderzimmerregalen, Schubladen und Meilensteinfotos",
        memorial: "Erinnerungsecken und bedeutungsvollen Regalen",
        default: "Geschenkboxen, Regalen und bedeutungsvollen Erinnerungsmomenten"
      },
      craft: {
        default: "Basteltischen, persönlichen Projekten und handgemachten Geschenkstunden"
      },
      plaque: {
        memorial: "Erinnerungsecken, Schreibtischen und stillen Gedenkplätzen",
        default: "Regalen, Beistelltischen und Erinnerungsplätzen"
      },
      "small-gift": {
        default: "Schreibtischschubladen, Geschenkboxen und praktischen Alltagsplätzen"
      }
    },
    ctaPrefix: "Auf Etsy ansehen",
    brandSuffix: "von Craftygiftsplace"
  }
};

LABELS.fr = {
  audience: {
    "cat-lovers": "amoureux des chats",
    "dog-lovers": "amoureux des chiens",
    readers: "lecteurs",
    "book-lovers": "amoureux des livres",
    "fantasy-readers": "lecteurs de fantasy",
    gamers: "joueurs",
    newlyweds: "jeunes mariés",
    "new-parents": "jeunes parents",
    "cozy-homeowners": "amateurs d'intérieurs chaleureux",
    "alternative-decor-fans": "amateurs de déco affirmée",
    crafters: "créatifs",
    "gift-shoppers": "chercheurs de cadeaux"
  },
  occasion: {
    housewarming: "crémaillère",
    birthday: "anniversaire",
    "reader-gift": "cadeau pour lecteur",
    wedding: "mariage",
    anniversary: "anniversaire de mariage",
    christmas: "Noël",
    "new-baby": "nouveau bébé",
    "everyday-gift": "petit cadeau du quotidien",
    memorial: "cadeau souvenir",
    "hobby-gift": "cadeau loisir"
  },
  style: {
    cozy: "chaleureux",
    celestial: "céleste",
    fantasy: "fantasy",
    botanical: "botanique",
    playful: "ludique",
    personalized: "personnalisé",
    gothic: "gothique",
    rustic: "rustique",
    minimal: "sobre",
    alternative: "alternatif",
    "faith-inspired": "spirituel",
    seasonal: "de saison",
    coastal: "bord de mer"
  },
  intent: {
    "cat-lover-gift": "cadeau pour amoureux des chats",
    "reader-gift": "cadeau pour lecteur",
    "book-lover-gift": "cadeau pour amoureux des livres",
    "fantasy-reader-gift": "cadeau pour lecteur de fantasy",
    "bookmark-gift": "cadeau marque-page",
    "reading-nook-gift": "cadeau pour coin lecture",
    "housewarming-gift": "cadeau de crémaillère",
    "cozy-home-decor": "déco chaleureuse pour la maison",
    "personalized-wedding-gift": "cadeau de mariage personnalisé"
  },
  chip: {
    "cat-lovers": "Cadeau pour amoureux des chats",
    "dog-lovers": "Cadeau pour amoureux des chiens",
    readers: "Cadeau pour lecteurs",
    "book-lovers": "Cadeau pour amoureux des livres",
    "fantasy-readers": "Cadeau pour lecteur de fantasy",
    gamers: "Cadeau pour joueur",
    newlyweds: "Cadeau pour jeunes mariés",
    "new-parents": "Nouveau bébé",
    "cozy-homeowners": "Cadeau maison",
    "alternative-decor-fans": "Déco marquée",
    crafters: "Cadeau DIY",
    housewarming: "Cadeau de crémaillère",
    wedding: "Cadeau de mariage",
    anniversary: "Souvenir de mariage",
    christmas: "Déco de saison",
    memorial: "Souvenir",
    personalized: "Personnalisé",
    cozy: "Style chaleureux",
    celestial: "Design céleste",
    fantasy: "Décor fantasy",
    botanical: "Thème nature",
    playful: "Thème ludique",
    gothic: "Ambiance gothique",
    coastal: "Déco maison",
    seasonal: "Déco de saison"
  },
  format: {
    coasters: "set de sous-verres",
    bookmarks: "marque-page",
    "door-hanger": "suspension de porte",
    "decor-piece": "pièce déco",
    keepsake: "cadeau souvenir",
    craft: "set DIY en bois",
    plaque: "plaque en bois",
    "small-gift": "petit cadeau en bois"
  },
  benefitPrimary: {
    coasters: "protège les tables",
    bookmarks: "garde la page facile à retrouver",
    "door-hanger": "donne une touche personnelle à la pièce",
    "decor-piece": "apporte de l'ambiance aux étagères et aux tables",
    keepsake: "marque un moment important de façon concrète",
    craft: "donne une base en bois prête à être terminée",
    plaque: "rend un souvenir visible",
    "small-gift": "ajoute une petite touche artisanale"
  },
  benefitSecondary: {
    coasters: "ajoute un décor thématique",
    bookmarks: "rend un cadeau livre plus personnel",
    "door-hanger": "donne le ton dès l'entrée",
    "decor-piece": "apporte un accent chaleureux",
    keepsake: "rend le moment plus facile à garder",
    craft: "garde les idées créatives simples à offrir",
    plaque: "ajoute une finition attentionnée",
    "small-gift": "fonctionne bien comme petit cadeau ou ajout"
  },
  motif: {
    cat: "un motif de chat",
    dog: "un détail de patte",
    celestial: "un tracé céleste",
    fantasy: "un détail fantasy",
    gaming: "un motif de jeu",
    botanical: "un détail botanique",
    coastal: "un détail bord de mer",
    faith: "un détail spirituel",
    gothic: "un détail gothique",
    seasonal: "un motif de saison",
    wedding: "un détail d'occasion",
    baby: "une formule souvenir",
    craft: "du bois brut prêt à être décoré",
    memorial: "un détail souvenir",
    default: "une gravure chaleureuse"
  },
  usage: {
    coasters: { cat: "tables basses, bureaux et coins cosy", dog: "tables du quotidien et espaces avec animaux", celestial: "tables basses, guéridons et pièces d'ambiance", fantasy: "coins lecture, bureaux et pièces loisirs", gaming: "salles de jeu, bureaux et tables du week-end", botanical: "cuisines, tables d'invités et intérieurs chaleureux", coastal: "chambres d'amis, terrasses et maisons détendues", gothic: "guéridons, étagères et décors affirmés", default: "tables du quotidien, bureaux et coins chaleureux" },
    bookmarks: { fantasy: "piles de livres, lectures du soir et étagères de fantasy", celestial: "journaux de lecture, tables de nuit et chapitres calmes", botanical: "cadeaux livres, sacs et lectures silencieuses", gothic: "étagères dark academia et coins lecture marqués", default: "piles de livres, journaux de lecture et coffrets cadeaux" },
    "door-hanger": { fantasy: "coins lecture, pièces loisirs et portes de chambre", gaming: "salles de jeu, coins streaming et bureaux", wedding: "entrées, coins mariage et espaces partagés", default: "portes de chambre, bureaux à domicile et coins personnels" },
    "decor-piece": { cat: "étagères, guéridons et coins éclairés à la bougie", celestial: "tables de nuit, consoles et ambiances du soir", gothic: "étagères, buffets et coins atmosphériques", default: "étagères, guéridons et coins cosy" },
    keepsake: { wedding: "boîtes cadeaux, étagères souvenirs et tables d'occasion", baby: "étagères de chambre, tiroirs et photos marquantes", memorial: "coins mémoire et étagères pleines de sens", default: "boîtes cadeaux, étagères et moments à garder" },
    craft: { default: "tables créatives, projets personnalisés et cadeaux faits main" },
    plaque: { memorial: "coins mémoire, bureaux et espaces hommage", default: "étagères, guéridons et endroits souvenirs" },
    "small-gift": { default: "tiroirs de bureau, coffrets cadeaux et petits espaces du quotidien" }
  },
  ctaPrefix: "Voir",
  brandSuffix: "de Craftygiftsplace"
};

LABELS.es = {
  audience: {
    "cat-lovers": "amantes de los gatos",
    "dog-lovers": "amantes de los perros",
    readers: "lectores",
    "book-lovers": "amantes de los libros",
    "fantasy-readers": "lectores de fantasía",
    gamers: "jugadores",
    newlyweds: "recién casados",
    "new-parents": "padres recientes",
    "cozy-homeowners": "amantes de hogares acogedores",
    "alternative-decor-fans": "amantes de la decoración con carácter",
    crafters: "personas creativas",
    "gift-shoppers": "compradores de regalos"
  },
  occasion: {
    housewarming: "casa nueva",
    birthday: "cumpleaños",
    "reader-gift": "regalo para lectores",
    wedding: "boda",
    anniversary: "aniversario",
    christmas: "Navidad",
    "new-baby": "nuevo bebé",
    "everyday-gift": "pequeño regalo",
    memorial: "regalo conmemorativo",
    "hobby-gift": "regalo afición"
  },
  style: {
    cozy: "acogedor",
    celestial: "celestial",
    fantasy: "de fantasía",
    botanical: "botánico",
    playful: "divertido",
    personalized: "personalizado",
    gothic: "gótico",
    rustic: "rústico",
    minimal: "sereno",
    alternative: "alternativo",
    "faith-inspired": "espiritual",
    seasonal: "de temporada",
    coastal: "costero"
  },
  intent: {
    "cat-lover-gift": "regalo para amantes de los gatos",
    "reader-gift": "regalo para lectores",
    "book-lover-gift": "regalo para amantes de los libros",
    "fantasy-reader-gift": "regalo para lectores de fantasía",
    "bookmark-gift": "regalo marcapáginas",
    "reading-nook-gift": "regalo para rincón de lectura",
    "housewarming-gift": "regalo para casa nueva",
    "cozy-home-decor": "decoración acogedora para el hogar",
    "personalized-wedding-gift": "regalo de boda personalizado"
  },
  chip: {
    "cat-lovers": "Regalo para amantes de los gatos",
    "dog-lovers": "Regalo para amantes de los perros",
    readers: "Regalo para lectores",
    "book-lovers": "Regalo para amantes de los libros",
    "fantasy-readers": "Regalo para lectores de fantasía",
    gamers: "Regalo para jugador",
    newlyweds: "Regalo para recién casados",
    "new-parents": "Nuevo bebé",
    "cozy-homeowners": "Regalo para el hogar",
    "alternative-decor-fans": "Decoración con carácter",
    crafters: "Regalo DIY",
    housewarming: "Regalo para casa nueva",
    wedding: "Regalo de boda",
    anniversary: "Recuerdo de aniversario",
    christmas: "Decoración de temporada",
    memorial: "Recuerdo",
    personalized: "Personalizado",
    cozy: "Estilo acogedor",
    celestial: "Diseño celestial",
    fantasy: "Decoración de fantasía",
    botanical: "Tema natural",
    playful: "Tema divertido",
    gothic: "Ambiente gótico",
    coastal: "Decoración para casa",
    seasonal: "Decoración de temporada"
  },
  format: {
    coasters: "set de posavasos",
    bookmarks: "marcapáginas",
    "door-hanger": "colgador de puerta",
    "decor-piece": "pieza decorativa",
    keepsake: "regalo recuerdo",
    craft: "set DIY de madera",
    plaque: "placa de madera",
    "small-gift": "pequeño regalo de madera"
  },
  benefitPrimary: {
    coasters: "protege las mesas",
    bookmarks: "mantiene la página fácil de encontrar",
    "door-hanger": "da un toque personal a la habitación",
    "decor-piece": "aporta ambiente a estanterías y mesas",
    keepsake: "marca un momento importante de forma práctica",
    craft: "da una base de madera lista para terminar",
    plaque: "convierte un recuerdo en algo visible",
    "small-gift": "añade un pequeño toque artesanal"
  },
  benefitSecondary: {
    coasters: "añade decoración temática",
    bookmarks: "hace más personal un regalo de libro",
    "door-hanger": "marca el tono antes de entrar",
    "decor-piece": "aporta un acento cálido",
    keepsake: "hace más fácil conservar el momento",
    craft: "mantiene las ideas creativas fáciles de regalar",
    plaque: "añade un acabado atento",
    "small-gift": "funciona bien como regalo pequeño o extra"
  },
  motif: {
    cat: "un motivo felino",
    dog: "un detalle de huella",
    celestial: "un trazo celestial",
    fantasy: "un detalle de fantasía",
    gaming: "un motivo de juego",
    botanical: "un detalle botánico",
    coastal: "un detalle costero",
    faith: "un detalle espiritual",
    gothic: "un detalle gótico",
    seasonal: "un motivo de temporada",
    wedding: "un detalle de ocasión",
    baby: "un mensaje de recuerdo",
    craft: "madera sin tratar lista para decorar",
    memorial: "un detalle conmemorativo",
    default: "un grabado cálido"
  },
  usage: {
    coasters: { cat: "mesas de centro, escritorios y rincones acogedores", dog: "mesas del día a día y espacios con mascotas", celestial: "mesas de centro, auxiliares y ambientes suaves", fantasy: "rincones de lectura, escritorios y cuartos de aficiones", gaming: "cuartos de juego, escritorios y mesas de fin de semana", botanical: "cocinas, mesas de invitados e interiores cálidos", coastal: "habitaciones de invitados, terrazas y casas relajadas", gothic: "mesas auxiliares, estanterías y decoraciones marcadas", default: "mesas diarias, escritorios y rincones acogedores" },
    bookmarks: { fantasy: "montones de libros, lectura nocturna y estanterías de fantasía", celestial: "diarios de lectura, mesillas y capítulos tranquilos", botanical: "regalos de libros, bolsas y lectura silenciosa", gothic: "estanterías dark academia y rincones de lectura intensos", default: "montones de libros, diarios de lectura y cajas regalo" },
    "door-hanger": { fantasy: "rincones de lectura, cuartos de aficiones y puertas de dormitorio", gaming: "cuartos de juego, rincones de streaming y escritorios", wedding: "entradas, rincones de boda y espacios compartidos", default: "puertas de dormitorio, despachos y rincones personales" },
    "decor-piece": { cat: "estanterías, mesas auxiliares y rincones con velas", celestial: "mesillas, consolas y ambientes de tarde", gothic: "estanterías, aparadores y rincones atmosféricos", default: "estanterías, mesas auxiliares y rincones acogedores" },
    keepsake: { wedding: "cajas regalo, estantes recuerdo y mesas de ocasión", baby: "estantes de habitación, cajones y fotos importantes", memorial: "rincones de memoria y estantes con significado", default: "cajas regalo, estantes y momentos para conservar" },
    craft: { default: "mesas creativas, proyectos personalizados y regalos hechos a mano" },
    plaque: { memorial: "rincones de memoria, escritorios y espacios tranquilos", default: "estanterías, mesas auxiliares y lugares recuerdo" },
    "small-gift": { default: "cajones de escritorio, cajas regalo y pequeños espacios del día a día" }
  },
  ctaPrefix: "Ver",
  brandSuffix: "de Craftygiftsplace"
};

LABELS.pt = {
  audience: {
    "cat-lovers": "amantes de gatos",
    "dog-lovers": "amantes de cães",
    readers: "leitores",
    "book-lovers": "amantes de livros",
    "fantasy-readers": "leitores de fantasia",
    gamers: "gamers",
    newlyweds: "recém-casados",
    "new-parents": "novos pais",
    "cozy-homeowners": "amantes de casas acolhedoras",
    "alternative-decor-fans": "amantes de decoração marcante",
    crafters: "pessoas criativas",
    "gift-shoppers": "compradores de presentes"
  },
  occasion: {
    housewarming: "casa nova",
    birthday: "aniversário",
    "reader-gift": "presente para leitores",
    wedding: "casamento",
    anniversary: "aniversário",
    christmas: "Natal",
    "new-baby": "novo bebé",
    "everyday-gift": "pequeno presente",
    memorial: "presente de memória",
    "hobby-gift": "presente de hobby"
  },
  style: {
    cozy: "acolhedor",
    celestial: "celeste",
    fantasy: "de fantasia",
    botanical: "botânico",
    playful: "divertido",
    personalized: "personalizado",
    gothic: "gótico",
    rustic: "rústico",
    minimal: "sereno",
    alternative: "alternativo",
    "faith-inspired": "espiritual",
    seasonal: "sazonal",
    coastal: "costeiro"
  },
  intent: {
    "cat-lover-gift": "presente para amantes de gatos",
    "reader-gift": "presente para leitores",
    "book-lover-gift": "presente para amantes de livros",
    "fantasy-reader-gift": "presente para leitores de fantasia",
    "bookmark-gift": "presente marcador",
    "reading-nook-gift": "presente para canto de leitura",
    "housewarming-gift": "presente de casa nova",
    "cozy-home-decor": "decoração acolhedora para casa",
    "personalized-wedding-gift": "presente de casamento personalizado"
  },
  chip: {
    "cat-lovers": "Presente para amantes de gatos",
    "dog-lovers": "Presente para amantes de cães",
    readers: "Presente para leitores",
    "book-lovers": "Presente para amantes de livros",
    "fantasy-readers": "Presente para leitores de fantasia",
    gamers: "Presente gamer",
    newlyweds: "Presente para recém-casados",
    "new-parents": "Novo bebé",
    "cozy-homeowners": "Presente para a casa",
    "alternative-decor-fans": "Decoração com carácter",
    crafters: "Presente DIY",
    housewarming: "Presente de casa nova",
    wedding: "Presente de casamento",
    anniversary: "Recordação",
    christmas: "Decoração sazonal",
    memorial: "Recordação",
    personalized: "Personalizado",
    cozy: "Estilo acolhedor",
    celestial: "Design celeste",
    fantasy: "Decoração de fantasia",
    botanical: "Tema natural",
    playful: "Tema divertido",
    gothic: "Ambiente gótico",
    coastal: "Decoração para casa",
    seasonal: "Decoração sazonal"
  },
  format: {
    coasters: "conjunto de porta-copos",
    bookmarks: "marcador",
    "door-hanger": "pendente de porta",
    "decor-piece": "peça decorativa",
    keepsake: "presente recordação",
    craft: "set DIY de madeira",
    plaque: "placa de madeira",
    "small-gift": "pequeno presente de madeira"
  },
  benefitPrimary: {
    coasters: "protege as mesas",
    bookmarks: "mantém a página fácil de encontrar",
    "door-hanger": "dá um toque pessoal ao espaço",
    "decor-piece": "traz ambiente a prateleiras e mesas",
    keepsake: "marca um momento importante de forma prática",
    craft: "dá uma base de madeira pronta a terminar",
    plaque: "torna uma recordação visível",
    "small-gift": "acrescenta um pequeno toque artesanal"
  },
  benefitSecondary: {
    coasters: "acrescenta decoração temática",
    bookmarks: "torna um presente de livro mais pessoal",
    "door-hanger": "define o tom logo à entrada",
    "decor-piece": "acrescenta um apontamento quente",
    keepsake: "torna o momento mais fácil de guardar",
    craft: "mantém as ideias criativas fáceis de oferecer",
    plaque: "acrescenta um acabamento atencioso",
    "small-gift": "funciona bem como pequeno presente ou extra"
  },
  motif: {
    cat: "um motivo felino",
    dog: "um detalhe de pata",
    celestial: "um traço celeste",
    fantasy: "um detalhe de fantasia",
    gaming: "um motivo de jogo",
    botanical: "um detalhe botânico",
    coastal: "um detalhe costeiro",
    faith: "um detalhe espiritual",
    gothic: "um detalhe gótico",
    seasonal: "um motivo sazonal",
    wedding: "um detalhe de ocasião",
    baby: "uma mensagem de recordação",
    craft: "madeira crua pronta a decorar",
    memorial: "um detalhe de memória",
    default: "uma gravação acolhedora"
  },
  usage: {
    coasters: { cat: "mesas de centro, secretárias e cantos acolhedores", dog: "mesas do dia a dia e espaços com animais", celestial: "mesas de centro, mesas de apoio e ambientes suaves", fantasy: "cantos de leitura, secretárias e salas de hobbies", gaming: "salas de jogo, secretárias e mesas de fim de semana", botanical: "cozinhas, mesas de convidados e interiores quentes", coastal: "quartos de hóspedes, terraços e casas descontraídas", gothic: "mesas de apoio, prateleiras e decorações marcantes", default: "mesas do dia a dia, secretárias e cantos acolhedores" },
    bookmarks: { fantasy: "pilhas de livros, leitura à noite e estantes de fantasia", celestial: "diários de leitura, mesinhas e capítulos tranquilos", botanical: "presentes de livros, sacos e leituras silenciosas", gothic: "estantes dark academia e cantos de leitura marcantes", default: "pilhas de livros, diários de leitura e caixas-presente" },
    "door-hanger": { fantasy: "cantos de leitura, salas de hobbies e portas de quarto", gaming: "salas de jogo, cantos de streaming e secretárias", wedding: "entradas, cantos de casamento e espaços partilhados", default: "portas de quarto, escritórios em casa e cantos pessoais" },
    "decor-piece": { cat: "prateleiras, mesas de apoio e cantos iluminados por velas", celestial: "mesinhas, consolas e ambientes ao final do dia", gothic: "prateleiras, aparadores e cantos atmosféricos", default: "prateleiras, mesas de apoio e cantos acolhedores" },
    keepsake: { wedding: "caixas de presente, prateleiras de recordação e mesas de ocasião", baby: "prateleiras de quarto, gavetas e fotografias marcantes", memorial: "cantos de memória e prateleiras com significado", default: "caixas de presente, prateleiras e momentos para guardar" },
    craft: { default: "mesas criativas, projetos personalizados e presentes feitos à mão" },
    plaque: { memorial: "cantos de memória, secretárias e espaços tranquilos", default: "prateleiras, mesas de apoio e lugares de recordação" },
    "small-gift": { default: "gavetas de secretária, caixas-presente e pequenos espaços do dia a dia" }
  },
  ctaPrefix: "Ver",
  brandSuffix: "da Craftygiftsplace"
};

LABELS.it = {
  audience: {
    "cat-lovers": "amanti dei gatti",
    "dog-lovers": "amanti dei cani",
    readers: "lettori",
    "book-lovers": "amanti dei libri",
    "fantasy-readers": "lettori fantasy",
    gamers: "giocatori",
    newlyweds: "neo-sposi",
    "new-parents": "neo-genitori",
    "cozy-homeowners": "amanti di case accoglienti",
    "alternative-decor-fans": "amanti di decorazioni con carattere",
    crafters: "persone creative",
    "gift-shoppers": "chi cerca un regalo"
  },
  occasion: {
    housewarming: "casa nuova",
    birthday: "compleanno",
    "reader-gift": "regalo per lettori",
    wedding: "matrimonio",
    anniversary: "anniversario",
    christmas: "Natale",
    "new-baby": "nuovo bebè",
    "everyday-gift": "piccolo regalo",
    memorial: "regalo ricordo",
    "hobby-gift": "regalo per hobby"
  },
  style: {
    cozy: "accogliente",
    celestial: "celeste",
    fantasy: "fantasy",
    botanical: "botanico",
    playful: "giocoso",
    personalized: "personalizzato",
    gothic: "gotico",
    rustic: "rustico",
    minimal: "sobrio",
    alternative: "alternativo",
    "faith-inspired": "spirituale",
    seasonal: "stagionale",
    coastal: "costiero"
  },
  intent: {
    "cat-lover-gift": "regalo per amanti dei gatti",
    "reader-gift": "regalo per lettori",
    "book-lover-gift": "regalo per amanti dei libri",
    "fantasy-reader-gift": "regalo per lettori fantasy",
    "bookmark-gift": "regalo segnalibro",
    "reading-nook-gift": "regalo per angolo lettura",
    "housewarming-gift": "regalo per la casa nuova",
    "cozy-home-decor": "decorazione accogliente per la casa",
    "personalized-wedding-gift": "regalo di nozze personalizzato"
  },
  chip: {
    "cat-lovers": "Regalo per amanti dei gatti",
    "dog-lovers": "Regalo per amanti dei cani",
    readers: "Regalo per lettori",
    "book-lovers": "Regalo per amanti dei libri",
    "fantasy-readers": "Regalo per lettori fantasy",
    gamers: "Regalo gamer",
    newlyweds: "Regalo per neo-sposi",
    "new-parents": "Nuovo bebè",
    "cozy-homeowners": "Regalo per la casa",
    "alternative-decor-fans": "Decorazione con carattere",
    crafters: "Regalo DIY",
    housewarming: "Regalo per la casa nuova",
    wedding: "Regalo di matrimonio",
    anniversary: "Ricordo",
    christmas: "Decorazione stagionale",
    memorial: "Ricordo",
    personalized: "Personalizzato",
    cozy: "Stile accogliente",
    celestial: "Design celeste",
    fantasy: "Decorazione fantasy",
    botanical: "Tema naturale",
    playful: "Tema giocoso",
    gothic: "Atmosfera gotica",
    coastal: "Decorazione per la casa",
    seasonal: "Decorazione stagionale"
  },
  format: {
    coasters: "set di sottobicchieri",
    bookmarks: "segnalibro",
    "door-hanger": "targhetta da porta",
    "decor-piece": "pezzo decorativo",
    keepsake: "regalo ricordo",
    craft: "set DIY in legno",
    plaque: "placca in legno",
    "small-gift": "piccolo regalo in legno"
  },
  benefitPrimary: {
    coasters: "protegge i tavoli",
    bookmarks: "mantiene la pagina facile da ritrovare",
    "door-hanger": "dà un tocco personale alla stanza",
    "decor-piece": "porta atmosfera a mensole e tavoli",
    keepsake: "segna un momento importante in modo concreto",
    craft: "dà una base in legno pronta da finire",
    plaque: "rende visibile un ricordo",
    "small-gift": "aggiunge un piccolo tocco artigianale"
  },
  benefitSecondary: {
    coasters: "aggiunge decorazione a tema",
    bookmarks: "rende più personale un regalo libro",
    "door-hanger": "dà il tono prima ancora di entrare",
    "decor-piece": "aggiunge un accento caldo",
    keepsake: "rende più facile custodire il momento",
    craft: "mantiene le idee creative facili da regalare",
    plaque: "aggiunge una finitura attenta",
    "small-gift": "funziona bene come piccolo regalo o extra"
  },
  motif: {
    cat: "un motivo felino",
    dog: "un dettaglio di zampa",
    celestial: "un tratto celeste",
    fantasy: "un dettaglio fantasy",
    gaming: "un motivo di gioco",
    botanical: "un dettaglio botanico",
    coastal: "un dettaglio costiero",
    faith: "un dettaglio spirituale",
    gothic: "un dettaglio gotico",
    seasonal: "un motivo stagionale",
    wedding: "un dettaglio d'occasione",
    baby: "un messaggio ricordo",
    craft: "legno grezzo pronto da decorare",
    memorial: "un dettaglio commemorativo",
    default: "un'incisione calda"
  },
  usage: {
    coasters: { cat: "tavolini, scrivanie e angoli accoglienti", dog: "tavoli di ogni giorno e spazi con animali", celestial: "tavolini, tavoli d'appoggio e ambienti soffusi", fantasy: "angoli lettura, scrivanie e stanze hobby", gaming: "stanze da gioco, scrivanie e tavoli del weekend", botanical: "cucine, tavoli per ospiti e interni caldi", coastal: "camere per ospiti, terrazze e case rilassate", gothic: "tavolini, mensole e decorazioni decise", default: "tavoli quotidiani, scrivanie e angoli accoglienti" },
    bookmarks: { fantasy: "pile di libri, letture serali e scaffali fantasy", celestial: "diari di lettura, comodini e capitoli tranquilli", botanical: "regali libro, borse e letture silenziose", gothic: "scaffali dark academia e angoli lettura intensi", default: "pile di libri, diari di lettura e scatole regalo" },
    "door-hanger": { fantasy: "angoli lettura, stanze hobby e porte di camera", gaming: "stanze da gioco, angoli streaming e scrivanie", wedding: "ingressi, angoli matrimonio e spazi condivisi", default: "porte di camera, studi e angoli personali" },
    "decor-piece": { cat: "mensole, tavolini e angoli illuminati da candele", celestial: "comodini, consolle e atmosfere della sera", gothic: "mensole, credenze e angoli suggestivi", default: "mensole, tavolini e angoli accoglienti" },
    keepsake: { wedding: "scatole regalo, mensole ricordo e tavoli d'occasione", baby: "mensole di cameretta, cassetti e foto importanti", memorial: "angoli memoria e mensole piene di significato", default: "scatole regalo, mensole e momenti da custodire" },
    craft: { default: "tavoli creativi, progetti personalizzati e regali fatti a mano" },
    plaque: { memorial: "angoli memoria, scrivanie e spazi tranquilli", default: "mensole, tavolini e posti del ricordo" },
    "small-gift": { default: "cassetti della scrivania, scatole regalo e piccoli spazi quotidiani" }
  },
  ctaPrefix: "Vedi",
  brandSuffix: "di Craftygiftsplace"
};

function fixEnglishName(name) {
  const clean = String(name || "").trim();
  if (!clean) {
    return clean;
  }

  if (/personaliseerbare houten onderzetters met kurk onderkant/i.test(clean)) {
    return "Personalized Cork Back Wooden Coasters";
  }

  return clean
    .replace(/\bHouten\b/g, "Wooden")
    .replace(/\bOnderzetters\b/g, "Coasters")
    .replace(/\bBladwijzer\b/g, "Bookmark")
    .replace(/\bMet\b/g, "With")
    .replace(/\bKurk\b/g, "Cork")
    .replace(/\bOnderkant\b/g, "Back")
    .replace(/\bCat And Moon\b/g, "Cat and Moon")
    .replace(/\bSun And Moon\b/g, "Sun and Moon");
}

function fixGermanName(rawProduct) {
  if (GERMAN_NAME_OVERRIDES[rawProduct.id]) {
    return GERMAN_NAME_OVERRIDES[rawProduct.id];
  }

  return String(rawProduct.name || "")
    .trim()
    .replace(/\bWooden Coasters\b/gi, "Holzuntersetzer")
    .replace(/\bWooden Bookmark\b/gi, "Holzlesezeichen")
    .replace(/\bCoaster Set\b/gi, "Untersetzer-Set")
    .replace(/\bDoor Hanger\b/gi, "Türhänger")
    .replace(/\bDoor Sign\b/gi, "Türschild")
    .replace(/\bTealight Holder\b/gi, "Teelichthalter")
    .replace(/\bIncense Burner\b/gi, "Räucherhalter")
    .replace(/\bPet Memorial Plaque\b/gi, "Haustier-Gedenkplakette")
    .replace(/\bPersonalized\b/gi, "Personalisiert")
    .replace(/\bPersonalised\b/gi, "Personalisiert")
    .replace(/\bClassic\b/gi, "Klassisch")
    .replace(/\bCeltic\b/gi, "Keltisch")
    .replace(/\bRocket\b/gi, "Rakete")
    .replace(/\bFeather\b/gi, "Feder")
    .replace(/\bLighthouse\b/gi, "Leuchtturm")
    .replace(/\bDragon Eye\b/gi, "Drachenauge")
    .replace(/\bDragon\b/gi, "Drache")
    .replace(/\bCat and Moon\b/gi, "Katze und Mond")
    .replace(/\bCat\b/gi, "Katze")
    .replace(/\bMoon\b/gi, "Mond")
    .replace(/\bSun\b/gi, "Sonne")
    .replace(/\bZodiac\b/gi, "Sternzeichen")
    .replace(/\bTree of Life\b/gi, "Lebensbaum")
    .replace(/\bBee Motif\b/gi, "Bienenmotiv")
    .replace(/\bLeaf\b/gi, "Blattmotiv")
    .replace(/\bFloral\b/gi, "Blumenmotiv");
}

function applyNameReplacements(name, replacements) {
  return replacements.reduce((value, [pattern, replacement]) => value.replace(pattern, replacement), String(name || "").trim());
}

const FRENCH_NAME_OVERRIDES = {
    "funny-husband-medal-wooden-coasters": "Sous-verres en bois avec médaille humoristique pour mari",
    "bitcoin-wooden-coasters": "Sous-verres en bois Bitcoin",
    "buddha-wood-wooden-coasters": "Sous-verres en bois Bouddha, OM et lotus",
    "dartboard-wooden-coasters": "Sous-verres en bois motif cible",
    "dog-paw-wooden-coasters": "Sous-verres en bois patte de chien",
    "dragon-eye-wooden-bookmark": "Marque-page oeil de dragon en bois",
    "dragon-wooden-bookmark": "Marque-page dragon en bois",
    "epic-fantasy-wooden-bookmark": "Marque-page fantasy épique en bois",
    "fantasy-reader-gift-set": "Coffret pour lecteurs de fantasy",
    "fantasy-sword-wooden-bookmark": "Marque-page épée fantasy en bois",
    "fantasy-wooden-coasters": "Sous-verres fantasy en bois",
    "floral-wooden-coasters": "Sous-verres en bois motif floral",
    "forest-animal-wooden-coasters": "Sous-verres en bois animaux de la forêt",
    "hand-painted-wiccan-symbol-wooden-coasters": "Sous-verres en bois symboles wiccans peints à la main",
    "mushroom-moon-wooden-coasters": "Sous-verres en bois champignons et lune",
    "moon-cat-shadow-tealight-holder": "Porte-bougie lune et chat",
    "personalized-feather-wooden-bookmark": "Marque-page en bois personnalisé avec plume",
    "personalized-just-married-wooden-door-hanger": "Suspension de porte personnalisée jeunes mariés",
    "just-married-wedding-money-holder": "Porte-billets de mariage pour jeunes mariés",
    "epic-fantasy-door-sign": "Plaque de porte fantasy",
    "sports-ball-wooden-coasters": "Sous-verres en bois ballons de sport",
    "sun-and-moon-wooden-coasters": "Sous-verres en bois Soleil et lune",
    "tree-of-life-wooden-coasters": "Sous-verres en bois Arbre de vie",
    "viking-wooden-coasters": "Sous-verres en bois vikings",
    "celestial-cat-wooden-coasters": "Sous-verres en bois chat céleste"
  };

const SPANISH_NAME_OVERRIDES = {
    "funny-husband-medal-wooden-coasters": "Posavasos de madera con medalla humorística para marido",
    "bitcoin-wooden-coasters": "Posavasos de madera Bitcoin",
    "buddha-wood-wooden-coasters": "Posavasos de madera Buda, OM y loto",
    "dartboard-wooden-coasters": "Posavasos de madera con diseño de diana",
    "dog-paw-wooden-coasters": "Posavasos de madera huella de perro",
    "dragon-eye-wooden-bookmark": "Marcapáginas ojo de dragón en madera",
    "dragon-wooden-bookmark": "Marcapáginas dragón en madera",
    "epic-fantasy-wooden-bookmark": "Marcapáginas de fantasía épica en madera",
    "fantasy-reader-gift-set": "Set de fantasía para lectores",
    "fantasy-sword-wooden-bookmark": "Marcapáginas espada de fantasía en madera",
    "fantasy-wooden-coasters": "Posavasos de madera de fantasía",
    "floral-wooden-coasters": "Posavasos de madera floral",
    "forest-animal-wooden-coasters": "Posavasos de madera animales del bosque",
    "hand-painted-wiccan-symbol-wooden-coasters": "Posavasos de madera con símbolos wiccanos pintados a mano",
    "mushroom-moon-wooden-coasters": "Posavasos de madera Setas y Luna",
    "moon-cat-shadow-tealight-holder": "Portavelas gato y luna",
    "personalized-feather-wooden-bookmark": "Marcapáginas de madera personalizado con pluma",
    "personalized-just-married-wooden-door-hanger": "Colgador de puerta personalizado para recién casados",
    "just-married-wedding-money-holder": "Portaefectivo de boda para recién casados",
    "epic-fantasy-door-sign": "Placa de puerta de fantasía",
    "sports-ball-wooden-coasters": "Posavasos de madera con pelotas deportivas",
    "sun-and-moon-wooden-coasters": "Posavasos de madera Sol y Luna",
    "tree-of-life-wooden-coasters": "Posavasos de madera Árbol de la Vida",
    "viking-wooden-coasters": "Posavasos de madera vikingos",
    "celestial-cat-wooden-coasters": "Posavasos de madera gato celestial"
  };

const PORTUGUESE_NAME_OVERRIDES = {
    "funny-husband-medal-wooden-coasters": "Porta-copos de madeira com medalha divertida para marido",
    "bitcoin-wooden-coasters": "Porta-copos de madeira Bitcoin",
    "buddha-wood-wooden-coasters": "Porta-copos de madeira Buda, OM e lótus",
    "dartboard-wooden-coasters": "Porta-copos de madeira com padrão de alvo de dardos",
    "dog-paw-wooden-coasters": "Porta-copos de madeira pata de cão",
    "dragon-eye-wooden-bookmark": "Marcador olho de dragão em madeira",
    "dragon-wooden-bookmark": "Marcador dragão em madeira",
    "epic-fantasy-wooden-bookmark": "Marcador de fantasia épica em madeira",
    "fantasy-reader-gift-set": "Conjunto de fantasia para leitores",
    "fantasy-sword-wooden-bookmark": "Marcador espada de fantasia em madeira",
    "fantasy-wooden-coasters": "Porta-copos de madeira de fantasia",
    "floral-wooden-coasters": "Porta-copos de madeira floral",
    "forest-animal-wooden-coasters": "Porta-copos de madeira animais da floresta",
    "hand-painted-wiccan-symbol-wooden-coasters": "Porta-copos de madeira com símbolos wiccanos pintados à mão",
    "mushroom-moon-wooden-coasters": "Porta-copos de madeira Cogumelos e Lua",
    "moon-cat-shadow-tealight-holder": "Porta-vela gato e lua",
    "personalized-feather-wooden-bookmark": "Marcador de livros personalizado com pena",
    "personalized-just-married-wooden-door-hanger": "Pendente de porta personalizado para recém-casados",
    "just-married-wedding-money-holder": "Porta-dinheiro de casamento para recém-casados",
    "epic-fantasy-door-sign": "Placa de porta de fantasia",
    "sports-ball-wooden-coasters": "Porta-copos de madeira com bolas de desporto",
    "sun-and-moon-wooden-coasters": "Porta-copos de madeira Sol e Lua",
    "tree-of-life-wooden-coasters": "Porta-copos de madeira Árvore da Vida",
    "viking-wooden-coasters": "Porta-copos de madeira viking",
    "celestial-cat-wooden-coasters": "Porta-copos de madeira gato celeste"
  };

const ITALIAN_NAME_OVERRIDES = {
  "funny-husband-medal-wooden-coasters": "Sottobicchieri in legno con medaglia divertente per marito",
  "bitcoin-wooden-coasters": "Sottobicchieri in legno Bitcoin",
  "buddha-wood-wooden-coasters": "Sottobicchieri in legno Buddha, OM e loto",
  "dartboard-wooden-coasters": "Sottobicchieri in legno motivo bersaglio",
  "dog-paw-wooden-coasters": "Sottobicchieri in legno zampa di cane",
  "dragon-eye-wooden-bookmark": "Segnalibro occhio di drago in legno",
  "dragon-wooden-bookmark": "Segnalibro drago in legno",
  "epic-fantasy-wooden-bookmark": "Segnalibro fantasy epico in legno",
  "fantasy-reader-gift-set": "Set per lettori fantasy",
  "fantasy-sword-wooden-bookmark": "Segnalibro spada fantasy in legno",
  "fantasy-wooden-coasters": "Sottobicchieri fantasy in legno",
  "floral-wooden-coasters": "Sottobicchieri in legno floreali",
  "forest-animal-wooden-coasters": "Sottobicchieri in legno animali del bosco",
  "hand-painted-wiccan-symbol-wooden-coasters": "Sottobicchieri in legno con simboli wiccani dipinti a mano",
  "moon-cat-shadow-tealight-holder": "Portacandela gatto e luna",
  "mushroom-moon-wooden-coasters": "Sottobicchieri in legno funghi e luna",
  "personalized-feather-wooden-bookmark": "Segnalibro in legno personalizzato con piuma",
  "personalized-just-married-wooden-door-hanger": "Targhetta da porta personalizzata per novelli sposi",
  "just-married-wedding-money-holder": "Portasoldi matrimonio per novelli sposi",
  "epic-fantasy-door-sign": "Targa da porta fantasy",
  "sports-ball-wooden-coasters": "Sottobicchieri in legno con palloni sportivi",
  "sun-and-moon-wooden-coasters": "Sottobicchieri in legno Sole e luna",
  "tree-of-life-wooden-coasters": "Sottobicchieri in legno Albero della vita",
  "viking-wooden-coasters": "Sottobicchieri in legno vichinghi",
  "celestial-cat-wooden-coasters": "Sottobicchieri in legno gatto celeste"
  };

const FRENCH_NAME_REPLACEMENTS = [
  [/\bWooden Coasters\b/gi, "Sous-verres en bois"],
  [/\bWooden Bookmark\b/gi, "Marque-page en bois"],
  [/\bCoaster Set\b/gi, "Set de sous-verres"],
  [/\bDoor Hanger\b/gi, "Suspension de porte"],
  [/\bDoor Sign\b/gi, "Plaque de porte"],
  [/\bTealight Holder\b/gi, "Porte-bougie chauffe-plat"],
  [/\bIncense Burner\b/gi, "Porte-encens"],
  [/\bPet Memorial Plaque\b/gi, "Plaque souvenir pour animal"],
  [/\bPersonalized\b/gi, "Personnalisé"],
  [/\bPersonalised\b/gi, "Personnalisé"],
  [/\bInspired\b/gi, "inspiré"],
  [/\bClassic\b/gi, "Classique"],
  [/\bCeltic\b/gi, "Celtique"],
  [/\bRocket\b/gi, "Fusée"],
  [/\bFeather\b/gi, "Plume"],
  [/\bLighthouse\b/gi, "Phare"],
  [/\bDragon Eye\b/gi, "Oeil de dragon"],
  [/\bDragon\b/gi, "Dragon"],
  [/\bCat and Moon\b/gi, "Chat et lune"],
  [/\bSun and Moon\b/gi, "Soleil et lune"],
  [/\bCat\b/gi, "Chat"],
  [/\bMoon\b/gi, "Lune"],
  [/\bSun\b/gi, "Soleil"],
  [/\bZodiac\b/gi, "Zodiaque"],
  [/\bTree of Life\b/gi, "Arbre de vie"],
  [/\bBee Motif\b/gi, "Motif abeille"],
  [/\bLeaf\b/gi, "Feuille"],
  [/\bFloral\b/gi, "Floral"]
];

  const SPANISH_NAME_REPLACEMENTS = [
    [/\bWooden Coasters\b/gi, "Posavasos de madera"],
    [/\bWooden Bookmark\b/gi, "Marcapáginas de madera"],
    [/\bCoaster Set\b/gi, "Set de posavasos"],
    [/\bDoor Hanger\b/gi, "Colgador de puerta"],
    [/\bDoor Sign\b/gi, "Placa de puerta"],
    [/\bTealight Holder\b/gi, "Portavelas"],
    [/\bIncense Burner\b/gi, "Quemador de incienso"],
    [/\bPet Memorial Plaque\b/gi, "Placa conmemorativa para mascota"],
    [/\bPersonalized\b/gi, "Personalizado"],
    [/\bPersonalised\b/gi, "Personalizado"],
    [/\bFantasy\b/gi, "Fantasía"],
    [/\bInspired\b/gi, "inspirado"],
    [/\bClassic\b/gi, "Clásico"],
    [/\bCeltic\b/gi, "Celta"],
    [/\bRocket\b/gi, "Cohete"],
    [/\bFeather\b/gi, "Pluma"],
    [/\bLighthouse\b/gi, "Faro"],
    [/\bDragon Eye\b/gi, "Ojo de dragón"],
    [/\bDragon\b/gi, "Dragón"],
  [/\bCat and Moon\b/gi, "Gato y luna"],
  [/\bSun and Moon\b/gi, "Sol y luna"],
  [/\bCat\b/gi, "Gato"],
  [/\bMoon\b/gi, "Luna"],
  [/\bSun\b/gi, "Sol"],
  [/\bZodiac\b/gi, "Zodiaco"],
    [/\bTree of Life\b/gi, "Árbol de la vida"],
  [/\bBee Motif\b/gi, "Motivo de abeja"],
  [/\bLeaf\b/gi, "Hoja"],
  [/\bFloral\b/gi, "Floral"]
];

  const PORTUGUESE_NAME_REPLACEMENTS = [
    [/\bWooden Coasters\b/gi, "Porta-copos de madeira"],
    [/\bWooden Bookmark\b/gi, "Marcador de livros em madeira"],
    [/\bCoaster Set\b/gi, "Conjunto de porta-copos"],
    [/\bDoor Hanger\b/gi, "Pendente de porta"],
  [/\bDoor Sign\b/gi, "Placa de porta"],
  [/\bTealight Holder\b/gi, "Porta-vela"],
  [/\bIncense Burner\b/gi, "Queimador de incenso"],
    [/\bPet Memorial Plaque\b/gi, "Placa memorial para animal"],
    [/\bPersonalized\b/gi, "Personalizado"],
    [/\bPersonalised\b/gi, "Personalizado"],
    [/\bFantasy\b/gi, "Fantasia"],
    [/\bInspired\b/gi, "inspirado"],
    [/\bClassic\b/gi, "Clássico"],
    [/\bCeltic\b/gi, "Céltico"],
    [/\bRocket\b/gi, "Foguetão"],
    [/\bFeather\b/gi, "Pena"],
    [/\bLighthouse\b/gi, "Farol"],
    [/\bDragon Eye\b/gi, "Olho de dragão"],
    [/\bDragon\b/gi, "Dragão"],
  [/\bCat and Moon\b/gi, "Gato e lua"],
  [/\bSun and Moon\b/gi, "Sol e lua"],
  [/\bCat\b/gi, "Gato"],
  [/\bMoon\b/gi, "Lua"],
  [/\bSun\b/gi, "Sol"],
  [/\bZodiac\b/gi, "Zodíaco"],
    [/\bTree of Life\b/gi, "Árvore da vida"],
  [/\bBee Motif\b/gi, "Motivo de abelha"],
  [/\bLeaf\b/gi, "Folha"],
  [/\bFloral\b/gi, "Floral"]
];

const ITALIAN_NAME_REPLACEMENTS = [
  [/\bWooden Coasters\b/gi, "Sottobicchieri in legno"],
  [/\bWooden Bookmark\b/gi, "Segnalibro in legno"],
  [/\bCoaster Set\b/gi, "Set di sottobicchieri"],
  [/\bDoor Hanger\b/gi, "Targhetta da porta"],
  [/\bDoor Sign\b/gi, "Targa da porta"],
  [/\bTealight Holder\b/gi, "Portacandela"],
  [/\bIncense Burner\b/gi, "Bruciatore d'incenso"],
  [/\bPet Memorial Plaque\b/gi, "Placca ricordo per animale"],
  [/\bPersonalized\b/gi, "Personalizzato"],
  [/\bPersonalised\b/gi, "Personalizzato"],
  [/\bInspired\b/gi, "ispirato"],
  [/\bClassic\b/gi, "Classico"],
  [/\bCeltic\b/gi, "Celtico"],
  [/\bRocket\b/gi, "Razzo"],
  [/\bFeather\b/gi, "Piuma"],
  [/\bLighthouse\b/gi, "Faro"],
  [/\bDragon Eye\b/gi, "Occhio di drago"],
  [/\bDragon\b/gi, "Drago"],
  [/\bCat and Moon\b/gi, "Gatto e luna"],
  [/\bSun and Moon\b/gi, "Sole e luna"],
  [/\bCat\b/gi, "Gatto"],
  [/\bMoon\b/gi, "Luna"],
  [/\bSun\b/gi, "Sole"],
  [/\bZodiac\b/gi, "Zodiaco"],
  [/\bTree of Life\b/gi, "Albero della vita"],
  [/\bBee Motif\b/gi, "Motivo ape"],
  [/\bLeaf\b/gi, "Foglia"],
  [/\bFloral\b/gi, "Floreale"]
];

function fixFrenchName(rawProduct) {
  return FRENCH_NAME_OVERRIDES[rawProduct.id] || applyNameReplacements(rawProduct.name, FRENCH_NAME_REPLACEMENTS);
}

function fixSpanishName(rawProduct) {
  return SPANISH_NAME_OVERRIDES[rawProduct.id] || applyNameReplacements(rawProduct.name, SPANISH_NAME_REPLACEMENTS);
}

function fixPortugueseName(rawProduct) {
  return PORTUGUESE_NAME_OVERRIDES[rawProduct.id] || applyNameReplacements(rawProduct.name, PORTUGUESE_NAME_REPLACEMENTS);
}

function fixItalianName(rawProduct) {
  return ITALIAN_NAME_OVERRIDES[rawProduct.id] || applyNameReplacements(rawProduct.name, ITALIAN_NAME_REPLACEMENTS);
}

function pickThemeKey(source) {
  if (/\bcat\b|\bfeline\b/.test(source)) return "cat";
  if (/\bdog\b|\bpaw\b/.test(source)) return "dog";
  if (/\bzodiac\b|\bmoon\b|\bsun\b|\bcelestial\b|\bastrology\b|\bwitch\b/.test(source)) return "celestial";
  if (/\bdragon\b|\bfantasy\b|\bsword\b|\bepic\b/.test(source)) return "fantasy";
  if (/\bgamer\b|\bgaming\b|\bmoba\b|\bfps\b|\bchess\b|\bcheckers\b|\bpoker\b|\bdart\b|\bcricket\b|\bgolf\b|\bsport\b|\bmotorsport\b|\btabletop\b/.test(source)) return "gaming";
  if (/\bfloral\b|\bleaf\b|\bforest\b|\bbee\b|\btree\b|\banimal\b|\bwildlife\b|\bhorse\b/.test(source)) return "botanical";
  if (/\banchor\b|\blighthouse\b|\bcamping\b/.test(source)) return "coastal";
  if (/\bfaith\b|\bprayer\b|\bbuddha\b/.test(source)) return "faith";
  if (/\bskull\b|\bspider\b|\bwiccan\b|\bgothic\b|\bhalloween\b/.test(source)) return "gothic";
  if (/\bchristmas\b|\bholiday\b|\bornament\b/.test(source)) return "seasonal";
  if (/\bwedding\b|\bmarried\b/.test(source)) return "wedding";
  if (/\bbaby\b|\bnewborn\b/.test(source)) return "baby";
  if (/\bmemorial\b/.test(source)) return "memorial";
  if (/\bdiy\b|\bblank\b|\bnumicon\b|\bshapes\b/.test(source)) return "craft";
  return "default";
}

function inferFormatKey(category, source) {
  if (category === "coasters") {
    return "coasters";
  }
  if (category === "bookmarks") {
    return "bookmarks";
  }
  if (/\bdoor\b|\bhanger\b|\bsign\b|\bcloset divider\b/.test(source)) {
    return "door-hanger";
  }
  if (/\btealight\b|\bincense\b/.test(source)) {
    return "decor-piece";
  }
  if (/\bmilestone\b|\bbaby\b|\bcloset divider\b|\bchristmas ornament\b|\bornament\b|\bmoney holder\b|\bcash holder\b|\bgift card holder\b|\bhoneymoon fund\b/.test(source)) {
    return "keepsake";
  }
  if (/\bnumicon\b|\bdinosaur\b|\bblank\b|\bshapes\b|\bdiy\b/.test(source)) {
    return "craft";
  }
  if (/\bplaque\b|\bmemorial\b/.test(source)) {
    return "plaque";
  }
  return "small-gift";
}

function inferAudienceKeys(category, themeKey, source) {
  const keys = [];

  if (themeKey === "cat") keys.push("cat-lovers");
  if (themeKey === "dog") keys.push("dog-lovers");
  if (category === "bookmarks") keys.push("readers", "book-lovers");
  if (themeKey === "fantasy" && category === "bookmarks") keys.push("fantasy-readers");
  if (/\bgamer\b|\bgaming\b|\bmoba\b|\bfps\b/.test(source)) keys.push("gamers");
  if (/\bwedding\b|\bmarried\b/.test(source)) keys.push("newlyweds");
  if (/\bbaby\b|\bmilestone\b|\bcloset divider\b/.test(source)) keys.push("new-parents");
  if (/\bspider\b|\bskull\b|\bgothic\b|\bwiccan\b/.test(source)) keys.push("alternative-decor-fans");
  if (/\bdiy\b|\bblank\b|\bnumicon\b|\bdinosaur shapes\b/.test(source)) keys.push("crafters");

  if (!keys.length && (category === "coasters" || themeKey === "celestial" || themeKey === "botanical" || themeKey === "coastal")) {
    keys.push("cozy-homeowners");
  }

  if (!keys.length) {
    keys.push("gift-shoppers");
  }

  return unique(keys);
}

function inferOccasionKeys(category, formatKey, themeKey, source) {
  const keys = [];

  if (category === "coasters" || formatKey === "decor-piece") {
    keys.push("housewarming");
  }
  if (category === "bookmarks") {
    keys.push("reader-gift");
  }
  if (/\bwedding\b|\bmarried\b/.test(source)) {
    keys.push("wedding", "anniversary");
  }
  if (/\bbaby\b|\bmilestone\b|\bcloset divider\b/.test(source)) {
    keys.push("new-baby");
  }
  if (/\bchristmas\b|\bornament\b/.test(source)) {
    keys.push("christmas");
  }
  if (/\bmemorial\b/.test(source)) {
    keys.push("memorial");
  }
  if (/\bchess\b|\bcheckers\b|\bpoker\b|\bgamer\b|\bgolf\b|\bfishing\b|\bdart\b|\bmotorsport\b/.test(source)) {
    keys.push("hobby-gift");
  }

  keys.push("birthday");

  if (!keys.length) {
    keys.push("everyday-gift");
  } else {
    keys.push("everyday-gift");
  }

  return unique(keys);
}

function inferStyleKeys(category, themeKey, source) {
  const keys = [];

  if (themeKey === "cat" || themeKey === "dog") keys.push("cozy");
  if (themeKey === "celestial") keys.push("celestial", "cozy");
  if (themeKey === "fantasy") keys.push("fantasy");
  if (themeKey === "botanical") keys.push("botanical", "rustic");
  if (themeKey === "gaming") keys.push("playful");
  if (themeKey === "gothic") keys.push("gothic", "alternative");
  if (themeKey === "faith") keys.push("faith-inspired");
  if (themeKey === "seasonal") keys.push("seasonal");
  if (themeKey === "coastal") keys.push("coastal");
  if (/\bpersonalized\b|\bpersonalised\b|\bcalendar\b|\bpet memorial\b|\bjust married\b/.test(source)) {
    keys.push("personalized");
  }
  if (!keys.length && category === "bookmarks") {
    keys.push("minimal");
  }
  if (!keys.length) {
    keys.push("cozy");
  }

  return unique(keys);
}

function inferIntentKeys(category, formatKey, themeKey, audienceKeys, occasionKeys, source) {
  const keys = [];

  if (audienceKeys.includes("cat-lovers")) {
    keys.push("cat-lover-gift", "cozy-home-decor");
  }
  if (category === "bookmarks") {
    keys.push("reader-gift", "book-lover-gift", "bookmark-gift");
    if (themeKey === "fantasy" || /reader gift set/.test(source)) {
      keys.push("fantasy-reader-gift");
    }
  }
  if (formatKey === "decor-piece" || formatKey === "door-hanger" || category === "coasters") {
    keys.push("housewarming-gift");
  }
  if (category === "coasters" && (themeKey === "fantasy" || themeKey === "celestial")) {
    keys.push("reading-nook-gift");
  }
  if (/\bwedding\b|\bmarried\b/.test(source)) {
    keys.push("personalized-wedding-gift");
  }
  if (!keys.length && occasionKeys.includes("housewarming")) {
    keys.push("housewarming-gift");
  }

  return unique(keys);
}

function localizeList(locale, type, keys) {
  return keys.map((key) => LABELS[locale][type][key]).filter(Boolean);
}

function formatSentenceList(locale, value) {
  const items = (Array.isArray(value) ? value : [value])
    .map((item) => String(item || "").trim())
    .filter(Boolean);

  if (!items.length) return "";
  if (items.length === 1) return items[0];

  const conjunctions = {
    nl: "en",
    de: "und",
    fr: "et",
    es: "y",
    pt: "e",
    it: "e",
    en: "and"
  };

  const conjunction = conjunctions[locale] || conjunctions.en;
  if (items.length === 2) {
    return `${items[0]} ${conjunction} ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")} ${conjunction} ${items[items.length - 1]}`;
}

function localizeChip(locale, audienceKeys, occasionKeys, styleKeys) {
  const sourceKeys = [...audienceKeys, ...occasionKeys, ...styleKeys];
  const chips = [];

  for (const key of sourceKeys) {
    const label = LABELS[locale].chip[key];
    if (label && !chips.includes(label)) {
      chips.push(label);
    }
    if (chips.length >= 2) {
      break;
    }
  }

  if (!chips.length) {
    chips.push(locale === "nl" ? "Handgemaakt" : locale === "de" ? "Handgemacht" : "Handmade");
  }

  return chips;
}

function getUsageContext(locale, formatKey, themeKey) {
  const bucket = LABELS[locale].usage[formatKey] || LABELS[locale].usage["small-gift"];
  return bucket[themeKey] || bucket.default;
}

function pickVariant(seed, total) {
  let hash = 0;
  for (const char of String(seed || "")) {
    hash = (hash + char.charCodeAt(0)) % 2147483647;
  }
  return hash % total;
}

function buildCoasterDescription(locale, seed, themeKey, motif, usageContext) {
  const specificHooks = [
    {
      pattern: /tree-of-life/,
      noteGroup: "nature-home",
      labels: {
        en: "tree of life engraving",
        nl: "een levensboomgravure",
        de: "Lebensbaum-Motiv",
        fr: "une gravure arbre de vie",
        es: "un grabado de árbol de la vida",
        pt: "uma gravura de árvore da vida",
        it: "un'incisione albero della vita"
      }
    },
    {
      pattern: /sun-and-moon/,
      noteGroup: "evening",
      labels: {
        en: "sun and moon engraving",
        nl: "een zon- en maangravure",
        de: "Sonne-und-Mond-Motiv",
        fr: "une gravure soleil et lune",
        es: "un grabado de sol y luna",
        pt: "uma gravura de sol e lua",
        it: "un'incisione sole e luna"
      }
    },
    {
      pattern: /zodiac/,
      noteGroup: "astrology",
      labels: {
        en: "zodiac-inspired engraving",
        nl: "een gravure met sterrenbeeldthema",
        de: "Sternzeichen-Motiv",
        fr: "une gravure inspirée du zodiaque",
        es: "un grabado inspirado en el zodiaco",
        pt: "uma gravura inspirada no zodíaco",
        it: "un'incisione ispirata allo zodiaco"
      }
    },
    {
      pattern: /mushroom-moon/,
      noteGroup: "dreamy",
      labels: {
        en: "a moon-and-mushroom motif",
        nl: "een maan- en paddenstoelmotief",
        de: "Mond-und-Pilz-Motiv",
        fr: "un motif lune et champignons",
        es: "un motivo de luna y setas",
        pt: "um motivo de lua e cogumelos",
        it: "un motivo luna e funghi"
      }
    },
    {
      pattern: /cat-and-moon/,
      noteGroup: "cat-home",
      labels: {
        en: "cat and moon engraving",
        nl: "een kat-en-maangravure",
        de: "Katze-und-Mond-Motiv",
        fr: "une gravure chat et lune",
        es: "un grabado de gato y luna",
        pt: "uma gravura de gato e lua",
        it: "un'incisione gatto e luna"
      }
    },
    {
      pattern: /celestial-cat/,
      noteGroup: "cat-home",
      labels: {
        en: "a celestial cat motif",
        nl: "een hemels kattenmotief",
        de: "Katzenmotiv mit Himmelsdetail",
        fr: "un motif chat céleste",
        es: "un motivo de gato celeste",
        pt: "um motivo de gato celeste",
        it: "un motivo gatto celeste"
      }
    },
    {
      pattern: /leaf/,
      noteGroup: "nature-home",
      labels: {
        en: "leaf-inspired engraving",
        nl: "een gravure met bladdetail",
        de: "Blattmotiv",
        fr: "une gravure feuillage",
        es: "un grabado de hojas",
        pt: "uma gravura de folhas",
        it: "un'incisione a foglia"
      }
    },
    {
      pattern: /floral/,
      noteGroup: "nature-home",
      labels: {
        en: "a floral engraving",
        nl: "een bloemengravure",
        de: "Blumenmotiv",
        fr: "une gravure florale",
        es: "un grabado floral",
        pt: "uma gravura floral",
        it: "un'incisione floreale"
      }
    },
    {
      pattern: /bee-motif/,
      noteGroup: "nature-home",
      labels: {
        en: "a bee motif",
        nl: "een bijenmotief",
        de: "Bienenmotiv",
        fr: "un motif abeille",
        es: "un motivo de abeja",
        pt: "um motivo de abelha",
        it: "un motivo ape"
      }
    },
    {
      pattern: /forest-animal/,
      noteGroup: "forest",
      labels: {
        en: "forest-animal detail",
        nl: "een bosdierdetail",
        de: "Waldtier-Motiv",
        fr: "un détail animalier de forêt",
        es: "un detalle de animales del bosque",
        pt: "um detalhe de animais da floresta",
        it: "un dettaglio di animali del bosco"
      }
    },
    {
      pattern: /viking/,
      noteGroup: "norse",
      labels: {
        en: "Viking-inspired engraving",
        nl: "een Vikinggravure",
        de: "Wikinger-Motiv",
        fr: "une gravure d'inspiration viking",
        es: "un grabado de inspiración vikinga",
        pt: "uma gravura de inspiração viking",
        it: "un'incisione di ispirazione vichinga"
      }
    },
    {
      pattern: /buddha/,
      noteGroup: "spiritual",
      labels: {
        en: "Buddha, OM and lotus detail",
        nl: "een Boeddha-, OM- en lotusdetail",
        de: "Buddha-, OM- und Lotus-Motiv",
        fr: "un détail Bouddha, OM et lotus",
        es: "un detalle de Buda, OM y loto",
        pt: "um detalhe de Buda, OM e lótus",
        it: "un dettaglio Buddha, OM e loto"
      }
    },
    {
      pattern: /dartboard/,
      noteGroup: "games",
      labels: {
        en: "a dartboard design",
        nl: "een dartbordmotief",
        de: "Dartscheibenmotiv",
        fr: "un motif cible",
        es: "un diseño de diana",
        pt: "um padrão de alvo de dardos",
        it: "un motivo bersaglio"
      }
    },
    {
      pattern: /sports-ball/,
      noteGroup: "sports",
      labels: {
        en: "sports-ball graphics",
        nl: "sportbalmotieven",
        de: "Sportball-Motiv",
        fr: "des motifs ballons de sport",
        es: "motivos de pelotas deportivas",
        pt: "motivos de bolas de desporto",
        it: "motivi con palloni sportivi"
      }
    },
    {
      pattern: /bitcoin/,
      noteGroup: "desk",
      labels: {
        en: "Bitcoin engraving",
        nl: "een Bitcoingravure",
        de: "Bitcoin-Motiv",
        fr: "une gravure Bitcoin",
        es: "un grabado Bitcoin",
        pt: "uma gravura Bitcoin",
        it: "un'incisione Bitcoin"
      }
    },
    {
      pattern: /wiccan/,
      noteGroup: "gothic",
      labels: {
        en: "painted Wiccan symbols",
        nl: "handbeschilderde wicca-symbolen",
        de: "Wicca-Motiv",
        fr: "des symboles wiccans peints à la main",
        es: "símbolos wiccanos pintados a mano",
        pt: "símbolos wiccanos pintados à mão",
        it: "simboli wiccani dipinti a mano"
      }
    }
  ];

  const hooks = {
    en: {
      cat: ["cat-themed engraving", "a feline accent", "playful cat detail"],
      celestial: ["sun, moon and star detail", "a celestial engraving", "evening-inspired linework"],
      botanical: ["leaf and nature-inspired detail", "a natural engraved pattern", "woodland-style detail"],
      gaming: ["a game-room theme", "a playful hobby motif", "a more playful engraved look"],
      gothic: ["darker symbolic detail", "an alternative engraved mood", "a bolder mystical theme"],
      faith: ["spiritual engraved symbols", "a calm spiritual theme", "meaningful symbolic detail"],
      default: ["a stronger engraved theme", "a warmer handmade accent", "a standout wooden motif"]
    },
    nl: {
      cat: ["een kattenthema", "een speels kattendetail", "een warme kattengravure"],
      celestial: ["een zon-, maan- en sterdetail", "een hemelse gravure", "een rustig avondthema"],
      botanical: ["een natuurlijk bladmotief", "een gravure met natuurdetail", "een warm botanisch accent"],
      gaming: ["een speelser hobbythema", "een game-room detail", "een luchtiger gegraveerd motief"],
      gothic: ["een donkerder symbolisch detail", "een alternatieve sfeer", "een sterker mystiek thema"],
      faith: ["spirituele symbolen", "een rustig spiritueel accent", "een betekenisvolle gravure"],
      default: ["een uitgesproken gravure", "een warmer houten accent", "een motief met meer karakter"]
    },
    de: {
      cat: ["Katzen-Motiv", "Katzen-Detail", "Katzen-Thema"],
      celestial: ["Himmels-Motiv", "Sterne-Detail", "Abend-Thema"],
      botanical: ["Natur-Motiv", "Blatt-Detail", "botanisches Muster"],
      gaming: ["Hobby-Motiv", "Spielzimmer-Thema", "Freizeit-Detail"],
      gothic: ["mystisches Motiv", "alternatives Detail", "dunkleres Thema"],
      faith: ["spirituelles Motiv", "symbolisches Detail", "ruhiges Thema"],
      default: ["graviertes Motiv", "Holz-Detail", "markanteres Thema"]
    },
    fr: {
      cat: ["un motif chat", "un détail félin", "une gravure autour du chat"],
      celestial: ["un décor soleil, lune et étoiles", "une gravure céleste", "une ambiance de soirée"],
      botanical: ["un motif nature", "un détail végétal gravé", "une touche botanique chaleureuse"],
      gaming: ["un thème plus ludique", "un motif pour coin loisirs", "un style gravé plus joueur"],
      gothic: ["une symbolique plus sombre", "une ambiance alternative", "un thème mystique marqué"],
      faith: ["des symboles spirituels", "une note spirituelle apaisante", "une gravure pleine de sens"],
      default: ["un thème gravé plus marqué", "une touche bois chaleureuse", "un motif qui a du caractère"]
    },
    es: {
      cat: ["un motivo de gato", "un detalle felino", "un grabado con tema de gato"],
      celestial: ["un detalle de sol, luna y estrellas", "un grabado celeste", "un aire de final del día"],
      botanical: ["un motivo natural", "un detalle botánico grabado", "un acento vegetal cálido"],
      gaming: ["un tema más lúdico", "un motivo para zona de hobbies", "un diseño grabado más juguetón"],
      gothic: ["una simbología más oscura", "un aire alternativo", "un tema místico más marcado"],
      faith: ["símbolos espirituales", "un detalle espiritual sereno", "un grabado con significado"],
      default: ["un tema grabado con más fuerza", "un acento de madera cálido", "un motivo con más carácter"]
    },
    pt: {
      cat: ["um tema de gato", "um detalhe felino", "uma gravura com inspiração felina"],
      celestial: ["um detalhe de sol, lua e estrelas", "uma gravura celeste", "um ambiente de fim de dia"],
      botanical: ["um motivo natural", "um detalhe botânico gravado", "um apontamento vegetal acolhedor"],
      gaming: ["um tema mais lúdico", "um motivo para zona de hobbies", "um desenho gravado mais leve"],
      gothic: ["uma simbologia mais escura", "um ambiente alternativo", "um tema místico mais marcado"],
      faith: ["símbolos espirituais", "um detalhe espiritual sereno", "uma gravura com significado"],
      default: ["um tema gravado com mais presença", "um apontamento de madeira acolhedor", "um motivo com mais carácter"]
    },
    it: {
      cat: ["un motivo a tema gatto", "un dettaglio felino", "un'incisione ispirata ai gatti"],
      celestial: ["un dettaglio sole, luna e stelle", "un'incisione celeste", "un'atmosfera da fine giornata"],
      botanical: ["un motivo naturale", "un dettaglio botanico inciso", "un accento vegetale caldo"],
      gaming: ["un tema più giocoso", "un motivo per la stanza hobby", "un look inciso più dinamico"],
      gothic: ["una simbologia più scura", "un'atmosfera alternativa", "un tema mistico più deciso"],
      faith: ["simboli spirituali", "un dettaglio spirituale sereno", "un'incisione piena di significato"],
      default: ["un tema inciso più deciso", "un caldo dettaglio in legno", "un motivo con più carattere"]
    }
  };

  const templates = {
    en: [
      `${capitalize(usageContext)} feel more distinctive with %HOOK%.`,
      `Built for ${usageContext}, with %HOOK% that stands out on the table.`,
      `A practical coaster set for ${usageContext}, finished with %HOOK%.`,
      `%HOOK% gives ${usageContext} a more intentional look without overdoing it.`,
      `Made to suit ${usageContext}, with %HOOK% and a more decorative finish.`,
      `For ${usageContext}, this wooden set brings in %HOOK% with a calmer handmade feel.`
    ],
    nl: [
      `Geeft ${usageContext} meer karakter met %HOOK%.`,
      `Gemaakt voor ${usageContext}, met %HOOK% die meteen opvalt op tafel.`,
      `Een praktische onderzetterset voor ${usageContext}, afgewerkt met %HOOK%.`,
      `%HOOK% geeft ${usageContext} meer sfeer zonder te nadrukkelijk te worden.`,
      `Gemaakt voor ${usageContext}, met %HOOK% en een decoratievere afwerking.`,
      `Voor ${usageContext} brengt deze houten set %HOOK% met een rustiger handgemaakt gevoel.`
    ],
    de: [
      `Das %HOOK% bringt auf ${usageContext} mehr Charakter.`,
      `Für ${usageContext} ist das %HOOK% ein Detail, das auf dem Tisch direkt auffällt.`,
      `Ein praktisches Untersetzer-Set für ${usageContext}, gestaltet mit dem %HOOK%.`,
      `Das %HOOK% wirkt auf ${usageContext} stimmungsvoll, ohne zu dominant zu werden.`,
      `Für ${usageContext} sorgt das %HOOK% für eine dekorativere Ausstrahlung.`,
      `Das %HOOK% gibt diesem Holzset für ${usageContext} eine ruhigere handgemachte Wirkung.`
    ],
    fr: [
      `Apporte plus de caractère à ${usageContext} grâce à %HOOK%.`,
      `Pensé pour ${usageContext}, avec %HOOK% qui se remarque vite sur la table.`,
      `Un set de sous-verres pratique pour ${usageContext}, avec %HOOK%.`,
      `%HOOK% donne plus de présence à ${usageContext} sans en faire trop.`,
      `Pensé pour ${usageContext}, avec %HOOK% et une finition plus décorative.`,
      `Pour ${usageContext}, ce set en bois apporte %HOOK% avec un rendu plus apaisé.`
    ],
    es: [
      `Da más carácter a ${usageContext} con %HOOK%.`,
      `Pensado para ${usageContext}, con %HOOK% que destaca enseguida en la mesa.`,
      `Un set de posavasos práctico para ${usageContext}, rematado con %HOOK%.`,
      `%HOOK% da más presencia a ${usageContext} sin cargar demasiado el conjunto.`,
      `Pensado para ${usageContext}, con %HOOK% y un acabado más decorativo.`,
      `Para ${usageContext}, este set de madera aporta %HOOK% con una sensación más serena.`
    ],
    pt: [
      `Dá mais carácter a ${usageContext} com %HOOK%.`,
      `Pensado para ${usageContext}, com %HOOK% que se nota logo na mesa.`,
      `Um conjunto de porta-copos prático para ${usageContext}, rematado com %HOOK%.`,
      `%HOOK% dá mais presença a ${usageContext} sem pesar demasiado no conjunto.`,
      `Pensado para ${usageContext}, com %HOOK% e um acabamento mais decorativo.`,
      `Para ${usageContext}, este conjunto em madeira traz %HOOK% com uma sensação mais serena.`
    ],
    it: [
      `Dà più carattere a ${usageContext} con %HOOK%.`,
      `Pensato per ${usageContext}, con %HOOK% che si nota subito sul tavolo.`,
      `Un set di sottobicchieri pratico per ${usageContext}, rifinito con %HOOK%.`,
      `%HOOK% dà più presenza a ${usageContext} senza appesantire l'insieme.`,
      `Pensato per ${usageContext}, con %HOOK% e una finitura più decorativa.`,
      `Per ${usageContext}, questo set in legno porta %HOOK% con un'atmosfera più calma.`
    ]
  };

  const themeNotes = {
    en: {
      cat: "It fits homes that enjoy a subtle cat theme without taking over the room.",
      celestial: "It suits calmer rooms, evening tables and shoppers who like a little atmosphere.",
      botanical: "It works especially well in homes that already lean into plants, wood and softer decor.",
      gaming: "It feels right in hobby spaces and gift picks with a more playful theme.",
      gothic: "It adds a darker decorative note for buyers who want something less expected.",
      faith: "It gives the table a calmer symbolic detail that still feels easy to use every day.",
      default: "It gives everyday tables a stronger identity than a plain coaster set."
    },
    nl: {
      cat: "Dat past goed in huizen waar een subtiel kattenthema welkom is zonder te overheersen.",
      celestial: "Het werkt vooral goed in rustigere kamers, avondtafels en interieurs met sfeerlicht.",
      botanical: "Het voelt thuis in interieurs met planten, hout en zachtere decoratie.",
      gaming: "Dat sluit mooi aan bij hobbykamers en cadeaus met een speelser thema.",
      gothic: "Het voegt een donkerder accent toe voor kopers die iets minder voorspelbaars zoeken.",
      faith: "Zo komt er een rustiger symbolisch detail op tafel dat toch dagelijks bruikbaar blijft.",
      default: "Zo krijgt een gewone tafel sneller meer eigenheid dan met een standaard set."
    },
    de: {
      cat: "Das passt gut in Wohnräume, in denen ein dezentes Katzenmotiv willkommen ist.",
      celestial: "Es wirkt besonders stimmig in ruhigeren Räumen und auf Tischen mit Abendstimmung.",
      botanical: "Es passt gut in Häuser mit Pflanzen, Holz und weicheren Naturtönen.",
      gaming: "Damit fühlt es sich in Hobbyräumen und verspielteren Geschenkideen sofort passend an.",
      gothic: "So entsteht ein dunklerer Akzent für Käufer, die etwas Ungewöhnlicheres suchen.",
      faith: "Dadurch kommt eine ruhigere symbolische Note auf den Tisch, ohne unpraktisch zu wirken.",
      default: "So bekommt der Tisch schneller mehr Eigenständigkeit als mit einem Standardsatz."
    },
    fr: {
      cat: "Cela convient bien aux intérieurs où le thème chat reste discret et chaleureux.",
      celestial: "Le rendu fonctionne particulièrement bien dans des pièces calmes et des ambiances du soir.",
      botanical: "Cela se marie facilement avec des intérieurs qui aiment les plantes, le bois et les tons doux.",
      gaming: "Le style colle bien aux coins loisirs et aux cadeaux avec un thème plus ludique.",
      gothic: "Cela ajoute une note plus sombre pour les acheteurs qui veulent quelque chose de moins attendu.",
      faith: "Le résultat apporte un détail symbolique plus apaisant, sans perdre le côté pratique.",
      default: "Le résultat donne plus d'identité à la table qu'un set trop standard."
    },
    es: {
      cat: "Queda bien en casas donde el tema de gato se quiere mantener cálido y discreto.",
      celestial: "Funciona especialmente bien en rincones tranquilos y mesas con un ambiente más sereno.",
      botanical: "Encaja con interiores que ya tiran hacia plantas, madera y detalles más suaves.",
      gaming: "Se nota más natural en zonas de hobbies y regalos con un aire más lúdico.",
      gothic: "Aporta un acento más oscuro para quien busca algo menos previsible.",
      faith: "Así suma un detalle simbólico más sereno sin perder el lado práctico.",
      default: "El conjunto da más identidad a la mesa que un set demasiado básico."
    },
    pt: {
      cat: "Fica bem em casas onde o tema de gato deve aparecer de forma discreta e acolhedora.",
      celestial: "Resulta especialmente bem em cantos tranquilos e mesas com um ambiente mais sereno.",
      botanical: "Combina com interiores que já puxam por plantas, madeira e detalhes mais suaves.",
      gaming: "Faz mais sentido em zonas de hobbies e presentes com um lado mais lúdico.",
      gothic: "Acrescenta um acento mais escuro para quem procura algo menos previsível.",
      faith: "Assim junta um detalhe simbólico mais sereno sem perder o lado prático.",
      default: "O conjunto dá mais identidade à mesa do que uma opção demasiado básica."
    },
    it: {
      cat: "Sta bene in case dove il tema gatto deve restare discreto e accogliente.",
      celestial: "Funziona soprattutto in angoli tranquilli e tavoli con un'atmosfera più serena.",
      botanical: "Si abbina bene a interni che amano già piante, legno e dettagli più morbidi.",
      gaming: "Ha più senso in stanze hobby e regali con un lato più giocoso.",
      gothic: "Aggiunge un accento più scuro per chi cerca qualcosa di meno prevedibile.",
      faith: "Così aggiunge un dettaglio simbolico più sereno senza perdere praticità.",
      default: "Il set dà più identità al tavolo rispetto a una soluzione troppo semplice."
    }
  };

  const specificNoteGroups = {
    en: {
      evening: "It feels especially at home on evening tables and in softer, mood-lit rooms.",
      astrology: "It appeals to shoppers who like astrology details in small, usable home accents.",
      dreamy: "It suits reading corners and homes that lean into a more dreamy, story-like mood.",
      "cat-home": "It works well in cozy homes where cat details are meant to feel warm rather than loud.",
      "nature-home": "It suits homes with plants, wood textures and a calmer natural look.",
      forest: "It gives woodland-themed homes and cabin-style corners a little more personality.",
      norse: "It lands well in hobby rooms and gift picks with a clear Norse-inspired edge.",
      spiritual: "It brings in spiritual symbolism without losing the easy, everyday feel of a coaster set.",
      games: "It fits game rooms and playful host gifts better than a more neutral table set would.",
      sports: "It makes sense for sports fans, shared lounges and casual game-day tables.",
      desk: "It works nicely in home offices, desk setups and gifts with a more modern theme.",
      gothic: "It adds a darker decorative layer for buyers who prefer a more alternative style."
    },
    nl: {
      evening: "Het voelt vooral thuis op avondtafels en in kamers met zacht sfeerlicht.",
      astrology: "Het spreekt kopers aan die astrologie graag terugzien in een klein bruikbaar woonaccent.",
      dreamy: "Het past goed in leeshoeken en huizen met een wat dromeriger sfeer.",
      "cat-home": "Het werkt mooi in gezellige huizen waar kattendetails warm mogen voelen en niet te nadrukkelijk.",
      "nature-home": "Het sluit goed aan bij interieurs met planten, houtstructuren en een rustig natuurlijk geheel.",
      forest: "Het geeft woningen met bos- of cabin-sfeer net wat meer eigen karakter.",
      norse: "Het komt goed tot zijn recht in hobbykamers en cadeaus met een duidelijke Noordse richting.",
      spiritual: "Zo voeg je spirituele symboliek toe zonder het praktische karakter van een onderzetterset te verliezen.",
      games: "Het past beter bij spelkamers en speelse cadeaus dan een neutralere tafelset.",
      sports: "Het voelt logisch voor sportliefhebbers, gedeelde woonkamers en tafels op speeldagen.",
      desk: "Het werkt goed in thuiskantoren, op bureaus en in cadeaus met een moderner thema.",
      gothic: "Het voegt een donkerder decorlaag toe voor kopers die liever iets alternatievers kiezen."
    },
    de: {
      evening: "Es passt besonders gut auf Abendtische und in Räume mit weicher Stimmung.",
      astrology: "Es spricht Käufer an, die Astrologie gern in kleinen nutzbaren Wohnakzenten sehen.",
      dreamy: "Es passt gut in Leseecken und Wohnungen mit etwas verträumterer Stimmung.",
      "cat-home": "Es wirkt stimmig in gemütlichen Wohnräumen, in denen Katzendetails warm und nicht zu laut sein sollen.",
      "nature-home": "Es passt gut zu Interieurs mit Pflanzen, Holzstrukturen und einer ruhig natürlichen Wirkung.",
      forest: "Es gibt Wohnräumen mit Wald- oder Hüttencharakter noch etwas mehr Persönlichkeit.",
      norse: "Es funktioniert besonders gut in Hobbyräumen und Geschenken mit klar nordischer Richtung.",
      spiritual: "So kommt spirituelle Symbolik auf den Tisch, ohne die praktische Seite zu verlieren.",
      games: "Es passt besser in Spielzimmer und verspieltere Geschenke als ein neutraleres Set.",
      sports: "Es wirkt stimmig für Sportfans, gemeinsame Wohnbereiche und lockere Spieltag-Tische.",
      desk: "Es passt gut in Homeoffices, auf Schreibtische und zu Geschenken mit modernerem Thema.",
      gothic: "Es bringt eine dunklere Dekoschicht für Käufer, die lieber etwas Alternativeres wählen."
    },
    fr: {
      evening: "Cela trouve facilement sa place sur les tables du soir et dans des pièces à l'ambiance douce.",
      astrology: "Cela parle aux acheteurs qui aiment glisser l'astrologie dans de petits accents utiles pour la maison.",
      dreamy: "Cela va bien dans les coins lecture et les intérieurs à l'atmosphère plus rêveuse.",
      "cat-home": "Cela fonctionne bien dans les maisons cosy où le détail chat doit rester chaleureux et discret.",
      "nature-home": "Cela se marie bien avec des intérieurs où il y a des plantes, du bois et une ambiance naturelle.",
      forest: "Cela donne un peu plus de personnalité aux intérieurs d'inspiration forêt ou chalet.",
      norse: "Cela marche particulièrement bien dans les coins loisirs et les cadeaux à l'inspiration nordique affirmée.",
      spiritual: "On garde ainsi une symbolique spirituelle sans perdre l'usage simple du sous-verre.",
      games: "Cela colle mieux aux pièces de jeux et aux cadeaux ludiques qu'un set plus neutre.",
      sports: "Cela fonctionne bien pour les fans de sport, les salons partagés et les tables de match.",
      desk: "Cela convient bien aux bureaux à domicile et aux cadeaux au thème plus actuel.",
      gothic: "Cela ajoute une couche plus sombre pour les acheteurs qui préfèrent un style plus alternatif."
    },
    es: {
      evening: "Queda especialmente bien en mesas de tarde y rincones con una luz más suave.",
      astrology: "Encaja con compradores a quienes les gusta ver la astrología en pequeños acentos útiles para casa.",
      dreamy: "Va bien en rincones de lectura y casas con una atmósfera más soñadora.",
      "cat-home": "Funciona bien en casas acogedoras donde el detalle de gato debe sentirse cálido y discreto.",
      "nature-home": "Combina con interiores donde ya hay plantas, madera y una sensación más natural.",
      forest: "Da un poco más de personalidad a interiores con aire de bosque o de cabaña.",
      norse: "Funciona especialmente bien en cuartos de hobbies y regalos con una dirección nórdica clara.",
      spiritual: "Así se añade simbolismo espiritual sin perder el lado práctico del set.",
      games: "Encaja mejor en cuartos de juegos y regalos más divertidos que un set neutro.",
      sports: "Tiene sentido para aficionados al deporte, salones compartidos y mesas de día de partido.",
      desk: "Funciona bien en despachos caseros y regalos con un tema más actual.",
      gothic: "Añade una capa más oscura para compradores que prefieren un estilo más alternativo."
    },
    pt: {
      evening: "Resulta especialmente bem em mesas de fim de dia e recantos com luz mais suave.",
      astrology: "Combina com compradores que gostam de ver astrologia em pequenos apontamentos úteis para a casa.",
      dreamy: "Fica bem em cantos de leitura e casas com uma atmosfera mais sonhadora.",
      "cat-home": "Funciona bem em casas acolhedoras onde o detalhe de gato deve ser quente e discreto.",
      "nature-home": "Combina com interiores onde já existem plantas, madeira e um ambiente mais natural.",
      forest: "Dá um pouco mais de personalidade a interiores com ar de floresta ou cabana.",
      norse: "Resulta especialmente bem em salas de hobbies e presentes com uma direção nórdica clara.",
      spiritual: "Assim junta simbolismo espiritual sem perder o lado prático do conjunto.",
      games: "Encaixa melhor em zonas de jogos e presentes mais divertidos do que um conjunto neutro.",
      sports: "Faz sentido para fãs de desporto, salas partilhadas e mesas de dia de jogo.",
      desk: "Funciona bem em escritórios em casa e em presentes com um tema mais atual.",
      gothic: "Acrescenta uma camada mais escura para compradores que preferem um estilo mais alternativo."
    },
    it: {
      evening: "Sta particolarmente bene su tavoli serali e in angoli con una luce più morbida.",
      astrology: "Piace a chi ama vedere l'astrologia in piccoli accenti utili per la casa.",
      dreamy: "Si adatta bene ad angoli lettura e case con un'atmosfera più sognante.",
      "cat-home": "Funziona bene in case accoglienti dove il dettaglio gatto deve restare caldo e discreto.",
      "nature-home": "Si abbina a interni dove ci sono già piante, legno e una sensazione più naturale.",
      forest: "Dà un po' più di personalità a interni con un'aria da bosco o da baita.",
      norse: "Rende bene soprattutto in stanze hobby e regali con una direzione nordica più chiara.",
      spiritual: "Aggiunge simbolismo spirituale senza perdere il lato pratico del set.",
      games: "Si adatta meglio a stanze da gioco e regali più giocosi rispetto a un set neutro.",
      sports: "Ha senso per tifosi, salotti condivisi e tavoli da giorno della partita.",
      desk: "Funziona bene in home office e regali con un tema più attuale.",
      gothic: "Aggiunge uno strato più scuro per chi preferisce uno stile più alternativo."
    }
  };

  const themeHooks = hooks[locale] || hooks.en;
  const chosenHooks = themeHooks[themeKey] || themeHooks.default;
  const matchedSpecificHook = specificHooks.find((entry) => entry.pattern.test(seed));
  const hook = matchedSpecificHook
    ? matchedSpecificHook.labels[locale] || matchedSpecificHook.labels.en
    : chosenHooks[pickVariant(`${seed}-${themeKey}-hook`, chosenHooks.length)];
  const template = (templates[locale] || templates.en)[pickVariant(`${seed}-${themeKey}-template`, (templates[locale] || templates.en).length)];
  const specificNoteBucket = specificNoteGroups[locale] || specificNoteGroups.en;
  const noteBucket = themeNotes[locale] || themeNotes.en;
  const note = matchedSpecificHook
    ? specificNoteBucket[matchedSpecificHook.noteGroup] || noteBucket[themeKey] || noteBucket.default
    : noteBucket[themeKey] || noteBucket.default;

  return `${template.replace("%HOOK%", hook)} ${note}`;
}

function buildShortDescription(locale, seed, formatKey, formatLabel, benefitPrimary, motif, usageContext, audience, themeKey) {
  const specialDescription = SPECIAL_SHORT_DESCRIPTIONS[seed]?.[locale];
  if (specialDescription) {
    return specialDescription;
  }

  if (formatKey === "coasters") {
    return buildCoasterDescription(locale, seed, themeKey, motif, usageContext);
  }

  const audienceLabel = audience[0] || (locale === "nl" ? "cadeauzoekers" : locale === "de" ? "Geschenkkäufer" : "gift shoppers");
  const audiencePhrase = formatSentenceList(locale, audience) || audienceLabel;
  const catalogCopy = {
    en: {
      coasters: [
        `${capitalize(benefitPrimary)} while bringing ${motif} to ${usageContext}.`,
        `A ${formatLabel} for ${usageContext} that feels warmer than a plain table extra.`,
        `A practical choice for everyday drinks with a clear wooden theme.`,
        `A useful gift for homes that like small details with character.`
      ],
      bookmarks: [
        `${capitalize(benefitPrimary)} and adds a little more character to reading time.`,
        `A ${formatLabel} for ${usageContext} that feels small, but still special.`,
        `Made for readers who would rather get one beautiful extra than something generic.`,
        `Fits easily into book gifts, reading journals and quiet evening routines.`
      ],
      "door-hanger": [
        `A wooden door sign for bedrooms, hobby rooms and personal corners.`,
        `Easy to hang and easy to notice from the doorway.`,
        `A playful room detail for gifts that should stay visible every day.`
      ],
      "decor-piece": [
        `Adds a warm wooden accent to ${usageContext}.`,
        `A small decor piece that makes shelves and side tables feel more lived in.`,
        `A decorative gift for shoppers who want something softer than tableware.`
      ],
      keepsake: [
        `Turns a meaningful moment into something easy to keep and display.`,
        `A personal wooden keepsake for milestones, memories and quieter gifts.`,
        `Made for moments that deserve more than a standard card or note.`
      ],
      plaque: [
        `Turns a memory into something you can keep close and display.`,
        `A thoughtful wooden plaque for memorials, milestones and lasting keepsakes.`,
        `A quieter gift for moments that call for something personal and lasting.`
      ],
      craft: [
        `Gives makers a wooden base they can finish in their own way.`,
        `A practical craft piece for projects, lessons and handmade gift ideas.`,
        `Useful for anyone who wants to build a small handmade gift from scratch.`
      ],
      "small-gift": [
        `Adds a small handmade touch to desks, drawers or gift bundles.`,
        `A compact wooden gift that stays useful after the occasion has passed.`,
        `An easy little extra for shoppers who want something simple and handmade.`
      ]
    },
    nl: {
      coasters: [
        `${capitalize(benefitPrimary)} en brengt ${motif} naar ${usageContext}.`,
        `Een ${formatLabel} voor ${usageContext} die warmer oogt dan een gewone tafelset.`,
        `Een praktische keuze voor dagelijkse drankjes met een duidelijk houten thema.`,
        `Een bruikbaar cadeau voor huizen waar kleine details het verschil maken.`
      ],
      bookmarks: [
        `${capitalize(benefitPrimary)} en voegt karakter toe aan het leesmoment.`,
        `Een ${formatLabel} voor ${usageContext} die klein aanvoelt, maar toch speciaal is.`,
        `Gemaakt voor lezers die liever een mooi extraatje krijgen dan iets algemeens.`,
        `Past makkelijk in boekcadeaus, leesjournalen en rustige avondroutines.`
      ],
      "door-hanger": [
        `${capitalize(benefitPrimary)} voor slaapkamerdeuren, hobbykamers en persoonlijke hoekjes.`,
        `Een houten hanger die meteen opvalt en makkelijk op te hangen is.`,
        `Werkt goed als het cadeau persoonlijk en direct zichtbaar mag zijn.`
      ],
      "decor-piece": [
        `Brengt een warm houten accent naar ${usageContext}.`,
        `Een klein decorstuk dat planken en bijzettafels huiselijker maakt.`,
        `Een decoratief cadeau voor wie liever sfeer geeft dan iets puur praktisch.`
      ],
      keepsake: [
        `Maakt van een belangrijk moment iets tastbaars om te bewaren en neer te zetten.`,
        `Een persoonlijk houten aandenken voor mijlpalen, herinneringen en bijzondere dagen.`,
        `Gemaakt voor momenten die meer vragen dan een kaartje alleen.`
      ],
      plaque: [
        `Maakt van een herinnering iets dat je zichtbaar kunt bewaren.`,
        `Een warme houten plaquette voor herinneringen, mijlpalen en blijvende momenten.`,
        `Een stiller cadeau voor gelegenheden die om iets persoonlijks vragen.`
      ],
      craft: [
        `Geeft makers een houten basis om zelf af te werken.`,
        `Een praktische DIY-basis voor projecten, lessen en handgemaakte cadeaus.`,
        `Handig voor wie een klein cadeau liever zelf samenstelt.`
      ],
      "small-gift": [
        `Voegt een klein handgemaakt detail toe aan bureau, lade of cadeaupakket.`,
        `Een compact houten cadeau dat ook na het geven bruikbaar blijft.`,
        `Een eenvoudig extraatje voor wie iets kleins en handgemaakts zoekt.`
      ]
    },
    de: {
      coasters: [
        `${capitalize(benefitPrimary)} und bringt ${motif} in ${usageContext}.`,
        `Ein ${formatLabel} für ${usageContext}, das wärmer wirkt als ein schlichtes Tisch-Extra.`,
        `Eine praktische Wahl für Getränke im Alltag mit einem klaren Holzcharakter.`,
        `Ein nützliches Geschenk für Wohnräume, in denen kleine Details zählen.`
      ],
      bookmarks: [
        `${capitalize(benefitPrimary)} und gibt dem Lesemoment mehr Charakter.`,
        `Ein ${formatLabel}, das ${motif} aufgreift, gut zu ${usageContext} passt und im Kleinen viel Stimmung mitbringt.`,
        `Gedacht für ${audiencePhrase}, die bei Geschenken für Leser lieber ein Detail wählen, das ${motif} aufgreift und gut zu ${usageContext} passt.`,
        `Passt gut zu ${usageContext} und gibt kleinen Geschenken für Leser mehr Persönlichkeit.`
      ],
      "door-hanger": [
        `${capitalize(benefitPrimary)} für Türen, Hobbyräume und persönliche Ecken.`,
        `Ein Holzschild, das sofort auffällt und sich leicht aufhängen lässt.`,
        `Passt gut, wenn das Geschenk persönlich und direkt sichtbar sein soll.`
      ],
      "decor-piece": [
        `Bringt einen warmen Holzakzent in ${usageContext}.`,
        `Ein kleines Deko-Stück, das Regale und Beistelltische wohnlicher macht.`,
        `Ein dekoratives Geschenk für alle, die lieber Atmosphäre als etwas rein Praktisches schenken.`
      ],
      keepsake: [
        `Macht aus einem wichtigen Moment etwas, das sich aufstellen und bewahren lässt.`,
        `Ein persönliches Holzstück für Erinnerungen, Meilensteine und besondere Daten.`,
        `Gedacht für Momente, in denen ein einfaches Kärtchen nicht reicht.`
      ],
      plaque: [
        `Macht aus einer Erinnerung etwas, das sich sichtbar aufstellen lässt.`,
        `Eine warme Holzplakette für Erinnerungen, Meilensteine und bleibende Gesten.`,
        `Ein stilleres Geschenk für Anlässe, die etwas Persönliches brauchen.`
      ],
      craft: [
        `Gibt Kreativen eine Holzbasis, die sie selbst fertigstellen können.`,
        `Eine praktische DIY-Grundlage für Projekte, Unterricht und handgemachte Geschenke.`,
        `Hilfreich für alle, die ein kleines Geschenk lieber selbst gestalten.`
      ],
      "small-gift": [
        `Setzt einen kleinen handgemachten Akzent auf Schreibtisch, Regal oder im Geschenkset.`,
        `Ein kompaktes Holzgeschenk, das auch nach dem Anlass nützlich bleibt.`,
        `Ein einfaches Extra für Käufer, die etwas Kleines und Handgemachtes suchen.`
      ]
    },
    fr: {
      coasters: [
        `${capitalize(benefitPrimary)} et apporte ${motif} à ${usageContext}.`,
        `Un ${formatLabel} pour ${usageContext}, plus chaleureux qu'un simple accessoire de table.`,
        `Un choix pratique pour les boissons du quotidien avec une vraie présence en bois.`,
        `Un cadeau utile pour les maisons où les petits détails comptent.`
      ],
      bookmarks: [
        `${capitalize(benefitPrimary)} et ajoute du caractère au moment de lecture.`,
        `Un ${formatLabel} pour ${usageContext}, petit par la taille mais marqué dans le détail.`,
        `Pensé pour les lecteurs qui préfèrent un bel extra à un petit objet sans âme.`,
        `Se glisse facilement dans un journal de lecture, un coffret cadeau ou une soirée tranquille.`
      ],
      "door-hanger": [
        `${capitalize(benefitPrimary)} sur portes, pièces loisirs et coins personnels.`,
        `Une pièce en bois facile à accrocher et simple à remarquer dès le premier regard.`,
        `Fonctionne bien quand le cadeau doit être personnel et visible tout de suite.`
      ],
      "decor-piece": [
        `Ajoute un accent chaleureux en bois à ${usageContext}.`,
        `Une petite pièce déco qui rend étagères et guéridons plus habités.`,
        `Un cadeau décoratif pour ceux qui préfèrent l'ambiance à l'objet purement pratique.`
      ],
      keepsake: [
        `Transforme un moment important en objet facile à garder et à exposer.`,
        `Un souvenir en bois personnel pour dates marquantes, souvenirs et gestes calmes.`,
        `Pensé pour les moments qui méritent plus qu'une simple carte.`
      ],
      plaque: [
        `Transforme un souvenir en objet à garder près de soi.`,
        `Une plaque en bois attentionnée pour hommages, étapes marquantes et souvenirs durables.`,
        `Un cadeau plus discret pour les moments qui demandent quelque chose de personnel.`
      ],
      craft: [
        `Donne une base en bois que l'on peut finir à sa manière.`,
        `Une pièce DIY pratique pour projets, ateliers et idées cadeaux faites main.`,
        `Utile pour ceux qui préfèrent composer eux-mêmes un petit cadeau.`
      ],
      "small-gift": [
        `Ajoute une petite touche artisanale à un bureau, un tiroir ou un coffret cadeau.`,
        `Un petit cadeau en bois qui reste utile après l'occasion.`,
        `Un complément simple pour ceux qui veulent quelque chose de petit et fait main.`
      ]
    },
    es: {
      coasters: [
        `${capitalize(benefitPrimary)} y lleva ${motif} a ${usageContext}.`,
        `Un ${formatLabel} para ${usageContext} que resulta más cálido que un simple extra de mesa.`,
        `Una opción práctica para bebidas del día a día con presencia clara de madera.`,
        `Un regalo útil para hogares donde los detalles pequeños importan.`
      ],
      bookmarks: [
        `${capitalize(benefitPrimary)} y añade más carácter al momento de lectura.`,
        `Un ${formatLabel} para ${usageContext}, pequeño en tamaño pero especial en el detalle.`,
        `Pensado para lectores que prefieren un detalle bonito antes que algo genérico.`,
        `Encaja bien en diarios de lectura, cajas regalo y noches tranquilas.`
      ],
      "door-hanger": [
        `${capitalize(benefitPrimary)} en puertas, cuartos de aficiones y rincones personales.`,
        `Una pieza de madera fácil de colgar y sencilla de notar desde el primer momento.`,
        `Funciona bien cuando el regalo debe sentirse personal y visible al instante.`
      ],
      "decor-piece": [
        `Añade un acento cálido de madera a ${usageContext}.`,
        `Una pequeña pieza decorativa que hace más habitadas las estanterías y mesas auxiliares.`,
        `Un regalo decorativo para quien prefiere atmósfera antes que algo puramente práctico.`
      ],
      keepsake: [
        `Convierte un momento importante en algo fácil de guardar y mostrar.`,
        `Un recuerdo personal en madera para fechas, memorias y regalos tranquilos.`,
        `Pensado para momentos que merecen más que una tarjeta sencilla.`
      ],
      plaque: [
        `Convierte un recuerdo en algo que se puede mantener cerca.`,
        `Una placa de madera atenta para homenajes, hitos y recuerdos duraderos.`,
        `Un regalo más sereno para ocasiones que piden algo personal.`
      ],
      craft: [
        `Da una base de madera que cada uno puede terminar a su manera.`,
        `Una pieza DIY práctica para proyectos, clases e ideas de regalo hechas a mano.`,
        `Útil para quien prefiere montar un pequeño regalo desde cero.`
      ],
      "small-gift": [
        `Añade un pequeño toque artesanal a escritorio, cajón o caja regalo.`,
        `Un pequeño regalo de madera que sigue siendo útil después de la ocasión.`,
        `Un extra sencillo para quien quiere algo pequeño y hecho a mano.`
      ]
    },
    pt: {
      coasters: [
        `${capitalize(benefitPrimary)} e leva ${motif} para ${usageContext}.`,
        `Um ${formatLabel} para ${usageContext} mais acolhedor do que um simples extra de mesa.`,
        `Uma escolha prática para bebidas do dia a dia com presença clara de madeira.`,
        `Um presente útil para casas onde os pequenos detalhes contam.`
      ],
      bookmarks: [
        `${capitalize(benefitPrimary)} e dá mais carácter ao momento de leitura.`,
        `Um ${formatLabel} para ${usageContext}, pequeno no formato mas especial no detalhe.`,
        `Pensado para leitores que preferem um extra bonito a um objeto genérico.`,
        `Encaixa bem em diários de leitura, caixas-presente e serões tranquilos.`
      ],
      "door-hanger": [
        `${capitalize(benefitPrimary)} em portas, salas de hobbies e cantos pessoais.`,
        `Uma peça de madeira fácil de pendurar e fácil de notar desde o primeiro momento.`,
        `Funciona bem quando o presente deve parecer pessoal e visível logo à partida.`
      ],
      "decor-piece": [
        `Acrescenta um apontamento quente de madeira a ${usageContext}.`,
        `Uma pequena peça decorativa que torna prateleiras e mesas de apoio mais vividas.`,
        `Um presente decorativo para quem prefere ambiente a algo puramente prático.`
      ],
      keepsake: [
        `Transforma um momento importante em algo fácil de guardar e expor.`,
        `Uma recordação pessoal em madeira para datas, memórias e presentes tranquilos.`,
        `Pensado para momentos que merecem mais do que um simples cartão.`
      ],
      plaque: [
        `Transforma uma memória em algo que se pode manter por perto.`,
        `Uma placa de madeira atenciosa para homenagens, marcos e recordações duradouras.`,
        `Um presente mais discreto para ocasiões que pedem algo pessoal.`
      ],
      craft: [
        `Dá uma base de madeira que cada pessoa pode terminar à sua maneira.`,
        `Uma peça DIY prática para projetos, aulas e ideias de presente feitas à mão.`,
        `Útil para quem prefere montar um pequeno presente desde o início.`
      ],
      "small-gift": [
        `Acrescenta um pequeno toque artesanal à secretária, gaveta ou caixa-presente.`,
        `Um pequeno presente de madeira que continua útil depois da ocasião.`,
        `Um extra simples para quem quer algo pequeno e feito à mão.`
      ]
    },
    it: {
      coasters: [
        `${capitalize(benefitPrimary)} e porta ${motif} in ${usageContext}.`,
        `Un ${formatLabel} per ${usageContext} più caldo di un semplice extra da tavola.`,
        `Una scelta pratica per le bevande di ogni giorno con una presenza chiara del legno.`,
        `Un regalo utile per case dove i piccoli dettagli contano davvero.`
      ],
      bookmarks: [
        `${capitalize(benefitPrimary)} e dà più carattere al momento di lettura.`,
        `Un ${formatLabel} per ${usageContext}, piccolo nel formato ma speciale nel dettaglio.`,
        `Pensato per lettori che preferiscono un bel dettaglio a un oggetto qualsiasi.`,
        `Sta bene con diari di lettura, scatole regalo e serate tranquille.`
      ],
      "door-hanger": [
        `${capitalize(benefitPrimary)} su porte, stanze hobby e angoli personali.`,
        `Un pezzo in legno facile da appendere e facile da notare fin dal primo sguardo.`,
        `Funziona bene quando il regalo deve sembrare personale e subito visibile.`
      ],
      "decor-piece": [
        `Aggiunge un accento caldo in legno a ${usageContext}.`,
        `Un piccolo pezzo decorativo che rende più vissute mensole e tavolini.`,
        `Un regalo decorativo per chi preferisce atmosfera a qualcosa di puramente pratico.`
      ],
      keepsake: [
        `Trasforma un momento importante in qualcosa di facile da custodire e mostrare.`,
        `Un ricordo personale in legno per date, memorie e regali più quieti.`,
        `Pensato per momenti che meritano più di un semplice biglietto.`
      ],
      plaque: [
        `Trasforma un ricordo in qualcosa da tenere vicino.`,
        `Una placca in legno attenta per omaggi, traguardi e ricordi duraturi.`,
        `Un regalo più discreto per occasioni che chiedono qualcosa di personale.`
      ],
      craft: [
        `Dà una base in legno che si può finire a modo proprio.`,
        `Un pezzo DIY pratico per progetti, lezioni e idee regalo fatte a mano.`,
        `Utile per chi preferisce costruire da zero un piccolo regalo.`
      ],
      "small-gift": [
        `Aggiunge un piccolo tocco artigianale a scrivania, cassetto o scatola regalo.`,
        `Un piccolo regalo in legno che resta utile anche dopo l'occasione.`,
        `Un extra semplice per chi vuole qualcosa di piccolo e fatto a mano.`
      ]
    }
  };

  const variants = catalogCopy[locale][formatKey] || catalogCopy[locale]["small-gift"];
  return variants[pickVariant(`${seed}-${audienceLabel}`, variants.length)];
}

function buildCollectionDescription(locale, seed, formatKey) {
  const collectionCopy = {
    en: {
      coasters: "A handmade coaster set for coffee tables, desks and easy house gifts.",
      bookmarks: "A handmade bookmark for readers, book gifts and cozy reading routines.",
      "door-hanger": "A wooden door hanger for bedrooms, hobby rooms and personalized corners.",
      "decor-piece": "A wooden decor piece for shelves, side tables and cozy corners.",
      keepsake: "A keepsake-style wooden gift for milestones, memories and special dates.",
      plaque: "A wooden plaque for memorials, milestones and lasting keepsakes.",
      craft: "A wooden craft base for hands-on projects and handmade gifting.",
      "small-gift": "A small wooden gift with a warm handmade feel."
    },
    nl: {
      coasters: "Een handgemaakte onderzetterset voor salontafels, bureaus en warme woonhuizen.",
      bookmarks: "Een handgemaakte bladwijzer voor lezers, boekcadeaus en rustige leesmomenten.",
      "door-hanger": "Een houten deurhanger voor slaapkamers, hobbykamers en persoonlijke hoekjes.",
      "decor-piece": "Een houten decorstuk voor planken, bijzettafels en gezellige hoekjes.",
      keepsake: "Een houten herinneringscadeau voor mijlpalen, herinneringen en bijzondere data.",
      plaque: "Een houten plaquette voor herinneringen, mijlpalen en blijvende momenten.",
      craft: "Een houten DIY-basis voor creatieve projecten en handgemaakte cadeaus.",
      "small-gift": "Een klein houten cadeau met een warme, handgemaakte uitstraling."
    },
    de: {
      coasters: "Ein handgemachtes Untersetzer-Set für Couchtische, Schreibtische und warme Wohnräume.",
      bookmarks: "Ein handgemachtes Holzlesezeichen für Leser, liebevoll ausgewählte Buchpräsente und ruhige Lesemomente.",
      "door-hanger": "Ein Türhänger aus Holz für Schlafzimmer, Hobbyräume und persönliche Ecken.",
      "decor-piece": "Ein Deko-Stück aus Holz für Regale, Beistelltische und gemütliche Ecken.",
      keepsake: "Ein persönliches Holzstück für Meilensteine, Erinnerungen und besondere Daten.",
      plaque: "Eine Holzplakette für Erinnerungen, Meilensteine und bleibende Gesten.",
      craft: "Eine Holzbasis für kreative Projekte und handgemachte Geschenke.",
      "small-gift": "Ein kleines Holzgeschenk mit warmer handgemachter Ausstrahlung."
    },
    fr: {
      coasters: "Un set de sous-verres en bois pour tables basses, bureaux et intérieurs chaleureux.",
      bookmarks: "Un marque-page en bois pour lecteurs, cadeaux livres et lectures paisibles.",
      "door-hanger": "Une suspension de porte en bois pour chambres, pièces loisirs et coins personnels.",
      "decor-piece": "Une pièce déco en bois pour étagères, guéridons et coins cosy.",
      keepsake: "Un cadeau souvenir en bois pour étapes, mémoires et dates spéciales.",
      plaque: "Une plaque en bois pour hommages, étapes marquantes et souvenirs durables.",
      craft: "Une base créative en bois pour projets à finir soi-même.",
      "small-gift": "Un petit cadeau en bois à l'allure artisanale."
    },
    es: {
      coasters: "Un set de posavasos de madera para mesas de centro, escritorios y hogares acogedores.",
      bookmarks: "Un marcapáginas de madera para lectores, regalos de libro y lecturas tranquilas.",
      "door-hanger": "Un colgador de puerta de madera para dormitorios, cuartos de aficiones y rincones personales.",
      "decor-piece": "Una pieza decorativa de madera para estanterías, mesas auxiliares y rincones acogedores.",
      keepsake: "Un recuerdo de madera para hitos, memorias y fechas especiales.",
      plaque: "Una placa de madera para homenajes, hitos y recuerdos duraderos.",
      craft: "Una base creativa de madera para proyectos que se terminan a mano.",
      "small-gift": "Un pequeño regalo de madera con aire artesanal."
    },
    pt: {
      coasters: "Um conjunto de porta-copos em madeira para mesas de centro, secretárias e casas acolhedoras.",
      bookmarks: "Um marcador em madeira para leitores, presentes de livros e leituras tranquilas.",
      "door-hanger": "Um pendente de porta em madeira para quartos, salas de hobbies e cantos pessoais.",
      "decor-piece": "Uma peça decorativa em madeira para prateleiras, mesas de apoio e cantos acolhedores.",
      keepsake: "Uma recordação em madeira para marcos, memórias e datas especiais.",
      plaque: "Uma placa de madeira para homenagens, marcos e recordações duradouras.",
      craft: "Uma base criativa em madeira para projetos a terminar à mão.",
      "small-gift": "Um pequeno presente de madeira com ar artesanal."
    },
    it: {
      coasters: "Un set di sottobicchieri in legno per tavolini, scrivanie e case accoglienti.",
      bookmarks: "Un segnalibro in legno per lettori, regali libro e letture tranquille.",
      "door-hanger": "Una targhetta da porta in legno per camere, stanze hobby e angoli personali.",
      "decor-piece": "Un pezzo decorativo in legno per mensole, tavolini e angoli accoglienti.",
      keepsake: "Un ricordo in legno per tappe importanti, memorie e date speciali.",
      plaque: "Una placca in legno per omaggi, traguardi e ricordi duraturi.",
      craft: "Una base creativa in legno per progetti da finire a mano.",
      "small-gift": "Un piccolo regalo in legno dal gusto artigianale."
    }
  };

  return collectionCopy[locale][formatKey] || collectionCopy[locale]["small-gift"];
}

function buildCtaLabel(locale, name) {
  if (locale === "de") {
    return `${name} auf Etsy ansehen`;
  }
  if (locale === "fr") {
    return `Voir ${name} sur Etsy`;
  }
  if (locale === "es") {
    return `Ver ${name} en Etsy`;
  }
  if (locale === "pt") {
    return `Ver ${name} na Etsy`;
  }
  if (locale === "it") {
    return `Vedi ${name} su Etsy`;
  }
  return locale === "nl"
    ? `${LABELS[locale].ctaPrefix} ${name} op Etsy`
    : `${LABELS[locale].ctaPrefix} ${name} on Etsy`;
}

function getEtsyUrl(rawProduct) {
  return ETSY_URL_OVERRIDES[rawProduct.id] || rawProduct.etsy_url;
}

function normalizeLocalizedName(locale, rawProduct, localizedName) {
  const clean = String(localizedName || "").replace(/\s+/g, " ").trim();
  if (locale !== "nl") {
    if (locale === "de") return fixGermanName(rawProduct);
    if (locale === "fr") return fixFrenchName(rawProduct);
    if (locale === "es") return fixSpanishName(rawProduct);
    if (locale === "pt") return fixPortugueseName(rawProduct);
    if (locale === "it") return fixItalianName(rawProduct);
    return clean;
  }

  return DUTCH_NAME_OVERRIDES[rawProduct.id] || clean;
}

function capitalize(value) {
  if (!value) {
    return "";
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function buildLocaleProduct(locale, rawProduct, localizedName, signals) {
  const labels = LABELS[locale];
  const normalizedName = normalizeLocalizedName(locale, rawProduct, localizedName);
  const audience = localizeList(locale, "audience", signals.audienceKeys);
  const occasions = localizeList(locale, "occasion", signals.occasionKeys);
  const style = localizeList(locale, "style", signals.styleKeys);
  const intentTags = localizeList(locale, "intent", signals.intentKeys);
  const formatLabel = labels.format[signals.formatKey];
  const benefitPrimary = labels.benefitPrimary[signals.formatKey];
  const benefitSecondary = labels.benefitSecondary[signals.formatKey];
  const motif = labels.motif[signals.themeKey] || labels.motif.default;
  const usageContext = getUsageContext(locale, signals.formatKey, signals.themeKey);
  const chips = localizeChip(locale, signals.audienceKeys, signals.occasionKeys, signals.styleKeys);

  return {
    slug: rawProduct.id,
    source_id: rawProduct.id,
    locale,
    category: CATEGORY_MAP[rawProduct.category],
    section: rawProduct.section,
    name: normalizedName,
    price: Number(rawProduct.price_eur).toFixed(2),
    price_label: rawProduct.price_label,
    audience_keys: signals.audienceKeys,
    audience,
    occasion_keys: signals.occasionKeys,
    occasions,
    style_keys: signals.styleKeys,
    style,
    theme_key: signals.themeKey,
    format_key: signals.formatKey,
    format_label: formatLabel,
    motif,
    usage_context: usageContext,
    benefit_primary: benefitPrimary,
    benefit_secondary: benefitSecondary,
    etsy_url: getEtsyUrl(rawProduct),
    image: rawProduct.image,
    image_full: rawProduct.image_full || rawProduct.image,
    image_srcset: rawProduct.image_srcset || "",
    image_sizes: rawProduct.image_sizes || "(max-width: 720px) calc(100vw - 1.25rem), (max-width: 1024px) calc(50vw - 2rem), 360px",
    alt: `${normalizedName} ${labels.brandSuffix}`,
    short_desc: buildShortDescription(locale, rawProduct.id, signals.formatKey, formatLabel, benefitPrimary, motif, usageContext, audience, signals.themeKey),
    collection_desc: buildCollectionDescription(locale, rawProduct.id, signals.formatKey),
    intent_keys: signals.intentKeys,
    intent_tags: intentTags,
    chips,
    cta_label: buildCtaLabel(locale, normalizedName),
    brand_suffix: labels.brandSuffix
  };
}

function buildProductData() {
  const rawEn = readJson("data/products-en.json");
  const rawNl = readJson("data/products.json");
  const nlById = new Map(rawNl.map((product) => [product.id, product]));

  const productsEn = [];
  const productsNl = [];
  const productsDe = [];
  const productsFr = [];
  const productsEs = [];
  const productsPt = [];
  const productsIt = [];

  for (const baseProduct of rawEn) {
    const localizedNl = nlById.get(baseProduct.id);
    if (!localizedNl) {
      continue;
    }

    const nameEn = fixEnglishName(baseProduct.name);
    const source = `${nameEn} ${baseProduct.id}`.toLowerCase();
    const themeKey = pickThemeKey(source);
    const formatKey = inferFormatKey(CATEGORY_MAP[baseProduct.category], source);
    const audienceKeys = inferAudienceKeys(CATEGORY_MAP[baseProduct.category], themeKey, source);
    const occasionKeys = inferOccasionKeys(CATEGORY_MAP[baseProduct.category], formatKey, themeKey, source);
    const styleKeys = inferStyleKeys(CATEGORY_MAP[baseProduct.category], themeKey, source);
    const intentKeys = inferIntentKeys(CATEGORY_MAP[baseProduct.category], formatKey, themeKey, audienceKeys, occasionKeys, source);

    const signals = {
      themeKey,
      formatKey,
      audienceKeys,
      occasionKeys,
      styleKeys,
      intentKeys
    };

    const englishSource = { ...baseProduct, name: nameEn, alt: `${nameEn} by Craftygiftsplace` };
    const germanSource = { ...baseProduct, name: nameEn };
    const frenchSource = { ...baseProduct, name: nameEn };
    const spanishSource = { ...baseProduct, name: nameEn };
    const portugueseSource = { ...baseProduct, name: nameEn };
    const italianSource = { ...baseProduct, name: nameEn };
    const germanName = fixGermanName(germanSource);
    const frenchName = fixFrenchName(frenchSource);
    const spanishName = fixSpanishName(spanishSource);
    const portugueseName = fixPortugueseName(portugueseSource);
    const italianName = fixItalianName(italianSource);

    productsEn.push(buildLocaleProduct("en", englishSource, nameEn, signals));
    productsNl.push(buildLocaleProduct("nl", localizedNl, localizedNl.name, signals));
    productsDe.push(buildLocaleProduct("de", { ...germanSource, name: germanName }, germanName, signals));
    productsFr.push(buildLocaleProduct("fr", { ...frenchSource, name: frenchName }, frenchName, signals));
    productsEs.push(buildLocaleProduct("es", { ...spanishSource, name: spanishName }, spanishName, signals));
    productsPt.push(buildLocaleProduct("pt", { ...portugueseSource, name: portugueseName }, portugueseName, signals));
    productsIt.push(buildLocaleProduct("it", { ...italianSource, name: italianName }, italianName, signals));
  }

  return { productsEn, productsNl, productsDe, productsFr, productsEs, productsPt, productsIt };
}

module.exports = {
  buildProductData
};
