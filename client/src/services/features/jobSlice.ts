import { createSlice } from "@reduxjs/toolkit";
import { initialJobState } from "../types";

const initialState: initialJobState = {
  jobsData: [],
  searchQuery: "",
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJobsData: (state, action) => {
      state.jobsData = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setJobsData, setSearchQuery } = jobSlice.actions;

export default jobSlice.reducer;
