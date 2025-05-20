import { PageLayout, PageHeader, PageContent } from "../components/page-layout"

export default function UsersPage() {
  return (
    <PageLayout>
      <PageHeader title="Users" />
      <PageContent>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl text-muted-foreground">Users content will be displayed here</h2>
        </div>
      </PageContent>
    </PageLayout>
  )
}
