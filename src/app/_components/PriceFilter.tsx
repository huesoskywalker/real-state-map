import Slider from "rc-slider"
import React, { ChangeEvent, useEffect } from "react"
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

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.currentTarget.value) <= 120000) handlePriceInput(e)
    }

    return (
        <div ref={priceRange} className="w-4/5 relative">
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
                    onChange={handleOnChange}
                    className="w-[74px] h-5 p-2 text-xs bg-gray-600 text-white rounded-md"
                />
                <span className="text-gray-300 mx-2">-</span>
                <input
                    type="number"
                    id="max"
                    value={selectedMaxPrice === 0 ? "" : selectedMaxPrice}
                    placeholder="max"
                    onChange={handleOnChange}
                    className="w-[74px] h-5 p-2 text-xs bg-gray-600 text-white rounded-md"
                />
            </div>
        </div>
    )
}

export default PriceFilter
