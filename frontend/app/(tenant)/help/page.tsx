import { PageLayout, PageHeader, PageContent } from "../components/page-layout"

export default function HelpPage() {
  return (
    <PageLayout>
      <PageHeader title="Get Help" />
      <PageContent>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl text-muted-foreground">Help content will be displayed here</h2>
        </div>
      </PageContent>
    </PageLayout>
  )
}
