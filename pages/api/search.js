// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCountryNeighbourhoodSearch } from "../../lib/api";

export default async function handler(req, res) {
  const { country, search } = req.query;

  const response = await getCountryNeighbourhoodSearch(country, search);

  res.status(200).json(response);
}
