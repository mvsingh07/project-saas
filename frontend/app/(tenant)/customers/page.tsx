import { PageLayout, PageHeader, PageContent } from "../components/page-layout"

export default function CustomersPage() {
  return (
    <PageLayout>
      <PageHeader title="Customers" />
      <PageContent>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl text-muted-foreground">Customers content will be displayed here</h2>
        </div>
      </PageContent>
    </PageLayout>
  )
}
