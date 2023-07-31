import { MutableRefObject, useRef } from "react"

export function usePricePosition(): {
    updatePricePosition: ({
        selectedMinPrice,
        selectedMaxPrice,
    }: {
        selectedMinPrice: number
        selectedMaxPrice: number
    }) => void
    priceRange: MutableRefObject<HTMLDivElement | null>
    priceMinSpan: MutableRefObject<HTMLSpanElement | null>
    priceMaxSpan: MutableRefObject<HTMLSpanElement | null>
} {
    const priceRange = useRef<HTMLDivElement | null>(null)
    const priceMinSpan = useRef<HTMLSpanElement | null>(null)
    const priceMaxSpan = useRef<HTMLSpanElement | null>(null)
    const updatePricePosition = ({
        selectedMinPrice,
        selectedMaxPrice,
    }: {
        selectedMinPrice: number
        selectedMaxPrice: number
    }): void => {
        if (priceMinSpan.current && priceMaxSpan.current && priceRange.current) {
            const range: HTMLDivElement = priceRange.current
            const min: number = parseInt(range.getAttribute("min") || "0")
            const max: number = parseInt(range.getAttribute("max") || "120000")
            const width: number = range.offsetWidth
            const left: number = ((selectedMinPrice - min) / (max - min)) * width
            const right: number = ((selectedMaxPrice - min) / (max + 20000 - min)) * width

            priceMinSpan.current.style.left = `${left}px`
            priceMaxSpan.current.style.left = `${right}px`
        }
    }
    return { updatePricePosition, priceRange, priceMinSpan, priceMaxSpan }
}
