document.documentElement.classList.add('js');
/** Navegação progressiva: o HTML permanece navegável sem JavaScript. */
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const header = document.querySelector('.site-header');
const mobile = window.matchMedia('(max-width: 1050px)');

if (menuButton && nav && header) {
  const setMenuOpen = (open) => {
    const enabled = open && mobile.matches;
    nav.classList.toggle('open', enabled);
    menuButton.setAttribute('aria-expanded', String(enabled));
    menuButton.setAttribute('aria-label', enabled ? 'Fechar menu' : 'Abrir menu');
    menuButton.querySelector('.menu-toggle-label').textContent = enabled ? 'Fechar' : 'Menu';
  };

  menuButton.addEventListener('click', () => setMenuOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('pointerdown', (event) => {
    if (nav.classList.contains('open') && !header.contains(event.target)) setMenuOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      setMenuOpen(false);
      menuButton.focus();
    }
  });
  // O menu é disclosure, não dialog modal: Tab pode sair naturalmente e o menu fecha.
  header.addEventListener('focusout', (event) => {
    if (!header.contains(event.relatedTarget)) setMenuOpen(false);
  });
  mobile.addEventListener('change', () => setMenuOpen(false));
}

// Barra de leitura discreta: animada por transform, sem causar recálculo de layout.
const progress = document.querySelector('.reading-progress span');
if (progress && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let pending = false;
  function updateProgress() {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = available > 0 ? Math.max(0, Math.min(1, window.scrollY / available)) : 0;
    progress.style.transform = `scaleX(${ratio})`;
    pending = false;
  }
  const queue = () => {
    if (!pending) { pending = true; window.requestAnimationFrame(updateProgress); }
  };
  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue, { passive: true });
  queue();
}
