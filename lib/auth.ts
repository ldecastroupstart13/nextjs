import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const ALLOWED_EMAILS = ["leonardo.decastro.brazil@gmail.com"]
const ALLOWED_DOMAIN = "@upstart13.com"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent select_account", // 🔑 sempre mostra tela de login/consentimento
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

      // 🔹 se o email NÃO for permitido → registra no Sheets
      if (!(isAllowedEmail || isAllowedDomain)) {
        try {
          await fetch(`${process.env.NEXTAUTH_URL}/api/track-action`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "unauthorized_attempt",
              route: "/landing",
              timestamp: new Date().toISOString(),
              email: user.email,
            }),
          })
        } catch (err) {
          console.error("❌ Falha ao logar tentativa não autorizada", err)
        }

        return false
      }

      return true
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
    maxAge: 30 * 60, // 30 minutos
  },
}
