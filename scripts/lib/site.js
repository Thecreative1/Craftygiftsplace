const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..", "..");
const siteUrl = "https://thecreative1.github.io/Craftygiftsplace";
const xDefaultPath = "/en/";

function readText(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

function writeText(relativePath, content) {
  const targetPath = path.join(repoRoot, relativePath);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, ensureTrailingNewline(content), "utf8");
}

function writeJson(relativePath, value) {
  writeText(relativePath, `${JSON.stringify(value, null, 2)}\n`);
}

function ensureTrailingNewline(content) {
  return content.endsWith("\n") ? content : `${content}\n`;
}

function sitePathToFile(sitePath) {
  return path.join(repoRoot, sitePath.replace(/^\//, ""));
}

function canonicalUrl(sitePath) {
  const clean = sitePath.replace(/\/index\.html$/, "/");
  if (clean === "/") {
    return `${siteUrl}/`;
  }
  return `${siteUrl}${clean}`;
}

function absoluteUrl(sitePath) {
  if (sitePath.startsWith("http://") || sitePath.startsWith("https://")) {
    return sitePath;
  }
  const normalized = sitePath.startsWith("/") ? sitePath : `/${sitePath}`;
  return canonicalUrl(normalized);
}

function relativeUrl(fromPagePath, toSitePath) {
  if (toSitePath.startsWith("http://") || toSitePath.startsWith("https://")) {
    return toSitePath;
  }

  const fromDir = path.posix.dirname(fromPagePath.replace(/^\//, ""));
  const target = toSitePath.replace(/^\//, "");
  const rel = path.posix.relative(fromDir === "." ? "" : fromDir, target);
  return rel || path.posix.basename(target);
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/\n/g, " ");
}

function renderTemplate(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in vars)) {
      return "";
    }
    return vars[key];
  });
}

function loadTemplate(name) {
  return readText(path.posix.join("partials", name));
}

function hashString(value) {
  let hash = 0;
  const input = String(value || "");
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

module.exports = {
  absoluteUrl,
  canonicalUrl,
  ensureTrailingNewline,
  escapeAttribute,
  escapeHtml,
  hashString,
  loadTemplate,
  readJson,
  readText,
  relativeUrl,
  renderTemplate,
  repoRoot,
  sitePathToFile,
  siteUrl,
  slugify,
  unique,
  writeJson,
  writeText,
  xDefaultPath
};
