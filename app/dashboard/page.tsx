"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChartBarIcon,
  InformationCircleIcon,
  BellIcon,
  Bars3Icon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarTrigger,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card } from "@/components/ui/card"

export default function GladneyDashboard() {
  const [selectedView, setSelectedView] = useState({ group: "expectant", key: "overview_ads" })
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activePage, setActivePage] = useState("expectant_mother")
  const [selectedDropdownItem, setSelectedDropdownItem] = useState("overview_ads")
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({})

  const LOOKERS = {
    expectant: {
      overview_ads:
        "https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_03hj6qcmvd",
      overview_ga4:
        "https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_8k5zdcvuvd",
      recent: "https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_rbf34iv8ud",
      google_ads:
        "https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_8eecz0rovd",
      campaign_break:
        "https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_tadcyerovd",
      campaign_costs:
        "https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_ep8hx4qovd",
      contact_cost:
        "https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_jvidqwqovd",
      day_of_week:
        "https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_1cwm5jqovd",
      campaign_ratios:
        "https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_zx6sodqovd",
      contact_break:
        "https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_1r1tjgpovd",
      spam_break:
        "https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_an0bb3povd",
    },
    marketing: {
      performance_time:
        "https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_hxd854tovd",
      cost_per:
        "https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_3i0yaalovd",
      table_download:
        "https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_4wsin3lovd",
      enroll_placements:
        "https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_p95uwh89vd",
      enroll_admission:
        "https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_72wuuqv6vd",
      enroll_creation:
        "https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_o9fkb2oavd",
      enroll_timeseries:
        "https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_094a1q3nvd",
    },
    gladney: {
      adoptive_performance:
        "https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_0cruxnlesd",
      adoptive_recent:
        "https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_fs1i0mafsd",
      adoptive_timeline:
        "https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_jaslgym7rd",
      birth_overall:
        "https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_n5o80slctd",
      birth_detailed:
        "https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_s68jx6lxtd",
      birth_recent:
        "https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_ox7c5fxitd",
      birth_breakdown:
        "https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_eoarhx0jtd",
      birth_timeline:
        "https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_q9c5vyustd",
      new_performance:
        "https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_pnl8efo3sd",
      new_recent:
        "https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_dbfsn7afsd",
      new_timeline:
        "https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_84ojqj4asd",
      drilldown_domestic:
        "https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_g64kpxaatd",
      drilldown_new:
        "https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_q32x6kaatd",
    },
    traffic: {
      cover_page:
        "https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_z2i9rcdktd",
      traffic_user_overview:
        "https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_bppth3a2sd",
      sessions_overview:
        "https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_amhq0bb2sd",
      user_overview:
        "https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_zs34w5f2sd",
      google_ads_keywords:
        "https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_b5uzxjdktd",
      demographic_info:
        "https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_snmx9lgltd",
      events_top_pages:
        "https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_hdoejlb2sd",
      conversion_events:
        "https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_od7jq6f2sd",
      conversion_performance:
        "https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_pfbpeii2sd",
      ai_vs_human:
        "https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_60iwvfimtd",
      ai_deep_dive:
        "https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_m7azaxhmtd",
      temporary_visualization:
        "https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_zpttqz0qtd",
      google_analytics_dashboard:
        "https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_mppqixq3vd",
    },
  }

  const router = useRouter()
  const handleViewSelect = (group: string, key: string) => {
    setSelectedView({ group, key })
    setSelectedDropdownItem(key)
  }

  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const renderPageContent = () => {
    if (activePage === "expectant_mother") {
      if (isFullscreen) {
        return (
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
            {/* === EXPECTANT MOTHER DROPDOWN === */}
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
                  className={`hover:bg-muted ${selectedDropdownItem === "overview_ads" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  Overview - ads & hubspot
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleViewSelect("expectant", "overview_ga4")}
                  className={`hover:bg-muted ${selectedDropdownItem === "overview_ga4" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  Overview - GA4
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleViewSelect("expectant", "recent")}
                  className={`hover:bg-muted ${selectedDropdownItem === "recent" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  Recent Perspective
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleViewSelect("expectant", "google_ads")}
                  className={`hover:bg-muted ${selectedDropdownItem === "google_ads" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  Google Ads Performance
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleViewSelect("expectant", "campaign_break")}
                  className={`hover:bg-muted ${selectedDropdownItem === "campaign_break" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  Campaign Breakdown
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleViewSelect("expectant", "campaign_costs")}
                  className={`hover:bg-muted ${selectedDropdownItem === "campaign_costs" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  Campaign Costs
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleViewSelect("expectant", "contact_cost")}
                  className={`hover:bg-muted ${selectedDropdownItem === "contact_cost" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  Contact x Cost
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleViewSelect("expectant", "day_of_week")}
                  className={`hover:bg-muted ${selectedDropdownItem === "day_of_week" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  Day of the Week
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleViewSelect("expectant", "campaign_ratios")}
                  className={`hover:bg-muted ${selectedDropdownItem === "campaign_ratios" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  Campaign Ratios
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleViewSelect("expectant", "contact_break")}
                  className={`hover:bg-muted ${selectedDropdownItem === "contact_break" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  Contact Breakdown
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleViewSelect("expectant", "spam_break")}
                  className={`hover:bg-muted ${selectedDropdownItem === "spam_break" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  Spam Breakdown
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* === MARKETING PERFORMANCE DROPDOWN === */}
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
                  className={`hover:bg-muted ${selectedDropdownItem === "performance_time" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  Performance over time
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleViewSelect("marketing", "cost_per")}
                  className={`hover:bg-muted ${selectedDropdownItem === "cost_per" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  Cost per…
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleViewSelect("marketing", "table_download")}
                  className={`hover:bg-muted ${selectedDropdownItem === "table_download" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  Table for download
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger asChild>
                    <div className="flex w-full items-center justify-between">
                      Enrollment Rate
                      <ChevronRightIcon className="h-4 w-4" />
                    </div>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="w-64">
                    <DropdownMenuItem
                      onClick={() => handleViewSelect("marketing", "enroll_placements")}
                      className={`hover:bg-muted ${selectedDropdownItem === "enroll_placements" ? "bg-primary text-primary-foreground" : ""}`}
                    >
                      Filter by Placements in Sugar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleViewSelect("marketing", "enroll_admission")}
                      className={`hover:bg-muted ${selectedDropdownItem === "enroll_admission" ? "bg-primary text-primary-foreground" : ""}`}
                    >
                      Filter by Admission in Sugar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleViewSelect("marketing", "enroll_creation")}
                      className={`hover:bg-muted ${selectedDropdownItem === "enroll_creation" ? "bg-primary text-primary-foreground" : ""}`}
                    >
                      Filter by Creation in Hubspot
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleViewSelect("marketing", "enroll_timeseries")}
                      className={`hover:bg-muted ${selectedDropdownItem === "enroll_timeseries" ? "bg-primary text-primary-foreground" : ""}`}
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
    }

    return (
      <div className="flex-1 p-4">
        <iframe
          key={`${selectedView.group}_${selectedView.key}`}
          src={LOOKERS[selectedView.group][selectedView.key]}
          className={`w-full ${isFullscreen ? "h-screen" : "h-[600px]"} border-0 rounded-md`}
        />
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarHeader>Gladney Dashboard</SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActivePage("expectant_mother")}>
                      Expectant Mother
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActivePage("gladney_business")}>
                      Gladney Business
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActivePage("traffic")}>
                      Page Traffic
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-y-auto">
          {renderPageContent()}
        </main>
      </div>
    </SidebarProvider>
  )
}
