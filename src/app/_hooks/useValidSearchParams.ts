import { ISearchParams } from "@/types/property"

const useValidSearchParams = (
    searchParams: Partial<ISearchParams>
): { validSearchParams: URLSearchParams } => {
    const sanitizeParams: Partial<ISearchParams> = Object.keys(searchParams).reduce<
        Partial<ISearchParams>
    >((acc, key) => {
        if (searchParams[key as keyof ISearchParams] !== undefined) {
            acc[key as keyof ISearchParams] = searchParams[key as keyof ISearchParams]
        }
        return acc
    }, {})

    const validSearchParams: URLSearchParams = new URLSearchParams(sanitizeParams)

    return { validSearchParams }
}

export default useValidSearchParams
