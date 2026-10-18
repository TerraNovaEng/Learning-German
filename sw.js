const CACHE_NAME = 'german-learner-v1';
const assetsToCache = [
  'index.html',
  'public/style.css',
  'src/app.js',
  'manifest.json',
  'public/icon-192.png',
  'public/icon-512.png'
];

// Install Event - caching your files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(assetsToCache))
  );
});

// Fetch Event - serving cached files when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
