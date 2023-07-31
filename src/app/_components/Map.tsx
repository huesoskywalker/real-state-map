"use client"
import React from "react"
import { GoogleMap, MarkerF, MarkerClustererF, useJsApiLoader } from "@react-google-maps/api"
import { IProperty } from "@/types/property"
import { officeMarker } from "../../../public/markers/officeMarker"

import { getMarker } from "../_hooks/getMarker"
import OfficeInfoWindow from "./OfficeInfoWindow"
import PropertyInfoWindow from "./PropertyInfoWindow"
import { center, containerStyle, options } from "@/utils/mapConfig"
import { useMapLoader } from "../_hooks/useMapLoader"
import { useShowOffice } from "../_hooks/useShowOffice"
import { useSelectedProperty } from "../_hooks/useSelectedProperty"

function Map({ properties }: { properties: IProperty[] }): React.JSX.Element {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "YOUR-GOOGLE-MAP-API-KEY" || process.env.GOOGLE_MAPS_API_KEY,
    })

    const { onLoad, onUnmount } = useMapLoader()
    const { showOffice, toggleShowOffice } = useShowOffice()
    const { selectedProperty, selectProperty, clearSelectedProperty } = useSelectedProperty()

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={options}
        >
            <MarkerF position={center} icon={{ url: officeMarker }} onClick={toggleShowOffice} />
            {showOffice ? (
                <OfficeInfoWindow center={center} onCloseClick={toggleShowOffice} />
            ) : null}
            <MarkerClustererF>
                {(clusterer) => (
                    <>
                        {properties?.map((property: IProperty) => {
                            const iconUrl: string | undefined = getMarker(property.category)
                            const icon: { url: string } | undefined = iconUrl
                                ? { url: iconUrl }
                                : undefined
                            return (
                                <MarkerF
                                    key={property.location.lat}
                                    position={property.location}
                                    icon={icon}
                                    clusterer={clusterer}
                                    onClick={() => selectProperty(property)}
                                />
                            )
                        })}
                    </>
                )}
            </MarkerClustererF>
            {selectedProperty ? (
                <PropertyInfoWindow
                    property={selectedProperty}
                    onCloseClick={clearSelectedProperty}
                />
            ) : null}
        </GoogleMap>
    ) : (
        <></>
    )
}

export default React.memo(Map)
