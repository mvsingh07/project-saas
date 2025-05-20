"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { propertyBlocks } from "@/data/property-blocks"
import type { PropertyBlockFilters } from "@/types/property-block"
import { BlockCard } from "./components/block-card"
import { BlockListItem } from "./components/block-list-item"
import { BlockFiltersPanel } from "./components/block-filters"
import { Button } from "@/components/ui/button"
import { Grid, List, Plus } from "lucide-react"
import Link from "next/link"
import { PageLayout, PageHeader, PageContent } from "../components/page-layout"
import { Input } from "@/components/ui/input"

export default function PropertyBlocksPage() {
  const { t } = useTranslation()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filters, setFilters] = useState<PropertyBlockFilters>({})
  const [filteredBlocks, setFilteredBlocks] = useState(propertyBlocks)
  const [searchQuery, setSearchQuery] = useState("")

  // Apply filters to blocks
  useEffect(() => {
    let result = [...propertyBlocks]

    // Region filter
    if (filters.regionId) {
      result = result.filter((block) => block.regionId === filters.regionId)
    }

    // Status filter
    if (filters.status && filters.status !== "All") {
      result = result.filter((block) => block.status === filters.status)
    }

    // Availability range filter
    if (filters.minAvailability !== undefined) {
      result = result.filter(
        (block) => block.plotsAvailability >= filters.minAvailability!
      )
    }
    if (filters.maxAvailability !== undefined) {
      result = result.filter(
        (block) => block.plotsAvailability <= filters.maxAvailability!
      )
    }

    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (block) =>
          block.id.toLowerCase().includes(query) ||
          block.name.toLowerCase().includes(query) ||
          block.location.city.toLowerCase().includes(query) ||
          block.location.state.toLowerCase().includes(query)
      )
    }

    setFilteredBlocks(result)
  }, [filters, searchQuery])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleFilterChange = (newFilters: PropertyBlockFilters) => {
    setFilters(newFilters)
  }

  const handleResetFilters = () => {
    setFilters({})
    setSearchQuery("")
  }

  return (
    <PageLayout>
      <PageHeader title={t("propertyBlocks.title")}>
        <div className="flex items-center gap-4">
          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-sm items-center space-x-2"
          >
            <Input
              type="search"
              placeholder={t("propertyBlocks.search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
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
            <Link href="/property-blocks/create">
              <Plus className="mr-2 h-4 w-4" />
              {t("propertyBlocks.addBlock")}
            </Link>
          </Button>
        </div>
      </PageHeader>

      <PageContent>
        <BlockFiltersPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {filteredBlocks.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-lg border">
            <p className="text-muted-foreground">
              {t("propertyBlocks.noBlocks")}
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {filteredBlocks.map((block) => (
              <BlockCard key={block.id} block={block} />
            ))}
          </div>
        ) : (
          <div className="space-y-4 mt-6">
            {filteredBlocks.map((block) => (
              <BlockListItem key={block.id} block={block} />
            ))}
          </div>
        )}
      </PageContent>
    </PageLayout>
  )
}
