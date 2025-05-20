import { PageLayout, PageHeader, PageContent } from "../components/page-layout"

export default function PaymentsPage() {
  return (
    <PageLayout>
      <PageHeader title="Payments" />
      <PageContent>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl text-muted-foreground">Payments content will be displayed here</h2>
        </div>
      </PageContent>
    </PageLayout>
  )
}
