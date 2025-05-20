import { PageLayout, PageHeader, PageContent } from "../../components/page-layout"

export default function DomainsSettingsPage() {
  return (
    <PageLayout>
      <PageHeader title="Domains Settings" />
      <PageContent>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl text-muted-foreground">Domains settings will be displayed here</h2>
        </div>
      </PageContent>
    </PageLayout>
  )
}
