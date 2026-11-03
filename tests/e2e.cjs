// QA opcional em navegador. Execute npm ci e npx playwright install chromium antes.
// Inicie npm run dev em outro terminal e depois npm run test:e2e.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const pages = ['index','sinais','cuidados','sobre','abordagem','contato'];
const widths = [320,360,390,430,768,1024,1440,1920];
const url = process.env.SITE_URL || 'http://127.0.0.1:4389';
(async () => {
 const browser = await chromium.launch({headless:true, ...(process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH} : {})});
 const results = [];
 for(const width of widths){
  const context = await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
  for(const name of pages){
   const page = await context.newPage();
   const errors=[];
   page.on('pageerror', e=>errors.push(e.message));
   const response=await page.goto(`${url}/${name}.html`,{waitUntil:'domcontentloaded'});
   assert.equal(response.status(),200,`${name} HTTP`);
   await page.locator('header.site-header').waitFor();
   await page.locator('footer.site-footer').waitFor();
   const overflow = await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
   assert.ok(overflow<=1,`${name} ${width}px: overflow ${overflow}px`);
   assert.equal(errors.length,0,`${name} ${width}px console: ${errors.join('; ')}`);
   assert.equal(await page.locator('nav[aria-label="Navegação principal"] a[aria-current="page"]').count(),1);
   if(width<=1050){
    const menu=page.locator('.menu-toggle');
    await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'true');
    await page.keyboard.press('Escape');assert.equal(await menu.getAttribute('aria-expanded'),'false');
   }
   if(name==='contato'){
    const faq=page.locator('.faq details').first();
    await faq.locator('summary').click();assert.equal(await faq.getAttribute('open'),'');
   }
   results.push(`${name}:${width}`);
   await page.close();
  }
  await context.close();
 }
 await browser.close();
 console.log(`E2E concluído: ${results.length} combinações página × viewport.`);
})().catch(error=>{console.error(error);process.exit(1)});
