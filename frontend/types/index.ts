export interface Property {
  id: number
  name: string
  location: string
  price: string
  status: "Active" | "Pending" | "Sold"
  lastUpdated: Date
}

export interface Auction {
  id: number
  propertyId: number
  startDate: Date
  endDate: Date
  startingBid: string
  currentBid: string
  status: "Upcoming" | "Active" | "Ended" | "Cancelled"
}

export interface User {
  id: string
  email?: string
  full_name?: string
  role: "admin" | "tenant" | "client" | undefined
  tenant_id?: string
  created_at: string
  updated_at: string
}

export type AuthFormData = {
  email: string
  password: string
  full_name?: string
  role?: "admin" | "tenant" | "client"
}
