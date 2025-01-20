import apiSlice from "../api/apiSlice";

const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAdmin: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "api/v1/admins/create-admin",
        body: data,
      }),
      invalidatesTags: ["admin"],
    }),
    getAllAdmins: builder.query({
      query: () => ({
        url: `api/v1/admins`,
      }),
      providesTags: ["admin"],
    }),
    getSingleAdmin: builder.query({
      query: (id) => ({
        url: `api/v1/admins/${id}`,
      }),
      providesTags: ["admin"],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `api/v1/admins/${id}`,
      }),
      invalidatesTags: ["admin"],
    }),
    updateAdmin: builder.mutation({
      query: ({ id, data }) => ({
        method: "PUT",
        url: `api/v1/admins/${id}`,
        body: data,
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const {
  useAddAdminMutation,
  useGetAllAdminsQuery,
  useGetSingleAdminQuery,
  useDeleteAdminMutation,
  useUpdateAdminMutation,
} = adminApi;
