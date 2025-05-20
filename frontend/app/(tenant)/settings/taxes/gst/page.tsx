import { PageLayout, PageHeader, PageContent } from "../../../components/page-layout"
import { Home, ChevronRight } from "lucide-react"

export default function GSTSettingsPage() {
  return (
    <PageLayout>
      <PageHeader title="GST Settings">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Home size={14} />
          <span>Setup</span>
          <ChevronRight size={14} />
          <span>Taxes & Corrections</span>
          <ChevronRight size={14} />
          <span className="font-medium text-primary">GST Settings</span>
        </div>
      </PageHeader>
      <PageContent>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl text-muted-foreground">GST settings will be displayed here</h2>
        </div>
      </PageContent>
    </PageLayout>
  )
}
