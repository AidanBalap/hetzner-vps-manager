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

  modules: [
    '@sidebase/nuxt-auth'
  ],
  auth: {
    provider: {
      type: 'authjs',
      trustHost: false,
      defaultProvider: 'discord',
      addDefaultCallbackUrl: true
    }
  },

  compatibilityDate: '2024-11-07',
})