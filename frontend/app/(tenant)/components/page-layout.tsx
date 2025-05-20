import type React from "react"
import { cn } from "@/toolbar/utils"

interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function PageLayout({ children, className, ...props }: PageLayoutProps) {
  return (
    <div className={cn("flex flex-col min-h-screen", className)} {...props}>
      {children}
    </div>
  )
}

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  children?: React.ReactNode
}

export function PageHeader({ title, children, className, ...props }: PageHeaderProps) {
  return (
    <div className={cn("px-6 py-4 border-b", className)} {...props}>
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {children && <div className="mt-1">{children}</div>}
    </div>
  )
}

interface PageContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function PageContent({ children, className, ...props }: PageContentProps) {
  return (
    <div className={cn("flex-1 p-6", className)} {...props}>
      {children}
    </div>
  )
}

export default PageLayout
