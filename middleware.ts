import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  // 🚀 Não faz nada, só deixa passar
  return NextResponse.next()
}

// 🔗 Nem precisa de matcher no início
