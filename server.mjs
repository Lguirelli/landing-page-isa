import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=process.cwd(); const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.jpg':'image/jpeg','.svg':'image/svg+xml'};
const port=Number(process.argv.find((v,i,a)=>a[i-1]==='--port')||4173);
createServer(async(req,res)=>{const path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname.replace(/\/$/,'/index.html')));if(!path.startsWith(root+sep)){res.writeHead(403).end();return}try{const data=await readFile(path);res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream'}).end(data)}catch{res.writeHead(404).end('Not found')}}).listen(port,'0.0.0.0');
