
const CACHE_NAME = 'inventario-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/install.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then(cached => cached || fetch(event.request).then(res => {
        return caches.open(CACHE_NAME).then(cache => { cache.put(event.request, res.clone()); return res; });
      }).catch(()=>caches.match('/index.html')))
    );
  } else {
    event.respondWith(
      fetch(event.request).then(response => response).catch(() => caches.match(event.request))
    );
  }
});
