"use client"
import React from "react"
import "rc-slider/assets/index.css"
import PriceFilter from "./PriceFilter"
import ClearFilters from "./ClearFilters"
import SurfaceAreaFilter from "./SurfaceAreaFilter"
import CategoryFilter from "./CategoryFilter"

const FilterNav = (): React.JSX.Element => {
    return (
        <div className="fixed min-h-screen top-0 pl-2 flex flex-col justify-between bg-gray-800 py-2 border-r border-gray-500 w-56">
            <div className="group h-auto flex items-center py-4 px-4">
                <nav className="space-y-3 px-1 flex flex-col items-center justify-center">
                    <ClearFilters />
                    <span className="text-gray-200 text-xs">Category</span>
                    <CategoryFilter />
                    <PriceFilter />
                    <SurfaceAreaFilter />
                </nav>
            </div>
        </div>
    )
}

export default FilterNav
