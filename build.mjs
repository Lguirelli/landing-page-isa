import { mkdir, copyFile, cp, readFile, rm, stat } from 'node:fs/promises';
import { extname } from 'node:path';

await import('./sync-components.mjs');

const pages = ['index','sinais','cuidados','sobre','abordagem','contato'];
const files = new Set(['styles.css','site.js']);
const assets = new Set();
await rm('dist', { recursive: true, force: true });
await mkdir('dist/assets', { recursive: true });
for (const name of pages) {
  const filename = `${name}.html`;
  const html = await readFile(filename, 'utf8');
  if ((html.match(/<h1\b/gi) || []).length !== 1) throw new Error(`${filename}: a página precisa de exatamente um H1`);
  if (!/<header\b/.test(html) || !/<footer\b/.test(html) || !/aria-label="Navegação principal"/.test(html)) throw new Error(`${filename}: falta navegação estática ou rodapé`);
  if (/data-include=/.test(html)) throw new Error(`${filename}: componentes dependentes de fetch`);
  for (const [, url] of html.matchAll(/(?:src|href)="([^"#?]+)(?:[?#][^"]*)?"/gi)) {
    if (/^(https?:|mailto:|tel:|data:)/.test(url)) continue;
    await stat(url);
    if (url.startsWith('assets/')) assets.add(url);
    else if (extname(url) === '.css' || extname(url) === '.js') files.add(url);
  }
  await copyFile(filename, `dist/${filename}`);
}
for (const file of files) await copyFile(file, `dist/${file}`);
for (const asset of assets) await copyFile(asset, `dist/${asset}`);
console.log(`Build concluído: ${pages.length} páginas, ${files.size} scripts/estilos, ${assets.size} imagens em dist/`);
