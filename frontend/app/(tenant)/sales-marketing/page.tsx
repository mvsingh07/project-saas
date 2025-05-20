import { PageLayout, PageHeader, PageContent } from "../components/page-layout"

export default function SalesMarketingPage() {
  return (
    <PageLayout>
      <PageHeader title="Sales & Marketing" />
      <PageContent>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl text-muted-foreground">Sales & Marketing content will be displayed here</h2>
        </div>
      </PageContent>
    </PageLayout>
  )
}
