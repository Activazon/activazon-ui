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
  }),
});

export const { useFetchCountryQuery } = countryApi;
export default countryApi;
