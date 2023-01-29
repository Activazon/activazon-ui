import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { trackUser } from "lib/track";

import { getAccount } from "lib/client-api";

import { useState, useEffect } from "react";

export const useUser = ({ unauthenticatedRedirect } = {}) => {
  const router = useRouter();
  const session = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      if (unauthenticatedRedirect) {
        router.push(unauthenticatedRedirect);
      }
    }
    if (session.status === "authenticated") {
      getAccount().then((data) => {
        if (data) {
          setUser(data);

          trackUser(data);
        }
      });
    }
  }, [session.status]);

  return user;
};

export const useUserRequired = () => {
  const router = useRouter();
  return useUser({
    unauthenticatedRedirect: {
      pathname: "/signin",
      query: { callbackUrl: router.asPath },
    },
  });
};
