import type { PropertyBlock } from "@/types/property-block"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Home, ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

interface BlockCardProps {
  block: PropertyBlock
}

export function BlockCard({ block }: BlockCardProps) {
  const statusColors = {
    Active: "bg-green-500 hover:bg-green-600",
    "Sold Out": "bg-red-500 hover:bg-red-600",
    "Under Development": "bg-blue-500 hover:bg-blue-600",
    "On Hold": "bg-yellow-500 hover:bg-yellow-600",
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-center">
          <h3 className="line-clamp-1 text-lg font-semibold">{block.name}</h3>
          <Badge
            className={`${
              statusColors[block.status as keyof typeof statusColors]
            }`}
          >
            {block.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          {block.location.city}, {block.location.state}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2 p-4 pt-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Block ID</p>
            <p className="font-medium">{block.id}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Area</p>
            <p className="font-medium">
              {block.area.toLocaleString()} {block.areaUnit}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Number of Plots</p>
            <p className="font-medium">{block.numberOfPlots}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Avg. Plot Size</p>
            <p className="font-medium">
              {block.averagePlotSize.toLocaleString()} {block.areaUnit}
            </p>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex justify-between text-sm mb-1">
            <span>Plots Availability</span>
            <span>{block.plotsAvailability}%</span>
          </div>
          <Progress value={block.plotsAvailability} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="border-t p-4 flex justify-between">
        {block.mapLink ? (
          <Button variant="outline" size="sm" asChild>
            <a href={block.mapLink} target="_blank" rel="noopener noreferrer">
              <MapPin className="h-4 w-4 mr-1" /> Directions
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </Button>
        ) : (
          <span></span>
        )}
        <Button size="sm" asChild>
          <Link href={`/property-blocks/${block.id}`}>
            <Home className="h-4 w-4 mr-1" /> View Properties
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
