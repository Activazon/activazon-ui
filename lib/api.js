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
 * get neighbourhoods for a country, neighbourhoods are sorted by most activity first
 */
export const getNeighbourhoods = async (country, limit = 10) =>
  apiFetch(`/neighbourhood/country/${country}/?limit=${limit}`, {
    method: "GET",
  });

/**
 * get most recent activity for a whole country
 * NOTE: be careful using this as it can expose too much information that can be crawled
 */
export const getCountryRecentActivity = async (country, limit = 3) =>
  apiFetch(`/activities/country/${country}/?limit=${limit}`, {
    method: "GET",
  });

export const getCountryNeighbourhoodSearch = async (country, search) =>
  apiFetch(`/neighbourhood/search/?country=${country}&search=${search}`, {
    method: "GET",
  });
