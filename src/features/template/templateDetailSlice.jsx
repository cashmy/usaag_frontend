import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiTemplateDetailSlice = createApi({
  reducerPath: "apiTemplateDetail",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44319/api/TemplateDetail",
    prepareHeaders(headers) {
      const token = localStorage.getItem("token");
      headers.localStorage("authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (builder) => {
    return {
      // Get All Detals for a Template
      fetchAllTemplateDetails: builder.query({
        query(id) {
          return `/${id}`;
        },
      }),

      // Add a Template Detail
      addTemplateDetail: builder.mutation({
        query: (body) => ({
          url: "",
          method: "POST",
          body,
        }),
      }),

      // Update A Template Detail
      updateTemplateDetail: builder.mutation({
        query: (body) => ({
          url: `/${body.headerId}/${body.id}`,
          method: "PUT",
          body,
        }),
      }),

      // Delete a Template Header
      deleteTemplateDetail: builder.mutation({
        query(params) {
          return {
            url: `/${params.headerId}/${params.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchAllTemplateDetailsQuery,
  useAddTemplateDetailMutation,
  useUpdateTemplateDetailMutation,
  useDeleteTemplateDetailMutation,
} = apiTemplateDetailSlice;
