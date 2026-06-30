/** Page chrome: skip link, scroll progress, typographic loader. */

export function initChrome() {
  injectSkipLink();
  injectScrollProgress();
  initPageLoader();
}

function injectSkipLink() {
  if (document.querySelector(".skip-link")) return;
  const skip = document.createElement("a");
  skip.href = "#main-content";
  skip.className = "skip-link";
  skip.textContent = "Skip to content";
  document.body.prepend(skip);
}

function injectScrollProgress() {
  if (document.querySelector(".scroll-progress")) return;
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  bar.setAttribute("role", "progressbar");
  bar.setAttribute("aria-valuemin", "0");
  bar.setAttribute("aria-valuemax", "100");
  bar.setAttribute("aria-valuenow", "0");
  bar.innerHTML = '<div class="scroll-progress__fill"></div>';
  document.body.appendChild(bar);

  const fill = bar.querySelector(".scroll-progress__fill");
  const update = () => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    fill.style.width = `${pct}%`;
    bar.setAttribute("aria-valuenow", String(Math.round(pct)));
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}

function initPageLoader() {
  if (document.querySelector(".page-loader")) return;
  const loader = document.createElement("div");
  loader.className = "page-loader";
  loader.innerHTML = `
    <div class="page-loader__inner">
      <div class="page-loader__mark">Chromzy<span class="spot">.</span></div>
      <div class="page-loader__bar"><span class="page-loader__fill"></span></div>
      <span class="page-loader__text">Composing the plate</span>
    </div>`;
  document.body.appendChild(loader);

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hide = () => {
    loader.classList.add("is-done");
    setTimeout(() => loader.remove(), reduce ? 0 : 600);
  };
  if (reduce) { hide(); return; }
  window.addEventListener("load", () => setTimeout(hide, 500));
  setTimeout(hide, 2200);
}
