import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    // ✅ Rotas públicas
    if (
      req.nextUrl.pathname === "/" ||
      req.nextUrl.pathname.startsWith("/api/auth") ||
      req.nextUrl.pathname === "/unauthorized" ||
      req.nextUrl.pathname.startsWith("/api/track-action") // 🚀 liberado
    ) {
      return NextResponse.next()
    }

    // 🚨 Se não tem sessão → manda pro Google login
    if (!req.nextauth.token) {
      return NextResponse.redirect(
        new URL("/api/auth/signin/google", req.url),
      )
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req }) => {
        if (
          req.nextUrl.pathname === "/" ||
          req.nextUrl.pathname.startsWith("/api/auth") ||
          req.nextUrl.pathname === "/unauthorized" ||
          req.nextUrl.pathname.startsWith("/api/track-action")
        ) {
          return true
        }
        return true // 🔑 fallback
      },
    },
  },
)

// 🔗 Middleware só protege dashboard
export const config = {
  matcher: ["/dashboard/:path*"],
}
