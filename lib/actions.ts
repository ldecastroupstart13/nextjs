"use client"

import { signIn } from "next-auth/react"

export const actions = {
  start: async () => {
    try {
      // 👉 Opcional: só loga se já houver sessão ativa
      await fetch("/api/track-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "click_start",
          route: "/landing",
        }),
      }).catch(() => {
        console.warn("Usuário ainda não logado, não foi possível registrar log inicial.")
      })

      // 🔒 Força login Google com callback no /dashboard
      await signIn("google", {
        callbackUrl: "/dashboard",
        prompt: "login", // sempre abre seleção de conta
      })
    } catch (err) {
      console.error("Erro na ação Start:", err)
      await signIn("google", {
        callbackUrl: "/dashboard",
        prompt: "login",
      })
    }
  },

  ta: async () => {
    console.log("Botão TA clicado")
    // outra lógica aqui
  },
}
