import { ICategory } from "@/types/property"
import clsx from "clsx"
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { categoryQueryParam } from "@/utils/options"
import { useCategoryFilter } from "../_hooks/useCategoryFilter"

export const FilterNavItems = ({ item }: { item: ICategory }): React.JSX.Element => {
    const searchParams: ReadonlyURLSearchParams = useSearchParams()

    const { handleCategory } = useCategoryFilter(categoryQueryParam)
    const categoryName: string | null = searchParams.get(item.name)
    const isActive: boolean = item.name === categoryName
    return (
        <button
            onClick={handleCategory}
            value={item.name}
            className={clsx("block rounded-md px-3 py-2 text-xs font-medium hover:text-gray-200", {
                "text-gray-400 hover:bg-gray-800": !isActive,
                "text-white ": isActive,
            })}
        >
            {item.name}
        </button>
    )
}
