import type { PropertyBlock } from "@/types/property-block"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CustomAttributesProps {
  block: PropertyBlock
}

export function CustomAttributes({ block }: CustomAttributesProps) {
  if (!block.customAttributes || Object.keys(block.customAttributes).length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Block Attributes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(block.customAttributes).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <p className="text-sm font-medium capitalize">{key}</p>
              <p className="text-sm text-muted-foreground">{value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
