import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"
import { usePathname, useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"
import { useQueryString } from "./useQueryString"
import { useContextFilter } from "./useContextFilter"
import { IQueryParam } from "@/types/filter"

export function useSurfaceAreaFilter({ query_id }: IQueryParam): {
    handleSurfaceAreaSlider: (value: number | number[]) => void
    handleSurfaceAreaInput: (event: ChangeEvent<HTMLInputElement>) => void
} {
    const {
        selectedMinSurfaceArea,
        selectedMaxSurfaceArea,
        updateMinSurfaceArea,
        updateMaxSurfaceArea,
    } = useContextFilter()

    const { createQueryString } = useQueryString()

    const handleSurfaceAreaSlider = (value: number | number[]): void => {
        const updatedMinSurfaceAreaValue: number = Array.isArray(value)
            ? value[0]
            : selectedMinSurfaceArea
        const updatedMaxSurfaceAreaValue: number = Array.isArray(value)
            ? value[1]
            : selectedMaxSurfaceArea

        updateMinSurfaceArea(updatedMinSurfaceAreaValue)
        updateMaxSurfaceArea(updatedMaxSurfaceAreaValue)

        createQueryString(query_id, `${updatedMinSurfaceAreaValue}&${updatedMaxSurfaceAreaValue}`)
    }

    const handleSurfaceAreaInput = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value, id } = event.target
        const updatedMinSurfaceAreaValue: number =
            id === "min" ? parseInt(value) : selectedMinSurfaceArea
        const updatedMaxSurfaceAreaValue: number =
            id === "max" ? parseInt(value) : selectedMaxSurfaceArea

        updateMinSurfaceArea(updatedMinSurfaceAreaValue)
        updateMaxSurfaceArea(updatedMaxSurfaceAreaValue)

        createQueryString(query_id, `${updatedMinSurfaceAreaValue}&${updatedMaxSurfaceAreaValue}`)
    }

    return {
        handleSurfaceAreaSlider,
        handleSurfaceAreaInput,
    }
}
