import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./utils";

interface FetchCityData {
  countrySlug: string;
  citySlug: string;
}

interface FetchWithCityId {
  cityId: number;
}

interface FetchWithCityIdWithLimit extends FetchWithCityId {
  limit: number;
}

const cityApi = createApi({
  reducerPath: "cityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_ACTIVAZON_API,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    fetchCities: builder.query({
      query: ({ limit }: { limit: number }) => ({
        url: `/v3/places/city/?limit=${limit}`,
        method: "GET",
      }),
    }),
    searchCities: builder.query({
      query: (data: { search: string; limit: number }) => {
        const params = new URLSearchParams({});
        if (data) {
          params.set("query", data.search);
          params.set("limit", data.limit.toString());
        }

        return {
          url: `/v3/places/city/search/?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    fetchNearby: builder.query({
      query: (data: Coordinates | undefined) => {
        const params = new URLSearchParams({});
        if (data) {
          params.set("latitude", data.latitude.toString());
          params.set("longitude", data.longitude.toString());
        }

        return {
          url: `/v3/places/city/nearby/?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    fetchCity: builder.query({
      query: ({ slugPath }: { slugPath: string }) => ({
        url: `/v3/places/city/slug_path/?slug_path=${slugPath}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useFetchCitiesQuery,
  useLazySearchCitiesQuery,
  useFetchNearbyQuery,
  useFetchCityQuery,
} = cityApi;
export default cityApi;
