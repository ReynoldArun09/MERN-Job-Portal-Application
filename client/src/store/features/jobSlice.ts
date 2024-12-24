import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { fetchAllJobsApi, fetchLatestJobsApi } from "../services/job-api";
import { initialJobState, JobType } from "../types";

const initialState: initialJobState = {
  searchQuery: "",
  jobs: [],
  latestJobs: [],
  isFetching: false,
  isError: false,
  errorMessage: "",
};

type ApiError = {
  message: string;
};

type ApiResponse = {
  success: boolean;
  data: JobType[];
};

export const fetchAllJobs = createAsyncThunk<
  ApiResponse,
  { query: string },
  { rejectValue: ApiError }
>("job/fetchAllJobs", async ({ query }, thunkAPI) => {
  try {
    const response = await fetchAllJobsApi(query);
    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || "Unknown error occurred",
      });
    }
    return thunkAPI.rejectWithValue({
      message: "Something went wrong. Please try again later.",
    });
  }
});

export const fetchLatestJobs = createAsyncThunk<
  ApiResponse,
  undefined,
  { rejectValue: ApiError }
>("job/fetchLatestJobs", async (_, thunkAPI) => {
  try {
    const response = await fetchLatestJobsApi();
    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || "Unknown error occurred",
      });
    }
    return thunkAPI.rejectWithValue({
      message: "Something went wrong. Please try again later.",
    });
  }
});

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobs.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.isFetching = false;
        state.jobs = action?.payload.data;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage =
          action?.payload?.message || "Something went wrong!!";
      })
      .addCase(fetchLatestJobs.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchLatestJobs.fulfilled, (state, action) => {
        state.isFetching = false;
        state.latestJobs = action.payload.data;
      })
      .addCase(fetchLatestJobs.rejected, (state) => {
        state.isFetching = false;
      });
  },
});

export const { setSearchQuery } = jobSlice.actions;
export default jobSlice.reducer;
