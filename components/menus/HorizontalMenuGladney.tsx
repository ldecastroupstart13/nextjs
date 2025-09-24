"use client"

import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function HorizontalMenuGladney({
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
      {/* Domestic Infant */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={selectedView.group === "gladney" &&
              ["adoptive_performance", "adoptive_recent", "adoptive_timeline"].includes(selectedView.key)
              ? "default"
              : "outline"}
            className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
          >
            <span className="truncate">Domestic Infant</span>
            <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="hover:bg-muted">Adoptive Parents</DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-64">
              <DropdownMenuItem onClick={() => handleViewSelect("gladney", "adoptive_performance")}
                className={selectedDropdownItem === "adoptive_performance" ? "bg-primary text-primary-foreground" : ""}>
                Performance
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleViewSelect("gladney", "adoptive_recent")}
                className={selectedDropdownItem === "adoptive_recent" ? "bg-primary text-primary-foreground" : ""}>
                Recent Perspective
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleViewSelect("gladney", "adoptive_timeline")}
                className={selectedDropdownItem === "adoptive_timeline" ? "bg-primary text-primary-foreground" : ""}>
                Process Timeline
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="hover:bg-muted">Birth Parents</DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-64">
              <DropdownMenuItem onClick={() => handleViewSelect("gladney", "birth_overall")}
                className={selectedDropdownItem === "birth_overall" ? "bg-primary text-primary-foreground" : ""}>
                Overall Performance
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleViewSelect("gladney", "birth_detailed")}
                className={selectedDropdownItem === "birth_detailed" ? "bg-primary text-primary-foreground" : ""}>
                Detailed Performance
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleViewSelect("gladney", "birth_recent")}
                className={selectedDropdownItem === "birth_recent" ? "bg-primary text-primary-foreground" : ""}>
                Recent Perspective
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleViewSelect("gladney", "birth_breakdown")}
                className={selectedDropdownItem === "birth_breakdown" ? "bg-primary text-primary-foreground" : ""}>
                Breakdown by State
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleViewSelect("gladney", "birth_timeline")}
                className={selectedDropdownItem === "birth_timeline" ? "bg-primary text-primary-foreground" : ""}>
                Process Timeline
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* New Beginnings */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={selectedView.group === "gladney" &&
              ["new_performance", "new_recent", "new_timeline"].includes(selectedView.key)
              ? "default"
              : "outline"}
            className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
          >
            <span className="truncate">New Beginnings</span>
            <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuItem onClick={() => handleViewSelect("gladney", "new_performance")}
            className={selectedDropdownItem === "new_performance" ? "bg-primary text-primary-foreground" : ""}>
            Performance
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleViewSelect("gladney", "new_recent")}
            className={selectedDropdownItem === "new_recent" ? "bg-primary text-primary-foreground" : ""}>
            Recent Perspective
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleViewSelect("gladney", "new_timeline")}
            className={selectedDropdownItem === "new_timeline" ? "bg-primary text-primary-foreground" : ""}>
            Process Timeline
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Drilldowns */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={selectedView.group === "gladney" &&
              ["drilldown_domestic", "drilldown_new"].includes(selectedView.key)
              ? "default"
              : "outline"}
            className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
          >
            <span className="truncate">Drilldown Tables</span>
            <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuItem onClick={() => handleViewSelect("gladney", "drilldown_domestic")}
            className={selectedDropdownItem === "drilldown_domestic" ? "bg-primary text-primary-foreground" : ""}>
            Domestic Infant
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleViewSelect("gladney", "drilldown_new")}
            className={selectedDropdownItem === "drilldown_new" ? "bg-primary text-primary-foreground" : ""}>
            New Beginnings
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
