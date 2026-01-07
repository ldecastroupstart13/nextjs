import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const ALLOWED_EMAILS = ["leonardo.decastro.brazil@gmail.com", "rmarquez@upstart13.com", "Ashley.Whiteside@gladney.org", "Caitlyn.ussery@gladney.org", "Clay.thomas@gladney.org", "Corey.Fields@gladney.org", "Diana.DeGroot@gladney.org", "Erin.gibson@gladney.org", "Heidi.Cox@gladney.org", "Holly.Yarborough@gladney.org", "Jennifer.hart@gladney.org", "Kasey.whitley@gladney.org", "Kati.silcox@gladney.org", "Kerry.Tobar@gladney.org", "Kristen.slomka@gladney.org", "Kristin.Porter@gladney.org", "Lisa.Schuessler@gladney.org", "Mark.Melson@gladney.org", "Natalie.Bowen@gladney.org", "Ryan.Doty@gladney.org", "jairosm88@gmail.com", "rjohnson@mojomarketingconsulting.com", "oakley.jones@gladney.org", "chandler.markwardt@gladney.org", "ashley.whiteside@gladney.org", "oakley@adoption.com"]
const ALLOWED_DOMAIN = "@upstart13.com"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false

      const isAllowedEmail = ALLOWED_EMAILS.includes(user.email)
      const isAllowedDomain = user.email.endsWith(ALLOWED_DOMAIN)

      return isAllowedEmail || isAllowedDomain
    },

    async redirect({ baseUrl, url }) {
      if (url.includes("/unauthorized") || url.includes("/error")) {
        return `${baseUrl}/unauthorized`
      }
      return `${baseUrl}/select-dashboard`
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub as string
        (session.user as any).loginTime = new Date().toISOString()
      }
      return session
    },

    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
  },

  pages: {
    error: "/unauthorized",
  },

  session: {
    strategy: "jwt",
    maxAge: 20 * 60, // 20 min
    updateAge: 0,
  },
}
