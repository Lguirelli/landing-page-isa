const b = document.querySelector(".menu-toggle"),
  n = document.querySelector(".nav");
function closeMenu() {
  n.classList.remove("open");
  b.setAttribute("aria-expanded", "false");
  b.setAttribute("aria-label", "Abrir menu");
  b.textContent = "☰";
}
b.addEventListener("click", () => {
  const open = n.classList.toggle("open");
  b.setAttribute("aria-expanded", String(open));
  b.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  b.textContent = open ? "×" : "☰";
  if (open) n.querySelector("a").focus();
});
n.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && n.classList.contains("open")) {
    closeMenu();
    b.focus();
  }
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".site-header")) closeMenu();
});

// O menu é uma navegação não modal: ao sair com Tab, recolhe o painel.
document.querySelector(".site-header").addEventListener("focusout", () => {
  requestAnimationFrame(() => {
    if (!document.activeElement.closest(".site-header")) closeMenu();
  });
});

// Não reabrir um estado antigo ao alternar entre desktop e celular.
const desktopMenu = window.matchMedia("(min-width: 1051px)");
desktopMenu.addEventListener("change", () => {
  const focusInNav = n.contains(document.activeElement);
  closeMenu();
  if (!desktopMenu.matches && focusInNav) b.focus();
});
