import { GALLERY_ITEMS } from "./collection-data.js";
import { initPlateImages, bindPlateImage } from "./nft-images.js";

const FAMILY_LABEL = {
  warm: "Warm palette",
  cool: "Cool palette",
  neutral: "Neutral palette",
  split: "Split complement",
  mono: "Near-monochrome",
};

export function initCollectionPage() {
  const grid = document.getElementById("collection-grid");
  if (!grid) return;
  renderGrid(grid, GALLERY_ITEMS);
  initFilters();
  initSearch();
  initModal();
  initPlateImages(grid);
}

function renderGrid(grid, items) {
  grid.innerHTML = items
    .map(
      (n) => `
    <figure class="figure collection-card" data-nft-id="${n.id}" data-title="${n.title}" data-artist="${n.artist}" data-family="${n.family}" data-tier="${n.tier_key}" tabindex="0" role="button" aria-label="View plate ${n.id}, ${n.title}">
      <div class="figure__frame ar-1-1">
        <img data-plate-id="${n.id}" alt="Plate ${n.id} — ${n.title}" loading="lazy" decoding="async">
      </div>
      <figcaption class="figure__cap">
        <span class="is-mute">Pl. ${n.id}</span>
        <span class="is-title">${n.title}</span>
        <span class="is-mute">${n.artist}</span>
      </figcaption>
    </figure>`
    )
    .join("");
  document.dispatchEvent(new CustomEvent("collection:rendered"));
}

function initFilters() {
  document.querySelectorAll("[data-filter-pill]").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.querySelectorAll("[data-filter-pill]").forEach((p) => p.classList.remove("is-active"));
      pill.classList.add("is-active");
      const f = pill.dataset.filterPill;
      document.querySelectorAll(".collection-card").forEach((card) => {
        const match = f === "all" || card.dataset.family === f || card.dataset.tier === f;
        card.style.display = match ? "" : "none";
      });
    });
  });
}

function initSearch() {
  const input = document.querySelector("[data-collection-search]");
  if (!input) return;
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    document.querySelectorAll(".collection-card").forEach((card) => {
      const hay = `${card.dataset.nftId} ${card.dataset.title} ${card.dataset.artist} ${card.dataset.family} ${card.dataset.tier}`.toLowerCase();
      card.style.display = !q || hay.includes(q) ? "" : "none";
    });
  });
}

function initModal() {
  let modal = document.querySelector(".nft-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.className = "nft-modal";
    modal.hidden = true;
    modal.innerHTML = `
      <div class="nft-modal__backdrop" data-modal-close></div>
      <div class="nft-modal__panel" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button type="button" class="nft-modal__close" data-modal-close aria-label="Close">&times;</button>
        <div class="nft-modal__preview" id="modal-preview"></div>
        <h2 class="nft-modal__title" id="modal-title"></h2>
        <p class="nft-modal__score"></p>
        <ul class="nft-modal__traits"></ul>
      </div>`;
    document.body.appendChild(modal);
    modal.querySelectorAll("[data-modal-close]").forEach((el) =>
      el.addEventListener("click", () => closeModal(modal))
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hidden) closeModal(modal);
    });
  }

  const open = (card) => {
    const { nftId, title, artist, family } = card.dataset;
    modal.querySelector("#modal-title").textContent = title;
    modal.querySelector(".nft-modal__score").textContent = `Plate ${nftId} · ${artist}`;
    modal.querySelector("#modal-preview").innerHTML =
      `<div class="figure__frame ar-1-1"><img data-plate-id="${nftId}" alt="Plate ${nftId} — ${title}"></div>`;
    const img = modal.querySelector("#modal-preview img");
    bindPlateImage(img, nftId);
    modal.querySelector(".nft-modal__traits").innerHTML = [
      ["Palette", FAMILY_LABEL[family] || family],
      ["Fields", "Four nested rectangles"],
      ["Chain", "Solana"],
      ["Standard", "Metaplex Core"],
    ].map(([k, v]) => `<li><span>${k}</span><span>${v}</span></li>`).join("");

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".nft-modal__close").focus();
  };

  const bind = () => {
    document.querySelectorAll(".collection-card").forEach((card) => {
      if (card.dataset.bound) return;
      card.dataset.bound = "1";
      card.addEventListener("click", () => open(card));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(card); }
      });
    });
  };
  bind();
  document.addEventListener("collection:rendered", bind);
}

function closeModal(modal) {
  modal.hidden = true;
  document.body.style.overflow = "";
}
