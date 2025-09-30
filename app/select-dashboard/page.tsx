import { DashboardCards } from "@/components/dashboard-cards"
import { HeroSection } from "@/components/hero-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <DashboardCards />
    </div>
  )
}
