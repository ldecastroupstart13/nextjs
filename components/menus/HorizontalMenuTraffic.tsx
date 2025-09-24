"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={selectedView.group === "traffic" && selectedView.key === "cover_page" ? "default" : "outline"}
            className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
          >
            <span className="truncate">Cover Page</span>
            <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuItem
            onClick={() => handleViewSelect("traffic", "cover_page")}
            className={selectedDropdownItem === "cover_page" ? "bg-primary text-primary-foreground" : ""}
          >
            Open Cover Page
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Traffic & User Overview */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={selectedView.group === "traffic" && selectedView.key === "overview" ? "default" : "outline"}
            className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
          >
            <span className="truncate">Traffic & User Overview</span>
            <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuItem
            onClick={() => handleViewSelect("traffic", "overview")}
            className={selectedDropdownItem === "overview" ? "bg-primary text-primary-foreground" : ""}
          >
            Overview
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Traffic Analysis */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={selectedView.group === "traffic" && selectedView.key === "traffic_analysis" ? "default" : "outline"}
            className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
          >
            <span className="truncate">Traffic Analysis</span>
            <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuItem
            onClick={() => handleViewSelect("traffic", "traffic_analysis")}
            className={selectedDropdownItem === "traffic_analysis" ? "bg-primary text-primary-foreground" : ""}
          >
            General Analysis
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Engagement & Pages */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={selectedView.group === "traffic" && selectedView.key === "engagement_pages" ? "default" : "outline"}
            className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
          >
            <span className="truncate">Engagement & Pages</span>
            <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuItem
            onClick={() => handleViewSelect("traffic", "engagement_pages")}
            className={selectedDropdownItem === "engagement_pages" ? "bg-primary text-primary-foreground" : ""}
          >
            Engagement Metrics
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Conversion Performance */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={selectedView.group === "traffic" && selectedView.key === "conversion" ? "default" : "outline"}
            className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
          >
            <span className="truncate">Conversion Performance</span>
            <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuItem
            onClick={() => handleViewSelect("traffic", "conversion")}
            className={selectedDropdownItem === "conversion" ? "bg-primary text-primary-foreground" : ""}
          >
            Conversions
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* AI Traffic Analysis */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={selectedView.group === "traffic" && selectedView.key === "ai_traffic" ? "default" : "outline"}
            className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
          >
            <span className="truncate">AI Traffic Analysis</span>
            <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuItem
            onClick={() => handleViewSelect("traffic", "ai_traffic")}
            className={selectedDropdownItem === "ai_traffic" ? "bg-primary text-primary-foreground" : ""}
          >
            AI Insights
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Temporary Visualization */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={selectedView.group === "traffic" && selectedView.key === "temporary" ? "default" : "outline"}
            className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
          >
            <span className="truncate">Temporary Visualization</span>
            <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuItem
            onClick={() => handleViewSelect("traffic", "temporary")}
            className={selectedDropdownItem === "temporary" ? "bg-primary text-primary-foreground" : ""}
          >
            Temporary Charts
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Google Analytics Dashboard */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={selectedView.group === "traffic" && selectedView.key === "ga_dashboard" ? "default" : "outline"}
            className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
          >
            <span className="truncate">Google Analytics Dashboard</span>
            <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuItem
            onClick={() => handleViewSelect("traffic", "ga_dashboard")}
            className={selectedDropdownItem === "ga_dashboard" ? "bg-primary text-primary-foreground" : ""}
          >
            GA4 Dashboard
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
