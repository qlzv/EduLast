// public/service-worker.js

const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [

    '/index.ejs',
    '/login/login.ejs',
    '/assests/css/main.css',
    '/assests/css/login.css',
    '/assests/css/bootstrap.css',
    '/assests/css/all.min.css',
    '/assests/js/main.js',
    '/assests/js/bootstrap.bundle.min.js',
    '/assests/js/all.min.js',
    '/assests/js/loader.js',
    '/assests/js/language.js',
    '/assests/js/login.js',
    '/assests/js/error.js',
    '/assests/img/apple-touch-icon.png',
    '/assests/img/favicon-32x32.png',
    '/assests/img/favicon-16x16.png',
    '/assests/img/site.webmanifest',
    // Add other static assets you want to cache
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});
self.addEventListener('fetch', event => {
    event.respondWith(
      fetch(event.request, { redirect: 'follow' })
        .then(response => {
          // Handle the response
          return response;
        })
        .catch(error => {
          console.error('Fetch error:', error);
        })
    );
  });
  
self.addEventListener('activate', function activator(event) {
    console.log('activate!');

    // Here we see another wait until....
    event.waitUntil(

        // I won't go too much into detail here because 
        // there's a lot of stuff you can look up yourself // (filter() and map() being two of them), but 
        // basically this function is in case there's 
        // previously cached content, then we get rid of 
        // it and populate it with the newest cached 
        // content. This is only if you need them to 
        // install a v2, v3, v4, etc... In a nutshell it 
        // wipes out their previous cache and replaces it 
        // with the new version. 
        
        caches.keys().then(function(keys) {
            return Promise.all(keys
                .filter(function(key) {
                    return key.indexOf(CACHE_NAME) !== 0;
                })
                .map(function(key) {
                    return caches.delete(key);
                })
            );
        })
    );
});
