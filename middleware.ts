import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// 🚀 Middleware Next.js
export function middleware(req: NextRequest) {
  const publicPaths = ["/", "/unauthorized"]

  // ✅ Se for rota pública → deixa passar
  if (publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.next()
  }

  // 🔒 Para qualquer outra rota → redireciona direto pro Google
  const callbackUrl = req.nextUrl.pathname.startsWith("/dashboard")
    ? "/dashboard"
    : "/"

  return NextResponse.redirect(
    new URL(
      `/api/auth/signin/google?callbackUrl=${encodeURIComponent(callbackUrl)}`,
      req.url
    )
  )
}

// 🔗 Define onde o middleware deve rodar
export const config = {
  matcher: [
    "/dashboard/:path*",   // protege tudo dentro de /dashboard
    "/api/track-action",   // protege o endpoint de log também
  ],
}
