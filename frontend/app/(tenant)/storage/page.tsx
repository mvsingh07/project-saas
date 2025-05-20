import { PageLayout, PageHeader, PageContent } from "../components/page-layout"

export default function StoragePage() {
  return (
    <PageLayout>
      <PageHeader title="Storage" />
      <PageContent>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl text-muted-foreground">Storage content will be displayed here</h2>
        </div>
      </PageContent>
    </PageLayout>
  )
}
