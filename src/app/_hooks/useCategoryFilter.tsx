import { IQueryParam } from "@/types/filter"
import { useQueryString } from "./useQueryString"

export function useCategoryFilter({ query_id }: IQueryParam): {
    handleCategory: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
} {
    const { createQueryString } = useQueryString(true)

    const handleCategory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        createQueryString(query_id, event.currentTarget.value)
    }
    return { handleCategory }
}
