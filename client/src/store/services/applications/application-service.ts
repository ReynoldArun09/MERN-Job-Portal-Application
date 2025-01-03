import { ApiError, JobApiResponse } from "@/store/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { fetchAppliedJobsApi } from "./application-api";

export const fetchAppliedJobs = createAsyncThunk<
  JobApiResponse,
  { id: string },
  { rejectValue: ApiError }
>("job/fetchappliedjobs", async ({ id }, thunkAPI) => {
  try {
    const response = await fetchAppliedJobsApi(id);
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
