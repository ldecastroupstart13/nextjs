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
    const ALLOWED_EMAILS = ["leonardo.decastro.brazil@gmail.com", "itsai@upstart13.com", "mamantea@upstart13.com", "jennifer.james@gladney.org", "rmarquez@upstart13.com", "ashley.whiteside@gladney.org", "caitlyn.ussery@gladney.org",
                        "clay.thomas@gladney.org", "corey.fields@gladney.org", "diana.deGroot@gladney.org", "erin.gibson@gladney.org", "heidi.cox@gladney.org",
                        "holly.yarborough@gladney.org", "jennifer.hart@gladney.org", "kasey.whitley@gladney.org", "kati.silcox@gladney.org", "kerry.tobar@gladney.org",
                        "kristen.slomka@gladney.org", "kristin.porter@gladney.org", "lisa.schuessler@gladney.org", "mark.melson@gladney.org", "natalie.bowen@gladney.org",
                        "ryan.doty@gladney.org", "jairosm88@gmail.com", "rjohnson@mojomarketingconsulting.com", "oakley.jones@gladney.org", "chandler.markwardt@gladney.org",
                        "ashley.whiteside@gladney.org", "oakley@adoption.com", "susanne.smith@gladney.org", "tanya.houk@gladney.org"]
    
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

