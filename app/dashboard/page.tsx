"use client"

import { HorizontalMenuExpectant, HorizontalMenuGladney, HorizontalMenuTraffic } from "@/components/menus"

export default function Page({
  activePage,
  selectedView,
  selectedDropdownItem,
  handleViewSelect,
  isFullscreen,
}: {
  activePage: string
  selectedView: { group: string; key: string }
  selectedDropdownItem: string
  handleViewSelect: (group: string, key: string) => void
  isFullscreen: boolean
}) {
  const renderPageContent = () => {
    if (activePage === "expectant_mother") {
      return (
        <HorizontalMenuExpectant
          selectedView={selectedView}
          selectedDropdownItem={selectedDropdownItem}
          handleViewSelect={handleViewSelect}
          isFullscreen={isFullscreen}
        />
      )
    }

    if (activePage === "gladney_business") {
      return (
        <HorizontalMenuGladney
          selectedView={selectedView}
          selectedDropdownItem={selectedDropdownItem}
          handleViewSelect={handleViewSelect}
        />
      )
    }

    if (activePage === "page_traffic") {
      return (
        <HorizontalMenuTraffic
          selectedView={selectedView}
          selectedDropdownItem={selectedDropdownItem}
          handleViewSelect={handleViewSelect}
        />
      )
    }

    return null
  }

  return <>{renderPageContent()}</>
}
