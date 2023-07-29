import { IResponseHeaders } from "@/types/axios"
import { IProperty } from "@/types/property"
import axios, { AxiosResponse } from "axios"
export const getProperties = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string }
}): Promise<IProperty[]> => {
    const properties: AxiosResponse<IProperty[], IResponseHeaders> = await axios.post(
        `http://localhost:3000/api/properties`,
        {
            searchParams,
        }
    )
    if (properties.status !== 200) throw new Error("Failed to fetch properties")

    return properties.data
}

export default getProperties
