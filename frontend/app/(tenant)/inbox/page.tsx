import { PageLayout, PageHeader, PageContent } from "../components/page-layout"

export default function InboxPage() {
  return (
    <PageLayout>
      <PageHeader title="Inbox" />
      <PageContent>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl text-muted-foreground">Inbox content will be displayed here</h2>
        </div>
      </PageContent>
    </PageLayout>
  )
}
