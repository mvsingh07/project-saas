import { PageLayout, PageHeader, PageContent } from "../components/page-layout"

export default function DocumentsPage() {
  return (
    <PageLayout>
      <PageHeader title="Documents" />
      <PageContent>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl text-muted-foreground">Documents content will be displayed here</h2>
        </div>
      </PageContent>
    </PageLayout>
  )
}
