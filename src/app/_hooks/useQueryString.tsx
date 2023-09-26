"use client"
import { DebouncedFunc, debounce } from "lodash"
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export function useQueryString(): {
    createQueryString: DebouncedFunc<(name: string, value: string) => void>
} {
    const pathname: string = usePathname()
    const router = useRouter()
    const searchParams: ReadonlyURLSearchParams = useSearchParams()
    const createQueryString = useCallback(
        debounce((name: string, value: string) => {
            const params: URLSearchParams = new URLSearchParams(searchParams?.toString())
            params.set(name, value)
            router.push(pathname + "?" + params)
        }, 500),
        [searchParams]
    )
    return { createQueryString }
}
