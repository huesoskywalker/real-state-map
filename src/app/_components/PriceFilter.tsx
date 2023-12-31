import Slider from "rc-slider"
import React, { useEffect } from "react"
import { priceQueryParam } from "@/utils/options"
import { usePriceFilter } from "../_hooks/usePriceFilter"
import { useContextFilter } from "../_hooks/useContextFilter"
import { usePricePosition } from "../_hooks/usePricePosition"

const PriceFilter = (): React.JSX.Element => {
    const { handlePriceSlider, handlePriceInput } = usePriceFilter(priceQueryParam)
    const { selectedMinPrice, selectedMaxPrice } = useContextFilter()

    const { updatePricePosition, priceRange, priceMinSpan, priceMaxSpan } = usePricePosition()

    useEffect(() => {
        updatePricePosition({ selectedMinPrice, selectedMaxPrice })
    }, [selectedMinPrice, selectedMaxPrice])
    return (
        <div ref={priceRange} className="w-full px-2 relative">
            <label className="text-gray-400 text-xs font-medium">Price</label>
            <Slider
                range
                min={0}
                max={120000}
                step={10}
                value={[selectedMinPrice, selectedMaxPrice]}
                onChange={handlePriceSlider}
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
                    onChange={handlePriceInput}
                    className="w-[66px] h-5 p-2 text-xs bg-gray-800 text-gray-300 rounded-md"
                />
                <span className="text-gray-300 mx-2">-</span>
                <input
                    type="number"
                    id="max"
                    value={selectedMaxPrice === 0 ? "" : selectedMaxPrice}
                    placeholder="max"
                    onChange={handlePriceInput}
                    className="w-[66px] h-5 p-2 text-xs bg-gray-800 text-gray-300 rounded-md"
                />
            </div>
        </div>
    )
}

export default PriceFilter
