// @ts-nocheck
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI as string, {});
    const db = client.db(process.env.MONGODB_DB);
    const clubs = await db.collection("clubs").find({}).toArray();

    client.close();
    return new Response(JSON.stringify({ clubs }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching clubs:", error);
    return new Response("Failed to fetch clubs.", { status: 500 });
  }
}
