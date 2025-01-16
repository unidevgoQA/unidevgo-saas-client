import apiSlice from "../api/apiSlice";

const companyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCompany: builder.query({
      query: () => ({
        url: `api/v1/companies`,
      }),
      providesTags: ["company"],
    }),
    getSingleCompany: builder.query({
      query: (id) => ({
        url: `api/v1/companies/${id}`,
      }),
      providesTags: ["company"],
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `api/v1/companies/${id}`,
      }),
      invalidatesTags: ["company"],
    }),
    updateCompany: builder.mutation({
      query: ({ id, data }) => ({
        method: "PUT",
        url: `api/v1/companies/${id}`,
        body: data,
      }),
      invalidatesTags: ["company"],
    }),
  }),
});

export const {
  useGetAllCompanyQuery,
  useGetSingleCompanyQuery,
  useDeleteCompanyMutation,
  useUpdateCompanyMutation,
} = companyApi;
