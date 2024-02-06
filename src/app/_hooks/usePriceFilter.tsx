"use client"
import { ChangeEvent } from "react"
import { useContextFilter } from "./useContextFilter"
import { IQueryParam } from "@/types/filter"
import { useQueryString } from "./useQueryString"

export function usePriceFilter({ query_id }: IQueryParam): {
    handlePriceSlider: (value: number | number[]) => void
    handlePriceInput: (event: ChangeEvent<HTMLInputElement>) => void
} {
    const { updateMinPrice, updateMaxPrice, selectedMinPrice, selectedMaxPrice } =
        useContextFilter()

    const { createQueryString } = useQueryString()
    const handlePriceSlider = (value: number | number[]): void => {
        const updatedMinPriceValue: number = Array.isArray(value) ? value[0] : selectedMinPrice

        const updatedMaxPriceValue: number = Array.isArray(value) ? value[1] : selectedMaxPrice

        updateMinPrice(updatedMinPriceValue)
        updateMaxPrice(updatedMaxPriceValue)

        createQueryString(query_id, `${updatedMinPriceValue}&${updatedMaxPriceValue}`)
    }
    const handlePriceInput = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value, id } = event.target

        const updatedMinPriceValue: number = id === "minPrice" ? parseInt(value) : selectedMinPrice
        const updatedMaxPriceValue: number = id === "maxPrice" ? parseInt(value) : selectedMaxPrice

        updateMinPrice(updatedMinPriceValue)
        updateMaxPrice(updatedMaxPriceValue)

        createQueryString(query_id, `${updatedMinPriceValue}&${updatedMaxPriceValue}`)
    }

    return {
        handlePriceSlider,
        handlePriceInput,
    }
}
