"use client"

import { BarChart3 } from "lucide-react"
import { RegisterRoute } from "@/components/register-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TemplatePage } from "../../components/template-page"

export default function PropertyAnalyticsPage() {
  return (
    <>
      {/* Register this route with the sidebar */}
      <RegisterRoute
        path="/properties/analytics"
        title="propertyAnalytics"
        parentPath="/properties"
        icon={BarChart3}
      />

      <TemplatePage title="Property Analytics">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Conversion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.2%</div>
              <p className="text-xs text-muted-foreground">
                +0.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Average Time on Page
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2m 45s</div>
              <p className="text-xs text-muted-foreground">
                -10s from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Monthly Property Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full bg-muted/20 flex items-center justify-center">
              <p className="text-muted-foreground">Chart placeholder</p>
            </div>
          </CardContent>
        </Card>
      </TemplatePage>
    </>
  )
}
