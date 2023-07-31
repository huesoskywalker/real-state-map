"use client"
import { IFilterContext, IFilterContextProvider } from "@/types/context"
import { ReactNode, useState } from "react"
import FilterContext from "../_contexts/FilterContext"
import { usePathname, useRouter } from "next/navigation"

export function FilterContextProvider({
    priceFilterOptions,
    surfaceAreaFilterOptions,
    children,
}: IFilterContextProvider & { children: ReactNode }) {
    const { defaultMinValue: defaultMinPriceValue, defaultMaxValue: defaultMaxPriceValue } =
        priceFilterOptions
    const { defaultMinValue: defaultMinSurfaceValue, defaultMaxValue: defaultMaxSurfaceValue } =
        surfaceAreaFilterOptions
    const [selectedMinPrice, setSelectedMinPrice] = useState<number>(defaultMinPriceValue)
    const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(defaultMaxPriceValue)
    const [selectedMinSurfaceArea, setSelectedMinSurfaceArea] =
        useState<number>(defaultMinSurfaceValue)
    const [selectedMaxSurfaceArea, setSelectedMaxSurfaceArea] =
        useState<number>(defaultMaxSurfaceValue)

    const pathname = usePathname()
    const router = useRouter()
    const clearFilters = () => {
        setSelectedMinPrice(defaultMinPriceValue)
        setSelectedMaxPrice(defaultMaxPriceValue)
        setSelectedMinSurfaceArea(defaultMinSurfaceValue)
        setSelectedMaxSurfaceArea(defaultMaxSurfaceValue)
        router.push(pathname)
    }

    const updateMinPrice = (minPrice: number) => {
        setSelectedMinPrice(minPrice)
    }

    const updateMaxPrice = (maxPrice: number) => {
        setSelectedMaxPrice(maxPrice)
    }

    const updateMinSurfaceArea = (minSurfaceArea: number) => {
        setSelectedMinSurfaceArea(minSurfaceArea)
    }

    const updateMaxSurfaceArea = (maxSurfaceArea: number) => {
        setSelectedMaxSurfaceArea(maxSurfaceArea)
    }
    const contextValue: IFilterContext = {
        clearFilters,
        updateMinPrice,
        updateMaxPrice,
        updateMinSurfaceArea,
        updateMaxSurfaceArea,
        selectedMinPrice,
        selectedMaxPrice,
        selectedMinSurfaceArea,
        selectedMaxSurfaceArea,
    }
    return <FilterContext.Provider value={contextValue}>{children}</FilterContext.Provider>
}
