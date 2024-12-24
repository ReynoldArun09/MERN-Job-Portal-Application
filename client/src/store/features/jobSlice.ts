import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { fetchAllJobsApi } from "../services/job-api";
import { initialJobState } from "../types";

const initialState: initialJobState = {
  searchQuery: "",
  jobs: [],
  isFetching: false,
  isError: false,
  errorMessage: "",
};

type ApiError = {
  message: string;
};

export const fetchAllJobs = createAsyncThunk<
  any,
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
      });
  },
});

export const { setSearchQuery } = jobSlice.actions;
export default jobSlice.reducer;
