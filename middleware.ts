import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Permite acesso a rotas públicas
    if (
      req.nextUrl.pathname === "/" || // Landing page
      req.nextUrl.pathname.startsWith("/api/auth") || // Rotas internas do NextAuth
      req.nextUrl.pathname === "/unauthorized" // Página de erro
    ) {
      return NextResponse.next()
    }

    // 🚨 Se não estiver autenticado → força login com Google
    if (!req.nextauth.token) {
      return NextResponse.redirect(
        new URL("/api/auth/signin/google", req.url) // chama direto o provedor Google
      )
    }

    // 🔐 Verifica se o usuário tem acesso (email específico ou domínio permitido)
    const email = req.nextauth.token.email as string
    const ALLOWED_EMAILS = ["leonardo.decastro.brazil@gmail.com", "rmarquez@upstart13.com", "Ashley.Whiteside@gladney.org", "Caitlyn.ussery@gladney.org", "Clay.thomas@gladney.org", "Corey.Fields@gladney.org", "Diana.DeGroot@gladney.org", "Erin.gibson@gladney.org", "Heidi.Cox@gladney.org", "Holly.Yarborough@gladney.org", "Jennifer.hart@gladney.org", "Kasey.whitley@gladney.org", "Kati.silcox@gladney.org", "Kerry.Tobar@gladney.org", "Kristen.slomka@gladney.org", "Kristin.Porter@gladney.org", "Lisa.Schuessler@gladney.org", "Mark.Melson@gladney.org", "Natalie.Bowen@gladney.org", "Ryan.Doty@gladney.org", "jairosm88@gmail.com", "rjohnson@mojomarketingconsulting.com", "oakley.jones@gladney.org", "chandler.markwardt@gladney.org", "ashley.whiteside@gladney.org", "oakley@adoption.com"]
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
        // Libera as rotas públicas
        if (
          req.nextUrl.pathname === "/" ||
          req.nextUrl.pathname.startsWith("/api/auth") ||
          req.nextUrl.pathname === "/unauthorized"
        ) {
          return true
        }

        // Para rotas protegidas, só segue se tiver token
        return !!token
      },
    },
  },
)

// 🔗 Middleware só roda nas rotas protegidas
export const config = {
  matcher: ["/dashboard/:path*", "/select-dashboard"],
}

