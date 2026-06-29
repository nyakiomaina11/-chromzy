/**
 * Bake generative colour plates to static assets/images/nfts/{id}.webp
 * Run: node scripts/bake-plates.mjs
 */

import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const root = join(__dir, "..");
const outDir = join(root, "assets", "images", "nfts");

const { paletteForSeed, plateSvg } = await import(
  pathToFileURL(join(root, "js", "plate-core.js")).href
);

const PLATES = [
  { id: "0001", seed: 1, chroma: 0.11 },
  { id: "0007", seed: 7, chroma: 0.11 },
  { id: "0103", seed: 103, chroma: 0.10 },
  { id: "0142", seed: 142, chroma: 0.10 },
  { id: "0188", seed: 188, chroma: 0.11 },
  { id: "0234", seed: 234, chroma: 0.09 },
  { id: "0291", seed: 291, chroma: 0.12 },
  { id: "0312", seed: 312, chroma: 0.08 },
  { id: "0399", seed: 399, chroma: 0.12 },
  { id: "0444", seed: 44, chroma: 0.12 },
  { id: "0488", seed: 488, chroma: 0.09 },
  { id: "0511", seed: 511, chroma: 0.10 },
  { id: "0602", seed: 602, chroma: 0.11 },
  { id: "0654", seed: 654, chroma: 0.11 },
  { id: "0720", seed: 720, chroma: 0.09 },
  { id: "0810", seed: 810, chroma: 0.10 },
  { id: "0888", seed: 888, chroma: 0.08 },
  { id: "1204", seed: 1204, chroma: 0.11 },
  { id: "1566", seed: 1566, chroma: 0.10 },
  { id: "2001", seed: 2001, chroma: 0.12 },
];

mkdirSync(outDir, { recursive: true });

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.warn("sharp not installed — writing SVG only. Run: npm install sharp");
}

for (const { id, seed, chroma } of PLATES) {
  const cols = paletteForSeed(seed, chroma);
  const svg = plateSvg(cols, 1024);
  const svgPath = join(outDir, `${id}.svg`);
  writeFileSync(svgPath, svg, "utf8");

  if (sharp) {
    const webpPath = join(outDir, `${id}.webp`);
    await sharp(Buffer.from(svg)).webp({ quality: 88 }).toFile(webpPath);
    console.log(`baked ${id}.webp`);
  } else {
    console.log(`baked ${id}.svg`);
  }
}

console.log(`Done — ${PLATES.length} plates in ${outDir}`);
