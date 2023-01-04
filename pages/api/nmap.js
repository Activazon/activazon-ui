// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getNeighbourhoodMapImage } from "../../lib/api";

export default async function handler(req, res) {
  const { nid } = req.query;

  const response = await getNeighbourhoodMapImage(nid);

  const img = Buffer.from(response.base64, "base64");

  res.writeHead(200, {
    "Content-Type": response.content_type,
    "Content-Length": response.base64.length,
  });
  res.end(img);
}
