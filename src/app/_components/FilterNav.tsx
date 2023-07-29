"use client"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import clsx from "clsx"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import { Category } from "@/types/property"
import { category } from "../utils/data"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"

const FilterNav = () => {
    const [selectedMinSurfaceArea, setSelectedMinSurfaceArea] = useState<number>(0)
    const [selectedMaxSurfaceArea, setSelectedMaxSurfaceArea] = useState<number>(2500)
    const [selectedMinPrice, setSelectedMinPrice] = useState<number>(0)
    const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(120000)

    const surfaceAreaRange = useRef<HTMLDivElement | null>(null)
    const surfaceAreaMinSpan = useRef<HTMLSpanElement | null>(null)
    const surfaceAreaMaxSpan = useRef<HTMLSpanElement | null>(null)

    const priceRange = useRef<HTMLDivElement | null>(null)
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
        setSelectedMinSurfaceArea(0)
        setSelectedMaxSurfaceArea(2500)
        setSelectedMinPrice(0)
        setSelectedMaxPrice(120000)

        router.push(pathname)
    }
    const handleCategory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const categoryParam: URLSearchParams = createQueryString(
            "category",
            event.currentTarget.value
        )
        router.push(pathname + "?" + categoryParam)
    }

    const handlePrice = (value: number | number[], id?: string): void => {
        const updatedMinPrice =
            typeof value === "number" && id === "min"
                ? value
                : Array.isArray(value)
                ? value[0]
                : selectedMinPrice

        const updatedMaxPrice =
            typeof value === "number" && id === "max"
                ? value
                : Array.isArray(value)
                ? value[1]
                : selectedMaxPrice

        setSelectedMinPrice(updatedMinPrice)
        setSelectedMaxPrice(updatedMaxPrice)

        const surfaceAreaParam: URLSearchParams = createQueryString(
            "price",
            `${updatedMinPrice}&${updatedMaxPrice}`
        )
        router.push(pathname + "?" + surfaceAreaParam)
    }

    const updatePricePosition = (): void => {
        if (priceMinSpan.current && priceMaxSpan.current && priceRange.current) {
            const range = priceRange.current
            const min = parseInt(range.getAttribute("min") || "0")
            const max = parseInt(range.getAttribute("max") || "120000")
            const width = range.offsetWidth
            const left = ((selectedMinPrice - min) / (max - min)) * width
            const right = ((selectedMaxPrice - min) / (max + 20000 - min)) * width

            priceMinSpan.current.style.left = `${left}px`
            priceMaxSpan.current.style.left = `${right}px`
        }
    }
    const handleSurfaceArea = (value: number | number[], id?: string): void => {
        const updatedMinSurfaceArea =
            typeof value === "number" && id === "min"
                ? value
                : Array.isArray(value)
                ? value[0]
                : selectedMinSurfaceArea
        const updatedMaxSurfaceArea =
            typeof value === "number" && id === "max"
                ? value
                : Array.isArray(value)
                ? value[1]
                : selectedMaxSurfaceArea

        setSelectedMinSurfaceArea(updatedMinSurfaceArea)
        setSelectedMaxSurfaceArea(updatedMaxSurfaceArea)

        const surfaceAreaParam: URLSearchParams = createQueryString(
            "surfaceArea",
            `${updatedMinSurfaceArea}&${updatedMaxSurfaceArea}`
        )
        router.push(pathname + "?" + surfaceAreaParam)
    }

    const updateSurfaceAreaPosition = (): void => {
        if (surfaceAreaMinSpan.current && surfaceAreaMaxSpan.current && surfaceAreaRange.current) {
            const range = surfaceAreaRange.current
            const min = parseInt(range.getAttribute("min") || "0")
            const max = parseInt(range.getAttribute("max") || "2500")
            const width = range.offsetWidth
            const left = ((selectedMinSurfaceArea - min) / (max - min)) * width
            const right = ((selectedMaxSurfaceArea - min) / (max + 400 - min)) * width

            surfaceAreaMinSpan.current.style.left = `${left}px`
            surfaceAreaMaxSpan.current.style.left = `${right}px`
        }
    }

    const FilterNavItems = ({ item }: { item: Category }): React.JSX.Element => {
        const categoryName: string | null = searchParams.get("category")
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

    useEffect(() => {
        updatePricePosition()
        updateSurfaceAreaPosition()
    }, [selectedMinPrice, selectedMaxPrice, selectedMinSurfaceArea, selectedMaxSurfaceArea])

    return (
        <div className="fixed top-0 z-100 flex xl:w-48 bottom-0 flex-col border-b border-gray-800 bg-gray-900 lg:bottom-0 lg:z-auto lg:w-40 lg:border-r lg:border-gray-800">
            <div className="group h-14 flex items-center py-4 px-4 lg:h-auto">
                <nav className="space-y-3 px-1 py-5 flex flex-col items-center justify-center">
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
                    <label className="text-gray-200 text-xs">Category</label>
                    <div className="p-4 space-y-4 flex flex-col items-center justify-center border rounded-lg border-gray-700">
                        {category.map((item) => {
                            return <FilterNavItems key={item.name} item={item} />
                        })}
                    </div>
                    <div ref={priceRange} className="w-full px-2 relative">
                        <label className="text-gray-400 text-xs font-medium">Price</label>
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
                            className="text-gray-300 px-1 bg-blue-500 rounded-md text-[12px] font-medium absolute bottom-8"
                        >
                            {selectedMinPrice}
                        </span>
                        <span
                            ref={priceMaxSpan}
                            className="text-gray-300 px-1 bg-blue-500 rounded-md text-[12px] font-medium absolute bottom-8 "
                        >
                            {selectedMaxPrice}
                        </span>
                        <div className="flex justify-center mt-7">
                            <input
                                type="number"
                                id="min"
                                value={selectedMinPrice === 0 ? "" : selectedMinPrice}
                                placeholder="min"
                                onChange={(event) => {
                                    handlePrice(parseInt(event.target.value), event.target.id)
                                }}
                                className="w-[66px] h-5 p-2 text-xs bg-gray-800 text-gray-300 rounded-md"
                            />
                            <span className="text-gray-300 mx-2">-</span>
                            <input
                                type="number"
                                id="max"
                                value={selectedMaxPrice === 0 ? "" : selectedMaxPrice}
                                placeholder="max"
                                onChange={(event) => {
                                    handlePrice(parseInt(event.target.value), event.target.id)
                                }}
                                className="w-[75px] h-5 p-2 text-xs bg-gray-800 text-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <div ref={surfaceAreaRange} className="w-full px-2 relative">
                        <label className="text-gray-400 text-xs font-medium">SurfaceArea</label>
                        <Slider
                            range
                            min={0}
                            max={2500}
                            step={10}
                            value={[selectedMinSurfaceArea, selectedMaxSurfaceArea]}
                            onChange={(value: number | number[]) => handleSurfaceArea(value)}
                            allowCross={false}
                        />
                        <span
                            ref={surfaceAreaMinSpan}
                            className="text-gray-300 px-1 bg-blue-500 rounded-md text-[12px] font-medium absolute bottom-8 "
                        >
                            {selectedMinSurfaceArea}
                        </span>
                        <span
                            ref={surfaceAreaMaxSpan}
                            className="text-gray-300 px-1 bg-blue-500 rounded-md text-[12px] font-medium absolute bottom-8 "
                        >
                            {selectedMaxSurfaceArea}
                        </span>{" "}
                        <div className="flex justify-center mt-7">
                            <input
                                type="number"
                                id="min"
                                value={selectedMinSurfaceArea === 0 ? "" : selectedMinSurfaceArea}
                                placeholder="min"
                                onChange={(event) => {
                                    handleSurfaceArea(
                                        parseInt(event.target.value),
                                        event.target.id
                                    )
                                }}
                                className="w-[66px] h-5 p-2 text-xs bg-gray-800 text-gray-300 rounded-md"
                            />
                            <span className="text-gray-300 mx-2">-</span>
                            <input
                                type="number"
                                id="max"
                                value={selectedMaxSurfaceArea === 0 ? "" : selectedMaxSurfaceArea}
                                placeholder="max"
                                onChange={(event) => {
                                    handleSurfaceArea(
                                        parseInt(event.target.value),
                                        event.target.id
                                    )
                                }}
                                className="w-[66px] h-5 p-2 text-xs bg-gray-800 text-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default FilterNav
