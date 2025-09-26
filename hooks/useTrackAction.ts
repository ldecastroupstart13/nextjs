"use client"

export function useTrackAction() {
  const track = async (action: string, route: string) => {
    try {
      await fetch("/api/track-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, route }),
      })
    } catch (error) {
      console.error("❌ Erro ao enviar track-action:", error)
    }
  }

  return { track }
}
