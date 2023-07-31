import React from "react"
import Map from "./_components/Map"
import { IProperty } from "@/types/property"
import getProperties from "./_hooks/getProperties"
import { CustomError } from "@/errors/CustomError"
import ErrorDisplay from "./_components/ErrorDisplay"
export default async function HomePage({
    searchParams,
}: {
    searchParams: { [key: string]: string }
}): Promise<React.JSX.Element> {
    const properties: IProperty[] | CustomError = await getProperties({ searchParams })
    if (properties instanceof CustomError) {
        return (
            <div className="flex items-start justify-center max-w-screen-md min-h-screen mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mt-7">
                <ErrorDisplay
                    name={properties.name}
                    status={properties.status}
                    message={properties.message}
                />
            </div>
        )
    } else {
        return (
            <>
                <div className="flex items-start justify-center max-w-screen-md min-h-screen mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mt-7">
                    <Map properties={properties} />
                </div>
            </>
        )
    }
}