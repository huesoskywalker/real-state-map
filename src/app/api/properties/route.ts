import clientPromise from "@/lib/mongodb"
import { IFilter } from "@/types/filter"
import { IProperty, ISearchParams } from "@/types/property"
import { Collection, MongoClient } from "mongodb"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const req = await request.json()
    const { category, surfaceArea, price } = req.searchParams as ISearchParams
    const filter: IFilter = {}

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
        const collection: Collection<IProperty> = client
            .db("propitalDb")
            .collection<IProperty>("properties")
        const properties: IProperty[] = await collection.find<IProperty>(filter).toArray()
        if (properties.length === 0) {
            return NextResponse.json("No properties were found matching criteria", { status: 404 })
        }
        return NextResponse.json(properties)
    } catch (error) {
        console.log(error)
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}
