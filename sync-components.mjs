import { readFile, writeFile } from 'node:fs/promises';
const pages = ['index','sinais','cuidados','sobre','abordagem','contato'];
const headerTemplate = (await readFile('partials/header.html','utf8')).trim();
const footerTemplate = (await readFile('partials/footer.html','utf8')).trim();
for (const name of pages) {
  const file = `${name}.html`;
  let html = await readFile(file,'utf8');
  // O primeiro link da navegação com esse destino recebe aria-current.
  let header = headerTemplate.replace(`<a href="${name}.html">`, `<a aria-current="page" href="${name}.html">`);
  if (name === 'contato') {
    header = header.replace('<a class="talk" href="contato.html">Fale comigo <span aria-hidden="true">→</span></a>',
                            '<a class="talk" href="#canais">Ver canais de contato</a>');
  }
  const headerMark = /<!-- HEADER:START -->[\s\S]*?<!-- HEADER:END -->/;
  const footerMark = /<!-- FOOTER:START -->[\s\S]*?<!-- FOOTER:END -->/;
  if (!headerMark.test(html) || !footerMark.test(html)) throw new Error(`${file}: marcadores dos componentes não encontrados`);
  html = html.replace(headerMark, `<!-- HEADER:START -->\n${header}\n<!-- HEADER:END -->`)
             .replace(footerMark, `<!-- FOOTER:START -->\n${footerTemplate}\n<!-- FOOTER:END -->`);
  await writeFile(file,html);
}
console.log('Cabeçalho e rodapé sincronizados nas seis páginas HTML.');
