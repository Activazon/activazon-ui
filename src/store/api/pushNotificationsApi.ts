import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./utils";

const pushNotificationsApi = createApi({
  reducerPath: "pushNotificationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_ACTIVAZON_API,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    addDevice: builder.mutation({
      query: (data: {
        platform: string;
        user_agent: string;
        language_preference: string;
        endpoint: string;
        expiration_time: number | null;
        auth: string;
      }) => ({
        url: "/v3/push-notifications/device/",
        method: "POST",
        body: data,
      }),
    }),
    updateDevice: builder.mutation({
      query: (data: {
        platform: string;
        user_agent: string;
        language_preference: string;
        endpoint: string;
        expiration_time: number | null;
        auth: string;
        token: string;
      }) => {
        const token = data.token;
        return {
          url: "/v3/push-notifications/device/",
          method: "PATCH",
          body: { data, token: undefined },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    createSubscription: builder.mutation({
      query: (data: {
        place_city_slug: string;
        place_area_slug: string | null;
        token: string;
      }) => {
        const token = data.token;
        return {
          url: "/v3/push-notifications/device-subscription/",
          method: "POST",
          body: { ...data, token: undefined },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getSubscriptions: builder.query({
      query: (data: { token: string }) => {
        const token = data.token;
        return {
          url: "/v3/push-notifications/device-subscription/",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    deleteSubscription: builder.mutation({
      query: (data: { id: number; token: string }) => {
        const token = data.token;
        return {
          url: `/v3/push-notifications/device-subscription/${data.id}/`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useAddDeviceMutation,
  useUpdateDeviceMutation,
  useCreateSubscriptionMutation,
  useGetSubscriptionsQuery,
  useDeleteSubscriptionMutation,
} = pushNotificationsApi;
export default pushNotificationsApi;
