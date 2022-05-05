import { resolve } from 'path';
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config
export default defineConfig({
  define: {
    'process.env': process.env,
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/variable.scss";`,
      },
    },
  },
  plugins: [
    createVuePlugin(),
    VitePWA({
      registerType: 'prompt',
      manifest: {
        name: 'SunrinPay',
        icons: [
          {
            src: 'https://firebasestorage.googleapis.com/v0/b/sunrinpay.appspot.com/o/icon%2Fandroid-icon-36x36.png?alt=media&token=f2c389ae-ab33-484d-bb20-6f813286c220',
            sizes: '36x36',
            type: 'image/png',
            density: '0.75',
          },
          {
            src: 'https://firebasestorage.googleapis.com/v0/b/sunrinpay.appspot.com/o/icon%2Fandroid-icon-48x48.png?alt=media&token=ed6f8c57-42b5-42a3-9df2-ef5e0dc1e3e3',
            sizes: '48x48',
            type: 'image/png',
            density: '1.0',
          },
          {
            src: 'https://firebasestorage.googleapis.com/v0/b/sunrinpay.appspot.com/o/icon%2Fandroid-icon-72x72.png?alt=media&token=fc7125f6-172d-4855-9882-12625f7ceaea',
            sizes: '72x72',
            type: 'image/png',
            density: '1.5',
          },
          {
            src: 'https://firebasestorage.googleapis.com/v0/b/sunrinpay.appspot.com/o/icon%2Fandroid-icon-96x96.png?alt=media&token=26d91169-65dc-44db-9b1d-e35434bccac5',
            sizes: '96x96',
            type: 'image/png',
            density: '2.0',
          },
          {
            src: 'https://firebasestorage.googleapis.com/v0/b/sunrinpay.appspot.com/o/icon%2Fandroid-icon-144x144.png?alt=media&token=42b82cfe-543d-42e7-a3e7-73984adcd31b',
            sizes: '144x144',
            type: 'image/png',
            density: '3.0',
          },
          {
            src: 'https://firebasestorage.googleapis.com/v0/b/sunrinpay.appspot.com/o/icon%2Fandroid-icon-192x192.png?alt=media&token=f522fa7b-4b4a-4770-b74a-586247bbe68e',
            sizes: '192x192',
            type: 'image/png',
            density: '4.0',
          },
        ],
        id: '/',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#538fff',
      },
    }),
  ],
});
