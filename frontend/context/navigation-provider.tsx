"use client"

import type React from "react"

import { createContext, useContext, type ReactNode } from "react"
import { useNavigation } from "@/hooks/use-navigation"
import type { NavSection } from "@/toolbar/navigation"
import type { LucideIcon } from "lucide-react"

interface NavigationContextType {
  navigation: NavSection[]
  expandedItems: Record<string, boolean>
  toggleExpand: (href: string, e?: React.MouseEvent) => void
  addRoute: (route: string, title: string, parentRoute?: string, icon?: LucideIcon) => void
  currentPath: string
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const navigationState = useNavigation()

  return <NavigationContext.Provider value={navigationState}>{children}</NavigationContext.Provider>
}

export function useNavigationContext() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error("useNavigationContext must be used within a NavigationProvider")
  }
  return context
}
