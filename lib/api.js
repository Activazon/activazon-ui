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
export const getCountries = async (limit = 10) =>
  apiFetch(`/country/?limit=${limit}`, {
    method: "GET",
  });

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

/**
 *
 * search for neighbourhoods, country can be specified to narrow down the search
 */
export const getCountryNeighbourhoodSearch = async (country, search) =>
  apiFetch(`/neighbourhood/search/?country=${country}&search=${search}`, {
    method: "GET",
  });

/**
 *
 * get details about a neighbourhood
 */
export const getNeighbourhood = async (neighbourhoodId) =>
  apiFetch(`/neighbourhood/${neighbourhoodId}`, {
    method: "GET",
  });

/**
 *
 * get summary for a neighbourhood
 */
export const getNeighbourhoodSummary = async (neighbourhoodId) =>
  apiFetch(`/neighbourhood/${neighbourhoodId}/summary`, {
    method: "GET",
  });

/**
 *
 * get activities for a neighbourhood
 */
export const getNeighbourhoodActivities = async (neighbourhoodId) =>
  apiFetch(`/activities/neighbourhood/${neighbourhoodId}`, {
    method: "GET",
  });

/**
 *
 * get an activity
 */
export const getActivity = async (activityId) =>
  apiFetch(`/activities/${activityId}`, {
    method: "GET",
  });

/**
 * get map image of neighbourhood
 */
export const getNeighbourhoodMapImage = async (neighbourhoodId) =>
  apiFetch(`/neighbourhood/${neighbourhoodId}/image`, {
    method: "GET",
  });
