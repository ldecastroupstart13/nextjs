"use client"

import { signIn } from "next-auth/react"

export const actions = {
  start: async () => {
    try {
      // 1. Loga no Google Sheets antes de redirecionar
      await fetch("/api/track-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "click_start",
          route: "/landing",
        }),
      })

      // 2. Força login sempre pedindo email/senha
      signIn("google", {
        callbackUrl: "/dashboard",
        prompt: "login",
      })
    } catch (err) {
      console.error("Erro ao logar ação Start:", err)
      signIn("google", {
        callbackUrl: "/dashboard",
        prompt: "login",
      })
    }
  },
  // 👉 daqui pra frente você pode criar quantas quiser
  // ex:
  ta: async () => {
    console.log("Botão TA clicado")
    // outra lógica aqui
  },
}
