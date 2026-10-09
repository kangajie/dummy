const CACHE_NAME = 'smartagro-v1.1';
const urlsToCache = [
  '/',
  '/index.html',
  '/login/index.html',
  '/icon-192.png',
  '/icon-512.png',
  '/assets/image/logo-itech.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async cache => {
        for (let url of urlsToCache) {
          try {
            await cache.add(url);
          } catch (e) {
            console.warn('Failed to cache:', url, e);
          }
        }
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
