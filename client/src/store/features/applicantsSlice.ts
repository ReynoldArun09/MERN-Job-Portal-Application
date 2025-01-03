import { createSlice } from "@reduxjs/toolkit";
import { fetchAppliedJobs } from "../services/applications/application-service";
import { initialApplicantState } from "../types";

const initialState: initialApplicantState = {
  isLoading: false,
  applicationData: [],
};

const applicantsSlice = createSlice({
  name: "applicant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppliedJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applicationData = action.payload.data;
      })
      .addCase(fetchAppliedJobs.rejected, (state) => {
        state.isLoading = true;
      });
  },
});

export default applicantsSlice.reducer;
