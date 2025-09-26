// app/api/track-action/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { logToGoogleSheets } from "@/lib/google-sheets"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { action, route, timestamp, uuid } = await request.json()

    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    // ✅ Envia para Google Sheets com ID único
    await logToGoogleSheets({
      id: uuid || uuidv4(), // 👈 usa o do cliente ou gera um novo
      timestamp: timestamp || new Date().toISOString(),
      email: session?.user?.email || "anonymous",
      route: route || "/track-action",
      extraAction: action,
      ip,
      userAgent,
    })

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Error tracking action:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
