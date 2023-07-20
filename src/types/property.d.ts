import { ObjectId } from "mongodb"
import { LatLngLiteral } from "./google-maps-api"

export interface Property {
    readonly _id: ObjectId | string
    nombre: string
    ubicacion: LatLngLiteral
    descripcion: string
    precio: number
    superficie: number
    categoria: string
}

export interface Office {
    nombre: string
    direccion: string
    telefono: number
}

export type Category = {
    name: string
}

export type Filter = {
    categoria?: string
    superficie?: {}
    precio?: {}
}
