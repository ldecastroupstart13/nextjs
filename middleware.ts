import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Allow access to public routes
    if (
      req.nextUrl.pathname === "/" ||
      req.nextUrl.pathname.startsWith("/api/auth") ||
      req.nextUrl.pathname === "/unauthorized"
    ) {
      return NextResponse.next()
    }

    // Check if user is authenticated
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.url))
    }

    // Check if user has access (domain or allowed email)
    const email = req.nextauth.token.email as string
    const ALLOWED_EMAILS = ["leonardo.decastro.brazil@gmail.com"]
    const ALLOWED_DOMAIN = "@upstart13.com"

    const hasAccess = ALLOWED_EMAILS.includes(email) || email.endsWith(ALLOWED_DOMAIN)

    if (!hasAccess) {
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow public routes
        if (
          req.nextUrl.pathname === "/" ||
          req.nextUrl.pathname.startsWith("/api/auth") ||
          req.nextUrl.pathname === "/unauthorized"
        ) {
          return true
        }

        // Require authentication for protected routes
        return !!token
      },
    },
  },
)

export const config = {
  matcher: ["/dashboard/:path*", "/api/track-action"],
}
