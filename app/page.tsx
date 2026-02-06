"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const handleStart = () => {
    try {
      // 🔹 Cria payload único por clique
      const payload = {
        action: "start_button_click",
        route: "/landing",
        timestamp: new Date().toISOString(),
        uuid: crypto.randomUUID(), // 👈 ID único do clique
      }

      // 🔹 Usa sendBeacon (não cancela mesmo com redirect)
      navigator.sendBeacon(
        "/api/track-action",
        new Blob([JSON.stringify(payload)], { type: "application/json" })
      )
    } catch (error) {
      console.error("❌ Erro ao enviar track-action", error)
    }

    // 🔹 Continua com login Google
    signIn("google", {
      callbackUrl: "/select-dashboard",
      prompt: "select_account",
    })
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fundo-C9BEgXdGTxzTfRSysIokXLMc4ZNe34.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen p-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 text-center shadow-2xl max-w-lg w-full">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Welcome to the Gladney Insight Center
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            For the best experience, use Google Chrome.
          </p>
          <Button
            onClick={handleStart}
            size="lg"
            className="px-8 py-3 text-lg font-semibold bg-primary hover:bg-primary/90 transition-colors"
          >
            Start
          </Button>
        </div>
      </div>
    </div>
  )
}
