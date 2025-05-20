import { PageLayout, PageHeader, PageContent } from "../components/page-layout"

export default function AuctionsPage() {
  return (
    <PageLayout>
      <PageHeader title="Auctions" />
      <PageContent>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl text-muted-foreground">Auctions content will be displayed here</h2>
        </div>
      </PageContent>
    </PageLayout>
  )
}
