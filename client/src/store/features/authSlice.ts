import { createSlice } from "@reduxjs/toolkit";
import {
  SigninUser,
  SignOutUser,
  SignupUser,
  VerifyUser,
} from "../services/auth/auth-service";
import { initialAuthState } from "../types";

const initialState: initialAuthState = {
  currentUser: undefined,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SigninUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SigninUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action?.payload?.data;
      })
      .addCase(SigninUser.rejected, (state) => {
        state.isLoading = false;
        state.currentUser = null;
      })
      .addCase(SignupUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SignupUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(SignupUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(VerifyUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(VerifyUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action?.payload.data;
      })
      .addCase(VerifyUser.rejected, (state) => {
        state.isLoading = false;
        state.currentUser = null;
      })
      .addCase(SignOutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SignOutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.currentUser = null;
      })
      .addCase(SignOutUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
