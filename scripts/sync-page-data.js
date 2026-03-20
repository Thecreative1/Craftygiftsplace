const { pagesEn, pagesNl } = require("./lib/page-data");
const { writeJson } = require("./lib/site");

writeJson("data/pages.en.json", pagesEn);
writeJson("data/pages.nl.json", pagesNl);

console.log(`Synced ${pagesEn.length} EN pages and ${pagesNl.length} NL pages.`);
