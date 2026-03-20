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
  "fantasy-sword-wooden-bookmark": "Fantasy zwaard houten bladwijzer",
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
  "upcycled-ram-keychain": "Upcyclede RAM-sleutelhanger"
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
  "dragon-eye-wooden-bookmark": "Drachenauge Holzlesezeichen",
  "dragon-wooden-bookmark": "Drachen Holzlesezeichen",
  "epic-fantasy-door-sign": "Episches Fantasy Türschild",
  "epic-fantasy-wooden-bookmark": "Episches Fantasy Holzlesezeichen",
  "fantasy-reader-gift-set": "Fantasy Lesegeschenk Set",
  "fantasy-sword-wooden-bookmark": "Fantasy Schwert Holzlesezeichen",
  "fantasy-wooden-coasters": "Fantasy Holzuntersetzer",
  "floral-wooden-coasters": "Blumenmotiv Holzuntersetzer",
  "forest-animal-wooden-coasters": "Waldtiere Holzuntersetzer",
  "laser-birch-wood-incense-burner": "Räucherhalter aus Birkenholz",
  "leaf-wooden-coasters": "Blattmotiv Holzuntersetzer",
  "lighthouse-wooden-bookmark": "Leuchtturm Holzlesezeichen",
  "moon-cat-shadow-tealight-holder": "Mondkatzen Teelichthalter",
  "mushroom-moon-wooden-coasters": "Pilz und Mond Holzuntersetzer",
  "personalized-feather-wooden-bookmark": "Personalisiertes Feder Holzlesezeichen",
  "personalized-just-married-wooden-door-hanger": "Personalisierter Frisch verheiratet Holz Türhänger",
  "personalized-pet-memorial-plaque": "Personalisierte Haustier-Gedenkplakette",
  "picasso-animal-line-art-wooden-coasters": "Picasso Tier Line Art Holzuntersetzer",
  "sun-and-moon-wooden-coasters": "Sonne und Mond Holzuntersetzer",
  "tree-of-life-wooden-coasters": "Lebensbaum Holzuntersetzer",
  "zodiac-wooden-coasters": "Sternzeichen Holzuntersetzer"
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
      "reader-gift": "reader gifting",
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
      "cat-lovers": "Cat lover",
      "dog-lovers": "Dog lover",
      readers: "Reader gift",
      "book-lovers": "Bookish gift",
      "fantasy-readers": "Fantasy reader",
      gamers: "Gamer gift",
      newlyweds: "Newlyweds",
      "new-parents": "New baby",
      "cozy-homeowners": "Cozy decor",
      "alternative-decor-fans": "Bold decor",
      crafters: "DIY gift",
      housewarming: "Housewarming",
      wedding: "Wedding gift",
      anniversary: "Keepsake",
      christmas: "Seasonal decor",
      memorial: "Keepsake gift",
      personalized: "Personalized",
      cozy: "Cozy style",
      celestial: "Celestial decor",
      fantasy: "Fantasy decor",
      botanical: "Nature theme",
      playful: "Playful theme",
      gothic: "Gothic mood",
      coastal: "Home styling",
      seasonal: "Seasonal decor"
    },
    format: {
      coasters: "coaster set",
      bookmarks: "bookmark",
      "door-hanger": "door hanger",
      "decor-piece": "decor piece",
      keepsake: "keepsake piece",
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
        default: "shelves, side tables and gift-ready corners"
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
      "reader-gift": "lezerscadeau",
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
      "cat-lovers": "Kattenliefhebber",
      "dog-lovers": "Hondenliefhebber",
      readers: "Lezerscadeau",
      "book-lovers": "Boekcadeau",
      "fantasy-readers": "Fantasylezer",
      gamers: "Gamercadeau",
      newlyweds: "Pasgetrouwd",
      "new-parents": "Nieuwe baby",
      "cozy-homeowners": "Gezellige decoratie",
      "alternative-decor-fans": "Karaktervol decor",
      crafters: "DIY cadeau",
      housewarming: "Verhuiscadeau",
      wedding: "Bruiloftscadeau",
      anniversary: "Bewaarcadeau",
      christmas: "Seizoensdecoratie",
      memorial: "Herinneringscadeau",
      personalized: "Persoonlijk",
      cozy: "Warme stijl",
      celestial: "Hemelse decoratie",
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
      keepsake: "bewaarcadeau",
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
        default: "dagelijkse tafels, bureaus en makkelijke cadeaupakketten"
      },
      bookmarks: {
        fantasy: "boekenstapels, avondlezen en fantasyplanken",
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
        default: "planken, bijzettafels en cadeauwaardige hoekjes"
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
      "reader-gift": "Lesegeschenk",
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
      "cat-lovers": "Katzenfan",
      "dog-lovers": "Hundefan",
      readers: "Lesegeschenk",
      "book-lovers": "Buchgeschenk",
      "fantasy-readers": "Fantasy-Leser",
      gamers: "Gamergeschenk",
      newlyweds: "Frisch verheiratet",
      "new-parents": "Neues Baby",
      "cozy-homeowners": "Gemütliche Deko",
      "alternative-decor-fans": "Markante Deko",
      crafters: "DIY Geschenk",
      housewarming: "Einzug",
      wedding: "Hochzeitsgeschenk",
      anniversary: "Erinnerungsstück",
      christmas: "Saisonale Deko",
      memorial: "Erinnerungsgeschenk",
      personalized: "Personalisiert",
      cozy: "Warmer Stil",
      celestial: "Himmlische Deko",
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
      "decor-piece": "Dekoobjekt",
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
      bookmarks: "macht ein Buchgeschenk persönlicher",
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
        cat: "Kaffeetischen, Schreibtischen und gemütlichen Ecken",
        dog: "Alltagstischen und haustierfreundlichen Räumen",
        celestial: "Kaffeetischen, Beistelltischen und stimmungsvollen Räumen",
        fantasy: "Leseecken, Schreibtischen und Hobbyräumen",
        gaming: "Spielzimmern, Schreibtischen und Wochenendtischen",
        botanical: "Küchen, Gästetischen und warmen Wohnräumen",
        coastal: "Gästezimmern, Terrassen und entspannten Wohnungen",
        gothic: "Beistelltischen, Regalen und markanten Deko-Konzepten",
        default: "Alltagstischen, Schreibtischen und einfachen Geschenksets"
      },
      bookmarks: {
        fantasy: "Buchstapeln, Abendlektüre und Fantasy-Regalen",
        celestial: "Lesetagebüchern, Nachttischen und ruhigen Lesestunden",
        botanical: "Buchgeschenken, Stofftaschen und stillen Lesemomenten",
        gothic: "Dark-Academia-Regalen und dramatischen Leseecken",
        default: "Buchstapeln, Lesetagebüchern und durchdachten Geschenkboxen"
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
        default: "Regalen, Beistelltischen und geschenkfertigen Wohnwinkeln"
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
    .replace(/\bOnderkant\b/g, "Back");
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
  if (/\bmilestone\b|\bbaby\b|\bcloset divider\b|\bchristmas ornament\b|\bornament\b/.test(source)) {
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

function buildShortDescription(locale, seed, formatLabel, benefitPrimary, motif, usageContext, audience, occasions) {
  const audienceLabel = audience[0] || (locale === "nl" ? "cadeauzoekers" : locale === "de" ? "Geschenkkäufer" : "gift shoppers");
  const occasionLabel = occasions[0] || (locale === "nl" ? "dagelijks gebruik" : locale === "de" ? "kleine Alltagsgeschenke" : "everyday gifting");
  let variants;

  if (locale === "nl") {
    variants = [
      `${capitalize(benefitPrimary)} en brengt ${motif} naar ${usageContext}.`,
      `Een ${formatLabel} met ${motif}, mooi voor ${usageContext}.`,
      `Past goed bij ${usageContext}, met ${motif} en een warme handgemaakte uitstraling.`,
      `Een fijne keuze voor ${occasionLabel}, met ${motif} en dagelijks gemak.`,
      `Gemaakt voor ${audienceLabel}, met ${motif} en een rustige uitstraling voor ${usageContext}.`
    ];
  } else if (locale === "de") {
    variants = [
      `${capitalize(benefitPrimary)} und bringt ${motif} in ${usageContext}.`,
      `Ein ${formatLabel} mit ${motif}, das gut zu ${usageContext} passt.`,
      `Wirkt stimmig in ${usageContext}, während ${motif} den handgemachten Eindruck warm hält.`,
      `Eine unkomplizierte Wahl für ${occasionLabel}, mit ${motif} und praktischem Nutzen im Alltag.`,
      `Gemacht für ${audienceLabel}, mit ${motif} und einer ruhigeren handgemachten Wirkung für ${usageContext}.`
    ];
  } else {
    variants = [
      `${capitalize(benefitPrimary)} and brings ${motif} to ${usageContext}.`,
      `A ${formatLabel} with ${motif} that works beautifully in ${usageContext}.`,
      `Feels right for ${usageContext}, with ${motif} keeping the handmade look warm.`,
      `An easy choice for ${occasionLabel}, with ${motif} and everyday usefulness.`,
      `Made for ${audienceLabel}, with ${motif} and a softer handmade feel for ${usageContext}.`
    ];
  }

  return variants[pickVariant(seed, variants.length)];
}

function buildCollectionDescription(locale, seed, formatLabel, audience, occasions) {
  const audienceLabel = audience[0] || (locale === "nl" ? "cadeauzoekers" : locale === "de" ? "Geschenkkäufer" : "gift shoppers");
  const occasionLabel = occasions[0] || (locale === "nl" ? "dagelijks gebruik" : locale === "de" ? "kleinen Geschenkideen" : "everyday gifting");
  let variants;

  if (locale === "nl") {
    variants = [
      `Een ${formatLabel} die prettig voelt voor ${audienceLabel} en momenten zoals ${occasionLabel}.`,
      `Een handgemaakte ${formatLabel} voor ${audienceLabel} die iets warms en bruikbaars zoeken.`,
      `Een ${formatLabel} met een rustige uitstraling, passend bij ${occasionLabel} en alledaags gebruik.`
    ];
  } else if (locale === "de") {
    variants = [
      `Ein ${formatLabel}, das sich für ${audienceLabel} und Anlässe wie ${occasionLabel} leicht auswählen lässt.`,
      `Ein handgemachtes ${formatLabel} für ${audienceLabel}, die etwas Warmes und Nützliches suchen.`,
      `Ein ${formatLabel} mit ruhiger Ausstrahlung, passend zu ${occasionLabel} und dem Alltag.`
    ];
  } else {
    variants = [
      `A ${formatLabel} that feels easy to choose for ${audienceLabel} and moments like ${occasionLabel}.`,
      `A handmade ${formatLabel} for ${audienceLabel} who want something warm and useful.`,
      `A ${formatLabel} with a calm look that suits ${occasionLabel} and everyday use.`
    ];
  }

  return variants[pickVariant(`${seed}-collection`, variants.length)];
}

function buildCtaLabel(locale, name) {
  if (locale === "de") {
    return "Auf Etsy ansehen";
  }
  return locale === "nl"
    ? `${LABELS[locale].ctaPrefix} ${name} op Etsy`
    : `${LABELS[locale].ctaPrefix} ${name} on Etsy`;
}

function normalizeLocalizedName(locale, rawProduct, localizedName) {
  const clean = String(localizedName || "").replace(/\s+/g, " ").trim();
  if (locale !== "nl") {
    if (locale === "de") {
      return fixGermanName(rawProduct);
    }
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
    etsy_url: rawProduct.etsy_url,
    image: rawProduct.image,
    image_srcset: rawProduct.image_srcset || "",
    image_sizes: rawProduct.image_sizes || "(max-width: 720px) calc(100vw - 1.25rem), (max-width: 1024px) calc(50vw - 2rem), 360px",
    alt: `${normalizedName} ${labels.brandSuffix}`,
    short_desc: buildShortDescription(locale, rawProduct.id, formatLabel, benefitPrimary, motif, usageContext, audience, occasions),
    collection_desc: buildCollectionDescription(locale, rawProduct.id, formatLabel, audience, occasions),
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
    const germanName = fixGermanName(germanSource);

    productsEn.push(buildLocaleProduct("en", englishSource, nameEn, signals));
    productsNl.push(buildLocaleProduct("nl", localizedNl, localizedNl.name, signals));
    productsDe.push(buildLocaleProduct("de", { ...germanSource, name: germanName }, germanName, signals));
  }

  return { productsEn, productsNl, productsDe };
}

module.exports = {
  buildProductData
};
