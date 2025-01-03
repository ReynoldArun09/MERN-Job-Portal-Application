import { ApiError, JobApiResponse, SingleJobResponse } from "@/store/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  fetchAdminJobsApi,
  fetchAllJobsApi,
  fetchLatestJobsApi,
  fetchSingleJobApi,
} from "./job-api";

export const fetchAllJobs = createAsyncThunk<
  JobApiResponse,
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
  JobApiResponse,
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

export const fetchAdminJobs = createAsyncThunk<
  JobApiResponse,
  undefined,
  { rejectValue: ApiError }
>("job/fetchAdminJobs", async (_, thunkAPI) => {
  try {
    const response = await fetchAdminJobsApi();
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

export const fetchSingleJobs = createAsyncThunk<
  SingleJobResponse,
  { id: string },
  { rejectValue: ApiError }
>("job/fetchsingleJob", async ({ id }, thunkAPI) => {
  try {
    const response = await fetchSingleJobApi(id);
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
