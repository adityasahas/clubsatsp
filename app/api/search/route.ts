import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
async function streamToJson(stream: ReadableStream): Promise<any> {
  const reader = stream.getReader();
  let chunks = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks += new TextDecoder("utf-8").decode(value);
  }
  return JSON.parse(chunks);
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  console.log("apicall", req.body);
  let data;
  if (
    req.body &&
    typeof req.body === "object" &&
    !(req.body instanceof ReadableStream)
  ) {
    data = req.body;
  } else {
    data = await streamToJson(req.body);
  }
  console.log("api", data);
  const client = await MongoClient.connect(
    process.env.MONGODB_URI as string,
    {}
  );
  const db = client.db(process.env.MONGODB_DB);
  const searchResults = await db
    .collection("clubs")
    .find({
      $or: [
        { clubName: { $regex: data.searchTerm, $options: "i" } },
        { clubURL: { $regex: data.searchTerm, $options: "i" } },
        { "clubAdvisor.name": { $regex: data.searchTerm, $options: "i" } },
        { "clubOfficers.name": { $regex: data.searchTerm, $options: "i" } },
        { clubDay: { $regex: data.searchTerm, $options: "i" } },
      ],
    })
    .toArray();

  client.close();

  return new Response(JSON.stringify({ clubs: searchResults }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
