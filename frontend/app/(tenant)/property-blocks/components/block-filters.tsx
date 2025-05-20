"use client"

import { useState } from "react"
import type { PropertyBlockFilters } from "@/types/property-block"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, X } from "lucide-react"
import { regions } from "@/data/regions"

interface BlockFiltersProps {
  filters: PropertyBlockFilters
  onFilterChange: (filters: PropertyBlockFilters) => void
  onReset: () => void
}

export function BlockFiltersPanel({ filters, onFilterChange, onReset }: BlockFiltersProps) {
  const [localFilters, setLocalFilters] = useState<PropertyBlockFilters>(filters)
  const [availabilityRange, setAvailabilityRange] = useState<[number, number]>([
    filters.minAvailability || 0,
    filters.maxAvailability || 100,
  ])

  const handleFilterChange = (key: keyof PropertyBlockFilters, value: any) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleAvailabilityRangeChange = (value: number[]) => {
    setAvailabilityRange([value[0], value[1]])
    setLocalFilters((prev) => ({
      ...prev,
      minAvailability: value[0],
      maxAvailability: value[1],
    }))
  }

  const handleApplyFilters = () => {
    onFilterChange(localFilters)
  }

  const handleResetFilters = () => {
    setLocalFilters({})
    setAvailabilityRange([0, 100])
    onReset()
  }

  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold">Filters</h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium">Region</label>
          <Select
            value={localFilters.regionId || ""}
            onValueChange={(value) => handleFilterChange("regionId", value === "" ? undefined : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region.id} value={region.id}>
                  {region.name} ({region.state})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select
            value={localFilters.status || "All"}
            onValueChange={(value) => handleFilterChange("status", value === "All" ? undefined : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Sold Out">Sold Out</SelectItem>
              <SelectItem value="Under Development">Under Development</SelectItem>
              <SelectItem value="On Hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Availability Range (%)</label>
          <div className="px-2">
            <Slider
              defaultValue={availabilityRange}
              min={0}
              max={100}
              step={5}
              value={availabilityRange}
              onValueChange={handleAvailabilityRangeChange}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{availabilityRange[0]}%</span>
              <span>{availabilityRange[1]}%</span>
            </div>
          </div>
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
