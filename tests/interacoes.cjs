const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs=require('node:fs/promises');const assert=require('node:assert/strict');
const base=(process.env.BASE_URL || 'http://127.0.0.1:4173/');const names=['index','sinais','cuidados','sobre','abordagem','contato'];
(async()=>{
 const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL || undefined,headless:true});const context=await browser.newContext();const p=await context.newPage();const checks=[];
 const record=(name,detail)=>{checks.push({name,detail,status:'pass'});console.log('PASS '+name)};
 for(const width of [280,360,521,600,759,760,761,1024,1200,1201,1280,1920]){
  await p.setViewportSize({width,height:900});
  for(const name of names){await p.goto(base+name+'.html');await p.evaluate(()=>document.fonts.ready);
   const issues=await p.evaluate(()=>{
    const bad=[];const els=[...document.querySelectorAll('header > a,header > nav,header > button')].filter(e=>e.getClientRects().length);for(let i=0;i<els.length;i++)for(let j=i+1;j<els.length;j++){const a=els[i].getBoundingClientRect(),b=els[j].getBoundingClientRect();if(a.left<b.right-1&&a.right>b.left+1&&a.top<b.bottom-1&&a.bottom>b.top+1)bad.push('header overlap');}
    for(const e of document.querySelectorAll('main *,header *')){if(!e.getClientRects().length)continue;const r=e.getBoundingClientRect();if(r.left< -1||r.right>innerWidth+1||e.scrollWidth>e.clientWidth+2&&getComputedStyle(e).overflowX==='visible')bad.push(e.className||e.tagName);}return bad;
   });assert.deepEqual(issues,[],`${name} ${width}: ${issues}`);
  }record('Largura adicional '+width,'6 páginas: sem extravasamento ou sobreposição no cabeçalho');
 }
 for(const name of names){
  await p.setViewportSize({width:390,height:844});await p.goto(base+name+'.html');
  for(const label of ['Sinais','Cuidados','Sobre','Abordagem','Contato']){
   await p.getByRole('button',{name:'Abrir menu'}).click();await p.locator('.nav').getByRole('link',{name:label,exact:true}).click();assert.equal(new URL(p.url()).pathname,'/'+({Sinais:'sinais',Cuidados:'cuidados',Sobre:'sobre',Abordagem:'abordagem',Contato:'contato'})[label]+'.html');assert.equal(await p.locator('.menu-toggle').getAttribute('aria-expanded'),'false');await p.goto(base+name+'.html');
  }
  record('Navegação móvel '+name,'5 destinos por clique; menu recolhido após navegar');
  const hrefs=await p.locator('a[href]').evaluateAll(es=>es.map(e=>e.getAttribute('href')));for(const href of [...new Set(hrefs)]){if(href.startsWith('http'))continue;const u=new URL(href,p.url());const r=await context.request.get(u.href);assert.equal(r.status(),200,href);if(u.hash){assert.equal(await p.locator(u.hash).count(),1);}}
  record('Links locais '+name,'Destinos HTTP e âncoras existentes');
  await p.setViewportSize({width:1440,height:900});await p.goto(base+name+'.html');
  for(const selector of ['.talk','.view-work','.cta-band a','.process a','.footer-links a[href="index.html"]']){await p.goto(base+name+'.html');const links=await p.locator(selector).all();for(let i=0;i<links.length;i++){await p.goto(base+name+'.html');const link=p.locator(selector).nth(i);const href=await link.getAttribute('href');const expected=new URL(href,p.url()).href;await link.click();assert.equal(p.url(),expected);}}
  record('CTAs internos '+name,'Botões e chamadas existentes chegam ao destino previsto');
  await p.goto(base+name+'.html');await p.getByRole('link',{name:'Isadora Guirelli, início'}).click();assert.equal(new URL(p.url()).pathname,'/index.html');
 }
 await p.setViewportSize({width:390,height:280});await p.goto(base+'index.html');await p.getByRole('button',{name:'Abrir menu'}).click();await p.locator('.nav').getByRole('link',{name:'Contato',exact:true}).click();assert.ok(p.url().endsWith('contato.html'));record('Menu em tela baixa','Contato alcançável com rolagem do menu em 390×280');
 await p.getByRole('button',{name:'Abrir menu'}).click();await p.locator('.menu-toggle').press('Escape');assert.equal(await p.locator('.menu-toggle').getAttribute('aria-expanded'),'false');assert.equal(await p.locator('.menu-toggle').evaluate(e=>e===document.activeElement),true);record('Escape','Fecha menu e devolve foco ao botão');
 await p.getByRole('button',{name:'Abrir menu'}).click();await p.locator('.topline').click();assert.equal(await p.locator('.menu-toggle').getAttribute('aria-expanded'),'false');record('Clique fora','Fecha menu');
 await p.getByRole('button',{name:'Abrir menu'}).click();await p.setViewportSize({width:1440,height:900});await p.setViewportSize({width:390,height:844});assert.equal(await p.locator('.menu-toggle').getAttribute('aria-expanded'),'false');record('Troca de orientação e tamanho','Menu não reabre com estado antigo');
 await p.getByRole('button',{name:'Abrir menu'}).click();await p.locator('.nav a').last().press('Tab');await p.locator('.menu-toggle').press('Tab');await p.waitForTimeout(50);assert.equal(await p.locator('.menu-toggle').getAttribute('aria-expanded'),'false');record('Saída por teclado','Tab para fora do cabeçalho recolhe menu');
 await p.goto(base+'index.html');await p.keyboard.press('Tab');assert.equal(await p.locator('.skip').evaluate(e=>e===document.activeElement),true);await p.keyboard.press('Enter');assert.equal(new URL(p.url()).hash,'#conteudo');record('Pular para conteúdo','Link acessível por teclado e âncora funcional');
 await context.route('https://wa.me/**',r=>r.fulfill({status:200,contentType:'text/html',body:'<title>Teste de destino</title>'}));await context.route('https://www.instagram.com/**',r=>r.fulfill({status:200,contentType:'text/html',body:'<title>Teste de destino</title>'}));
 for(const name of names){await p.goto(base+name+'.html');const links=await p.locator('a[target="_blank"]').all();for(let i=0;i<links.length;i++){const link=p.locator('a[target="_blank"]').nth(i);const href=await link.getAttribute('href');assert.match(href,/^https:\/\/(wa\.me\/5519999103510|www\.instagram\.com\/isadoraguirelli\/)/);assert.match(await link.getAttribute('rel'),/noopener/);const popup=await Promise.all([p.waitForEvent('popup'),link.click()]).then(r=>r[0]);await popup.waitForLoadState();assert.equal(popup.url(),href);await popup.close();}record('Links externos '+name,'Clique abre nova aba correta; destino interceptado localmente sem enviar mensagem');}
 const reduced=await browser.newContext({reducedMotion:'reduce'});const rp=await reduced.newPage();await rp.goto(base);assert.equal(await rp.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');await reduced.close();record('Movimento reduzido','Preferência respeitada');
 await fs.writeFile('relatorio/interacoes.json',JSON.stringify(checks,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});


