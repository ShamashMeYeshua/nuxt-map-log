import tailwindcss from "@tailwindcss/vite"
import "./lib/env"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@pinia/nuxt'
  ],
  css: ['~/assets/css/app.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    server: {
      proxy: {
        '/.well-known': {
          target: 'http://localhost:3000', // Default Nuxt dev server port
          changeOrigin: true,
          bypass: (req, res) => {
            if (req.url.includes('com.chrome.devtools.json')) {
              res.statusCode = 404; // Return 404 for this specific file
              res.end();
              return true; // Bypass Nuxt’s router
            }
          },
        },
      },
    },
  },
  colorMode: {
    dataValue: 'theme',
  }
});