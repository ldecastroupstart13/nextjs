// app/api/track-action/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { logToGoogleSheets } from "@/lib/google-sheets"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { action, route } = await request.json()

    // 🔍 Metadados
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    // 🔑 IDs
    const eventId = uuidv4()   // sempre único por clique
    const sessionId = uuidv4() // pode ser usado p/ rastrear sessão maior

    // 🚀 Envia para Sheets
    await logToGoogleSheets({
      id: eventId,
      timestamp: new Date().toISOString(),
      email: session?.user?.email || "anonymous",
      route: route || "/track-action",
      extraAction: action,
      ip,
      userAgent,
      sessionId,
    })

    return NextResponse.json({ status: "ok", eventId })
  } catch (error) {
    console.error("Error tracking action:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
