const CACHE_NAME = 'ftp-v10';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Network-first for EVERYTHING
  // Only use cache as fallback when offline
  e.respondWith(
    fetch(e.request).then(resp => {
      if (resp.ok && e.request.url.includes(self.location.origin)) {
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
      }
      return resp;
    }).catch(() => caches.match(e.request).then(cached => cached || caches.match('index.html')))
  );
});
