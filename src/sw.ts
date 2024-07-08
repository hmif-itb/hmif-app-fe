import { clientsClaim } from 'workbox-core';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';

declare let self: ServiceWorkerGlobalScope;

if (import.meta.env.PROD) {
  cleanupOutdatedCaches();
  precacheAndRoute(self.__WB_MANIFEST);

  self.skipWaiting();
  clientsClaim();
}

self.addEventListener('push', (e) => {
  if (
    typeof Notification === 'undefined' ||
    Notification.permission !== 'granted' ||
    !e.data
  ) {
    return;
  }
  try {
    const message = e.data.json();
    e.waitUntil(
      self.registration.showNotification(message.title, {
        icon: '/icon-foreground.png',
        badge: '/logo-nobg-256x256.png',
        ...message.options,
      }),
    );
  } catch (err) {
    console.error(err);
  }
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const rootUrl = new URL('/', location.href);
  if (e.notification.data && e.notification.data.url) {
    rootUrl.pathname = e.notification.data.url;
  }
  const url = rootUrl.href;
  e.waitUntil(
    self.clients.matchAll().then((clients) => {
      for (const client of clients) {
        if (
          client.url === url &&
          'focus' in client &&
          typeof client.focus === 'function'
        ) {
          return client.focus();
        }
      }

      return self.clients.openWindow(url);
    }),
  );
});
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (
    event.request.method !== 'POST' ||
    url.pathname !== '/share-file-handler'
  ) {
    return;
  }

  event.respondWith(
    (async () => {
      // Get the data from the submitted form.
      const formData = await event.request.formData();

      // Get the submitted files.
      const imageFiles = formData.get('images');

      // Send the files to the frontend app.
      postMessage({ type: 'imageData', data: imageFiles });

      // TODO: Redirect the user to a URL that shows the imported files.
      return Response.redirect('/display-new-files', 303);
    })(),
  );
});

import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

const assetsExt = [
  '.js',
  '.css',
  '.png',
  '.jpg',
  '.jpeg',
  '.svg',
  '.webp',
  '.ico',
];

registerRoute(
  ({ url }) => assetsExt.some((ext) => url.pathname.endsWith(ext)),
  new StaleWhileRevalidate({
    cacheName: 'assets-cache',
  }),
);
