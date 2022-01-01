import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiTemplateDetailSlice = createApi({
  reducerPath: "apiTemplateDetail",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44319/api/TemplateDetail",
    prepareHeaders(headers) {
      // const token = localStorage.getItem("token");
      // headers.localStorage("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["TempDetails"],
  refetchOnMountOrArgChange: true,

  endpoints: (builder) => {
    return {
      // Get All Detals for a Template
      fetchAllTemplateDetails: builder.query({
        query(body) {
          return `/${body.id}`;
        },
        providesTags: (result, error, arg) => {
          console.log('Fetch TempDetails: ', result, error, arg)
          return ["TempDetails"]
        }
      }),

      // fetchTemplateDetailsByBonus: builder.query({
      //   query(body) {
      //     return `/${body.id}/${body.status}`
      //   },
      //   providesTags: (result, err, arg) => ["TempDetails"],
      // }),

      // Add a Template Detail
      addTemplateDetail: builder.mutation({
        query: (body) => (
          // console.log(body),
          {
            url: "",
            method: "POST",
            body,
          }),
        invalidatesTags: (result, error, arg) => {
          console.log('Add TempDetails: ', result, error, arg)
          return ['TempDetails']
        },
      }),

      // Update A Template Detail
      updateTemplateDetail: builder.mutation({
        query: (body) => ({
          url: `/${body.headerId}/${body.id}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: (result, error, arg) => {
          console.log('Update TempDetails: ', result, error, arg)
          return ['TempDetails']
        },
      }),

      // Delete a Template Header
      deleteTemplateDetail: builder.mutation({
        query(params) {
          return {
            url: `/${params.headerId}/${params.id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: (result, error, arg) => {
          console.log('Delete TempDetails: ', result, error, arg)
          return ['TempDetails']
        },
      }
      ),
    };
  },
});

export const {
  useFetchAllTemplateDetailsQuery,
  // useFetchTemplateDetailsByBonusQuery,
  useAddTemplateDetailMutation,
  useUpdateTemplateDetailMutation,
  useDeleteTemplateDetailMutation,
} = apiTemplateDetailSlice;
