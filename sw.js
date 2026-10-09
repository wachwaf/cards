const V='cards-v3',SDK='https://www.gstatic.com/firebasejs/10.12.2/',FILES=['./','index.html','manifest.json','icon-180.png','icon-512.png'],EXTRA=['firebase-app.js','firebase-auth.js','firebase-firestore.js'].map(f=>SDK+f);
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(async c=>{await c.addAll(FILES);await Promise.allSettled(EXTRA.map(u=>c.add(u)))}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
 if(new URL(r.url).origin!==location.origin&&!r.url.startsWith(SDK))return;
 e.respondWith(fetch(r).then(x=>{const cp=x.clone();caches.open(V).then(c=>c.put(r,cp));return x}).catch(()=>caches.match(r,{ignoreSearch:true}).then(x=>x||caches.match('index.html'))))});