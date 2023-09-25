"use client"
import React from "react"
import { GoogleMap, MarkerF, MarkerClustererF, useJsApiLoader } from "@react-google-maps/api"
import { IProperty } from "@/types/property"
import { officeMarker } from "../../../public/markers/officeMarker"

import { getMarker } from "../_hooks/getMarker"
import OfficeInfoWindow from "./OfficeInfoWindow"
import PropertyInfoWindow from "./PropertyInfoWindow"
import { useMapLoader } from "../_hooks/useMapLoader"
import { useShowOffice } from "../_hooks/useShowOffice"
import { useSelectedProperty } from "../_hooks/useSelectedProperty"
import { LatLngLiteral, MapContainer, MapOptions } from "@/types/google-maps-api"
import { useMemo } from "react"

function Map({ properties }: { properties: IProperty[] }): React.JSX.Element {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "YOUR-GOOGLE-MAP-API-KEY" || process.env.GOOGLE_MAPS_API_KEY,
    })
    const containerStyle: MapContainer = {
        width: "600px",
        height: "500px",
    }

    const center = useMemo<LatLngLiteral>(() => ({ lat: -33.413911, lng: -70.581883 }), [])

    const options = useMemo<MapOptions>(
        () => ({
            clickableIcons: false,
        }),
        []
    )
    const { onLoad, onUnmount } = useMapLoader(center)
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
