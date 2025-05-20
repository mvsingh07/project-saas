import { PageLayout, PageHeader, PageContent } from "../../components/page-layout"

export default function WebsiteConfigurationPage() {
  return (
    <PageLayout>
      <PageHeader title="Website Configuration" />
      <PageContent>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl text-muted-foreground">Website configuration options will be displayed here</h2>
        </div>
      </PageContent>
    </PageLayout>
  )
}
