import { createSlice } from "@reduxjs/toolkit";

interface User {
  email: string;
  fullname: string;
  phoneNumber: string;
  role: "student" | "recruiter";
}

interface initialStateProps {
  isLoading: boolean;
  user: User | null;
}

const initialState: initialStateProps = {
  isLoading: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setLoading } = authSlice.actions;
export default authSlice.reducer;
