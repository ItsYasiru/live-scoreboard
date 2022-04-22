import { MongoClient } from "mongodb";

const MONGODB_DB = process.env.MONGODB_DB;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_DB || !MONGODB_URI) {
    throw new Error("MONGODB_DB or MONGODB_URI is not defined!");
}

let cachedDb = null;
let cachedClient = null;

async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return {
            db: cachedDb,
            client: cachedClient,
        };
    }

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    let client = new MongoClient(MONGODB_URI, options);
    await client.connect();

    let db = client.db(MONGODB_DB);

    cachedDb = db;
    cachedClient = client;

    return {
        db: cachedDb,
        client: cachedClient,
    };
}

export default connectToDatabase;
