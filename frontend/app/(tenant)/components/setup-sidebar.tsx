"use client"
import { useState } from "react"
import { SidebarRail } from "@/components/ui/sidebar"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import {
  ArrowLeft,
  Building2,
  Receipt,
  Globe,
  Users,
  MapPin,
  HardDrive,
  Bell,
  CreditCard,
  Puzzle,
  FileText,
  UserCircle,
  Shield,
  ImageIcon,
  BarChart3,
  Monitor,
  Settings,
  Palette,
  ChevronRight,
  ChevronDown,
  User,
  Sliders,
  CreditCardIcon,
  SettingsIcon,
  Briefcase,
  Building,
  PlusCircle,
  Server,
  BellRing,
  DollarSign,
  Plug,
  FileTextIcon,
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
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { isRouteActive } from "@/toolbar/navigation"

interface SetupSidebarProps {
  onBack: () => void
  currentPath: string
}

export function SetupSidebar({ onBack, currentPath }: SetupSidebarProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const { state } = useSidebar()
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    organization: true, // Keep organization expanded by default
  })

  const toggleExpand = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Helper to render dropdown items
  const renderDropdownItems = (
    key: string,
    Icon: React.ElementType,
    titleKey: string,
    items: { href: string; titleKey: string; icon: React.ElementType }[]
  ) => {
    const isExpanded = expandedItems[key] || false
    const isActive = items.some((item) => isRouteActive(currentPath, item.href))

    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => toggleExpand(key)}
          isActive={isActive}
          className={isActive ? "bg-primary/10 text-primary font-medium" : ""}
          tooltip={
            state === "collapsed" ? t(`setupSidebar.${titleKey}`) : undefined
          }
        >
          <Icon className="h-5 w-5" />
          <span>{t(`setupSidebar.${titleKey}`)}</span>
          {isExpanded ? (
            <ChevronDown className="ml-auto h-4 w-4" />
          ) : (
            <ChevronRight className="ml-auto h-4 w-4" />
          )}
        </SidebarMenuButton>

        {isExpanded && (
          <SidebarMenuSub>
            {items.map((item) => {
              const itemActive = isRouteActive(currentPath, item.href)
              return (
                <SidebarMenuSubItem key={item.href}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={itemActive}
                    className={
                      itemActive ? "bg-primary/10 text-primary font-medium" : ""
                    }
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{t(`setupSidebar.${item.titleKey}`)}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              )
            })}
          </SidebarMenuSub>
        )}
      </SidebarMenuItem>
    )
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex h-14 items-center px-4">
          <div className="flex items-center w-full">
            <Avatar className="h-8 w-8 bg-primary">
              <AvatarImage
                src="/abstract-geometric-shapes.png"
                alt={t("setupSidebar.setup")}
              />
              <AvatarFallback className="bg-primary text-primary-foreground">
                ST
              </AvatarFallback>
            </Avatar>
            <div className="ml-3 flex flex-1 items-center justify-between group-data-[collapsible=icon]:hidden">
              <div>
                <span className="text-sm font-semibold">
                  {t("organizationName")}
                </span>
                <span className="text-xs text-muted-foreground block">
                  {t("setupSidebar.setup")}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="h-8 w-8 rounded-full bg-primary/10 hover:bg-primary/20 transition-all transform hover:scale-105"
                aria-label={t("setupSidebar.backToMainMenu")}
              >
                <ArrowLeft className="h-4 w-4 text-primary" />
              </Button>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <div className="px-4">
          <h4 className="mb-2 text-xs font-semibold text-muted-foreground">
            {t("setupSidebar.setup")}
          </h4>
        </div>
        <SidebarMenu>
          {/* Organization with dropdown */}
          {renderDropdownItems("organization", Building2, "organization", [
            {
              href: "/settings/organization/profile",
              titleKey: "profile",
              icon: User,
            },
            {
              href: "/settings/organization/personalization",
              titleKey: "personalization",
              icon: Sliders,
            },
          ])}

          {/* Taxes & Corrections */}
          {renderDropdownItems("taxes", Receipt, "taxesAndCorrections", [
            {
              href: "/settings/taxes/gst",
              titleKey: "gstSettings",
              icon: Receipt,
            },
            {
              href: "/settings/taxes/tax-rates",
              titleKey: "taxRates",
              icon: DollarSign,
            },
          ])}

          {/* Domains */}
          {renderDropdownItems("domains", Globe, "domains", [
            {
              href: "/settings/domains/manage",
              titleKey: "manageDomains",
              icon: Globe,
            },
            {
              href: "/settings/domains/add",
              titleKey: "addDomain",
              icon: PlusCircle,
            },
          ])}

          {/* Team */}
          {renderDropdownItems("team", Users, "team", [
            {
              href: "/settings/team/members",
              titleKey: "teamMembers",
              icon: Users,
            },
            {
              href: "/settings/team/roles",
              titleKey: "rolesAndPermissions",
              icon: Shield,
            },
          ])}

          {/* Territory Management */}
          {renderDropdownItems("territory", MapPin, "territoryManagement", [
            {
              href: "/settings/territory/regions",
              titleKey: "regions",
              icon: MapPin,
            },
            {
              href: "/settings/territory/assignments",
              titleKey: "assignments",
              icon: Briefcase,
            },
          ])}

          {/* Storage */}
          {renderDropdownItems("storage", HardDrive, "storage", [
            {
              href: "/settings/storage/files",
              titleKey: "files",
              icon: FileTextIcon,
            },
            {
              href: "/settings/storage/settings",
              titleKey: "storageSettings",
              icon: SettingsIcon,
            },
          ])}

          {/* Notifications */}
          {renderDropdownItems("notifications", Bell, "notifications", [
            {
              href: "/settings/notifications/email",
              titleKey: "emailNotifications",
              icon: Bell,
            },
            {
              href: "/settings/notifications/app",
              titleKey: "appNotifications",
              icon: BellRing,
            },
          ])}

          {/* Payments */}
          {renderDropdownItems("payments", CreditCard, "payments", [
            {
              href: "/settings/payments/methods",
              titleKey: "paymentMethods",
              icon: CreditCardIcon,
            },
            {
              href: "/settings/payments/gateways",
              titleKey: "paymentGateways",
              icon: Building,
            },
          ])}

          {/* Integrations */}
          {renderDropdownItems("integrations", Puzzle, "integrations", [
            {
              href: "/settings/integrations/available",
              titleKey: "availableIntegrations",
              icon: Plug,
            },
            {
              href: "/settings/integrations/connected",
              titleKey: "connectedServices",
              icon: Server,
            },
          ])}

          {/* Templates */}
          {renderDropdownItems("templates", FileText, "templates", [
            {
              href: "/settings/templates/email",
              titleKey: "emailTemplates",
              icon: FileTextIcon,
            },
            {
              href: "/settings/templates/documents",
              titleKey: "documentTemplates",
              icon: FileTextIcon,
            },
          ])}
        </SidebarMenu>

        {/* Reports Section */}
        <div className="mt-6 px-4">
          <h4 className="mb-2 text-xs font-semibold text-muted-foreground">
            {t("setupSidebar.sections.reports")}
          </h4>
        </div>
        <SidebarMenu>
          {/* Agent Logo */}
          {renderDropdownItems("agent-logo", UserCircle, "agentLogo", [
            {
              href: "/settings/agent-logo/upload",
              titleKey: "uploadLogo",
              icon: ImageIcon,
            },
            {
              href: "/settings/agent-logo/settings",
              titleKey: "logoSettings",
              icon: SettingsIcon,
            },
          ])}

          {/* Admin Logo */}
          {renderDropdownItems("admin-logo", Shield, "adminLogo", [
            {
              href: "/settings/admin-logo/upload",
              titleKey: "uploadLogo",
              icon: ImageIcon,
            },
            {
              href: "/settings/admin-logo/settings",
              titleKey: "logoSettings",
              icon: SettingsIcon,
            },
          ])}

          {/* Web Logo */}
          {renderDropdownItems("web-logo", ImageIcon, "webLogo", [
            {
              href: "/settings/web-logo/upload",
              titleKey: "uploadLogo",
              icon: ImageIcon,
            },
            {
              href: "/settings/web-logo/settings",
              titleKey: "logoSettings",
              icon: SettingsIcon,
            },
          ])}

          {/* Payment Reports */}
          {renderDropdownItems("payment-reports", BarChart3, "paymentReports", [
            {
              href: "/settings/payment-reports/transactions",
              titleKey: "transactions",
              icon: CreditCardIcon,
            },
            {
              href: "/settings/payment-reports/summary",
              titleKey: "summaryReports",
              icon: BarChart3,
            },
          ])}
        </SidebarMenu>

        {/* Websites Section */}
        <div className="mt-6 px-4">
          <h4 className="mb-2 text-xs font-semibold text-muted-foreground">
            {t("setupSidebar.sections.websites")}
          </h4>
        </div>
        <SidebarMenu>
          {/* Website Preview */}
          {renderDropdownItems("website-preview", Monitor, "websitePreview", [
            {
              href: "/settings/website-preview/desktop",
              titleKey: "desktopView",
              icon: Monitor,
            },
            {
              href: "/settings/website-preview/mobile",
              titleKey: "mobileView",
              icon: ImageIcon,
            },
          ])}

          {/* Website Configuration */}
          {renderDropdownItems(
            "website-configuration",
            Settings,
            "websiteConfiguration",
            [
              {
                href: "/settings/website-configuration/general",
                titleKey: "generalSettings",
                icon: SettingsIcon,
              },
              {
                href: "/settings/website-configuration/seo",
                titleKey: "seoSettings",
                icon: Globe,
              },
            ]
          )}

          {/* Website Templates */}
          {renderDropdownItems(
            "website-templates",
            Palette,
            "websiteTemplates",
            [
              {
                href: "/settings/website-templates/browse",
                titleKey: "browseTemplates",
                icon: Palette,
              },
              {
                href: "/settings/website-templates/custom",
                titleKey: "customTemplates",
                icon: FileTextIcon,
              },
            ]
          )}
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
