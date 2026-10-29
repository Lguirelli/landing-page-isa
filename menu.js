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
