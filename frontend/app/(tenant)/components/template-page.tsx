import type React from "react"
import { PageLayout, PageHeader, PageContent } from "./page-layout"

interface TemplatePageProps {
  title: string
  description?: string
  children?: React.ReactNode
}

export function TemplatePage({ title, description, children }: TemplatePageProps) {
  return (
    <PageLayout>
      <PageHeader title={title} description={description} />
      <PageContent>
        {children || (
          <div className="flex h-full items-center justify-center">
            <h2 className="text-xl text-muted-foreground">Content will be displayed here</h2>
          </div>
        )}
      </PageContent>
    </PageLayout>
  )
}
