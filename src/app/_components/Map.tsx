"use client"
import React, { useState } from "react"
import { useMemo } from "react"
import { GoogleMap, MarkerF, MarkerClustererF, useJsApiLoader } from "@react-google-maps/api"
import { LatLngLiteral, MapContainer, MapOptions } from "@/types/google-maps-api"
import { IProperty } from "@/types/property"
import { officeMarker } from "../../../public/markers/officeMarker"
import { getMarker } from "../_hooks/getMarker"
import OfficeInfoWindow from "./OfficeInfoWindow"
import PropertyInfoWindow from "./PropertyInfoWindow"

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

function Map({ properties }: { properties: IProperty[] }): React.JSX.Element {
    const [selectedProperty, setSelectedProperty] = useState<IProperty | null>()
    const [showOffice, setShowOffice] = useState<boolean>(false)

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "YOUR-API-KEY-WORK-GREAT-HERE" || process.env.GOOGLE_MAPS_API_KEY,
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map: any) {
        const bounds = new window.google.maps.LatLngBounds(center)
        map.fitBounds(bounds)

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={options}
        >
            <MarkerF
                position={center}
                icon={{ url: officeMarker }}
                onClick={() => setShowOffice(true)}
            />
            {showOffice ? (
                <OfficeInfoWindow center={center} onCloseClick={() => setShowOffice(false)} />
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
                                    onClick={() => setSelectedProperty(property)}
                                />
                            )
                        })}
                    </>
                )}
            </MarkerClustererF>
            {selectedProperty ? (
                <PropertyInfoWindow
                    property={selectedProperty}
                    onCloseClick={() => setSelectedProperty(null)}
                />
            ) : null}
        </GoogleMap>
    ) : (
        <></>
    )
}

export default React.memo(Map)
