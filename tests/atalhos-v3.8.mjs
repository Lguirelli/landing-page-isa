import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const html = await readFile('index.html','utf8');
const css = await readFile('styles.css','utf8');
const pages = ['index','sinais','cuidados','sobre','abordagem','contato'];
const start = html.indexOf('<nav aria-label="Ir para seções desta página" class="quick-paths">');
const end = html.indexOf('</nav>',start);
assert.ok(start >= 0 && end > start, 'Navegação de atalhos presente');
const block = html.slice(start,end+6);
assert.ok(block.indexOf('O que você procura?') < block.indexOf('quick-path-links'), 'Título deve vir antes dos cards');
assert.equal((block.match(/<a href="#/g)||[]).length,4,'Quatro atalhos devem ser mantidos');
assert.match(css,/\.quick-path-links\s*\{[^}]*grid-template-columns:\s*repeat\(4,minmax\(0,1fr\)\)/,'Quatro colunas no desktop');
assert.match(css,/@media \(max-width: 1050px\)[\s\S]*?\.quick-path-links\s*\{\s*grid-template-columns:\s*repeat\(2,minmax\(0,1fr\)\)/,'Duas colunas no tablet');
assert.match(css,/@media \(max-width: 760px\)[\s\S]*?\.quick-path-links\s*\{\s*grid-template-columns:\s*1fr/,'Uma coluna no mobile');
for (const page of pages){
  const content=await readFile(`${page}.html`,'utf8');
  assert.ok(!/[↗↖↘↙➚➘]/u.test(content),`${page}: não devem existir setas diagonais`);
}
for (const part of ['partials/header.html','partials/footer.html']){
  assert.ok(!/[↗↖↘↙➚➘]/u.test(await readFile(part,'utf8')),`${part}: seta diagonal no componente`);
}
assert.equal((html.match(/<section\b/g) ?? []).length,6,'Home deve preservar 6 seções');
console.log('OK v3.8: título acima, quatro cards no desktop, grade responsiva, nenhuma seta diagonal e seções preservadas.');
