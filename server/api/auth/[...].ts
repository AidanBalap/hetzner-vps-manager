import DiscordProvider from 'next-auth/providers/discord'
import { NuxtAuthHandler } from '#auth'

const allowedUsers = process.env.ALLOWED_USERS ? process.env.ALLOWED_USERS.split(',') : []

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    DiscordProvider.default({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET
    })
  ],

  callbacks: {
    async signIn({user, account, profile, email, credentials}) {
        if (user.name && allowedUsers.includes(user.name)) {
            return true
        }

        return false
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + '/servers'
    }
  }
})