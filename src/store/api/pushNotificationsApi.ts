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
  }),
});

export const { useAddDeviceMutation } = pushNotificationsApi;
export default pushNotificationsApi;
