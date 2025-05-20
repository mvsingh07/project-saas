"use client"

import { useState, useEffect, memo } from "react"
import { useTranslation } from "react-i18next"
import { Search, Bell, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/language-selector"
import { useTheme } from "next-themes"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ProfileDropdown } from "@/components/profile-dropdown"

export const TenantHeader = memo(function TenantHeader() {
  const { t, i18n } = useTranslation()
  const [currentDate, setCurrentDate] = useState("")
  const [currentTime, setCurrentTime] = useState("")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
      setCurrentDate(now.toLocaleDateString(i18n.language, options))

      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }
      setCurrentTime(now.toLocaleTimeString(i18n.language, timeOptions))
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 60000)
    return () => clearInterval(interval)
  }, [i18n.language])

  // ✅ Prevent hydration mismatch by not rendering until client is ready
  if (!mounted) return null

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-8 w-8" />
        <div className="text-sm">{currentDate}</div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label={t("header.search")}
        >
          <Search className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label={t("header.notifications")}
        >
          <Bell className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={toggleTheme}
          aria-label={
            theme === "dark" ? t("header.lightMode") : t("header.darkMode")
          }
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>

        <LanguageSelector variant="full" />

        <div className="flex items-center gap-1">
          <span className="text-sm">{t("header.location") || "Kolkata"}</span>
          <span className="text-sm">{currentTime}</span>
        </div>

        <ProfileDropdown />
      </div>
    </header>
  )
})
