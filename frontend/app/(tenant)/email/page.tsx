import { PageLayout, PageHeader, PageContent } from "../components/page-layout"

export default function EmailPage() {
  return (
    <PageLayout>
      <PageHeader title="Email" />
      <PageContent>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl text-muted-foreground">Email content will be displayed here</h2>
        </div>
      </PageContent>
    </PageLayout>
  )
}
