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

export const getCachedCities = async () => ({
  results: [
    {
      slug_path: "/honduras/tegucigalpa",
      display_name: "Tegucigalpa",
      image_square_url: "/cache/tegucigalpa-299x299.png",
      image_wide_url: null,
      country: {
        display_name: "Honduras",
      },
      activity_total_last5months: "100+",
    },
    {
      slug_path: "/honduras/san-pedro-sula",
      display_name: "San Pedro Sula",
      image_square_url: "/cache/san-pedro-sula-299x299.png",
      country: {
        display_name: "Honduras",
      },
      activity_total_last5months: "25+",
    },
    {
      slug_path: "/honduras/puerto-cortes",
      display_name: "Puerto Cortes",
      image_square_url: "/cache/puerto-cortes-299x299.png",

      country: {
        display_name: "Honduras",
      },
      activity_total_last5months: "10+",
    },
    {
      slug_path: "/honduras/la-ceiba",
      display_name: "La Ceiba",
      image_square_url: "/cache/la-ceiba-299x299.png",

      country: {
        display_name: "Honduras",
      },
      activity_total_last5months: "10+",
    },
  ],
});
