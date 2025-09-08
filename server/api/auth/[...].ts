import DiscordProvider from 'next-auth/providers/discord';
import { NuxtAuthHandler } from '#auth';

const runtimeConfig = useRuntimeConfig();
const allowedUsers = runtimeConfig.auth.allowedUsers;

export default NuxtAuthHandler({
  secret: runtimeConfig.auth.secret,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    DiscordProvider.default({
      clientId: runtimeConfig.auth.discordId,
      clientSecret: runtimeConfig.auth.discordSecret,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user.name && allowedUsers.includes(user.name)) {
        return true;
      }

      return false;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + '/servers';
    },
  },
});
