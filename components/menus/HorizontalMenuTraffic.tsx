"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

export default function HorizontalMenuTraffic({
  selectedView,
  selectedDropdownItem,
  handleViewSelect,
}: {
  selectedView: { group: string; key: string }
  selectedDropdownItem: string
  handleViewSelect: (group: string, key: string) => void
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">

      {/* Cover Page */}
      <Button
        onClick={() => handleViewSelect("traffic", "cover_page")}
        variant={selectedDropdownItem === "cover_page" ? "default" : "outline"}
        className="w-full sm:w-auto"
      >
        Cover Page
      </Button>

      {/* Traffic & User Overview */}
      <Button
        onClick={() => handleViewSelect("traffic", "traffic_user_overview")}
        variant={selectedDropdownItem === "traffic_user_overview" ? "default" : "outline"}
        className="w-full sm:w-auto"
      >
        Traffic & User Overview
      </Button>

      {/* Traffic Analysis */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={
              ["sessions_overview", "user_overview", "google_ads_keywords", "demographic_info"].includes(selectedView.key)
                ? "default"
                : "outline"
            }
            className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
          >
            <span className="truncate">Traffic Analysis</span>
            <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuItem
            onClick={() => handleViewSelect("traffic", "sessions_overview")}
            className={selectedDropdownItem === "sessions_overview" ? "bg-primary text-primary-foreground" : ""}
          >
            Sessions Overview & Entry Pages
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleViewSelect("traffic", "user_overview")}
            className={selectedDropdownItem === "user_overview" ? "bg-primary text-primary-foreground" : ""}
          >
            User Overview & Entry Pages
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleViewSelect("traffic", "google_ads_keywords")}
            className={selectedDropdownItem === "google_ads_keywords" ? "bg-primary text-primary-foreground" : ""}
          >
            Google Ads Keywords
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleViewSelect("traffic", "demographic_info")}
            className={selectedDropdownItem === "demographic_info" ? "bg-primary text-primary-foreground" : ""}
          >
            Demographic Information
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Engagement & Pages */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={
              ["events_top_pages", "conversion_events"].includes(selectedView.key)
                ? "default"
                : "outline"
            }
            className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
          >
            <span className="truncate">Engagement & Pages</span>
            <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuItem
            onClick={() => handleViewSelect("traffic", "events_top_pages")}
            className={selectedDropdownItem === "events_top_pages" ? "bg-primary text-primary-foreground" : ""}
          >
            Events & Top Pages
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleViewSelect("traffic", "conversion_events")}
            className={selectedDropdownItem === "conversion_events" ? "bg-primary text-primary-foreground" : ""}
          >
            Conversion Events Breakdown
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Conversion Performance */}
      <Button
        onClick={() => handleViewSelect("traffic", "conversion_performance")}
        variant={selectedDropdownItem === "conversion_performance" ? "default" : "outline"}
        className="w-full sm:w-auto"
      >
        Conversion Performance
      </Button>

      {/* AI Traffic Analysis */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={["ai_vs_human", "ai_deep_dive"].includes(selectedView.key) ? "default" : "outline"}
            className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
          >
            <span className="truncate">AI Traffic Analysis</span>
            <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuItem
            onClick={() => handleViewSelect("traffic", "ai_vs_human")}
            className={selectedDropdownItem === "ai_vs_human" ? "bg-primary text-primary-foreground" : ""}
          >
            AI vs Human Traffic – Overview
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleViewSelect("traffic", "ai_deep_dive")}
            className={selectedDropdownItem === "ai_deep_dive" ? "bg-primary text-primary-foreground" : ""}
          >
            AI Traffic Deep Dive
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Temporary Visualization */}
      <Button
        onClick={() => handleViewSelect("traffic", "temporary_visualization")}
        variant={selectedDropdownItem === "temporary_visualization" ? "default" : "outline"}
        className="w-full sm:w-auto"
      >
        Temporary Visualization
      </Button>

      {/* Google Analytics Dashboard */}
      <Button
        onClick={() => handleViewSelect("traffic", "google_analytics_dashboard")}
        variant={selectedDropdownItem === "google_analytics_dashboard" ? "default" : "outline"}
        className="w-full sm:w-auto"
      >
        Google Analytics Dashboard
      </Button>
    </div>
  )
}
