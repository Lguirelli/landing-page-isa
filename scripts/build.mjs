// Rodapé global: partials/footer.html é a única fonte do rodapé.
// 1) Copia o partial para o bloco FOOTER de cada página (os .html continuam completos).
// 2) Monta dist/ só com os arquivos públicos. A Vercel roda este script a cada deploy.
// Uso: node scripts/build.mjs
import { readFile, writeFile, readdir, rm, mkdir, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const marker = /<!-- FOOTER:START -->[\s\S]*?<!-- FOOTER:END -->/;

const footer = (await readFile(join(root, 'partials', 'footer.html'), 'utf8')).replace(/\r\n/g, '\n').trimEnd();
const pages = (await readdir(root)).filter((name) => name.endsWith('.html'));

for (const page of pages) {
  const path = join(root, page);
  const source = await readFile(path, 'utf8');
  const eol = source.includes('\r\n') ? '\r\n' : '\n';
  if (!marker.test(source)) throw new Error(`${page}: marcadores FOOTER:START/FOOTER:END não encontrados`);
  const block = `<!-- FOOTER:START -->\n${footer}\n<!-- FOOTER:END -->`.replace(/\n/g, eol);
  const updated = source.replace(marker, () => block);
  if (updated !== source) {
    await writeFile(path, updated);
    console.log(`rodapé atualizado: ${page}`);
  }
}

// Somente o que o visitante precisa: páginas, estilo, script, assets e arquivos para buscadores.
const publicFiles = [...pages, 'styles.css', 'site.js', 'robots.txt', 'sitemap.xml'];
await rm(dist, { recursive: true, force: true });
await mkdir(dist);
for (const file of publicFiles) {
  await cp(join(root, file), join(dist, file)).catch((error) => {
    if (error.code !== 'ENOENT') throw error; // robots.txt e sitemap.xml são opcionais
  });
}
await cp(join(root, 'assets'), join(dist, 'assets'), { recursive: true });
console.log(`dist/ pronto com ${pages.length} páginas`);
