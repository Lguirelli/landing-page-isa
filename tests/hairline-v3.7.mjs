import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const html = await readFile('index.html', 'utf8');
const css = await readFile('styles.css', 'utf8');
const pageNames = ['index', 'sinais', 'cuidados', 'sobre', 'abordagem', 'contato'];

// O site mantém todas as rotas e todas as seções da página inicial.
for (const name of pageNames) {
  const source = await readFile(`${name}.html`, 'utf8');
  assert.match(source, /<main\b/, `${name}: sem main`);
  assert.match(source, /<footer\b/, `${name}: sem rodapé`);
}
const sectionIds = ['sinais', 'cuidados', 'etapas', 'contato'];
for (const id of sectionIds) {
  assert.ok(html.includes(`id="${id}"`), `Seção ausente: ${id}`);
}
assert.equal((html.match(/<section\b/g) ?? []).length, 6, 'Home deve preservar suas seis seções');

// Só os links clicáveis recebem o novo contorno.
assert.equal((html.match(/class="quick-path-title"/g) ?? []).length, 4);
assert.equal((html.match(/class="timeline-card" href="abordagem\.html"/g) ?? []).length, 4);
assert.equal((html.match(/class="timeline-cta"/g) ?? []).length, 4);
assert.equal((html.match(/class="feature"/g) ?? []).length, 3);
assert.match(css, /\.quick-path-links a\s*\{[^}]*border: 1px solid/);
assert.match(css, /\.timeline-card\s*\{[^}]*border: 1px solid/);
assert.match(css, /\.signals-section \.section-head a\s*\{[^}]*background: var\(--primary\)/);
assert.match(css, /\.quick-path-links a:focus-visible/);
assert.match(css, /\.timeline-card:focus-visible/);
assert.match(css, /@media \(hover: hover\) and \(pointer: fine\)/);
assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
console.log('OK: 6 páginas, 6 seções na home, 4 atalhos, 4 cards inteiros clicáveis, botão e estados de interação.');
