const CACHE_NAME = 'toko-pwa-v1';
const urlsToCache = [
  './',
  './index.html',
  './app.js',
  './manifest.json'
];

// ==========================================
// FASE 1 — INSTALL
// Manajer memfotokopi semua file penting
// ke dalam "laci" (Cache) browser.
// ==========================================
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Membuka cache & menyimpan file...');
        return cache.addAll(urlsToCache);
      })
  );
});

// ==========================================
// FASE 2 — ACTIVATE
// Manajer membersihkan cache versi lama
// agar pelanggan selalu dapat menu terbaru.
// ==========================================
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Menghapus cache lama:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// ==========================================
// FASE 3 — FETCH (MENCEGAT)
// Jika offline → ambil dari Cache.
// Jika online → ambil dari internet seperti biasa.
// ==========================================
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // File ada di cache → kembalikan (Offline Mode)
        if (response) {
          console.log('[SW] Melayani dari cache:', event.request.url);
          return response;
        }
        // File tidak ada di cache → ambil dari internet (Online Mode)
        return fetch(event.request);
      })
  );
});