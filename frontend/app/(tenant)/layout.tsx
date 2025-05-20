"use client"

import type React from "react"
import { useTranslation } from "react-i18next"
import { TenantHeader } from "./components/header"
import { LanguageProvider } from "@/context/language-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { NavigationProvider } from "@/context/navigation-provider"
import { SidebarContainer } from "./components/sidebar-container"
import { Toaster } from "@/components/ui/toaster"

// Import the EnvironmentCheck component with the correct name
import { EnvironmentCheck } from "./components/env-check"

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { t } = useTranslation()

  return (
    <LanguageProvider>
      <SidebarProvider>
        <NavigationProvider>
          <div className="flex h-screen w-full overflow-hidden">
            <SidebarContainer />
            <div className="flex flex-1 flex-col w-full">
              <TenantHeader />
              <main className="flex-1 w-full overflow-auto p-6">
                <EnvironmentCheck />
                <div className="mx-auto w-full max-w-[1920px]">{children}</div>
              </main>
            </div>
          </div>
          <Toaster />
        </NavigationProvider>
      </SidebarProvider>
    </LanguageProvider>
  )
}
