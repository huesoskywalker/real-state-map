import { ObjectId } from "mongodb"
import { LatLngLiteral } from "./google-maps-api"

export interface IProperty {
    readonly _id: ObjectId | string
    name: string
    location: LatLngLiteral
    description: string
    price: number
    surfaceArea: number
    category: string
}

export interface IOffice {
    name: string
    direction: string
    telephone: number
}

export interface ICategory {
    name: string
}

export interface ISearchParams {
    category?: string
    surfaceArea?: string
    price?: string
}
