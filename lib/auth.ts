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

  // 🔹 Decide rota pós-login OU erro
  async redirect({ baseUrl, url }) {
    // Se a URL de destino contém erro → manda para /unauthorized
    if (url.includes("/unauthorized") || url.includes("/error")) {
      return `${baseUrl}/unauthorized`
    }

    // Caso normal (usuário autorizado)
    return `${baseUrl}/select-dashboard`
  },
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

  // 🔹 Quem não pode logar vai direto para aqui
  pages: {
    error: "/unauthorized",
  },

  session: {
    strategy: "jwt",
    maxAge: 20 * 60, // 20 min
    updateAge: 0,
  },
}
