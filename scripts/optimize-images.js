/**
 * optimize-images.js
 * Compresses JPG/PNG images in assets/img/products/ to max 150KB using sharp.
 * Originals are overwritten in place (run once; keep originals in source elsewhere).
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const INPUT_DIR = path.join(__dirname, "../assets/img/products");
const MAX_BYTES = 150 * 1024; // 150 KB
const QUALITY_START = 82;
const QUALITY_MIN = 40;
const MAX_WIDTH = 800;

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  const originalSize = fs.statSync(filePath).size;
  const filename = path.basename(filePath);

  if (originalSize <= MAX_BYTES) {
    console.log(`  skip  ${filename} (${kb(originalSize)} KB — already under limit)`);
    return;
  }

  const image = sharp(filePath);
  const meta = await image.metadata();
  const needsResize = meta.width > MAX_WIDTH;

  let quality = QUALITY_START;
  let outputBuffer;

  while (quality >= QUALITY_MIN) {
    const pipeline = sharp(filePath);
    if (needsResize) pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });

    if (ext === ".png") {
      outputBuffer = await pipeline.png({ quality, compressionLevel: 9 }).toBuffer();
    } else {
      outputBuffer = await pipeline.jpeg({ quality, mozjpeg: true }).toBuffer();
    }

    if (outputBuffer.length <= MAX_BYTES) break;
    quality -= 5;
  }

  const tmpPath = filePath + ".tmp";
  fs.writeFileSync(tmpPath, outputBuffer);
  fs.renameSync(tmpPath, filePath);
  const savedKb = kb(originalSize - outputBuffer.length);
  console.log(
    `  done  ${filename}: ${kb(originalSize)} KB → ${kb(outputBuffer.length)} KB  (saved ${savedKb} KB, quality ${quality})`
  );
}

function kb(bytes) {
  return Math.round(bytes / 1024);
}

async function main() {
  const files = fs.readdirSync(INPUT_DIR).map((f) => path.join(INPUT_DIR, f));
  console.log(`Optimizing ${files.length} files in ${INPUT_DIR}\n`);
  for (const f of files) {
    await optimizeImage(f);
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
