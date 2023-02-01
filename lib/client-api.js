import { getSession } from "next-auth/react";

const apiFetch = async (endpointPath, options) => {
  const session = await getSession();
  const accessToken = session?.token?.access_token;
  const apiPrefix = process.env.NEXT_PUBLIC_ACTIVAZON_API;
  const url = `${apiPrefix}${endpointPath}`;

  const headers = {
    ...options.headers,
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response.json();
};

// accounts
export const getAccount = async () =>
  apiFetch(`/v2/accounts/user.json`, {
    method: "GET",
  });

// cities

export const searchCities = async (search, limit = 10) => {
  const params = new URLSearchParams({
    search,
    limit,
  });
  return apiFetch(`/v2/cities/search/?${params.toString()}`, {
    method: "GET",
  });
};

// areas

export const searchAreas = async (search, limit = 10) => {
  const params = new URLSearchParams({
    search,
    limit,
  });
  return apiFetch(`/v2/areas/search/?${params.toString()}`, {
    method: "GET",
  });
};

// cities

export const getCities = async (limit = 10, offset = 0) =>
  apiFetch(`/v2/cities.json/?limit=${limit}&offset=${offset}`, {
    method: "GET",
  });
