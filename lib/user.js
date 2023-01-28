import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { getAccount } from "lib/client-api";

import { useState, useEffect } from "react";

export const useUser = ({ unauthenticatedRedirect }) => {
  const router = useRouter();
  const session = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      if (unauthenticatedRedirect) {
        router.push(unauthenticatedRedirect || "/signin");
      }
    }
    if (session.status === "authenticated") {
      getAccount().then((data) => {
        setUser(data);
      });
    }
  }, [session.status]);

  return user;
};

export const useUserRequired = () =>
  useUser({ unauthenticatedRedirect: "/signin" });
