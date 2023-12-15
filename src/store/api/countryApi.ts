import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./utils";

const countryApi = createApi({
  reducerPath: "countryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_ACTIVAZON_API,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    fetchCountry: builder.query({
      query: ({ slugPath }: { slugPath: string }) => ({
        url: `/v3/places/country/slug_path/?slug_path=${slugPath}`,
        method: "GET",
      }),
    }),
    searchCountries: builder.query({
      query: (data: { search: string; limit: number }) => {
        const params = new URLSearchParams({});
        if (data) {
          params.set("query", data.search);
          params.set("limit", data.limit.toString());
        }

        return {
          url: `/v3/places/country/search/?${params.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useFetchCountryQuery, useLazySearchCountriesQuery } = countryApi;
export default countryApi;
