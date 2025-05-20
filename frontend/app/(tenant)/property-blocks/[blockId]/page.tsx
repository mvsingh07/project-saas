"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { PageLayout, PageContent } from "../../components/page-layout"
import { PropertyCard } from "../../properties/components/property-card"
import { PropertyListItem } from "../../properties/components/property-list-item"
import { Button } from "@/components/ui/button"
import { Grid, List } from "lucide-react"
import { getBlockById, getPropertiesByBlockId } from "@/toolbar/property-utils"
import type { Property } from "@/types/property"
import type { PropertyBlock } from "@/types/property-block"
import { PropertyDistribution } from "./components/property-distribution"
import { CustomAttributes } from "./components/custom-attributes"
import { BlockHeader } from "./components/block-header"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function BlockDetailPage() {
  const params = useParams()
  const blockId = params.blockId as string

  const [block, setBlock] = useState<PropertyBlock | null>(null)
  const [properties, setProperties] = useState<Property[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!blockId) return

    try {
      const blockData = getBlockById(blockId)
      if (!blockData) {
        setError("Block not found")
        setLoading(false)
        return
      }

      setBlock(blockData)

      const propertiesData = getPropertiesByBlockId(blockId)
      setProperties(propertiesData)

      setLoading(false)
    } catch (err) {
      setError("Error loading block data")
      setLoading(false)
    }
  }, [blockId])

  if (loading) {
    return (
      <PageLayout>
        <PageContent>
          <div className="flex items-center justify-center h-64">
            <p>Loading block data...</p>
          </div>
        </PageContent>
      </PageLayout>
    )
  }

  if (error || !block) {
    return (
      <PageLayout>
        <PageContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error || "Block not found"}</AlertDescription>
          </Alert>
        </PageContent>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <PageContent>
        <BlockHeader block={block} />

        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Property Distribution</h2>
          </div>

          <PropertyDistribution properties={properties} blockName={block.name} />

          <CustomAttributes block={block} />

          <div className="flex items-center justify-between mt-8">
            <h2 className="text-xl font-semibold">Properties in this Block</h2>
            <div className="flex rounded-md border">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {properties.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-lg border">
              <p className="text-muted-foreground">No properties found in this block.</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {properties.map((property) => (
                <PropertyListItem key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </PageContent>
    </PageLayout>
  )
}
