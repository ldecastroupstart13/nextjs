"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

export default function HorizontalMenuExpectant({
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
      {/* Expectant Mother */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={selectedView.group === "expectant" ? "default" : "outline"}
            className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
          >
            <span className="truncate">Expectant Mother</span>
            <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuItem
            onClick={() => handleViewSelect("expectant", "overview_ads")}
            className={selectedDropdownItem === "overview_ads" ? "bg-primary text-primary-foreground" : ""}
          >
            Overview – ads & hubspot
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleViewSelect("expectant", "overview_ga4")}
            className={selectedDropdownItem === "overview_ga4" ? "bg-primary text-primary-foreground" : ""}
          >
            Overview – GA4
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleViewSelect("expectant", "recent")}
            className={selectedDropdownItem === "recent" ? "bg-primary text-primary-foreground" : ""}
          >
            Recent Perspective
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleViewSelect("expectant", "google_ads")}
            className={selectedDropdownItem === "google_ads" ? "bg-primary text-primary-foreground" : ""}
          >
            Google Ads Performance
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleViewSelect("expectant", "campaign_break")}
            className={selectedDropdownItem === "campaign_break" ? "bg-primary text-primary-foreground" : ""}
          >
            Campaign Breakdown
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleViewSelect("expectant", "campaign_costs")}
            className={selectedDropdownItem === "campaign_costs" ? "bg-primary text-primary-foreground" : ""}
          >
            Campaign Costs
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleViewSelect("expectant", "contact_cost")}
            className={selectedDropdownItem === "contact_cost" ? "bg-primary text-primary-foreground" : ""}
          >
            Contact x Cost
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleViewSelect("expectant", "day_of_week")}
            className={selectedDropdownItem === "day_of_week" ? "bg-primary text-primary-foreground" : ""}
          >
            Day of the Week
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleViewSelect("expectant", "campaign_ratios")}
            className={selectedDropdownItem === "campaign_ratios" ? "bg-primary text-primary-foreground" : ""}
          >
            Campaign Ratios
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleViewSelect("expectant", "contact_break")}
            className={selectedDropdownItem === "contact_break" ? "bg-primary text-primary-foreground" : ""}
          >
            Contact Breakdown
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleViewSelect("expectant", "spam_break")}
            className={selectedDropdownItem === "spam_break" ? "bg-primary text-primary-foreground" : ""}
          >
            Spam Breakdown
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Marketing Performance */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={selectedView.group === "marketing" ? "default" : "outline"}
            className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
          >
            <span className="truncate">Marketing Performance</span>
            <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuItem
            onClick={() => handleViewSelect("marketing", "performance_time")}
            className={selectedDropdownItem === "performance_time" ? "bg-primary text-primary-foreground" : ""}
          >
            Performance over time
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleViewSelect("marketing", "cost_per")}
            className={selectedDropdownItem === "cost_per" ? "bg-primary text-primary-foreground" : ""}
          >
            Cost per…
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleViewSelect("marketing", "table_download")}
            className={selectedDropdownItem === "table_download" ? "bg-primary text-primary-foreground" : ""}
          >
            Table for download
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="hover:bg-muted">Enrollment Rate</DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-64">
              <DropdownMenuItem
                onClick={() => handleViewSelect("marketing", "enroll_placements")}
                className={selectedDropdownItem === "enroll_placements" ? "bg-primary text-primary-foreground" : ""}
              >
                Filter by Placements in Sugar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleViewSelect("marketing", "enroll_admission")}
                className={selectedDropdownItem === "enroll_admission" ? "bg-primary text-primary-foreground" : ""}
              >
                Filter by Admission in Sugar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleViewSelect("marketing", "enroll_creation")}
                className={selectedDropdownItem === "enroll_creation" ? "bg-primary text-primary-foreground" : ""}
              >
                Filter by Creation in Hubspot
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleViewSelect("marketing", "enroll_timeseries")}
                className={selectedDropdownItem === "enroll_timeseries" ? "bg-primary text-primary-foreground" : ""}
              >
                Time Series
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
