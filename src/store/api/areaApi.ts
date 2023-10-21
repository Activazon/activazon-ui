import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./utils";

const areasApi = createApi({
  reducerPath: "areaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_ACTIVAZON_API,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    fetchCityAreas: builder.query({
      query: ({ slugPath, limit }: { slugPath: string; limit: number }) => ({
        url: `/v3/places/area/city_areas/?slug_path=${slugPath}&limit=${limit}`,
        method: "GET",
      }),
    }),
    searchAreas: builder.query({
      query: (data: { search: string; limit: number }) => {
        const params = new URLSearchParams({});
        if (data) {
          params.set("query", data.search);
          params.set("limit", data.limit.toString());
        }

        return {
          url: `/v3/places/area/search/?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    fetchArea: builder.query({
      query: ({
        countrySlug,
        citySlug,
        areaSlug,
      }: {
        countrySlug: string;
        citySlug: string;
        areaSlug: string;
      }) => ({
        url: `/v3/places/area/slug_path/?slug_path=${countrySlug}/${citySlug}/${areaSlug}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useFetchCityAreasQuery,
  useLazySearchAreasQuery,
  useFetchAreaQuery,
} = areasApi;
export default areasApi;
