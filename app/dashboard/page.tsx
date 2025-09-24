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
