import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { extname } from 'node:path';

const pages = ['index','sinais','cuidados','sobre','abordagem','contato'];
const report = [];
for (const name of pages) {
  const filename = `${name}.html`;
  const html = await readFile(filename,'utf8');
  assert.equal((html.match(/<h1\b/gi)||[]).length,1,`${filename}: H1 único`);
  assert.equal((html.match(/<header\b/gi)||[]).length,1,`${filename}: cabeçalho único`);
  assert.equal((html.match(/<footer\b/gi)||[]).length,1,`${filename}: rodapé único`);
  assert.equal((html.match(/<nav\b[^>]*aria-label="Navegação principal"/gi)||[]).length,1,`${filename}: navegação principal`);
  assert.equal((html.match(/aria-current="page"/gi)||[]).length,name==='index'?1:2,`${filename}: item ativo no menu e breadcrumb`);
  assert.ok(html.includes(`href="${filename}"`) && html.includes(`aria-current="page" href="${filename}"`),`${filename}: link ativo`);
  assert.ok(/<a\b[^>]*class="skip"[^>]*href="#conteudo"/.test(html),`${filename}: link pular para o conteúdo`);
  assert.ok(html.includes('data-whatsapp-link'),`${filename}: CTA WhatsApp`);
  assert.ok(!html.includes('data-include='),`${filename}: navegação não pode depender de fetch`);
  assert.ok(!/href="javascript:/i.test(html),`${filename}: URL insegura`);
  const locals=[];
  for (const [,raw] of html.matchAll(/(?:src|href)="([^"#?]+)(?:[?#][^"]*)?"/gi)) {
    if (/^(https?:|mailto:|tel:|data:)/.test(raw)) continue;
    await stat(raw);
    locals.push(raw);
  }
  assert.ok(locals.includes('styles.css') && locals.includes('site.js'),`${filename}: arquivos compartilhados`);
  report.push({page:filename,localReferences:locals.length});
}
console.log(JSON.stringify({status:'ok',pages:report,notes:'Validação estática, sem navegador'}));
