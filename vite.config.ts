import { sentryVitePlugin } from '@sentry/vite-plugin';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const appName = env.VITE_APP_NAME || 'PIPS!';
  return {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },

    plugins: [
      VitePWA({
        strategies: 'injectManifest',
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true,
          type: 'module',
        },
        srcDir: 'src',
        filename: 'sw.ts',
        manifest: {
          name: appName,
          short_name: appName,
          description: 'Aplikasi resmi Himpunan Mahasiswa Informatika ITB',
          icons: [
            {
              src: '/android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: '/android-chrome-maskable-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: '/android-chrome-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
          screenshots: [
            {
              sizes: '813x1446',
              src: '/img/ss/login.jpg',
              type: 'image/jpg',
              form_factor: 'narrow',
              label: 'Login page',
            },
          ],
          theme_color: '#FFFFFF',
          background_color: '#2F754A',
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
                  accept: ['image/*'],
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
            {
              urlPattern: /^\/img\/.*\.svg$/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'icons-cache',
                expiration: {
                  maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
                },
                cacheableResponse: {
                  statuses: [0, 299],
                },
              },
            },
          ],
        },
      }),
      react(),
      TanStackRouterVite(),
      sentryVitePlugin({
        org: 'hmif',
        project: 'hmif-app-fe',
        url: 'https://errors.hmif.dev',
        debug: true,
        disable: true,
      }),
    ],

    build: {
      sourcemap: true,
    },
  };
});
