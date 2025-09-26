"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const handleStart = async () => {
    // 🔹 Loga a ação primeiro
    try {
      await fetch("/api/track-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "start_button_click",
          route: "/landing",
        }),
      })
    } catch (err) {
      console.error("❌ Falha ao enviar track-action", err)
    }

    // 🔹 Depois redireciona pro login do Google
    signIn("google", {
      callbackUrl: "/dashboard",
      prompt: "select_account",
    })
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ... resto igual ... */}
      <Button
        onClick={handleStart}
        size="lg"
        className="px-8 py-3 text-lg font-semibold bg-primary hover:bg-primary/90 transition-colors"
      >
        Start
      </Button>
    </div>
  )
}
