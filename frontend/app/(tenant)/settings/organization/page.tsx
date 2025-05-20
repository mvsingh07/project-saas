import { PageLayout, PageHeader, PageContent } from "../../components/page-layout"

export default function OrganizationSettingsPage() {
  return (
    <PageLayout>
      <PageHeader title="Organization Settings" />
      <PageContent>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl text-muted-foreground">Organization settings will be displayed here</h2>
        </div>
      </PageContent>
    </PageLayout>
  )
}
