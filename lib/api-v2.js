import fetch from "node-fetch";
import process from "process";

const apiFetch = async (endpointPath, options) => {
  const apiPrefix = process.env.ACTIVAZON_API;
  const apiKey = process.env.ACTIVAZON_API_KEY;

  const url = `${apiPrefix}${endpointPath}`;
  const headers = {
    Authorization: apiKey,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response.json();
};

/**
 *
 * get countries
 */
export const getCities = async (limit = 10) =>
  apiFetch(`/v2/cities.json/?limit=${limit}`, {
    method: "GET",
  });

export const getCity = async (countrySlug, citySlug) =>
  apiFetch(`/v2/cities/slug-path/${countrySlug}/${citySlug}/`, {
    method: "GET",
  });
