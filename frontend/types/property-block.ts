import type { Property } from "@/types/property"

export type BlockStatus = "Active" | "Sold Out" | "Under Development" | "On Hold"

export interface PropertyBlock {
  id: string
  name: string
  regionId: string
  area: number
  areaUnit: "sq.ft" | "hectares" | "acres"
  numberOfPlots: number
  averagePlotSize: number
  location: {
    city: string
    state: string
    coordinates?: {
      latitude: number
      longitude: number
    }
  }
  status: BlockStatus
  plotsAvailability: number // percentage
  mapLink?: string
  description?: string
  properties: Property[] | string[] // Either full property objects or property IDs
  customAttributes?: Record<string, any>
}

export interface Region {
  id: string
  name: string
  state: string
  country: string
}

export interface PropertyBlockFilters {
  regionId?: string
  status?: BlockStatus | "All"
  minAvailability?: number
  maxAvailability?: number
  searchQuery?: string
}
