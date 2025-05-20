import { PageLayout, PageHeader, PageContent } from "../components/page-layout"

export default function ChatPage() {
  return (
    <PageLayout>
      <PageHeader title="Chat" />
      <PageContent>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl text-muted-foreground">Chat content will be displayed here</h2>
        </div>
      </PageContent>
    </PageLayout>
  )
}
