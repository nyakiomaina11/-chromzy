import { initNav, setActiveNavLink } from "./nav.js";
import { initWalletUI } from "./wallet.js";
import { initMotion } from "./animations.js";
import { initChrome } from "./ui.js";
import { initPlates } from "./plate.js";
import { initCollectionPage } from "./collection-page.js";
import { initPlateImages } from "./nft-images.js";

document.addEventListener("DOMContentLoaded", () => {
  initChrome();
  initNav();
  setActiveNavLink();
  initWalletUI();
  initMotion();
  document.addEventListener("collection:rendered", () => initPlateImages());
  initPlates();
  initPlateImages();
  initCollectionPage();
  initAccordion();
  initMintPage();
  initMintProgress();
  initLivingPlate();
});

/* Re-roll button for the home "living plate" */
function initLivingPlate() {
  document.querySelectorAll("[data-reroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.querySelector(btn.dataset.reroll);
      target?.click();
    });
  });
}

function initMintProgress() {
  const bar = document.querySelector("[data-mint-progress]");
  if (!bar) return;
  const minted = parseInt(bar.dataset.minted || "0", 10);
  const total = parseInt(bar.dataset.total || "4444", 10);
  const pct = Math.round((minted / total) * 100);
  const fill = bar.querySelector(".mint-progress__fill");
  const label = bar.querySelector("[data-mint-progress-count]");
  if (fill) requestAnimationFrame(() => { fill.style.width = `${pct}%`; });
  if (label) label.textContent = `${minted.toLocaleString()} / ${total.toLocaleString()}`;
}

function initAccordion() {
  document.querySelectorAll("[data-accordion-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const item = trigger.closest("[data-accordion-item]");
      const isOpen = item.classList.contains("is-open");
      item.closest(".accordion")?.querySelectorAll("[data-accordion-item]").forEach((s) => {
        s.classList.remove("is-open");
        s.querySelector("[data-accordion-trigger]")?.setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });
}

function initMintPage() {
  const qtyValue = document.querySelector("[data-mint-qty]");
  const minusBtn = document.querySelector("[data-mint-minus]");
  const plusBtn = document.querySelector("[data-mint-plus]");
  const mintBtn = document.querySelector("[data-mint-action]");
  if (!qtyValue) return;

  let qty = 1;
  const max = parseInt(qtyValue.dataset.mintMax || "1", 10);

  const render = () => {
    qtyValue.textContent = qty;
    if (minusBtn) minusBtn.disabled = qty <= 1;
    if (plusBtn) plusBtn.disabled = qty >= max;
  };

  minusBtn?.addEventListener("click", () => { if (qty > 1) { qty--; render(); } });
  plusBtn?.addEventListener("click", () => { if (qty < max) { qty++; render(); } });

  mintBtn?.addEventListener("click", () => {
    import("./wallet.js").then(({ getWalletState, showToast }) => {
      if (!getWalletState().connected) { showToast("Connect a wallet first."); return; }
      showToast(`Mint stub — ${qty} plate(s). Wire Metaplex Core here.`);
      document.querySelectorAll(".tx-step").forEach((s, i) => {
        s.classList.remove("is-active");
        if (i < 3) s.classList.add("is-done");
        if (i === 3) s.classList.add("is-active");
      });
    });
  });

  render();
}
