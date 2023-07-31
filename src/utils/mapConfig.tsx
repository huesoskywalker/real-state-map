import { LatLngLiteral, MapContainer, MapOptions } from "@/types/google-maps-api"
import { useMemo } from "react"

export const containerStyle: MapContainer = {
    width: "600px",
    height: "500px",
}

export const center = useMemo<LatLngLiteral>(() => ({ lat: -33.413911, lng: -70.581883 }), [])

export const options = useMemo<MapOptions>(
    () => ({
        clickableIcons: false,
    }),
    []
)
