import { PageLayout, PageHeader, PageContent } from "../../components/page-layout"

export default function TaxesSettingsPage() {
  return (
    <PageLayout>
      <PageHeader title="Taxes & Corrections" />
      <PageContent>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl text-muted-foreground">Taxes & Corrections settings will be displayed here</h2>
        </div>
      </PageContent>
    </PageLayout>
  )
}
