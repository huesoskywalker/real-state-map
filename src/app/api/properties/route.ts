import clientPromise from "@/lib/mongodb"
import { Filter, Property } from "@/types/property"
import { Collection, MongoClient } from "mongodb"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const req = await request.json()
    const { categoria, superficie, precio } = req.searchParams

    const filter: Filter = {}

    if (categoria) {
        filter.categoria = categoria
    }
    if (superficie) {
        filter.superficie = { $lte: parseInt(superficie) }
    }
    if (precio) {
        const splitPrecio = precio.split("&")
        const precioMin = splitPrecio[0]
        const precioMax = splitPrecio[1]
        filter.precio = { $lte: parseInt(precioMax), $gte: parseInt(precioMin) }
    }
    try {
        const client: MongoClient = await clientPromise
        const collection: Collection<Property> = client
            .db("propitalDb")
            .collection<Property>("properties")

        const properties: Property[] = await collection.find<Property>(filter).toArray()
        if (properties.length === 0) {
            return NextResponse.json({ status: 400, statusText: "No properties found" })
        }
        return NextResponse.json(properties)
    } catch (error) {
        console.log(error)
        throw new Error(`Internal Server Error`)
    }
}
