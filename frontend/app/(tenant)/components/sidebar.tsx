"use client"

import type * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useTranslation } from "react-i18next"
import {
  ChevronDown,
  ChevronRight,
  Gavel,
  LayoutDashboard,
  Building,
  Users,
  Bell,
  CreditCard,
  Inbox,
  MessageSquare,
  UserPlus,
  HardDrive,
  FileText,
  Settings,
  HelpCircle,
  LifeBuoy,
  LayoutGrid,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { useNavigation } from "@/hooks/use-navigation"
import { isRouteActive } from "@/toolbar/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SetupSidebar } from "./setup-sidebar"

export default function TenantSidebar() {
  const { t } = useTranslation()
  const { navigation, expandedItems, toggleExpand, currentPath } =
    useNavigation()
  const router = useRouter()
  const pathname = usePathname()
  const { state } = useSidebar()
  const [showSetupSidebar, setShowSetupSidebar] = useState(false)

  // Check if current path is a setup path
  useEffect(() => {
    const isSetupPath =
      pathname?.includes("/settings/") || pathname?.includes("/setup/")
    setShowSetupSidebar(isSetupPath || false)
  }, [pathname])

  // Handle click on parent item with children
  const handleParentItemClick = (e: React.MouseEvent, href: string) => {
    // Don't prevent default - allow navigation to occur
    // Just toggle the expanded state
    toggleExpand(href)

    // Navigate to the href
    router.push(href)
  }

  // Handle setup click
  const handleSetupClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowSetupSidebar(true)
  }

  // If showing setup sidebar, render that instead
  if (showSetupSidebar) {
    return (
      <SetupSidebar
        onBack={() => setShowSetupSidebar(false)}
        currentPath={currentPath}
      />
    )
  }

  const isCollapsed = state === "collapsed"

  // Helper function to get children for a navigation item
  const getChildrenForItem = (parentHref: string) => {
    const section = navigation.find((section) =>
      section.items.some((item) => item.href === parentHref)
    )

    if (!section) return []

    const parentItem = section.items.find((item) => item.href === parentHref)
    return parentItem?.children || []
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex h-14 items-center px-2">
          <div className="flex items-center pl-1">
            <Avatar className="h-8 w-8 bg-primary ml-0">
              <AvatarImage
                src="/abstract-geometric-shapes.png"
                alt={t("organization")}
              />
              <AvatarFallback className="bg-primary text-primary-foreground">
                AS
              </AvatarFallback>
            </Avatar>
            <div className="ml-3 flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="text-sm font-semibold">
                {t("organizationName")}
              </span>
              <span className="text-xs text-muted-foreground">
                {t("organizationTagline")}
              </span>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        {/* Main Navigation */}
        <div className="px-4 mb-2">
          <h4 className="text-xs font-semibold text-muted-foreground">
            {t("sidebar.sections.home")}
          </h4>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isRouteActive(currentPath, "/dashboard")}
              tooltip={t("sidebar.dashboard")}
            >
              <Link href="/dashboard">
                <LayoutDashboard className="h-5 w-5" />
                <span>{t("sidebar.dashboard")}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isRouteActive(currentPath, "/auctions")}
              tooltip={t("sidebar.auctions")}
            >
              <Link
                href="/auctions"
                onClick={(e) => handleParentItemClick(e, "/auctions")}
              >
                <Gavel className="h-5 w-5" />
                <span>{t("sidebar.auctions")}</span>
                {expandedItems["/auctions"] ? (
                  <ChevronDown className="ml-auto h-4 w-4" />
                ) : (
                  <ChevronRight className="ml-auto h-4 w-4" />
                )}
              </Link>
            </SidebarMenuButton>

            {expandedItems["/auctions"] && (
              <SidebarMenuSub>
                {getChildrenForItem("/auctions").map((child) => (
                  <SidebarMenuSubItem key={child.href}>
                    <SidebarMenuSubButton
                      asChild
                      isActive={isRouteActive(currentPath, child.href)}
                    >
                      <Link href={child.href}>
                        {child.icon && <child.icon className="mr-2 h-4 w-4" />}
                        {t(`sidebar.${child.title}`)}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isRouteActive(currentPath, "/properties")}
              tooltip={t("sidebar.properties")}
            >
              <Link
                href="/properties"
                onClick={(e) => handleParentItemClick(e, "/properties")}
              >
                <Building className="h-5 w-5" />
                <span>{t("sidebar.properties")}</span>
                {expandedItems["/properties"] ? (
                  <ChevronDown className="ml-auto h-4 w-4" />
                ) : (
                  <ChevronRight className="ml-auto h-4 w-4" />
                )}
              </Link>
            </SidebarMenuButton>

            {expandedItems["/properties"] && (
              <SidebarMenuSub>
                {getChildrenForItem("/properties").map((child) => (
                  <SidebarMenuSubItem key={child.href}>
                    <SidebarMenuSubButton
                      asChild
                      isActive={isRouteActive(currentPath, child.href)}
                    >
                      <Link href={child.href}>
                        {child.icon && <child.icon className="mr-2 h-4 w-4" />}
                        {t(`sidebar.${child.title}`)}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isRouteActive(currentPath, "/property-blocks")}
              tooltip={t("sidebar.propertyBlocks")}
            >
              <Link
                href="/property-blocks"
                onClick={(e) => handleParentItemClick(e, "/property-blocks")}
              >
                <LayoutGrid className="h-5 w-5" />
                <span>{t("sidebar.propertyBlocks")}</span>
                {expandedItems["/property-blocks"] ? (
                  <ChevronDown className="ml-auto h-4 w-4" />
                ) : (
                  <ChevronRight className="ml-auto h-4 w-4" />
                )}
              </Link>
            </SidebarMenuButton>

            {expandedItems["/property-blocks"] && (
              <SidebarMenuSub>
                {getChildrenForItem("/property-blocks").map((child) => (
                  <SidebarMenuSubItem key={child.href}>
                    <SidebarMenuSubButton
                      asChild
                      isActive={isRouteActive(currentPath, child.href)}
                    >
                      <Link href={child.href}>
                        {child.icon && <child.icon className="mr-2 h-4 w-4" />}
                        {t(`sidebar.${child.title}`)}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Brokers Section */}
        <div className="mt-6 px-4">
          <h4 className="mb-2 text-xs font-semibold text-muted-foreground">
            {t("sidebar.sections.brokers")}
          </h4>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isRouteActive(currentPath, "/customers")}
              tooltip={t("sidebar.customers")}
            >
              <Link
                href="/customers"
                onClick={(e) => handleParentItemClick(e, "/customers")}
              >
                <Users className="h-5 w-5" />
                <span>{t("sidebar.customers")}</span>
                <ChevronRight className="ml-auto h-4 w-4" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isRouteActive(currentPath, "/notifications")}
              tooltip={t("sidebar.notifications")}
            >
              <Link
                href="/notifications"
                onClick={(e) => handleParentItemClick(e, "/notifications")}
              >
                <Bell className="h-5 w-5" />
                <span>{t("sidebar.notifications")}</span>
                <ChevronRight className="ml-auto h-4 w-4" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isRouteActive(currentPath, "/payments")}
              tooltip={t("sidebar.payments")}
            >
              <Link
                href="/payments"
                onClick={(e) => handleParentItemClick(e, "/payments")}
              >
                <CreditCard className="h-5 w-5" />
                <span>{t("sidebar.payments")}</span>
                <ChevronRight className="ml-auto h-4 w-4" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* My Organization Section */}
        <div className="mt-6 px-4">
          <h4 className="mb-2 text-xs font-semibold text-muted-foreground">
            {t("sidebar.sections.myOrganization")}
          </h4>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isRouteActive(currentPath, "/inbox")}
              tooltip={t("sidebar.inbox")}
            >
              <Link href="/inbox">
                <Inbox className="h-5 w-5" />
                <span>{t("sidebar.inbox")}</span>
                <Badge className="ml-auto bg-primary text-primary-foreground text-xs py-0 h-5 min-w-5">
                  438
                </Badge>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isRouteActive(currentPath, "/chat")}
              tooltip={t("sidebar.chat")}
            >
              <Link
                href="/chat"
                onClick={(e) => handleParentItemClick(e, "/chat")}
              >
                <MessageSquare className="h-5 w-5" />
                <span>{t("sidebar.chat")}</span>
                <ChevronRight className="ml-auto h-4 w-4" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isRouteActive(currentPath, "/team")}
              tooltip={t("sidebar.team")}
            >
              <Link
                href="/team"
                onClick={(e) => handleParentItemClick(e, "/team")}
              >
                <UserPlus className="h-5 w-5" />
                <span>{t("sidebar.team")}</span>
                <ChevronRight className="ml-auto h-4 w-4" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isRouteActive(currentPath, "/storage")}
              tooltip={t("sidebar.storage")}
            >
              <Link
                href="/storage"
                onClick={(e) => handleParentItemClick(e, "/storage")}
              >
                <HardDrive className="h-5 w-5" />
                <span>{t("sidebar.storage")}</span>
                <ChevronRight className="ml-auto h-4 w-4" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isRouteActive(currentPath, "/reports")}
              tooltip={t("sidebar.reports")}
            >
              <Link
                href="/reports"
                onClick={(e) => handleParentItemClick(e, "/reports")}
              >
                <FileText className="h-5 w-5" />
                <span>{t("sidebar.reports")}</span>
                <ChevronRight className="ml-auto h-4 w-4" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Bottom Links */}
        <div className="mt-6 px-4">
          <h4 className="mb-2 text-xs font-semibold text-muted-foreground">
            {t("sidebar.sections.system")}
          </h4>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={t("sidebar.setup")}
              onClick={handleSetupClick}
            >
              <Settings className="h-5 w-5" />
              <span>{t("sidebar.setup")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isRouteActive(currentPath, "/help")}
              tooltip={t("sidebar.getHelp")}
            >
              <Link href="/help">
                <HelpCircle className="h-5 w-5" />
                <span>{t("sidebar.getHelp")}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isRouteActive(currentPath, "/support")}
              tooltip={t("sidebar.support")}
            >
              <Link href="/support">
                <LifeBuoy className="h-5 w-5" />
                <span>{t("sidebar.support")}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary ml-2">
              <span className="text-xs font-medium text-primary-foreground">
                VS
              </span>
            </div>
            <div className="flex flex-col ml-1 group-data-[collapsible=icon]:hidden">
              <span className="text-xs text-muted-foreground">
                {t("sidebar.poweredBy")}
              </span>
              <span className="text-xs font-medium">
                {t("sidebar.companyName")}
              </span>
            </div>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
