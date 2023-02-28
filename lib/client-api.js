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

// activities

export const getActivities = async (limit = 5) =>
  apiFetch(`/v2/activities/?limit=${limit}`, {
    method: "GET",
  });

export const getActivity = async (activityId) =>
  apiFetch(`/v2/activities/${activityId}/`, {
    method: "GET",
  });

// push subscriptions

export const storePushSubscription = async (pushSubscription) =>
  apiFetch(`/v2/push_subscriptions/`, {
    method: "POST",
    body: JSON.stringify({ ...pushSubscription }),
    headers: {
      "content-type": "application/json",
    },
  });

// subscriptions

export const createSubscription = async (cityId, areaId) =>
  apiFetch(`/v2/subscriptions/`, {
    method: "POST",
    body: JSON.stringify({ city_id: cityId, area_id: areaId || null }),
    headers: {
      "content-type": "application/json",
    },
  });

export const deleteSubscription = async (subscription) =>
  apiFetch(`/v2/subscriptions/${subscription.id}`, {
    method: "DELETE",
  });

export const getSubscription = async (cityId, areaId) => {
  const params = new URLSearchParams({
    city_id: cityId,
  });
  if (areaId) {
    params.append("area_id", areaId);
  }
  return apiFetch(`/v2/subscriptions/place/?${params.toString()}`, {
    method: "GET",
  });
};

// areas

export const getArea = async (countrySlug, citySlug, areaSlug) =>
  apiFetch(`/v2/areas/slug_path/${countrySlug}/${citySlug}/${areaSlug}/`, {
    method: "GET",
  });

export const getAreaActivities = async (areaId, limit = 5) =>
  apiFetch(`/v2/areas/${areaId}/activities/?limit=${limit}`, {
    method: "GET",
  });

export const getAreaActivityBreakdown = async (areaId) =>
  apiFetch(`/v2/areas/${areaId}/activity_breakdown/`, {
    method: "GET",
  });
