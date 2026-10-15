/* Reprise : fonctionne sans réseau. Change VERSION à chaque mise à jour pour renouveler le cache. */
var VERSION='reprise-v3';
var FILES=["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "barlow-condensed-latin-500-normal.woff2", "barlow-condensed-latin-600-normal.woff2", "barlow-condensed-latin-700-normal.woff2", "barlow-latin-400-normal.woff2", "barlow-latin-500-normal.woff2", "barlow-latin-600-normal.woff2", "barlow-latin-700-normal.woff2"];
self.addEventListener('install',function(e){e.waitUntil(caches.open(VERSION).then(function(c){return c.addAll(FILES)}).then(function(){return self.skipWaiting()}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==VERSION}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}));});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(hit){
    var net=fetch(e.request).then(function(r){if(r&&r.ok&&new URL(e.request.url).origin===location.origin){var cp=r.clone();caches.open(VERSION).then(function(c){c.put(e.request,cp)});}return r}).catch(function(){return hit});
    return hit||net;
  }));
});
