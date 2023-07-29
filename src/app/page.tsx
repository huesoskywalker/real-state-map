import React from "react"
import { IProperty } from "@/types/property"
import Map from "./_components/Map"
import getProperties from "./_hooks/getProperties"

export default async function HomePage({
    searchParams,
}: {
    searchParams: { [key: string]: string }
}): Promise<React.JSX.Element> {
    const properties: IProperty[] = await getProperties({ searchParams })
    return (
        <>
            <div className="flex items-start justify-center max-w-screen-md min-h-screen mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mt-7">
                <Map properties={properties} />
            </div>
        </>
    )
}
