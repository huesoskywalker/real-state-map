import { usePathname, useRouter } from "next/navigation"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"
import { IQueryParam } from "@/types/filter"
import { useQueryString } from "./useQueryString"

export function useCategoryFilter({ query_id }: IQueryParam): {
    handleCategory: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
} {
    const router: AppRouterInstance = useRouter()
    const pathname: string = usePathname()

    const { createQueryString } = useQueryString()

    const handleCategory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const categoryParam: URLSearchParams = createQueryString(
            query_id,
            event.currentTarget.value
        )
        router.push(pathname + "?" + categoryParam)
    }
    return { handleCategory }
}
