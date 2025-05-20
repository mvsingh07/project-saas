import { PageLayout, PageHeader, PageContent } from "../components/page-layout"

export default function NotificationsPage() {
  return (
    <PageLayout>
      <PageHeader title="Notifications" />
      <PageContent>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl text-muted-foreground">Notifications content will be displayed here</h2>
        </div>
      </PageContent>
    </PageLayout>
  )
}
