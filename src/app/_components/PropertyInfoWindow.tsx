import { InfoWindowF } from "@react-google-maps/api"
import React from "react"
import PropertyData from "./PropertyData"
import { Property } from "@/types/property"

const PropertyInfoWindow = ({
    property,
    onCloseClick,
}: {
    property: Property
    onCloseClick: () => void
}) => {
    return (
        <InfoWindowF position={property.location} onCloseClick={onCloseClick}>
            <PropertyData
                name={property.name}
                description={property.description}
                price={property.price}
                surfaceArea={property.surfaceArea}
            />
        </InfoWindowF>
    )
}

export default PropertyInfoWindow
