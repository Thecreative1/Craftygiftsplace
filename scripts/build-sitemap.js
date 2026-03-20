const { canonicalUrl, readJson, writeText } = require("./lib/site");

function lastmod() {
  return new Date().toISOString().slice(0, 10);
}

function buildSitemap() {
  const pages = [...readJson("data/pages.en.json"), ...readJson("data/pages.nl.json")];
  const byPath = new Map(pages.map((page) => [page.path, page]));
  const stamp = lastmod();

  const urls = pages
    .map((page) => {
      const pair = byPath.get(page.pairPath);
      const alternates = pair
        ? [
            `<xhtml:link rel="alternate" hreflang="${page.locale}" href="${canonicalUrl(page.path)}" />`,
            `<xhtml:link rel="alternate" hreflang="${pair.locale}" href="${canonicalUrl(pair.path)}" />`
          ].join("")
        : "";

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
