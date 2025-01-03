import { SignInSchemaType, SignUpSchemaType } from "@/schemas/auth-schema";
import {
  ApiError,
  SignInApiResponse,
  SignOutApiResponse,
  SignUpApiResponse,
  VerifyApiResponse,
} from "@/store/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { SignInApi, SignOutApi, SignUpApi, VerifyAuthApi } from "./auth-api";

export const SigninUser = createAsyncThunk<
  SignInApiResponse,
  SignInSchemaType,
  { rejectValue: ApiError }
>("auth/SigninUser", async (values, thunkAPI) => {
  try {
    const response = await SignInApi(values);
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

export const SignupUser = createAsyncThunk<
  SignUpApiResponse,
  SignUpSchemaType,
  { rejectValue: ApiError }
>("auth/SignupUser", async (values, thunkAPI) => {
  try {
    const response = await SignUpApi(values);
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

export const VerifyUser = createAsyncThunk<
  VerifyApiResponse,
  undefined,
  { rejectValue: ApiError }
>("auth/VerifyUser", async (_, thunkAPI) => {
  try {
    const response = await VerifyAuthApi();
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

export const SignOutUser = createAsyncThunk<
  SignOutApiResponse,
  undefined,
  { rejectValue: ApiError }
>("auth/SignOut", async (_, thunkAPI) => {
  try {
    const response = await SignOutApi();
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
