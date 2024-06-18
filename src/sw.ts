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
        badge: '/favicon-32x32.png',
        ...message.options,
      }),
    );
  } catch (err) {
    console.error(err);
  }
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
