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
  tagTypes: ["Dogs", "Dog", "MyDogs"],

  endpoints: (builder) => ({
    getDogs: builder.query({
      query: () => `/dogs`,
      providesTags: ["MyDogs"],
    }),
    getAllDogs: builder.query({
      query: ({ pages, itemsPerPage = 5 }) =>
        `/alldogs/pagination?page=${pages}&limit=${itemsPerPage}`,
      providesTags: ["Dogs"],
    }),
    getOneDog: builder.query({
      query: (id) => ({
        url: `/dogs/dog/${id}`,
        method: "GET",
      }),
      providesTags: ["Dog"],
    }),
    getOneDogFromAll: builder.query({
      query: (id) => ({
        url: `/alldogs/${id}`,
        method: "GET",
      }),
      providesTags: ["Dog"],
    }),
    addDog: builder.mutation({
      query: (newDog) => ({
        url: "/dogs",
        method: "POST",
        body: newDog,
      }),
      invalidatesTags: ["MyDogs"],
    }),
    addDogAllList: builder.mutation({
      query: (newDog) => ({
        url: "/alldogs/new-dog",
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
      invalidatesTags: ["MyDogs"],
    }),
    deleteDogAllList: builder.mutation({
      query: (id) => ({
        url: `alldogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Dogs"],
    }),
    updateDog: builder.mutation({
      query: ({ id, updatedDog }) => ({
        url: `dogs/dog/${id}`,
        method: "PATCH",
        body: updatedDog,
      }),
      invalidatesTags: ["Dog"],
    }),
  }),
});

export const {
  useGetDogsQuery,
  useGetAllDogsQuery,
  useAddDogMutation,
  useAddDogAllListMutation,
  useDeleteDogMutation,
  useUpdateDogMutation,
  useGetOneDogQuery,
  useGetOneDogFromAllQuery,
  useDeleteDogAllListMutation,
} = dogsApi;
