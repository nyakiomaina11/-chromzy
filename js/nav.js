export function initNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const mobile = document.querySelector("[data-nav-mobile]");

  if (!toggle || !mobile) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    mobile.classList.toggle("is-open", !expanded);
    mobile.hidden = expanded;
  });

  mobile.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      mobile.classList.remove("is-open");
      mobile.hidden = true;
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobile.classList.contains("is-open")) {
      toggle.setAttribute("aria-expanded", "false");
      mobile.classList.remove("is-open");
      mobile.hidden = true;
      toggle.focus();
    }
  });
}

export function setActiveNavLink() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    const href = link.getAttribute("href");
    const isActive =
      href === path ||
      (path === "" && href === "index.html") ||
      (path === "index.html" && href === "index.html");
    link.classList.toggle("nav__link--active", isActive);
  });
}
