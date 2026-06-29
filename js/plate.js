/**
 * CHROMZY — generative colour plate renderer.
 * Ported from the imported Claude design (Albers-style nested fields, OKLCH palettes).
 * Each <canvas data-plate> paints a fixed composition; the palette can be re-rolled.
 *
 * Attributes:
 *   data-plate                  -> mark a canvas as a plate
 *   data-plate-interactive      -> click to re-roll the palette
 *   data-plate-chroma="0.10"    -> colour intensity (0.05–0.16)
 *   data-seed="<n>"             -> deterministic palette (stable across reloads)
 */

import { makePalette, mulberry32, paintFields } from "./plate-core.js";

const REGISTRY = new Set();
let resizeBound = false;

function paint(plate) {
  const c = plate.canvas;
  const rect = c.getBoundingClientRect();
  if (rect.width < 2) { requestAnimationFrame(() => paint(plate)); return; }
  const dpr = window.devicePixelRatio || 1;
  c.width = Math.round(rect.width * dpr);
  c.height = Math.round(rect.height * dpr);
  const ctx = c.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  paintFields(ctx, rect.width, rect.height, plate.cols);
}

function reroll(plate) {
  plate.rand = mulberry32((Math.random() * 1e9) | 0);
  plate.cols = makePalette(plate.rand, plate.chroma);
  const c = plate.canvas;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { paint(plate); return; }
  c.style.transition = "opacity .22s ease";
  c.style.opacity = "0";
  setTimeout(() => { paint(plate); c.style.opacity = "1"; }, 165);
}

export function initPlates(root = document) {
  const canvases = root.querySelectorAll("canvas[data-plate]");
  canvases.forEach((canvas) => {
    if (canvas.dataset.plateBound) return;
    canvas.dataset.plateBound = "1";

    const chroma = parseFloat(canvas.dataset.plateChroma || "0.10");
    const seed = canvas.dataset.seed != null
      ? parseInt(canvas.dataset.seed, 10)
      : (Math.random() * 1e9) | 0;
    const rand = mulberry32(seed);

    const plate = { canvas, chroma, rand, cols: makePalette(rand, chroma) };
    REGISTRY.add(plate);
    requestAnimationFrame(() => paint(plate));

    if (canvas.hasAttribute("data-plate-interactive") ||
        canvas.closest("[data-plate-interactive]")) {
      const target = canvas.closest("[data-plate-interactive]") || canvas;
      target.style.cursor = "pointer";
      target.addEventListener("click", () => reroll(plate));
    }
  });

  if (!resizeBound) {
    resizeBound = true;
    let raf = 0;
    window.addEventListener("resize", () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => REGISTRY.forEach(paint));
    }, { passive: true });
  }
}

/** Re-roll the first interactive plate found (used by re-roll buttons). */
export function rerollPlate(canvas) {
  for (const plate of REGISTRY) {
    if (plate.canvas === canvas) { reroll(plate); return; }
  }
}
