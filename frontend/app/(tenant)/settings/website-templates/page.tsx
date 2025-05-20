import { PageLayout, PageHeader, PageContent } from "../../components/page-layout"

export default function WebsiteTemplatesPage() {
  return (
    <PageLayout>
      <PageHeader title="Website Templates" />
      <PageContent>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl text-muted-foreground">Website templates will be displayed here</h2>
        </div>
      </PageContent>
    </PageLayout>
  )
}
