import { PageLayout, PageHeader, PageContent } from "../components/page-layout"

export default function TeamPage() {
  return (
    <PageLayout>
      <PageHeader title="Team" />
      <PageContent>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl text-muted-foreground">Team content will be displayed here</h2>
        </div>
      </PageContent>
    </PageLayout>
  )
}
