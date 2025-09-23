"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const handleStart = () => {
    // 👉 força login diretamente no Google e manda pro dashboard
    signIn("google", {
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
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
        Your browser does not support HTML5 video.
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
            Behind every number, there's a family waiting for hope.
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
