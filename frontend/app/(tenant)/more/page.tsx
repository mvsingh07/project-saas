import { PageLayout, PageHeader, PageContent } from "../components/page-layout"

export default function MorePage() {
  return (
    <PageLayout>
      <PageHeader title="More" />
      <PageContent>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl text-muted-foreground">Additional content will be displayed here</h2>
        </div>
      </PageContent>
    </PageLayout>
  )
}
