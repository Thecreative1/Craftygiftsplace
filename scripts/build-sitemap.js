const { canonicalUrl, readJson, writeText } = require("./lib/site");

function lastmod() {
  return new Date().toISOString().slice(0, 10);
}

function buildSitemap() {
  const pages = [...readJson("data/pages.en.json"), ...readJson("data/pages.nl.json"), ...readJson("data/pages.de.json")];
  const stamp = lastmod();

  const urls = pages
    .map((page) => {
      const alternates = Object.entries(page.alternatePaths || {})
        .map(([locale, path]) => `<xhtml:link rel="alternate" hreflang="${locale}" href="${canonicalUrl(path)}" />`)
        .join("");

      return `  <url>\n    <loc>${canonicalUrl(page.path)}</loc>\n    <lastmod>${stamp}</lastmod>\n${alternates ? `    ${alternates}\n` : ""}  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xhtml=\"http://www.w3.org/1999/xhtml\">\n${urls}\n</urlset>`;
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${canonicalUrl("/sitemap.xml")}`;

  writeText("sitemap.xml", xml);
  writeText("robots.txt", robots);
}

buildSitemap();
console.log("Built sitemap.xml and robots.txt.");
