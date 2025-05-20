import { PageLayout, PageHeader, PageContent } from "../components/page-layout"

export default function SupportPage() {
  return (
    <PageLayout>
      <PageHeader title="Support" />
      <PageContent>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl text-muted-foreground">Support content will be displayed here</h2>
        </div>
      </PageContent>
    </PageLayout>
  )
}
