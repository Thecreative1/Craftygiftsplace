const { pagesEn, pagesNl } = require("./lib/page-data");
const { pagesDe } = require("./lib/page-data.de");
const { pagesFr } = require("./lib/page-data.fr");
const { pagesEs } = require("./lib/page-data.es");
const { pagesPt } = require("./lib/page-data.pt");
const { pagesIt } = require("./lib/page-data.it");
const { readJson, writeJson } = require("./lib/site");

const ALTERNATE_GROUPS = [
  { en: "/en/index.html", nl: "/index.html", de: "/de/index.html", fr: "/fr/index.html", es: "/es/index.html", pt: "/pt/index.html", it: "/it/index.html" },
  { en: "/en/pages/wooden-coasters.html", nl: "/pages/onderzetters.html", de: "/de/pages/holzuntersetzer.html", fr: "/fr/pages/sous-verres-en-bois.html", es: "/es/pages/posavasos-de-madera.html", pt: "/pt/pages/porta-copos-de-madeira.html", it: "/it/pages/sottobicchieri-in-legno.html" },
  { en: "/en/pages/wooden-bookmarks.html", nl: "/pages/bladwijzers.html", de: "/de/pages/holzlesezeichen.html", fr: "/fr/pages/marque-pages-en-bois.html", es: "/es/pages/marcapaginas-de-madera.html", pt: "/pt/pages/marcadores-de-livros-de-madeira.html", it: "/it/pages/segnalibri-in-legno.html" },
  { en: "/en/pages/wooden-gifts.html", nl: "/pages/houten-cadeaus.html", de: "/de/pages/holzgeschenke.html", fr: "/fr/pages/cadeaux-en-bois.html", es: "/es/pages/regalos-de-madera.html", pt: "/pt/pages/presentes-de-madeira.html", it: "/it/pages/regali-in-legno.html" },
  { en: "/en/pages/contact.html", nl: "/pages/contact.html", de: "/de/pages/kontakt.html", fr: "/fr/pages/contact.html", es: "/es/pages/contacto.html", pt: "/pt/pages/contacto.html", it: "/it/pages/contatto.html" },
  { en: "/en/pages/cat-lover-gifts.html", nl: "/pages/cadeaus-voor-kattenliefhebbers.html", de: "/de/pages/geschenke-fuer-katzenliebhaber.html", fr: "/fr/pages/cadeaux-pour-amoureux-des-chats.html", es: "/es/pages/regalos-para-amantes-de-los-gatos.html", pt: "/pt/pages/presentes-para-amantes-de-gatos.html", it: "/it/pages/regali-per-amanti-dei-gatti.html" },
  { en: "/en/pages/reader-gifts.html", nl: "/pages/lezerscadeaus.html", de: "/de/pages/geschenke-fuer-leser.html", fr: "/fr/pages/cadeaux-pour-lecteurs.html", es: "/es/pages/regalos-para-lectores.html", pt: "/pt/pages/presentes-para-leitores.html", it: "/it/pages/regali-per-lettori.html" },
  { en: "/en/pages/housewarming-gifts.html", nl: "/pages/verhuiscadeaus.html", de: "/de/pages/einzugsgeschenke.html", fr: "/fr/pages/cadeaux-de-cremaillere.html", es: "/es/pages/regalos-para-casa-nueva.html", pt: "/pt/pages/presentes-de-casa-nova.html", it: "/it/pages/regali-per-la-casa-nuova.html" },
  { en: "/en/pages/why-wooden-gifts.html", nl: "/pages/waarom-houten-cadeaus.html", de: "/de/pages/warum-holzgeschenke.html", fr: "/fr/pages/pourquoi-des-cadeaux-en-bois.html", es: "/es/pages/por-que-regalos-de-madera.html", pt: "/pt/pages/por-que-presentes-de-madeira.html", it: "/it/pages/perche-regali-in-legno.html" },
  { en: "/en/pages/personalization.html", nl: "/pages/personalisatie.html", de: "/de/pages/personalisierung.html", fr: "/fr/pages/personnalisation.html", es: "/es/pages/personalizacion.html", pt: "/pt/pages/personalizacao.html", it: "/it/pages/personalizzazione.html" },
  { en: "/en/pages/baby-bliss.html", nl: "/pages/baby-bliss.html", de: "/de/pages/baby-erstausstattung.html", fr: "/fr/pages/baby-bliss.html", es: "/es/pages/baby-bliss.html", pt: "/pt/pages/baby-bliss.html", it: "/it/pages/baby-bliss.html" },
  { en: "/en/pages/candle-holders.html", nl: "/pages/kaarsenhouders.html", de: "/de/pages/kerzenhalter.html", fr: "/fr/pages/porte-bougies.html", es: "/es/pages/portavelas.html", pt: "/pt/pages/porta-velas.html", it: "/it/pages/portacandele.html" },
  { en: "/en/pages/christmas.html", nl: "/pages/kerst.html", de: "/de/pages/weihnachten.html", fr: "/fr/pages/noel.html", es: "/es/pages/navidad.html", pt: "/pt/pages/natal.html", it: "/it/pages/natale.html" },
  { en: "/en/pages/diy.html", nl: "/pages/doe-het-zelf.html", de: "/de/pages/do-it-yourself.html", fr: "/fr/pages/bricolage.html", es: "/es/pages/manualidades.html", pt: "/pt/pages/faca-voce-mesmo.html", it: "/it/pages/fai-da-te.html" },
  { en: "/en/pages/door-hangers.html", nl: "/pages/deurtekens.html", de: "/de/pages/tuerschilder.html", fr: "/fr/pages/accroches-portes.html", es: "/es/pages/colgadores-de-puerta.html", pt: "/pt/pages/cabides-de-porta.html", it: "/it/pages/appendiporte.html" },
  { en: "/en/pages/educational-toys-and-games.html", nl: "/pages/educatief-speelgoed.html", de: "/de/pages/lernspielzeug.html", fr: "/fr/pages/jouets-educatifs.html", es: "/es/pages/juguetes-educativos.html", pt: "/pt/pages/brinquedos-educativos.html", it: "/it/pages/giocattoli-educativi.html" },
  { en: "/en/pages/funny-presents.html", nl: "/pages/grappige-cadeaus.html", de: "/de/pages/lustige-geschenke.html", fr: "/fr/pages/cadeaux-rigolos.html", es: "/es/pages/regalos-divertidos.html", pt: "/pt/pages/prendas-divertidas.html", it: "/it/pages/regali-divertenti.html" },
  { en: "/en/pages/gifts-for-it-and-gamers.html", nl: "/pages/cadeaus-voor-gamers.html", de: "/de/pages/geschenke-fuer-gamer.html", fr: "/fr/pages/cadeaux-pour-gamers.html", es: "/es/pages/regalos-para-gamers.html", pt: "/pt/pages/presentes-para-gamers.html", it: "/it/pages/regali-per-gamer.html" },
  { en: "/en/pages/incense-burners.html", nl: "/pages/wierookbranders.html", de: "/de/pages/raucherstabchenhalter.html", fr: "/fr/pages/brule-encens.html", es: "/es/pages/quemadores-incienso.html", pt: "/pt/pages/queimadores-incenso.html", it: "/it/pages/brucia-incenso.html" },
  { en: "/en/pages/personalized-items.html", nl: "/pages/gepersonaliseerde-items.html", de: "/de/pages/personalisierte-artikel.html", fr: "/fr/pages/articles-personnalises.html", es: "/es/pages/articulos-personalizados.html", pt: "/pt/pages/artigos-personalizados.html", it: "/it/pages/articoli-personalizzati.html" },
  { en: "/en/pages/pet-memorial.html", nl: "/pages/huisdier-herdenking.html", de: "/de/pages/haustier-gedenkgeschenke.html", fr: "/fr/pages/memorial-animaux.html", es: "/es/pages/memorial-mascotas.html", pt: "/pt/pages/memorial-animais.html", it: "/it/pages/memorial-animali.html" },
  { en: "/en/pages/readers-kit.html", nl: "/pages/lezerspakket.html", de: "/de/pages/lesepaket.html", fr: "/fr/pages/kit-lecteur.html", es: "/es/pages/kit-lector.html", pt: "/pt/pages/kit-leitor.html", it: "/it/pages/kit-lettore.html" },
  { en: "/en/pages/wedding.html", nl: "/pages/bruiloft.html", de: "/de/pages/hochzeit.html", fr: "/fr/pages/mariage.html", es: "/es/pages/boda.html", pt: "/pt/pages/casamento.html", it: "/it/pages/matrimonio.html" }
];

function clonePages(pages) {
  return pages.map((page) => JSON.parse(JSON.stringify(page)));
}

function applyHomeContent(pageSet, locale) {
  const homeContent = readJson(`data/home.${locale}.json`);
  const homeIndex = pageSet.findIndex((page) => page.template === "home");
  if (homeIndex === -1) {
    throw new Error(`Missing home page for locale ${locale}.`);
  }

  pageSet[homeIndex] = {
    ...pageSet[homeIndex],
    ...homeContent,
    template: "home",
    locale
  };
}

function attachAlternates(groups, pageSets) {
  const allPages = Object.values(pageSets).flat();
  const byPath = new Map(allPages.map((page) => [page.path, page]));

  groups.forEach((group) => {
    Object.entries(group).forEach(([locale, path]) => {
      const page = byPath.get(path);
      if (!page) {
        throw new Error(`Missing page "${path}" for locale ${locale}.`);
      }
      page.alternatePaths = group;
    });
  });
}

try {
  const pageSets = {
    en: clonePages(pagesEn),
    nl: clonePages(pagesNl),
    de: clonePages(pagesDe),
    fr: clonePages(pagesFr),
    es: clonePages(pagesEs),
    pt: clonePages(pagesPt),
    it: clonePages(pagesIt)
  };

  applyHomeContent(pageSets.en, "en");
  applyHomeContent(pageSets.nl, "nl");
  applyHomeContent(pageSets.de, "de");
  applyHomeContent(pageSets.fr, "fr");
  applyHomeContent(pageSets.es, "es");
  applyHomeContent(pageSets.pt, "pt");
  applyHomeContent(pageSets.it, "it");

  attachAlternates(ALTERNATE_GROUPS, pageSets);

  writeJson("data/pages.en.json", pageSets.en);
  writeJson("data/pages.nl.json", pageSets.nl);
  writeJson("data/pages.de.json", pageSets.de);
  writeJson("data/pages.fr.json", pageSets.fr);
  writeJson("data/pages.es.json", pageSets.es);
  writeJson("data/pages.pt.json", pageSets.pt);
  writeJson("data/pages.it.json", pageSets.it);

  console.log(`Synced ${pageSets.en.length} EN, ${pageSets.nl.length} NL, ${pageSets.de.length} DE, ${pageSets.fr.length} FR, ${pageSets.es.length} ES, ${pageSets.pt.length} PT and ${pageSets.it.length} IT pages.`);
} catch (err) {
  console.error("sync-page-data failed:", err.message);
  process.exit(1);
}
