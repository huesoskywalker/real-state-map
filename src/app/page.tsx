import React from "react"
import MapComponent from "./components/MapComponent"
import { Property } from "@/types/property"

export default async function HomePage({
    searchParams,
}: {
    searchParams: { [key: string]: string }
}): Promise<React.JSX.Element> {
    const fetchProperties: Response = await fetch(`http://localhost:3000/api/properties`, {
        method: "POST",
        headers: {
            "content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            searchParams,
        }),
        cache: "no-cache",
    })
    const properties: Property[] = await fetchProperties.json()

    return (
        <>
            <div className="flex items-start justify-center max-w-screen-md min-h-screen mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mt-7">
                <MapComponent properties={properties} />
            </div>
        </>
    )
}
