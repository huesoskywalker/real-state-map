"use client"
import React, { useCallback, useRef, useState } from "react"
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import clsx from "clsx"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import { Category } from "@/types/property"
import { category } from "../utils/data"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"

const FilterNav = () => {
    const [selectedSurfaceArea, setSelectedSurfaceArea] = useState<number>(2500)
    const [selectedMinPrice, setSelectedMinPrice] = useState<number>(0)
    const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(120000)

    const surfaceAreaRange = useRef<HTMLInputElement | null>(null)
    const surfaceAreaSpan = useRef<HTMLSpanElement | null>(null)
    const priceMinSpan = useRef<HTMLSpanElement | null>(null)
    const priceMaxSpan = useRef<HTMLSpanElement | null>(null)

    const router: AppRouterInstance = useRouter()
    const pathname: string = usePathname()
    const searchParams: ReadonlyURLSearchParams = useSearchParams()

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params: URLSearchParams = new URLSearchParams(searchParams?.toString())
            params.set(name, value)
            return params
        },
        [searchParams]
    )
    const handleClearFilters = (): void => {
        setSelectedSurfaceArea(2500)
        setSelectedMinPrice(0)
        setSelectedMaxPrice(120000)
        if (surfaceAreaSpan.current && surfaceAreaRange.current) {
            const containerWidth: number = surfaceAreaRange.current.offsetWidth
            surfaceAreaSpan.current.style.left = `${containerWidth}px`
        }
        router.push(pathname)
    }
    const handleCategory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const categoryParam: URLSearchParams = createQueryString(
            "categoria",
            event.currentTarget.value
        )
        router.push(pathname + "?" + categoryParam)
    }

    const handlePrice = (value: number | number[]): void => {
        if (typeof value === "number") return
        setSelectedMinPrice(value[0])
        setSelectedMaxPrice(value[1])
        const surfaceAreaParam: URLSearchParams = createQueryString(
            "precio",
            `${selectedMinPrice}&${selectedMaxPrice}`
        )
        router.push(pathname + "?" + surfaceAreaParam)
        updatePricePosition()
    }

    const handleSurfaceArea = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const selectedSurfaceValue: number = parseInt(event.target.value)
        setSelectedSurfaceArea(selectedSurfaceValue)
        const surfaceAreaParam: URLSearchParams = createQueryString(
            "superficie",
            event.target.value
        )
        router.push(pathname + "?" + surfaceAreaParam)
        updateSurfaceAreaPosition()
    }

    const updateSurfaceAreaPosition = (): void => {
        if (surfaceAreaRange.current && surfaceAreaSpan.current) {
            const range: HTMLInputElement = surfaceAreaRange.current
            const span: HTMLSpanElement = surfaceAreaSpan.current
            const min: number = parseInt(range.min)
            const max: number = parseInt(range.max)
            const width: number = range.offsetWidth
            const leftOffset: number = ((selectedSurfaceArea - min) / (max - min)) * width
            span.style.left = `${leftOffset}px`
        }
    }

    const updatePricePosition = (): void => {
        if (priceMinSpan.current && priceMaxSpan.current) {
            const slider: Element | null = document.querySelector(".rc-slider")
            const sliderRect: DOMRect | undefined = slider?.getBoundingClientRect()
            const left: number = ((selectedMinPrice - 0) / (120000 - 0)) * sliderRect!.width
            const right: number = ((selectedMaxPrice - 0) / (120000 - 0)) * sliderRect!.width

            priceMinSpan.current.style.left = `${left}px`
            priceMaxSpan.current.style.left = `${right}px`
        }
    }

    const FilterNavItems = ({ item }: { item: Category }): React.JSX.Element => {
        const categoryName: string | null = searchParams.get("categoria")
        const isActive: boolean = item.name === categoryName
        return (
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                    handleCategory(event)
                }
                value={item.name}
                className={clsx(
                    "block rounded-md px-3 py-2 text-xs font-medium hover:text-gray-200",
                    {
                        "text-gray-400 hover:bg-gray-800": !isActive,
                        "text-white ": isActive,
                    }
                )}
            >
                {item.name}
            </button>
        )
    }

    return (
        <div className="fixed top-0 z-100 flex xl:w-48 bottom-0 flex-col border-b border-gray-800 bg-gray-900 lg:bottom-0 lg:z-auto lg:w-40 lg:border-r lg:border-gray-800">
            <div className="group h-14 flex items-center py-4 px-4 lg:h-auto">
                <nav className="space-y-6 px-1 py-5 flex flex-col items-center justify-center">
                    <button
                        onClick={handleClearFilters}
                        className={
                            "rounded-md px-3 py-2 text-xs font-medium text-gray-400 hover:text-gray-300 hover:bg-gray-800 border border-gray-700"
                        }
                    >
                        <span className="flex flex-row">
                            Clear Filters
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1.2em"
                                viewBox="0 0 448 512"
                                className="mx-2 fill-current text-yellow-700"
                            >
                                <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                            </svg>
                        </span>
                    </button>
                    <label className="text-gray-200 text-xs">Categoria</label>
                    <div className="p-4 space-y-4 flex flex-col items-center justify-center border rounded-lg border-gray-700">
                        {category.map((item) => {
                            return <FilterNavItems key={item.name} item={item} />
                        })}
                    </div>
                    <div className="w-full px-4 relative">
                        <label className="text-gray-400 text-xs font-medium">Precio</label>
                        <Slider
                            range
                            min={0}
                            max={120000}
                            step={10}
                            value={[selectedMinPrice, selectedMaxPrice]}
                            onChange={(value: number | number[]) => handlePrice(value)}
                            allowCross={false}
                        />
                        <span
                            ref={priceMinSpan}
                            className="text-gray-300 px-1 bg-blue-500 rounded-md text-[12px] font-medium absolute -bottom-5 -mt-5"
                        >
                            {selectedMinPrice}
                        </span>
                        <span
                            ref={priceMaxSpan}
                            className="text-gray-300 px-1 bg-blue-500 rounded-md text-[12px] font-medium absolute -bottom-5 -mt-5"
                        >
                            {selectedMaxPrice}
                        </span>
                    </div>
                    <div className="w-full px-4 relative">
                        <label className="text-gray-400 text-xs font-medium">Superficie</label>
                        <input
                            ref={surfaceAreaRange}
                            type="range"
                            min="0"
                            max="2500"
                            step="100"
                            value={selectedSurfaceArea}
                            onChange={handleSurfaceArea}
                            className="w-full mt-2 bg-blue-500"
                        />
                        <span
                            ref={surfaceAreaSpan}
                            className="text-gray-300 px-1 bg-blue-500 rounded-md text-[12px] font-medium absolute -bottom-3 -mt-5"
                        >
                            {selectedSurfaceArea}
                        </span>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default FilterNav
