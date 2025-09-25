import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  // 🚀 Não faz nada, só deixa passar
  return NextResponse.next()
}

// 🔗 Se quiser, define em quais rotas ele roda
export const config = {
  matcher: ["/:path*"], // aqui ele roda em todas as rotas, mas sem bloquear nada
}
