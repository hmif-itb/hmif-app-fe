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
