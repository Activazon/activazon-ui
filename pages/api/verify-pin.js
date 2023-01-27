import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import { authVerifyPin } from "lib/api-v2";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const accessToken = session?.user?.access?.token;

  const resp = await authVerifyPin(accessToken, req.body.pin);

  res.status(202).json(resp);
}
