import apiSlice from "../api/apiSlice";

const employeeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addEmployee: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "api/v1/employees/create-employee",
        body: data,
      }),
      invalidatesTags: ["employee"],
    }),
    getAllEmployees: builder.query({
      query: () => ({
        url: `api/v1/employees`,
      }),
      providesTags: ["employee"],
    }),
    getAllEmployeesByCompany: builder.query({
      query: (id) => ({
        url: `api/v1/employees/company/${id}`,
      }),
      providesTags: ["employee"],
    }),
    getSingleEmployee: builder.query({
      query: (id) => ({
        url: `api/v1/employees/${id}`,
      }),
      providesTags: ["employee"],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `api/v1/employees/${id}`,
      }),
      invalidatesTags: ["employee"],
    }),
    updateEmployee: builder.mutation({
      query: ({ id, data }) => ({
        method: "PUT",
        url: `api/v1/employees/${id}`,
        body: data,
      }),
      invalidatesTags: ["employee"],
    }),
  }),
});

export const {
  useAddEmployeeMutation,
  useGetAllEmployeesQuery,
  useGetSingleEmployeeQuery,
  useDeleteEmployeeMutation,
  getAllEmployeesByCompany,
  useUpdateEmployeeMutation,
} = employeeApi;
