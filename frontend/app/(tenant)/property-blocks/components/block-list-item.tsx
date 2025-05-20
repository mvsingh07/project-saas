import type { PropertyBlock } from "@/types/property-block"
import { Badge } from "@/components/ui/badge"
import { MapPin, Home, ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

interface BlockListItemProps {
  block: PropertyBlock
}

export function BlockListItem({ block }: BlockListItemProps) {
  const statusColors = {
    Active: "bg-green-500 hover:bg-green-600",
    "Sold Out": "bg-red-500 hover:bg-red-600",
    "Under Development": "bg-blue-500 hover:bg-blue-600",
    "On Hold": "bg-yellow-500 hover:bg-yellow-600",
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between rounded-md border p-4 transition-all hover:bg-accent">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 md:mb-0">
        <Badge
          className={`${
            statusColors[block.status as keyof typeof statusColors]
          } w-fit`}
        >
          {block.status}
        </Badge>
        <div>
          <p className="font-medium">{block.name}</p>
          <p className="text-sm text-muted-foreground flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {block.location.city}, {block.location.state}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 md:mb-0">
        <div>
          <p className="text-xs text-muted-foreground">Block ID</p>
          <p className="text-sm">{block.id}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Area</p>
          <p className="text-sm">
            {block.area.toLocaleString()} {block.areaUnit}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Plots</p>
          <p className="text-sm">{block.numberOfPlots}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Avg. Size</p>
          <p className="text-sm">
            {block.averagePlotSize.toLocaleString()} {block.areaUnit}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2">
        <div className="w-full md:w-32">
          <div className="flex justify-between text-xs mb-1">
            <span>Availability</span>
            <span>{block.plotsAvailability}%</span>
          </div>
          <Progress value={block.plotsAvailability} className="h-2" />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          {block.mapLink && (
            <Button
              variant="outline"
              size="sm"
              className="w-full md:w-auto"
              asChild
            >
              <a href={block.mapLink} target="_blank" rel="noopener noreferrer">
                <MapPin className="h-4 w-4 mr-1" /> Map
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </Button>
          )}
          <Button size="sm" className="w-full md:w-auto" asChild>
            <Link href={`/property-blocks/${block.id}`}>
              <Home className="h-4 w-4 mr-1" /> View
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
