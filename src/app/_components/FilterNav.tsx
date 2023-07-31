"use client"
import React from "react"
import "rc-slider/assets/index.css"
import PriceFilter from "./PriceFilter"
import ClearFilters from "./ClearFilters"
import SurfaceAreaFilter from "./SurfaceAreaFilter"
import CategoryFilter from "./CategoryFilter"

const FilterNav = (): React.JSX.Element => {
    return (
        <div className="fixed top-0 z-100 flex xl:w-48 bottom-0 flex-col border-b border-gray-800 bg-gray-900 lg:bottom-0 lg:z-auto lg:w-40 lg:border-r lg:border-gray-800">
            <div className="group h-14 flex items-center py-4 px-4 lg:h-auto">
                <nav className="space-y-3 px-1 py-5 flex flex-col items-center justify-center">
                    <ClearFilters />
                    <label className="text-gray-200 text-xs">Category</label>
                    <CategoryFilter />
                    <PriceFilter />
                    <SurfaceAreaFilter />
                </nav>
            </div>
        </div>
    )
}

export default FilterNav
