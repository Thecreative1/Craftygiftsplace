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
  { en: "/en/pages/personalization.html", nl: "/pages/personalisatie.html", de: "/de/pages/personalisierung.html", fr: "/fr/pages/personnalisation.html", es: "/es/pages/personalizacion.html", pt: "/pt/pages/personalizacao.html", it: "/it/pages/personalizzazione.html" }
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
