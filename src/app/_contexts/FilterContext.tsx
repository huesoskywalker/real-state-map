import { IFilterContext } from "@/types/context"
import { priceFilterOptions, surfaceAreaFilterOptions } from "@/utils/options"
import { createContext } from "react"

export const FilterContext = createContext<IFilterContext>({
    clearFilters: (): void => {},
    updateMinPrice: (selectedMinPrice: number): void => {},
    updateMaxPrice: (selectedMaxPrice: number): void => {},
    updateMinSurfaceArea: (selectedMinSurfaceArea: number): void => {},
    updateMaxSurfaceArea: (selectedMaxSurfaceArea: number): void => {},
    selectedMinPrice: priceFilterOptions.defaultMinValue,
    selectedMaxPrice: priceFilterOptions.defaultMaxValue,
    selectedMinSurfaceArea: surfaceAreaFilterOptions.defaultMinValue,
    selectedMaxSurfaceArea: surfaceAreaFilterOptions.defaultMaxValue,
})

export default FilterContext
