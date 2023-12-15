import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./utils";

const incidentApi = createApi({
  reducerPath: "incidentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_ACTIVAZON_API,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    fetchAreaIncidentTypeBreakdown: builder.query({
      query: ({ slugPath }: { slugPath: string }) => ({
        url: `/v3/incidents/incident/area_incident_type_breakdown/?slug_path=${slugPath}`,
        method: "GET",
      }),
    }),
    fetchCountryIncidentTypeBreakdown: builder.query({
      query: ({ slugPath }: { slugPath: string }) => ({
        url: `/v3/incidents/incident/country_incident_type_breakdown/?slug_path=${slugPath}`,
        method: "GET",
      }),
    }),
    fetchCityIncidentTypeBreakdown: builder.query({
      query: ({ slugPath }: { slugPath: string }) => ({
        url: `/v3/incidents/incident/city_incident_type_breakdown/?slug_path=${slugPath}`,
        method: "GET",
      }),
    }),
    fetchAreaIncidents: builder.query({
      query: ({ slugPath, limit }: { slugPath: string; limit: number }) => ({
        url: `/v3/incidents/incident/area_incidents/?slug_path=${slugPath}&limit=${limit}`,
        method: "GET",
      }),
    }),
    fetchCityIncidents: builder.query({
      query: ({ slugPath, limit }: { slugPath: string; limit: number }) => ({
        url: `/v3/incidents/incident/city_incidents/?slug_path=${slugPath}&limit=${limit}`,
        method: "GET",
      }),
    }),
    fetchCountryIncidents: builder.query({
      query: ({ slugPath, limit }: { slugPath: string; limit: number }) => ({
        url: `/v3/incidents/incident/country_incidents/?slug_path=${slugPath}&limit=${limit}`,
        method: "GET",
      }),
    }),

    fetchIncident: builder.query({
      query: ({ incidentId }: { incidentId: number }) => ({
        url: `/v3/incidents/incident/${incidentId}/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useFetchCountryIncidentTypeBreakdownQuery,
  useFetchAreaIncidentTypeBreakdownQuery,
  useFetchCityIncidentTypeBreakdownQuery,
  useFetchAreaIncidentsQuery,
  useFetchCityIncidentsQuery,
  useFetchCountryIncidentsQuery,
  useFetchIncidentQuery,
} = incidentApi;
export default incidentApi;
