import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiTemplateHeaderSlice = createApi({
  reducerPath: "apiTemplateHeader",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44319/api/TemplateHeader",
    prepareHeaders(headers) {
      // const token = localStorage.getItem("token");
      // headers.localStorage("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["TempHeaders"],
  refetchOnFocus: true,

  endpoints: (builder) => {
    return {
      // Get All Template Headers by Archived status
      fetchAllTemplateHeaders: builder.query({
        query(body) {
          return `/archive/${body.status}`;
        },
        providesTags: ["TempHeaders"],
      }),

      // Add a Template Header
      addTemplateHeader: builder.mutation({
        query: (body) => ({
          url: "/",
          method: "POST",
          body,
        }),
        invalidatesTags: ["TempHeaders"],
      }),

      // Update A Template Header
      updateTemplateHeader: builder.mutation({
        query: (body) => ({
          url: `/${body.id}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["TempHeaders"],
      }),

      changeTemplateStatus: builder.mutation({
        query: (body) => ({
          url: `/${body.id}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["TempHeaders"],
      }),

      // Delete a Template Header
      deleteTemplateHeader: builder.mutation({
        query: (id) => ({
          url: `/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["TempHeaders"],
      }),
    };
  },
});

export const {
  useFetchAllTemplateHeadersQuery,
  useAddTemplateHeaderMutation,
  useUpdateTemplateHeaderMutation,
  useDeleteTemplateHeaderMutation,
  useChangeTemplateStatusMutation,
} = apiTemplateHeaderSlice;
