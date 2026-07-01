const CACHE = 'furpal-v1';
const URLS = ['/', '/css/style.min.css', '/js/data.js', '/js/data-provider.js', '/js/app.min.js', '/js/admin.min.js', '/images/favicon.svg'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(URLS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(clients.claim()); });
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});