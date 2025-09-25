import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

// 🔑 Função auxiliar para logar no Sheets
async function logAccess({
  email,
  route,
  action,
  req,
}: {
  email: string
  route: string
  action: string
  req: Request
}) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown"
    const userAgent = req.headers.get("user-agent") || "unknown"

    await fetch(`${process.env.NEXTAUTH_URL}/api/track-action`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action,
        route,
        email,
        ip,
        userAgent,
      }),
    })
  } catch (err) {
    console.error("❌ Erro ao logar acesso no middleware:", err)
  }
}

export default withAuth(
  async function middleware(req) {
    const path = req.nextUrl.pathname

    // Rotas públicas liberadas
    if (
      path === "/" ||
      path.startsWith("/api/auth") ||
      path === "/unauthorized"
    ) {
      return NextResponse.next()
    }

    // 🚨 Se não estiver autenticado → redireciona
    if (!req.nextauth.token) {
      return NextResponse.redirect(
        new URL("/api/auth/signin/google", req.url)
      )
    }

    const email = req.nextauth.token.email as string
    const ALLOWED_EMAILS = ["leonardo.decastro.brazil@gmail.com"]
    const ALLOWED_DOMAIN = "@upstart13.com"

    const hasAccess =
      ALLOWED_EMAILS.includes(email) || email.endsWith(ALLOWED_DOMAIN)

    if (!hasAccess) {
  // 🚨 loga tentativa de acesso negado
  await logAccess({
    email,
    route: req.nextUrl.pathname,
    action: "unauthorized_access",
    req,
  })

  return NextResponse.redirect(new URL("/unauthorized", req.url))
}


    // ✅ Loga acesso autorizado
    await logAccess({
      email,
      route: path,
      action: "authorized_access",
      req,
    })

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname

        if (
          path === "/" ||
          path.startsWith("/api/auth") ||
          path === "/unauthorized"
        ) {
          return true
        }

        return !!token
      },
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/api/track-action"],
}
