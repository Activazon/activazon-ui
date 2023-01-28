import { getSession } from "next-auth/react";

const apiFetch = async (endpointPath, options) => {
  const session = await getSession();
  const accessToken = session.token.access_token;
  const apiPrefix = process.env.NEXT_PUBLIC_ACTIVAZON_API;
  const url = `${apiPrefix}${endpointPath}`;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response.json();
};

// cities
export const getAccount = async (limit = 10) =>
  apiFetch(`/v2/accounts/user`, {
    method: "GET",
  });
