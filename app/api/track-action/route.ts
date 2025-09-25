import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { logToGoogleSheets } from "@/lib/google-sheets"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { action, route } = await request.json()

    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    await logToGoogleSheets({
      timestamp: new Date().toISOString(),
      email: session?.user?.email || "anonymous", // 🔑 suporta anônimo
      route: route || "/track-action",
      extraAction: action,
      ip,
      userAgent,
      sessionId: uuidv4(),
    })

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Error tracking action:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    )
  }
}
