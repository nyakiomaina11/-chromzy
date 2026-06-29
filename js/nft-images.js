/**
 * Load baked plate art from assets/images/nfts/{id}.webp (or .svg fallback).
 * Living/interactive canvases are unchanged — this is for catalogue grids.
 */

import { plateAssetUrl } from "./plate-core.js";

export function resolvePlateSrc(id, ext = "webp") {
  return plateAssetUrl(String(id).padStart(4, "0"), ext);
}

export function bindPlateImage(img, id) {
  const plateId = String(id).padStart(4, "0");
  const formats = ["webp", "svg"];
  let i = 0;
  const tryNext = () => {
    if (i >= formats.length) return;
    img.src = resolvePlateSrc(plateId, formats[i++]);
  };
  img.onerror = tryNext;
  tryNext();
}

export function initPlateImages(root = document) {
  root.querySelectorAll("img[data-plate-id]").forEach((img) => {
    if (img.dataset.plateBound) return;
    img.dataset.plateBound = "1";
    bindPlateImage(img, img.dataset.plateId);
  });
}
