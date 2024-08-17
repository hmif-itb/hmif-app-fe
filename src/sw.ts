import { IDBPDatabase, openDB } from 'idb';
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

import { registerRoute } from 'workbox-routing';
import { NetworkOnly, StaleWhileRevalidate } from 'workbox-strategies';

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

registerRoute(
  ({ url }) => url.pathname === '/share-file-handler',
  new NetworkOnly(),
  'POST',
);

let db: IDBPDatabase | null = null;

async function openDatabase() {
  if (!db) {
    db = await openDB('SharedContentDB', 1, {
      upgrade(db) {
        db.createObjectStore('sharedContent', { keyPath: 'id' });
      },
    });
  }
  return db;
}

interface SharedData {
  id: string;
  title: string;
  text: string;
  url: string;
  images?: {
    name: string;
    type: string;
    data: ArrayBuffer;
  }[];
}

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
      const title = formData.get('title') || '';
      const text = formData.get('text') || '';
      const url = formData.get('url') || '';
      const images = formData.getAll('images') as File[];
      await storeSharedData({
        id: 'data',
        title: title as string,
        text: text as string,
        url: url as string,
        images: await Promise.all(
          images.map(async (image) => ({
            name: image.name,
            type: image.type,
            data: await image.arrayBuffer(),
          })),
        ),
      });

      return Response.redirect('/add-announcement', 303);
    })(),
  );
});

async function storeSharedData(data: SharedData): Promise<void> {
  const db = await openDatabase();
  await db.put('sharedContent', data);
}
