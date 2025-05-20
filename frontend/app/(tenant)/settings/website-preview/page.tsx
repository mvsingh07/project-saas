import { PageLayout, PageHeader, PageContent } from "../../components/page-layout"

export default function WebsitePreviewPage() {
  return (
    <PageLayout>
      <PageHeader title="Website Preview" />
      <PageContent>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl text-muted-foreground">Website preview will be displayed here</h2>
        </div>
      </PageContent>
    </PageLayout>
  )
}
