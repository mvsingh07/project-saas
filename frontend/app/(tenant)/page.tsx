import { redirect } from "next/navigation"
import { PageLayout, PageHeader, PageContent } from "./components/page-layout"
import { createClient } from "@/lib/server"

export default async function HomePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/login")
  }
  return (
    <PageLayout>
      <PageHeader title="Home" />
      <PageContent>
        <div className="flex h-full items-center justify-center">
          <h2 className="text-xl text-muted-foreground">
            Welcome to AuctionSphere
          </h2>
        </div>
      </PageContent>
    </PageLayout>
  )
}
