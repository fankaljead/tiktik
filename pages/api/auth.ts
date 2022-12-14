import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/clients";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.status(200).json({ name: 'response success' })
  if (req.method === "POST") {
    const user = req.body;

    client
      .createIfNotExists(user)
      .then(() => res.status(200).json("Login success"));
  }
}
