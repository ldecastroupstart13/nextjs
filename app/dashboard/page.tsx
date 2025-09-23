"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function DrilldownTabs({ onSelect }: { onSelect: (url: string) => void }) {
  return (
    <div className="flex gap-4">
      {/* Expectant Mother */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default">Expectant Mother</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-64 z-[99999]"
          side="bottom"
          align="start"
          sideOffset={4}
        >
          <DropdownMenuLabel>Expectant Mother</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Marketing Performance</DropdownMenuSubTrigger>
            <DropdownMenuSubContent
              className="w-64 z-[100000]"
              side="right"
              align="start"
              sideOffset={4}
            >
              <DropdownMenuItem
                onClick={() =>
                  onSelect(
                    "https://lookerstudio.google.com/u/0/reporting/6b6f50e3-196f-41aa-9734-144a6236b4a1/page/tW0qD"
                  )
                }
              >
                Campaigns Overview
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  onSelect(
                    "https://lookerstudio.google.com/u/0/reporting/6b6f50e3-196f-41aa-9734-144a6236b4a1/page/p_9g04dun6gd"
                  )
                }
              >
                Spend & Performance
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  onSelect(
                    "https://lookerstudio.google.com/u/0/reporting/6b6f50e3-196f-41aa-9734-144a6236b4a1/page/p_0c04dun6gd"
                  )
                }
              >
                CPL Drilldown
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Gladney Business Performance */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">Gladney Business Performance</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-64 z-[99999]"
          side="bottom"
          align="start"
          sideOffset={4}
        >
          <DropdownMenuLabel>Gladney Business Performance</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Domestic Infant</DropdownMenuSubTrigger>
            <DropdownMenuSubContent
              className="w-64 z-[100000]"
              side="right"
              align="start"
              sideOffset={4}
            >
              <DropdownMenuItem
                onClick={() =>
                  onSelect("https://lookerstudio.google.com/reporting/abc123/page/def456")
                }
              >
                Enrollment Trends
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  onSelect("https://lookerstudio.google.com/reporting/abc123/page/ghi789")
                }
              >
                Funnel Analysis
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Birth Parents</DropdownMenuSubTrigger>
            <DropdownMenuSubContent
              className="w-64 z-[100000]"
              side="right"
              align="start"
              sideOffset={4}
            >
              <DropdownMenuItem onClick={() => onSelect("https://lookerstudio.google.com/reporting/birthparents")}>
                Leads Overview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSelect("https://lookerstudio.google.com/reporting/birthparents-funnel")}>
                Funnel Breakdown
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>New Beginnings</DropdownMenuSubTrigger>
            <DropdownMenuSubContent
              className="w-64 z-[100000]"
              side="right"
              align="start"
              sideOffset={4}
            >
              <DropdownMenuItem onClick={() => onSelect("https://lookerstudio.google.com/reporting/newbeginnings")}>
                Placement Metrics
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSelect("https://lookerstudio.google.com/reporting/newbeginnings-trends")}>
                Trends
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Drilldown Tables</DropdownMenuSubTrigger>
            <DropdownMenuSubContent
              className="w-64 z-[100000]"
              side="right"
              align="start"
              sideOffset={4}
            >
              <DropdownMenuItem onClick={() => onSelect("https://lookerstudio.google.com/reporting/drilldown1")}>
                Financial Breakdown
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSelect("https://lookerstudio.google.com/reporting/drilldown2")}>
                Case Status
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Page Traffic Monitor */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Page Traffic Monitor</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-64 z-[99999]"
          side="bottom"
          align="start"
          sideOffset={4}
        >
          <DropdownMenuLabel>Page Traffic Monitor</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Traffic Analysis</DropdownMenuSubTrigger>
            <DropdownMenuSubContent
              className="w-64 z-[100000]"
              side="right"
              align="start"
              sideOffset={4}
            >
              <DropdownMenuItem onClick={() => onSelect("https://lookerstudio.google.com/reporting/traffic-overview")}>
                Overview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSelect("https://lookerstudio.google.com/reporting/traffic-channels")}>
                Channels
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Engagement & Pages</DropdownMenuSubTrigger>
            <DropdownMenuSubContent
              className="w-64 z-[100000]"
              side="right"
              align="start"
              sideOffset={4}
            >
              <DropdownMenuItem onClick={() => onSelect("https://lookerstudio.google.com/reporting/engagement")}>
                Engagement
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSelect("https://lookerstudio.google.com/reporting/pages")}>
                Top Pages
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>AI Traffic Analysis</DropdownMenuSubTrigger>
            <DropdownMenuSubContent
              className="w-64 z-[100000]"
              side="right"
              align="start"
              sideOffset={4}
            >
              <DropdownMenuItem onClick={() => onSelect("https://lookerstudio.google.com/reporting/ai-traffic")}>
                AI Insights
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
