import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Permite acesso a rotas públicas
    if (
      req.nextUrl.pathname === "/" ||
      req.nextUrl.pathname.startsWith("/api/auth") ||
      req.nextUrl.pathname === "/unauthorized"
    ) {
      return NextResponse.next()
    }

    // Se não estiver autenticado → volta para a Landing Page
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    // Verifica se o usuário tem acesso (email autorizado ou domínio permitido)
    const email = req.nextauth.token.email as string
    const ALLOWED_EMAILS = ["leonardo.decastro.brazil@gmail.com"]
    const ALLOWED_DOMAIN = "@upstart13.com"

    const hasAccess =
      ALLOWED_EMAILS.includes(email) || email.endsWith(ALLOWED_DOMAIN)

    if (!hasAccess) {
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Permite rotas públicas
        if (
          req.nextUrl.pathname === "/" ||
          req.nextUrl.pathname.startsWith("/api/auth") ||
          req.nextUrl.pathname === "/unauthorized"
        ) {
          return true
        }

        // Para rotas protegidas, precisa estar autenticado
        return !!token
      },
    },
  },
)

export const config = {
  matcher: ["/dashboard/:path*", "/api/track-action"],
}
