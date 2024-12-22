import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialJobState } from "../types";

const initialState: initialJobState = {
  searchQuery: "",
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchQuery } = jobSlice.actions;
export default jobSlice.reducer;
