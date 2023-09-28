import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client = new MongoClient(uri, options)
let clientPromise: Promise<MongoClient> = client.connect()

export default clientPromise
