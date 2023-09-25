import path from "path"
import clientPromise from "./src/lib/mongodb"

const insertProperties = async () => {
    let client = null
    const propertiesFilePath = path.join(__dirname, "/public/data/properties.json")
    const text = await Bun.file(propertiesFilePath).text()
    const propertiesData = JSON.parse(text)
    try {
        client = await clientPromise
        const db = client.db("propitalDb")
        if (!(await db.listCollections({ name: "properties" }).hasNext())) {
            await db.createCollection("properties")
        }
        const collection = db.collection("properties")
        await collection.insertMany(propertiesData)
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to insert properties ${error.message}`)
        }
    } finally {
        if (client) {
            await client.close()
        }
    }
}

insertProperties()
