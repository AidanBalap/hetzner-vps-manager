// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  routeRules: {
    '/*': { ssr: false },
    '/*/**': { ssr: false },
  },

  plugins: [
    '~/plugins/toaster.client.ts',
  ],

  compatibilityDate: '2024-11-07',
})