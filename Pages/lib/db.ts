import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export async function connectDB() {
  const client = await clientPromise;
  return client.db("chat");
}

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}