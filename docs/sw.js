const CACHE='right-travel-pwa-v1';
const ASSETS=['./','./index.html','./styles.css','./app.js','./core.js','./data.js','./manifest.webmanifest','./landscape.svg','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('right-travel-pwa-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
 if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).catch(()=>caches.open(CACHE).then(cache=>cache.match(new URL('./index.html',self.registration.scope).href))));return;}
 event.respondWith(caches.open(CACHE).then(async cache=>{const canonical=new URL(url);canonical.search='';const match=await cache.match(canonical.href);return match||fetch(event.request);}));
});
