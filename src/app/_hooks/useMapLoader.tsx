import { center } from "@/utils/mapConfig"
import { useCallback, useState } from "react"

export function useMapLoader(): {
    onLoad: (map: any) => void
    onUnmount: (map: any) => void
} {
    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map: any) {
        const bounds = new window.google.maps.LatLngBounds(center)
        map.fitBounds(bounds)

        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map: any) {
        setMap(null)
    }, [])

    return { onLoad, onUnmount }
}
