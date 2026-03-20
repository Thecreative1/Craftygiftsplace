const { buildProductData } = require("./lib/product-data");
const { writeJson } = require("./lib/site");

const { productsEn, productsNl, productsDe } = buildProductData();

writeJson("data/products.en.json", productsEn);
writeJson("data/products.nl.json", productsNl);
writeJson("data/products.de.json", productsDe);

console.log(`Synced ${productsEn.length} EN products, ${productsNl.length} NL products and ${productsDe.length} DE products.`);
