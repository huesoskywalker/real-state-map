import { MutableRefObject, useRef } from "react"

export function useSurfaceAreaPosition(): {
    updateSurfaceAreaPosition: ({
        selectedMinSurfaceArea,
        selectedMaxSurfaceArea,
    }: {
        selectedMinSurfaceArea: number
        selectedMaxSurfaceArea: number
    }) => void
    surfaceAreaRange: MutableRefObject<HTMLDivElement | null>
    surfaceAreaMinSpan: MutableRefObject<HTMLSpanElement | null>
    surfaceAreaMaxSpan: MutableRefObject<HTMLSpanElement | null>
} {
    const surfaceAreaRange = useRef<HTMLDivElement | null>(null)
    const surfaceAreaMinSpan = useRef<HTMLSpanElement | null>(null)
    const surfaceAreaMaxSpan = useRef<HTMLSpanElement | null>(null)
    const updateSurfaceAreaPosition = ({
        selectedMinSurfaceArea,
        selectedMaxSurfaceArea,
    }: {
        selectedMinSurfaceArea: number
        selectedMaxSurfaceArea: number
    }): void => {
        if (surfaceAreaMinSpan.current && surfaceAreaMaxSpan.current && surfaceAreaRange.current) {
            const range: HTMLDivElement = surfaceAreaRange.current
            const min: number = parseInt(range.getAttribute("min") || "0")
            const max: number = parseInt(range.getAttribute("max") || "2500")
            const width: number = range.offsetWidth
            const left: number = ((selectedMinSurfaceArea - min) / (max - min)) * width
            const right: number = ((selectedMaxSurfaceArea - min) / (max + 400 - min)) * width

            surfaceAreaMinSpan.current.style.left = `${left}px`
            surfaceAreaMaxSpan.current.style.left = `${right}px`
        }
    }
    return { updateSurfaceAreaPosition, surfaceAreaRange, surfaceAreaMinSpan, surfaceAreaMaxSpan }
}
