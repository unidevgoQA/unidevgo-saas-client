
import apiSlice from "../api/apiSlice";

const leaveApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    applyLeave: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "api/v1/leave/apply-leave",
        body: data,
      }),
      invalidatesTags: ["leave"],
    }),
    getAllLeaves: builder.query({
      query: () => ({
        url: `api/v1/leave`,
      }),
      providesTags: ["leave"],
    }),
    getAllLeavesByEmployee: builder.query({
      query: (id) => ({
        url: `api/v1/leave/employee/${id}`,
      }),
      providesTags: ["leave"],
    }),
    getAllLeavesByCompany: builder.query({
      query: (id) => ({
        url: `api/v1/leave/company/${id}`,
      }),
      providesTags: ["leave"],
    }),
    deleteLeave: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `api/v1/leave/${id}`,
      }),
      invalidatesTags: ["leave"],
    }),
    updateLeaveStatus: builder.mutation({
      query: ({ id, data }) => ({
        method: "PUT",
        url: `api/v1/leave/${id}`,
        body: data,
      }),
      invalidatesTags: ["leave"],
    }),
  }),
});

export const {
useApplyLeaveMutation,
useGetAllLeavesQuery,
useGetAllLeavesByEmployeeQuery,
useGetAllLeavesByCompanyQuery,
useDeleteLeaveMutation,
useUpdateLeaveStatusMutation
} = leaveApi;
