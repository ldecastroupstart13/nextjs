"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

export default function UnauthorizedPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // pega o email que veio na query string
  const email = searchParams.get("email") || "unknown"

  useEffect(() => {
    const payload = {
      action: "unauthorized_page_view",
      route: "/unauthorized",
      timestamp: new Date().toISOString(),
      uuid: crypto.randomUUID(),
      email, // ✅ já vem da query string
    }

    navigator.sendBeacon(
      "/api/track-action",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    )
  }, [email])

  const handleBackToHome = () => {
    const payload = {
      action: "unauthorized_back_home_click",
      route: "/unauthorized",
      timestamp: new Date().toISOString(),
      uuid: crypto.randomUUID(),
      email,
    }

    navigator.sendBeacon(
      "/api/track-action",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    )

    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <Image
            src="/unauthorized.png"
            alt="Access Denied"
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Oops! Access Denied 😕
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Sorry, you don't have permission to access this page.
        </p>

        {/* 🔹 Mostra email negado (opcional) */}
        {email !== "unknown" && (
          <p className="text-sm text-red-500 mb-6">
            Attempted login with: <strong>{email}</strong>
          </p>
        )}

        <Button
          onClick={handleBackToHome}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Back to Home
        </Button>
      </div>
    </div>
  )
}
