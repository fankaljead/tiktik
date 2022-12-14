import type { NextApiRequest, NextApiResponse } from "next";

import { topicPostsQuery } from "../../../utils/queries";
import { client } from "../../../utils/clients";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { topic } = req.query;

    const query = topicPostsQuery(topic);

    const videos = await client.fetch(query);

    res.status(200).json(videos);
  }
}
