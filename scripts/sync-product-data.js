const { buildProductData } = require("./lib/product-data");
const { writeJson } = require("./lib/site");

const { productsEn, productsNl, productsDe, productsFr, productsEs, productsPt, productsIt } = buildProductData();

writeJson("data/products.en.json", productsEn);
writeJson("data/products.nl.json", productsNl);
writeJson("data/products.de.json", productsDe);
writeJson("data/products.fr.json", productsFr);
writeJson("data/products.es.json", productsEs);
writeJson("data/products.pt.json", productsPt);
writeJson("data/products.it.json", productsIt);

console.log(`Synced ${productsEn.length} EN, ${productsNl.length} NL, ${productsDe.length} DE, ${productsFr.length} FR, ${productsEs.length} ES, ${productsPt.length} PT and ${productsIt.length} IT products.`);
