import { PageLayout, PageHeader, PageContent } from "../components/page-layout"

export default function SettingsPage() {
  return (
    <PageLayout>
      <PageHeader title="Settings" />
      <PageContent>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl text-muted-foreground">Settings content will be displayed here</h2>
        </div>
      </PageContent>
    </PageLayout>
  )
}
