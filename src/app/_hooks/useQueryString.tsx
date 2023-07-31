import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export function useQueryString(): {
    createQueryString: (name: string, value: string) => URLSearchParams
} {
    const searchParams: ReadonlyURLSearchParams = useSearchParams()
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params: URLSearchParams = new URLSearchParams(searchParams?.toString())
            params.set(name, value)
            return params
        },
        [searchParams]
    )
    return { createQueryString }
}
