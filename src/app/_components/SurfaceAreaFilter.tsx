import React, { ChangeEvent, useEffect } from "react"
import Slider from "rc-slider"
import { surfaceAreaQueryParam } from "@/utils/options"
import { useSurfaceAreaFilter } from "../_hooks/useSurfaceAreaFilter"
import { useContextFilter } from "../_hooks/useContextFilter"
import { useSurfaceAreaPosition } from "../_hooks/useSurfaceAreaPosition"

const SurfaceAreaFilter = (): React.JSX.Element => {
    const { handleSurfaceAreaSlider, handleSurfaceAreaInput } =
        useSurfaceAreaFilter(surfaceAreaQueryParam)
    const { selectedMinSurfaceArea, selectedMaxSurfaceArea } = useContextFilter()

    const { updateSurfaceAreaPosition, surfaceAreaRange, surfaceAreaMinSpan, surfaceAreaMaxSpan } =
        useSurfaceAreaPosition()

    useEffect(() => {
        updateSurfaceAreaPosition({ selectedMinSurfaceArea, selectedMaxSurfaceArea })
    }, [selectedMinSurfaceArea, selectedMaxSurfaceArea])

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value) <= 2500) {
            handleSurfaceAreaInput(e)
        }
    }

    return (
        <div ref={surfaceAreaRange} className="w-4/5 relative">
            <label className="text-gray-400 text-xs font-medium">Surface Area</label>
            <Slider
                range
                min={0}
                max={2500}
                step={10}
                value={[selectedMinSurfaceArea, selectedMaxSurfaceArea]}
                onChange={handleSurfaceAreaSlider}
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
                    onChange={handleOnChange}
                    className="w-[66px] h-5 p-2 text-xs bg-gray-600 text-white rounded-md"
                />
                <span className="text-gray-300 mx-2">-</span>
                <input
                    type="number"
                    id="max"
                    value={selectedMaxSurfaceArea === 0 ? "" : selectedMaxSurfaceArea}
                    placeholder="max"
                    onChange={handleOnChange}
                    className="w-[66px] h-5 p-2 text-xs bg-gray-600 text-white rounded-md"
                />
            </div>
        </div>
    )
}

export default SurfaceAreaFilter
