import Link from "next/link"
import { Activity, BarChart3, Bell, Heart, Info } from "lucide-react"

const dashboards = [
  {
    title: "Expectant Mother",
    icon: Heart,
    href: "/dashboard?group=expectant&view=overview_ads",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "Business Performance",
    icon: BarChart3,
    href: "/dashboard?group=gladney&view=adoptive_performance",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Traffic Monitor",
    icon: Activity,
    href: "/dashboard?group=traffic&view=cover_page",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Information",
    icon: Info,
    href: "/dashboard?group=info&view=details",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    title: "Notifications",
    icon: Bell,
    href: "/dashboard?group=notifications&view=all",
    gradient: "from-amber-500 to-orange-500",
  },
]

export function DashboardCards() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="mb-16 text-center">
        <h2 className="mb-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Choose Your Dashboard
        </h2>
        <p className="text-pretty text-muted-foreground md:text-lg">
          Select where you want to go
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {dashboards.map((dashboard) => {
          const Icon = dashboard.icon
          return (
            <Link
              key={dashboard.href}
              href={dashboard.href}
              className="group flex flex-col items-center gap-3"
            >
              <div className="relative">
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${dashboard.gradient} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60`}
                />

                {/* Button */}
                <div
                  className={`relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${dashboard.gradient} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl md:h-28 md:w-28`}
                >
                  <Icon className="h-9 w-9 text-white transition-transform duration-300 group-hover:scale-110 md:h-12 md:w-12" />
                </div>
              </div>

              {/* Label text below button */}
              <span className="text-center text-sm font-medium text-foreground transition-colors group-hover:text-primary md:text-base">
                {dashboard.title}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
