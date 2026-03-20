const { pagesEn, pagesNl } = require("./lib/page-data");
const { pagesDe } = require("./lib/page-data.de");
const { readJson, writeJson } = require("./lib/site");

const ALTERNATE_GROUPS = [
  { en: "/en/index.html", nl: "/index.html", de: "/de/index.html" },
  { en: "/en/pages/wooden-coasters.html", nl: "/pages/onderzetters.html", de: "/de/pages/holzuntersetzer.html" },
  { en: "/en/pages/wooden-bookmarks.html", nl: "/pages/bladwijzers.html", de: "/de/pages/holzlesezeichen.html" },
  { en: "/en/pages/wooden-gifts.html", nl: "/pages/houten-cadeaus.html", de: "/de/pages/holzgeschenke.html" },
  { en: "/en/pages/contact.html", nl: "/pages/contact.html", de: "/de/pages/kontakt.html" },
  { en: "/en/pages/cat-lover-gifts.html", nl: "/pages/cadeaus-voor-kattenliefhebbers.html", de: "/de/pages/geschenke-fuer-katzenliebhaber.html" },
  { en: "/en/pages/reader-gifts.html", nl: "/pages/lezerscadeaus.html", de: "/de/pages/geschenke-fuer-leser.html" },
  { en: "/en/pages/housewarming-gifts.html", nl: "/pages/verhuiscadeaus.html", de: "/de/pages/einzugsgeschenke.html" }
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
  de: clonePages(pagesDe)
};

applyHomeContent(pageSets.en, "en");
applyHomeContent(pageSets.nl, "nl");
applyHomeContent(pageSets.de, "de");

attachAlternates(ALTERNATE_GROUPS, pageSets);

writeJson("data/pages.en.json", pageSets.en);
writeJson("data/pages.nl.json", pageSets.nl);
writeJson("data/pages.de.json", pageSets.de);

console.log(`Synced ${pageSets.en.length} EN pages, ${pageSets.nl.length} NL pages and ${pageSets.de.length} DE pages.`);
