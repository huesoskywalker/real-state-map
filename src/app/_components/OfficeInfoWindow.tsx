"use client"
import { InfoWindowF } from "@react-google-maps/api"
import React from "react"
import OfficeData from "./OfficeData"
import { LatLngLiteral } from "@/types/google-maps-api"

const OfficeInfoWindow = ({
    center,
    onCloseClick,
}: {
    center: LatLngLiteral
    onCloseClick: () => void
}) => {
    return (
        <InfoWindowF position={center} onCloseClick={onCloseClick}>
            <OfficeData />
        </InfoWindowF>
    )
}

export default OfficeInfoWindow
