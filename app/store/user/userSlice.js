import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nest-postgres-dogs.onrender.com/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],

  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: ({ formData }) => ({
        url: `auth/avatar`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useUpdateAvatarMutation } = userApi;
