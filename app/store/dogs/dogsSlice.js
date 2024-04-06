import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dogsApi = createApi({
  reducerPath: "dogsApi",
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
  tagTypes: ["Dogs"],

  endpoints: (builder) => ({
    getDogs: builder.query({
      query: () => `/dogs`,
      providesTags: ["Dogs"],
    }),
    getOneDog: builder.query({
      query: (id) => ({
        url: `/dogs/dog/${id}`,
        method: "GET",
      }),
      providesTags: ["Dogs"],
    }),
    getOneDogFromAll: builder.query({
      query: (id) => ({
        url: `/alldogs/${id}`,
        method: "GET",
      }),
      providesTags: ["Dogs"],
    }),
    addDog: builder.mutation({
      query: (newDog) => ({
        url: "/dogs",
        method: "POST",
        body: newDog,
      }),
      invalidatesTags: ["Dogs"],
    }),
    deleteDog: builder.mutation({
      query: (id) => ({
        url: `dogs/dog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Dogs"],
    }),
  }),
});

export const {
  useGetDogsQuery,
  useAddDogMutation,
  useDeleteDogMutation,
  useGetOneDogQuery,
  useGetOneDogFromAllQuery,
} = dogsApi;
