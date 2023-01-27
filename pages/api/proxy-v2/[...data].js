import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const accessToken = session?.user?.access?.token;

  console.log("query", req.query);
  console.log("accessToken", accessToken);

  res.status(202).json({});
}
