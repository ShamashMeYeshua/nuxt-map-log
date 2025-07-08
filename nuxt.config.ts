import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', '@nuxt/icon'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  //css: [require('~/assets/main.css')],
});