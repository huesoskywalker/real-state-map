import path from "path"
import fs from "fs"
import clientPromise from "./mongodb"
const insertProperties = async () => {
    let client = null
    const propertiesFilePath = path.join(__dirname, "../../public/data/properties.json")
    try {
        const text = fs.readFileSync(propertiesFilePath, "utf-8")
        const propertiesData = JSON.parse(text)
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
