import { category } from "@/utils/data"
import React from "react"
import { FilterNavItems } from "./FilterNavItems"

const CategoryFilter = (): React.JSX.Element => {
    return (
        <div className="p-2 space-y-4 text-sm flex flex-col items-center justify-center border rounded-lg border-gray-500">
            {category.map((item) => {
                return <FilterNavItems key={item.name} item={item} />
            })}
        </div>
    )
}

export default CategoryFilter
