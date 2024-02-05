import { ISearchParams } from "@/types/property"
import { Property } from "@/types/property"
import useValidSearchParams from "./_hooks/useValidSearchParams"
import getProperties from "./_utils/getProperties"
import Map from "./_components/Map"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"
export default async function HomePage({
    searchParams,
}: {
    searchParams: Partial<ISearchParams>
}) {
    const { validSearchParams } = useValidSearchParams(searchParams)

    const properties: Property[] = await getProperties({
        searchParams: validSearchParams,
    })

    if (properties.length === 0) {
        notFound()
    }

    return (
        <div className="flex items-start justify-center max-w-screen-md min-h-screen mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <Map properties={properties} />
        </div>
    )
}
