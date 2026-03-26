const CACHE_NAME = 'ftp-v3';
const PAGES = [
  './', 'index.html',
  'chapter1.html', 'chapter2.html', 'chapter3.html',
  'chapter4.html', 'chapter4-danger.html',
  'chapter5.html', 'chapter5-guard.html', 'chapter5-spaceforce.html',
  'chapter6.html', 'chapter6-dsca.html', 'chapter6-fcd1.html', 'chapter6-devolution.html',
  'chapter7.html', 'chapter8.html', 'chapter9.html', 'chapter10.html',
  'faq.html', 'glossary.html', 'about.html',
  'css/style.css', 'js/app.js', 'manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(PAGES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Network-first strategy for HTML pages to always get latest
  if (e.request.mode === 'navigate' || e.request.headers.get('accept')?.includes('text/html')) {
    e.respondWith(
      fetch(e.request).then(resp => {
        if (resp.ok) {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return resp;
      }).catch(() => caches.match(e.request).then(cached => cached || caches.match('index.html')))
    );
  } else {
    // Cache-first for CSS, JS, images
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request).then(resp => {
        if (resp.ok && e.request.url.includes(self.location.origin)) {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return resp;
      }).catch(() => caches.match('index.html')))
    );
  }
});
