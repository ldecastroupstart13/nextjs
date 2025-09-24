"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline"
import { SidebarProvider } from "@/components/ui/sidebar"
import { HorizontalMenuExpectant, HorizontalMenuGladney, HorizontalMenuTraffic } from "@/components/menus"

export default function DashboardPage() {
  const [activePage, setActivePage] = useState("expectant_mother")
  const [selectedView, setSelectedView] = useState<{ group: string; key: string }>({ group: "", key: "" })
  const [selectedDropdownItem, setSelectedDropdownItem] = useState("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentUrl, setCurrentUrl] = useState("")

  const handleViewSelect = (group: string, key: string) => {
    setSelectedView({ group, key })
    setSelectedDropdownItem(key)
    // aqui você pode atualizar o iframe url:
    setCurrentUrl(`/dashboards/${group}/${key}`)
  }

  const toggleFullscreen = () => setIsFullscreen((prev) => !prev)

  const renderPageContent = () => {
    if (activePage === "expectant_mother") {
      return (
        <HorizontalMenuExpectant
          selectedView={selectedView}
          selectedDropdownItem={selectedDropdownItem}
          handleViewSelect={handleViewSelect}
          isFullscreen={isFullscreen}
        />
      )
    }

    if (activePage === "gladney_business") {
      return (
        <HorizontalMenuGladney
          selectedView={selectedView}
          selectedDropdownItem={selectedDropdownItem}
          handleViewSelect={handleViewSelect}
        />
      )
    }

    if (activePage === "page_traffic") {
      return (
        <HorizontalMenuTraffic
          selectedView={selectedView}
          selectedDropdownItem={selectedDropdownItem}
          handleViewSelect={handleViewSelect}
        />
      )
    }

    return null
  }

  return (
    <SidebarProvider>
      <div className="flex-1 flex flex-col p-3 sm:p-6 bg-popover overflow-auto">
        {/* card superior (menus + botão expandir) */}
        {activePage !== "notifications" && activePage !== "dashboard_details" && activePage !== "dashboard_faq" && (
          <Card className="p-4 sm:p-6 mb-4 sm:mb-6 border border-border bg-popover">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {renderPageContent()}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleFullscreen}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors self-start sm:self-auto bg-transparent"
                >
                  <ArrowsPointingOutIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Expandir</span>
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* card do iframe */}
        <Card id="iframe-container" className="flex-1 overflow-hidden border border-border min-h-0 bg-background">
          {isFullscreen && (
            <div className="fixed top-0 left-0 right-0 z-[10000] bg-background/95 backdrop-blur-sm border-b border-border">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-4 p-3 sm:p-4">
                {renderPageContent()}
              </div>
            </div>
          )}

          <div className={`w-full h-full ${isFullscreen ? "mt-20" : ""}`}>
            {activePage === "notifications" ? (
              <div className="w-full h-full flex items-center justify-center p-8 bg-background">
                <div className="text-center">
                  <div className="mb-6">
                    <img
                      src="/no-notification.png"
                      alt="No Notifications"
                      className="w-32 h-auto mx-auto opacity-80"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Notifications</h3>
                  <p className="text-gray-600 text-lg">You're all caught up!</p>
                </div>
              </div>
            ) : (
              <iframe
                src={currentUrl}
                title="Gladney Dashboard"
                className="w-full h-full border-0 rounded-lg"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              />
            )}
          </div>
        </Card>
      </div>
    </SidebarProvider>
  )
}
