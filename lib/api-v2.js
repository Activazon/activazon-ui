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

// cities
export const getCities = async (limit = 10) =>
  apiFetch(`/v2/cities.json/?limit=${limit}`, {
    method: "GET",
  });

export const getCity = async (countrySlug, citySlug) =>
  apiFetch(`/v2/cities/slug_path/${countrySlug}/${citySlug}/`, {
    method: "GET",
  });

export const getCityActivities = async (cityId, limit = 5) =>
  apiFetch(`/v2/cities/${cityId}/activities/?limit=${limit}`, {
    method: "GET",
  });

export const getCityActivityBreakdown = async (cityId) =>
  apiFetch(`/v2/cities/${cityId}/activity_breakdown/`, {
    method: "GET",
  });

export const getCityBrandImage = async (cityId) =>
  apiFetch(`/v2/cities/${cityId}/banner_image/`, {
    method: "GET",
  });

export const getCityAreas = async (cityId, limit = 5) =>
  apiFetch(`/v2/cities/${cityId}/areas/?limit=${limit}`, {
    method: "GET",
  });

// areas

export const getArea = async (countrySlug, citySlug, areaSlug) =>
  apiFetch(`/v2/areas/slug_path/${countrySlug}/${citySlug}/${areaSlug}/`, {
    method: "GET",
  });

export const getAreaActivities = async (cityId, limit = 5) =>
  apiFetch(`/v2/areas/${cityId}/activities/?limit=${limit}`, {
    method: "GET",
  });

export const getAreaActivityBreakdown = async (cityId) =>
  apiFetch(`/v2/areas/${cityId}/activity_breakdown/`, {
    method: "GET",
  });

// activties
export const getActivity = async (activityId) =>
  apiFetch(`/v2/activities/${activityId}/`, {
    method: "GET",
  });

// auth
export const authSignIn = async (username, password) =>
  apiFetch(`/v2/accounts/auth/signin/`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "content-type": "application/json",
    },
  });

export const authSignUp = async (username, usernameVerify, password, locale) =>
  apiFetch(`/v2/accounts/auth/signup/`, {
    method: "POST",
    body: JSON.stringify({
      username,
      username_verify: usernameVerify,
      password,
      locale,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

export const authVerifyPin = async (accessToken, pin) =>
  apiFetch(`/v2/accounts/auth/verify-pin/`, {
    method: "POST",
    body: JSON.stringify({
      pin,
    }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
    },
  });
