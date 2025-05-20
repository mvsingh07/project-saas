import type { Property } from "@/types/property"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Building,
  Building2,
  Warehouse,
  Bed,
  Bath,
  Layers,
  SquareIcon as SquareFeet,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
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
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="relative h-48 w-full">
          <Badge
            className={`absolute right-2 top-2 z-10 ${
              statusColors[property.status as keyof typeof statusColors]
            }`}
          >
            {property.status}
          </Badge>
          <Image
            src={property.imageUrl || "/placeholder.svg"}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardHeader className="p-4 pb-0">
          <h3 className="line-clamp-1 text-lg font-semibold">
            {property.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {property.location.city}, {property.location.state}
          </p>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2 p-4 pt-2">
          <div className="flex items-center gap-1 text-sm">
            <TypeIcon className="h-4 w-4 text-muted-foreground" />
            <span>{property.type}</span>
            <span className="ml-auto">{property.size} sq.ft</span>
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
            {property.floors && property.floors > 0 && (
              <div className="flex items-center gap-1">
                <Layers className="h-4 w-4" />
                <span>{property.floors}</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t p-4">
          <p className="text-lg font-bold">
            ${property.price.toLocaleString()}
          </p>
        </CardFooter>
      </Card>
    </Link>
  )
}
