import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Zawsze najnowszy build: service worker aktualizuje się automatycznie,
      // a strona przejmuje kontrolę od razu (patrz registerType + skipWaiting).
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}'],
        // Generator PDF (pdfmake + font Roboto, ~2 MB) NIE trafia do precache — instalacja
        // PWA ma być lekka. Te chunki dogrywają się do cache przy pierwszym eksporcie (niżej).
        globIgnores: ['**/assets/pdfmake-*.js', '**/assets/vfs_fonts-*.js'],
        maximumFileSizeToCacheInBytes: 1_000_000,
        runtimeCaching: [
          {
            // Zasoby z /assets są niezmienne (hash w nazwie) — cache-first, offline po 1. użyciu.
            urlPattern: /\/assets\/.*\.(?:js|css|woff2?)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'ph-assets',
              expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 90 },
            },
          },
        ],
      },
      manifest: {
        name: 'poly-helper — narzędzia dla relacji',
        short_name: 'poly-helper',
        description:
          'Narzędzia wspierające budowanie relacji (poliamorycznych i monogamicznych) — do wypełniania online i druku.',
        lang: 'pl',
        dir: 'ltr',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#F4EFEA',
        theme_color: '#3F7E72',
        icons: [
          {
            src: '/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: '/icon-maskable.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
})
