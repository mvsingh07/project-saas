"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { properties } from "@/data/properties"
import type { PropertyFilters } from "@/types/property"
import { PropertyCard } from "./components/property-card"
import { PropertyListItem } from "./components/property-list-item"
import { PropertyFiltersPanel } from "./components/property-filters"
import { PropertySearch } from "./components/property-search"
import { Button } from "@/components/ui/button"
import { Plus, Grid, List } from "lucide-react"
import Link from "next/link"
import { PageLayout, PageHeader, PageContent } from "../components/page-layout"

export default function PropertiesPage() {
  const { t } = useTranslation()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filters, setFilters] = useState<PropertyFilters>({})
  const [filteredProperties, setFilteredProperties] = useState(properties)

  // Apply filters to properties
  useEffect(() => {
    let result = [...properties]

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter(
        (property) =>
          property.id.toLowerCase().includes(query) ||
          property.title.toLowerCase().includes(query)
      )
    }

    // Property type filter
    if (filters.type && filters.type !== "All Types") {
      result = result.filter((property) => property.type === filters.type)
    }

    // Size range filter
    if (filters.minSize !== undefined) {
      result = result.filter((property) => property.size >= filters.minSize!)
    }
    if (filters.maxSize !== undefined) {
      result = result.filter((property) => property.size <= filters.maxSize!)
    }

    // Bedrooms filter
    if (filters.bedrooms && filters.bedrooms !== "Any") {
      if (filters.bedrooms === 5) {
        result = result.filter((property) => property.bedrooms >= 5)
      } else {
        result = result.filter(
          (property) => property.bedrooms === filters.bedrooms
        )
      }
    }

    // Bathrooms filter
    if (filters.bathrooms && filters.bathrooms !== "Any") {
      if (filters.bathrooms === 5) {
        result = result.filter((property) => property.bathrooms >= 5)
      } else {
        result = result.filter(
          (property) => property.bathrooms === filters.bathrooms
        )
      }
    }

    // Floors filter
    if (filters.floors && filters.floors !== "Any") {
      if (filters.floors === 4) {
        result = result.filter(
          (property) => property.floors !== undefined && property.floors >= 4
        )
      } else {
        result = result.filter(
          (property) =>
            property.floors !== undefined && property.floors === filters.floors
        )
      }
    }

    // Status filter
    if (filters.status && filters.status !== "All") {
      result = result.filter((property) => property.status === filters.status)
    }

    setFilteredProperties(result)
  }, [filters])

  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }))
  }

  const handleFilterChange = (newFilters: PropertyFilters) => {
    setFilters(newFilters)
  }

  const handleResetFilters = () => {
    setFilters({})
  }

  return (
    <PageLayout>
      <PageHeader title={t("properties.title")}>
        <div className="flex items-center gap-4">
          <PropertySearch onSearch={handleSearch} />
          <div className="flex rounded-md border">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
              aria-label={t("properties.viewModes.grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
              aria-label={t("properties.viewModes.list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button asChild>
            <Link href="/properties/create">
              <Plus className="mr-2 h-4 w-4" />
              {t("properties.addProperty")}
            </Link>
          </Button>
        </div>
      </PageHeader>

      <PageContent>
        <PropertyFiltersPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {filteredProperties.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-lg border">
            <p className="text-muted-foreground">
              {t("properties.noProperties")}
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProperties.map((property) => (
              <PropertyListItem key={property.id} property={property} />
            ))}
          </div>
        )}
      </PageContent>
    </PageLayout>
  )
}
