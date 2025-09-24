"use client"

import { ChevronRightIcon } from "@heroicons/react/24/outline"
import React from "react"

export const CustomDropdown = ({
  id,
  trigger,
  children,
  isOpen,
  toggleDropdown,
}: {
  id: string
  trigger: React.ReactNode
  children: React.ReactNode
  isOpen: boolean
  toggleDropdown: (id: string) => void
}) => {
  return (
    <div className="relative">
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

export const CustomDropdownItem = ({
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

export const CustomSubmenu = ({
  trigger,
  children,
  parentId,
  isOpen,
  toggleDropdown,
}: {
  trigger: React.ReactNode
  children: React.ReactNode
  parentId: string
  isOpen: boolean
  toggleDropdown: (id: string) => void
}) => {
  const submenuId = `${parentId}_submenu`

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
