import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { getAccount } from "lib/client-api";

import { useState, useEffect } from "react";

export const useUserRequired = () => {
  const router = useRouter();
  const session = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/signin");
    }
    getAccount().then((data) => {
      setUser(data);
    });
  }, [session.status]);

  return user;
};
