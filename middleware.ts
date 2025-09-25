import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

// 🚀 Função auxiliar para logar direto no endpoint interno
async function logToSheets(data: {
  email: string
  route: string
  action: string
  ip: string
  userAgent: string
}) {
  try {
    await fetch(`${process.env.NEXTAUTH_URL}/api/track-action`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: data.action,
        route: data.route,
        ip: data.ip,
        userAgent: data.userAgent,
        email: data.email,
      }),
    })
  } catch (e) {
    console.error("❌ Erro ao logar no Sheets via middleware:", e)
  }
}

export default withAuth(
  async function middleware(req) {
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown"
    const userAgent = req.headers.get("user-agent") || "unknown"

    // ✅ Rotas públicas
    if (
      req.nextUrl.pathname === "/" ||
      req.nextUrl.pathname.startsWith("/api/auth") ||
      req.nextUrl.pathname === "/unauthorized"
    ) {
      return NextResponse.next()
    }

    // 🚨 Sem token → manda pro login oficial do NextAuth
    if (!req.nextauth.token) {
      await logToSheets({
        email: "unknown",
        route: req.nextUrl.pathname,
        action: "unauthenticated_redirect",
        ip,
        userAgent,
      })
      return NextResponse.redirect(new URL("/api/auth/signin", req.url))
    }

    // 🔐 Tem token → verifica acesso
    const email = req.nextauth.token.email as string
    const ALLOWED_EMAILS = ["leonardo.decastro.brazil@gmail.com"]
    const ALLOWED_DOMAIN = "@upstart13.com"

    const hasAccess =
      ALLOWED_EMAILS.includes(email) || email.endsWith(ALLOWED_DOMAIN)

    if (!hasAccess) {
      await logToSheets({
        email,
        route: req.nextUrl.pathname,
        action: "unauthorized_redirect",
        ip,
        userAgent,
      })
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

    // ✅ Autorizado → loga também
    await logToSheets({
      email,
      route: req.nextUrl.pathname,
      action: "authorized_access",
      ip,
      userAgent,
    })

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Libera rotas públicas
        if (
          req.nextUrl.pathname === "/" ||
          req.nextUrl.pathname.startsWith("/api/auth") ||
          req.nextUrl.pathname === "/unauthorized"
        ) {
          return true
        }
        return !!token // só deixa passar se tiver token
      },
    },
  },
)

// 🔗 Middleware só roda nas rotas protegidas
export const config = {
  matcher: ["/dashboard/:path*", "/api/track-action"],
}
