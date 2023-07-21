"use client"
import React, { useState } from "react"
import { useMemo } from "react"
import {
    GoogleMap,
    MarkerF,
    MarkerClustererF,
    useJsApiLoader,
    InfoWindowF,
} from "@react-google-maps/api"
import { LatLngLiteral, MapContainer, MapOptions } from "@/types/google-maps-api"
import { Property } from "@/types/property"
import { departamentoNuevoMarker } from "../../../public/markers/departamentoNuevoMarker"
import { departamentoSeminuevoMarker } from "../../../public/markers/departamentoSeminuevoMarker"
import { parcelaMarker } from "../../../public/markers/parcelaMarker"
import { officeMarker } from "../../../public/markers/officeMarker"
import { office } from "../utils/data"

function MapComponent({ properties }: { properties: Property[] }): React.JSX.Element {
    const [selectedProperty, setSelectedProperty] = useState<Property | null>()
    const [showOffice, setShowOffice] = useState<boolean>(false)

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

    const useMarkerByType = (type: string): string | undefined => {
        switch (type) {
            case "Departamento Nuevo":
                return departamentoNuevoMarker
            case "Departamento Seminuevo":
                return departamentoSeminuevoMarker
            case "Parcela":
                return parcelaMarker
            default:
                return undefined
        }
    }

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
            {showOffice && (
                <InfoWindowF
                    position={center}
                    onCloseClick={() => {
                        setShowOffice(false)
                    }}
                >
                    <div className="max-w-xs p-4">
                        <h2 className="text-xl font-semibold text-gray-800">{office.name}</h2>
                        <div className="mt-4">
                            <span className="text-sm font-semibold text-gray-700">Direction:</span>
                            <span className="text-sm text-gray-700 ml-2">{office.direction}</span>
                        </div>
                        <div className="mt-2">
                            <span className="text-sm font-semibold text-gray-700">Telephone:</span>
                            <span className="text-sm text-gray-700 ml-2">{office.telephone}</span>
                        </div>
                    </div>
                </InfoWindowF>
            )}
            <MarkerClustererF>
                {(clusterer) => (
                    <>
                        {properties?.map((property: Property) => {
                            const iconUrl: string | undefined = useMarkerByType(property.category)
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
            {selectedProperty && (
                <InfoWindowF
                    position={selectedProperty.location}
                    onCloseClick={() => setSelectedProperty(null)}
                >
                    <div className="max-w-xs p-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {selectedProperty.name}
                        </h2>
                        <p className="text-gray-600 mt-2">{selectedProperty.description}</p>
                        <div className="mt-4">
                            <span className="text-sm font-semibold text-gray-700">Price:</span>
                            <span className="text-sm text-gray-700 ml-2">
                                ${selectedProperty.price}
                            </span>
                        </div>
                        <div className="mt-2">
                            <span className="text-sm font-semibold text-gray-700">
                                SurfaceArea:
                            </span>
                            <span className="text-sm text-gray-700 ml-2">
                                {selectedProperty.surfaceArea} m²
                            </span>
                        </div>
                    </div>
                </InfoWindowF>
            )}
        </GoogleMap>
    ) : (
        <></>
    )
}

export default React.memo(MapComponent)
