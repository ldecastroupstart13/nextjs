"use client"

import { useRouter } from "next/navigation"
import { Activity, BarChart3, Bell, Heart, Info } from "lucide-react"

const dashboards = [
  {
    title: "Expectant Mother",
    icon: Heart,
    group: "expectant",
    view: "overview_ads",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "Business Performance",
    icon: BarChart3,
    group: "gladney",
    view: "adoptive_performance",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Traffic Monitor",
    icon: Activity,
    group: "traffic",
    view: "cover_page",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Information",
    icon: Info,
    group: "info",
    view: "details",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    title: "Notifications",
    icon: Bell,
    group: "notifications",
    view: "all",
    gradient: "from-amber-500 to-orange-500",
  },
]

export function DashboardCards() {
  const router = useRouter()

  const handleSelect = async (group: string, view: string) => {
    try {
      // 🔹 envia tracking
      navigator.sendBeacon(
        "/api/track-action",
        new Blob(
          [
            JSON.stringify({
              action: "select_dashboard",
              route: `${group}:${view}`,
              timestamp: new Date().toISOString(),
              uuid: crypto.randomUUID(),
            }),
          ],
          { type: "application/json" }
        )
      )
    } catch (err) {
      console.error("❌ Erro ao trackear seleção", err)
    }

    // 🔹 redireciona para o dashboard certo
    router.push(`/dashboard?group=${group}&view=${view}`)
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="mb-16 text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Choose Your Dashboard
        </h2>
        <p className="text-muted-foreground md:text-lg">
          Select where you want to go
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {dashboards.map(({ title, icon: Icon, group, view, gradient }) => (
          <button
            key={title}
            onClick={() => handleSelect(group, view)}
            className="group flex flex-col items-center gap-3 focus:outline-none"
          >
            <div className="relative">
              {/* Glow effect */}
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradient} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60`}
              />
              {/* Button */}
              <div
                className={`relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${gradient} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl md:h-28 md:w-28`}
              >
                <Icon className="h-9 w-9 text-white transition-transform duration-300 group-hover:scale-110 md:h-12 md:w-12" />
              </div>
            </div>
            <span className="text-center text-sm font-medium text-foreground group-hover:text-primary md:text-base">
              {title}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
