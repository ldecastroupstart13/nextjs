"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useEffect } from "react"

export default function UnauthorizedPage() {
  const router = useRouter()

  useEffect(() => {
    // 🔥 dispara log assim que a página Unauthorized carrega
    const payload = {
      action: "unauthorized_page_view",
      route: "/unauthorized",
      timestamp: new Date().toISOString(),
      uuid: crypto.randomUUID(),
    }

    navigator.sendBeacon(
      "/api/track-action",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    )
  }, [])

  const handleBackToHome = () => {
    // 🔥 também trackeia clique no botão
    const payload = {
      action: "unauthorized_back_home_click",
      route: "/unauthorized",
      timestamp: new Date().toISOString(),
      uuid: crypto.randomUUID(),
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
        {/* Sad Lock Image */}
        <div className="mb-8">
          <Image
            src="/unauthorized.png"
            alt="Access Denied"
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Oops! Access Denied 😕
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          Sorry, you don't have permission to access this page. Please contact
          your administrator if you believe this is an error.
        </p>

        {/* Back to Home Button */}
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
