import { ObjectId } from "mongodb"
import { LatLngLiteral } from "./google-maps-api"

export interface Property {
    readonly _id: ObjectId | string
    name: string
    location: LatLngLiteral
    description: string
    price: number
    surfaceArea: number
    category: string
}

export interface Office {
    name: string
    direction: string
    telephone: number
}

export type Category = {
    name: string
}

export type Filter = {
    category?: string
    surfaceArea?: {}
    price?: {}
}
