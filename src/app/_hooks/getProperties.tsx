import { CustomError } from "@/errors/CustomError"
import { IResponseHeaders } from "@/types/axios"
import { IProperty } from "@/types/property"
import axios, { AxiosError, AxiosResponse } from "axios"

export const getProperties = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string }
}): Promise<IProperty[] | CustomError> => {
    try {
        const properties: AxiosResponse<IProperty[], IResponseHeaders> = await axios.post(
            `http://localhost:3000/api/properties`,
            {
                searchParams,
            }
        )
        return properties.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError: AxiosError = error
            if (axiosError.response) {
                const status = axiosError.response?.status
                const data = axiosError.response?.data
                const customError = new CustomError(status, data as string)
                return customError
            }
        }
        throw error
    }
}

export default getProperties
