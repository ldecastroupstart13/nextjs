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
            variant={["adoptive_performance","adoptive_recent","adoptive_timeline"].includes(selectedView.key) ? "default" : "outline"}
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
              {[
                ["adoptive_performance","Performance"],
                ["adoptive_recent","Recent Perspective"],
                ["adoptive_timeline","Process Timeline"],
              ].map(([key,label])=>(
                <DropdownMenuItem
                  key={key}
                  onClick={() => handleViewSelect("gladney",key)}
                  className={selectedDropdownItem===key?"bg-primary text-primary-foreground":""}
                >
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="hover:bg-muted">Birth Parents</DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-64">
              {[
                ["birth_overall","Overall Performance"],
                ["birth_detailed","Detailed Performance"],
                ["birth_recent","Recent Perspective"],
                ["birth_breakdown","Breakdown by State"],
                ["birth_timeline","Process Timeline"],
              ].map(([key,label])=>(
                <DropdownMenuItem
                  key={key}
                  onClick={() => handleViewSelect("gladney",key)}
                  className={selectedDropdownItem===key?"bg-primary text-primary-foreground":""}
                >
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* New Beginnings */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={["new_performance","new_recent","new_timeline"].includes(selectedView.key) ? "default" : "outline"}
            className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
          >
            <span className="truncate">New Beginnings</span>
            <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          {[
            ["new_performance","Performance"],
            ["new_recent","Recent Perspective"],
            ["new_timeline","Process Timeline"],
          ].map(([key,label])=>(
            <DropdownMenuItem
              key={key}
              onClick={() => handleViewSelect("gladney",key)}
              className={selectedDropdownItem===key?"bg-primary text-primary-foreground":""}
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Drilldowns */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={["drilldown_domestic","drilldown_new"].includes(selectedView.key) ? "default" : "outline"}
            className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
          >
            <span className="truncate">Drilldown Tables</span>
            <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          {[
            ["drilldown_domestic","Domestic Infant"],
            ["drilldown_new","New Beginnings"],
          ].map(([key,label])=>(
            <DropdownMenuItem
              key={key}
              onClick={() => handleViewSelect("gladney",key)}
              className={selectedDropdownItem===key?"bg-primary text-primary-foreground":""}
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
