import apiSlice from "../api/apiSlice";

const workProgressApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    startProgress: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "api/v1/work-progress/start",
        body: data,
      }),
      invalidatesTags: ["work-progress"],
    }),
    stopProgress: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "api/v1/work-progress/stop",
        body: data,
      }),
      invalidatesTags: ["work-progress"],
    }),
    getAllProgress: builder.query({
      query: () => ({
        url: `api/v1/work-progress`,
      }),
      providesTags: ["work-progress"],
    }),
    getProgressByEmployee: builder.query({
      query: (id) => ({
        url: `api/v1/work-progress/employee/${id}`,
      }),
      providesTags: ["leave"],
    }),
    getProgressByCompany: builder.query({
      query: (id) => ({
        url: `api/v1/work-progress/company/${id}`,
      }),
      providesTags: ["work-progress"],
    }),
    deleteProgress: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `api/v1/work-progress/${id}`,
      }),
      invalidatesTags: ["work-progress"],
    }),
  }),
});

export const {
  useStartProgressMutation,
  useStopProgressMutation,
  useGetAllProgressQuery,
  useGetProgressByCompanyQuery,
  useGetProgressByEmployeeQuery,
  useDeleteProgressMutation,
} = workProgressApi;
