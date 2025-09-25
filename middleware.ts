import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    // 🚀 Rotas públicas
    if (
      req.nextUrl.pathname === "/" ||
      req.nextUrl.pathname.startsWith("/api/auth") ||
      req.nextUrl.pathname === "/unauthorized"
    ) {
      return NextResponse.next()
    }

    // 🔒 Rotas protegidas
    if (!req.nextauth?.token) {
      return NextResponse.redirect(
        new URL("/api/auth/signin/google", req.url)
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
          req.nextUrl.pathname === "/unauthorized"
        ) {
          return true
        }
        return !!req.nextauth?.token
      },
    },
  }
)

// 🔗 Middleware só roda nas rotas protegidas
export const config = {
  matcher: ["/dashboard/:path*"], // protege /dashboard e subrotas
}
