import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCompanies,
  fetchCompanyById,
} from "../services/company/company-service";
import { initialCompanyState } from "../types";

const initialState: initialCompanyState = {
  isLoading: false,
  companiesData: [],
  singleCompany: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.companiesData = action.payload.data;
      })
      .addCase(fetchCompanies.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchCompanyById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.singleCompany = action.payload.data;
        state.isLoading = false;
      })
      .addCase(fetchCompanyById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default companySlice.reducer;
