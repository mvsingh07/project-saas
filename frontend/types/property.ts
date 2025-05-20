export type PropertyStatus = "Active" | "Under Auction" | "Sold" | "Pending"

export type PropertyType = "Villa" | "Apartment" | "Commercial" | "House" | "Land" | "Office"

export interface Property {
  id: string
  title: string
  location: {
    city: string
    state: string
  }
  type: PropertyType
  size: number
  bedrooms: number
  bathrooms: number
  floors?: number
  price: number
  status: PropertyStatus
  imageUrl: string
  description?: string
  features?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface PropertyFilters {
  type?: PropertyType | "All Types"
  minSize?: number
  maxSize?: number
  bedrooms?: number | "Any"
  bathrooms?: number | "Any"
  floors?: number | "Any"
  status?: PropertyStatus | "All"
  searchQuery?: string
}
