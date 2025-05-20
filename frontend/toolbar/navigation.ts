import type React from "react"
import {
  Home,
  Gavel,
  Users,
  Settings,
  FileText,
  Building,
  FolderPlus,
  Search,
  FileArchive,
  UserCog,
  CreditCard,
  Gauge,
  LayoutGrid,
  LayoutDashboard,
  Bell,
  Inbox,
  MessageSquare,
  UserPlus,
  HardDrive,
  HelpCircle,
  LifeBuoy,
} from "lucide-react"

// This type represents a navigation item
export interface NavItem {
  title: string // This is a translation key
  href: string
  icon?: React.ElementType
  isExternal?: boolean
  children?: NavItem[]
}

// This type represents a navigation section
export interface NavSection {
  title?: string // This is a translation key
  items: NavItem[]
}

// This function simulates scanning the file system for routes
// In a real implementation, this could be generated at build time or runtime
export function getNavigation(): NavSection[] {
  return [
    {
      items: [
        {
          title: "home",
          href: "",
          icon: Home,
        },
        {
          title: "dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "sidebar.sections.core",
      items: [
        {
          title: "auctions",
          href: "/auctions",
          icon: Gavel,
          children: [
            {
              title: "createAuction",
              href: "/auctions/create",
              icon: FolderPlus,
            },
            {
              title: "createTemplate",
              href: "/auctions/template",
              icon: FileText,
            },
            {
              title: "archive",
              href: "/auctions/archive",
              icon: FileArchive,
            },
          ],
        },
        {
          title: "properties",
          href: "/properties",
          icon: Building,
          children: [
            {
              title: "createProperty",
              href: "/properties/create",
              icon: FolderPlus,
            },
            {
              title: "explorer",
              href: "/properties/explorer",
              icon: Search,
            },
            {
              title: "manageDocuments",
              href: "/properties/documents",
              icon: FileText,
            },
          ],
        },
        {
          title: "propertyBlocks",
          href: "/property-blocks",
          icon: LayoutGrid,
          children: [
            {
              title: "createBlock",
              href: "/property-blocks/create",
              icon: FolderPlus,
            },
          ],
        },
      ],
    },
    {
      title: "sidebar.sections.brokers",
      items: [
        {
          title: "customers",
          href: "/customers",
          icon: Users,
        },
        {
          title: "notifications",
          href: "/notifications",
          icon: Bell,
        },
        {
          title: "payments",
          href: "/payments",
          icon: CreditCard,
        },
      ],
    },
    {
      title: "sidebar.sections.myOrganization",
      items: [
        {
          title: "inbox",
          href: "/inbox",
          icon: Inbox,
        },
        {
          title: "chat",
          href: "/chat",
          icon: MessageSquare,
        },
        {
          title: "team",
          href: "/team",
          icon: UserPlus,
        },
        {
          title: "storage",
          href: "/storage",
          icon: HardDrive,
        },
        {
          title: "reports",
          href: "/reports",
          icon: FileText,
        },
      ],
    },
    {
      title: "sidebar.sections.system",
      items: [
        {
          title: "settings",
          href: "/settings",
          icon: Settings,
          children: [
            {
              title: "general",
              href: "/settings/general",
              icon: Settings,
            },
            {
              title: "team",
              href: "/settings/team",
              icon: UserCog,
            },
            {
              title: "billing",
              href: "/settings/billing",
              icon: CreditCard,
            },
            {
              title: "limits",
              href: "/settings/limits",
              icon: Gauge,
            },
          ],
        },
        {
          title: "help",
          href: "/help",
          icon: HelpCircle,
        },
        {
          title: "support",
          href: "/support",
          icon: LifeBuoy,
        },
      ],
    },
  ]
}

// Helper function to check if a route is active
export function isRouteActive(currentPath: string, itemPath: string): boolean {
  // Exact match
  if (currentPath === itemPath) {
    return true
  }

  // Parent route match (e.g., /properties is active when on /properties/create)
  if (itemPath !== "/" && currentPath.startsWith(itemPath + "/")) {
    return true
  }

  return false
}

// Helper function to find all routes in the navigation
export function getAllRoutes(): string[] {
  const routes: string[] = []

  function extractRoutes(items: NavItem[]) {
    for (const item of items) {
      routes.push(item.href)
      if (item.children) {
        extractRoutes(item.children)
      }
    }
  }

  const navigation = getNavigation()
  for (const section of navigation) {
    extractRoutes(section.items)
  }

  return routes
}

// Helper function to add a new route to the navigation
export function addRouteToNavigation(
  route: string,
  title: string,
  parentRoute?: string,
  icon?: React.ElementType
): NavSection[] {
  const navigation = getNavigation()

  // If no parent route is specified, add to the "More" section
  if (!parentRoute) {
    for (const section of navigation) {
      for (const item of section.items) {
        if (item.title === "more") {
          if (!item.children) {
            item.children = []
          }
          item.children.push({
            title,
            href: route,
            icon: icon || FileText,
          })
          return navigation
        }
      }
    }
  }

  // If parent route is specified, find it and add the child
  for (const section of navigation) {
    for (const item of section.items) {
      if (item.href === parentRoute) {
        if (!item.children) {
          item.children = []
        }
        item.children.push({
          title,
          href: route,
          icon: icon || FileText,
        })
        return navigation
      }

      // Check in children
      if (item.children) {
        for (const child of item.children) {
          if (child.href === parentRoute) {
            if (!child.children) {
              child.children = []
            }
            child.children.push({
              title,
              href: route,
              icon: icon || FileText,
            })
            return navigation
          }
        }
      }
    }
  }

  return navigation
}
