import { useState } from "react"
import { IProperty } from "@/types/property"

export function useSelectedProperty(): {
    selectedProperty: IProperty | null
    selectProperty: (property: IProperty) => void
    clearSelectedProperty: () => void
} {
    const [selectedProperty, setSelectedProperty] = useState<IProperty | null>(null)

    const selectProperty = (property: IProperty) => {
        setSelectedProperty(property)
    }

    const clearSelectedProperty = () => {
        setSelectedProperty(null)
    }

    return { selectedProperty, selectProperty, clearSelectedProperty }
}
