import applicantsReducer from "@/store/features/applicantsSlice";
import authReducer from "@/store/features/authSlice";
import companyReducer from "@/store/features/companySlice";
import jobReducer from "@/store/features/jobSlice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
    company: companyReducer,
    applicant: applicantsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
