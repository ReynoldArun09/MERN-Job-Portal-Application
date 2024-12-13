import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./features/authSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
