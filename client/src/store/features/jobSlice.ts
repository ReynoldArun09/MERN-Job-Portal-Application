import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAdminJobs,
  fetchAllJobs,
  fetchLatestJobs,
  fetchSingleJobs,
} from "../services/job/job-service";
import { initialJobState } from "../types";

const initialState: initialJobState = {
  searchQuery: "",
  isLoading: false,
  jobsData: [],
  latestJobsData: [],
  adminJobsData: [],
  singleJob: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobsData = action?.payload.data;
      })
      .addCase(fetchAllJobs.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchLatestJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLatestJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.latestJobsData = action.payload.data;
      })
      .addCase(fetchLatestJobs.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAdminJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminJobsData = action.payload.data;
      })
      .addCase(fetchAdminJobs.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchSingleJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleJob = action.payload.data;
      })
      .addCase(fetchSingleJobs.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setSearchQuery } = jobSlice.actions;
export default jobSlice.reducer;
