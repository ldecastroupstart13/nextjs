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
          {[
            ["overview_ads", "Overview – ads & hubspot"],
            ["overview_ga4", "Overview – GA4"],
            ["recent", "Recent Perspective"],
            ["google_ads", "Google Ads Performance"],
            ["campaign_break", "Campaign Breakdown"],
            ["campaign_costs", "Campaign Costs"],
            ["contact_cost", "Contact x Cost"],
            ["day_of_week", "Day of the Week"],
            ["campaign_ratios", "Campaign Ratios"],
            ["contact_break", "Contact Breakdown"],
            ["spam_break", "Spam Breakdown"],
          ].map(([key, label]) => (
            <DropdownMenuItem
              key={key}
              onClick={() => handleViewSelect("expectant", key)}
              className={selectedDropdownItem === key ? "bg-primary text-primary-foreground" : ""}
            >
              {label}
            </DropdownMenuItem>
          ))}
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
          {[
            ["performance_time", "Performance over time"],
            ["cost_per", "Cost per…"],
            ["table_download", "Table for download"],
          ].map(([key, label]) => (
            <DropdownMenuItem
              key={key}
              onClick={() => handleViewSelect("marketing", key)}
              className={selectedDropdownItem === key ? "bg-primary text-primary-foreground" : ""}
            >
              {label}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="hover:bg-muted">Enrollment Rate</DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-64">
              {[
                ["enroll_placements", "Filter by Placements in Sugar"],
                ["enroll_admission", "Filter by Admission in Sugar"],
                ["enroll_creation", "Filter by Creation in Hubspot"],
                ["enroll_timeseries", "Time Series"],
              ].map(([key, label]) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => handleViewSelect("marketing", key)}
                  className={selectedDropdownItem === key ? "bg-primary text-primary-foreground" : ""}
                >
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
