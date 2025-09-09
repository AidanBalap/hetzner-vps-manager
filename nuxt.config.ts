// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@sidebase/nuxt-auth',
    '@nuxt/eslint',
  ],

  plugins: [
    '~/plugins/toaster.client.ts',
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    hetznerApi: process.env.HETZNER_API_KEY,
    auth: {
      allowedUsers: process.env.ALLOWED_USERS ? process.env.ALLOWED_USERS.split(',') : [],
      baseURL: process.env.AUTH_ORIGIN,
      secret: process.env.AUTH_SECRET,
      discordId: process.env.DISCORD_CLIENT_ID,
      discordSecret: process.env.DISCORD_CLIENT_SECRET,
    },
    public: {
      appName: process.env.APP_NAME,
    },
  },

  routeRules: {
    '/*': { ssr: false },
    '/*/**': { ssr: false },
  },

  compatibilityDate: '2024-11-07',

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: 'authjs',
      trustHost: false,
      defaultProvider: 'discord',
      addDefaultCallbackUrl: true,
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
});
