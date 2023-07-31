"use client"
import { ChangeEvent } from "react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"
import { usePathname, useRouter } from "next/navigation"
import { useContextFilter } from "./useContextFilter"
import { IQueryParam } from "@/types/filter"
import { useQueryString } from "./useQueryString"

export function usePriceFilter({ query_id }: IQueryParam): {
    handlePriceSlider: (value: number | number[]) => void
    handlePriceInput: (event: ChangeEvent<HTMLInputElement>) => void
} {
    const { updateMinPrice, updateMaxPrice, selectedMinPrice, selectedMaxPrice } =
        useContextFilter()

    const router: AppRouterInstance = useRouter()
    const pathname: string = usePathname()

    const { createQueryString } = useQueryString()
    const handlePriceSlider = (value: number | number[]): void => {
        const updatedMinPriceValue: number = Array.isArray(value) ? value[0] : selectedMinPrice

        const updatedMaxPriceValue: number = Array.isArray(value) ? value[1] : selectedMaxPrice

        updateMinPrice(updatedMinPriceValue)
        updateMaxPrice(updatedMaxPriceValue)

        const surfaceAreaParam: URLSearchParams = createQueryString(
            query_id,
            `${updatedMinPriceValue}&${updatedMaxPriceValue}`
        )
        router.push(pathname + "?" + surfaceAreaParam)
    }
    const handlePriceInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, id } = event.target

        const updatedMinPriceValue: number = id === "min" ? parseInt(value) : selectedMinPrice
        const updatedMaxPriceValue: number = id === "max" ? parseInt(value) : selectedMaxPrice

        updateMinPrice(updatedMinPriceValue)
        updateMaxPrice(updatedMaxPriceValue)

        const surfaceAreaParam: URLSearchParams = createQueryString(
            query_id,
            `${updatedMinPriceValue}&${updatedMaxPriceValue}`
        )
        router.push(pathname + "?" + surfaceAreaParam)
    }

    return {
        handlePriceSlider,
        handlePriceInput,
    }
}
