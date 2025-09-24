"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
  SidebarHeader,
} from "@/components/ui/sidebar"
import {
  ChartBarIcon,
  InformationCircleIcon,
  BellIcon,
  Bars3Icon,
  ArrowsPointingOutIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useRouter } from "next/navigation"

export default function GladneyDashboard() {
  const [selectedView, setSelectedView] = useState({ group: "expectant", key: "overview_ads" })
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activePage, setActivePage] = useState("expectant_mother")
  const [selectedDropdownItem, setSelectedDropdownItem] = useState("overview_ads")
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({})

  const LOOKERS = {
    expectant: {
      overview_ads: "https://lookerstudio.google.com/embed/reporting/018fe7d3/page/p_03hj6qcmvd",
      overview_ga4: "https://lookerstudio.google.com/embed/reporting/018fe7d3/page/p_8k5zdcvuvd",
      recent: "https://lookerstudio.google.com/embed/reporting/018fe7d3/page/p_rbf34iv8ud",
      google_ads: "https://lookerstudio.google.com/embed/reporting/018fe7d3/page/p_8eecz0rovd",
      campaign_break: "https://lookerstudio.google.com/embed/reporting/018fe7d3/page/p_tadcyerovd",
      campaign_costs: "https://lookerstudio.google.com/embed/reporting/018fe7d3/page/p_ep8hx4qovd",
      contact_cost: "https://lookerstudio.google.com/embed/reporting/018fe7d3/page/p_jvidqwqovd",
      day_of_week: "https://lookerstudio.google.com/embed/reporting/018fe7d3/page/p_1cwm5jqovd",
      campaign_ratios: "https://lookerstudio.google.com/embed/reporting/018fe7d3/page/p_zx6sodqovd",
      contact_break: "https://lookerstudio.google.com/embed/reporting/018fe7d3/page/p_1r1tjgpovd",
      spam_break: "https://lookerstudio.google.com/embed/reporting/018fe7d3/page/p_an0bb3povd",
    },
    marketing: {
      performance_time: "https://lookerstudio.google.com/embed/reporting/018fe7d3/page/p_hxd854tovd",
      cost_per: "https://lookerstudio.google.com/embed/reporting/018fe7d3/page/p_3i0yaalovd",
      table_download: "https://lookerstudio.google.com/embed/reporting/018fe7d3/page/p_4wsin3lovd",
      enroll_placements: "https://lookerstudio.google.com/embed/reporting/018fe7d3/page/p_p95uwh89vd",
      enroll_admission: "https://lookerstudio.google.com/embed/reporting/018fe7d3/page/p_72wuuqv6vd",
      enroll_creation: "https://lookerstudio.google.com/embed/reporting/018fe7d3/page/p_o9fkb2oavd",
      enroll_timeseries: "https://lookerstudio.google.com/embed/reporting/018fe7d3/page/p_094a1q3nvd",
    },
  }

  const router = useRouter()

  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [id]: !prev[id] }))
  }
  const closeAllDropdowns = () => setOpenDropdowns({})

  const handleViewSelect = (group: string, key: string) => {
    setSelectedView({ group, key })
    setSelectedDropdownItem(key)
    closeAllDropdowns()
    const url = new URL(window.location.href)
    url.searchParams.set("group", group)
    url.searchParams.set("view", key)
    window.history.replaceState({}, "", url.toString())
  }

  const toggleFullscreen = () => {
    const el = document.getElementById("iframe-container")
    if (!document.fullscreenElement && el) {
      el.requestFullscreen()
      setIsFullscreen(true)
    } else if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const url = new URL(window.location.href)
    const group = url.searchParams.get("group") || "expectant"
    const view = url.searchParams.get("view") || "overview_ads"
    setSelectedView({ group, key: view })
    setSelectedDropdownItem(view)
  }, [])

  useEffect(() => {
    const listener = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", listener)
    return () => document.removeEventListener("fullscreenchange", listener)
  }, [])

  const CustomDropdown = ({
    id,
    trigger,
    children,
  }: { id: string; trigger: React.ReactNode; children: React.ReactNode }) => {
    const isOpen = openDropdowns[id] || false
    return (
      <div className="relative">
        <div onClick={() => toggleDropdown(id)}>{trigger}</div>
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg z-[10001] min-w-64">
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
  }: { onClick: () => void; children: React.ReactNode; isSelected?: boolean }) => (
    <div
      onClick={onClick}
      className={`px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 ${
        isSelected ? "bg-blue-500 text-white" : ""
      }`}
    >
      {children}
    </div>
  )

  const CustomSubmenu = ({
    parentId,
    trigger,
    children,
  }: { parentId: string; trigger: React.ReactNode; children: React.ReactNode }) => {
    const submenuId = `${parentId}_submenu`
    const isOpen = openDropdowns[submenuId] || false
    return (
      <div className="relative">
        <div
          onClick={() => toggleDropdown(submenuId)}
          className="px-4 py-2 flex items-center justify-between text-sm cursor-pointer hover:bg-gray-100"
        >
          {trigger}
          <ChevronRightIcon className="h-4 w-4" />
        </div>
        {isOpen && (
          <div className="absolute left-full top-0 ml-1 bg-white border rounded-lg shadow-lg z-[10002] min-w-64">
            {children}
          </div>
        )}
      </div>
    )
  }

  const currentUrl =
    LOOKERS[selectedView.group as keyof typeof LOOKERS]?.[
      selectedView.key as keyof typeof LOOKERS["expectant"]
    ] || "about:blank"

  const renderPageContent = () => {
    if (activePage === "expectant_mother") {
      return (
        <div className="flex flex-col sm:flex-row gap-3">
          <CustomDropdown
            id="expectant_dropdown"
            trigger={
              <Button
                variant={selectedView.group === "expectant" ? "default" : "outline"}
                className="gap-2 w-full sm:w-auto"
              >
                <span>Expectant Mother</span>
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            }
          >
            <CustomDropdownItem onClick={() => handleViewSelect("expectant", "overview_ads")} isSelected={selectedDropdownItem === "overview_ads"}>Overview - ads & hubspot</CustomDropdownItem>
            <CustomDropdownItem onClick={() => handleViewSelect("expectant", "overview_ga4")} isSelected={selectedDropdownItem === "overview_ga4"}>Overview - GA4</CustomDropdownItem>
            <CustomDropdownItem onClick={() => handleViewSelect("expectant", "recent")} isSelected={selectedDropdownItem === "recent"}>Recent Perspective</CustomDropdownItem>
            <CustomDropdownItem onClick={() => handleViewSelect("expectant", "google_ads")} isSelected={selectedDropdownItem === "google_ads"}>Google Ads Performance</CustomDropdownItem>
            <CustomDropdownItem onClick={() => handleViewSelect("expectant", "campaign_break")} isSelected={selectedDropdownItem === "campaign_break"}>Campaign Breakdown</CustomDropdownItem>
            <CustomDropdownItem onClick={() => handleViewSelect("expectant", "campaign_costs")} isSelected={selectedDropdownItem === "campaign_costs"}>Campaign Costs</CustomDropdownItem>
            <CustomDropdownItem onClick={() => handleViewSelect("expectant", "contact_cost")} isSelected={selectedDropdownItem === "contact_cost"}>Contact x Cost</CustomDropdownItem>
            <CustomDropdownItem onClick={() => handleViewSelect("expectant", "day_of_week")} isSelected={selectedDropdownItem === "day_of_week"}>Day of the Week</CustomDropdownItem>
            <CustomDropdownItem onClick={() => handleViewSelect("expectant", "campaign_ratios")} isSelected={selectedDropdownItem === "campaign_ratios"}>Campaign Ratios</CustomDropdownItem>
            <CustomDropdownItem onClick={() => handleViewSelect("expectant", "contact_break")} isSelected={selectedDropdownItem === "contact_break"}>Contact Breakdown</CustomDropdownItem>
            <CustomDropdownItem onClick={() => handleViewSelect("expectant", "spam_break")} isSelected={selectedDropdownItem === "spam_break"}>Spam Breakdown</CustomDropdownItem>
          </CustomDropdown>

          <CustomDropdown
            id="marketing_dropdown"
            trigger={
              <Button
                variant={selectedView.group === "marketing" ? "default" : "outline"}
                className="gap-2 w-full sm:w-auto"
              >
                <span>Marketing Performance</span>
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            }
          >
            <CustomDropdownItem onClick={() => handleViewSelect("marketing", "performance_time")} isSelected={selectedDropdownItem === "performance_time"}>Performance over time</CustomDropdownItem>
            <CustomDropdownItem onClick={() => handleViewSelect("marketing", "cost_per")} isSelected={selectedDropdownItem === "cost_per"}>Cost per…</CustomDropdownItem>
            <CustomDropdownItem onClick={() => handleViewSelect("marketing", "table_download")} isSelected={selectedDropdownItem === "table_download"}>Table for download</CustomDropdownItem>

            <CustomSubmenu parentId="marketing_dropdown" trigger="Enrollment Rate">
              <CustomDropdownItem onClick={() => handleViewSelect("marketing", "enroll_placements")} isSelected={selectedDropdownItem === "enroll_placements"}>Placements in Sugar</CustomDropdownItem>
              <CustomDropdownItem onClick={() => handleViewSelect("marketing", "enroll_admission")} isSelected={selectedDropdownItem === "enroll_admission"}>Admission in Sugar</CustomDropdownItem>
              <CustomDropdownItem onClick={() => handleViewSelect("marketing", "enroll_creation")} isSelected={selectedDropdownItem === "enroll_creation"}>Creation in Hubspot</CustomDropdownItem>
              <CustomDropdownItem onClick={() => handleViewSelect("marketing", "enroll_timeseries")} isSelected={selectedDropdownItem === "enroll_timeseries"}>Time Series</CustomDropdownItem>
            </CustomSubmenu>
          </CustomDropdown>
        </div>
      )
    }
    return <p className="text-center text-muted-foreground">Selecione uma opção</p>
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        <header className="h-16 border-b flex items-center justify-between px-4 bg-white">
          <h1 className="text-lg font-semibold">Gladney Dashboard</h1>
          <Button onClick={toggleFullscreen} variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowsPointingOutIcon className="h-4 w-4" />
            Expandir
          </Button>
        </header>
        <div className="flex-1 flex flex-col p-4 bg-gray-50">
          <Card className="p-4 mb-4">{renderPageContent()}</Card>
          <Card id="iframe-container" className="flex-1 overflow-hidden">
            <iframe
              src={currentUrl}
              title="Gladney Dashboard"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Card>
        </div>
      </div>
    </SidebarProvider>
  )
}
