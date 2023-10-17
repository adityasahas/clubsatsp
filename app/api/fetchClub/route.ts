import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log("Query:", req.query);

  if (req.method !== "GET") {
    return res.status(405).end("Method not allowed");
  }

  try {
    const client = await MongoClient.connect(
      process.env.MONGODB_URI as string,
      {}
    );
    const db = client.db(process.env.MONGODB_DB);

    const { searchParams } = new URL(req.url, "http://localhost:3000");
    const clubURL = searchParams.get("club");
    console.log(clubURL);
    const club = await db.collection("clubs").findOne({ clubURL });

    client.close();

    if (!club) {
      return new Response("Club not found", {
        status: 404,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    return new Response(JSON.stringify({ club }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching club:", error);
    return new Response("Failed to fetch club.", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
