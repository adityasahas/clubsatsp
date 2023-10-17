import { MongoClient, Db, MongoClientOptions } from "mongodb";

let client: MongoClient | undefined;

async function connectToDb(): Promise<{ db: Db; client: MongoClient }> {
  const uri: string = process.env.MONGODB_URI!;

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  const db = client.db("clubsatsp");

  return { db, client };
}

export { connectToDb };
