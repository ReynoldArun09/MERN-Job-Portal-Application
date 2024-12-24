import { SignInSchemaType, SignUpSchemaType } from "@/schemas/auth-schema";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  SignInApi,
  SignOutApi,
  SignUpApi,
  VerifyAuthApi,
} from "../services/auth-api";
import { InitialAuthState, UserType } from "../types";

const initialState: InitialAuthState = {
  user: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  successMessage: "",
};

type SignInApiResponse = {
  success: boolean;
  data: UserType;
  message: string;
};

type ApiError = {
  message: string;
};

type SignUpApiResponse = Omit<SignInApiResponse, "data">;
type VerifyApiResponse = Omit<SignInApiResponse, "message">;
type SignOutApiResponse = Omit<SignInApiResponse, "data">;

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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
      state.isError = false;
      state.isFetching = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SigninUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(SigninUser.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.user = action?.payload.data;
        state.successMessage = action.payload.message;
      })
      .addCase(SigninUser.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage =
          action?.payload?.message || "Something went wrong!!";
      })
      .addCase(SignupUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(SignupUser.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.successMessage = action.payload.message;
      })
      .addCase(SignupUser.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage =
          action?.payload?.message || "Something went wrong!!";
      })
      .addCase(VerifyUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(VerifyUser.fulfilled, (state, action) => {
        state.isFetching = false;
        state.user = action.payload.data;
      })
      .addCase(VerifyUser.rejected, (state) => {
        state.isFetching = false;
      })
      .addCase(SignOutUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(SignOutUser.fulfilled, (state, action) => {
        state.isFetching = false;
        state.successMessage = action.payload.message;
        state.isSuccess = true;
      })
      .addCase(SignOutUser.rejected, (state) => {
        state.isFetching = false;
      });
  },
});

export const { clearState } = authSlice.actions;
export default authSlice.reducer;
