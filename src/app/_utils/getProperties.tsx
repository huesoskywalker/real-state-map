import { Property } from "@/types/property"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getProperties = async ({
    searchParams,
}: {
    searchParams: URLSearchParams
}): Promise<Property[]> => {
    try {
        const data = await fetch(`${API_URL}/api/properties?${searchParams}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
        })
        const properties = await data.json()

        return properties
    } catch (error) {
        throw new Error(`An unexpected Error Occurred, ${error}`)
    }
}

export default getProperties
