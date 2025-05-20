"use client"

import { Home, Gavel, DollarSign, ClipboardCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/toolbar/date-utils"
import { PageLayout, PageHeader, PageContent } from "../components/page-layout"
import { useTranslation } from "react-i18next"

// Mock data for the dashboard
const summaryData = [
  {
    titleKey: "dashboard.totalProperties",
    value: "124",
    icon: Home,
    color: "text-blue-500",
  },
  {
    titleKey: "dashboard.activeAuctions",
    value: "42",
    icon: Gavel,
    color: "text-green-500",
  },
  {
    titleKey: "dashboard.totalRevenue",
    value: "₹8.2M",
    icon: DollarSign,
    color: "text-yellow-500",
  },
  {
    titleKey: "dashboard.pendingApprovals",
    value: "6",
    icon: ClipboardCheck,
    color: "text-red-500",
  },
]

const propertyData = [
  {
    id: 1,
    name: "Sunset Villa",
    location: "Mumbai, MH",
    price: "₹1.2 Cr",
    status: "Active",
    lastUpdated: new Date("2023-10-15"),
  },
  {
    id: 2,
    name: "Green Meadows Apartment",
    location: "Bangalore, KA",
    price: "₹85 L",
    status: "Pending",
    lastUpdated: new Date("2023-10-12"),
  },
  {
    id: 3,
    name: "Riverside Cottage",
    location: "Goa",
    price: "₹2.5 Cr",
    status: "Sold",
    lastUpdated: new Date("2023-10-05"),
  },
  {
    id: 4,
    name: "Mountain View Bungalow",
    location: "Shimla, HP",
    price: "₹1.8 Cr",
    status: "Active",
    lastUpdated: new Date("2023-10-18"),
  },
  {
    id: 5,
    name: "City Center Office Space",
    location: "Delhi, DL",
    price: "₹3.2 Cr",
    status: "Pending",
    lastUpdated: new Date("2023-10-10"),
  },
]

export default function DashboardPage() {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language

  // Function to get status label based on status value
  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return t("dashboard.properties.status.active")
      case "pending":
        return t("dashboard.properties.status.pending")
      case "sold":
        return t("dashboard.properties.status.sold")
      default:
        return status
    }
  }

  return (
    <PageLayout>
      <PageHeader title={t("dashboard.title")}>
        <div className="text-sm text-muted-foreground">
          {t("dashboard.welcome")}. {t("dashboard.summary")}
        </div>
      </PageHeader>
      <PageContent>
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {summaryData.map((item) => (
            <Card key={item.titleKey}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{t(item.titleKey)}</CardTitle>
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Property List */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{t("dashboard.propertyList")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("dashboard.properties.name")}</TableHead>
                  <TableHead>{t("dashboard.properties.location")}</TableHead>
                  <TableHead>{t("dashboard.properties.price")}</TableHead>
                  <TableHead>{t("dashboard.properties.status")}</TableHead>
                  <TableHead>{t("dashboard.properties.lastUpdated")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {propertyData.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell className="font-medium">{property.name}</TableCell>
                    <TableCell>{property.location}</TableCell>
                    <TableCell>{property.price}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          property.status === "Active"
                            ? "default"
                            : property.status === "Pending"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {getStatusLabel(property.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(property.lastUpdated, currentLanguage)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </PageContent>
    </PageLayout>
  )
}
