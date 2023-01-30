import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { trackUser } from "lib/track";

import { getAccount } from "lib/client-api";

import { useState, useEffect } from "react";
import { identify } from "mixpanel-browser";

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
      if (!user) {
        // set based on what in session while fetching user details
        // to minimize the delay in which the sites shows an
        // unauthenticated state
        setUser({
          id: session.data.token.id,
          pk: session.data.token.id,
          email: session.data.token.email,
        });

        getAccount().then((data) => {
          if (data?.code === "token_not_valid") {
            // something is wrong with the jwt token
            return signOut({ callbackUrl: "/signin" });
          }

          if (data) {
            setUser(data);

            trackUser(data);
          }
        });
      }
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
