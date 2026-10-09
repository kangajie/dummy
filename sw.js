const CACHE_NAME = 'smartagro-v1';
const urlsToCache = [
  './',
  './index.html',
  './login/',
  './login/index.html',
  './icon-192.png',
  './icon-512.png',
  './assets/image/logo-itech.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
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
