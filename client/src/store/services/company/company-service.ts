import { ApiError, CompaniesReponse, CompanyApiResponse } from "@/store/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  CreateCompanyApi,
  FetchCompaniesApi,
  FetchCompanyByIdApi,
} from "./company-api";

export const CreateCompany = createAsyncThunk<
  undefined,
  { companyName: string },
  { rejectValue: ApiError }
>("job/create-company", async ({ companyName }, thunkAPI) => {
  try {
    const response = await CreateCompanyApi(companyName);
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

export const fetchCompanies = createAsyncThunk<
  CompaniesReponse,
  undefined,
  { rejectValue: ApiError }
>("job/fetch-company", async (_, thunkAPI) => {
  try {
    const response = await FetchCompaniesApi();
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

export const fetchCompanyById = createAsyncThunk<
  CompanyApiResponse,
  { id: string },
  { rejectValue: ApiError }
>("job/fetch-company-by-id", async ({ id }, thunkAPI) => {
  try {
    const response = await FetchCompanyByIdApi(id);

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
