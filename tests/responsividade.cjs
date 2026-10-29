const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
const phase = process.argv[2] || 'antes';
const base = (process.env.BASE_URL || 'http://127.0.0.1:4173/');
const out = path.resolve('relatorio', phase);
const pages = ['index','sinais','cuidados','sobre','abordagem','contato'];
const sizes = [[320,740],[390,844],[768,1024],[1440,900],[2560,1080],[520,740],[1050,800],[1051,800],[844,390]];
(async()=>{
 await fs.mkdir(out,{recursive:true});
 const browser = await chromium.launch({channel:process.env.BROWSER_CHANNEL || undefined,headless:true});
 const context = await browser.newContext();
 const page = await context.newPage();
 const results=[];
 for(const [width,height] of sizes){
  await page.setViewportSize({width,height});
  for(const name of pages){
   const errors=[]; const errorListener=e=>errors.push(e.message);page.on('pageerror',errorListener);
   await page.goto(base+name+'.html');
   await page.evaluate(()=>document.fonts.ready);
   const metrics=await page.evaluate(()=>{
    const visible=e=>e.getClientRects().length && getComputedStyle(e).visibility!=='hidden';
    const overflows=[...document.querySelectorAll('main *,header *')].filter(e=>visible(e)&&!e.classList.contains('skip')).filter(e=>{const r=e.getBoundingClientRect();return r.left < -1 || r.right>innerWidth+1 || e.scrollWidth>e.clientWidth+2 && getComputedStyle(e).overflowX==='visible';}).map(e=>({tag:e.tagName,cls:e.className,text:e.textContent.trim().replace(/\s+/g,' ').slice(0,65),client:e.clientWidth,scroll:e.scrollWidth}));
    const clippedText=[];for(const e of document.querySelectorAll('h1,h2,h3,p,a,span')){if(!visible(e))continue;const range=document.createRange();range.selectNodeContents(e);const rects=[...range.getClientRects()];const box=e.getBoundingClientRect();if(rects.some(r=>r.left<box.left-2||r.right>box.right+2))clippedText.push({tag:e.tagName,cls:e.className,text:e.textContent.trim().replace(/\s+/g,' ').slice(0,65)});}
    return {viewport:[innerWidth,innerHeight],documentWidth:document.documentElement.scrollWidth,overflows,clippedText,images:[...document.images].map(i=>({src:i.getAttribute('src'),ok:i.complete&&i.naturalWidth>0})),sections:document.querySelectorAll('main section').length,fonts:document.fonts.status,headings:[...document.querySelectorAll('h1,h2,h3')].map(e=>e.textContent.trim().replace(/\s+/g,' '))};
   });
   await page.screenshot({path:path.join(out,`${name}-${width}x${height}.png`),fullPage:true});
   const menu=page.getByRole('button',{name:'Abrir menu'});let menuTest='desktop';
   if(await menu.isVisible()){
    await menu.click(); const expanded=await page.locator('.menu-toggle').getAttribute('aria-expanded');const count=await page.locator('.nav a:visible').count();
    await page.locator('.menu-toggle').press('Escape'); const closed=await page.locator('.menu-toggle').getAttribute('aria-expanded');
    menuTest={expanded,count,closed};
   }
   results.push({name,width,height,...metrics,menuTest,errors});page.off('pageerror',errorListener);
   console.log(`${phase} ${name} ${width}x${height}: overflow=${metrics.overflows.length}, text=${metrics.clippedText.length}`);
  }
 }
 await fs.writeFile(path.join(out,'results.json'),JSON.stringify(results,null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1});
