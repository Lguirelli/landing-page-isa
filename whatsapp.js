// Número oficial com código do país e DDD (somente dígitos).
const whatsappNumber = "5519999103510";
const digits = whatsappNumber.replace(/\D/g, "");

if (/^55\d{10,11}$/.test(digits)) {
  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = `https://wa.me/${digits}`;
    link.setAttribute("aria-label", "Abrir meu WhatsApp oficial em nova aba");
    link.hidden = false;
  });
  document.querySelectorAll("[data-whatsapp-status]").forEach((status) => {
    status.hidden = true;
  });
  document.querySelectorAll("[data-whatsapp-eyebrow]").forEach((label) => {
    label.textContent = "DISPONÍVEL AGORA";
  });
}
