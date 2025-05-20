import type { PropertyBlock } from "@/types/property-block"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, ExternalLink, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { regions } from "@/data/regions"

interface BlockHeaderProps {
  block: PropertyBlock
}

export function BlockHeader({ block }: BlockHeaderProps) {
  const statusColors = {
    Active: "bg-green-500 hover:bg-green-600",
    "Sold Out": "bg-red-500 hover:bg-red-600",
    "Under Development": "bg-blue-500 hover:bg-blue-600",
    "On Hold": "bg-yellow-500 hover:bg-yellow-600",
  }

  const region = regions.find((r) => r.id === block.regionId)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/property-blocks">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Blocks
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">{block.name}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>
              {block.location.city}, {block.location.state}
              {region && ` (${region.name})`}
            </span>
            {block.mapLink && (
              <a
                href={block.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center"
              >
                View on Map <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            )}
          </div>
        </div>
        <Badge
          className={`${
            statusColors[block.status as keyof typeof statusColors]
          }`}
        >
          {block.status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
        <div>
          <p className="text-sm text-muted-foreground">Block ID</p>
          <p className="font-medium">{block.id}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Area</p>
          <p className="font-medium">
            {block.area.toLocaleString()} {block.areaUnit}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Number of Plots</p>
          <p className="font-medium">{block.numberOfPlots}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Average Plot Size</p>
          <p className="font-medium">
            {block.averagePlotSize.toLocaleString()} {block.areaUnit}
          </p>
        </div>
      </div>

      {block.description && (
        <p className="text-muted-foreground">{block.description}</p>
      )}
    </div>
  )
}
