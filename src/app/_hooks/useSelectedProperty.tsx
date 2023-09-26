import { useState } from "react"
import { Property } from "@/types/property"

export function useSelectedProperty(): {
    selectedProperty: Property | null
    selectProperty: (property: Property) => void
    clearSelectedProperty: () => void
} {
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

    const selectProperty = (property: Property) => {
        setSelectedProperty(property)
    }

    const clearSelectedProperty = () => {
        setSelectedProperty(null)
    }

    return { selectedProperty, selectProperty, clearSelectedProperty }
}
