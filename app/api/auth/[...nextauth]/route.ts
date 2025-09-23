import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  // 👇 força o NextAuth a nunca usar /auth/signin
  pages: {
    signIn: "/api/auth/signin/google",
  },
})

export { handler as GET, handler as POST }
