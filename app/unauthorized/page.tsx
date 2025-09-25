"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useEffect } from "react"
import { useSession } from "next-auth/react"

export default function UnauthorizedPage() {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    // dispara log no Google Sheets
    fetch("/api/track-action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "unauthorized_access",
        route: "/unauthorized",
        email: session?.user?.email || "unknown",
      }),
    })
  }, [session])

  const handleBackToHome = () => {
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
          Sorry, you don&apos;t have permission to access this page. 
          Please contact your administrator if you believe this is an error.
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
