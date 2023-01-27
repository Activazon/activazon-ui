import { getSession } from "next-auth/react";

export const getSessionFromContext = async (context) => {
  const session = await getSession(context);

  return {
    isAuthenticated: !!session?.user,
    sessionExpires: session?.expires,
    user: session?.user,
    access: session?.user?.access,
    refresh: session?.user?.refresh,
  };
};
