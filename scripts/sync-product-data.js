const { buildProductData } = require("./lib/product-data");
const { writeJson } = require("./lib/site");

const { productsEn, productsNl } = buildProductData();

writeJson("data/products.en.json", productsEn);
writeJson("data/products.nl.json", productsNl);

console.log(`Synced ${productsEn.length} EN products and ${productsNl.length} NL products.`);
