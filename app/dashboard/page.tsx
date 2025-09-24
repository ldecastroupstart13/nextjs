// 📌 Parte 1 – Imports, States, LOOKERS, Helpers
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

  const router = useRouter()

  // URLs para os dashboards
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

  // Navegação
  const handleNavigation = (page: string) => {
    setActivePage(page)
    if (page === "expectant_mother") {
      setSelectedView({ group: "expectant", key: "overview_ads" })
      setSelectedDropdownItem("overview_ads")
    } else if (page === "gladney_business") {
      setSelectedView({ group: "gladney", key: "adoptive_performance" })
      setSelectedDropdownItem("adoptive_performance")
    } else if (page === "page_traffic") {
      setSelectedView({ group: "traffic", key: "cover_page" })
      setSelectedDropdownItem("cover_page")
    } else {
      setSelectedView({ group: "", key: "" })
      setSelectedDropdownItem("")
    }
  }

  // Atualiza seleção a partir da URL
  useEffect(() => {
    const url = new URL(window.location.href)
    const group = url.searchParams.get("group") || "expectant"
    const view = url.searchParams.get("view") || "overview_ads"
    setSelectedView({ group, key: view })
    setSelectedDropdownItem(view)
  }, [])

  // Função de seleção de view
  const handleViewSelect = (group: string, key: string) => {
    setSelectedView({ group, key })
    setSelectedDropdownItem(key)
    const url = new URL(window.location.href)
    url.searchParams.set("group", group)
    url.searchParams.set("view", key)
    window.history.replaceState({}, "", url.toString())
  }

  const toggleFullscreen = () => {
    const element = document.getElementById("iframe-container")
    if (!document.fullscreenElement && element) {
      element.requestFullscreen()
      setIsFullscreen(true)
    } else if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleLogout = () => {
    router.push("/")
  }



// 📌 Parte 2 – Utilitários (Dropdowns customizados + Títulos de página)
  // Retorna título da página no Header
  const getPageTitle = () => {
    switch (activePage) {
      case "expectant_mother":
        return "Expectant Mother Dashboard"
      case "gladney_business":
        return "Gladney Business Performance Dashboard"
      case "page_traffic":
        return "Page Traffic Monitor Dashboard"
      case "dashboard_faq":
        return "Dashboard FAQ"
      case "dashboard_details":
        return "Dashboard Details"
      case "notifications":
        return "Notifications"
      default:
        return "Dashboard"
    }
  }

  // Dropdown customizado (para fullscreen)
  const CustomDropdown = ({ id, trigger, children }: {
    id: string
    trigger: React.ReactNode
    children: React.ReactNode
  }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="relative">
        <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[10001] min-w-64">
            {children}
          </div>
        )}
      </div>
    )
  }

  const CustomDropdownItem = ({
    onClick,
    children,
    isSelected = false,
  }: {
    onClick: () => void
    children: React.ReactNode
    isSelected?: boolean
  }) => (
    <div
      onClick={onClick}
      className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm ${
        isSelected ? "bg-blue-500 text-white hover:bg-blue-600" : ""
      }`}
    >
      {children}
    </div>
  )

  const CustomSubmenu = ({
    trigger,
    children,
  }: {
    trigger: React.ReactNode
    children: React.ReactNode
  }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center justify-between"
        >
          {trigger}
          <ChevronRightIcon className="h-4 w-4" />
        </div>
        {isOpen && (
          <div className="absolute left-full top-0 ml-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[10002] min-w-64">
            {children}
          </div>
        )}
      </div>
    )
  }



// 📌 Parte 3 – RenderPageContent (Menus Horizontais)
  const renderPageContent = () => {
    // ==============================
    // Expectant Mother + Marketing
    // ==============================
    if (activePage === "expectant_mother") {
      return (
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
          {/* Expectant Mother */}
          <CustomDropdown
            id="expectant_dropdown"
            trigger={
              <Button
                variant={selectedView.group === "expectant" ? "default" : "outline"}
                className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
              >
                <span className="truncate">Expectant Mother</span>
                <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
              </Button>
            }
          >
            {Object.entries(LOOKERS.expectant).map(([key]) => (
              <CustomDropdownItem
                key={key}
                onClick={() => handleViewSelect("expectant", key)}
                isSelected={selectedDropdownItem === key}
              >
                {key}
              </CustomDropdownItem>
            ))}
          </CustomDropdown>

          {/* Marketing */}
          <CustomDropdown
            id="marketing_dropdown"
            trigger={
              <Button
                variant={selectedView.group === "marketing" ? "default" : "outline"}
                className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
              >
                <span className="truncate">Marketing Performance</span>
                <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
              </Button>
            }
          >
            <CustomDropdownItem
              onClick={() => handleViewSelect("marketing", "performance_time")}
              isSelected={selectedDropdownItem === "performance_time"}
            >
              Performance Over Time
            </CustomDropdownItem>
            <CustomDropdownItem
              onClick={() => handleViewSelect("marketing", "cost_per")}
              isSelected={selectedDropdownItem === "cost_per"}
            >
              Cost Per Acquisition
            </CustomDropdownItem>
            <CustomDropdownItem
              onClick={() => handleViewSelect("marketing", "table_download")}
              isSelected={selectedDropdownItem === "table_download"}
            >
              Downloadable Table
            </CustomDropdownItem>

            <CustomSubmenu trigger="Enrollment Rate">
              <CustomDropdownItem
                onClick={() => handleViewSelect("marketing", "enroll_placements")}
                isSelected={selectedDropdownItem === "enroll_placements"}
              >
                Enroll by Placement
              </CustomDropdownItem>
              <CustomDropdownItem
                onClick={() => handleViewSelect("marketing", "enroll_admission")}
                isSelected={selectedDropdownItem === "enroll_admission"}
              >
                Enroll by Admission
              </CustomDropdownItem>
              <CustomDropdownItem
                onClick={() => handleViewSelect("marketing", "enroll_creation")}
                isSelected={selectedDropdownItem === "enroll_creation"}
              >
                Enroll by Creation
              </CustomDropdownItem>
              <CustomDropdownItem
                onClick={() => handleViewSelect("marketing", "enroll_timeseries")}
                isSelected={selectedDropdownItem === "enroll_timeseries"}
              >
                Enroll Time Series
              </CustomDropdownItem>
            </CustomSubmenu>
          </CustomDropdown>
        </div>
      )
    }

    // ==============================
    // Gladney Business
    // ==============================
    if (activePage === "gladney_business") {
      return (
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
          {/* Domestic Infant */}
          <CustomDropdown
            id="domestic_dropdown"
            trigger={
              <Button
                variant={[
                  "adoptive_performance","adoptive_recent","adoptive_timeline",
                  "birth_overall","birth_detailed","birth_recent","birth_breakdown","birth_timeline"
                ].includes(selectedDropdownItem) ? "default" : "outline"}
                className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
              >
                <span className="truncate">Domestic Infant</span>
                <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
              </Button>
            }
          >
            <CustomSubmenu trigger="Adoptive Parents">
              <CustomDropdownItem onClick={() => handleViewSelect("gladney", "adoptive_performance")}
                isSelected={selectedDropdownItem === "adoptive_performance"}>Performance</CustomDropdownItem>
              <CustomDropdownItem onClick={() => handleViewSelect("gladney", "adoptive_recent")}
                isSelected={selectedDropdownItem === "adoptive_recent"}>Recent</CustomDropdownItem>
              <CustomDropdownItem onClick={() => handleViewSelect("gladney", "adoptive_timeline")}
                isSelected={selectedDropdownItem === "adoptive_timeline"}>Timeline</CustomDropdownItem>
            </CustomSubmenu>

            <CustomSubmenu trigger="Birth Parents">
              <CustomDropdownItem onClick={() => handleViewSelect("gladney", "birth_overall")}
                isSelected={selectedDropdownItem === "birth_overall"}>Overall</CustomDropdownItem>
              <CustomDropdownItem onClick={() => handleViewSelect("gladney", "birth_detailed")}
                isSelected={selectedDropdownItem === "birth_detailed"}>Detailed</CustomDropdownItem>
              <CustomDropdownItem onClick={() => handleViewSelect("gladney", "birth_recent")}
                isSelected={selectedDropdownItem === "birth_recent"}>Recent</CustomDropdownItem>
              <CustomDropdownItem onClick={() => handleViewSelect("gladney", "birth_breakdown")}
                isSelected={selectedDropdownItem === "birth_breakdown"}>Breakdown</CustomDropdownItem>
              <CustomDropdownItem onClick={() => handleViewSelect("gladney", "birth_timeline")}
                isSelected={selectedDropdownItem === "birth_timeline"}>Timeline</CustomDropdownItem>
            </CustomSubmenu>
          </CustomDropdown>

          {/* New Beginnings */}
          <CustomDropdown
            id="new_beginnings_dropdown"
            trigger={
              <Button
                variant={["new_performance","new_recent","new_timeline"].includes(selectedDropdownItem) ? "default" : "outline"}
                className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
              >
                <span className="truncate">New Beginnings</span>
                <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
              </Button>
            }
          >
            <CustomDropdownItem onClick={() => handleViewSelect("gladney", "new_performance")}
              isSelected={selectedDropdownItem === "new_performance"}>Performance</CustomDropdownItem>
            <CustomDropdownItem onClick={() => handleViewSelect("gladney", "new_recent")}
              isSelected={selectedDropdownItem === "new_recent"}>Recent</CustomDropdownItem>
            <CustomDropdownItem onClick={() => handleViewSelect("gladney", "new_timeline")}
              isSelected={selectedDropdownItem === "new_timeline"}>Timeline</CustomDropdownItem>
          </CustomDropdown>

          {/* Drilldown */}
          <CustomDropdown
            id="drilldown_dropdown"
            trigger={
              <Button
                variant={["drilldown_domestic","drilldown_new"].includes(selectedDropdownItem) ? "default" : "outline"}
                className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
              >
                <span className="truncate">Drilldown Tables</span>
                <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
              </Button>
            }
          >
            <CustomDropdownItem onClick={() => handleViewSelect("gladney", "drilldown_domestic")}
              isSelected={selectedDropdownItem === "drilldown_domestic"}>Domestic</CustomDropdownItem>
            <CustomDropdownItem onClick={() => handleViewSelect("gladney", "drilldown_new")}
              isSelected={selectedDropdownItem === "drilldown_new"}>New Beginnings</CustomDropdownItem>
          </CustomDropdown>
        </div>
      )
    }

    // ==============================
    // Traffic Monitor
    // ==============================
    if (activePage === "page_traffic") {
      return (
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
          <Button
            variant={selectedView.key === "cover_page" ? "default" : "outline"}
            onClick={() => handleViewSelect("traffic", "cover_page")}
          >
            Cover Page
          </Button>
          <Button
            variant={selectedView.key === "traffic_user_overview" ? "default" : "outline"}
            onClick={() => handleViewSelect("traffic", "traffic_user_overview")}
          >
            Traffic & User Overview
          </Button>

          <CustomDropdown id="traffic_dropdown" trigger={
            <Button variant="outline" className="gap-2 w-full sm:w-auto justify-between sm:justify-center">
              <span className="truncate">Traffic Analysis</span>
              <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
            </Button>
          }>
            <CustomDropdownItem onClick={() => handleViewSelect("traffic", "sessions_overview")}
              isSelected={selectedDropdownItem === "sessions_overview"}>Sessions Overview</CustomDropdownItem>
            <CustomDropdownItem onClick={() => handleViewSelect("traffic", "user_overview")}
              isSelected={selectedDropdownItem === "user_overview"}>User Overview</CustomDropdownItem>
            <CustomDropdownItem onClick={() => handleViewSelect("traffic", "google_ads_keywords")}
              isSelected={selectedDropdownItem === "google_ads_keywords"}>Google Ads Keywords</CustomDropdownItem>
          </CustomDropdown>
        </div>
      )
    }

    return <div className="text-center text-muted-foreground">Selecione uma opção.</div>
  }

// 📌 Definição da URL atual do iframe
const currentUrl =
  LOOKERS[selectedView.group as keyof typeof LOOKERS]?.[
    selectedView.key as keyof typeof LOOKERS["expectant"]
  ] || "about:blank"


//📌 Parte 4 — Layout Geral
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        {/* Sidebar */}
        <Sidebar className="border-r border-sidebar-border bg-sidebar flex-shrink-0 lg:flex hidden lg:relative absolute z-40 lg:z-auto w-64 min-w-64">
          <SidebarContent className="bg-background h-full flex flex-col">
            
            {/* Header Sidebar */}
            <SidebarHeader className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
              <div className="flex items-center gap-3">
                <img src="/logo-em-cima.svg" alt="Upstart13" className="h-10 w-10 rounded-lg object-cover" />
                <div className="flex flex-col">
                  <h2 className="text-base font-semibold text-sidebar-foreground">Gladney</h2>
                  <p className="text-xs text-muted-foreground">Analytics Dashboard</p>
                </div>
              </div>
            </SidebarHeader>

            {/* Menu principal */}
            <SidebarGroup className="flex-1 overflow-y-auto px-2 py-4">
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  
                  {/* DASHBOARDS */}
                  <Collapsible defaultOpen className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full hover:bg-sidebar-accent transition-colors rounded-lg">
                          <div className="flex items-center gap-3">
                            <ChartBarIcon className="h-5 w-5 text-primary flex-shrink-0" />
                            <span className="font-medium">Dashboards</span>
                          </div>
                          <ChevronRightIcon className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className="ml-6 space-y-1 mt-2">
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              onClick={() => handleNavigation("expectant_mother")}
                              className={`transition-colors rounded-lg ${
                                activePage === "expectant_mother"
                                  ? "bg-primary text-primary-foreground"
                                  : "hover:bg-sidebar-accent"
                              }`}
                            >
                              Expectant Mother
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>

                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              onClick={() => handleNavigation("gladney_business")}
                              className={`transition-colors rounded-lg ${
                                activePage === "gladney_business"
                                  ? "bg-primary text-primary-foreground"
                                  : "hover:bg-sidebar-accent"
                              }`}
                            >
                              Gladney Business
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>

                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              onClick={() => handleNavigation("page_traffic")}
                              className={`transition-colors rounded-lg ${
                                activePage === "page_traffic"
                                  ? "bg-primary text-primary-foreground"
                                  : "hover:bg-sidebar-accent"
                              }`}
                            >
                              Page Traffic Monitor
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>

                  {/* INFORMATION */}
                  <Collapsible className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full hover:bg-sidebar-accent transition-colors rounded-lg">
                          <div className="flex items-center gap-3">
                            <InformationCircleIcon className="h-5 w-5 text-primary flex-shrink-0" />
                            <span className="font-medium">Information</span>
                          </div>
                          <ChevronRightIcon className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className="ml-6 space-y-1 mt-2">
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              onClick={() => handleNavigation("dashboard_details")}
                              className={`transition-colors rounded-lg ${
                                activePage === "dashboard_details"
                                  ? "bg-primary text-primary-foreground"
                                  : "hover:bg-sidebar-accent"
                              }`}
                            >
                              Dashboard Details
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              onClick={() => handleNavigation("dashboard_faq")}
                              className={`transition-colors rounded-lg ${
                                activePage === "dashboard_faq"
                                  ? "bg-primary text-primary-foreground"
                                  : "hover:bg-sidebar-accent"
                              }`}
                            >
                              Dashboard FAQ
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>

                  {/* NOTIFICATIONS */}
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => handleNavigation("notifications")}
                      className={`transition-colors rounded-lg ${
                        activePage === "notifications"
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-sidebar-accent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <BellIcon className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="font-medium">Notifications</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Footer */}
            <div className="mt-auto border-t border-sidebar-border p-4">
              <div className="flex items-center justify-center gap-3 p-3 rounded-lg bg-slate-50">
                <img src="/logo-icon-big.jpeg" alt="UpStart13" className="h-8 w-8 rounded" />
                <div className="text-xs">
                  <div className="font-medium text-sidebar-foreground">Powered by</div>
                  <div className="text-primary font-semibold">Upstart13</div>
                </div>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Header */}
          <header className="sticky top-0 z-50 bg-background border-b border-border h-16 flex-shrink-0">
            <div className="flex h-full items-center justify-between px-4 sm:px-6">
              <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                <SidebarTrigger className="lg:hidden flex items-center justify-center p-2 hover:bg-muted rounded-lg transition-colors">
                  <Bars3Icon className="h-5 w-5" />
                </SidebarTrigger>
                <h1 className="text-lg sm:text-xl font-semibold text-foreground truncate">
                  {getPageTitle()}
                </h1>
              </div>

              {/* Profile */}
              <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-3 p-2 rounded-lg border border-border bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                      <img src="/user-profile-avatar.png" alt="Profile" className="h-8 w-8 rounded-full" />
                      <div className="hidden sm:block text-sm">
                        <div className="font-medium">User Name</div>
                        <div className="text-muted-foreground text-xs">user@email.com</div>
                      </div>
                      <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Conteúdo principal */}
          <div className="flex-1 flex flex-col p-3 sm:p-6 bg-popover overflow-auto">
            
            {/* Menus horizontais */}
            {activePage !== "notifications" &&
              activePage !== "dashboard_details" &&
              activePage !== "dashboard_faq" && (
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

            {/* Iframe container */}
            <Card id="iframe-container" className="flex-1 overflow-hidden border border-border min-h-0 bg-background">
              {isFullscreen && (
                <div className="fixed top-0 left-0 right-0 z-[10000] bg-background/95 backdrop-blur-sm border-b border-border">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-4 p-3 sm:p-4">
                    {renderPageContent()}
                  </div>
                </div>
              )}

              <div className={`w-full h-full ${isFullscreen ? "mt-20" : ""}`}>
                <iframe
                  src={currentUrl}
                  title="Gladney Dashboard"
                  className="w-full h-full border-0 rounded-lg"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
