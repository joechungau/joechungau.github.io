self.addEventListener('install', event => {
    console.log('Service Worker installing.');
    event.waitUntil(
        caches.open('my-pwa-cache').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/manifest.json',
                '/icons/icon-192x192.png',
                '/icons/icon-512x512.png',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'
            ]);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('Service Worker activating.');
});

self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
