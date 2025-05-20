import { properties } from "@/data/properties"
import { propertyBlocks } from "@/data/property-blocks"
import type { Property } from "@/types/property"
import type { PropertyBlock } from "@/types/property-block"

export function getPropertiesByBlockId(blockId: string): Property[] {
  const block = propertyBlocks.find((b) => b.id === blockId)
  if (!block) return []

  // If the block has property IDs, fetch the actual properties
  if (block.properties.length > 0 && typeof block.properties[0] === "string") {
    const propertyIds = block.properties as string[]
    return properties.filter((p) => propertyIds.includes(p.id))
  }

  // If the block already has property objects
  if (block.properties.length > 0 && typeof block.properties[0] !== "string") {
    return block.properties as Property[]
  }

  return []
}

export function getBlockById(blockId: string): PropertyBlock | undefined {
  return propertyBlocks.find((b) => b.id === blockId)
}
