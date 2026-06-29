/**
 * Shared generative plate logic — browser (plate.js) and bake script.
 */

export function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makePalette(rand, chroma) {
  const baseH = rand() * 360;
  const spread = 16 + rand() * 42;
  const dir = rand() < 0.5 ? 1 : -1;
  const Ls = [0.89, 0.74, 0.59, 0.45];
  if (rand() < 0.5) Ls.reverse();
  return Ls.map((L, i) => {
    const h = baseH + dir * spread * (i / 3);
    const c = chroma * (0.65 + 0.55 * rand());
    return `oklch(${L.toFixed(3)} ${c.toFixed(3)} ${(((h % 360) + 360) % 360).toFixed(1)})`;
  });
}

export function paletteForSeed(seed, chroma = 0.1) {
  return makePalette(mulberry32(seed), chroma);
}

/** Paint nested Albers fields into a 2D context at pixel size. */
export function paintFields(ctx, width, height, cols) {
  ctx.fillStyle = cols[0];
  ctx.fillRect(0, 0, width, height);
  const u = Math.min(width, height) * 0.092;
  for (let k = 1; k < 4; k++) {
    const x = u * k;
    const y = u * k;
    const w = Math.max(0, width - 2 * u * k);
    const h = Math.max(0, height - 3 * u * k);
    ctx.fillStyle = cols[k];
    ctx.fillRect(x, y, w, h);
  }
}

/** SVG string for a square plate (used by bake script). */
export function plateSvg(cols, size = 1024) {
  const u = size * 0.092;
  const rects = [{ x: 0, y: 0, w: size, h: size, fill: cols[0] }];
  for (let k = 1; k < 4; k++) {
    rects.push({
      x: u * k,
      y: u * k,
      w: Math.max(0, size - 2 * u * k),
      h: Math.max(0, size - 3 * u * k),
      fill: cols[k],
    });
  }
  const body = rects
    .map((r) => `<rect x="${r.x.toFixed(2)}" y="${r.y.toFixed(2)}" width="${r.w.toFixed(2)}" height="${r.h.toFixed(2)}" fill="${r.fill}"/>`)
    .join("\n  ");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  ${body}
</svg>`;
}

export const NFT_DIR = "assets/images/nfts";

export function plateAssetUrl(id, ext = "webp") {
  return `${NFT_DIR}/${id}.${ext}`;
}
