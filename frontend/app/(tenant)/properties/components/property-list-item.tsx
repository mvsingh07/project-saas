import type { Property } from "@/types/property"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Building,
  Building2,
  Warehouse,
  Bed,
  Bath,
  SquareIcon as SquareFeet,
} from "lucide-react"
import Link from "next/link"

interface PropertyListItemProps {
  property: Property
}

export function PropertyListItem({ property }: PropertyListItemProps) {
  const statusColors = {
    Active: "bg-green-500 hover:bg-green-600",
    "Under Auction": "bg-blue-500 hover:bg-blue-600",
    Sold: "bg-red-500 hover:bg-red-600",
    Pending: "bg-yellow-500 hover:bg-yellow-600",
  }

  const typeIcons = {
    Villa: Home,
    Apartment: Building,
    Commercial: Building2,
    House: Home,
    Land: SquareFeet,
    Office: Warehouse,
  }

  const TypeIcon = typeIcons[property.type]

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="flex items-center justify-between rounded-md border p-4 transition-all hover:bg-accent">
        <div className="flex items-center gap-4">
          <Badge
            className={`${
              statusColors[property.status as keyof typeof statusColors]
            }`}
          >
            {property.status}
          </Badge>
          <div>
            <p className="font-medium">{property.title}</p>
            <p className="text-sm text-muted-foreground">
              {property.location.city}, {property.location.state}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <TypeIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{property.type}</span>
          </div>
          <div className="text-sm">
            <span>{property.size} sq.ft</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms}</span>
              </div>
            )}
          </div>
          <div className="text-right">
            <p className="font-bold">${property.price.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">ID: {property.id}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
