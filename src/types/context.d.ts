import { IFilterOptions } from "./filter"

export interface IFilterContext {
    selectedMinPrice: number
    selectedMaxPrice: number
    selectedMinSurfaceArea: number
    selectedMaxSurfaceArea: number
    clearFilters: () => void
    updateMinPrice: (selectedMinPrice: number) => void
    updateMaxPrice: (selectedMaxPrice: number) => void
    updateMinSurfaceArea: (selectedMinSurfaceArea: number) => void
    updateMaxSurfaceArea: (selectedMaxSurfaceArea: number) => void
}

export interface IFilterContextProvider {
    priceFilterOptions: IFilterOptions
    surfaceAreaFilterOptions: IFilterOptions
}
