import Map from "./_components/Map"
import { Property, ISearchParams } from "@/types/property"
import getProperties from "./_hooks/getProperties"
import { CustomError } from "@/errors/CustomError"
import ErrorDisplay from "./_components/ErrorDisplay"
import useValidSearchParams from "./_hooks/useValidSearchParams"
export default async function HomePage({
    searchParams,
}: {
    searchParams: Partial<ISearchParams>
}): Promise<React.JSX.Element> {
    const { validSearchParams } = useValidSearchParams(searchParams)

    const properties: Property[] | CustomError = await getProperties({
        searchParams: validSearchParams,
    })

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
