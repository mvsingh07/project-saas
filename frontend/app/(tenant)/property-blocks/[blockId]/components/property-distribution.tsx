"use client"

import { useEffect, useRef } from "react"
import type { Property } from "@/types/property"

interface PropertyDistributionProps {
  properties: Property[]
  blockName: string
}

export function PropertyDistribution({ properties, blockName }: PropertyDistributionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || properties.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background
    ctx.fillStyle = "#f8f9fa"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw title
    ctx.fillStyle = "#1a1a1a"
    ctx.font = "bold 16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(`${blockName} - Property Distribution`, canvas.width / 2, 30)

    // Calculate grid dimensions
    const margin = 50
    const availableWidth = canvas.width - margin * 2
    const availableHeight = canvas.height - margin * 2 - 30 // Account for title

    // Determine grid size based on number of properties
    const gridSize = Math.ceil(Math.sqrt(properties.length))
    const cellWidth = availableWidth / gridSize
    const cellHeight = availableHeight / gridSize

    // Draw properties as grid cells
    properties.forEach((property, index) => {
      const row = Math.floor(index / gridSize)
      const col = index % gridSize

      const x = margin + col * cellWidth
      const y = margin + row * cellHeight + 30 // Account for title

      // Draw cell
      ctx.fillStyle = getStatusColor(property.status)
      ctx.fillRect(x, y, cellWidth - 10, cellHeight - 10)

      // Draw property ID
      ctx.fillStyle = "#ffffff"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.fillText(property.id, x + cellWidth / 2 - 5, y + cellHeight / 2 - 5)

      // Draw property type
      ctx.font = "10px Arial"
      ctx.fillText(property.type, x + cellWidth / 2 - 5, y + cellHeight / 2 + 10)
    })

    // Draw legend
    const legendX = canvas.width - 150
    const legendY = canvas.height - 100
    const legendItemHeight = 20

    const statuses = ["Active", "Under Auction", "Sold", "Pending"]

    ctx.font = "12px Arial"
    ctx.textAlign = "left"
    ctx.fillStyle = "#1a1a1a"
    ctx.fillText("Status Legend:", legendX, legendY)

    statuses.forEach((status, index) => {
      const y = legendY + (index + 1) * legendItemHeight

      // Draw color box
      ctx.fillStyle = getStatusColor(status as any)
      ctx.fillRect(legendX, y - 12, 12, 12)

      // Draw status text
      ctx.fillStyle = "#1a1a1a"
      ctx.fillText(status, legendX + 20, y)
    })
  }, [properties, blockName])

  // Helper function to get color based on property status
  function getStatusColor(status: string): string {
    switch (status) {
      case "Active":
        return "#10b981" // Green
      case "Under Auction":
        return "#3b82f6" // Blue
      case "Sold":
        return "#ef4444" // Red
      case "Pending":
        return "#f59e0b" // Amber
      default:
        return "#6b7280" // Gray
    }
  }

  return (
    <div className="w-full h-[400px] border rounded-lg overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  )
}
