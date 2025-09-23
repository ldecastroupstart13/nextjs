"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react" // Import useSession and signOut
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader, // Import SidebarHeader
} from "@/components/ui/sidebar"
import {
  ChartBarIcon,
  InformationCircleIcon,
  BellIcon,
  Bars3Icon,
  ArrowsPointingOutIcon, // Changed from Maximize2
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useRouter } from "next/navigation"

export default function GladneyDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

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

  useEffect(() => {
    if (status === "loading") return // Still loading
    if (!session) {
      router.push("/api/auth/signin")
      return
    }
  }, [session, status, router])

  const trackAction = async (action: string, route?: string) => {
    try {
      await fetch("/api/track-action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action, route }),
      })
    } catch (error) {
      console.error("Error tracking action:", error)
    }
  }

  const toggleDropdown = (dropdownId: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdownId]: !prev[dropdownId],
    }))
  }

  const closeAllDropdowns = () => {
    setOpenDropdowns({})
  }

  const handleViewSelect = (group: string, key: string) => {
    console.log("[v0] handleViewSelect called with:", { group, key, isFullscreen })
    setSelectedView({ group, key })
    setSelectedDropdownItem(key)
    closeAllDropdowns() // Close dropdowns after selection

    // Track the action
    trackAction(`View selected: ${group}/${key}`, `/dashboard?group=${group}&view=${key}`)

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

  const handleNavigation = (page: string) => {
    setActivePage(page)
    closeAllDropdowns() // Close dropdowns when navigating

    // Track the navigation
    trackAction(`Navigation: ${page}`, `/dashboard/${page}`)

    if (page === "expectant_mother") {
      setSelectedView({ group: "expectant", key: "overview_ads" })
      setSelectedDropdownItem("overview_ads")
    } else if (page === "gladney_business") {
      setSelectedView({ group: "gladney", key: "adoptive_performance" })
      setSelectedDropdownItem("adoptive_performance")
    } else if (page === "page_traffic") {
      setSelectedView({ group: "traffic", key: "cover_page" })
      setSelectedDropdownItem("cover_page")
    } else if (page === "dashboard_faq") {
      setSelectedView({ group: "", key: "" })
      setSelectedDropdownItem("")
    } else if (page === "dashboard_details") {
      setSelectedView({ group: "", key: "" })
      setSelectedDropdownItem("")
    } else if (page === "notifications") {
      setSelectedView({ group: "", key: "" })
      setSelectedDropdownItem("")
    }
  }

  const handleLogout = () => {
    trackAction("Logout", "/logout")
    signOut({ callbackUrl: "/" })
  }

  useEffect(() => {
    const url = new URL(window.location.href)
    const group = url.searchParams.get("group") || "expectant"
    const view = url.searchParams.get("view") || "overview_ads"
    setSelectedView({ group, key: view })
    setSelectedDropdownItem(view)
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
      if (!document.fullscreenElement) {
        closeAllDropdowns() // Close dropdowns when exiting fullscreen
      }
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const currentUrl =
    LOOKERS[selectedView.group as keyof typeof LOOKERS as keyof typeof LOOKERS]?.[
      selectedView.key as keyof typeof LOOKERS.expectant
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

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect in useEffect
  }

  const renderPageContent = () => {
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

            {/* Removed max-width constraint to use full width */}
            <div className="space-y-4">
              <Collapsible className="border border-border rounded-lg">
                <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-base">
                    <strong>1) What data sources are used to create the dashboards?</strong>
                  </span>
                  <ChevronRightIcon className="h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4">
                  <div className="text-sm text-muted-foreground space-y-2 pl-4">
                    <ul className="list-disc space-y-2">
                      <li>
                        <u>HubSpot:</u> Captures and stores information about leads and contacts, including form
                        submissions, contact details, and marketing engagement.
                      </li>
                      <li>
                        <u>Google Ads:</u> Provides data about paid advertising campaigns, such as impressions, clicks,
                        conversions, and ad spend.
                      </li>
                      <li>
                        <u>Google Analytics (GA4):</u> Tracks website visitor behavior, showing how users arrive at the
                        site, which pages they visit, and how they interact with site content.
                      </li>
                      <li>
                        <u>Informer:</u> A reporting tool used by Gladney to track internal operational data, such as
                        intake progress, case status updates, and other key business metrics.
                      </li>
                      <li>
                        <u>Google Sheets:</u> Used for uploading manually maintained reference data, such as KPI target
                        values and other custom inputs provided by the Gladney team. (See link in the "Dashboard
                        Details" section for more info.)
                      </li>
                      <li>
                        <u>Sugar:</u> Gladney's customer relationship management (CRM) system, used to manage ongoing
                        case workflows, track interactions with contacts, and store adoption-related records.
                      </li>
                    </ul>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible className="border border-border rounded-lg">
                <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors">
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
                    <p className="text-pretty">
                      Imagine this scenario: Today, you check the dashboard and see that there are 15 spam contacts
                      recorded for July 10th. Then, tomorrow, you check again and notice that the number has increased
                      to 17 spam contacts for the same date.
                    </p>
                    <p className="text-pretty">
                      At first glance, you might think there's a mistake or a data error. However, what's likely
                      happening is that the number of spam contacts has been updated. The Gladney team is constantly
                      reviewing and refining contact classifications to ensure we accurately distinguish between
                      legitimate, qualified contacts and spam. This review process often takes time.
                    </p>
                    <p className="text-pretty">
                      Using this same example: On your first check, you saw 15 spam contacts, which were automatically
                      flagged by our tools (e.g., HubSpot's spam detection). Out of a total of 30 contacts, that seemed
                      correct at the time. However, after the Gladney team manually reviewed the list, they identified 2
                      additional spam contacts that the automated system missed. That's why when you checked again, the
                      total had increased to 17.
                    </p>
                    <p className="text-pretty">
                      This kind of adjustment doesn't happen just with spam contacts—it can affect other classifications
                      too. That's why we always encourage the Gladney team to notify us of any changes or concerns they
                      notice in the dashboard, so we can keep everyone informed and ensure the data stays as accurate as
                      possible.
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
      )
    }

    if (activePage === "dashboard_details") {
      return (
        <div className="w-full h-full p-8 space-y-8 overflow-auto">
          <div className="max-w-none">
            <p className="text-base text-muted-foreground mb-8 leading-relaxed text-pretty">
              This section provides detailed information about the dashboards, including quality check reports and
              target metrics documentation.
            </p>

            {/* Adjusted grid to better fill available space */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Quality Check Reports</h3>
                <div className="space-y-3">
                  <a href="#" className="block text-blue-600 hover:text-blue-800 underline text-base transition-colors">
                    Quality Check Report - Expectant Mother Dashboard (PDF)
                  </a>
                  <a href="#" className="block text-blue-600 hover:text-blue-800 underline text-base transition-colors">
                    Quality Check Report - Gladney Business Performance (PDF)
                  </a>
                  <a href="#" className="block text-blue-600 hover:text-blue-800 underline text-base transition-colors">
                    Quality Check Report - Page Traffic Monitor (PDF)
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Target Metrics</h3>
                <div className="space-y-3">
                  <a href="#" className="block text-blue-600 hover:text-blue-800 underline text-base transition-colors">
                    Target Metrics - Expectant Mother (Google Sheets)
                  </a>
                  <a href="#" className="block text-blue-600 hover:text-blue-800 underline text-base transition-colors">
                    Target Metrics - Gladney Business Performance (Google Sheets)
                  </a>
                  <a href="#" className="block text-blue-600 hover:text-blue-800 underline text-base transition-colors">
                    Target Metrics - Page Traffic Monitor (Google Sheets)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (activePage === "expectant_mother") {
      if (isFullscreen) {
        return (
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
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
              <CustomDropdownItem
                onClick={() => handleViewSelect("expectant", "overview_ads")}
                isSelected={selectedDropdownItem === "overview_ads"}
              >
                Overview - ads & hubspot
              </CustomDropdownItem>
              <CustomDropdownItem
                onClick={() => handleViewSelect("expectant", "overview_ga4")}
                isSelected={selectedDropdownItem === "overview_ga4"}
              >
                Overview - GA4
              </CustomDropdownItem>
              <CustomDropdownItem
                onClick={() => handleViewSelect("expectant", "recent")}
                isSelected={selectedDropdownItem === "recent"}
              >
                Recent Perspective
              </CustomDropdownItem>
              <CustomDropdownItem
                onClick={() => handleViewSelect("expectant", "google_ads")}
                isSelected={selectedDropdownItem === "google_ads"}
              >
                Google Ads Performance
              </CustomDropdownItem>
              <CustomDropdownItem
                onClick={() => handleViewSelect("expectant", "campaign_break")}
                isSelected={selectedDropdownItem === "campaign_break"}
              >
                Campaign Breakdown
              </CustomDropdownItem>
              <CustomDropdownItem
                onClick={() => handleViewSelect("expectant", "campaign_costs")}
                isSelected={selectedDropdownItem === "campaign_costs"}
              >
                Campaign Costs
              </CustomDropdownItem>
              <CustomDropdownItem
                onClick={() => handleViewSelect("expectant", "contact_cost")}
                isSelected={selectedDropdownItem === "contact_cost"}
              >
                Contact x Cost
              </CustomDropdownItem>
              <CustomDropdownItem
                onClick={() => handleViewSelect("expectant", "day_of_week")}
                isSelected={selectedDropdownItem === "day_of_week"}
              >
                Day of the Week
              </CustomDropdownItem>
              <CustomDropdownItem
                onClick={() => handleViewSelect("expectant", "campaign_ratios")}
                isSelected={selectedDropdownItem === "campaign_ratios"}
              >
                Campaign Ratios
              </CustomDropdownItem>
              <CustomDropdownItem
                onClick={() => handleViewSelect("expectant", "contact_break")}
                isSelected={selectedDropdownItem === "contact_break"}
              >
                Contact Breakdown
              </CustomDropdownItem>
              <CustomDropdownItem
                onClick={() => handleViewSelect("expectant", "spam_break")}
                isSelected={selectedDropdownItem === "spam_break"}
              >
                Spam Breakdown
              </CustomDropdownItem>
            </CustomDropdown>

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
                Performance over time
              </CustomDropdownItem>
              <CustomDropdownItem
                onClick={() => handleViewSelect("marketing", "cost_per")}
                isSelected={selectedDropdownItem === "cost_per"}
              >
                Cost per…
              </CustomDropdownItem>
              <CustomDropdownItem
                onClick={() => handleViewSelect("marketing", "table_download")}
                isSelected={selectedDropdownItem === "table_download"}
              >
                Table for download
              </CustomDropdownItem>
              <CustomSubmenu parentId="marketing_dropdown" trigger="Enrollment Rate">
                <CustomDropdownItem
                  onClick={() => handleViewSelect("marketing", "enroll_placements")}
                  isSelected={selectedDropdownItem === "enroll_placements"}
                >
                  Filter by Placements in Sugar
                </CustomDropdownItem>
                <CustomDropdownItem
                  onClick={() => handleViewSelect("marketing", "enroll_admission")}
                  isSelected={selectedDropdownItem === "enroll_admission"}
                >
                  Filter by Admission in Sugar
                </CustomDropdownItem>
                <CustomDropdownItem
                  onClick={() => handleViewSelect("marketing", "enroll_creation")}
                  isSelected={selectedDropdownItem === "enroll_creation"}
                >
                  Filter by Creation in Hubspot
                </CustomDropdownItem>
                <CustomDropdownItem
                  onClick={() => handleViewSelect("marketing", "enroll_timeseries")}
                  isSelected={selectedDropdownItem === "enroll_timeseries"}
                >
                  Time Series
                </CustomDropdownItem>
              </CustomSubmenu>
            </CustomDropdown>
          </div>
        )
      } else {
        return (
          <>
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={selectedView.group === "expectant" ? "default" : "outline"}
                    className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
                  >
                    <span className="truncate">Expectant Mother</span>
                    <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 z-[9999]">
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

              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={selectedView.group === "marketing" ? "default" : "outline"}
                    className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
                  >
                    <span className="truncate">Marketing Performance</span>
                    <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 z-[9999]">
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
                    <DropdownMenuSubTrigger className="hover:bg-muted">Enrollment Rate</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="w-64 z-[9999]">
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
          </>
        )
      }
    } else if (activePage === "gladney_business") {
      if (isFullscreen) {
        return (
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
            <CustomDropdown
              id="domestic_dropdown"
              trigger={
                <Button
                  variant={
                    selectedView.group === "gladney" &&
                    ["adoptive_performance", "adoptive_recent", "adoptive_timeline"].includes(selectedView.key)
                      ? "default"
                      : "outline"
                  }
                  className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
                >
                  <span className="truncate">Domestic Infant</span>
                  <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
                </Button>
              }
            >
              <CustomSubmenu parentId="domestic_dropdown" trigger="Adoptive Parents">
                <CustomDropdownItem
                  onClick={() => handleViewSelect("gladney", "adoptive_performance")}
                  isSelected={selectedDropdownItem === "adoptive_performance"}
                >
                  Performance
                </CustomDropdownItem>
                <CustomDropdownItem
                  onClick={() => handleViewSelect("gladney", "adoptive_recent")}
                  isSelected={selectedDropdownItem === "adoptive_recent"}
                >
                  Recent Perspective
                </CustomDropdownItem>
                <CustomDropdownItem
                  onClick={() => handleViewSelect("gladney", "adoptive_timeline")}
                  isSelected={selectedDropdownItem === "adoptive_timeline"}
                >
                  Process Timeline
                </CustomDropdownItem>
              </CustomSubmenu>
              <CustomSubmenu parentId="domestic_dropdown" trigger="Birth Parents">
                <CustomDropdownItem
                  onClick={() => handleViewSelect("gladney", "birth_overall")}
                  isSelected={selectedDropdownItem === "birth_overall"}
                >
                  Overall Performance
                </CustomDropdownItem>
                <CustomDropdownItem
                  onClick={() => handleViewSelect("gladney", "birth_detailed")}
                  isSelected={selectedDropdownItem === "birth_detailed"}
                >
                  Detailed Performance
                </CustomDropdownItem>
                <CustomDropdownItem
                  onClick={() => handleViewSelect("gladney", "birth_recent")}
                  isSelected={selectedDropdownItem === "birth_recent"}
                >
                  Recent Perspective
                </CustomDropdownItem>
                <CustomDropdownItem
                  onClick={() => handleViewSelect("gladney", "birth_breakdown")}
                  isSelected={selectedDropdownItem === "birth_breakdown"}
                >
                  Breakdown by State
                </CustomDropdownItem>
                <CustomDropdownItem
                  onClick={() => handleViewSelect("gladney", "birth_timeline")}
                  isSelected={selectedDropdownItem === "birth_timeline"}
                >
                  Process Timeline
                </CustomDropdownItem>
              </CustomSubmenu>
            </CustomDropdown>

            <CustomDropdown
              id="new_beginnings_dropdown"
              trigger={
                <Button
                  variant={
                    selectedView.group === "gladney" &&
                    ["new_performance", "new_recent", "new_timeline"].includes(selectedView.key)
                      ? "default"
                      : "outline"
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
                Performance
              </CustomDropdownItem>
              <CustomDropdownItem
                onClick={() => handleViewSelect("gladney", "new_recent")}
                isSelected={selectedDropdownItem === "new_recent"}
              >
                Recent Perspective
              </CustomDropdownItem>
              <CustomDropdownItem
                onClick={() => handleViewSelect("gladney", "new_timeline")}
                isSelected={selectedDropdownItem === "new_timeline"}
              >
                Process Timeline
              </CustomDropdownItem>
            </CustomDropdown>

            <CustomDropdown
              id="drilldown_dropdown"
              trigger={
                <Button
                  variant={
                    selectedView.group === "gladney" &&
                    ["drilldown_domestic", "drilldown_new"].includes(selectedView.key)
                      ? "default"
                      : "outline"
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
                Domestic Infant
              </CustomDropdownItem>
              <CustomDropdownItem
                onClick={() => handleViewSelect("gladney", "drilldown_new")}
                isSelected={selectedDropdownItem === "drilldown_new"}
              >
                New Beginnings
              </CustomDropdownItem>
            </CustomDropdown>
          </div>
        )
      } else {
        return (
          <>
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={
                      selectedView.group === "gladney" &&
                      ["adoptive_performance", "adoptive_recent", "adoptive_timeline"].includes(selectedView.key)
                        ? "default"
                        : "outline"
                    }
                    className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
                  >
                    <span className="truncate">Domestic Infant</span>
                    <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 z-[9999]">
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="hover:bg-muted">Adoptive Parents</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="w-64 z-[9999]">
                      <DropdownMenuItem
                        onClick={() => handleViewSelect("gladney", "adoptive_performance")}
                        className={`hover:bg-muted ${selectedDropdownItem === "adoptive_performance" ? "bg-primary text-primary-foreground" : ""}`}
                      >
                        Performance
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleViewSelect("gladney", "adoptive_recent")}
                        className={`hover:bg-muted ${selectedDropdownItem === "adoptive_recent" ? "bg-primary text-primary-foreground" : ""}`}
                      >
                        Recent Perspective
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleViewSelect("gladney", "adoptive_timeline")}
                        className={`hover:bg-muted ${selectedDropdownItem === "adoptive_timeline" ? "bg-primary text-primary-foreground" : ""}`}
                      >
                        Process Timeline
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="hover:bg-muted">Birth Parents</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="w-64 z-[9999]">
                      <DropdownMenuItem
                        onClick={() => handleViewSelect("gladney", "birth_overall")}
                        className={`hover:bg-muted ${selectedDropdownItem === "birth_overall" ? "bg-primary text-primary-foreground" : ""}`}
                      >
                        Overall Performance
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleViewSelect("gladney", "birth_detailed")}
                        className={`hover:bg-muted ${selectedDropdownItem === "birth_detailed" ? "bg-primary text-primary-foreground" : ""}`}
                      >
                        Detailed Performance
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleViewSelect("gladney", "birth_recent")}
                        className={`hover:bg-muted ${selectedDropdownItem === "birth_recent" ? "bg-primary text-primary-foreground" : ""}`}
                      >
                        Recent Perspective
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleViewSelect("gladney", "birth_breakdown")}
                        className={`hover:bg-muted ${selectedDropdownItem === "birth_breakdown" ? "bg-primary text-primary-foreground" : ""}`}
                      >
                        Breakdown by State
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleViewSelect("gladney", "birth_timeline")}
                        className={`hover:bg-muted ${selectedDropdownItem === "birth_timeline" ? "bg-primary text-primary-foreground" : ""}`}
                      >
                        Process Timeline
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={
                      selectedView.group === "gladney" &&
                      ["new_performance", "new_recent", "new_timeline"].includes(selectedView.key)
                        ? "default"
                        : "outline"
                    }
                    className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
                  >
                    <span className="truncate">New Beginnings</span>
                    <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 z-[9999]">
                  <DropdownMenuItem
                    onClick={() => handleViewSelect("gladney", "new_performance")}
                    className={`hover:bg-muted ${selectedDropdownItem === "new_performance" ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    Performance
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleViewSelect("gladney", "new_recent")}
                    className={`hover:bg-muted ${selectedDropdownItem === "new_recent" ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    Recent Perspective
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleViewSelect("gladney", "new_timeline")}
                    className={`hover:bg-muted ${selectedDropdownItem === "new_timeline" ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    Process Timeline
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={
                      selectedView.group === "gladney" &&
                      ["drilldown_domestic", "drilldown_new"].includes(selectedView.key)
                        ? "default"
                        : "outline"
                    }
                    className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
                  >
                    <span className="truncate">Drilldown Tables</span>
                    <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 z-[9999]">
                  <DropdownMenuItem
                    onClick={() => handleViewSelect("gladney", "drilldown_domestic")}
                    className={`hover:bg-muted ${selectedDropdownItem === "drilldown_domestic" ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    Domestic Infant
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleViewSelect("gladney", "drilldown_new")}
                    className={`hover:bg-muted ${selectedDropdownItem === "drilldown_new" ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    New Beginnings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )
      }
    } else if (activePage === "page_traffic") {
      if (isFullscreen) {
        return (
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
            <Button
              onClick={() => handleViewSelect("traffic", "cover_page")}
              variant={selectedDropdownItem === "cover_page" ? "default" : "outline"}
              className="w-full sm:w-auto"
            >
              Cover Page
            </Button>

            <Button
              onClick={() => handleViewSelect("traffic", "traffic_user_overview")}
              variant={selectedDropdownItem === "traffic_user_overview" ? "default" : "outline"}
              className="w-full sm:w-auto"
            >
              Traffic & User Overview
            </Button>

            <CustomDropdown
              id="traffic_analysis_dropdown"
              trigger={
                <Button
                  variant={
                    selectedView.group === "traffic" &&
                    ["sessions_overview", "user_overview", "google_ads_keywords", "demographic_info"].includes(
                      selectedView.key,
                    )
                      ? "default"
                      : "outline"
                  }
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
                Sessions Overview & Entry Pages
              </CustomDropdownItem>
              <CustomDropdownItem
                onClick={() => handleViewSelect("traffic", "user_overview")}
                isSelected={selectedDropdownItem === "user_overview"}
              >
                User Overview & Entry Pages
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

            <CustomDropdown
              id="engagement_dropdown"
              trigger={
                <Button
                  variant={
                    selectedView.group === "traffic" &&
                    ["events_top_pages", "conversion_events"].includes(selectedView.key)
                      ? "default"
                      : "outline"
                  }
                  className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
                >
                  <span className="truncate">Engagement & Pages</span>
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
              onClick={() => handleViewSelect("traffic", "conversion_performance")}
              variant={selectedDropdownItem === "conversion_performance" ? "default" : "outline"}
              className="w-full sm:w-auto"
            >
              Conversion Performance
            </Button>

            <CustomDropdown
              id="ai_traffic_dropdown"
              trigger={
                <Button
                  variant={
                    selectedView.group === "traffic" && ["ai_vs_human", "ai_deep_dive"].includes(selectedView.key)
                      ? "default"
                      : "outline"
                  }
                  className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
                >
                  <span className="truncate">AI Traffic Analysis</span>
                  <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
                </Button>
              }
            >
              <CustomDropdownItem
                onClick={() => handleViewSelect("traffic", "ai_vs_human")}
                isSelected={selectedDropdownItem === "ai_vs_human"}
              >
                AI vs Human Traffic – Overview
              </CustomDropdownItem>
              <CustomDropdownItem
                onClick={() => handleViewSelect("traffic", "ai_deep_dive")}
                isSelected={selectedDropdownItem === "ai_deep_dive"}
              >
                AI Traffic Deep Dive
              </CustomDropdownItem>
            </CustomDropdown>

            <Button
              onClick={() => handleViewSelect("traffic", "temporary_visualization")}
              variant={selectedDropdownItem === "temporary_visualization" ? "default" : "outline"}
              className="w-full sm:w-auto"
            >
              Temporary Visualization
            </Button>

            <Button
              onClick={() => handleViewSelect("traffic", "google_analytics_dashboard")}
              variant={selectedDropdownItem === "google_analytics_dashboard" ? "default" : "outline"}
              className="w-full sm:w-auto"
            >
              Google Analytics Dashboard
            </Button>
          </div>
        )
      } else {
        return (
          <>
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
              <Button
                onClick={() => handleViewSelect("traffic", "cover_page")}
                variant={selectedDropdownItem === "cover_page" ? "default" : "outline"}
                className="w-full sm:w-auto"
              >
                Cover Page
              </Button>

              <Button
                onClick={() => handleViewSelect("traffic", "traffic_user_overview")}
                variant={selectedDropdownItem === "traffic_user_overview" ? "default" : "outline"}
                className="w-full sm:w-auto"
              >
                Traffic & User Overview
              </Button>

              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={
                      selectedView.group === "traffic" &&
                      ["sessions_overview", "user_overview", "google_ads_keywords", "demographic_info"].includes(
                        selectedView.key,
                      )
                        ? "default"
                        : "outline"
                    }
                    className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
                  >
                    <span className="truncate">Traffic Analysis</span>
                    <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 z-[9999]">
                  <DropdownMenuItem
                    onClick={() => handleViewSelect("traffic", "sessions_overview")}
                    className={`hover:bg-muted ${selectedDropdownItem === "sessions_overview" ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    Sessions Overview & Entry Pages
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleViewSelect("traffic", "user_overview")}
                    className={`hover:bg-muted ${selectedDropdownItem === "user_overview" ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    User Overview & Entry Pages
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleViewSelect("traffic", "google_ads_keywords")}
                    className={`hover:bg-muted ${selectedDropdownItem === "google_ads_keywords" ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    Google Ads Keywords
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleViewSelect("traffic", "demographic_info")}
                    className={`hover:bg-muted ${selectedDropdownItem === "demographic_info" ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    Demographic Information
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={
                      selectedView.group === "traffic" &&
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
                <DropdownMenuContent className="w-64 z-[9999]">
                  <DropdownMenuItem
                    onClick={() => handleViewSelect("traffic", "events_top_pages")}
                    className={`hover:bg-muted ${selectedDropdownItem === "events_top_pages" ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    Events & Top Pages
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleViewSelect("traffic", "conversion_events")}
                    className={`hover:bg-muted ${selectedDropdownItem === "conversion_events" ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    Conversion Events Breakdown
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                onClick={() => handleViewSelect("traffic", "conversion_performance")}
                variant={selectedDropdownItem === "conversion_performance" ? "default" : "outline"}
                className="w-full sm:w-auto"
              >
                Conversion Performance
              </Button>

              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={
                      selectedView.group === "traffic" && ["ai_vs_human", "ai_deep_dive"].includes(selectedView.key)
                        ? "default"
                        : "outline"
                    }
                    className="gap-2 w-full sm:w-auto justify-between sm:justify-center"
                  >
                    <span className="truncate">AI Traffic Analysis</span>
                    <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 z-[9999]">
                  <DropdownMenuItem
                    onClick={() => handleViewSelect("traffic", "ai_vs_human")}
                    className={`hover:bg-muted ${selectedDropdownItem === "ai_vs_human" ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    AI vs Human Traffic – Overview
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleViewSelect("traffic", "ai_deep_dive")}
                    className={`hover:bg-muted ${selectedDropdownItem === "ai_deep_dive" ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    AI Traffic Deep Dive
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                onClick={() => handleViewSelect("traffic", "temporary_visualization")}
                variant={selectedDropdownItem === "temporary_visualization" ? "default" : "outline"}
                className="w-full sm:w-auto"
              >
                Temporary Visualization
              </Button>

              <Button
                onClick={() => handleViewSelect("traffic", "google_analytics_dashboard")}
                variant={selectedDropdownItem === "google_analytics_dashboard" ? "default" : "outline"}
                className="w-full sm:w-auto"
              >
                Google Analytics Dashboard
              </Button>
            </div>
          </>
        )
      }
    }

    // ADDED NOTIFICATIONS PAGE
    if (activePage === "notifications") {
      return (
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
              <div className="text-center">
                <div className="mb-6">
                  <img src="/no-notification.png" alt="No Notifications" className="w-32 h-auto mx-auto opacity-80" />
                </div>
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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"></div>

        <Sidebar className="border-r border-sidebar-border bg-sidebar flex-shrink-0 lg:flex hidden lg:relative absolute z-40 lg:z-auto w-64 min-w-64">
          <SidebarContent className="bg-background h-full flex flex-col">
            <SidebarHeader className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
              <div className="flex items-center gap-3">
                <img src="/logo-em-cima.svg" alt="Upstart13" className="h-10 w-10 rounded-lg object-cover" />
                <div className="flex flex-col">
                  <h2 className="text-base font-semibold text-sidebar-foreground">Gladney</h2>
                  <p className="text-xs text-muted-foreground">Analytics Dashboard</p>
                </div>
              </div>
            </SidebarHeader>

            <SidebarGroup className="flex-1 overflow-y-auto px-2 py-4">
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
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

            <div className="mt-auto border-t border-sidebar-border p-4">
              {/* CHANGE: centered the footer content */}
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

        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-50 bg-background border-b border-border h-16 flex-shrink-0">
            <div className="flex h-full items-center justify-between px-4 sm:px-6">
              <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                <SidebarTrigger className="lg:hidden flex items-center justify-center p-2 hover:bg-muted rounded-lg transition-colors">
                  <Bars3Icon className="h-5 w-5" />
                </SidebarTrigger>
                <h1 className="text-lg sm:text-xl font-semibold text-foreground truncate">{getPageTitle()}</h1>
              </div>

              <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-3 p-2 rounded-lg border border-border bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                      <img
                        src={session.user?.image || "/user-profile-avatar.png"}
                        alt="Profile"
                        className="h-8 w-8 rounded-full"
                      />
                      <div className="hidden sm:block text-sm">
                        <div className="font-medium">{session.user?.name}</div>
                        <div className="text-muted-foreground text-xs">{session.user?.email}</div>
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

          <div className="flex-1 flex flex-col p-3 sm:p-6 bg-popover overflow-auto">
            {/* CHANGE: Hide upper card when on notifications, dashboard_details, or dashboard_faq pages */}
            {activePage !== "notifications" && activePage !== "dashboard_details" && activePage !== "dashboard_faq" && (
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
                      {/* CHANGE: Use ArrowsPointingOutIcon instead of Maximize2 */}
                      <ArrowsPointingOutIcon className="h-4 w-4" />
                      <span className="hidden sm:inline">Expandir</span>
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            <Card id="iframe-container" className="flex-1 overflow-hidden border border-border min-h-0 bg-background">
              {isFullscreen && (
                <div className="fixed top-0 left-0 right-0 z-[10000] bg-background/95 backdrop-blur-sm border-b border-border">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-4 p-3 sm:p-4">
                    {renderPageContent()}
                  </div>
                </div>
              )}

              {/* CHANGE: Added margin-top when fullscreen to account for fixed menu */}
              <div className={`w-full h-full ${isFullscreen ? "mt-20" : ""}`}>
                {activePage === "notifications" ? (
                  <div className="w-full h-full flex items-center justify-center p-8 bg-background">
                    <div className="text-center">
                      <div className="mb-6">
                        <img
                          src="/no-notification.png"
                          alt="No Notifications"
                          className="w-32 h-auto mx-auto opacity-80"
                        />
                      </div>
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
