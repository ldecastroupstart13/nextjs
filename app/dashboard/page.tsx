// 📄 Parte 1 — Imports, States, LOOKERS, Utils,

"use client"
import { useSession, signOut } from "next-auth/react"
import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

export default function GladneyDashboard() {
  const [selectedView, setSelectedView] = useState({ group: "expectant", key: "overview_ads" })
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activePage, setActivePage] = useState("expectant_mother")
  const [selectedDropdownItem, setSelectedDropdownItem] = useState("overview_ads")
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({})
  const { data: session } = useSession()   // <-- PEGA a sessão autenticada
const LOOKERS = {
    expectant: {
      overview_ads:
        "https://lookerstudio.google.com/embed/reporting/f794735e-f339-4b6f-be44-cb26af635f6d/page/p_03hj6qcmvd",
      overview_ga4:
        "https://lookerstudio.google.com/embed/reporting/f794735e-f339-4b6f-be44-cb26af635f6d/page/p_8k5zdcvuvd",
      recent: "https://lookerstudio.google.com/embed/reporting/f794735e-f339-4b6f-be44-cb26af635f6d/page/p_rbf34iv8ud",
      google_ads:
        "https://lookerstudio.google.com/embed/reporting/f794735e-f339-4b6f-be44-cb26af635f6d/page/p_8eecz0rovd",
      campaign_break:
        "https://lookerstudio.google.com/embed/reporting/f794735e-f339-4b6f-be44-cb26af635f6d/page/p_tadcyerovd",
      campaign_costs:
        "https://lookerstudio.google.com/embed/reporting/f794735e-f339-4b6f-be44-cb26af635f6d/page/p_ep8hx4qovd",
      contact_cost:
        "https://lookerstudio.google.com/embed/reporting/f794735e-f339-4b6f-be44-cb26af635f6d/page/p_jvidqwqovd",
      day_of_week:
        "https://lookerstudio.google.com/embed/reporting/f794735e-f339-4b6f-be44-cb26af635f6d/page/p_1cwm5jqovd",
      campaign_ratios:
        "https://lookerstudio.google.com/embed/reporting/f794735e-f339-4b6f-be44-cb26af635f6d/page/p_zx6sodqovd",
      contact_break:
        "https://lookerstudio.google.com/embed/reporting/f794735e-f339-4b6f-be44-cb26af635f6d/page/p_1r1tjgpovd",
      spam_break:
        "https://lookerstudio.google.com/embed/reporting/f794735e-f339-4b6f-be44-cb26af635f6d/page/p_an0bb3povd",
    },
    marketing: {
      performance_time:
        "https://lookerstudio.google.com/embed/reporting/f794735e-f339-4b6f-be44-cb26af635f6d/page/p_hxd854tovd",
      cost_per:
        "https://lookerstudio.google.com/embed/reporting/f794735e-f339-4b6f-be44-cb26af635f6d/page/p_3i0yaalovd",
      table_download:
        "https://lookerstudio.google.com/embed/reporting/f794735e-f339-4b6f-be44-cb26af635f6d/page/p_4wsin3lovd",
      enroll_placements:
        "https://lookerstudio.google.com/embed/reporting/f794735e-f339-4b6f-be44-cb26af635f6d/page/p_p95uwh89vd",
      enroll_admission:
        "https://lookerstudio.google.com/embed/reporting/f794735e-f339-4b6f-be44-cb26af635f6d/page/p_72wuuqv6vd",
      enroll_creation:
        "https://lookerstudio.google.com/embed/reporting/f794735e-f339-4b6f-be44-cb26af635f6d/page/p_o9fkb2oavd",
      enroll_timeseries:
        "https://lookerstudio.google.com/embed/reporting/f794735e-f339-4b6f-be44-cb26af635f6d/page/p_094a1q3nvd",
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
        "https://lookerstudio.google.com/embed/reporting/65b02465-76a7-4270-a0ff-337e4af02400/page/p_z2i9rcdktd",
      traffic_user_overview:
        "https://lookerstudio.google.com/embed/reporting/65b02465-76a7-4270-a0ff-337e4af02400/page/p_bppth3a2sd",
      sessions_overview:
        "https://lookerstudio.google.com/embed/reporting/65b02465-76a7-4270-a0ff-337e4af02400/page/p_amhq0bb2sd",
      user_overview:
        "https://lookerstudio.google.com/embed/reporting/65b02465-76a7-4270-a0ff-337e4af02400/page/p_zs34w5f2sd",
      google_ads_keywords:
        "https://lookerstudio.google.com/embed/reporting/65b02465-76a7-4270-a0ff-337e4af02400/page/p_b5uzxjdktd",
      demographic_info:
        "https://lookerstudio.google.com/embed/reporting/65b02465-76a7-4270-a0ff-337e4af02400/page/p_snmx9lgltd",
      events_top_pages:
        "https://lookerstudio.google.com/embed/reporting/65b02465-76a7-4270-a0ff-337e4af02400/page/p_hdoejlb2sd",
      conversion_events:
        "https://lookerstudio.google.com/embed/reporting/65b02465-76a7-4270-a0ff-337e4af02400/page/p_od7jq6f2sd",
      conversion_performance:
        "https://lookerstudio.google.com/embed/reporting/65b02465-76a7-4270-a0ff-337e4af02400/page/p_pfbpeii2sd",
      ai_vs_human:
        "https://lookerstudio.google.com/embed/reporting/65b02465-76a7-4270-a0ff-337e4af02400/page/p_60iwvfimtd",
      ai_deep_dive:
        "https://lookerstudio.google.com/embed/reporting/65b02465-76a7-4270-a0ff-337e4af02400/page/p_m7azaxhmtd",
      temporary_visualization:
        "https://lookerstudio.google.com/embed/reporting/65b02465-76a7-4270-a0ff-337e4af02400/page/p_zpttqz0qtd",
      google_analytics_dashboard:
        "https://lookerstudio.google.com/embed/reporting/65b02465-76a7-4270-a0ff-337e4af02400/page/p_mppqixq3vd",
    },
  }

  const router = useRouter()

  const toggleDropdown = (dropdownId: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdownId]: !prev[dropdownId],
    }))
  }

  const closeAllDropdowns = () => {
    setOpenDropdowns({})
  }

  const handleViewSelect = async (group: string, key: string) => {
    setSelectedView({ group, key })
    setSelectedDropdownItem(key)
    closeAllDropdowns()
  
    const url = new URL(window.location.href)
    url.searchParams.set("group", group)
    url.searchParams.set("view", key)
    window.history.replaceState({}, "", url.toString())
  
    // 🔥 Tracking
    try {
      await fetch("/api/track-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "select_view",
          route: `${group}:${key}`,
        }),
      })
    } catch (err) {
      console.error("Tracking error:", err)
    }
  }





// 📄 Parte 2 — Fullscreen, Utils, RenderPageContent (Expectant + Marketing)

  const toggleFullscreen = () => {
    const element = document.getElementById("iframe-container")
  
    if (!document.fullscreenElement && element) {
      element.requestFullscreen()
      setIsFullscreen(true)
  
      // 👉 Track Enter Fullscreen
      fetch("/api/track-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "enter_fullscreen",
          route: activePage, // página atual
          email: session?.user?.email || "anonymous",
        }),
      })
    } else if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsFullscreen(false)
  
      // 👉 Track Exit Fullscreen
      fetch("/api/track-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "exit_fullscreen",
          route: activePage,
          email: session?.user?.email || "anonymous",
        }),
      })
    }
  }


  const handleNavigation = async (page: string) => {
    setActivePage(page)
    closeAllDropdowns()
  
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
  
    // 🔥 Tracking
    try {
      await fetch("/api/track-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "navigate",
          route: page,
        }),
      })
    } catch (err) {
      console.error("Tracking error:", err)
    }
  }


  useEffect(() => {
    const url = new URL(window.location.href)
    const group = url.searchParams.get("group") || "expectant"
    const view = url.searchParams.get("view") || "overview_ads"
    setSelectedView({ group, key: view })
    setSelectedDropdownItem(view)
  
    // 🔹 mapeia corretamente o activePage
    if (group === "expectant") setActivePage("expectant_mother")
    else if (group === "gladney") setActivePage("gladney_business")
    else if (group === "traffic") setActivePage("page_traffic")
    else if (group === "info") setActivePage("dashboard_details")
    else if (group === "notifications") setActivePage("notifications")
  }, [])


  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
      if (!document.fullscreenElement) {
        closeAllDropdowns()
      }
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const currentUrl =
    LOOKERS[selectedView.group as keyof typeof LOOKERS]?.[
      selectedView.key as keyof (typeof LOOKERS)[keyof typeof LOOKERS]
    ] || "about:blank"

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

  const CustomDropdown = ({
    id,
    trigger,
    children,
    className = "",
  }: {
    id: string
    trigger: React.ReactNode
    children: React.ReactNode
    className?: string
  }) => {
    const isOpen = openDropdowns[id] || false
    return (
      <div className={`relative ${className}`}>
        <div onClick={() => toggleDropdown(id)} className="cursor-pointer">
          {trigger}
        </div>
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
    parentId,
  }: {
    trigger: React.ReactNode
    children: React.ReactNode
    parentId: string
  }) => {
    const submenuId = `${parentId}_submenu`
    const isOpen = openDropdowns[submenuId] || false
    return (
      <div className="relative">
        <div
          onClick={() => toggleDropdown(submenuId)}
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

  const handleLogout = () => {
    router.push("/")
  }

    // 🔖 Labels amigáveis para os menus
  const LABELS: Record<string, string> = {
    // Expectant
    overview_ads: "Overview - Ads & Hubspot",
    overview_ga4: "Overview - GA4",
    recent: "Recent Perspective",
    google_ads: "Google Ads Performance",
    campaign_break: "Campaign Breakdown",
    campaign_costs: "Campaign Costs",
    contact_cost: "Contact x Cost",
    day_of_week: "Day of the Week",
    campaign_ratios: "Campaign Ratios",
    contact_break: "Contact Breakdown",
    spam_break: "Spam Breakdown",

    // Marketing
    performance_time: "Performance Over Time",
    cost_per: "Cost Per Acquisition",
    table_download: "Downloadable Table",
    enroll_placements: "Enroll by Placement",
    enroll_admission: "Enroll by Admission",
    enroll_creation: "Enroll by Creation",
    enroll_timeseries: "Enroll Time Series",

    // Gladney - Adoptive Parents
    adoptive_performance: "Performance",
    adoptive_recent: "Recent Perspective",
    adoptive_timeline: "Process Timeline",

    // Gladney - Birth Parents
    birth_overall: "Overall Performance",
    birth_detailed: "Detailed Performance",
    birth_recent: "Recent Perspective",
    birth_breakdown: "Breakdown by State",
    birth_timeline: "Process Timeline",

    // Gladney - New Beginnings
    new_performance: "Performance",
    new_recent: "Recent Perspective",
    new_timeline: "Process Timeline",

    // Gladney - Drilldown
    drilldown_domestic: "Domestic Infant",
    drilldown_new: "New Beginnings",
  }


  const renderPageContent = () => {
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
                {LABELS[key] || key}
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
            {/* Itens simples */}
            <CustomDropdownItem
              onClick={() => handleViewSelect("marketing", "performance_time")}
              isSelected={selectedDropdownItem === "performance_time"}
            >
              {LABELS["performance_time"]}
            </CustomDropdownItem>
            <CustomDropdownItem
              onClick={() => handleViewSelect("marketing", "cost_per")}
              isSelected={selectedDropdownItem === "cost_per"}
            >
              {LABELS["cost_per"]}
            </CustomDropdownItem>
            <CustomDropdownItem
              onClick={() => handleViewSelect("marketing", "table_download")}
              isSelected={selectedDropdownItem === "table_download"}
            >
              {LABELS["table_download"]}
            </CustomDropdownItem>

            {/* Submenu Enrollment Rate */}
            <CustomSubmenu parentId="marketing_dropdown" trigger="Enrollment Rate">
              <CustomDropdownItem
                onClick={() => handleViewSelect("marketing", "enroll_placements")}
                isSelected={selectedDropdownItem === "enroll_placements"}
              >
                {LABELS["enroll_placements"]}
              </CustomDropdownItem>
              <CustomDropdownItem
                onClick={() => handleViewSelect("marketing", "enroll_admission")}
                isSelected={selectedDropdownItem === "enroll_admission"}
              >
                {LABELS["enroll_admission"]}
              </CustomDropdownItem>
              <CustomDropdownItem
                onClick={() => handleViewSelect("marketing", "enroll_creation")}
                isSelected={selectedDropdownItem === "enroll_creation"}
              >
                {LABELS["enroll_creation"]}
              </CustomDropdownItem>
              <CustomDropdownItem
                onClick={() => handleViewSelect("marketing", "enroll_timeseries")}
                isSelected={selectedDropdownItem === "enroll_timeseries"}
              >
                {LABELS["enroll_timeseries"]}
              </CustomDropdownItem>
            </CustomSubmenu>
          </CustomDropdown>
        </div>
      )
    }






// 📄 Parte 3 — RenderPageContent (Gladney, Traffic, FAQ, Details, Notifications)
// 📄 Parte 3 — RenderPageContent (Gladney, Traffic, FAQ, Details, Notifications)
if (activePage === "gladney_business") {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
      
      {/* Domestic Infant */}
      <CustomDropdown
        id="domestic_dropdown"
        trigger={
          <Button
            variant={
              [
                "adoptive_performance","adoptive_recent","adoptive_timeline",
                "birth_overall","birth_detailed","birth_recent","birth_breakdown","birth_timeline"
              ].includes(selectedDropdownItem) ? "default" : "outline"
            }
            className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
          >
            <span className="truncate">Domestic Infant</span>
            <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
          </Button>
        }
      >
        {/* Adoptive Parents */}
        <CustomSubmenu parentId="domestic_adoptive" trigger="Adoptive Parents">
          <CustomDropdownItem
            onClick={() => handleViewSelect("gladney", "adoptive_performance")}
            isSelected={selectedDropdownItem === "adoptive_performance"}
          >
            {LABELS["adoptive_performance"]}
          </CustomDropdownItem>
          <CustomDropdownItem
            onClick={() => handleViewSelect("gladney", "adoptive_recent")}
            isSelected={selectedDropdownItem === "adoptive_recent"}
          >
            {LABELS["adoptive_recent"]}
          </CustomDropdownItem>
          <CustomDropdownItem
            onClick={() => handleViewSelect("gladney", "adoptive_timeline")}
            isSelected={selectedDropdownItem === "adoptive_timeline"}
          >
            {LABELS["adoptive_timeline"]}
          </CustomDropdownItem>
        </CustomSubmenu>

        {/* Birth Parents */}
        <CustomSubmenu parentId="domestic_birth" trigger="Birth Parents">
          <CustomDropdownItem
            onClick={() => handleViewSelect("gladney", "birth_overall")}
            isSelected={selectedDropdownItem === "birth_overall"}
          >
            {LABELS["birth_overall"]}
          </CustomDropdownItem>
          <CustomDropdownItem
            onClick={() => handleViewSelect("gladney", "birth_detailed")}
            isSelected={selectedDropdownItem === "birth_detailed"}
          >
            {LABELS["birth_detailed"]}
          </CustomDropdownItem>
          <CustomDropdownItem
            onClick={() => handleViewSelect("gladney", "birth_recent")}
            isSelected={selectedDropdownItem === "birth_recent"}
          >
            {LABELS["birth_recent"]}
          </CustomDropdownItem>
          <CustomDropdownItem
            onClick={() => handleViewSelect("gladney", "birth_breakdown")}
            isSelected={selectedDropdownItem === "birth_breakdown"}
          >
            {LABELS["birth_breakdown"]}
          </CustomDropdownItem>
          <CustomDropdownItem
            onClick={() => handleViewSelect("gladney", "birth_timeline")}
            isSelected={selectedDropdownItem === "birth_timeline"}
          >
            {LABELS["birth_timeline"]}
          </CustomDropdownItem>
        </CustomSubmenu>
      </CustomDropdown>

      {/* New Beginnings */}
      <CustomDropdown
        id="new_beginnings_dropdown"
        trigger={
          <Button
            variant={
              ["new_performance","new_recent","new_timeline"].includes(selectedDropdownItem)
                ? "default" : "outline"
            }
            className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
          >
            <span className="truncate">New Beginnings</span>
            <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
          </Button>
        }
      >
        <CustomDropdownItem
          onClick={() => handleViewSelect("gladney", "new_performance")}
          isSelected={selectedDropdownItem === "new_performance"}
        >
          {LABELS["new_performance"]}
        </CustomDropdownItem>
        <CustomDropdownItem
          onClick={() => handleViewSelect("gladney", "new_recent")}
          isSelected={selectedDropdownItem === "new_recent"}
        >
          {LABELS["new_recent"]}
        </CustomDropdownItem>
        <CustomDropdownItem
          onClick={() => handleViewSelect("gladney", "new_timeline")}
          isSelected={selectedDropdownItem === "new_timeline"}
        >
          {LABELS["new_timeline"]}
        </CustomDropdownItem>
      </CustomDropdown>

      {/* Drilldown Tables */}
      <CustomDropdown
        id="drilldown_dropdown"
        trigger={
          <Button
            variant={
              ["drilldown_domestic","drilldown_new"].includes(selectedDropdownItem)
                ? "default" : "outline"
            }
            className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
          >
            <span className="truncate">Drilldown Tables</span>
            <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
          </Button>
        }
      >
        <CustomDropdownItem
          onClick={() => handleViewSelect("gladney", "drilldown_domestic")}
          isSelected={selectedDropdownItem === "drilldown_domestic"}
        >
          {LABELS["drilldown_domestic"]}
        </CustomDropdownItem>
        <CustomDropdownItem
          onClick={() => handleViewSelect("gladney", "drilldown_new")}
          isSelected={selectedDropdownItem === "drilldown_new"}
        >
          {LABELS["drilldown_new"]}
        </CustomDropdownItem>
      </CustomDropdown>
    </div>
  )
}



  // Parte 3.1 - Traficc
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

          {/* Traffic Analysis */}
          <CustomDropdown
            id="traffic_analysis_dropdown"
            trigger={
              <Button
                variant="outline"
                className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
              >
                <span className="truncate">Traffic Analysis</span>
                <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
              </Button>
            }
          >
            <CustomDropdownItem
              onClick={() => handleViewSelect("traffic", "sessions_overview")}
              isSelected={selectedDropdownItem === "sessions_overview"}
            >
              Sessions Overview
            </CustomDropdownItem>
            <CustomDropdownItem
              onClick={() => handleViewSelect("traffic", "user_overview")}
              isSelected={selectedDropdownItem === "user_overview"}
            >
              User Overview
            </CustomDropdownItem>
            <CustomDropdownItem
              onClick={() => handleViewSelect("traffic", "google_ads_keywords")}
              isSelected={selectedDropdownItem === "google_ads_keywords"}
            >
              Google Ads Keywords
            </CustomDropdownItem>
            <CustomDropdownItem
              onClick={() => handleViewSelect("traffic", "demographic_info")}
              isSelected={selectedDropdownItem === "demographic_info"}
            >
              Demographic Information
            </CustomDropdownItem>
          </CustomDropdown>

          {/* Engagement & Pages */}
          <CustomDropdown
            id="engagement_dropdown"
            trigger={
              <Button
                variant="outline"
                className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
              >
                <span className="truncate">Engagement</span>
                <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
              </Button>
            }
          >
            <CustomDropdownItem
              onClick={() => handleViewSelect("traffic", "events_top_pages")}
              isSelected={selectedDropdownItem === "events_top_pages"}
            >
              Events & Top Pages
            </CustomDropdownItem>
            <CustomDropdownItem
              onClick={() => handleViewSelect("traffic", "conversion_events")}
              isSelected={selectedDropdownItem === "conversion_events"}
            >
              Conversion Events Breakdown
            </CustomDropdownItem>
          </CustomDropdown>

          <Button
            variant={selectedView.key === "conversion_performance" ? "default" : "outline"}
            onClick={() => handleViewSelect("traffic", "conversion_performance")}
          >
            Conversion Performance
          </Button>

          {/* AI Traffic */}
          <CustomDropdown
            id="ai_traffic_dropdown"
            trigger={
              <Button
                variant="outline"
                className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
              >
                <span className="truncate">AI Traffic</span>
                <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
              </Button>
            }
          >
            <CustomDropdownItem
              onClick={() => handleViewSelect("traffic", "ai_vs_human")}
              isSelected={selectedDropdownItem === "ai_vs_human"}
            >
              AI vs Human
            </CustomDropdownItem>
            <CustomDropdownItem
              onClick={() => handleViewSelect("traffic", "ai_deep_dive")}
              isSelected={selectedDropdownItem === "ai_deep_dive"}
            >
              AI Deep Dive
            </CustomDropdownItem>
          </CustomDropdown>

          <Button
            variant={selectedView.key === "temporary_visualization" ? "default" : "outline"}
            onClick={() => handleViewSelect("traffic", "temporary_visualization")}
          >
            Temporary Visualization
          </Button>
          <Button
            variant={selectedView.key === "google_analytics_dashboard" ? "default" : "outline"}
            onClick={() => handleViewSelect("traffic", "google_analytics_dashboard")}
          >
            Google Analytics Dashboard
          </Button>
        </div>
      )
    }

    if (activePage === "dashboard_faq") {
      return (
        <div className="w-full h-full p-8 space-y-8 overflow-auto">
          <div className="space-y-6 max-w-none">
            <div>
              <p className="text-base text-muted-foreground leading-relaxed text-pretty">
                The purpose of this section is to address common questions that may arise as the Gladney team begins
                using the dashboards. We plan to continue expanding this section over time to ensure that frequently
                asked questions are answered and that common areas of confusion are clarified. If you have any questions
                that aren't covered here, please don't hesitate to reach out to us. Your feedback helps us improve the
                dashboards and make them as intuitive and user-friendly as possible.
              </p>
            </div>
    
            {/* FAQ LIST */}
            <div className="space-y-4">
              {/* Pergunta 1 */}
              <Collapsible className="border border-border rounded-lg">
                <CollapsibleTrigger
                  onClick={async () => {
                    try {
                      await fetch("/track_action", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          action: "faq_toggle",
                          detail: "faq_data_sources",
                          user: session?.user?.email || "unknown",
                          timestamp: new Date().toISOString(),
                        }),
                      })
                    } catch (err) {
                      console.error("Erro ao trackear FAQ 1:", err)
                    }
                  }}
                  className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium text-base">
                    <strong>1) What data sources are used to create the dashboards?</strong>
                  </span>
                  <ChevronRightIcon className="h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4">
                  <div className="text-sm text-muted-foreground space-y-2 pl-4">
                    <ul className="list-disc space-y-2">
                      <li><u>HubSpot:</u> Captures and stores information about leads and contacts...</li>
                      <li><u>Google Ads:</u> Provides data about paid advertising campaigns...</li>
                      <li><u>Google Analytics (GA4):</u> Tracks website visitor behavior...</li>
                      <li><u>Informer:</u> A reporting tool used by Gladney...</li>
                      <li><u>Google Sheets:</u> Used for uploading manually maintained reference data...</li>
                      <li><u>Sugar:</u> Gladney's CRM system for managing workflows and records.</li>
                    </ul>
                  </div>
                </CollapsibleContent>
              </Collapsible>
    
              {/* Pergunta 2 */}
              <Collapsible className="border border-border rounded-lg">
                <CollapsibleTrigger
                  onClick={async () => {
                    try {
                      await fetch("/track_action", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          action: "faq_toggle",
                          detail: "faq_spam_contacts",
                          user: session?.user?.email || "unknown",
                          timestamp: new Date().toISOString(),
                        }),
                      })
                    } catch (err) {
                      console.error("Erro ao trackear FAQ 2:", err)
                    }
                  }}
                  className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium text-base">
                    <strong>
                      2) I checked the spam contacts for Monday yesterday and again today, and the numbers are
                      different. Why might that be happening?
                    </strong>
                  </span>
                  <ChevronRightIcon className="h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4">
                  <div className="text-sm text-muted-foreground space-y-3 pl-4">
                    <p>Imagine this scenario: Today, you check the dashboard and see 15 spam contacts recorded for July 10th...</p>
                    <p>At first glance, you might think there's a mistake, but actually the number was updated...</p>
                    <p>After review, 2 more spam contacts were identified, bringing total to 17...</p>
                    <p>This adjustment can happen with other classifications too. Always notify the team if you spot issues.</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
      )
    }


    if (activePage === "dashboard_details") {
      const trackAndOpen = async (
        e: React.MouseEvent,
        detail: string,
        url: string
      ) => {
        e.preventDefault() // não abre imediatamente
        try {
          await fetch("/track_action", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "open_dashboard_detail",
              detail,
              user: session?.user?.email || "unknown",
              timestamp: new Date().toISOString(),
            }),
          })
        } catch (err) {
          console.error("Erro ao trackear clique:", err)
        } finally {
          window.open(url, "_blank") // abre depois em nova aba
        }
      }
    
      return (
        <div className="w-full h-full p-8 space-y-8 overflow-auto">
          <div className="max-w-none">
            <p className="text-base text-muted-foreground mb-8 leading-relaxed text-pretty">
              This section provides detailed information about the dashboards, including quality check reports and
              target metrics documentation.
            </p>
    
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
              {/* Quality Check Reports */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Quality Check Reports</h3>
                <div className="space-y-3">
                  <a
                    href="/docs/qc_expectant.pdf"
                    onClick={(e) => trackAndOpen(e, "quality_check_expectant_pdf", "/docs/qc_expectant.pdf")}
                    className="block text-blue-600 hover:text-blue-800 underline text-base transition-colors"
                  >
                    Expectant Mother Dashboard (PDF)
                  </a>
                  <a
                    href="/docs/qc_gladney.pdf"
                    onClick={(e) => trackAndOpen(e, "quality_check_gladney_pdf", "/docs/qc_gladney.pdf")}
                    className="block text-blue-600 hover:text-blue-800 underline text-base transition-colors"
                  >
                    Gladney Business Performance (PDF)
                  </a>
                  <a
                    href="/docs/qc_traffic.pdf"
                    onClick={(e) => trackAndOpen(e, "quality_check_traffic_pdf", "/docs/qc_traffic.pdf")}
                    className="block text-blue-600 hover:text-blue-800 underline text-base transition-colors"
                  >
                    Page Traffic Monitor (PDF)
                  </a>
                </div>
              </div>
    
              {/* Target Metrics */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Target Metrics</h3>
                <div className="space-y-3">
                  <a
                    href="https://docs.google.com/sheets/d/example_expectant"
                    onClick={(e) =>
                      trackAndOpen(e, "target_metrics_expectant_sheets", "https://docs.google.com/sheets/d/example_expectant")
                    }
                    className="block text-blue-600 hover:text-blue-800 underline text-base transition-colors"
                  >
                    Expectant Mother (Google Sheets)
                  </a>
                  <a
                    href="https://docs.google.com/sheets/d/example_gladney"
                    onClick={(e) =>
                      trackAndOpen(e, "target_metrics_gladney_sheets", "https://docs.google.com/sheets/d/example_gladney")
                    }
                    className="block text-blue-600 hover:text-blue-800 underline text-base transition-colors"
                  >
                    Gladney Business Performance (Google Sheets)
                  </a>
                  <a
                    href="https://docs.google.com/sheets/d/example_traffic"
                    onClick={(e) =>
                      trackAndOpen(e, "target_metrics_traffic_sheets", "https://docs.google.com/sheets/d/example_traffic")
                    }
                    className="block text-blue-600 hover:text-blue-800 underline text-base transition-colors"
                  >
                    Page Traffic Monitor (Google Sheets)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }


    if (activePage === "notifications") {
      return (
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
              <div className="text-center">
                <img
                  src="/no-notification.png"
                  alt="No Notifications"
                  className="w-32 h-auto mx-auto opacity-80 mb-6"
                />
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Notifications</h3>
                <p className="text-gray-600 text-lg">You're all caught up!</p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="text-center text-muted-foreground">
        <p>Selecione uma opção do menu para visualizar o dashboard.</p>
      </div>
    )
  }





// 📄 Parte 4 — Layout Geral (Sidebar + Header + Cards + Iframe)
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
                            <span className="font-medium">Dashboard</span>
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
                              className={`py-3 h-auto transition-colors rounded-lg ${
                                activePage === "gladney_business"
                                  ? "bg-primary text-primary-foreground"
                                  : "hover:bg-sidebar-accent"
                              }`}
                            >
                              <span className="text-sm leading-tight">
                                Gladney Business
                                <br />
                                Performance
                              </span>
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
            
                <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                  {/* Profile Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex items-center gap-3 p-2 rounded-lg border border-border bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                        <img
                          src={session?.user?.image || "/user-profile-avatar.png"}
                          alt="Profile"
                          className="h-8 w-8 rounded-full"
                        />
                        <div className="hidden sm:block text-sm">
                          <div className="font-medium">{session?.user?.name || "User Name"}</div>
                          <div className="text-muted-foreground text-xs">{session?.user?.email || "user@email.com"}</div>
                        </div>
                        <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem
                        onClick={() => {
                          try {
                            // 🔹 Track com sendBeacon (não perde no redirect)
                            const payload = JSON.stringify({
                              action: "logout",
                              user: session?.user?.email || "unknown",
                              timestamp: new Date().toISOString(),
                            })
                      
                            navigator.sendBeacon(
                              "/api/track-action",
                              new Blob([payload], { type: "application/json" })
                            )
                          } catch (err) {
                            console.error("Erro ao trackear logout:", err)
                          }
                      
                          // 🔹 Continua o fluxo normalmente
                          signOut({ callbackUrl: "/" })
                        }}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Logout
                      </DropdownMenuItem>

                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>   {/* ✅ agora fechado certinho */}


          {/* Conteúdo principal */}
          <div className="flex-1 flex flex-col p-3 sm:p-6 bg-popover overflow-auto">
            {/* Card superior (menus horizontais) */}
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
                        <span className="hidden sm:inline">Fullscreen</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

            {/* Iframe container */}
            <Card
              id="iframe-container"
              className="flex-1 overflow-hidden border border-border min-h-0 bg-background"
            >
              {isFullscreen && (
                <div className="fixed top-0 left-0 right-0 z-[10000] bg-background/95 backdrop-blur-sm border-b border-border">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-4 p-3 sm:p-4">
                    {renderPageContent()}
                  </div>
                </div>
              )}

              {/* Conteúdo dinamico */}
              <div className={`w-full h-full ${isFullscreen ? "mt-20" : ""}`}>
                {activePage === "notifications" ? (
                  <div className="w-full h-full flex items-center justify-center p-8 bg-background">
                    <div className="text-center">
                      <img
                        src="/no-notification.png"
                        alt="No Notifications"
                        className="w-32 h-auto mx-auto opacity-80 mb-6"
                      />
                      <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Notifications</h3>
                      <p className="text-gray-600 text-lg">You're all caught up!</p>
                    </div>
                  </div>
                ) : activePage === "dashboard_details" || activePage === "dashboard_faq" ? (
                  <div className="w-full h-full bg-background overflow-auto">{renderPageContent()}</div>
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
        </div>
      </div>
    </SidebarProvider>
  )
}
