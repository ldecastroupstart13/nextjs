import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

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

      const authorized = isAllowedEmail || isAllowedDomain

      // 🔹 monta payload para logar no Sheets
      const payload = {
        action: authorized ? "authorized_login" : "unauthorized_attempt",
        route: "/landing",
        timestamp: new Date().toISOString(),
        email: user.email,
        redirectTo: authorized ? "/select-dashboard" : "/unauthorized",
      }

      try {
        await fetch(`${process.env.NEXTAUTH_URL}/api/track-action`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      } catch (err) {
        console.error("❌ Falha ao logar tentativa", err)
      }

      return authorized
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
    maxAge: 20 * 60, // 20 minutos total
    updateAge: 0,    // força revalidação sempre que fizer request
  },
}
