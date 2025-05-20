"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import TenantSidebar from "./sidebar"

export function SidebarContainer() {
  const pathname = usePathname()
  const [key, setKey] = useState(0)

  // Reset the key when the pathname changes to force a re-render
  useEffect(() => {
    setKey((prevKey) => prevKey + 1)
  }, [pathname])

  return (
    <div className="sidebar-container" key={key}>
      <style jsx global>{`
        .sidebar-container {
          transition: all 0.3s ease;
        }
        
        .sidebar-menu-sub {
          transition: max-height 0.3s ease, opacity 0.3s ease;
          overflow: hidden;
        }
      `}</style>
      <TenantSidebar />
    </div>
  )
}
