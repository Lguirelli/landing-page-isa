// Informe o número oficial com código do país e DDD, por exemplo: 5511999999999.
// Deixe vazio até que o canal esteja disponível.
const whatsappNumber = "";
const digits = whatsappNumber.replace(/\D/g, "");

if (/^55\d{10,11}$/.test(digits)) {
  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = `https://wa.me/${digits}`;
    link.setAttribute("aria-label", "Abrir WhatsApp oficial de Isadora Guirelli em nova aba");
    link.hidden = false;
  });
  document.querySelectorAll("[data-whatsapp-status]").forEach((status) => {
    status.hidden = true;
  });
  document.querySelectorAll("[data-whatsapp-eyebrow]").forEach((label) => {
    label.textContent = "DISPONÍVEL AGORA";
  });
  document.querySelectorAll("[data-whatsapp-description]").forEach((description) => {
    description.textContent = "Envie sua mensagem diretamente pelo WhatsApp.";
  });
}
