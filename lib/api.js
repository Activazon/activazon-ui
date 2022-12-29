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

export const getNeighbourhoods = async (country, limit = 10) =>
  apiFetch(`/neighbourhood/country/${country}/?limit=${limit}`, {
    method: "GET",
  });
