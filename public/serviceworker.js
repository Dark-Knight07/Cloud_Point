// Created a Service Worker the code uses Promises and ductands and we need 
// to write all the Code
//  in event waitUntil Fucntion 

const CACHE_NAME = "version-1";
const urlsToCache = ['index.html', 'offline.html'];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache)=> {
            console.log('Opened Cache');

            return cache.addAll(urlsToCache);
        })

    )

});


// Listner for requests
self.addEventListener('fetch', (event) => {
    event.respodWith(
        caches.match(event.request)
        .then(() => {
            return fetch(event.request)
            .catch(() => caches.match('offline.html'))
        })
    )

});


// Activate the SW 
self.addEventListener('activate', (event) => {
    const cacheWhitelist =[];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhitelist.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })
        ))
    )

});