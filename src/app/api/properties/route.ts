import clientPromise from "@/lib/mongodb"
import { Filter } from "@/types/filter"
import { Property } from "@/types/property"
import { Collection, MongoClient } from "mongodb"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const category: string | null = searchParams.get("category")
    const price: string | null = searchParams.get("price")
    const surfaceArea: string | null = searchParams.get("surfaceArea")
    const filter: Partial<Filter> = {}

    if (category) {
        filter.category = category
    }
    if (surfaceArea) {
        const splitSurfaceArea = surfaceArea.split("&")
        if (splitSurfaceArea.length !== 2) {
            return NextResponse.json("Invalid surfaceArea parameter", { status: 400 })
        }
        const minSurfaceArea = parseInt(splitSurfaceArea[0])
        const maxSurfaceArea = parseInt(splitSurfaceArea[1])
        const isValidSurfaceArea =
            !isNaN(minSurfaceArea) && !isNaN(maxSurfaceArea) && minSurfaceArea < maxSurfaceArea
        const isSurfaceAreaPositiveNumber = minSurfaceArea >= 0 && maxSurfaceArea >= 0
        if (!isValidSurfaceArea || !isSurfaceAreaPositiveNumber) {
            return NextResponse.json("Invalid surfaceArea value", { status: 400 })
        }
        filter.surfaceArea = { $lte: maxSurfaceArea, $gte: minSurfaceArea }
    }
    if (price) {
        const splitPrice = price.split("&")
        if (splitPrice.length !== 2) {
            return NextResponse.json("Invalid price parameter", { status: 400 })
        }
        const minPrice = parseInt(splitPrice[0])
        const maxPrice = parseInt(splitPrice[1])
        const isValidPrice = !isNaN(minPrice) && !isNaN(maxPrice) && minPrice < maxPrice
        const isPricePositiveNumber = minPrice >= 0 && maxPrice >= 0

        if (!isValidPrice || !isPricePositiveNumber) {
            return NextResponse.json("Invalid price value", { status: 400 })
        }
        filter.price = { $lte: maxPrice, $gte: minPrice }
    }
    try {
        const client: MongoClient = await clientPromise
        const collection: Collection<Property> = client
            .db("propitalDb")
            .collection<Property>("properties")

        const properties: Property[] = await collection.find<Property>(filter).toArray()

        return NextResponse.json(properties)
    } catch (error) {
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}
