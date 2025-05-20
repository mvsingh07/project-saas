"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"
import { getNavigation, isRouteActive, addRouteToNavigation, type NavSection } from "@/toolbar/navigation"

export function useNavigation() {
  const pathname = usePathname()
  const [navigation, setNavigation] = useState<NavSection[]>(getNavigation())
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  // Initialize expanded state based on active route
  useEffect(() => {
    const newExpandedState: Record<string, boolean> = {}

    // Auto-expand sections that contain the active route
    navigation.forEach((section) => {
      section.items.forEach((item) => {
        if (item.children) {
          const hasActiveChild = item.children.some((child) => isRouteActive(pathname, child.href))
          if (hasActiveChild || isRouteActive(pathname, item.href)) {
            newExpandedState[item.href] = true
          }
        }
      })
    })

    setExpandedItems((prev) => ({
      ...prev,
      ...newExpandedState,
    }))
  }, [pathname, navigation])

  // Toggle expanded state for an item
  const toggleExpand = useCallback((href: string, e?: React.MouseEvent) => {
    // If event is provided, don't prevent default anymore
    // This allows navigation to occur

    setExpandedItems((prev) => ({
      ...prev,
      [href]: !prev[href],
    }))
  }, [])

  // Add a new route to the navigation
  const addRoute = useCallback((route: string, title: string, parentRoute?: string, icon?: React.ElementType) => {
    const updatedNavigation = addRouteToNavigation(route, title, parentRoute, icon)
    setNavigation(updatedNavigation)
  }, [])

  return {
    navigation,
    expandedItems,
    toggleExpand,
    addRoute,
    currentPath: pathname,
  }
}
