import clientPromise from "@/lib/mongodb"
import { Filter, Property } from "@/types/property"
import { Collection, MongoClient } from "mongodb"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const req = await request.json()
    const { category, surfaceArea, price } = req.searchParams

    const filter: Filter = {}

    if (category) {
        filter.category = category
    }
    if (surfaceArea) {
        const splitsurfaceArea = surfaceArea.split("&")
        const surfaceAreaMin = splitsurfaceArea[0]
        const surfaceAreaMax = splitsurfaceArea[1]
        filter.surfaceArea = { $lte: parseInt(surfaceAreaMax), $gte: parseInt(surfaceAreaMin) }
    }
    if (price) {
        const splitprice = price.split("&")
        const priceMin = splitprice[0]
        const priceMax = splitprice[1]
        filter.price = { $lte: parseInt(priceMax), $gte: parseInt(priceMin) }
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
