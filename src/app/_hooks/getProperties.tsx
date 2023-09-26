import { CustomError } from "@/errors/CustomError"
import { IResponseHeaders } from "@/types/axios"
import { Property } from "@/types/property"
import axios, { AxiosError, AxiosResponse } from "axios"

export const getProperties = async ({
    searchParams,
}: {
    searchParams: URLSearchParams
}): Promise<Property[] | CustomError> => {
    try {
        const properties: AxiosResponse<Property[], IResponseHeaders> = await axios.get(
            `http://localhost:3000/api/properties?${searchParams}`
        )

        return properties.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError: AxiosError = error
            if (axiosError.response) {
                const status = axiosError.response?.status
                const data = axiosError.response?.data
                const customError: CustomError = new CustomError(status, data as string)
                return customError
            }
        }
        throw new Error(`An unexpected Error Occurred, ${error}`)
    }
}

export default getProperties
