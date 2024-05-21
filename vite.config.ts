import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    VitePWA({
      strategies: 'injectManifest',
      registerType: 'prompt',
      devOptions: {
        enabled: true,
        type: 'module',
      },
      srcDir: 'src',
      filename: 'sw.ts',
      manifest: {
        name: 'HMIF App',
        short_name: 'HMIF App',
        description: 'Aplikasi resmi Himpunan Mahasiswa Informatika ITB',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            sizes: '396x704',
            src: '/img/ss.png',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Main page',
          },
        ],
        theme_color: '#FFFFFF',
        background_color: '#ffffff',
        display: 'standalone',
        share_target: {
          action: '/share-file-handler',
          method: 'POST',
          enctype: 'multipart/form-data',
          params: {
            title: 'title',
            text: 'text',
            url: 'url',
            files: [
              {
                name: 'images',
                accept: ['image/jpg'],
              },
            ],
          },
        },
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
    react(),
    TanStackRouterVite(),
  ],
});
