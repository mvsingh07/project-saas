"use client"

import { useState } from "react"
import type { PropertyFilters } from "@/types/property"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, X } from "lucide-react"

interface PropertyFiltersProps {
  filters: PropertyFilters
  onFilterChange: (filters: PropertyFilters) => void
  onReset: () => void
}

export function PropertyFiltersPanel({ filters, onFilterChange, onReset }: PropertyFiltersProps) {
  const [localFilters, setLocalFilters] = useState<PropertyFilters>(filters)
  const [sizeRange, setSizeRange] = useState<[number, number]>([filters.minSize || 0, filters.maxSize || 10000])

  const handleFilterChange = (key: keyof PropertyFilters, value: any) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleSizeRangeChange = (value: number[]) => {
    setSizeRange([value[0], value[1]])
    setLocalFilters((prev) => ({
      ...prev,
      minSize: value[0],
      maxSize: value[1],
    }))
  }

  const handleApplyFilters = () => {
    onFilterChange(localFilters)
  }

  const handleResetFilters = () => {
    setLocalFilters({})
    setSizeRange([0, 10000])
    onReset()
  }

  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold">Filters</h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="space-y-2">
          <label className="text-sm font-medium">Property Type</label>
          <Select value={localFilters.type || "All Types"} onValueChange={(value) => handleFilterChange("type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Types">All Types</SelectItem>
              <SelectItem value="Villa">Villa</SelectItem>
              <SelectItem value="Apartment">Apartment</SelectItem>
              <SelectItem value="Commercial">Commercial</SelectItem>
              <SelectItem value="House">House</SelectItem>
              <SelectItem value="Land">Land</SelectItem>
              <SelectItem value="Office">Office</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Size Range (sq.ft)</label>
          <div className="px-2">
            <Slider
              defaultValue={sizeRange}
              min={0}
              max={10000}
              step={100}
              value={sizeRange}
              onValueChange={handleSizeRangeChange}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{sizeRange[0]} sq.ft</span>
              <span>{sizeRange[1]} sq.ft</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Bedrooms</label>
          <Select
            value={localFilters.bedrooms?.toString() || "Any"}
            onValueChange={(value) => handleFilterChange("bedrooms", value === "Any" ? "Any" : Number.parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Any">Any</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Bathrooms</label>
          <Select
            value={localFilters.bathrooms?.toString() || "Any"}
            onValueChange={(value) => handleFilterChange("bathrooms", value === "Any" ? "Any" : Number.parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Any">Any</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Floors</label>
          <Select
            value={localFilters.floors?.toString() || "Any"}
            onValueChange={(value) => handleFilterChange("floors", value === "Any" ? "Any" : Number.parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Any">Any</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={handleResetFilters}>
          <X className="mr-2 h-4 w-4" />
          Reset Filters
        </Button>
        <Button onClick={handleApplyFilters}>
          <Search className="mr-2 h-4 w-4" />
          Apply Filters
        </Button>
      </div>
    </div>
  )
}
